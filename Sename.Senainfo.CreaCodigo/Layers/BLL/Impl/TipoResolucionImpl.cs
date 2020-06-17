using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class TipoResolucionImpl
    {
        private readonly TipoResolucionDao _tipoResolucionDao;

        public TipoResolucionImpl()
        {
            _tipoResolucionDao = new TipoResolucionDao();
        }

        public List<TipoResolucionDto> ObtenerTiposResolucion(int estadoProyecto)
        {
            var dt = _tipoResolucionDao.GetTiposResolucion(estadoProyecto);
            return new TipoResolucionMapper().GetList(dt);
        }
    }
}