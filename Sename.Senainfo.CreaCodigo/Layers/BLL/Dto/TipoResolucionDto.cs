namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class TipoResolucionDto
    {
        public int CodTipoResolucion { get; set; }
        public string Descripcion { get; set; }
        public string Nemotecnico { get; set; }
        public string IndVigencia { get; set; }


        public TipoResolucionDto(int codTipoResolucion, string descripcion, string nemotecnico, string indVigencia)
        {
            CodTipoResolucion = codTipoResolucion;
            Descripcion = descripcion;
            Nemotecnico = nemotecnico;
            IndVigencia = indVigencia;
        }

        public TipoResolucionDto()
        {

        }

        
    }
}
