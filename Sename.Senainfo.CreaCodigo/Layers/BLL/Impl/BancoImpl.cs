using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class BancoImpl
    {
        private readonly BancoDao _bancoDao;

        public BancoImpl()
        {
            _bancoDao = new BancoDao();
        }

        public List<BancoDto> ObtenerBancos()
        {
            var dt = _bancoDao.GetBancos();

            return BancoMapper.GetList(dt);
        }
    }
}