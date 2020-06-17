namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class ModeloAdosadoDto : ModeloIntervencionDto
    {
        public int Id { get; set; }
        public int CodModeloIntervencionPadre { get; set; }
        public int CodModeloIntervencionHijo { get; set; }

       
        public ModeloAdosadoDto()
        {
        }
        
    }
}
