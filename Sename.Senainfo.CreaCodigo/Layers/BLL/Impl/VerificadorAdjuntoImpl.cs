using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class VerificadorAdjuntoImpl
    {
        private readonly VerificadorAdjuntoDao _verificadorAdjuntoDao;

        public VerificadorAdjuntoImpl()
        {
            _verificadorAdjuntoDao = new VerificadorAdjuntoDao();
        }

        public int Insert(VerificadorAdjuntoDto verificadorAdjunto)
        {
            return _verificadorAdjuntoDao.Insert(verificadorAdjunto.CodTipoVerificador, verificadorAdjunto.CodArchivo, verificadorAdjunto.NombreArchivo, verificadorAdjunto.IdUsuario); //, verificadorAdjunto.FechaCreacion, verificadorAdjunto.IndVigencia);
        }
    }
}
