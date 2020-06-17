using System;
using System.Collections.Generic;
using System.Data;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper
{
    public class ArchivoMapper
    {
        public static List<VerificadorAdjuntoDto> ToDto(DataTable dt)
        {
            var list = new List<VerificadorAdjuntoDto>();

            foreach (DataRow dr in dt.Rows)
            {
                var dto = new VerificadorAdjuntoDto
                {
                    IcodVerificadorAdjunto = Convert.ToInt32(dr["IcodVerificadorAdjunto"]),
                    NombreArchivo = dr["NombreArchivo"].ToString(),
                    TipoVerificador = dr["TipoVerificador"].ToString(),
                    CodTipoVerificador = Convert.ToInt32(dr["CodTipoVerificador"])
                };
                list.Add(dto);
            }
            return list;
        }
    }
}
