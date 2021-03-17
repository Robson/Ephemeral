namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class YouTube : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "youtube";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var data = GetYouTubeData(settings, webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{DATA}}", data.javascript);

            return javascript;
        }

        private Data GetYouTubeData(Dictionary<string, string> settings, WebClient webClient)
        {
            //{"url":"https://i.ytimg.com/vi/cT7wOSOZVoc/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==\u0026rs=AOn4CLCCAw87LtRu9DytKi4uA7ABTWoFWA",
            //"width":336,"height":188}]},"title":{"runs":[{"text":"Minecraft Survivor VS 3 Hitmen..."}],"accessibility":{"accessibilityData":
            //{"label":"Minecraft Survivor VS 3 Hitmen... by Dream 10 hours ago 42 minutes 5,055,029 views"}}},

            var html = webClient.DownloadString("https://www.youtube.com/feed/trending");
            var javascript = "[\n";

            var videos = Regex.Matches(html, "\\{\"url\":\"https://i\\.ytimg\\.com/vi/([^/]+)/[^\"]+\",.*?336.*?\"text\":\"([^\"]+)\".*?\"label\":\"([^\"]+)\"");
            foreach (Match video in videos.Take(3))
            {
                javascript += "{ id: '" + video.Groups[1].Value + "', title: \"" + video.Groups[2].Value.Replace("\"", "&quot;") + "\", label: \"" + video.Groups[3].Value + "\" },\n";
            }

            javascript += "]";

            return new Data
            {
                javascript = javascript
            };
        }

        private struct Data
        {
            internal string javascript;
        }
    }
}