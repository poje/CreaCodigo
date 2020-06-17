using System;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class DatosProyectoDao : ConexionesModInstitucion
    {
        public int Insert(int iCodVerificador, int iCodDatoResolucion, string nombre, string emailProyecto, int codInstitucion,
            DateTime fechaInicio, DateTime fechaTermino, string direccion, string telefono, string nombreDirector, string rutDirector,
            string celularDirector, string cuentaCorriente, int codBanco, int idUsuario, char indVigencia)
        {

            ListParametros.Add(new SqlParameter("@iCodVerificador", iCodVerificador));
            ListParametros.Add(new SqlParameter("@iCodDatoResolucion", iCodDatoResolucion));
            ListParametros.Add(new SqlParameter("@nombre", nombre));
            ListParametros.Add(new SqlParameter("@emailProyecto", emailProyecto));
            ListParametros.Add(new SqlParameter("@codInstitucion", codInstitucion));
            ListParametros.Add(new SqlParameter("@fechaInicio", fechaInicio));
            ListParametros.Add(new SqlParameter("@fechaTermino", fechaTermino));
            ListParametros.Add(new SqlParameter("@direccion", direccion));
            ListParametros.Add(new SqlParameter("@telefono", telefono));
            ListParametros.Add(new SqlParameter("@nombreDirector", nombreDirector));
            ListParametros.Add(new SqlParameter("@rutDirector", rutDirector));
            ListParametros.Add(new SqlParameter("@celularDirector", celularDirector));
            ListParametros.Add(new SqlParameter("@cuentaCorriente", cuentaCorriente));
            ListParametros.Add(new SqlParameter("@codBanco", codBanco));
            ListParametros.Add(new SqlParameter("@IdUsuario", idUsuario));
            ListParametros.Add(new SqlParameter("@indVigencia", indVigencia));

            var x = EjecutaSpScalar("ModInstitucion.InsertProyectoAdjudicado", ListParametros);
            return x;
        }

    }
}