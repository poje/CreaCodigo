using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class LicitacionProyectoMapper
    {
        public LicitacionProyectoMapper()
        {

        }

        public static List<LicitacionProyectoDto> ToList(DataTable dt)
        {

            var list = new List<LicitacionProyectoDto>();


            foreach (DataRow row in dt.Rows)
            {
                var lp = new LicitacionProyectoDto
                {
                    CodLicitacionProyecto = Convert.ToInt32(row["CodLicitacionProyecto"].ToString()),
                    CodDatosAnexo = Convert.ToInt32(row["CodDatosAnexo"].ToString()),
                    CodRegion = Convert.ToInt32(row["CodRegion"].ToString()),
                    Region = row["Region"].ToString(),
                    CodComuna = Convert.ToInt32(row["CodComuna"].ToString()),
                    Comuna = row["Comuna"].ToString(),
                    SexoPoblAtendida = Convert.ToChar(row["SexoPoblAtendida"].ToString()),
                    NumeroMesesConvenio = Convert.ToInt32(row["NumeroMesesConvenio"].ToString()),
                    CodModeloIntervencion = Convert.ToInt32(row["CodModeloIntervencion"].ToString()),
                    ModeloIntervencion = row["ModeloIntervencion"].ToString(),
                    CodLineaAccion = Convert.ToInt32(row["CodLineaAccion"].ToString()),
                    LineaAccion = row["LineaAccion"].ToString(),
                    CodModalidadAtencion = Convert.ToInt32(row["CodModalidadAtencion"].ToString()),
                    ModalidadAtencion = row["ModalidadAtencion"].ToString(),
                    CodTipoAtencion = Convert.ToInt32(row["CodTipoAtencion"].ToString()),
                    TipoAtencion = row["TipoAtencion"].ToString(),
                    NroPlazas = Convert.ToInt32(row["NroPlazas"].ToString()),
                    MontoPeriodoLicitar = Convert.ToInt32(row["MontoPeriodoLicitar"].ToString()),
                    FactorVidaFamiliar = Convert.ToInt32(row["FactorVidaFamiliar"].ToString()),
                    IndVigencia = Convert.ToChar(row["IndVigencia"].ToString()),
                    FechaCreacion = Convert.ToDateTime(row["FechaCreacion"].ToString()),
                    FechaActualizacion = Convert.ToDateTime(row["FechaActualizacion"].ToString()),
                    Focalizacion = row["Focalizacion"].ToString(),
                    EsProyectoContinuidad = (row["EsProyectoContinuidad"].ToString() == string.Empty)
                        ? 0
                        : Convert.ToInt32(row["EsProyectoContinuidad"].ToString()),
                    CodProyectoContinuidad = (row["CodProyectoContinuidad"].ToString() == string.Empty)
                        ? 0
                        : Convert.ToInt32(row["CodProyectoContinuidad"])
                };


                list.Add(lp);

            }

            return list;

        }
    }
}