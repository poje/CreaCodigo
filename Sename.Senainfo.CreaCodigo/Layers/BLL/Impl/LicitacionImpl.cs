using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class LicitacionImpl
    {

        private readonly LicitacionDao _licitacionDao;

        public LicitacionImpl()
        {
            _licitacionDao = new LicitacionDao();
        }

        public int InsertLicitacion(LicitacionDto licitacion)
        {
            var resultado = _licitacionDao.Insert(licitacion.NumeroCdp, licitacion.NumeroLicitacion, licitacion.FechaLicitacion, licitacion.CodDeptoSename, licitacion.IndVigencia, licitacion.IdUsuarioActualizacion);

            return resultado;
        }
        

        public List<LicitacionDto> ListarLicitaciones(int? codLicitacion)
        {
            var dt = _licitacionDao.GetLicitaciones(codLicitacion);
            return LicitacionMapper.ToList(dt);
        }

    }
}