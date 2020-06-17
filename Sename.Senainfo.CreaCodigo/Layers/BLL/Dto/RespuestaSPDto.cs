namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class RespuestaSpDto
    {
        public int Retorno { get; set; }
        public int Identidad { get; set; }

    }

    public class RespuestaDto
    {
        public int Id { get; set; }
        public string Estado { get; set; }
        public string Error { get; set; }

    }

    public class CodigoReservaDto
    {
        public int Id { get; set; }
        public int CodigoProyecto { get; set; }
        public int CodigoProyectoHijo { get; set; }
        public string Estado { get; set; }
    }
}
