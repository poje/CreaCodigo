using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class DeptoSenameDto
    {
        public int CodDepartamentosSename { get; set; }
        public string Nombre { get; set; }
        public string NombreCorto { get; set; }
        public string IndVigencia { get; set; }
        
        public DeptoSenameDto()
        {
           
        }

        public DeptoSenameDto(int codDepartamentosSename, string nombre, string nombreCorto, string indVigencia)
        {
            CodDepartamentosSename = codDepartamentosSename;
            Nombre = nombre;
            NombreCorto = nombreCorto;
            IndVigencia = indVigencia;
        }
    }
}