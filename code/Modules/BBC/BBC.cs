namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class BBC : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "bbc";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var data = GetData(webClient, "http://feeds.bbci.co.uk/" + settings["url"] + "/rss.xml");
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{NEWS}}", data.news)
                .Replace("{{TITLE}}", settings["title"]);

            return javascript;
        }

        private Data GetData(WebClient webClient, string url)
        {
            var html = webClient.DownloadString(url);

            var articles = Regex.Matches(html, "<item>\\s+<title><!\\[CDATA\\[([^\\]]+)\\]\\]></title>\\s+<description><!\\[CDATA\\[([^\\]]+)\\]\\]></description>\\s+<link>([^<]+)</link>");

            var result = "<ul>";
            foreach (Match article in articles.Take(5))
            {
                var title = article.Groups[1].Value.Replace("'", "\\'");
                var desc = article.Groups[2].Value.Replace("'", "\\'");
                var link = article.Groups[3].Value.Replace("'", "\\'");

                result += "<li title=\"" + desc + "\"><a href=\"" + link + "\">" + title + "</a></li>";
            }

            result += "</ul>";

            return new Data
            {
                news = result
            };
        }

        private struct Data
        {
            internal string news;
        }
    }
}