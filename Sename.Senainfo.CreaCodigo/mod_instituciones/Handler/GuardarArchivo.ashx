<%@ WebHandler Language="C#" Class="GuardarArchivo" %>

using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Web;
using Newtonsoft.Json;
using SenainfoSdk.Net;


public class GuardarArchivo : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        List<HttpPostedFile> archivos = new List<HttpPostedFile>();
        try
        {
           

            HttpPostedFile file = context.Request.Files[0];
            int fileSizeInBytes = file.ContentLength;
            string fileName = file.FileName;
          
            string savedFileName = fileName; //Guid.NewGuid() + fileExtension;
            string filename = context.Server.MapPath("~/") + savedFileName;
           
            // Guardamos en disco
            file.SaveAs(filename);
           
            string mensajeRespuestaSubida = "";

            NameValueCollection section = (NameValueCollection)ConfigurationManager.GetSection("ModInstitucion");

            CargaArchivo cargarArchivo = new CargaArchivo();
            cargarArchivo.IdentificadorSistema = Convert.ToInt32(section["IdentificadorSistema"]);  //13;
            cargarArchivo.IdentificadorOrigen = Convert.ToInt32(section["IdentificadorOrigen"]);
            cargarArchivo.IdUsuario = Convert.ToInt32(context.Request.Form["IdUsuario"]);
            cargarArchivo.RutaVirtual = section["RutaVirtual"];
            cargarArchivo.GuardarArchivos(file, out mensajeRespuestaSubida);
          

            FileJsonResponse flr = new FileJsonResponse();

            flr.CodArchivo = Convert.ToInt32(cargarArchivo.CodArchivo);
            flr.NombreArchivo = file.FileName;
            flr.MensajeRespuestaSubida = mensajeRespuestaSubida;

            context.Response.ContentType = "application/json";
           
            context.Response.Write(JsonConvert.SerializeObject(flr));

        }
        catch (Exception ex)
        {
            context.Response.Write("Ha ocurrido un error al subir los archivos");

            //Se eliminan los archivos creados hasta el momento en que se produce el error
            foreach (var archivo in archivos)
            {
                File.Delete(archivo.FileName);
                archivos.Remove(archivo);
            }
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

