using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class TipoTerminoResolucionImpl
    {
        private readonly TipoTerminoResolucionDao _tipoTerminoResolucion;

        public TipoTerminoResolucionImpl()
        {
            _tipoTerminoResolucion = new TipoTerminoResolucionDao();
        }
        public List<TipoTerminoResolucionDto> ObtenerTipoTerminoResolucion()
        {
            var result = _tipoTerminoResolucion.GetTipoTerminoResolucion();
            return TipoTerminoResolucionMapper.ToDtoList(result);
        }
    }
}
