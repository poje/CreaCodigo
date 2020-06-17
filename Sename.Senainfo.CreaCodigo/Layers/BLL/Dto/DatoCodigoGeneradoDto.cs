using System;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class DatoCodigoGeneradoDto
    {
        public string Opcion { get; set; }
        public int IcodProyectoAdjudicado { get; set; }
        public int CodProyecto { get; set; }
        public int IdUsuario { get; set; }
        public int? CodProyectoHijo { get; set; }
    }

    public class CodigoReservaParams
    {
        public string Opcion { get; set; }
        public int IcodProyectoAdjudicado { get; set; }
    }

    public class ReporteCodigoGeneradoDto
    {
        public int IcodCodigoGenerado { get; set; }
        public int EsAdosado { get; set; }
        public int CodProyecto { get; set; }
        public int? CodProyectoAdosado { get; set; }
        public int IdUsuarioCreaCodigo { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string NombreProyecto { get; set; }
        public string EmailProyecto { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaTermino { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string NombreDirector { get; set; }
        public string RutDirector { get; set; }
        public string CelularDirector { get; set; }
        public string CuentaCorriente { get; set; }
        public int CodBanco { get; set; }
        public string Banco { get; set; }
        public string RutInstitucion { get; set; }
        public string Institucion { get; set; }
        public int CodInstitucion { get; set; }
        public string UsuarioCreaCodigo { get; set; }

    }

}
