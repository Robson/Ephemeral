namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Nature : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "nature";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            var data = GetData(webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{SOURCE}}", data.source)
                .Replace("{{TITLE}}", data.title)
                .Replace("{{LINK_PAGE}}", data.linkPage);

            return MakeStandardOutput(outputFolder, this.GetName(), javascript);
        }

        private Data GetData(WebClient webClient)
        {
            var url = "https://www.outdoorphotographer.com/blog/category/photo-of-the-day/";
            var html = webClient.DownloadString(url);
            var imageSource = Regex.Match(html, "(https://cdn2\\.outdoorphotographer\\.com/[^ ]+) 1024w").Groups[1].Value;
            var linkPage = Regex.Match(html, "<a class=\"title-link\" href=\"([^\"]+)\">").Groups[1].Value;

            return new Data
            {
                source = imageSource,
                title = Path.GetFileNameWithoutExtension(imageSource).Replace('-', ' '),
                linkPage = linkPage
            };
        }

        private struct Data
        {
            internal string source;
            internal string title;
            internal string linkPage;
        }
    }
}