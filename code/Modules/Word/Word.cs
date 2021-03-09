namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Word : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "word";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            var data = GetWordData(webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{WORD}}", data.word)
                .Replace("{{DEFINITION}}", data.definition);

            return MakeStandardOutput(outputFolder, this.GetName(), javascript);
        }

        private Data GetWordData(WebClient webClient)
        {           
            var html = webClient.DownloadString("https://www.merriam-webster.com/word-of-the-day")
                .Replace("\r", "")
                .Replace("\n", "");

            return new Data
            {
                word = Regex.Match(html, "<h1>([^<]+)</h1>").Groups[1].Value,
                definition = Regex.Match(html, "<h2>Definition</h2>(.*?)<span").Groups[1].Value.Replace("<strong>:</strong>", "").Trim()
            };
        }

        private struct Data
        {
            internal string word;
            internal string definition;
        }
    }
}