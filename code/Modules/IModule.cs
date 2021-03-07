namespace Ephemeral
{
    using System.Collections.Generic;
    using System.Net;

    internal interface IModule
    {
        public string GetName();

        public List<string> Run(Dictionary<string, string> settings, string sourceFolder, string outputFolder, WebClient webClient);
    }
}