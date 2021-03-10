namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Sun : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "sun";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var data = GetSunData(settings, webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{RISE}}", data.rise)
                .Replace("{{SET}}", data.set)
                .Replace("{{LOCATION}}", settings["location"]);

            return javascript;
        }

        private Data GetSunData(Dictionary<string, string> settings, WebClient webClient)
        {   
            var html = webClient.DownloadString("https://www.timeanddate.com/sun/@" + settings["location"]);

            return new Data
            {
                rise = Regex.Match(html, @"<th>Sunrise Today: ?</th><td>(\d\d:\d\d)").Groups[1].Value,
                set = Regex.Match(html, @"<th>Sunset Today: ?</th><td>(\d\d:\d\d)").Groups[1].Value
            };
        }

        private struct Data
        {
            internal string rise;
            internal string set;
        }
    }
}