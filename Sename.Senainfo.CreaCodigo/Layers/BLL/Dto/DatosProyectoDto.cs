using System;
using System.Collections.Generic;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class DatosProyectoDto
    {
        public int ICodProyectoAdjudicado { get; set; }
        public int iCodVerificadorAdjunto { get; set; }
        public int iCodDatoResolucion { get; set; }
        public string Nombre { get; set; }
        public string Emailproyecto { get; set; }
        public int CodInstitucion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaTermino { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string NombreDirector { get; set; }
        public string RutDirector { get; set; }
        public string CelularDirector { get; set; }
        public string CuentaCorriente { get; set; }
        public int CodBanco { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaActualizacion {get;set;}
        public int IdUsuarioCreacion { get; set; }
        public int IdUsuarioActualizacion { get; set; }
        public char IndVigencia { get; set; }

        public List<AdosadoProyectoLicitacionDto> ProyectosAdosados { get; set; }
        
        public DatosProyectoDto()
        {
        }

        public DatosProyectoDto(int codProyectoAdjudicado, int iCodVerificadorAdjunto, int iCodDatoResolucion, string nombre, string emailproyecto, int codInstitucion, DateTime fechaInicio, DateTime fechaTermino, string direccion, string telefono, string nombreDirector, string rutDirector, string celularDirector, string cuentaCorriente, int codBanco, DateTime fechaCreacion, DateTime fechaActualizacion, int idUsuarioCreacion, int idUsuarioActualizacion, char indVigencia, List<AdosadoProyectoLicitacionDto> proyectosAdosados)
        {
            ICodProyectoAdjudicado = codProyectoAdjudicado;
            this.iCodVerificadorAdjunto = iCodVerificadorAdjunto;
            this.iCodDatoResolucion = iCodDatoResolucion;
            Nombre = nombre;
            Emailproyecto = emailproyecto;
            CodInstitucion = codInstitucion;
            FechaInicio = fechaInicio;
            FechaTermino = fechaTermino;
            Direccion = direccion;
            Telefono = telefono;
            NombreDirector = nombreDirector;
            RutDirector = rutDirector;
            CelularDirector = celularDirector;
            CuentaCorriente = cuentaCorriente;
            CodBanco = codBanco;
            FechaCreacion = fechaCreacion;
            FechaActualizacion = fechaActualizacion;
            IdUsuarioCreacion = idUsuarioCreacion;
            IdUsuarioActualizacion = idUsuarioActualizacion;
            IndVigencia = indVigencia;
            ProyectosAdosados = proyectosAdosados;
        }


        

    }
}
