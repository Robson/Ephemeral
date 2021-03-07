namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    class Weather : IModule
    {
        public string GetName()
        {
            return "Weather";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            try
            {
                var data = GetWeatherData(settings, webClient);
                string javascript = File.ReadAllText(sourceFolder + "template.js");

                javascript = javascript
                    .Replace("{{LOCATION}}", settings["tad"])
                    .Replace("{{DATA}}", data.javascript);

                File.WriteAllText(outputFolder + @"\weather.js", javascript);

                return new List<string>() { @"<script src='modules/weather.js'></script>" };
            }
            catch(Exception e)
            {
                return new List<string>() { "<script>console.log('Error in weather module: " + e.Message + "');</script>" };
            }
        }

        private Data GetWeatherData(Dictionary<string, string> settings, WebClient webClient)
        {
            var data = new Data();
            var html = webClient.DownloadString("https://www.timeanddate.com/weather/@" + settings["tad"] + "/ext");

            data.javascript = Regex.Match(html, "(var data=\\{\"copyright\":[^<]+)<").Groups[1].Value;

            return data;
        }

        private struct Data
        {
            internal string javascript;
        }
    }
}