using System;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class LicitacionDto
    {
        public int CodLicitacion { get; set; }
        public int NumeroCdp { get; set; }
        public int NumeroLicitacion { get; set; }
        public DateTime FechaLicitacion { get; set; }
        public int CodDeptoSename { get; set; }
        public char IndVigencia { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public int IdUsuarioActualizacion { get; set; }
        public string Depto { get; set; }
        
        public LicitacionDto()
        {
           
        }

        public LicitacionDto(int codLicitacion, int numeroCdp, int numeroLicitacion, DateTime fechaLicitacion, int codDeptoSename, char indVigencia, DateTime fechaActualizacion, int idUsuarioActualizacion)
        {
            CodLicitacion = codLicitacion;
            NumeroCdp = numeroCdp;
            NumeroLicitacion = numeroLicitacion;
            FechaLicitacion = fechaLicitacion;
            CodDeptoSename = codDeptoSename;
            IndVigencia = indVigencia;
            FechaActualizacion = fechaActualizacion;
            IdUsuarioActualizacion = idUsuarioActualizacion;
        }

        
    }
}
