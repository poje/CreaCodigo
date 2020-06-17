using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class LicitacionDao : ConexionesModInstitucion
    {
        public int Insert(int numeroCdp, int numeroLicitacion, DateTime fechaLicitacion, int codDeptoSename, char indVigencia, int idUsuarioActualizacion)
        {
            ListParametros.Clear();
            ListParametros.Add(new SqlParameter("@NumeroCdp", numeroCdp));
            ListParametros.Add(new SqlParameter("@NumeroLicitacion", numeroLicitacion));
            ListParametros.Add(new SqlParameter("@FechaLicitacion", fechaLicitacion));
            ListParametros.Add(new SqlParameter("@CodDeptoSename", codDeptoSename));
            ListParametros.Add(new SqlParameter("@IndVigencia", indVigencia));
            ListParametros.Add(new SqlParameter("@IdUsuarioActualizacion", idUsuarioActualizacion));

            return EjecutaSpScalar("ModInstitucion.Insert_Licitacion", ListParametros);
        }

        public DataTable GetLicitaciones(int? codLicitacion)
        {
            ListParametros.Clear();
            ListParametros.Add(new SqlParameter("@codLicitacion", codLicitacion.HasValue ? (object)codLicitacion : DBNull.Value));

            return EjecutaSPToDataTable("ModInstitucion.ListarLicitaciones", ListParametros);
        }
    }
}