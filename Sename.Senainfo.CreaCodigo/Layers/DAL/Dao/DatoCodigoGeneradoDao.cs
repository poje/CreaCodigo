using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class DatoCodigoGeneradoDao : Repository
    {
        public DataTable CreaCodigoGenerado(string opcion, int? icodProyectoAdjudicado, int codProyecto, int idUsuario, int? codProyectoHijo)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.CrudCodigoGenerado", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcion", opcion);
                    cmd.Parameters.AddWithValue("@IcodProyectoAdjudicado", icodProyectoAdjudicado ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodProyecto", codProyecto);
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    cmd.Parameters.AddWithValue("@CodProyectoHijo", codProyectoHijo ?? (object)DBNull.Value);
                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public DataTable CrudCodigoReserva(string opcion, int icodProyectoAdjudicado)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.CrudCodigoReserva", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcion", opcion);
                    cmd.Parameters.AddWithValue("@IcodProyectoAdjudicado", icodProyectoAdjudicado);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public DataTable ReporteCodigoGenerado(int icodCodigoGenerado)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ReporteCodigoGenerado", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IcodCodigoGenerado", icodCodigoGenerado);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

    }
}
