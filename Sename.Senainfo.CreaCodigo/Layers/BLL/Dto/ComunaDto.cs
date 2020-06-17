
namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class ComunaDto
    {
        public int CodComuna { get; set; }
        public string Descripcion { get; set; }
        
        public ComunaDto()
        {
        }

        public ComunaDto(int codComuna, string descripcion)
        {
            CodComuna = codComuna;
            Descripcion = descripcion;
        }
        
    }
}
