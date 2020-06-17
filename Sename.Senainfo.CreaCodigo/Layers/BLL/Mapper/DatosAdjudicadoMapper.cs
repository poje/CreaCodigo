using System;
using System.Data;
using System.Linq;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class DatosAdjudicadoMapper
    {
        public static DatoAdjudicadoDto DatoAdjudicadoToDto(DataTable dt)
        {
            return (from DataRow dr in dt.Rows
                select new DatoAdjudicadoDto()
                {
                    CodProyecto = Convert.ToInt32(dr["CodProyecto"]),
                    IcodProyectoAdjudicado = Convert.ToInt32(dr["IcodProyectoAdjudicado"]),
                    IcodDatoResolucion = dr.IsNull("IcodDatoResolucion") ? (int?)null : (int)dr["IcodDatoResolucion"],
                    IcodVerificadorOffline = dr["IcodVerificadorOffline"].ToString(),
                    Nombre = dr["Nombre"].ToString(),
                    EmailProyecto = dr["EmailProyecto"].ToString(),
                    FechaInicio = Convert.ToDateTime(dr["FechaInicio"]),
                    FechaTermino = Convert.ToDateTime(dr["FechaTermino"]),
                    Telefono = dr["Telefono"].ToString(),
                    NombreDirector = dr["NombreDirector"].ToString(),
                    RutDirector = dr["RutDirector"].ToString(),
                    RutInstitucion = dr["RutInstitucion"].ToString(),
                    CelularDirector = dr["CelularDirector"].ToString(),
                    CuentaCorriente = dr["CuentaCorriente"].ToString(),
                    CodBanco = Convert.ToInt32(dr["CodBanco"]),
                    Banco = dr["Banco"].ToString(),
                    IdUsuarioCreacion = (int)dr["IdUsuarioCreacion"],
                    IdUsuarioActualizacion = dr.IsNull("IdUsuarioActualizacion") ? (int?)null : (int)dr["IdUsuarioActualizacion"],
                    ProyectoAdosado = (int)dr["ProyectoAdosado"]
                }).FirstOrDefault();
        }
    }
}
