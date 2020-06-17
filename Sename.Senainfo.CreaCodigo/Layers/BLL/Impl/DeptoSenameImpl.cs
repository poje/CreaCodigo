using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class DeptoSenameImpl
    {
        private readonly DeptoSenameDao _deptoSenameDao;
        
        public DeptoSenameImpl()
        {
            _deptoSenameDao = new DeptoSenameDao();
        }

        public List<DeptoSenameDto> ObtenerDeptosSename(int? codDepto)
        {
            var dt = _deptoSenameDao.GetDeptosSename(codDepto);
            return DeptoSenameMapper.GetList(dt);
        }

        public List<DeptoSenameDto> ObtenerDeptosSenameXModeloIntervencion(int? codModeloIntervencion)
        {
            var dt = _deptoSenameDao.GetDeptosSenamexModeloIntervencion(codModeloIntervencion);
            return DeptoSenameMapper.GetList(dt);
        }
    }
}