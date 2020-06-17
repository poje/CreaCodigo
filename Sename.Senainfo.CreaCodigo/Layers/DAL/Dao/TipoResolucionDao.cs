using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class TipoResolucionDao : ConexionesModInstitucion
    {
        public DataTable GetTiposResolucion(int estadoProyecto)
        {
            ListParametros.Add(new SqlParameter("@estadoProyecto", estadoProyecto));
            return EjecutaSPToDataTable("ModInstitucion.GetTipoResolucion", ListParametros);
        }
    }
}