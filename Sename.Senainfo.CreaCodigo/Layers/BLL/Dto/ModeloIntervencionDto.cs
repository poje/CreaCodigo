namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class ModeloIntervencionDto
    {
        public int CodModeloIntervencion { get; set; }
        public string Descripcion { get; set; }
        public bool CodPlanIntervencion { get; set; }
        public bool CreaPlanIntervencion { get; set; }
        public char IndVigencia { get; set; }
        public string Nemotecnico { get; set; }
        public int CantidadIntervenciones { get; set; }
        public int LRPA { get; set; }
        public int Faltas { get; set; }
        public int CodigoMideplan { get; set; }
        public bool OtObligatorio { get; set; }
        public int EdadMinimaIngreso { get; set; }
        public int EdadMaximaIngreso { get; set; }
        public int DiasPermanenciaMaxima { get; set; }

        public ModeloIntervencionDto()
        {
        }

        public ModeloIntervencionDto(int codModeloIntervencion, string descripcion, bool codPlanIntervencion, bool creaPlanIntervencion, char indVigencia, string nemotecnico, int cantidadIntervenciones, int lrpa, int faltas, int codigoMideplan, bool otObligatorio, int edadMinimaIngreso, int edadMaximaIngreso, int diasPermanenciaMaxima)
        {
            CodModeloIntervencion = codModeloIntervencion;
            Descripcion = descripcion;
            CodPlanIntervencion = codPlanIntervencion;
            CreaPlanIntervencion = creaPlanIntervencion;
            IndVigencia = indVigencia;
            Nemotecnico = nemotecnico;
            CantidadIntervenciones = cantidadIntervenciones;
            LRPA = lrpa;
            Faltas = faltas;
            CodigoMideplan = codigoMideplan;
            OtObligatorio = otObligatorio;
            EdadMinimaIngreso = edadMinimaIngreso;
            EdadMaximaIngreso = edadMaximaIngreso;
            DiasPermanenciaMaxima = diasPermanenciaMaxima;
        }


        
    }
}
