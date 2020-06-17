using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class ComunaImpl
    {
        private readonly ComunaDao _comunaDao;

        public ComunaImpl()
        {
            _comunaDao = new ComunaDao();
        }


        public List<ComunaDto> ObtenerComunas(int? codRegion)
        {
            return ComunaMapper.GetList(_comunaDao.GetComunas(codRegion));
        }

    }
}
