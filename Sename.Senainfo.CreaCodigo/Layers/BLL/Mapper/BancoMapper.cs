using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class BancoMapper
    {
        public BancoMapper()
        {
            
        }

        public static List<BancoDto> GetList(DataTable dt)
        {
            var list = new List<BancoDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new BancoDto
                {
                    CodBanco = Convert.ToInt32(dataRow["CodBanco"].ToString()),
                    Descripcion = dataRow["Descripcion"].ToString(),
                    Convenio = Convert.ToBoolean(dataRow["Convenio"].ToString()),
                    DescCorta = dataRow["DescCorta"].ToString(),
                    IndVigencia = Convert.ToChar(dataRow["IndVigencia"].ToString())
                });
            }

            return list;
        }
    }
}
