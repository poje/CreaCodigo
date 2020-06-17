using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class ComunaMapper
    {
        public static List<ComunaDto> GetList(DataTable dt)
        {
            var list = new List<ComunaDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new ComunaDto
                {
                    CodComuna = Convert.ToInt32(dataRow["CodComuna"].ToString()),
                    Descripcion = dataRow["Descripcion"].ToString()
                });
            }

            return list;
        }
    }
}