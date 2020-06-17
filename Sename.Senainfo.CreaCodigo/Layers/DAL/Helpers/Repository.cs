using System.Configuration;
using System.Data.SqlClient;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers
{
    public class Repository
    {
        private readonly string _connectionString;
        protected int FilasAfectadas;
        protected string Mensaje;

        public Repository()
        {
            _connectionString = ConfigurationManager.ConnectionStrings["Conexiones"].ConnectionString;
        }
        
        protected SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
