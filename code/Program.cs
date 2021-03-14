namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;

    class Program
    {
        private const string ConfigFile = "settings.txt";      

        private static readonly WebClient webClient = new WebClient();

        private static readonly List<IModule> modules = new List<IModule>() {
            new Astronomy(),
            new BBC(),
            new BBCCombine(),
            new Bitcoin(),
            new Moon(),
            new Nature(),
            new Singles(),
            new Stocks(),
            new Sun(),
            new Twitter(),
            new Vanguard(),
            new Weather(),
            new Word(),
            new YouTube()
        };

        private static Dictionary<string, string> globalSettings = new Dictionary<string, string>();

        static void Main()
        {
            GetSettings();         
            var scripts = ProcessModules();
            WriteHtml(scripts);
            WriteCss();
        }

        private static void GetSettings()
        {
            foreach (var line in File.ReadAllLines(ConfigFile))
            {
                if (line.Contains('=') &&
                    !line.StartsWith('#') &&
                    !line.StartsWith("module="))
                {
                    var key = line.Split('=')[0];
                    var value = line.Split('=')[1];
                    globalSettings.Add(key, value);
                }
            }
        }

        private static string ProcessModules()
        {
            var scripts = string.Empty;
            foreach (var line in File.ReadAllLines(ConfigFile))
            {
                if (line.StartsWith("module="))
                {
                    var parts = line.Split('=').Last().Split('|');
                    var settings = globalSettings.ToDictionary(a => a.Key, b => b.Value);
                    foreach (var part in parts.Skip(1))
                    {
                        settings.Add(part.Split('~').First(), part.Split('~').Last());
                    }

                    foreach (var module in modules)
                    {
                        if (module.GetName() == parts.First())
                        {
                            var sourceFolder = AppContext.BaseDirectory + @"\Modules\" + module.GetName() + @"\";
                            var lines = new List<string>();
                            try
                            {
                                scripts += module.Run(settings, sourceFolder, webClient);
                            }
                            catch (Exception e)
                            {
                                scripts += "console.log('Error in " + module.GetName() + " module: " + e.Message + "');";
                            }

                            scripts +=
                                Environment.NewLine +
                                Environment.NewLine +
                                new string('/', 50) +
                                Environment.NewLine +
                                Environment.NewLine;
                        }
                    }
                }
            }

            return scripts;
        }

        private static void WriteHtml(string pageLines)
        {
            var html = File.ReadAllText(@"Templates\template.html");
            html = html.Replace("{{ADDITIONS}}", pageLines);
            html = html.Replace("{{GENERATED}}", DateTime.Now.ToString("d MMM HH:mm"));
            File.WriteAllText(globalSettings["output"] + @"\index.html", html);
        }

        private static void WriteCss()
        {
            File.Copy(@"Templates\template.css", globalSettings["output"] + @"\style.css", overwrite:true);
        }
    }
}