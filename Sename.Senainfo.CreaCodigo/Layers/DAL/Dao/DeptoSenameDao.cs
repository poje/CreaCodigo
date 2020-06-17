using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class DeptoSenameDao : ConexionesModInstitucion
    {
        public DeptoSenameDao()
        {

        }

        public DataTable GetDeptosSename(int? codDepto)
        {
            ListParametros.Add(new SqlParameter("@CodDepto", codDepto.HasValue ? (object)codDepto : DBNull.Value));
            return EjecutaSPToDataTable("ModInstitucion.GetDeptosSename", ListParametros);
        }

        public DataTable GetDeptosSenamexModeloIntervencion(int? codModeloIntervencion)
        {
            ListParametros.Add(new SqlParameter("@CodModeloIntervencion", codModeloIntervencion.HasValue ? (object)codModeloIntervencion : DBNull.Value));
            return EjecutaSPToDataTable("ModInstitucion.GetDepartamentosXModeloIntervencion", ListParametros);
        }
    }
}