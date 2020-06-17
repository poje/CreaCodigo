using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class TipoAtencionDao : ConexionesModInstitucion
    {
        public DataTable GetTiposAtencion(int? lrpa)
        {
            ListParametros.Add(new SqlParameter("@LRPA", lrpa.HasValue? (object)lrpa : DBNull.Value));
            return EjecutaSPToDataTable("ModInstitucion.GetTipoProyecto", ListParametros);
        }
    }
}
