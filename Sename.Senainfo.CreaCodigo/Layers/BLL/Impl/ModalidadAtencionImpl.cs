using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class ModalidadAtencionImpl
    {
        private readonly ModalidadAtencionDao _modalidadAtencionDao;

        public ModalidadAtencionImpl()
        {
            _modalidadAtencionDao = new ModalidadAtencionDao();
        }

        public List<ModalidadAtencionDto> ObtenerModalidadesAtencion(int? codModeloIntervencion)
        {

            return ModalidadAtencionMapper.GetList(_modalidadAtencionDao.GetModalidadesAtencion(codModeloIntervencion));
        }


    }
}
