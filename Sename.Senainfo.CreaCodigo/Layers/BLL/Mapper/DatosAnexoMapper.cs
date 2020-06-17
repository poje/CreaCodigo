using System;
using System.Collections.Generic;
using System.Data;
using SENAME.Senainfo.Mod_InstitucionProyecto.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class DatosAnexoMapper
    {
        public DatosAnexoMapper()
        {
            
        }

        public static List<DatosAnexoDto> ToList(DataTable dt)
        {
            var list = new List<DatosAnexoDto>();

            foreach (DataRow row in dt.Rows)
            {
                var da = new DatosAnexoDto
                {
                    CodDatosAnexo = Convert.ToInt32(row["CodDatosAnexo"].ToString()),
                    NumeroCdp = Convert.ToInt32(row["NumeroCdp"].ToString()),
                    CodDeptoSename = Convert.ToInt32(row["CodDeptoSename"].ToString()),
                    Departamento = row["Departamento"].ToString(),
                    FechaActualizacion = Convert.ToDateTime(row["FechaActualizacion"].ToString()),
                    FechaCreacion = Convert.ToDateTime(row["FechaCreacion"].ToString())
                };


                list.Add(da);
            }

            return list;
        }
    }
}
