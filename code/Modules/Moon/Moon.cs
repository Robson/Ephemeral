namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Moon : IModule
    {
        public string GetName()
        {
            return "Moon";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            try
            { 
                var data = GetMoonData(settings, webClient);
                string javascript = File.ReadAllText(sourceFolder + "template.js");
            
                javascript = javascript
                    .Replace("{{PERCENT}}", data.percent)
                    .Replace("{{TYPE}}", data.type)
                    .Replace("{{URL}}", data.url)
                    .Replace("{{LOCATION}}", settings["moon_location"]);

                File.WriteAllText(outputFolder + @"\moon.js", javascript);

                return new List<string>() { @"<script src='modules/moon.js'></script>" };
            }
            catch (Exception e)
            {
                return new List<string>() { "<script>console.log('Error in moon module: " + e.Message + "');</script>" };
            }
        }

        private Data GetMoonData(Dictionary<string, string> settings, WebClient webClient)
        {
            var data = new Data();
            var html = webClient.DownloadString("https://www.timeanddate.com/moon/@" + settings["moon_location"]);

            //<span id="cur-moon-percent">41.5%</span>
            data.percent = Regex.Match(html, "<span id=cur-moon-percent>([\\d\\.]+)%").Groups[1].Value;

            //<a href="/astronomy/moon/waning-crescent.html" title="Waning Crescent on the night between 6 March and 7 March">Waning Crescent</a>
            data.type = Regex.Match(html, "(<a href=\"/astronomy/moon/[\\-\\w]+.html\" title=\"[ \\w]+ on the night between [ \\w]+\">[ \\w]+</a>)").Groups[1].Value;

            //<img id="cur-moon" src="/scripts/moon.php?i=0.416&amp;p=3.480&amp;r=0.314" width="120" height="120">
            data.url =
                "https://www.timeanddate.com" +
                Regex.Match(html, "<img id=cur\\-moon src=\"(/scripts/moon\\.php\\?i=[\\d\\.]+&amp;p=[\\d\\.]+&amp;r=[\\d\\.]+)\"").Groups[1].Value;

            // fix encoding
            data.url = data.url.Replace("&amp;", "&");

            return data;
        }

        private struct Data
        {
            internal string percent;
            internal string type;
            internal string url;
        }
    }
}