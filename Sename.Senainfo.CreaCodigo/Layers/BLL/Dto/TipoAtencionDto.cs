namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class TipoAtencionDto
    {

        public int CodTipoAtencion { get; set; }
        public string Descripcion { get; set; }
        public string IndVigencia { get; set; }
        public int Nino { get; set; }
        public int Proyecto { get; set; }
        public int Lrpa { get; set; }
        
        public TipoAtencionDto()
        {
        }

        public TipoAtencionDto(int codTipoAtencion, string descripcion, string indVigencia, int nino, int proyecto, int lrpa)
        {
            CodTipoAtencion = codTipoAtencion;
            Descripcion = descripcion;
            IndVigencia = indVigencia;
            Nino = nino;
            Proyecto = proyecto;
            Lrpa = lrpa;
        }
       
    }
}
