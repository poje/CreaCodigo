using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class TipoTerminoResolucionMapper
    {
        
        public static List<TipoTerminoResolucionDto> ToDtoList(DataTable dt)
        {
            var list = new List<TipoTerminoResolucionDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new TipoTerminoResolucionDto
                {
                    CodTipoTermino = Convert.ToInt32(dataRow["CodTipoTermino"].ToString()),
                    Descripcion = dataRow["Descripcion"].ToString(),
                    IndVigencia = dataRow["IndVigencia"].ToString()
                });
            }

            return list;
        }
    }
}
