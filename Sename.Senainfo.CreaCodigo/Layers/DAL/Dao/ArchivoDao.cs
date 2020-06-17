using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class ArchivoDao : Repository
    {
        public DataTable ArchivoTemporal(string opcion, string adjuntoOffline, int? idVerificadorAdjunto, int? icodDatoResolucion, int? icodProyectoAdjudicado, int? codArchivo, int? codTipoVerificador, int idUsuario)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ArchivoTemporal", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Opcion", opcion);
                    cmd.Parameters.AddWithValue("@AdjuntoOffline", string.IsNullOrWhiteSpace(adjuntoOffline) ? DBNull.Value : (object)adjuntoOffline);
                    cmd.Parameters.AddWithValue("@IdVerificadorAdjunto", idVerificadorAdjunto.HasValue ? (object)idVerificadorAdjunto : DBNull.Value);
                    cmd.Parameters.AddWithValue("@IcodDatoResolucion", icodDatoResolucion.HasValue ? (object)icodDatoResolucion : DBNull.Value);
                    cmd.Parameters.AddWithValue("@IcodProyectoAdjudicado", icodProyectoAdjudicado.HasValue ? (object)icodDatoResolucion : DBNull.Value);

                    cmd.Parameters.AddWithValue("@CodArchivo", codArchivo.HasValue ? (object)codArchivo : DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodTipoVerificador", codTipoVerificador.HasValue ? (object)codTipoVerificador : DBNull.Value);

                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    
                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }
        
        public string ObtenerRutaArchivo(string rutaVirtual)
        {
            using (var con = GetConnection())
            {
                using (var cmd = new SqlCommand("ModInstitucion.ObtenerArchivosPorRutaVirtual", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@RutaVirtual", rutaVirtual);

                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();
                    da.Fill(dt);
                    
                    return dt.Rows[0]["RutaFisica"] + "\\" + dt.Rows[0]["NombreArchivado"];
                }
            }
        }
    }
}
