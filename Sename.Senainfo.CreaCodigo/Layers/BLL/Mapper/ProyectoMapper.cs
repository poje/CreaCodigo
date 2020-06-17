using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class ProyectoMapper
    {
        public static List<QryListarProyectoDto> ToDto(DataTable dt)
        {
            var list = new List<QryListarProyectoDto>();
            foreach (DataRow dr in dt.Rows)
            {
                var dto = new QryListarProyectoDto
                {
                    CodProyecto = (int) dr["CodProyecto"],
                    CodInstitucion = (int) dr["CodInstitucion"],
                    NombreProyecto = dr["NombreProyecto"].ToString(),
                    NombreInstitucion = dr["NombreInstitucion"].ToString(),
                    CodRegion = (int) dr["CodRegion"],
                    NombreRegion = dr["NombreRegion"].ToString(),
                    CodNombre = dr["CodNombre"].ToString(),
                    FechaCreacion = dr.IsNull("FechaCreacion") ? (DateTime?) null : (DateTime) dr["FechaCreacion"],
                    FechaTermino = dr.IsNull("FechaTermino") ? (DateTime?) null : (DateTime) dr["FechaTermino"]
                };

                list.Add(dto);
            }

            return list;
        }

        public static List<QryListarProyectoDto> ToDtoByuserId2(DataTable dt)
        {
            var list = new List<QryListarProyectoDto>();
            foreach (DataRow dr in dt.Rows)
            {
                var dto = new QryListarProyectoDto
                {
                    CodProyecto = (int) dr["CodProyecto"], NombreProyecto = dr["Nombre"].ToString()
                };

                list.Add(dto);
            }

            return list;
        }

        public static List<ProyectoDto> ToForm(DataTable dt)
        {
            var list = new List<ProyectoDto>();

            foreach (DataRow dataRow in dt.Rows)
            {
                var proyecto = new ProyectoDto
                {
                    Nombre = dataRow["Nombre"].ToString(),
                    Mail = dataRow["Mail"].ToString(),
                    RutNumeroProyecto = dataRow["RutNumeroProyecto"].ToString(),
                    FechaCreacion = Convert.ToDateTime(dataRow["FechaCreacion"].ToString()),
                    FechaTermino = Convert.ToDateTime(dataRow["FechaTermino"].ToString()),
                    Direccion = dataRow["Direccion"].ToString(),
                    CodComuna = Convert.ToInt32(dataRow["CodComuna"].ToString()),
                    Telefono = dataRow["Telefono"].ToString(),
                    Director = dataRow["Director"].ToString(),
                    RutDirector = dataRow["RutDirector"].ToString(),
                    CelularDirector = dataRow["CelularDirector"].ToString(),
                    CodBanco = Convert.ToInt32(dataRow["CodBanco"].ToString()),
                    NroCuentaCorriente = dataRow["CuentaCorrienteNumero"].ToString(),
                    CodInstitucionOrigen = Convert.ToInt32(dataRow["CodInstitucionOrigen"].ToString()),
                    CodProyectoOrigen = Convert.ToInt32(dataRow["CodProyectoOrigen"].ToString()),
                    //Datos Tecnicos
                    CodDepartamentoSename = Convert.ToInt32(dataRow["CodDepartamentosSename"].ToString()),
                    TipoProyecto = Convert.ToInt32(dataRow["TipoProyecto"].ToString()),
                    CodModeloIntervencion = Convert.ToInt32(dataRow["CodModeloIntervencion"].ToString()),
                    CodTematicaProyecto = Convert.ToInt32(dataRow["CodTematicaProyecto"].ToString()),
                    CodTipoAtencion = Convert.ToInt32(dataRow["CodTipoAtencion"].ToString()),
                    EdadMaximaPermanencia = Convert.ToInt32(dataRow["EdadMaximaPermanencia"].ToString()),
                    EdadMinima = Convert.ToInt32(dataRow["EdadMinima"].ToString()),
                    EdadMaximaIngreso = Convert.ToInt32(dataRow["EdadMaximaIngreso"].ToString()),

                };

                list.Add(proyecto);
            }

            return list;
        }

        public static List<DatoProyectoDto> ToDatoProyectoDto(DataTable dt)
        {
            var list = new List<DatoProyectoDto>();

            foreach (DataRow dr in dt.Rows)
            {
                var proyecto = new DatoProyectoDto
                {
                    Proyecto = dr["Proyecto"].ToString(),
                    Institucion = dr["Institucion"].ToString(),
                    CodProyecto = Convert.ToInt32(dr["CodProyecto"].ToString()),
                    CodInstitucion = Convert.ToInt32(dr["CodInstitucion"].ToString()),
                };

                list.Add(proyecto);
            }

            return list;
        }

        public static DatosProyectoContinuidadDto ToDatosProyectoContinuidad(DataTable dt)
        {
            return new DatosProyectoContinuidadDto()
            {
                SexoProyecto = Convert.ToChar(dt.Rows[0]["SexoProyecto"].ToString()),
                CodModeloIntervencion = Convert.ToInt32(dt.Rows[0]["CodModeloIntervencion"].ToString()),
                CodTipoProyecto =  Convert.ToInt32(dt.Rows[0]["TipoProyecto"].ToString()),
                CodTipoSubvencion =  Convert.ToInt32(dt.Rows[0]["TipoSubvencion"].ToString()),
                CodTipoAtencion =  Convert.ToInt32(dt.Rows[0]["CodTipoAtencion"].ToString()),
                CodTematicaProyecto = Convert.ToInt32(dt.Rows[0]["CodTematicaProyecto"].ToString()),
                MontoLicitacion = Convert.ToInt32(dt.Rows[0]["MontoLicitacion"].ToString()),
                NumeroPlazas = Convert.ToInt32(dt.Rows[0]["NumeroPlazas"].ToString())
            };
        }
    }
}
