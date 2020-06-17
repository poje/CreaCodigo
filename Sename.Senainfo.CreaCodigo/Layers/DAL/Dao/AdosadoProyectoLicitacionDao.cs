using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class AdosadoProyectoLicitacionDao : ConexionesModInstitucion
    {
        public int Insert(int codLicitacionProyecto, int codModeloIntervencion, int numeroPlazas, int monto, char indVigencia, DateTime fechaCreacion, DateTime fechaActualizacion, int idusuarioactualizacion)
        {
            ListParametros.Add(new SqlParameter("@CodLicitacionProyecto", codLicitacionProyecto));
            ListParametros.Add(new SqlParameter("@codModeloIntervencion", codModeloIntervencion));
            ListParametros.Add(new SqlParameter("@numeroPlazas", numeroPlazas));
            ListParametros.Add(new SqlParameter("@monto", monto));
            ListParametros.Add(new SqlParameter("@indvigencia", indVigencia));
            ListParametros.Add(new SqlParameter("@IdUsuarioActualizacion", idusuarioactualizacion));
          
            return EjecutaSpScalar("ModInstitucion.InsertProyectoAdosado", ListParametros);
        }


        public DataTable Obtener(int codLicitacionProyecto)
        {
            ListParametros.Clear();
            ListParametros.Add(new SqlParameter("@CodLicitacionProyecto", codLicitacionProyecto));

            return EjecutaSPToDataTable("ModInstitucion.ObtenerProyectosAdosados", ListParametros);
        }
    }
}