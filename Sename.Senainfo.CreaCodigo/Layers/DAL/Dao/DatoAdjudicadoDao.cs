using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class DatoAdjudicadoDao : Repository
    {
        public DataTable CrudDatoAdjudicado(string opcion, int? icodProyectoAdjudicado, int? icodDatoResolucion, string icodVerificadorOffline, 
        string emailProyecto, DateTime fechaInicio, DateTime fechaTermino,string telefono, string nombreDirector, string rutDirector,
        string rutInstitucion, string celularDirector, string cuentaCorriente, int codBanco, int idUsuarioCreacion, int? codProyecto)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.CrudDatoAdjudicado", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcion", opcion);
                    cmd.Parameters.AddWithValue("@IcodProyectoAdjudicado", icodProyectoAdjudicado ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@IcodDatoResolucion", icodDatoResolucion ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@IcodVerificadorOffline", icodVerificadorOffline);
                    cmd.Parameters.AddWithValue("@EmailProyecto", emailProyecto);
                    cmd.Parameters.AddWithValue("@FechaInicio", fechaInicio);
                    cmd.Parameters.AddWithValue("@FechaTermino", fechaTermino);
                    cmd.Parameters.AddWithValue("@Telefono", telefono);
                    cmd.Parameters.AddWithValue("@NombreDirector", nombreDirector);
                    cmd.Parameters.AddWithValue("@RutDirector", rutDirector);
                    cmd.Parameters.AddWithValue("@RutInstitucion", rutInstitucion);
                    cmd.Parameters.AddWithValue("@CelularDirector", celularDirector);
                    cmd.Parameters.AddWithValue("@CuentaCorriente", cuentaCorriente);
                    cmd.Parameters.AddWithValue("@CodBanco", codBanco);
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuarioCreacion);
                    cmd.Parameters.AddWithValue("@CodProyecto", codProyecto ?? (object)DBNull.Value);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public DataTable ListaDatoProyectoAdjudicado(int idUsuario, int icodProyectoAdjudicado)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListaDatosLicitacionProyecto", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    cmd.Parameters.AddWithValue("@IcodProyectoAdjudicado", icodProyectoAdjudicado);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }




    }
}
