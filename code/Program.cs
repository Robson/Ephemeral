namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;

    class Program
    {
        private const string ConfigFile = "settings.txt";      

        private static readonly WebClient webClient = new WebClient();

        private static readonly List<IModule> modules = new List<IModule>() {
            new Astronomy(),
            new Bitcoin(),
            new Moon(),
            new Singles(),
            new Weather(),
            new Sun(),
            new Vanguard(),            
            new Word()
        };

        private static Dictionary<string, string> settings = new Dictionary<string, string>();

        static void Main()
        {
            GetSettings();
            MakeModulesDirectory();
            var scripts = ProcessModules();
            WriteHtml(scripts);
            WriteCss();
        }

        private static void GetSettings()
        {
            foreach (var line in File.ReadAllLines(ConfigFile))
            {
                if (line.Contains('='))
                {
                    var key = line.Split('=')[0];
                    var value = line.Split('=')[1];
                    settings.Add(key, value);
                }
            }
        }

        private static void MakeModulesDirectory()
        {
            Directory.CreateDirectory(settings["output"] + "modules");
        }

        private static List<string> ProcessModules()
        {
            var scripts = new List<string>();
            foreach (var module in modules)
            {
                var sourceFolder = AppContext.BaseDirectory + @"\Modules\" + module.GetName() + @"\";
                scripts.AddRange(module.Run(settings, sourceFolder, settings["output"] + "modules", webClient));
            }

            return scripts;
        }

        private static void WriteHtml(List<string> pageLines)
        {
            var html = File.ReadAllText(@"Templates\template.html");
            html = html.Replace("{{ADDITIONS}}", string.Join(Environment.NewLine, pageLines.ToArray()));
            html = html.Replace("{{DATE}}", DateTime.Today.ToString("d MMMM"));
            File.WriteAllText(settings["output"] + @"\index.html", html);
        }

        private static void WriteCss()
        {
            File.Copy(@"Templates\template.css", settings["output"] + @"\style.css", overwrite:true);
        }
    }
}