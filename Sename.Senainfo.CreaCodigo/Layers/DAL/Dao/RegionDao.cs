using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class RegionDao : Repository
    {
        public DataTable Listar(int? codRegion)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListarRegion", con))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    DataTable dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@codRegion", codRegion.HasValue ? (object)codRegion : DBNull.Value);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

    }
}