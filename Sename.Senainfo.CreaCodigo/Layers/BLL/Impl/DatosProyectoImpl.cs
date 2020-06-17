using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class DatosProyectoImpl
    {
        private readonly DatosProyectoDao _datosProyectoDao;
        
        public DatosProyectoImpl()
        {
            _datosProyectoDao = new DatosProyectoDao();
        }
        
        public int Insert(DatosProyectoDto datosProyecto)
        {
            return _datosProyectoDao.Insert(datosProyecto.iCodVerificadorAdjunto, datosProyecto.iCodDatoResolucion, datosProyecto.Nombre, datosProyecto.Emailproyecto, datosProyecto.CodInstitucion, datosProyecto.FechaInicio, datosProyecto.FechaTermino,
                datosProyecto.Direccion, datosProyecto.Telefono, datosProyecto.NombreDirector, datosProyecto.RutDirector, datosProyecto.CelularDirector, datosProyecto.CuentaCorriente, datosProyecto.CodBanco, datosProyecto.IdUsuarioCreacion, datosProyecto.IndVigencia);
        }
    }
}
