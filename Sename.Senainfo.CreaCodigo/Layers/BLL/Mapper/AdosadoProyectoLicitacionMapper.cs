using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class AdosadoProyectoLicitacionMapper
    {
        public static List<AdosadoProyectoLicitacionDto> ToList(DataTable dt)
        {
            var list = new List<AdosadoProyectoLicitacionDto>();

            foreach (DataRow row in dt.Rows)
            {
                var apl = new AdosadoProyectoLicitacionDto
                {
                    CodAdosadoProyectoLicitacion = Convert.ToInt32(row["CodAdosadoProyectoLicitacion"].ToString()),
                    CodLicitacionProyecto = Convert.ToInt32(row["CodLicitacionProyecto"].ToString()),
                    CodModeloIntervencion = Convert.ToInt32(row["CodModeloIntervencion"].ToString()),
                    ModeloIntervencion = row["ModeloIntervencion"].ToString(),
                    NumeroPlazas = Convert.ToInt32(row["NumeroPlazas"].ToString()),
                    Monto = Convert.ToInt32(row["Monto"].ToString()),
                    IndVigencia = Convert.ToChar(row["IndVigencia"].ToString()),
                    FechaCreacion = Convert.ToDateTime(row["FechaCreacion"].ToString()),
                    FechaActualizacion = Convert.ToDateTime(row["FechaActualizacion"].ToString()),
                    Idusuarioactualizacion = Convert.ToInt32(row["IdUsuarioActualizacion"].ToString())
                };

                list.Add(apl);
            }

            return list;
        }
    }
}