using System;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class DatoAdjudicadoImpl
    {
        private readonly DatoAdjudicadoDao _datosAdjudicadoDao;

        public DatoAdjudicadoImpl()
        {
            _datosAdjudicadoDao = new DatoAdjudicadoDao();
        }

        public RespuestaDto CrudDatoAdjudicado(string opcion, int? icodProyectoAdjudicado, int? icodDatoResolucion, string icodVerificadorOffline, string emailProyecto, DateTime fechaInicio, DateTime fechaTermino,  string telefono, string nombreDirector, string rutDirector, string rutInstitucion, string celularDirector, string cuentaCorriente, int codBanco, int idUsuarioCreacion, int? codProyecto)
        {
            var result = _datosAdjudicadoDao.CrudDatoAdjudicado(opcion, icodProyectoAdjudicado, icodDatoResolucion, icodVerificadorOffline, emailProyecto, fechaInicio, fechaTermino, telefono, nombreDirector, rutDirector, rutInstitucion, celularDirector, cuentaCorriente, codBanco, idUsuarioCreacion, codProyecto);
            return RespuestaMapper.ToRespuestaDto(result);
        }

        public DatoAdjudicadoDto ListaDatoProyectoAdjudicado(int idUsuario, int icodProyectoAdjudicado)
        {
            var result = _datosAdjudicadoDao.ListaDatoProyectoAdjudicado(idUsuario, icodProyectoAdjudicado);
            return DatosAdjudicadoMapper.DatoAdjudicadoToDto(result);
        }
    }
}
