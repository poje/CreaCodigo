using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using SenainfoSdk.Net;
using Sename.Senainfo.CreaCodigo.Layers.BLL.Impl;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Helpers;

namespace Sename.Senainfo.CreaCodigo.mod_instituciones.Handler
{
    /// <inheritdoc />
    /// <summary>
    /// Summary description for AdjuntaArchivo
    /// </summary>
    public class AdjuntaArchivo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var archivos = new List<HttpPostedFile>();
            var x = "";
            try
            {
                foreach (string s in context.Request.Files)
                {
                    var file = context.Request.Files[s];
                    archivos.Add(file);
                }

                foreach (var archivo in archivos)
                {
                    var cargarArchivo = new CargaArchivo
                    {
                        IdentificadorSistema = WebConfig.GetIdentificadorSistema("ModInstitucion"),
                        RutaVirtual = @context.Request["AdjuntoOffline"],
                        IdentificadorOrigen = 1,
                        IdUsuario = Convert.ToInt32(context.Request["IdUsuario"])
                    };
                    
                    var extension = Path.GetExtension(archivo.FileName);

                    if (extension.ToLower().Contains("pdf") || (extension.ToLower().Contains("xls") || extension.ToLower().Contains("xlsx")))
                    {
                        cargarArchivo.GuardarArchivos(archivo, out x);

                        if (x.Contains("correctamente"))
                        {
                            // Generar Verificador Adjunto
                            var archivoImpl = new ArchivoImpl();

                            var icodDatoResolucion = string.IsNullOrWhiteSpace(context.Request["IcodDatoResolucion"]) || context.Request["IcodDatoResolucion"] == "null" ? (int?)null : Convert.ToInt32(context.Request["IcodDatoResolucion"]);
                            var icodProyectoAdjudicado = string.IsNullOrWhiteSpace(context.Request["icodProyectoAdjudicado"]) || context.Request["icodProyectoAdjudicado"] == "null" ? (int?)null : Convert.ToInt32(context.Request["IcodProyectoAdjudicado"]);
                            var adjuntoOffline = context.Request["AdjuntoOffline"];
                            var result = archivoImpl.CreaArchivoTemporal(adjuntoOffline, icodDatoResolucion, icodProyectoAdjudicado,  Convert.ToInt32(cargarArchivo.CodArchivo), Convert.ToInt32(context.Request["TipoVerificador"]), cargarArchivo.IdUsuario);
                        }
                    }
                    else
                        x = "Usar solo archivos PDF";
                }

                context.Response.Write(x);

            }
            catch (Exception ex)
            {
                context.Response.Write("Ha ocurrido un error al subir los archivos : " + ex.Message);

                //Se eliminan los archivos creados hasta el momento en que se produce el error
                try
                {
                    foreach (var archivo in archivos)
                    {
                        File.Delete(archivo.FileName);
                        archivos.Remove(archivo);
                    }
                }
                catch
                { }
                
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}