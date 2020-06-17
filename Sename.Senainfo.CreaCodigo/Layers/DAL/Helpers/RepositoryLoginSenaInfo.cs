using System.Configuration;
using System.Data.SqlClient;

namespace SENAME.Senainfo.Mod_InstitucionProyecto.DAL.Helpers
{
    public class RepositoryLoginSenaInfo
    {
        private readonly string _connectionString;
        protected int FilasAfectadas;
        protected string Mensaje;

        public RepositoryLoginSenaInfo()
        {
            _connectionString = ConfigurationManager.ConnectionStrings["ConexionesSS"].ConnectionString;
        }
        
        protected SqlConnection GetConnectionLogin()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
