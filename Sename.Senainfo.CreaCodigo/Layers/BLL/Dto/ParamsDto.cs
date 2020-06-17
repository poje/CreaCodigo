namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class ListaArchivoTemporalParams
    {
        public string AdjuntoOffline { get; set; }
        public int IdUsuario { get; set; }
        public int? CodTipoVerificador { get; set; }

    }

    public class BorraArchivoTemporalParams
    {
        public int IdVerificadorAdjunto { get; set; }
    }

    public class OpcionParams
    {
        public string Opcion { get; set; }
    }

    public class ResolucionParams
    {
        public int? IcodDatoResolucion { get; set; }
        public int IdUsuario { get; set; }
        public string IdentificadorResolucion { get; set; }
    }

}
