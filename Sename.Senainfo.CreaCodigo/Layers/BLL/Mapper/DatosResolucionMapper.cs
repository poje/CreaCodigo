using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class DatosResolucionMapper
    {
        public static List<ListaLicitacionProyectoDto> ListaLicitacionProyectoToDto(DataTable dt)
        {
            return (from DataRow dr in dt.Rows
                select new ListaLicitacionProyectoDto
                {
                    CodLicitacionProyecto = (int) dr["CodLicitacionProyecto"],
                    Descripcion = dr["Descripcion"].ToString(),
                    NumeroCdp = (int) dr["NumeroCdp"],
                    CodDeptoSename = (int) dr["CodDeptoSename"],
                    NroPlazas = (int) dr["NroPlazas"],
                    IcodDatoResolucion = dr.IsNull("IcodDatoResolucion") ? (int?)null : (int)dr["IcodDatoResolucion"],
                    IcodProyectoAdjudicado = dr.IsNull("IcodProyectoAdjudicado") ? (int?)null : (int)dr["IcodProyectoAdjudicado"]

                }).ToList();
        }

        public static List<ListaTipoResolucionDto> ListaTipoResolucionToDto(DataTable dt)
        {
            return (from DataRow dr in dt.Rows
                select new ListaTipoResolucionDto()
                {
                    CodTipoResolucion = (int)dr["CodTipoResolucion"],
                    TipoResolucion = dr["TipoResolucion"].ToString(),
                    GlosaResolucion = dr["GlosaResolucion"].ToString()
                }).ToList();
        }

        public static DatoResolucionDto DatoResolucionToDto(DataTable dt)
        {
            return (from DataRow dr in dt.Rows
                select new DatoResolucionDto()
                {
                    IcodDatoResolucion = dr.IsNull("IcodDatoResolucion") ?  (int?) null : (int)dr["IcodDatoResolucion"],
                    CodTipoResolucion = (int)dr["CodTipoResolucion"],
                    CodLicitacionProyecto = (int)dr["CodLicitacionProyecto"],
                    IdentificadorResolucion = dr["IdentificadorResolucion"].ToString(),
                    NumeroResolucion = dr["NumeroResolucion"].ToString(),
                    IcodVerificadorOffline = dr["IcodVerificadorOffline"].ToString(),
                    FechaResolucion = Convert.ToDateTime(dr["FechaResolucion"]),
                    FechaConvenio = Convert.ToDateTime(dr["FechaConvenio"]),
                    FechaInicio = Convert.ToDateTime(dr["FechaInicio"]),
                    FechaTermino = Convert.ToDateTime(dr["FechaTermino"]),
                    NumeroPlazas = dr.IsNull("NumeroPlazas") ? (int?)null : (int)dr["NumeroPlazas"],
                    FechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]),
                    FechaActualizacion = dr.IsNull("FechaActualizacion") ? (DateTime?)null : Convert.ToDateTime(dr["FechaActualizacion"]),
                    IdUsuarioCreacion = (int)dr["IdUsuarioCreacion"],
                    IdUsuarioActualizacion = dr.IsNull("IdUsuarioActualizacion") ? (int?)null : (int)dr["IdUsuarioActualizacion"],
                    RutInstitucion = dr["RutInstitucion"].ToString(),
                    NombreProyecto = dr["NombreProyecto"].ToString(),
                    DireccionProyecto = dr["DireccionProyecto"].ToString()
                }).FirstOrDefault();
        }
    }
}
