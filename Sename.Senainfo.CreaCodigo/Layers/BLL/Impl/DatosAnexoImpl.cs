using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;
using SENAME.Senainfo.Mod_InstitucionProyecto.BLL.Dto;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class DatosAnexoImpl
    {
        private readonly DatosAnexoDao _datosAnexoDao;
        private readonly DatosAnexoDto _dto;

        public DatosAnexoImpl()
        {
            _datosAnexoDao = new DatosAnexoDao();
          
        }

        public DatosAnexoImpl(int numeroCdp, int idUsuario, string icodVerificadorOffline, int codDeptoSename)
        {
            _dto = new DatosAnexoDto(0,numeroCdp, idUsuario, icodVerificadorOffline, codDeptoSename);
        }

        public int Insert_DatosAnexo(int numeroCdp, int idUsuario, string icodVerificadorOffline, int codDeptoSename)
        {
            return _datosAnexoDao.Insert_DatosAnexo(numeroCdp, idUsuario, icodVerificadorOffline, codDeptoSename);
        }

        public List<DatosAnexoDto> ObtenerDatosAnexo(int? codDatosAnexo, int idUsuario)
        {
            var dt = _datosAnexoDao.ListarDatosAnexo(codDatosAnexo, idUsuario);
            return DatosAnexoMapper.ToList(dt);
        }

    }
}
