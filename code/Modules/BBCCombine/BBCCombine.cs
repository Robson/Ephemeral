namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class BBCCombine : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "bbccombine";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var sources = settings["sources"].Split(',');
            var data = new Data();
            foreach (var source in sources)
            {
                var section = source.Split(':').First();
                var url = source.Split(':').Last();
                data.news += GetData(webClient, section, "http://feeds.bbci.co.uk/" + url + "/rss.xml");
            }
                        
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{NEWS}}", data.news)
                .Replace("{{AMOUNT}}", settings["height"]);

            return javascript;
        }

        private string GetData(WebClient webClient, string section, string url)
        {
            var html = webClient.DownloadString(url);

            var articles = Regex.Matches(html, "<item>\\s+<title><!\\[CDATA\\[([^\\]]+)\\]\\]></title>\\s+<description><!\\[CDATA\\[([^\\]]+)\\]\\]></description>\\s+<link>([^<]+)</link>");

            var result = "<p style=\"font-weight:bold;padding:10px 0 0 10px\">" + section + "</p>";

            result += "<ul>";
            foreach (Match article in articles.Take(3))
            {
                var title = article.Groups[1].Value.Replace("'", "\\'").Replace("\"", "&quot;");
                var desc = article.Groups[2].Value.Replace("'", "\\'").Replace("\"", "&quot;");
                var link = article.Groups[3].Value.Replace("'", "\\'").Replace("\"", "&quot;");

                result += "<li class=\"ttt\" data-tt=\"" + desc + "\"><a href=\"" + link + "\">" + title + "</a></li>";
            }

            result += "</ul>";

            return result;
        }

        private struct Data
        {
            internal string news;
        }
    }
}