using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class ModalidadAtencionMapper
    {
        public static List<ModalidadAtencionDto> GetList(DataTable dt)
        {
            var list = new List<ModalidadAtencionDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new ModalidadAtencionDto
                {
                    CodTematicaProyecto = Convert.ToInt32(dataRow["CodTematicaProyecto"].ToString()),
                    Descripcion = dataRow["Descripcion"].ToString(),
                });
            }

            return list;
        }
    }
}
