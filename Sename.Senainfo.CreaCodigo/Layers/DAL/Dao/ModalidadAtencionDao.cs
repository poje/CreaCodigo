using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class ModalidadAtencionDao : ConexionesModInstitucion
    {
        public DataTable GetModalidadesAtencion(int? codModeloIntervencion)
        {
            ListParametros.Add(new SqlParameter("@CodModeloIntervencion", codModeloIntervencion));
            return EjecutaSPToDataTable("ModInstitucion.GetModalidadAtencion", ListParametros);
        }
    }
}
