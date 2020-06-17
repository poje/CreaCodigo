using System;
using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class AdosadoProyectoLicitacionImpl
    {
        private readonly AdosadoProyectoLicitacionDao _adosadoProyectoLicitacionDao;

        public AdosadoProyectoLicitacionImpl()
        {
            _adosadoProyectoLicitacionDao = new AdosadoProyectoLicitacionDao();
        }

        public int Insert(int codLicitacionProyecto, int codModeloIntervencion, int numeroPlazas, int monto, char indVigencia, DateTime fechaCreacion, DateTime fechaActualizacion, int idusuarioactualizacion)
        {
            return _adosadoProyectoLicitacionDao.Insert(codLicitacionProyecto, codModeloIntervencion, numeroPlazas, monto, indVigencia, fechaCreacion, fechaActualizacion, idusuarioactualizacion);
        }

        public List<AdosadoProyectoLicitacionDto> Obtener(int codLicitacionProyecto)
        {
            var list = new List<AdosadoProyectoLicitacionDto>();

            var dt = _adosadoProyectoLicitacionDao.Obtener(codLicitacionProyecto);

            return AdosadoProyectoLicitacionMapper.ToList(dt);
        }
    }
}