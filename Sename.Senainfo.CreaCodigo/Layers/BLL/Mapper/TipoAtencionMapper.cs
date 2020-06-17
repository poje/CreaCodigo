using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class TipoAtencionMapper
    {
        public static List<TipoAtencionDto> GetList(DataTable dt)
        {
            var list = new List<TipoAtencionDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new TipoAtencionDto
                {
                    CodTipoAtencion = Convert.ToInt32(dataRow["CodTipoAtencion"].ToString()),
                    Descripcion = dataRow["Descripcion"].ToString(),
                    IndVigencia = dataRow["IndVigencia"].ToString(),
                    Lrpa = Convert.ToInt32(dataRow["lrpa"].ToString()),
                    Nino = Convert.ToInt32(dataRow["Nino"].ToString()),
                    Proyecto = Convert.ToInt32(dataRow["Proyecto"].ToString()),
                });
            }

            return list;
        }
    }
}
