namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;

    internal class Stocks : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "stocks";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var data = GetData(settings, webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("\"{{DATA}}\"", data.json)
                .Replace("{{SYMBOL}}", settings["symbol"]);

            return javascript;
        }

        private Data GetData(Dictionary<string, string> settings, WebClient webClient)
        {            
            var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + settings["symbol"] + "&apikey=" + settings["key"];
            var html = webClient.DownloadString(url).Split("\n");

            html = html
                .Where(x => !x.Contains("high"))
                .Where(x => !x.Contains("low"))
                .Where(x => !x.Contains("close"))
                .Where(x => !x.Contains("volume"))
                .Select(x => x.Replace("1. open", "open"))
                .ToArray();

            return new Data
            {
                json = string.Join(Environment.NewLine, html)
            };
        }

        private struct Data
        {
            internal string json;
        }
    }
}