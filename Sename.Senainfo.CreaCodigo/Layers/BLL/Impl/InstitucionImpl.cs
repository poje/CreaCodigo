using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    
    public class InstitucionImpl
    {
        private readonly InstitucionDao _institucionDao;

        public InstitucionImpl()
        {
            _institucionDao = new InstitucionDao();
        }

        public List<InstitucionDto> Listar(int? codInstitucion, int? codDireccionRegional, string indVigencia)
        {
            var result = _institucionDao.Listar(codInstitucion, codDireccionRegional,indVigencia);
            return InstitucionMapper.ToDto(result);
        }

        public List<InstitucionDto> ListarInstitucionOrigen(int? userId)
        {
            var result = _institucionDao.Listar(userId);
            return InstitucionMapper.ToDtoByUserId(result);
        }

        public List<InstitucionDto> Listar(int? userId)
        {
            var result = _institucionDao.Listar(userId);
            return InstitucionMapper.ToDtoByUserId(result);
        }

        public List<InstitucionDto> ListarInstitucionesxTipoInstitucion(int tipoInstitucion)
        {
            var result = _institucionDao.ListarInstitucionesxTipoinstitucion(tipoInstitucion);
            return InstitucionMapper.ToDto(result);
        }

        public List<Institucion> ListaInstitucionUsuario(int idUsuario)
        {
            var result = _institucionDao.ListaInstitucionUsuario(idUsuario);
            return InstitucionMapper.ToListaInstitucionUsuario(result);
        }

        public List<InstitucionDto> ListarInstitucionPorRegion(int codRegion)
        {
            var result = _institucionDao.ListarInstitucionPorRegion(codRegion);
            return InstitucionMapper.ToDto(result);
        }

    }
}
