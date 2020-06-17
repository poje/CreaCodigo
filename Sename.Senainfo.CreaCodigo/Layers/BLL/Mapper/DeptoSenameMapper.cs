using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class DeptoSenameMapper
    {
        public static List<DeptoSenameDto> GetList(DataTable dt)
        {
            var list = new List<DeptoSenameDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new DeptoSenameDto()
                {
                    CodDepartamentosSename = Convert.ToInt32(dataRow["CodDepartamentosSENAME"]),
                    Nombre = dataRow["Nombre"].ToString(),
                    NombreCorto = dataRow["NombreCorto"].ToString(),
                    IndVigencia = dataRow["indVigencia"].ToString()
                });
            }

            return list;
        }


    }
}