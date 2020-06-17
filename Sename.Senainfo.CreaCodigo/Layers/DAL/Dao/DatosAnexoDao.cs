using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class DatosAnexoDao : ConexionesModInstitucion
    {
        public DatosAnexoDao()
        {

        }

        public int Insert_DatosAnexo(int numeroCdp, int idUsuario, string icodVerificadorOffline, int codDeptoSename)
        {
            ListParametros.Clear();
            ListParametros.Add(new SqlParameter("@numeroCdp", numeroCdp));
            ListParametros.Add(new SqlParameter("@idUsuarioActualizacion", idUsuario));
            ListParametros.Add(new SqlParameter("@IcodVerificadorOffline", icodVerificadorOffline));
            ListParametros.Add(new SqlParameter("@CodDeptoSename", codDeptoSename));
            return EjecutaSpScalar("ModInstitucion.Insert_DatosAnexo", ListParametros);
        }

        public DataTable ListarDatosAnexo(int? codDatosAnexo, int idUsuario)
        {
            ListParametros.Add(new SqlParameter("@CodDatosAnexo", codDatosAnexo.HasValue ? (object)codDatosAnexo : DBNull.Value));
            ListParametros.Add(new SqlParameter("@IdUsuario", idUsuario));
            return EjecutaSPToDataTable("ModInstitucion.ListarDatosAnexo", ListParametros);
        }
    }
}
