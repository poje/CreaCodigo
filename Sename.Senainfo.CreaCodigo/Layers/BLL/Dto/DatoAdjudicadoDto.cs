using System;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class DatoAdjudicadoDto
    {
        public string Opcion { get; set; }
        public int? CodProyecto { get; set; }
        public int IcodProyectoAdjudicado { get; set; }
        public int? IcodDatoResolucion { get; set; }
        public string IcodVerificadorOffline { get; set; }
        public string Nombre { get; set; }
        public string EmailProyecto { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaTermino { get; set; }
        //public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string NombreDirector { get; set; }
        public string RutDirector { get; set; }
        public string RutInstitucion { get; set; }
        public string CelularDirector { get; set; }
        public string CuentaCorriente { get; set; }
        public int CodBanco { get; set; }
        public string Banco { get; set; }
        public int IdUsuarioCreacion { get; set; }
        public int? IdUsuarioActualizacion { get; set; }
        public int ProyectoAdosado { get; set; }

    }

}
