using System;
using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class LicitacionProyectoDto
    {
        public int CodLicitacionProyecto { get; set; }
        public int CodDatosAnexo { get; set; }
        public int CodRegion { get; set; }
        public string Region { get; set; }
        public int CodComuna { get; set; }
        public string Comuna { get; set; }
        public char SexoPoblAtendida { get; set; }
        public int NumeroMesesConvenio { get; set; }
        public int CodModeloIntervencion { get; set; }
        public string ModeloIntervencion { get; set; }
        public int CodLineaAccion { get; set; }
        public string LineaAccion { get; set; }
        public int CodModalidadAtencion { get; set; }
        public string ModalidadAtencion { get; set; }
        public int CodTipoAtencion { get; set; }
        public string TipoAtencion { get; set; }
        public int NroPlazas { get; set; }
        public int MontoPeriodoLicitar { get; set; }
        public int FactorVidaFamiliar { get; set; }
        public int ProyectoAdosado { get; set; }
        public int CodModeloIntervencionAdosado { get; set; }
        public int NroPlazasAdosado { get; set; }
        public char IndVigencia { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public int IdUsuarioActualizacion { get; set; }
        public string Focalizacion {get; set;}
        public int EsProyectoContinuidad { get; set; }
        public int CodProyectoContinuidad { get; set; }

        public List<AdosadoProyectoLicitacionDto> ProyectosAdosados { get; set; }
        
        public LicitacionProyectoDto()
        {
        }

        
    }
}
