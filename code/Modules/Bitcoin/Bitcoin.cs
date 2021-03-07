namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;

    internal class Bitcoin : IModule
    {
        public string GetName()
        {
            return "Bitcoin";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            try
            {
                var data = GetBitcoinData(webClient);
                string javascript = File.ReadAllText(sourceFolder + "template.js");
            
                javascript = javascript
                    .Replace("{{TODAY}}", data.today)
                    .Replace("{{YESTERDAY}}", data.yesterday)
                    .Replace("{{WEEK}}", data.week)
                    .Replace("{{MONTH}}", data.month)
                    .Replace("{{YEAR}}", data.year);

                File.WriteAllText(outputFolder + @"\bitcoin.js", javascript);

                return new List<string>() { @"<script src='modules/bitcoin.js'></script>" };
            }
            catch (Exception e)
            {
                return new List<string>() { "<script>console.log('Error in bitcoin module: " + e.Message + "');</script>" };
            }
        }

        private string FormatPercent(double percent)
        {
            return percent.ToString("+0.0;-0.0;0.0") + "%";
        }

        private Data GetBitcoinData(WebClient webClient)
        {
            var data = new Data();
            var url = "https://query1.finance.yahoo.com/v7/finance/download/BTC-GBP?period1=1583000000&period2={{END}}&interval=1d&events=history&includeAdjustedClose=true";
            url = url.Replace("{{END}}", DateTimeOffset.Now.ToUnixTimeSeconds().ToString());

            var html = webClient.DownloadString(url).Split('\n');

            var today = html.Where(a => a.StartsWith(DateTime.Now.ToString("yyyy-MM-dd"))).First().Split(',')[1];
            var yesterday = html.Where(a => a.StartsWith(DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd"))).First().Split(',')[1];
            var week = html.Where(a => a.StartsWith(DateTime.Now.AddDays(-7).ToString("yyyy-MM-dd"))).First().Split(',')[1];
            var month = html.Where(a => a.StartsWith(DateTime.Now.AddMonths(-1).ToString("yyyy-MM-dd"))).First().Split(',')[1];
            var year = html.Where(a => a.StartsWith(DateTime.Now.AddYears(-1).ToString("yyyy-MM-dd"))).First().Split(',')[1];

            double.TryParse(today, out double valueToday);
            double.TryParse(yesterday, out double valueYesterday);
            double.TryParse(week, out double valueWeek);
            double.TryParse(month, out double valueMonth);
            double.TryParse(year, out double valueYear);

            data.today = valueToday > 0 ? string.Format("£{0:0,000.00}", valueToday) : "NA";
            data.yesterday = valueToday > 0 && valueYesterday > 0 ? FormatPercent(valueToday / valueYesterday) : "NA";
            data.week = valueToday > 0 && valueWeek > 0 ? FormatPercent(valueToday / valueWeek) : "NA";
            data.month = valueToday > 0 && valueMonth > 0 ? FormatPercent(valueToday / valueMonth) : "NA";
            data.year = valueToday > 0 && valueYear > 0 ? FormatPercent(valueToday / valueYear) : "NA";

            return data;
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