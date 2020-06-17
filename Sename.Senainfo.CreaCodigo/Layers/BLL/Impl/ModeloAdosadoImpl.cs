using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class ModeloAdosadoImpl
    {
        private readonly ModeloAdosadoDao _modeloAdosadoDao;

        public ModeloAdosadoImpl()
        {
            _modeloAdosadoDao = new ModeloAdosadoDao();
        }


        public List<ModeloAdosadoDto> ObtenerModelosAdosados(int codModeloIntervencion)
        {
            var dt = _modeloAdosadoDao.ObtenerModelosAdosados(codModeloIntervencion);

            return ModeloAdosadoMapper.ToList(dt);
        }

        public int ObtenerCantidadModelosAdosados(int codModeloIntervencion)
        {
            var cantidad = _modeloAdosadoDao.ObtenerCantidadModelosAdosados(codModeloIntervencion);

            return cantidad;
        }


    }
}
