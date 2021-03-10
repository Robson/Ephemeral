namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Moon : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "moon";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var data = GetMoonData(settings, webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{PERCENT}}", data.percent)
                .Replace("{{TYPE}}", data.type)
                .Replace("{{URL}}", data.url)
                .Replace("{{LOCATION}}", settings["location"]);

            return javascript;
        }

        private Data GetMoonData(Dictionary<string, string> settings, WebClient webClient)
        {
            var url = "https://www.timeanddate.com/moon/@" + settings["location"];
            var html = webClient.DownloadString(url);

            return new Data
            {
                percent = Regex.Match(html, "<span id=cur-moon-percent>([\\d\\.]+)%").Groups[1].Value,
                type = Regex.Match(html, "(<a href=\"/astronomy/moon/[\\-\\w]+.html\" title=\"[ \\w]+ on the night between [ \\w]+\">[ \\w]+</a>)").Groups[1].Value,
                url = "https://www.timeanddate.com" + Regex.Match(html, "<img id=cur\\-moon src=\"(/scripts/moon\\.php\\?i=[\\d\\.]+&amp;p=[\\d\\.]+&amp;r=[\\d\\.]+)\"").Groups[1].Value.Replace("&amp;", "&")
            };
        }

        private struct Data
        {
            internal string percent;
            internal string type;
            internal string url;
        }
    }
}