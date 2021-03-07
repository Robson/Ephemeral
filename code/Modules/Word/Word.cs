namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Word : IModule
    {
        public string GetName()
        {
            return "Word";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            try
            { 
                var data = GetWordData(webClient);
                string javascript = File.ReadAllText(sourceFolder + "template.js");
            
                javascript = javascript
                    .Replace("{{WORD}}", data.word)
                    .Replace("{{DEFINITION}}", data.definition);

                File.WriteAllText(outputFolder + @"\word.js", javascript);

                return new List<string>() { @"<script src='modules/word.js'></script>" };
            }
            catch (Exception e)
            {
                return new List<string>() { "<script>console.log('Error in word module: " + e.Message + "');</script>" };
            }
        }

        private Data GetWordData(WebClient webClient)
        {
            var data = new Data();
            var html = webClient.DownloadString("https://www.merriam-webster.com/word-of-the-day");

            data.word = Regex.Match(html, "<h1>([^<]+)</h1>").Groups[1].Value;

            html = html
                .Replace("\r", "")
                .Replace("\n", "");

            data.definition = Regex.Match(html, "<h2>Definition</h2>(.*?)<span").Groups[1].Value.Trim();
            data.definition = data.definition.Replace("<strong>:</strong>", "");

            return data;
        }

        private struct Data
        {
            internal string word;
            internal string definition;
        }
    }
}