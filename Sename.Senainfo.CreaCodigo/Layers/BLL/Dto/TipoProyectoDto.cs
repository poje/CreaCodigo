namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class TipoProyectoDto
    {
        public int IdTipoProyecto { get; set; }
        public int CodAreaProyecto { get; set; }
        public string Descripcion { get; set; }
        public bool EsApoyo { get; set; }
        public bool Es1385 { get; set; }
        public bool EsAdmDirecta { get; set; }
        public char IndVigencia { get; set; }
        
        public TipoProyectoDto()
        {
        }

        public TipoProyectoDto(int idTipoProyecto, int codAreaProyecto, string descripcion, bool esApoyo, bool es1385, bool esAdmDirecta, char indVigencia)
        {
            IdTipoProyecto = idTipoProyecto;
            CodAreaProyecto = codAreaProyecto;
            Descripcion = descripcion;
            EsApoyo = esApoyo;
            Es1385 = es1385;
            EsAdmDirecta = esAdmDirecta;
            IndVigencia = indVigencia;
        }
        
    }
}
