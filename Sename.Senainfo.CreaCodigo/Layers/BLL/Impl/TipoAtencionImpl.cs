using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class TipoAtencionImpl
    {
        private readonly TipoAtencionDao _tipoAtencionDao;
        public TipoAtencionImpl()
        {
            _tipoAtencionDao = new TipoAtencionDao();
        }

        public List<TipoAtencionDto> ObtenerTiposAtencion(int? lrpa)
        {
            return TipoAtencionMapper.GetList(_tipoAtencionDao.GetTiposAtencion(lrpa));
        }
    }
}
