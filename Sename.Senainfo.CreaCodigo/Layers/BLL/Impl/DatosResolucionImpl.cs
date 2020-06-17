using System;
using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class DatosResolucionImpl
    {
        private readonly DatosResolucionDao _datosResolucionDao;

        public DatosResolucionImpl()
        {
            _datosResolucionDao = new DatosResolucionDao();
        }
        
        public List<ListaLicitacionProyectoDto> ListaLicitacionProyecto(int idUsuario, string opcion)
        {
            var result = _datosResolucionDao.ListaLicitacionProyecto(idUsuario,opcion);
            return DatosResolucionMapper.ListaLicitacionProyectoToDto(result);
        }

        public RespuestaDto CrudDatoResolucion(string opcion, int? icodDatoResolucion, int codTipoResolucion, int codLicitacionProyecto,
            string identificadorResolucion, string numeroResolucion, string icodVerificadorOffline, int? codTipoTermino, DateTime fechaResolucion,
            DateTime fechaConvenio, DateTime fechaInicio, DateTime fechaTermino, int? numeroPlazas, int idUsuarioCreacion, int? codProyecto, int codInstitucion, string nombreProyecto, string direccion)
        {
            var result = _datosResolucionDao.CrudDatoResolucion(opcion, icodDatoResolucion, codTipoResolucion,
                codLicitacionProyecto,identificadorResolucion, numeroResolucion, icodVerificadorOffline, codTipoTermino, fechaResolucion, fechaConvenio,fechaInicio, fechaTermino, numeroPlazas, idUsuarioCreacion, codProyecto, codInstitucion, nombreProyecto, direccion);
            return RespuestaMapper.ToRespuestaDto(result);
        }

        public List<ListaTipoResolucionDto> ListaTipoResolucion()
        {
            var result = _datosResolucionDao.ListaTipoResolucion();
            return DatosResolucionMapper.ListaTipoResolucionToDto(result);
        }

        public DatoResolucionDto ListaDatosResolucion(int idUsuario, int? icodDatoResolucion, string identificadorResolucion)
        {
            var result = _datosResolucionDao.ListaDatosResolucion(idUsuario, icodDatoResolucion, identificadorResolucion);
            return DatosResolucionMapper.DatoResolucionToDto(result);
        }

        
    }
}
