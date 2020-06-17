using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class TipoTerminoResolucionDao : ConexionesModInstitucion
    {
        public TipoTerminoResolucionDao()
        {
            
        }

        public DataTable GetTipoTerminoResolucion()
        {
            return EjecutaSPToDataTable("ModInstitucion.GetTipoTerminoResolucion");
        }
    }
}
