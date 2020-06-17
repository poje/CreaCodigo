using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using SenainfoSdk;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Impl;
using SENAME.Senainfo.Mod_InstitucionProyecto.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.mod_instituciones
{
    public partial class ResolucionProyecto : System.Web.UI.Page
    {
        #region Constantes
       
        public const string AccesoPagina = "0E3AF266-1797-42A6-AA82-473444C922B5";

        public const string LecturaTabAnexo1 = "D5524D22-A549-4888-B02A-5B399EB13104";
        public const string EscrituraTabAnexo1 = "A28F1CAE-6DC2-4B2C-9459-7A796DAE0EF4";
        public const string LecturaTabLicitacion = "EA72FB46-C877-4372-8763-4E31D6CB82C7";
        public const string LecturaTabResolucion = "7B71659B-A697-46BF-A659-B6A58E81021A";
        public const string LecturaTabDatos = "DC39812B-B278-4CE9-8D4F-7C9CC77EFEFD";
        public const string LecturaTabGenera = "F4F1A65A-CA30-4D7B-9475-EE6F0538E6BD";
        public const string EscrituraTabLicitacion = "8C54FF0D-6CE7-49D6-ADD5-40B025539AC8";
        public const string EscrituraTabResolucion = "08F9D956-C691-4B69-811B-59188D27AF97";
        public const string EscrituraTabDatos = "7DD553A1-9464-42CE-A5EB-C545D7170150";
        public const string EscrituraTabGenera = "5ECAB6D4-408F-48E7-8A67-145E95216A6E";



        #endregion


        private string RolUsuario
        {
            get
            {
                if (Session["RolUsuario"] != null)
                    return (string)Session["RolUsuario"];
                else
                {
                    return string.Empty;
                }
            }
            set { Session["RolUsuario"] = value; }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            var usuario = HttpContext.Current.Session["IdUsuario"].ToString();

            if (Session["tokens"] == null || ((DataSet)Session["tokens"]).Tables[0].Rows.Count == 0 || !window.existetoken(AccesoPagina) )
            {
                Response.Redirect("~/logout.aspx");
            }

            hdfIdUsuario.Value = usuario;

            hdfLecturaAnexo1.Value = window.existetoken(LecturaTabAnexo1).ToString();
            hdfLecturaTabLicitacion.Value = window.existetoken(LecturaTabLicitacion).ToString();
            hdfLecturaTabResolucion.Value = window.existetoken(LecturaTabResolucion).ToString();
            hdfLecturaTabDatos.Value = window.existetoken(LecturaTabDatos).ToString();
            hdfLecturaTabGenera.Value = window.existetoken(LecturaTabGenera).ToString();
            hdfEscrituraAnexo1.Value = window.existetoken(EscrituraTabAnexo1).ToString();
            hdfEscrituraTabLicitacion.Value = window.existetoken(EscrituraTabLicitacion).ToString();
            hdfEscrituraTabResolucion.Value = window.existetoken(EscrituraTabResolucion).ToString();
            hdfEscrituraTabDatos.Value = window.existetoken(EscrituraTabDatos).ToString();
            hdfEscrituraTabGenera.Value = window.existetoken(EscrituraTabGenera).ToString();


        }

        [WebMethod(EnableSession = true)]
        public static int ObtenerIdRol()
        {
            return Convert.ToInt32(HttpContext.Current.Session["contrasena"].ToString());
        }


        [WebMethod(EnableSession = true)]
        public static List<TokenDto> ObtenerTokens()
        {
            var dt = ((DataSet)HttpContext.Current.Session["Tokens"]).Tables[0];
            return new TokenImpl().GetTokenList(dt);
        }


        [WebMethod(EnableSession = true)]
        public static List<DeptoSenameDto> ObtenerDeptosSename(int? codDepto)
        {
            return new DeptoSenameImpl().ObtenerDeptosSename(codDepto);
        }

        [WebMethod(EnableSession = true)]
        public static List<RegionDto> ObtenerRegiones()
        {
            //return new Region().ObtenerRegiones();
            var regionImpl = new RegionImpl();
            var result = regionImpl.Listar(null);
            return result;
        }

        [WebMethod(EnableSession = true)]
        public static List<ComunaDto> ObtenerComunas(int? codRegion)
        {
            return new ComunaImpl().ObtenerComunas(codRegion);
        }

        [WebMethod(EnableSession = true)]
        public static List<ModeloIntervencionDto> GetModelosIntervencion(int? codModeloIntervencion, int? lrpa)
        {
            return new ModeloIntervencionImpl().GetModelosIntervencion(codModeloIntervencion, lrpa);
        }

        [WebMethod(EnableSession = true)]
        public static List<ModeloIntervencionDto> GetModelosIntervencion(int? tipoProyecto)
        {
            return new ModeloIntervencionImpl().GetModelosIntervencion(tipoProyecto);
        }

        [WebMethod(EnableSession = true)]
        public static List<ModeloIntervencionDto> GetModelosIntervencionxDepto(int? codDepto)
        {
            return new ModeloIntervencionImpl().GetModeloIntervencionxDepto(codDepto);
        }

        [WebMethod(EnableSession = true)]
        public static List<DeptoSenameDto> ObtenerDeptosSenamexModeloIntervencion(int? codModeloIntervencion)
        {
            return new DeptoSenameImpl().ObtenerDeptosSenameXModeloIntervencion(codModeloIntervencion);
        }

        [WebMethod(EnableSession = true)]
        public static List<ModalidadAtencionDto> ObtenerModalidadesAtencion(int? codModeloIntervencion)
        {
            return new ModalidadAtencionImpl().ObtenerModalidadesAtencion(codModeloIntervencion);
        }

        [WebMethod(EnableSession = true)]
        public static List<TipoAtencionDto> ObtenerTiposAtencion(int? lrpa)
        {
            return new TipoAtencionImpl().ObtenerTiposAtencion(lrpa);
        }

        [WebMethod(EnableSession = true)]
        public static List<TipoProyectoDto> ObtenerTipoProyecto()
        {
            return new TipoProyectoImpl().GetTipoProyectos();
        }
        
        [WebMethod(EnableSession = true)]
        public static List<TipoProyectoDto> ObtenerTipoProyectoxModelo(int codModeloIntervencion)
        {
            return new TipoProyectoImpl().GetTipoProyectosxModelo(codModeloIntervencion);
        }

        [WebMethod(EnableSession = true)]
        public static int GuardarLicitacion(LicitacionDto licitacion) //(Licitacion licitacion, List<LicitacionProyecto> licitacionProyectos)
        {
            licitacion.IdUsuarioActualizacion = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            return new LicitacionImpl().InsertLicitacion(licitacion);
        }

        [WebMethod(EnableSession = true)]
        public static int GuardarLicitacionProyecto(LicitacionProyectoDto licitacionProyecto)
        {
            licitacionProyecto.IdUsuarioActualizacion = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            return new LicitacionProyectoImpl().Insert(licitacionProyecto);
        }

        [WebMethod]
        public static List<ModeloAdosadoDto> ObtenerModelosAdosados(int codModeloIntervencion)
        {
            return new ModeloAdosadoImpl().ObtenerModelosAdosados(codModeloIntervencion);
        }

        [WebMethod]
        public static int ObtenerCantidadModelosAdosados(int codModeloIntervencion)
        {
            return new ModeloAdosadoImpl().ObtenerCantidadModelosAdosados(codModeloIntervencion);
        }

        [WebMethod]
        public static List<BancoDto> ObtenerBancos()
        {
            return new BancoImpl().ObtenerBancos();
        }
        
        [WebMethod(EnableSession = true)]
        public static int GuardarDatosProyecto(DatosProyectoDto datosProyecto)
        {
            datosProyecto.IdUsuarioCreacion = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            datosProyecto.IdUsuarioActualizacion = datosProyecto.IdUsuarioCreacion;
            return new DatosProyectoImpl().Insert(datosProyecto);
        }   

        [WebMethod(EnableSession = true)]
        public static int GuardarValidacionArchivoResolucion(VerificadorAdjuntoDto verificadorAdjunto)
        {
            verificadorAdjunto.IdUsuario = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            return new VerificadorAdjuntoImpl().Insert(verificadorAdjunto);
        }

        [WebMethod(EnableSession = true)]
        public static List<LicitacionDto> ObtenerLicitaciones(int? codLicitacion)
        {
            return new LicitacionImpl().ListarLicitaciones(codLicitacion);
        }

        [WebMethod(EnableSession =  true)]
        public static int GuardarAnexo(int numeroCdp, string icodVerificadorOffline, int codDeptoSename)
        {
            var idUsuario = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            return new DatosAnexoImpl().Insert_DatosAnexo(numeroCdp, idUsuario, icodVerificadorOffline, codDeptoSename);
        }

        [WebMethod(EnableSession = true)]
        public static List<DatoProyectoDto> ObtenerProyectosDestino(int? codDepto, int? codRegion)
        {
            var idUsuario = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());

            return new ProyectoImpl().ListarProyectoContinuidad(codDepto, codRegion, idUsuario);
        }

        [WebMethod(EnableSession = true)]
        public static DatosProyectoContinuidadDto ObtenerDatosProyectoContinuidad(int codProyectoContinuidad)
        {
            return new ProyectoImpl().ObtenerDatosProyectoContinuidad(codProyectoContinuidad);
        }


        #region Hector Gatica 13-01-2020

        [WebMethod(EnableSession = true)]
        public static List<DatosAnexoDto> ObtenerDatosAnexos(int? codDatosAnexo)
        {
            var idUsuario = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());

            return new DatosAnexoImpl().ObtenerDatosAnexo(codDatosAnexo, idUsuario);
        }

        [WebMethod(EnableSession = true)]
        public static List<DatoProyectoDto> ListaProyectoEdicion()
        {
            var idUsuario = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            return new ProyectoImpl().ListaProyectoEdicion(idUsuario);
        }
         
        [WebMethod(EnableSession = true)]
        public static List<ListaLicitacionProyectoDto> ListaLicitacionProyecto(string parameters)
        {
            var q = JsonConvert.DeserializeObject<OpcionParams>(parameters);

            return new DatosResolucionImpl().ListaLicitacionProyecto(
                Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString()),q.Opcion);
        }

        [WebMethod]
        public static List<ListaTipoResolucionDto> ListaTipoResolucion()
        {
            return new DatosResolucionImpl().ListaTipoResolucion();
        }

        [WebMethod]
        public static List<TipoTerminoResolucionDto> ListaTipoTerminoResolucion()
        {
            return new TipoTerminoResolucionImpl().ObtenerTipoTerminoResolucion();
        }

        [WebMethod(EnableSession = true)]
        public static List<Institucion> ListaInstitucionUsuario()
        {
            var institucionImpl = new InstitucionImpl();
            var result = institucionImpl.ListaInstitucionUsuario(Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString()));
            return result;
        }

        [WebMethod(EnableSession = true)]
        public static RespuestaDto CreaDatoResolucion(string parameters)
        {
            var serializeSettings = new JsonSerializerSettings();
            serializeSettings.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy" });

            var q = JsonConvert.DeserializeObject<DatoResolucionDto>(parameters, serializeSettings);
            q.IdUsuarioCreacion = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            var resolucionImpl = new DatosResolucionImpl();
            var result = resolucionImpl.CrudDatoResolucion("C", q.IcodDatoResolucion, q.CodTipoResolucion,
                q.CodLicitacionProyecto, q.IdentificadorResolucion, q.NumeroResolucion, q.IcodVerificadorOffline, q.CodTipoTermino, q.FechaResolucion, q.FechaConvenio, q.FechaInicio, q.FechaTermino, q.NumeroPlazas, q.IdUsuarioCreacion, q.CodProyecto, q.CodInstitucion, q.NombreProyecto, q.DireccionProyecto);
            return result;
        }

        [WebMethod(EnableSession = true)]
        public static RespuestaDto CreaDatoAdjudicado(string parameters)
        {
            var serializeSettings = new JsonSerializerSettings();
            serializeSettings.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy" });

            var q = JsonConvert.DeserializeObject<DatoAdjudicadoDto>(parameters, serializeSettings);
            q.IdUsuarioCreacion = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            var adjudicadoImpl = new DatoAdjudicadoImpl();
            q.Opcion = "C";
            q.CelularDirector = string.IsNullOrWhiteSpace(q.CelularDirector) ? string.Empty : q.CelularDirector;
            var result = adjudicadoImpl.CrudDatoAdjudicado(q.Opcion, q.IcodProyectoAdjudicado, q.IcodDatoResolucion, q.IcodVerificadorOffline,
                q.EmailProyecto, q.FechaInicio, q.FechaTermino, q.Telefono, q.NombreDirector,
                q.RutDirector.Replace(".",string.Empty), q.RutInstitucion.Replace(".", string.Empty), q.CelularDirector, q.CuentaCorriente, q.CodBanco, q.IdUsuarioCreacion, null);
            return result;
        }

        [WebMethod(EnableSession = true)]
        public static RespuestaDto EditaDatoAdjudicado(string parameters)
        {
            var serializeSettings = new JsonSerializerSettings();
            serializeSettings.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd-MM-yyyy" });

            var q = JsonConvert.DeserializeObject<DatoAdjudicadoDto>(parameters, serializeSettings);
            q.IdUsuarioCreacion = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            var adjudicadoImpl = new DatoAdjudicadoImpl();
            q.Opcion = "U";
            q.CelularDirector = string.IsNullOrWhiteSpace(q.CelularDirector) ? string.Empty : q.CelularDirector;
            var result = adjudicadoImpl.CrudDatoAdjudicado(q.Opcion, q.IcodProyectoAdjudicado, q.IcodDatoResolucion, q.IcodVerificadorOffline,
                q.EmailProyecto, q.FechaInicio, q.FechaTermino, q.Telefono, q.NombreDirector,
                q.RutDirector.Replace(".", string.Empty), q.RutInstitucion.Replace(".", string.Empty), q.CelularDirector, q.CuentaCorriente, q.CodBanco, q.IdUsuarioCreacion, q.CodProyecto);
            return result;
        }

        [WebMethod(EnableSession = true)]
        public static RespuestaDto CreaCodigoGenerado(string parameters)
        {
            var q = JsonConvert.DeserializeObject<DatoCodigoGeneradoDto>(parameters);
            q.IdUsuario = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());

            var codigo = new DatoCodigoGeneradoImpl();
            var result = codigo.CreaCodigoGenerado(q.Opcion, q.IcodProyectoAdjudicado, q.CodProyecto, q.IdUsuario, q.CodProyectoHijo);
            return result;
        }

        [WebMethod(EnableSession = true)]
        public static DatoAdjudicadoDto ListaDatoProyectoAdjudicado(string parameters)
        {
            var q = JsonConvert.DeserializeObject<DatoAdjudicadoDto>(parameters);

            q.IdUsuarioCreacion = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());

            var adjudicadoImpl = new DatoAdjudicadoImpl();
            var result = adjudicadoImpl.ListaDatoProyectoAdjudicado(q.IdUsuarioCreacion, q.IcodProyectoAdjudicado);
            return result;
        }

        [WebMethod]
        public static CodigoReservaDto CreaCodigoReserva(string parameters)
        {
            // GENERAR CODIGO DE RESERVA, SP YA HECHO.
            var q = JsonConvert.DeserializeObject<CodigoReservaParams>(parameters);
            var codigoR = new DatoCodigoGeneradoImpl();
            var result = codigoR.CrudCodigoReserva(q.Opcion, q.IcodProyectoAdjudicado);
            return result;
        }

        [WebMethod]
        public static string CreaOfflineId()
        {
            return Guid.NewGuid().ToString();
        }

        [WebMethod(EnableSession = true)]
        public static List<VerificadorAdjuntoDto> ListaArchivoTemporal(string parameters)
        {
            var q = JsonConvert.DeserializeObject<ListaArchivoTemporalParams>(parameters);
            var archivoImpl = new ArchivoImpl();
            var result = archivoImpl.ListaArchivoTemporal(q.AdjuntoOffline, Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString()), q.CodTipoVerificador);
            return result;
        }

        [WebMethod(EnableSession = true)]
        public static RespuestaDto BorraArchivoTemporal(string parameters)
        {
            var q = JsonConvert.DeserializeObject<BorraArchivoTemporalParams>(parameters);
            var archivoImpl = new ArchivoImpl();
            var result = archivoImpl.BorraArchivoTemporal(q.IdVerificadorAdjunto, Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString()));
            return result;
        }

        [WebMethod]
        public static DatoResolucionDto ListaDatosResolucion(string parameters)
        {
            var q = JsonConvert.DeserializeObject<ResolucionParams>(parameters);

            return q.IdUsuario != -1 ? new DatosResolucionImpl().ListaDatosResolucion(q.IdUsuario, q.IcodDatoResolucion, q.IdentificadorResolucion) : new DatoResolucionDto();
        }

        [WebMethod]
        public static string ObtenerNemotecnico(int codLicitacionProyecto)
        {
            return new LicitacionProyectoImpl().ObtenerNemotecnico(codLicitacionProyecto);
        }

        [WebMethod]
        public static int GuardarAdosadosProyectoLIcitacion(AdosadoProyectoLicitacionDto proyectoAdosadoProyectoLicitacion)
        {
            var idUsuario = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            var pyado = proyectoAdosadoProyectoLicitacion;

            pyado.Idusuarioactualizacion = idUsuario;
            
            return new AdosadoProyectoLicitacionImpl().Insert(pyado.CodLicitacionProyecto,pyado.CodModeloIntervencion,pyado.NumeroPlazas,pyado.Monto,pyado.IndVigencia,pyado.FechaCreacion,pyado.FechaActualizacion,pyado.Idusuarioactualizacion);
        }

        [WebMethod]
        public static List<LicitacionProyectoDto> ObtenerProyectos(int codLicitacion)
        {
            return new LicitacionProyectoImpl().Obtener(codLicitacion);
        }

        [WebMethod(EnableSession = true)]
        public static int CargarProyectosLicitacionExcel(string rutaVirtual)
        {
            int idUsuario = Convert.ToInt32(HttpContext.Current.Session["IdUsuario"].ToString());
            return new ArchivoImpl().ProcesarExcelCreaCodigo(rutaVirtual, idUsuario);
        }

        //[WebMethod]
        //public static List<LicitacionProyecto> Cargar

        #endregion
    }
}