using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class ModeloIntervencionMapper
    {
        public static List<ModeloIntervencionDto> ToModelosIntervencionList(DataTable dt)
        {
            var list = new List<ModeloIntervencionDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new ModeloIntervencionDto
                {
                    CodModeloIntervencion = Convert.ToInt32(dataRow["CodModeloIntervencion"]),
                    Descripcion = dataRow["Descripcion"].ToString(),
                    EdadMinimaIngreso = Convert.ToInt32(dataRow["EdadMinimaIngreso"].ToString()),
                    EdadMaximaIngreso = Convert.ToInt32(dataRow["EdadMaximaIngreso"].ToString()),
                    LRPA = Convert.ToInt32(dataRow["LRPA"].ToString())
                });
            }

            return list;

        }

        public static List<ModeloIntervencionDto> ToModeloIntervencionXTipoProyectoList(DataTable dt)
        {
            var list = new List<ModeloIntervencionDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new ModeloIntervencionDto
                {
                    CodModeloIntervencion = Convert.ToInt32(dataRow["CodModeloIntervencion"]),
                    Descripcion = dataRow["Descripcion"].ToString(),
                    EdadMinimaIngreso = Convert.ToInt32(dataRow["EdadMinimaIngreso"].ToString()),
                    EdadMaximaIngreso = Convert.ToInt32(dataRow["EdadMaximaIngreso"].ToString()),
                    LRPA = Convert.ToInt32(dataRow["LRPA"].ToString())
                });
            }

            return list;
        }

        public static List<ModeloIntervencionDto> ToModelointervencionxDeptos(DataTable dt)
        {
            var list = new List<ModeloIntervencionDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                list.Add(new ModeloIntervencionDto
                {
                    CodModeloIntervencion = Convert.ToInt32(dataRow["CodModeloIntervencion"]),
                    Descripcion = dataRow["Descripcion"].ToString(),
                    EdadMinimaIngreso = Convert.ToInt32(dataRow["EdadMinimaIngreso"].ToString()),
                    EdadMaximaIngreso = Convert.ToInt32(dataRow["EdadMaximaIngreso"].ToString()),
                    LRPA = Convert.ToInt32(dataRow["LRPA"].ToString())
                });
            }

            return list;
        }

    }
}