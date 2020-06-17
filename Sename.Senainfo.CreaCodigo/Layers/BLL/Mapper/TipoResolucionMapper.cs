using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class TipoResolucionMapper
    {
        public TipoResolucionMapper()
        {
        }

        public List<TipoResolucionDto> GetList(DataTable dt)
        {
            var list = new List<TipoResolucionDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new TipoResolucionDto()
                {
                    CodTipoResolucion = Convert.ToInt32(dataRow["CodTipoResolucion"].ToString()),
                    Descripcion = dataRow["Descripcion"].ToString(),
                    Nemotecnico = dataRow["Nemotecnico"].ToString(),
                    IndVigencia = dataRow["IndVigencia"].ToString()
                });
            }

            return list;
        }
    }
}
