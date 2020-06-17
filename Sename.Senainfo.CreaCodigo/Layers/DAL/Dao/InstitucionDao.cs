using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class InstitucionDao : Repository
    {
        public DataTable Listar(int? codInstitucion, int? codDireccionRegional, string indVigencia)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListarInstitucion", con))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@codInstitucion", codInstitucion.HasValue ? (object)codInstitucion : DBNull.Value);
                    cmd.Parameters.AddWithValue("@codDireccionRegional", codDireccionRegional.HasValue ? (object)codDireccionRegional : DBNull.Value);
                    cmd.Parameters.AddWithValue("@indVigencia", indVigencia);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public DataTable Listar(int? userId)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("Get_Instituciones_byuserid", con))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", userId.HasValue ? (object) userId : DBNull.Value);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public DataTable ListaInstitucionUsuario(int idUsuario)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListaInstitucionUsuario", con))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }


        public DataTable ListarInstitucionesxTipoinstitucion(int tipoInstitucion)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("Migracion.GetInstitucionesxTipoInstitucion", con))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@TipoInstitucion", tipoInstitucion));

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public DataTable ListarInstitucionPorRegion(int codRegion)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListarInstitucionPorRegion", con))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@codRegion", codRegion);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }
    }
}
