namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    class Sun : IModule
    {
        public string GetName()
        {
            return "Sun";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            try
            {
                var data = GetSunData(settings, webClient);
                string javascript = File.ReadAllText(sourceFolder + "template.js");

                javascript = javascript
                    .Replace("{{RISE}}", data.rise)
                    .Replace("{{SET}}", data.set)
                    .Replace("{{LOCATION}}", settings["sun_location"]);

                File.WriteAllText(outputFolder + @"\sun.js", javascript);

                return new List<string>() { @"<script src='modules/sun.js'></script>" };
            }
            catch(Exception e)
            {
                return new List<string>() { "<script>console.log('Error in sun module: " + e.Message + "');</script>" };
            }
        }

        private Data GetSunData(Dictionary<string, string> settings, WebClient webClient)
        {
            var data = new Data();
            var html = webClient.DownloadString("https://www.timeanddate.com/sun/@" + settings["sun_location"]);
            data.rise = Regex.Match(html, @"<th>Sunrise Today: ?</th><td>(\d\d:\d\d)").Groups[1].Value;
            data.set = Regex.Match(html, @"<th>Sunset Today: ?</th><td>(\d\d:\d\d)").Groups[1].Value;
            return data;
        }

        private struct Data
        {
            internal string rise;
            internal string set;
        }
    }
}