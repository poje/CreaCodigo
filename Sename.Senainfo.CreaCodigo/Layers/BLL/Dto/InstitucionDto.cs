using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Dto
{
    public class Institucion
    {
        public int CodInstitucion { get; set; }
        public string Nombre{ get; set; }
        public string NombreCorto { get; set; }
        public string RutInstitucion { get; set; }
    }

    public class InstitucionDto
    {
        public int CodInstitucion { get; set; }
        public string NombreInstitucion { get; set; }
        public int CodDireccionRegional { get; set; }
        public string RutInstitucion { get; set; }

        public InstitucionDto()
        {
            
        }

        public InstitucionDto(int codInstitucion, string nombreInstitucion, int codDireccionRegional, string rutInstitucion)
        {
            CodInstitucion = codInstitucion;
            NombreInstitucion = nombreInstitucion;
            CodDireccionRegional = codDireccionRegional;
            RutInstitucion = rutInstitucion;
        }

        public List<InstitucionDto> ObtenerInstituciones()
        {
            var c = new ConexionesModInstitucion();

            c.ListParametros.Add(new SqlParameter("@userid", 69044));

            var dt = c.EjecutaSPToDataTable("Get_InstitucionesConProyectos_byUserId2", c.ListParametros);

            var list = new List<InstitucionDto>();

            foreach (DataRow item in dt.Rows)
            {
                list.Add(new InstitucionDto()
                {
                    CodInstitucion = Convert.ToInt32(item["CodInstitucion"].ToString()),
                    NombreInstitucion = item["NombreInstitucion"].ToString(),
                    CodDireccionRegional = Convert.ToInt32(item["CodDireccionRegional"].ToString()),
                    RutInstitucion = item["RutInstitucion"].ToString()
                });
            }

            return list;
        }
    }
}
