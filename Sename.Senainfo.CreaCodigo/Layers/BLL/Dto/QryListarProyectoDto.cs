using System;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class QryListarProyectoDto
    {
        public int CodProyecto { get; set; }
        public int CodInstitucion { get; set; }
        public string NombreProyecto { get; set; }
        public string NombreInstitucion { get; set; }
        public int CodRegion { get; set; }
        public string NombreRegion { get; set; }
        public string CodNombre { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaTermino { get; set; }
    }
}
