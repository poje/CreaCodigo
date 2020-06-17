using System;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class ProyectoDto
    {
        public int CodProyecto { get; set; }
        public int CodInstitucion { get; set; }
        public int CodRegion { get; set; }
        public int CodComuna { get; set; }
        public string Localidad { get; set; }
        public int TipoProyecto { get; set; }
        public int TipoSubvencion { get; set; }
        public int CodTipoAtencion { get; set; }
        public int CodTematicaProyecto { get; set; }
        public int CodModeloIntervencion { get; set; }
        public int CodSistemaAsistencial { get; set; }
        public int CodDepartamentoSename { get; set; }
        public int CodCausalTerminoProyecto { get; set; }
        public int CodInstitucionOrigen { get; set; }
        public int CodProyectoOrigen { get; set; }
        public string Nombre { get; set; }
        public string NombreCorto { get; set; }
        public string RutNumeroProyecto { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Mail { get; set; }
        public string Fax { get; set; }
        public int CalidadVidaFamiliar { get; set; }
        public string Director { get; set; }
        public string RutDirector { get; set; }
        public DateTime FechaAniversario { get; set; }
        public int EdadMaximaPermanencia { get; set; }
        public int CodBanco { get; set; }
        public string NroCuentaCorriente { get; set; }
        public DateTime FechaTermino { get; set; }
        public int EdadMinima { get; set; }
        public int EdadMaximaIngreso { get; set; }
        public int Etapas { get; set; }
        public int MontoInversion { get; set; }
        public int MontoOperacion { get; set; }
        public int MontoPersonal { get; set; }
        public int IdUsuarioTecnico { get; set; }
        public char IndVigencia { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int ProyectoDeContinuacion { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public int IdUsuarioActualizacion { get; set; }
        public int EstadoProyecto { get; set; }
        public int NumeroPlazas { get; set; }
        public DateTime FechaTraspaso { get; set; }
        public string Mail1 { get; set; }
        public string Mail2 { get; set; }
        public string Mail3 { get; set; }
        public string CelularDirector { get; set; }

        public ProyectoDto()
        {
            
        }

        public ProyectoDto(int codProyecto, int codInstitucion, int codRegion, int codComuna, string localidad, int tipoProyecto, int tipoSubvencion, int codTipoAtencion, int codTematicaProyecto, int codModeloIntervencion, int codSistemaAsistencial, int codDepartamentoSename, int codCausalTerminoProyecto, int codInstitucionOrigen, int codProyectoOrigen, string nombre, string nombreCorto, string rutNumeroProyecto, string direccion, string telefono, string mail, string fax, int calidadVidaFamiliar, string director, string rutDirector, DateTime fechaAniversario, int edadMaximaPermanencia, int codBanco, string nroCuentaCorriente, DateTime fechaTermino, int edadMinima, int edadMaximaIngreso, int etapas, int montoInversion, int montoOperacion, int montoPersonal, int idUsuarioTecnico, char indVigencia, DateTime fechaCreacion, int proyectoDeContinuacion, DateTime fechaActualizacion, int idUsuarioActualizacion, int estadoProyecto, int numeroPlazas, DateTime fechaTraspaso, string mail1, string mail2, string mail3, string celularDirector)
        {
            CodProyecto = codProyecto;
            CodInstitucion = codInstitucion;
            CodRegion = codRegion;
            CodComuna = codComuna;
            Localidad = localidad;
            TipoProyecto = tipoProyecto;
            TipoSubvencion = tipoSubvencion;
            CodTipoAtencion = codTipoAtencion;
            CodTematicaProyecto = codTematicaProyecto;
            CodModeloIntervencion = codModeloIntervencion;
            CodSistemaAsistencial = codSistemaAsistencial;
            CodDepartamentoSename = codDepartamentoSename;
            CodCausalTerminoProyecto = codCausalTerminoProyecto;
            CodInstitucionOrigen = codInstitucionOrigen;
            CodProyectoOrigen = codProyectoOrigen;
            Nombre = nombre;
            NombreCorto = nombreCorto;
            RutNumeroProyecto = rutNumeroProyecto;
            Direccion = direccion;
            Telefono = telefono;
            Mail = mail;
            Fax = fax;
            CalidadVidaFamiliar = calidadVidaFamiliar;
            Director = director;
            RutDirector = rutDirector;
            FechaAniversario = fechaAniversario;
            EdadMaximaPermanencia = edadMaximaPermanencia;
            CodBanco = codBanco;
            NroCuentaCorriente = nroCuentaCorriente;
            FechaTermino = fechaTermino;
            EdadMinima = edadMinima;
            EdadMaximaIngreso = edadMaximaIngreso;
            Etapas = etapas;
            MontoInversion = montoInversion;
            MontoOperacion = montoOperacion;
            MontoPersonal = montoPersonal;
            IdUsuarioTecnico = idUsuarioTecnico;
            IndVigencia = indVigencia;
            FechaCreacion = fechaCreacion;
            ProyectoDeContinuacion = proyectoDeContinuacion;
            FechaActualizacion = fechaActualizacion;
            IdUsuarioActualizacion = idUsuarioActualizacion;
            EstadoProyecto = estadoProyecto;
            NumeroPlazas = numeroPlazas;
            FechaTraspaso = fechaTraspaso;
            Mail1 = mail1;
            Mail2 = mail2;
            Mail3 = mail3;
            CelularDirector = celularDirector;
        }
    }

    
    
}
