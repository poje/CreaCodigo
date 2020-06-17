using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class TipoProyectoMapper
    {
        public static List<TipoProyectoDto> GetList(DataTable dt)
        {
            var list = new List<TipoProyectoDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new TipoProyectoDto
                {
                    IdTipoProyecto = Convert.ToInt32(dataRow["TipoProyecto"].ToString()),
                    CodAreaProyecto = Convert.ToInt32(dataRow["CodAreaProyecto"].ToString()),
                    Descripcion = dataRow["Descripcion"].ToString(),
                    Es1385 = Convert.ToBoolean(dataRow["Es1385"].ToString()),
                    EsApoyo = Convert.ToBoolean(dataRow["EsApoyo"].ToString()),
                    EsAdmDirecta = Convert.ToBoolean(dataRow["EsAdmDirecta"].ToString()),
                    IndVigencia = Convert.ToChar(dataRow["IndVigencia"].ToString())
                });
            }

            return list;
        }
    }
}
