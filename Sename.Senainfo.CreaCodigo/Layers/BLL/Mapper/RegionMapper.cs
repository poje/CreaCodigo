using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class RegionMapper
    {
        public static List<RegionDto> ToDto(DataTable dt)
        {
            List<RegionDto> list = new List<RegionDto>();

            foreach (DataRow dr in dt.Rows)
            {
                var dto = new RegionDto
                {
                    CodRegion = (int)dr["CodRegion"],
                    NombreRegion = dr["NombreRegion"].ToString()
                };
                list.Add(dto);
            }
            return list;
        }
    }
}