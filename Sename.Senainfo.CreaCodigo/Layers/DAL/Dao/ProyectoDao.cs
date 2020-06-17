using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class ProyectoDao : Repository
    { 
        public DataTable Listar(int? codProyecto, int? codDireccionRegional, int? codInstitucion, string indVigencia, int? icodTrabajador)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListarProyecto", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CodProyecto", codProyecto.HasValue ? (object)codProyecto : DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodDireccionRegional", codDireccionRegional.HasValue ? (object)codDireccionRegional : DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodInstitucion", codInstitucion.HasValue ? (object)codInstitucion : DBNull.Value);
                    cmd.Parameters.AddWithValue("@IndVigencia", !string.IsNullOrWhiteSpace(indVigencia) ? (object)indVigencia : DBNull.Value);
                    cmd.Parameters.AddWithValue("@ICodTrabajador", icodTrabajador.HasValue ? (object)icodTrabajador : DBNull.Value);
                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }
         
        public DataTable ListarProyectoByuserId(int? idUsuario, string indVigencia, int? codInstitucion)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("Get_Proyectos_ByUserId2", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userid", idUsuario.HasValue ? (object)idUsuario : DBNull.Value);
                    cmd.Parameters.AddWithValue("@IndVigencia", !string.IsNullOrWhiteSpace(indVigencia) ? (object)indVigencia : DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodInstitucion", codInstitucion.HasValue ? (object)codInstitucion : DBNull.Value);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }

        public int ObtenerCodNuevoProyecto(int codRegion)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.GetCodigoNuevoProyecto", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@codRegion", codRegion);

                    return Convert.ToInt32(cmd.ExecuteScalar());
                }
            }
        }

        public DataTable ObtenerDatosProyecto(int codProyecto)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.GetDatosProyecto", con))
                {
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@codProyecto", codProyecto);

                    var sqlda = new SqlDataAdapter(cmd);

                    sqlda.SelectCommand = cmd;

                    sqlda.Fill(dt);

                    return dt;
                }
            }
        }


        public DataTable ObtenerProyectoOrigen(int administracionDirecta){
            using (var con = GetConnection()){
                con.Open();

                using (var cmd = new SqlCommand("Migracion.GetProyectosOrigen", con)){
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@administracionDireta", administracionDirecta);

                    var sqlda =new SqlDataAdapter(cmd);

                    sqlda.SelectCommand = cmd;

                    sqlda.Fill(dt);
                    
                    return dt;
                }
            }
        }
        
        public SqlCommand GetCommand_Insert_Proyecto(int codProyecto, int codInstitucion, int codRegion, int codComuna,
            string localidad, int tipoProyecto, int tipoSubvencion, int codTipoAtencion, int codTematicaProyecto,
            int codModeloIntervencion, int codSistemaAsistencial, int codDepartamentoSename,
            int codCausalTerminoProyecto, int codInstitucionOrigen, int codProyectoOrigen, string nombre,
            string nombreCorto, string rutNumeroProyecto, string direccion, string telefono, string mail, string fax,
            int calidadVidaFamiliar, string director, string rutDirector, DateTime fechaAniversario,
            int edadMaximaPermanencia, int codBanco, string nroCuentaCorriente, DateTime fechaTermino, int edadMinima,
            int edadMaximaIngreso, int etapas, int montoInversion, int montoOperacion, int montoPersonal,
            int idUsuarioTecnico, char indVigencia, DateTime fechaCreacion, int proyectoDeContinuacion,
            DateTime fechaActualizacion, int idUsuarioActualizacion, int estadoProyecto, int numeroPlazas, string celularDirector)
        {
            

            var listParametros = new List<SqlParameter>
            {
                new SqlParameter("@CodProyecto", codProyecto),
                new SqlParameter("@CodInstitucion", codInstitucion),
                new SqlParameter("@CodRegion", codRegion),
                new SqlParameter("@CodComuna", codComuna),
                new SqlParameter("@Localidad", localidad),
                new SqlParameter("@TipoProyecto", tipoProyecto),
                new SqlParameter("@TipoSubvencion", tipoSubvencion),
                new SqlParameter("@CodTipoAtencion", codTipoAtencion),
                new SqlParameter("@CodTematicaProyecto", codTematicaProyecto),
                new SqlParameter("@CodModeloIntervencion", codModeloIntervencion),
                new SqlParameter("@CodSistemaAsistencial", codSistemaAsistencial),
                new SqlParameter("@CodDepartamentosSENAME", codDepartamentoSename),
                new SqlParameter("@CodInstitucionOrigen", codInstitucionOrigen),
                new SqlParameter("@CodProyectoOrigen", codProyectoOrigen),
                new SqlParameter("@Nombre", nombre),
                new SqlParameter("@RutNumeroProyecto", rutNumeroProyecto.Replace(".","")),
                new SqlParameter("@Direccion", direccion),
                new SqlParameter("@Telefono", telefono),
                new SqlParameter("@Mail", mail),
                new SqlParameter("@CalidadVidaFamiliar", calidadVidaFamiliar),
                new SqlParameter("@Director", director),
                new SqlParameter("@RutDirector", rutDirector.Replace(".", "")),
                new SqlParameter("@EdadMaximaPermanencia", edadMaximaPermanencia),
                new SqlParameter("@CodBanco", codBanco),
                new SqlParameter("@CuentaCorrienteNumero", nroCuentaCorriente),
                new SqlParameter("@FechaTermino", fechaTermino),
                new SqlParameter("@EdadMinima", edadMinima),
                new SqlParameter("@EdadMaximaIngreso", edadMaximaPermanencia),
                new SqlParameter("@Etapas", etapas),
                new SqlParameter("@MontoInversion", montoInversion),
                new SqlParameter("@MontoOperacion", montoOperacion),
                new SqlParameter("@MontoPersonal", montoPersonal),
                new SqlParameter("@FechaCreacion", fechaCreacion),
                new SqlParameter("@ProyectoDeContinuacion", proyectoDeContinuacion),
                new SqlParameter("@IdUsuarioActualizacion", idUsuarioActualizacion),
                new SqlParameter("@EstadoProyecto", estadoProyecto),
                new SqlParameter("@NumeroPlazas", numeroPlazas),
                new SqlParameter("@CelularDirector", celularDirector.Replace("-",""))
            };

            var cmd = new SqlCommand("ModInstitucion.Insert_Proyecto");

            foreach (var parametro in listParametros)
            {
                cmd.Parameters.Add(parametro);
            }

            return cmd;
        }

        public DataTable ListaProyectoEdicion(int idUsuario)
        {
            using (var con = GetConnection())
            {
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.ListaProyectoEdicion", con))
                {
                    var da = new SqlDataAdapter(cmd);
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);

                    da.SelectCommand = cmd;
                    da.Fill(dt);
                    return dt;
                }
            }
        }


        public DataTable ListarProyectoContinuidad(int? codDepto, int? codRegion, int idUsuario)
        {
            using (var con = GetConnection()){
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.GetProyectosContinuidad", con)){
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CodDepto", codDepto.HasValue ? (object) codDepto : DBNull.Value);
                    cmd.Parameters.AddWithValue("@CodRegion", codRegion.HasValue ? (object) codRegion: DBNull.Value);
                    cmd.Parameters.AddWithValue("@Idusuario", idUsuario);

                    var sqlda =new SqlDataAdapter(cmd);

                    sqlda.SelectCommand = cmd;

                    sqlda.Fill(dt);
                    
                    return dt;
                }
            }
        }

        public DataTable ObtenerDatosProyectoContinuidad(int codProyecto)
        {
            using (var con = GetConnection()){
                con.Open();

                using (var cmd = new SqlCommand("ModInstitucion.GetDatosProyectoContinuidad", con)){
                    var dt = new DataTable();

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CodProyecto", codProyecto);

                    var sqlda =new SqlDataAdapter(cmd);

                    sqlda.SelectCommand = cmd;

                    sqlda.Fill(dt);
                    
                    return dt;
                }
            }
        }
    }
}
