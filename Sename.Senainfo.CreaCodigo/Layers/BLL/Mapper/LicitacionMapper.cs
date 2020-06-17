using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class LicitacionMapper
    {
        public LicitacionMapper()
        {
            
        }
        
        public static List<LicitacionDto> ToList(DataTable dt)
        {
            var list = new List<LicitacionDto>();

            foreach (DataRow row in dt.Rows)
            {
                var l = new LicitacionDto
                {
                    //CodLicitacion = Convert.ToInt32(row["CodLicitacion"].ToString()),
                    NumeroCdp = Convert.ToInt32(row["NumeroCdp"].ToString()),
                    //NumeroLicitacion = Convert.ToInt32(row["NumeroLicitacion"].ToString()),
                    //FechaLicitacion = Convert.ToDateTime(row["FechaLicitacion"].ToString()),
                    CodDeptoSename = Convert.ToInt32(row["CodDeptoSename"].ToString()),
                    Depto = row["Depto"].ToString(),
                    IndVigencia = Convert.ToChar(row["IndVigencia"].ToString()),
                    FechaActualizacion = Convert.ToDateTime(row["FechaActualizacion"].ToString()),
                    IdUsuarioActualizacion = Convert.ToInt32(row["IdUsuarioActualizacion"].ToString())
                };


                list.Add(l);
            }

            return list;
        }
    }
}
