using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class LicitacionProyectoImpl
    {
        private readonly LicitacionProyectoDao _licitacionProyectoDao;
       

        public LicitacionProyectoImpl()
        {
            _licitacionProyectoDao = new LicitacionProyectoDao();
        }

        public int Insert(LicitacionProyectoDto licitacionProyecto)
        {
            //agregar campos
            return _licitacionProyectoDao.Insert(licitacionProyecto.CodLicitacion, licitacionProyecto.CodRegion, licitacionProyecto.CodComuna, licitacionProyecto.SexoPoblAtendida,
                licitacionProyecto.NumeroMesesConvenio, licitacionProyecto.CodModeloIntervencion, licitacionProyecto.CodLineaAccion, licitacionProyecto.CodModalidadAtencion,
                licitacionProyecto.CodTipoAtencion, licitacionProyecto.NroPlazas, licitacionProyecto.MontoPeriodoLicitar, licitacionProyecto.FactorVidaFamiliar, licitacionProyecto.ProyectoAdosado,
                licitacionProyecto.CodModeloIntervencionAdosado, licitacionProyecto.NroPlazasAdosado, licitacionProyecto.IndVigencia, licitacionProyecto.IdUsuarioActualizacion, licitacionProyecto.Focalizacion,
                licitacionProyecto.EsProyectoContinuidad, licitacionProyecto.CodProyectoContinuidad);
        }


        public string ObtenerNemotecnico(int codModeloIntervencion)
        {
            return _licitacionProyectoDao.ObtenerNemotecnico(codModeloIntervencion);
        }

        public List<LicitacionProyectoDto> Obtener(int codLicitacion)
        {
            var dt = _licitacionProyectoDao.Obtener(codLicitacion);
            var adosadoImpl = new AdosadoProyectoLicitacionImpl();

            var list = LicitacionProyectoMapper.ToList(dt);

            foreach (var licitacionProyecto in list)
            {
                licitacionProyecto.ProyectosAdosados = adosadoImpl.Obtener(licitacionProyecto.CodLicitacionProyecto);
            }

            return list;
        }

    }
}