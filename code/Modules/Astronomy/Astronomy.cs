namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Astronomy : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "astronomy";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var data = GetAstronomyData(webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{LINK_IMAGE}}", data.linkImage)
                .Replace("{{LINK_PAGE}}", data.linkPage)
                .Replace("{{TITLE}}", data.title)
                .Replace("{{SOURCE}}", data.source);

            return javascript;
        }

        private Data GetAstronomyData(WebClient webClient)
        {
            var url = "https://apod.nasa.gov/apod/astropix.html";
            var html = webClient.DownloadString(url);

            return new Data
            {
                linkImage = "https://apod.nasa.gov/apod/" + Regex.Match(html, "<a href=\"(image/[^\"]+)\"").Groups[1].Value,
                linkPage = "https://apod.nasa.gov/apod/ap" + Regex.Match(html, "(\\d+)\">Discuss</a>").Groups[1].Value + ".html",
                source = "https://apod.nasa.gov/apod/" + Regex.Match(html, "<IMG SRC=\"([^\"]+)\"").Groups[1].Value,
                title = Regex.Match(html, "<center>\\s+<b>([^<]+)</b>").Groups[1].Value.Trim().Replace("'", "\\'")
            };
        }

        private struct Data
        {
            internal string linkImage;
            internal string linkPage;
            internal string source;
            internal string title;
        }
    }
}