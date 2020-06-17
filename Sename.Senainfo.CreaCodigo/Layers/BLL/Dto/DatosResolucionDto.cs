using System;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class ListaLicitacionProyectoDto
    {
        public int CodLicitacionProyecto { get; set; }
        public string Descripcion { get; set; }
        public int NumeroCdp { get; set; }
        public int CodDeptoSename { get; set; }
        public int NroPlazas { get; set; }
        public int? IcodDatoResolucion { get; set; }
        public int? IcodProyectoAdjudicado { get; set; }
    }

    public class ListaTipoResolucionDto
    {
        public int CodTipoResolucion { get; set; }
        public string TipoResolucion { get; set; }
        public string GlosaResolucion { get; set; }
    }

    public class DatoResolucionDto
    {
        public string Opcion { get; set; }
        public int? IcodDatoResolucion { get; set; }
        public int CodTipoResolucion { get; set; }
        public int CodLicitacionProyecto { get; set; }
        public int? IcodVerificadorAdjunto { get; set; }
        public string IdentificadorResolucion { get; set; }
        public string NumeroResolucion { get; set; }
        public string IcodVerificadorOffline { get; set; }
        public int? CodTipoTermino { get; set; }
        public DateTime FechaResolucion { get; set; }
        public DateTime FechaConvenio { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaTermino { get; set; }
        public int? NumeroPlazas { get; set; }
        public int IdUsuarioCreacion { get; set; }
        public int? IdUsuarioActualizacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public string IndVigencia { get; set; }
        public int? CodProyecto { get; set; }
        public int CodInstitucion { get; set; }
        public string RutInstitucion { get; set; }
        public string NombreProyecto { get; set; }
        public string DireccionProyecto { get; set; }
    }

    

}
