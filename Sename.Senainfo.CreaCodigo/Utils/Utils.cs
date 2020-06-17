using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using CrystalDecisions.Shared;

namespace Sename.Senainfo.CreaCodigo.Utils
{
    public class Utils
    {
        public static ConnectionInfo BuildConnection(string dbConnection)
        {
            var connString = ConfigurationManager.ConnectionStrings[dbConnection].ConnectionString;
            var connStringBuilder = new SqlConnectionStringBuilder(connString);

            var myConnectionInfo = new ConnectionInfo
            {
                DatabaseName = connStringBuilder.InitialCatalog,
                UserID = connStringBuilder.UserID,
                Password = connStringBuilder.Password,
                ServerName = connStringBuilder.DataSource
            };

            return myConnectionInfo;
        }

        public static byte[] StreamToBytes(Stream input)
        {
            using (var ms = new MemoryStream())
            {
                input.CopyTo(ms);
                return ms.ToArray();
            }
        }
    }
}