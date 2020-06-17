using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class InstitucionMapper
    {

        public static List<InstitucionDto> ToDto(DataTable dt)
        {
            var list = new List<InstitucionDto>();

            foreach (DataRow dr in dt.Rows)
            {
                var dto = new InstitucionDto
                {
                    CodInstitucion = (int) dr["CodInstitucion"],
                    NombreInstitucion = dr["NombreInstitucion"].ToString(),
                    RutInstitucion = dr["RutInstitucion"].ToString()
                };
                list.Add(dto);
            }
            return list;
        }

        public static List<InstitucionDto> ToDtoByUserId(DataTable dt)
        {
            var list = new List<InstitucionDto>();

            foreach (DataRow dr in dt.Rows)
            {
                var dto = new InstitucionDto
                {
                    CodInstitucion = (int) dr["CodInstitucion"],
                    NombreInstitucion = dr["Nombre"].ToString(),
                    RutInstitucion = dr["RutInstitucion"].ToString()
                };
                list.Add(dto);
            }
            return list;
        }

        public static List<Institucion> ToListaInstitucionUsuario(DataTable dt)
        {
            var list = new List<Institucion>();

            foreach (DataRow dr in dt.Rows)
            {
                var dto = new Institucion
                {
                    CodInstitucion = (int) dr["CodInstitucion"],
                    Nombre = dr["Nombre"].ToString(),
                    NombreCorto = dr["NombreCorto"].ToString(),
                    RutInstitucion = dr["RutInstitucion"].ToString()
                };
                list.Add(dto);
            }
            return list;
        }

    }
}
