namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text.RegularExpressions;

    internal class Vanguard : ModuleMaster, IModule
    {
        public string GetName()
        {
            return "vanguard";
        }

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient)
        {
            var data = GetBitcoinData(webClient);
            var javascript = File.ReadAllText(sourceFolder + "template.js")
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

            return MakeStandardOutput(outputFolder, this.GetName(), javascript);
        }

        private string FormatPercent(double percent)
        {
            return percent.ToString("+0.00;-0.00;0.00") + "%";
        }

        private Data GetBitcoinData(WebClient webClient)
        {            
            var url = "https://markets.ft.com/data/funds/tearsheet/historical?s=GB00BD3RZ582:GBP";
            var html = webClient.DownloadString(url);
            var rows = Regex.Matches(html, "<span class=\"mod-ui-hide-medium-above\">([\\w,\\d ]+)</span></td><td>([\\d\\.]+)</td>");
            var latest = double.Parse(rows[0].Groups[2].Value);
            var previous = double.Parse(rows[1].Groups[2].Value);
            var week = double.Parse(rows[5].Groups[2].Value);
            var month = double.Parse(rows.Last().Groups[2].Value);
            var year = Regex.Match(html, "1 Year change(<[^>]+>){5}(\\-|\\+)([\\d\\.]+)%").Groups[3].Value;

            return new Data
            {
                dateLatest = rows[0].Groups[1].Value,
                valueLatest = string.Format("£{0:0.00}/share", latest),
                datePrevious = rows[1].Groups[1].Value,
                valuePrevious = FormatPercent(((latest / previous) - 1) * 100),
                dateWeek = rows[5].Groups[1].Value,
                valueWeek = FormatPercent(((latest / week) - 1) * 100),
                dateMonth = rows.Last().Groups[1].Value,
                valueMonth = FormatPercent(((latest / month) - 1) * 100),
                dateYear = string.Empty,
                valueYear = FormatPercent(double.Parse(year))
            };
        }

        private struct Data
        {
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