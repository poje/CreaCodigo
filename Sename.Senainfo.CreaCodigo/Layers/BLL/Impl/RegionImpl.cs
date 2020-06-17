using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class RegionImpl : Repository
    {
        private readonly RegionDao _regionDao;

        public RegionImpl()
        {
            _regionDao  = new RegionDao();
        }

        public List<RegionDto> Listar(int? codRegion)
        {
            var result = _regionDao.Listar(codRegion);
            return RegionMapper.ToDto(result);
        }
    }
}
