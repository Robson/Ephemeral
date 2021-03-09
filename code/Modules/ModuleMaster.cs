namespace Ephemeral
{
    using System.Collections.Generic;
    using System.IO;

    internal abstract class ModuleMaster
    {
        internal List<string> MakeStandardOutput(string outputFolder, string name, string javascript)
        {
            File.WriteAllText(outputFolder + @"\" + name + ".js", javascript);
            return new List<string>() { @"<script src='modules/" + name + ".js'></script>" };
        }
    }
}
