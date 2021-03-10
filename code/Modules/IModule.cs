namespace Ephemeral
{
    using System.Collections.Generic;
    using System.Net;

    internal interface IModule
    {
        public string GetName();

        public string Run(Dictionary<string, string> settings, string sourceFolder, WebClient webClient);
    }
}