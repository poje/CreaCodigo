using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class TipoProyectoImpl
    {
        private readonly TipoProyectoDao _tipoProyecto;

        public TipoProyectoImpl()
        {
            _tipoProyecto = new TipoProyectoDao();
        }

        public List<TipoProyectoDto> GetTipoProyectos()
        {
            return TipoProyectoMapper.GetList(_tipoProyecto.GetTipoProyecto());
        }

        public List<TipoProyectoDto> GetTipoProyectosxModelo(int codModeloIntervencion)
        {
            return TipoProyectoMapper.GetList(_tipoProyecto.GetTipoProyectoxModelo(codModeloIntervencion));
        }
    }
}
