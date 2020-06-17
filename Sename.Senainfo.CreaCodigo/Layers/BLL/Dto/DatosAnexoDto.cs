using System;
using System.Data;

namespace SENAME.Senainfo.Mod_InstitucionProyecto.BLL.Dto
{
    public class DatosAnexoDto
    {
        public int CodDatosAnexo { get; set; }
        public int NumeroCdp { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int IdUsuarioActualizacion { get; set; }
        public string IcodVerificadorOffline { get; set; }
        public string Departamento { get; set; }
        public int CodDeptoSename { get; set; }
        
        public DatosAnexoDto()
        {
        }

        public DatosAnexoDto(int codDatosAnexo, int numeroCdp, int idUsuarioActualizacion, string icodVerificadorOffline, int codDeptoSename)
        {
            CodDatosAnexo = codDatosAnexo;
            NumeroCdp = numeroCdp;
            IdUsuarioActualizacion = idUsuarioActualizacion;
            IcodVerificadorOffline = icodVerificadorOffline;
            CodDeptoSename = codDeptoSename;
        }
        
    }
}
