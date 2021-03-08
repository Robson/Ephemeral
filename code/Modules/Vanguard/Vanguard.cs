namespace Ephemeral
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Vanguard : IModule
    {
        public string GetName()
        {
            return "Vanguard";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            try
            {
                var data = GetBitcoinData(webClient);
                string javascript = File.ReadAllText(sourceFolder + "template.js");

                javascript = javascript
                    .Replace("{{LATEST}}", data.latest)
                    .Replace("{{PREVIOUS}}", data.previous)
                    .Replace("{{WEEK}}", data.week)
                    .Replace("{{MONTH}}", data.month)
                    .Replace("{{YEAR}}", data.year)
                    .Replace("{{DATE_LATEST}}", data.dateLatest)
                    .Replace("{{DATE_PREVIOUS}}", data.datePrevious)
                    .Replace("{{DATE_WEEK}}", data.dateWeek)
                    .Replace("{{DATE_MONTH}}", data.dateMonth)
                    .Replace("{{DATE_YEAR}}", data.dateYear);

                File.WriteAllText(outputFolder + @"\vanguard.js", javascript);

                return new List<string>() { @"<script src='modules/vanguard.js'></script>" };
            }
            catch (Exception e)
            {
                return new List<string>() { "<script>console.log('Error in vanguard module: " + e.Message + "');</script>" };
            }
        }

        private string FormatPercent(double percent)
        {
            return percent.ToString("+0.00;-0.00;0.00") + "%";
        }

        private Data GetBitcoinData(WebClient webClient)
        {
            var data = new Data();
            var url = "https://markets.ft.com/data/funds/tearsheet/historical?s=GB00BD3RZ582:GBP";
            var html = webClient.DownloadString(url);

            var rows = Regex.Matches(html, "<span class=\"mod-ui-hide-medium-above\">([\\w,\\d ]+)</span></td><td>([\\d\\.]+)</td>");

            var latest = double.Parse(rows[0].Groups[2].Value);
            data.latest = string.Format("£{0:0.00}/share", latest);
            data.dateLatest = rows[0].Groups[1].Value;

            var previous = double.Parse(rows[1].Groups[2].Value);
            data.previous = FormatPercent(((latest / previous) - 1) * 100);
            data.datePrevious = rows[1].Groups[1].Value;

            var week = double.Parse(rows[5].Groups[2].Value);
            data.week = FormatPercent(((latest / week) - 1) * 100);
            data.dateWeek = rows[5].Groups[1].Value;

            var month = double.Parse(rows.Last().Groups[2].Value);
            data.month = FormatPercent(((latest / month) - 1) * 100);
            data.dateMonth = rows.Last().Groups[1].Value;

            var yearAgo = Regex.Match(html, "1 Year change(<[^>]+>){5}(\\-|\\+)([\\d\\.]+)%").Groups[3].Value;
            var year = FormatPercent(double.Parse(yearAgo));
            data.year = year;
            data.dateYear = string.Empty;

            return data;
        }

        private struct Data
        {
            internal string latest;
            internal string previous;
            internal string week;
            internal string month;
            internal string year;
            internal string dateLatest;
            internal string datePrevious;
            internal string dateWeek;
            internal string dateMonth;
            internal string dateYear;
        }
    }
}