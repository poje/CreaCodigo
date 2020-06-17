using System;
using System.Collections.Generic;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Dto;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Mapper;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;
using SpreadsheetLight;

namespace Sename.Senainfo.CreaCodigo.Layers.BLL.Impl
{
    public class ArchivoImpl
    {
        private readonly ArchivoDao _archivoDao;

        public ArchivoImpl()
        {
            _archivoDao = new ArchivoDao();
        }

        public List<VerificadorAdjuntoDto> ListaArchivoTemporal(string adjuntoOffline, int idUsuario, int? codTipoVerificador)
        {
            var result = _archivoDao.ArchivoTemporal("L", adjuntoOffline, null, null, null, null, codTipoVerificador, idUsuario);
            return ArchivoMapper.ToDto(result);
        }

        public RespuestaDto BorraArchivoTemporal(int? idVerificadorAdjunto, int idUsuario)
        {
            var result = _archivoDao.ArchivoTemporal("B", null, idVerificadorAdjunto, null, null, null, null, idUsuario);
            return RespuestaMapper.ToRespuestaDto(result);
        }

        public RespuestaDto CreaArchivoTemporal(string adjuntoOffline, int? icodDatoResolucion, int? icodProyectoAdjudicado, int codArchivo, int codTipoVerificador, int idUsuario)
        {
            var result = _archivoDao.ArchivoTemporal("C", adjuntoOffline, null, icodDatoResolucion, icodProyectoAdjudicado, codArchivo, codTipoVerificador, idUsuario);
            return RespuestaMapper.ToRespuestaDto(result);
        }

        public int ProcesarExcelCreaCodigo(string rutaVirtual, int idUsuario)
        {
            var ruta = _archivoDao.ObtenerRutaArchivo(rutaVirtual);

            var excel = new SLDocument(ruta);
            var excelStatistics = excel.GetWorksheetStatistics();

            if (excelStatistics.NumberOfRows > 1 && excelStatistics.NumberOfColumns == 18)
            {
                var lpDto = new LicitacionProyectoDto();
                var lpDao = new LicitacionProyectoDao();

                var aplDto = new AdosadoProyectoLicitacionDto();
                var aplDao = new AdosadoProyectoLicitacionDao();

                var esAdosado = false;
                var codProyectoLicitacion = 0;
                var codAdosadoProyectoLicitacion = 0;

                for (var r = 2; r <= excelStatistics.NumberOfRows; r++)
                {
                    for (var c = 1; c <= excelStatistics.NumberOfColumns; c++)
                    {
                        //leer valor de celda
                        var value = excel.GetCellValueAsString(r, c);

                        if (!esAdosado)
                        {
                            switch (c)
                            {
                                //Asignamos valores a clase
                                case 1:
                                    esAdosado = (value.Substring(0, 1) != "0");
                                    lpDto.CodLicitacion = Convert.ToInt32(ValueSubstring(value, 1));
                                    break;
                                case 2:
                                    lpDto.CodRegion = Convert.ToInt32(ValueSubstring(value, 2));
                                    break;
                                case 3:
                                    lpDto.CodComuna = Convert.ToInt32(ValueSubstring(value, 3));
                                    break;
                                case 4:
                                    lpDto.Focalizacion = ValueSubstring(value, value.Length);
                                    break;
                                case 5:
                                    lpDto.SexoPoblAtendida = Convert.ToChar(ValueSubstring(value, 1));
                                    break;
                                case 6:
                                    lpDto.NumeroMesesConvenio = Convert.ToInt32(ValueSubstring(value, 2));
                                    break;
                                case 7:
                                    lpDto.CodModeloIntervencion = Convert.ToInt32(ValueSubstring(value, 3));
                                    break;
                                case 8:
                                    lpDto.CodLineaAccion = Convert.ToInt32(ValueSubstring(value, 2));
                                    break;
                                case 9:
                                    lpDto.CodModalidadAtencion = Convert.ToInt32(ValueSubstring(value, 2));
                                    break;
                                case 10:
                                    lpDto.CodTipoAtencion = Convert.ToInt32(ValueSubstring(value, 2));
                                    break;
                                case 11:
                                    lpDto.FactorVidaFamiliar = Convert.ToInt32(ValueSubstring(value, 1));
                                    break;
                                case 12:
                                    lpDto.NroPlazas = Convert.ToInt32(ValueSubstring(value, value.Length));
                                    break;
                                case 13:
                                    lpDto.MontoPeriodoLicitar = Convert.ToInt32(ValueSubstring(value, value.Length));
                                    break;
                                case 14:
                                    lpDto.EsProyectoContinuidad = Convert.ToInt32(ValueSubstring(value, 1));
                                    break;
                                case 15:
                                    lpDto.CodProyectoContinuidad = Convert.ToInt32(ValueSubstring(value, value.Length));
                                    break;
                                default:
                                    break;
                            }

                            lpDto.IdUsuarioActualizacion = idUsuario;
                        }
                        else
                        {
                            switch (c)
                            {
                                case 16:
                                    aplDto.CodModeloIntervencion = Convert.ToInt32(ValueSubstring(value, 3));
                                    break;
                                case 17:
                                    aplDto.NumeroPlazas = Convert.ToInt32(ValueSubstring(value, value.Length));
                                    break;
                                case 18:
                                    aplDto.Monto = Convert.ToInt32(ValueSubstring(value, value.Length));
                                    break;
                                default:
                                    break;
                            }
                        }
                    }

                    //Insertamos en la BD.
                    if (esAdosado)
                    {
                        codAdosadoProyectoLicitacion = aplDao.Insert(aplDto.CodLicitacionProyecto, aplDto.CodModeloIntervencion, aplDto.NumeroPlazas, aplDto.Monto, 'V', DateTime.Now, DateTime.Now, idUsuario);
                    }
                    else
                    {
                        aplDto.CodLicitacionProyecto = codProyectoLicitacion;
                        codProyectoLicitacion = lpDao.Insert(lpDto.CodLicitacion, lpDto.CodRegion, lpDto.CodComuna, lpDto.SexoPoblAtendida, lpDto.NumeroMesesConvenio, lpDto.CodModeloIntervencion, lpDto.CodLineaAccion, lpDto.CodModalidadAtencion, lpDto.CodTipoAtencion, lpDto.NroPlazas, lpDto.MontoPeriodoLicitar, lpDto.FactorVidaFamiliar, lpDto.ProyectoAdosado, lpDto.CodModeloIntervencionAdosado,
                        lpDto.NroPlazasAdosado, lpDto.IndVigencia,lpDto.IdUsuarioActualizacion, lpDto.Focalizacion,lpDto.EsProyectoContinuidad,lpDto.CodProyectoContinuidad);
                    }

                    if (codProyectoLicitacion != 0 && codAdosadoProyectoLicitacion != 0)
                        return 2;

                    return codProyectoLicitacion != 0 ? 1 : 0;
                }
            }
            else
            {
                return -1;
            }
            return -2;
        }

        public string ValueSubstring(string value, int length)
        {
            return value.Substring(0, length);
        }
    }
}