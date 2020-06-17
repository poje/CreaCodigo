using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class DatosResolucionDao : Repository
    {

        public DataTable CrudDatoResolucion(string opcion, int? icodDatoResolucion, int codTipoResolucion, int codLicitacionProyecto, string identificadorResolucion, 
            string numeroResolucion, string icodVerificadorOffline, int? codTipoTermino, DateTime fechaResolucion, DateTime fechaConvenio, DateTime fechaInicio, DateTime fechaTermino, int? numeroPlazas, int idUsuarioCreacion, int? codProyecto, int codInstitucion, string nombreProyecto, string direccion)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.CrudDatoResolucion", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcion", opcion);
                    cmd.Parameters.AddWithValue("@IcodDatoResolucion", icodDatoResolucion ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodTipoResolucion", codTipoResolucion);
                    cmd.Parameters.AddWithValue("@CodLicitacionProyecto", codLicitacionProyecto);
                    cmd.Parameters.AddWithValue("@IdentificadorResolucion", identificadorResolucion);
                    cmd.Parameters.AddWithValue("@NumeroResolucion", numeroResolucion);
                    cmd.Parameters.AddWithValue("@IcodVerificadorOffline", icodVerificadorOffline);
                    cmd.Parameters.AddWithValue("@FechaResolucion", fechaResolucion);
                    cmd.Parameters.AddWithValue("@FechaConvenio", fechaConvenio);
                    cmd.Parameters.AddWithValue("@FechaInicio", fechaInicio);
                    cmd.Parameters.AddWithValue("@FechaTermino", fechaTermino);
                    cmd.Parameters.AddWithValue("@NumeroPlazas", numeroPlazas ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodTipoTermino", codTipoTermino ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuarioCreacion);
                    cmd.Parameters.AddWithValue("@CodProyecto", codProyecto ?? (object) DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodInstitucion", codInstitucion);
                    cmd.Parameters.AddWithValue("@NombreProyecto", nombreProyecto);
                    cmd.Parameters.AddWithValue("@Direccion", direccion);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public DataTable ListaLicitacionProyecto(int idUsuario, string opcion)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListaLicitacionProyecto", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdUsuario", (object)idUsuario);
                    cmd.Parameters.AddWithValue("@Opcion", (object)opcion);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public DataTable ListaTipoResolucion()
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListaTipoResolucion", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }


        public DataTable ListaDatosResolucion(int idUsuario, int? icodDatoResolucion, string identificadorResolucion)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListaDatosResolucion", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    cmd.Parameters.AddWithValue("@IcodDatoResolucion", icodDatoResolucion ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@IdentificadorResolucion", !string.IsNullOrWhiteSpace(identificadorResolucion) ?  identificadorResolucion : (object)DBNull.Value);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }
    }
}
