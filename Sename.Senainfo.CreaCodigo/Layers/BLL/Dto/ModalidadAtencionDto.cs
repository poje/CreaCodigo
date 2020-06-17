using System.Collections.Generic;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class ModalidadAtencionDto
    {
        public int CodTematicaProyecto { get; set; }
        public string Descripcion { get; set; }
        public string IndVigencia { get; set; }
        public int Peso { get; set; }
        
        public ModalidadAtencionDto()
        {
           
        }

        public ModalidadAtencionDto(int codTematicaProyecto, string descripcion, string indVigencia, int peso)
        {
            CodTematicaProyecto = codTematicaProyecto;
            Descripcion = descripcion;
            IndVigencia = indVigencia;
            Peso = peso;
        }
       
    }
}
