namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;

    internal class Bitcoin : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "bitcoin";
        }

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient)
        {
            var data = GetBitcoinData(webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("{{TODAY}}", data.today)
                .Replace("{{YESTERDAY}}", data.yesterday)
                .Replace("{{WEEK}}", data.week)
                .Replace("{{MONTH}}", data.month)
                .Replace("{{YEAR}}", data.year);

            return javascript;
        }

        private string FormatPercent(double first, double second)
        {
            return first > 0 && second > 0 ? (first / second).ToString("+0.0;-0.0;0.0") + "%" : "NA";
        }

        private double GetValue(string[] html, DateTime when)
        {
            var day = html.Where(a => a.StartsWith(when.ToString("yyyy-MM-dd"))).First().Split(',')[1];
            double.TryParse(day, out double value);
            return value;
        }

        private Data GetBitcoinData(WebClient webClient)
        {            
            var url =
                "https://query1.finance.yahoo.com/v7/finance/download/BTC-GBP?interval=1d&events=history&includeAdjustedClose=true&period1=1583000000&period2=" +
                DateTimeOffset.Now.ToUnixTimeSeconds().ToString();

            var html = webClient.DownloadString(url).Split('\n');

            var valueToday = GetValue(html, DateTime.Now);
            var valueYesterday = GetValue(html, DateTime.Now.AddDays(-1));
            var valueWeek = GetValue(html, DateTime.Now.AddDays(-7));
            var valueMonth = GetValue(html, DateTime.Now.AddMonths(-1));
            var valueYear = GetValue(html, DateTime.Now.AddYears(-1));

            return new Data
            {
                today = valueToday > 0 ? string.Format("£{0:0,000.00}", valueToday) : "NA",
                yesterday = FormatPercent(valueToday, valueYesterday),
                week = FormatPercent(valueToday, valueWeek),
                month = FormatPercent(valueToday, valueMonth),
                year = FormatPercent(valueToday, valueYear)
            };
        }

        private struct Data
        {
            internal string today;
            internal string yesterday;
            internal string week;
            internal string month;
            internal string year;
        }
    }
}