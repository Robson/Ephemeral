namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Twitter : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "twitter";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            var dataUk = GetData(webClient, "united-kingdom");
            var dataUs = GetData(webClient, "united-states");
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{TRENDS_UK}}", dataUk.trends)
                .Replace("{{TRENDS_US}}", dataUs.trends);

            return MakeStandardOutput(outputFolder, this.GetName(), javascript);
        }

        private Data GetData(WebClient webClient, string where)
        {
            var url = "https://trends24.in/" + where +"/";
            var html = webClient.DownloadString(url);

            // <ol class=trend-card__list>
            var list = Regex.Match(html, "<ol class=trend-card__list>(.*?)</ol>").Groups[1].Value;
            list = Regex.Replace(list, "<span class=tweet-count>\\d+K</span>", "");
            list = list.Replace("<br>", "");
            list = list.Replace("'", "\'");

            var result = "<table>";
            var count = 0;
            foreach (Match trend in Regex.Matches(list, "<a href=\"([^\"]+)\">([^<]+)</a>"))
            {
                var label = trend.Groups[2].Value;
                if (label.Length > 24)
                {
                    label = label.Substring(0, 23) + "...";
                }

                count++;
                result += "<tr><td style=\"text-align: right\">" + count + "</td><td><a href=\"" + trend.Groups[1].Value + "\">" + label + "</a></td></tr>";
            }

            result += "</table>";

            return new Data
            {
                trends = result
            };
        }

        private struct Data
        {
            internal string trends;
        }
    }
}