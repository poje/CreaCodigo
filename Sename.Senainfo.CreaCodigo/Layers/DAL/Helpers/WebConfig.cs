using System;
using System.Collections.Specialized;
using System.Configuration;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers
{
    public class WebConfig
    {
        public static string UrlValidaCorreo
        {
            get { return ConfigurationManager.AppSettings["UrlValidaCorreo"]; }
        }

        public static string SubjectMail
        {
            get { return ConfigurationManager.AppSettings["SubjectMail"]; }
        }

        public static string UrlBase
        {
            get { return ConfigurationManager.AppSettings["URLBase"]; }
        }

        public static int DiasCaduca
        {
            get
            {
                NameValueCollection value =
                    (NameValueCollection)ConfigurationManager.GetSection("ModInstitucion");
                return Convert.ToInt32(value["ParametroCaduca"]);
            }
        }

        public static int GetIdentificadorSistema(string section)
        {
            var value =
                (NameValueCollection)ConfigurationManager.GetSection(section);
            return Convert.ToInt32(value["IdentificadorSistema"]);
        }
    }
}