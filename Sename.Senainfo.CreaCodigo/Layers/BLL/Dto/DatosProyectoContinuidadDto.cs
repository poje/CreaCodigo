using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class DatosProyectoContinuidadDto
    {
        public char SexoProyecto { get; set; }
        public int CodModeloIntervencion { get; set; }
        public int CodTipoProyecto { get; set; }
        public int CodTipoSubvencion { get; set; }
        public int CodTipoAtencion { get; set; }
        public int CodTematicaProyecto { get; set; }
        public int MontoLicitacion { get; set; }
        public int NumeroPlazas { get; set; }


        public DatosProyectoContinuidadDto()
        {

        }
    }
}