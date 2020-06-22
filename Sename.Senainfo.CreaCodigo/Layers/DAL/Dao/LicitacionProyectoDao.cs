using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.DAL.Dao
{
    public class LicitacionProyectoDao : ConexionesModInstitucion
    {
        public int Insert(int codDatosAnexo, int codRegion, int codComuna, char sexoPoblAtendida, int numeroMesesConvenio, int codModeloIntervencion,
            int codLineaAccion, int codModalidadAtencion, int codTipoAtencion, int nroPlazas, int montoPeriodoLicitar, int factorVidaFamiliar, int proyectoAdosado, int codModeloIntervencionAdosado,
            int nroPlazasAdosado, char indVigencia, int idUsuarioActualizacion, string focalizacion, int esProyectoContinuidad, int codProyectoContinuidad)
        {

            ListParametros.Clear();
            ListParametros.Add(new SqlParameter("@CodLicitacion", codDatosAnexo));
            ListParametros.Add(new SqlParameter("@CodRegion", codRegion));
            ListParametros.Add(new SqlParameter("@CodComuna", codComuna));
            ListParametros.Add(new SqlParameter("@SexoPoblAtendida", sexoPoblAtendida));
            ListParametros.Add(new SqlParameter("@NumeroMesesConvenio", numeroMesesConvenio));
            ListParametros.Add(new SqlParameter("@CodModeloIntervencion", codModeloIntervencion));
            ListParametros.Add(new SqlParameter("@CodLineaAccion", codLineaAccion));
            ListParametros.Add(new SqlParameter("@CodModalidadAtencion", codModalidadAtencion));
            ListParametros.Add(new SqlParameter("@CodTipoAtencion", codTipoAtencion));
            ListParametros.Add(new SqlParameter("@NroPlazas", nroPlazas));
            ListParametros.Add(new SqlParameter("@factorVidaFamiliar", factorVidaFamiliar));
            ListParametros.Add(new SqlParameter("@MontoPeriodoLicitar", montoPeriodoLicitar));
            ListParametros.Add(new SqlParameter("@ProyectoAdosado", proyectoAdosado));
            ListParametros.Add(new SqlParameter("@CodModeloIntervencionAdosado", codModeloIntervencionAdosado));
            ListParametros.Add(new SqlParameter("@NroPlazasAdosado", nroPlazasAdosado));
            ListParametros.Add(new SqlParameter("@IndVigencia", indVigencia));
            ListParametros.Add(new SqlParameter("@IdUsuarioActualizacion", idUsuarioActualizacion));
            ListParametros.Add(new SqlParameter("@Focalizacion", focalizacion));
            ListParametros.Add(new SqlParameter("@EsProyectoContinuidad", esProyectoContinuidad));
            ListParametros.Add(new SqlParameter("@CodProyectoContinuidad", codProyectoContinuidad));

            return EjecutaSpScalar("ModInstitucion.Insert_Licitacionproyecto", ListParametros);
        }


        public string ObtenerNemotecnico(int codModeloIntervencion)
        {
            ListParametros.Clear();
            ListParametros.Add(new SqlParameter("@CodLicitacionProyecto", codModeloIntervencion));

            var dt = EjecutaSPToDataTable("ModInstitucion.ObtenerNemoTecnico", ListParametros);

            var nemo = dt.Rows[0]["Nemotecnico"].ToString();

            return nemo;
        }

        public DataTable Obtener(int codDatosAnexo)
        {
            ListParametros.Clear();
            ListParametros.Add(new SqlParameter("@CodDatosAnexo", codDatosAnexo));

            return EjecutaSPToDataTable("[ModInstitucion].[ObtenerProyectos]", ListParametros);
        }
    }
}