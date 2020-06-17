using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class TipoProyectoDao : ConexionesModInstitucion
    {
        public DataTable GetTipoProyecto()
        {
            return EjecutaSPToDataTable("Get_TipoProyecto");
        }

        public DataTable GetTipoProyectoxModelo(int codModeloIntervencion)
        {
            ListParametros.Add(new SqlParameter("@codModeloIntervencion", codModeloIntervencion));

            return EjecutaSPToDataTable("[ModInstitucion].[GetTipoProyectoxModelo]", ListParametros);
        }
    }
}
