using System;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class VerificadorAdjuntoDto
    {
        public int IcodVerificadorAdjunto { get; set; }
        public int CodTipoVerificador { get; set; }
        public string TipoVerificador { get; set; }
        public int CodArchivo { get; set; }
        public string NombreArchivo { get; set; }
        public int IdUsuario { get; set; }
        public DateTime FechaCreacion { get; set; }
        public char IndVigencia { get; set; }
        
        public VerificadorAdjuntoDto()
        {
        }

        public VerificadorAdjuntoDto(int icodVerificadorAdjunto, int codTipoVerificador, int codArchivo, string nombreArchivo, int idUsuario, DateTime fechaCreacion, char indVigencia)
        {
            IcodVerificadorAdjunto = icodVerificadorAdjunto;
            CodTipoVerificador = codTipoVerificador;
            CodArchivo = codArchivo;
            NombreArchivo = nombreArchivo;
            IdUsuario = idUsuario;
            FechaCreacion = fechaCreacion;
            IndVigencia = indVigencia;
        }

        
    }
}
