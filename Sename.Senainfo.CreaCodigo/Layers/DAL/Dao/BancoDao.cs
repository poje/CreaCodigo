using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class BancoDao : ConexionesModInstitucion
    {
        public BancoDao()
        {
            
        }

        public DataTable GetBancos()
        {
            return EjecutaSPToDataTable("Get_Bancos");
        }
    }
}
