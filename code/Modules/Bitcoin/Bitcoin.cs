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
            var data = GetData(webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
                .Replace("\"{{DATA}}\"", data.json)
                .Replace("{{DATE_LATEST}}", data.dateLatest)
                .Replace("{{DATE_PREVIOUS}}", data.datePrevious)
                .Replace("{{DATE_WEEK}}", data.dateWeek)
                .Replace("{{DATE_MONTH}}", data.dateMonth)
                .Replace("{{DATE_YEAR}}", data.dateYear)
                .Replace("{{VALUE_LATEST}}", data.valueLatest)
                .Replace("{{VALUE_PREVIOUS}}", data.valuePrevious)
                .Replace("{{VALUE_WEEK}}", data.valueWeek)
                .Replace("{{VALUE_MONTH}}", data.valueMonth)
                .Replace("{{VALUE_YEAR}}", data.valueYear);

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

        private Data GetData(WebClient webClient)
        {            
            var url =
                "https://query1.finance.yahoo.com/v7/finance/download/BTC-GBP?interval=1d&events=history&includeAdjustedClose=true&period1=1583000000&period2=" +
                DateTimeOffset.Now.ToUnixTimeSeconds().ToString();

            var html = webClient.DownloadString(url).Split('\n');

            var json = "[\n";

            foreach (var line in html.Skip(html.Length - 100))
            {
                var parts = line.Split(',');
                if (parts[1] != "null")
                {
                    json += "{ day:'" + parts[0] + "', number: " + parts[1] + ", tooltip: '" + parts[0] + "<br/>" + string.Format("£{0:n0}", decimal.Parse(parts[1])) + "' },\n";
                }
            }    

            json += "]";

            var valueLatest = GetValue(html, DateTime.Now);
            var valuePrevious = GetValue(html, DateTime.Now.AddDays(-1));
            var valueWeek = GetValue(html, DateTime.Now.AddDays(-7));
            var valueMonth = GetValue(html, DateTime.Now.AddMonths(-1));
            var valueYear = GetValue(html, DateTime.Now.AddYears(-1));

            return new Data
            {
                json = json,
                valueLatest = valueLatest > 0 ? string.Format("£{0:0,000.00}", valueLatest) : "NA",
                valuePrevious = FormatPercent(valueLatest, valuePrevious),
                valueWeek = FormatPercent(valueLatest, valueWeek),
                valueMonth = FormatPercent(valueLatest, valueMonth),
                valueYear = FormatPercent(valueLatest, valueYear),
                dateLatest = DateTime.Now.ToString("ddd, MMM d, yyyy"),
                datePrevious = DateTime.Now.AddDays(-1).ToString("ddd, MMM d, yyyy"),
                dateWeek = DateTime.Now.AddDays(-7).ToString("ddd, MMM d, yyyy"),
                dateMonth = DateTime.Now.AddMonths(-1).ToString("ddd, MMM d, yyyy"),
                dateYear = DateTime.Now.AddYears(-1).ToString("ddd, MMM d, yyyy"),
            };
        }

        private struct Data
        {
            internal string json;
            internal string dateLatest;
            internal string datePrevious;
            internal string dateWeek;
            internal string dateMonth;
            internal string dateYear;
            internal string valueLatest;
            internal string valuePrevious;
            internal string valueWeek;
            internal string valueMonth;
            internal string valueYear;
        }
    }
}