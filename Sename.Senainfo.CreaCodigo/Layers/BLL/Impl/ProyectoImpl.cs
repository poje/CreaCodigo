using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class ProyectoImpl
    {
        private readonly ProyectoDao _proyectoDao;

        public ProyectoImpl()
        {
            _proyectoDao = new ProyectoDao();
        }

        public List<QryListarProyectoDto> Listar(int? codProyecto, int? codDireccionRegional, int? codInstitucion,
            string indVigencia, int? icodTrabajador)
        {
            var result = _proyectoDao.Listar(codProyecto, codDireccionRegional, codInstitucion, indVigencia,
                icodTrabajador);
            return ProyectoMapper.ToDto(result);
        }

        public List<QryListarProyectoDto> ListarProyectosByUserId(int idUsuario, string indVigencia, int? codInstitucion)
        {
            var result = _proyectoDao.ListarProyectoByuserId(idUsuario, indVigencia, codInstitucion);
            return ProyectoMapper.ToDtoByuserId2(result);
        }

        public int ObtenerCodigoNuevoProyecto(int codRegion)
        {
            var codProyecto = _proyectoDao.ObtenerCodNuevoProyecto(codRegion);
            return codProyecto;
        }

        public List<ProyectoDto> ObtenerProyecto(int codProyecto)
        {
            var result = _proyectoDao.ObtenerDatosProyecto(codProyecto);
            return ProyectoMapper.ToForm(result);
        }

        public List<ProyectoDto> ObtenerProyectosOrigen(int administracionDirecta){
            var result = _proyectoDao.ObtenerProyectoOrigen(administracionDirecta);
            return ProyectoMapper.ToForm(result);
        }

        public List<DatoProyectoDto> ListaProyectoEdicion(int idUsuario)
        {
            var result = _proyectoDao.ListaProyectoEdicion(idUsuario);
            return ProyectoMapper.ToDatoProyectoDto(result);
        }

        public List<DatoProyectoDto> ListarProyectoContinuidad(int? codDepto, int? codRegion, int idUsuario)
        {
            var result = _proyectoDao.ListarProyectoContinuidad(codDepto, codRegion, idUsuario);

            return ProyectoMapper.ToDatoProyectoDto(result);
        }

        public DatosProyectoContinuidadDto ObtenerDatosProyectoContinuidad(int codProyectoContinuidad)
        {
            var result = _proyectoDao.ObtenerDatosProyectoContinuidad(codProyectoContinuidad);
            return ProyectoMapper.ToDatosProyectoContinuidad(result);
        }
        
    }
}
