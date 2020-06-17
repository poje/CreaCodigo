using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class VerificadorAdjuntoDao : ConexionesModInstitucion
    {
        public VerificadorAdjuntoDao()
        {
            
        }

        public int Insert(int codTipoVerificador, int codArchivo, string nombreArchivo, int idUsuario) //, DateTime fechaCreacion, char indVigencia)
        {
            ListParametros.Add(new SqlParameter("@codTipoVerificador", codTipoVerificador));
            ListParametros.Add(new SqlParameter("@codArchivo", codArchivo));
            ListParametros.Add(new SqlParameter("@nombreArchivo", nombreArchivo));
            ListParametros.Add(new SqlParameter("@idUsuario", idUsuario));
           
            return EjecutaSpScalar("ModInstitucion.InsertVerificadorAdjunto", ListParametros);
        }
        
    }
}
