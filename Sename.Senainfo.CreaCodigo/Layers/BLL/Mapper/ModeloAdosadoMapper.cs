using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class ModeloAdosadoMapper
    {

        public ModeloAdosadoMapper()
        {

        }

        public static List<ModeloAdosadoDto> ToList(DataTable dt)
        {
            var list = new List<ModeloAdosadoDto>();

            foreach (DataRow drow in dt.Rows)
            {
                var modeloAdosado = new ModeloAdosadoDto
                {
                    CodModeloIntervencionHijo = Convert.ToInt32(drow["CodModeloIntervencionHijo"].ToString()),
                    LRPA = Convert.ToInt32(drow["LRPA"].ToString()),
                    Descripcion = drow["Descripcion"].ToString(),
                    Nemotecnico = drow["Nemotecnico"].ToString()
                };


                list.Add(modeloAdosado);
            }

            return list;
        }
    }
}
