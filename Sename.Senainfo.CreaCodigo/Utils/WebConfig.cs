using System.Collections.Specialized;
using System.Configuration;

namespace Sename.Senainfo.CreaCodigo.Utils
{
    public class WebConfig
    {
        public static string PathReportes
        {
            get
            {
                var value =
                    (NameValueCollection)ConfigurationManager.GetSection("ModInstitucion");
                return value["PathReportes"];
            }
        }
    }
}