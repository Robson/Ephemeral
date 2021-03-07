namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Singles : IModule
    {
        public string GetName()
        {
            return "Singles";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            try
            {
                var data = GetSinglesData(webClient);
                string javascript = File.ReadAllText(sourceFolder + "template.js");

                javascript = javascript
                    .Replace("{{WHEN}}", data.when)
                    .Replace("{{DATA}}", data.javascript);

                File.WriteAllText(outputFolder + @"\singles.js", javascript);

                return new List<string>() { @"<script src='modules/singles.js'></script>" };
            }
            catch (Exception e)
            {
                return new List<string>() { "<script>console.log('Error in singles module: " + e.Message + "');</script>" };
            }
        }

        private Data GetSinglesData(WebClient webClient)
        {
            var data = new Data();
            var url = "https://www.officialcharts.com/charts/singles-chart/";

            var html = webClient.DownloadString(url);

            data.when = Regex.Match(html, "<p class=\"article-date\">([^<]+)<").Groups[1].Value.Trim();

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

            data.javascript = javascript;            

            return data;
        }

        private struct Data
        {
            internal string when;
            internal string javascript;
        }
    }
}