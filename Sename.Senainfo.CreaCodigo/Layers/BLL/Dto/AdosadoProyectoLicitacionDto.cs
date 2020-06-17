using System;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class AdosadoProyectoLicitacionDto
    {
        public int CodAdosadoProyectoLicitacion { get; set; }
        public int CodLicitacionProyecto { get; set; }
        public int CodModeloIntervencion { get; set; }
        public string ModeloIntervencion { get; set; }
        public int NumeroPlazas { get; set; }
        public int Monto { get; set; }
        public char IndVigencia { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public int Idusuarioactualizacion { get; set; }
    }
}