namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Weather : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "weather";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var data = GetWeatherData(settings, webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{LOCATION}}", settings["location"])
                .Replace("{{DATA}}", data.javascript);

            return javascript;
        }

        private Data GetWeatherData(Dictionary<string, string> settings, WebClient webClient)
        {            
            var html = webClient.DownloadString("https://www.timeanddate.com/weather/@" + settings["location"] + "/ext");

            return new Data
            {
                javascript = Regex.Match(html, "(var data=\\{\"copyright\":[^<]+)<").Groups[1].Value
            };
        }

        private struct Data
        {
            internal string javascript;
        }
    }
}