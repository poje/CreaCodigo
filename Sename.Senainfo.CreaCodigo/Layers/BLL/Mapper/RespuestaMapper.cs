using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class RespuestaMapper
    {
        public static RespuestaDto ToRespuestaDto(DataTable dt)
        {
            var list = new List<RespuestaDto>();
            var error = false;

            var columns = dt.Columns;

            if (columns.Contains("Error"))
                error = true;


                foreach (DataRow dr in dt.Rows)
            {
                var dto = new RespuestaDto
                {
                    Id = (int)dr["Id"],
                    Estado = dr["Estado"].ToString(),
                    Error = error ? dr["Error"].ToString() : ""
                };

                list.Add(dto);
            }

            return list.First();
        }

        public static CodigoReservaDto ToCodigoReservaDto(DataTable dt)
        {
            var list = new List<CodigoReservaDto>();

            foreach (DataRow dr in dt.Rows)
            {
                var dto = new CodigoReservaDto()
                {
                    Id = (int)dr["Id"],
                    CodigoProyecto = (int)dr["CodigoProyecto"],
                    CodigoProyectoHijo = (int)dr["CodigoProyectoHijo"],
                    Estado = dr["Estado"].ToString()
                };

                list.Add(dto);
            }

            return list.First();
        }

    }
}
