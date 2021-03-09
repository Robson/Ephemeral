namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Singles : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "singles";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            var data = GetSinglesData(webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{WHEN}}", data.when)
                .Replace("{{DATA}}", data.javascript);

            return MakeStandardOutput(outputFolder, this.GetName(), javascript);
        }

        private Data GetSinglesData(WebClient webClient)
        {   
            var url = "https://www.officialcharts.com/charts/singles-chart/";
            var html = webClient.DownloadString(url);
            var images = Regex.Matches(html, "<div class=\"cover\"[^>]+>\\s+<img src=\"([^\"]+)\"");
            var titles = Regex.Matches(html, "<div class=\"title\">\\s+(<a [^>]+>[^>]+</a>)");
            var artists = Regex.Matches(html, "<div class=\"artist\">\\s+(<a [^>]+>[^>]+</a>)");

            var javascript = string.Empty;
            for (int i = 0; i < 5; i++)
            {
                javascript +=
                    (i + 1).ToString() + ": { " +
                    "Artist: \"" + artists[i].Groups[1].Value.Replace("\"", "'").ToLower() + "\", " +
                    "Title: \"" + titles[i].Groups[1].Value.Replace("\"", "'") + "\", " +
                    "Image: \"" + images[i].Groups[1].Value + "\" },\r\n";
            }

            javascript = javascript.Replace("href='", "href='https://www.officialcharts.com");

            return new Data
            {
                when = Regex.Match(html, "<p class=\"article-date\">([^<]+)<").Groups[1].Value.Trim(),
                javascript = javascript
            };
        }

        private struct Data
        {
            internal string when;
            internal string javascript;
        }
    }
}