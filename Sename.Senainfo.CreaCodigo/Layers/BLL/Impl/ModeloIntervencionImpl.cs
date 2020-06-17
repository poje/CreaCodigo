using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class ModeloIntervencionImpl
    {
        private readonly ModeloIntervencionDao _modeloIntervencionDao;

        public ModeloIntervencionImpl()
        {
            _modeloIntervencionDao = new ModeloIntervencionDao();
        }

        public List<ModeloIntervencionDto> GetModelosIntervencion(int? codModeloIntervencion, int? lrpa)
        {
            var dt = _modeloIntervencionDao.GetModelosIntervencion(codModeloIntervencion, lrpa);
            return ModeloIntervencionMapper.ToModelosIntervencionList(dt);
        }

        public List<ModeloIntervencionDto> GetModelosIntervencion(int? tipoProyecto)
        {
            var list = new List<ModeloIntervencionDto>();

            var dt = _modeloIntervencionDao.GetModelosIntervencionXTipoProyecto(tipoProyecto);
            return ModeloIntervencionMapper.ToModeloIntervencionXTipoProyectoList(dt);
        }

        public List<ModeloIntervencionDto> GetModeloIntervencionxDepto(int? codDepto)
        {
            var list = new List<ModeloIntervencionDto>();

            var dt = _modeloIntervencionDao.GetModelosIntervencionxDepto(codDepto);

            return ModeloIntervencionMapper.ToModelointervencionxDeptos(dt);
        }
    }
}