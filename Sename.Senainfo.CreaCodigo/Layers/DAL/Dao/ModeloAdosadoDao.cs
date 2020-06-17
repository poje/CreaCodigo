using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class ModeloAdosadoDao : ConexionesModInstitucion
    {
        public ModeloAdosadoDao()
        {

        }

        public DataTable ObtenerModelosAdosados(int codModeloIntervencionPadre)
        {
            ListParametros.Add(new SqlParameter("@CodModeloIntervencion", codModeloIntervencionPadre));

            return EjecutaSPToDataTable("ModInstitucion.GetModelosAdosados", ListParametros);
        }


        public int ObtenerCantidadModelosAdosados(int codModeloIntervencionPadre)
        {
            ListParametros.Add(new SqlParameter("@codModeloIntervencion", codModeloIntervencionPadre));

            return EjecutaSpScalar("ModInstitucion.GetCantidadModelosAdosados", ListParametros);
        }
    }
}
