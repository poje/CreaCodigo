using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class DatoCodigoGeneradoImpl
    {
        private readonly DatoCodigoGeneradoDao _datogeneradoDao;

        public DatoCodigoGeneradoImpl()
        {
            _datogeneradoDao = new DatoCodigoGeneradoDao();
        }

        public RespuestaDto CreaCodigoGenerado(string opcion, int? icodProyectoAdjudicado, int codProyecto, int idUsuario, int? codProyectoHijo)
        {
            var result = _datogeneradoDao.CreaCodigoGenerado(opcion, icodProyectoAdjudicado, codProyecto, idUsuario, codProyectoHijo);
            return RespuestaMapper.ToRespuestaDto(result);
        }

        public CodigoReservaDto CrudCodigoReserva(string opcion, int icodProyectoAdjudicado)
        {
            var result = _datogeneradoDao.CrudCodigoReserva(opcion, icodProyectoAdjudicado);
            return RespuestaMapper.ToCodigoReservaDto(result);
        }
        
    }
}
