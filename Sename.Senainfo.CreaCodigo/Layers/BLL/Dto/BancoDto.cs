
namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class BancoDto
    {
        public int CodBanco { get; set; }
        public string Descripcion { get; set; }
        public string DescCorta { get; set; }
        public bool Convenio { get; set; }
        public char IndVigencia { get; set; }
        
        public BancoDto()
        {
        }

        public BancoDto(int codBanco, string descripcion, string descCorta, bool convenio, char indVigencia)
        {
            CodBanco = codBanco;
            Descripcion = descripcion;
            DescCorta = descCorta;
            Convenio = convenio;
            IndVigencia = indVigencia;
        }


        
    }
}
