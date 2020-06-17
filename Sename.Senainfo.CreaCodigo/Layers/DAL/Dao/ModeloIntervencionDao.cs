using System;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class ModeloIntervencionDao : ConexionesModInstitucion
    {
        public ModeloIntervencionDao()
        {

        }

        public DataTable GetModelosIntervencion(int? codModeloIntervencion, int? lrpa)
        {
            ListParametros.Add(new SqlParameter("@CodModeloIntervencion", codModeloIntervencion.HasValue ? (object)codModeloIntervencion : DBNull.Value));
            ListParametros.Add(new SqlParameter("@LRPA", lrpa.HasValue ? (object)lrpa : DBNull.Value));
            return EjecutaSPToDataTable("ModInstitucion.GetModelosIntervencion", ListParametros);
        }

        public DataTable GetModelosIntervencionXTipoProyecto(int? tipoProyecto)
        {
            ListParametros.Add(new SqlParameter("@tipoProyecto", tipoProyecto.HasValue ? (object)tipoProyecto : DBNull.Value));

            return EjecutaSPToDataTable("ModInstitucion.GetModelosIntervencionXTipoProyecto", ListParametros);
        }

        public DataTable GetModelosIntervencionxDepto(int? codDepto)
        {
            ListParametros.Add(new SqlParameter("@codDepto", codDepto.HasValue ? (object) codDepto : DBNull.Value));
            return EjecutaSPToDataTable("ModInstitucion.GetModelosIntervencionxDepto", ListParametros);
        }
    }
}
