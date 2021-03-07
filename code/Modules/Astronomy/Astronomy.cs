namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Astronomy : IModule
    {
        public string GetName()
        {
            return "Astronomy";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            try
            { 
                var data = GetAstronomyData(webClient);
                string javascript = File.ReadAllText(sourceFolder + "template.js");
            
                javascript = javascript
                    .Replace("{{TITLE}}", data.title)
                    .Replace("{{SOURCE}}", data.source);

                File.WriteAllText(outputFolder + @"\astronomy.js", javascript);

                return new List<string>() { @"<script src='modules/astronomy.js'></script>" };
            }
            catch (Exception e)
            {
                return new List<string>() { "<script>console.log('Error in astronomy module: " + e.Message + "');</script>" };
            }
        }

        private Data GetAstronomyData(WebClient webClient)
        {
            var data = new Data();
            var html = webClient.DownloadString("https://apod.nasa.gov/apod/astropix.html");

            data.source = "https://apod.nasa.gov/apod/" + Regex.Match(html, "<IMG SRC=\"([^\"]+)\"").Groups[1].Value;
            data.title = Regex.Match(html, "<center>\\s+<b>([^<]+)</b>").Groups[1].Value;

            return data;
        }

        private struct Data
        {
            internal string title;
            internal string source;
        }
    }
}