using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class ComunaDao : ConexionesModInstitucion
    {
        public ComunaDao()
        {

        }

        public DataTable GetComunas(int? codRegion)
        {
            ListParametros.Add(new SqlParameter("@CodRegion", codRegion.HasValue ? (object)codRegion : DBNull.Value));
            return EjecutaSPToDataTable("GetComunaByRegion", ListParametros);
        }
    }
}