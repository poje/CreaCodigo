using System;
using System.Web;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using Sename.Senainfo.CreaCodigo.Layers.DAL.Dao;

namespace Sename.Senainfo.CreaCodigo.mod_instituciones.Handler
{
    /// <summary>
    /// Summary description for ImprimeCodigo
    /// </summary>
    public class ImprimeCaso : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var icodCodigoGenerado = context.Request.QueryString["icodCodigoGenerado"];

            if (!string.IsNullOrWhiteSpace(icodCodigoGenerado))
            {
                var filename = "CodigoProyecto_" + icodCodigoGenerado + ".pdf";

                var codigoGeneradoDao = new DatoCodigoGeneradoDao();

                var report = new ReportDocument();
                var dtCaso = codigoGeneradoDao.ReporteCodigoGenerado(Convert.ToInt32(icodCodigoGenerado)).Copy();
                report.Load(Utils.WebConfig.PathReportes + "GeneraCodigo.rpt");

                report.Refresh();

                report.PrintOptions.PaperOrientation = PaperOrientation.Portrait;

                var connectionInfo = Utils.Utils.BuildConnection("Conexiones");
                report.DataSourceConnections[0].SetConnection(connectionInfo.ServerName, connectionInfo.DatabaseName,
                    connectionInfo.UserID, connectionInfo.Password);
                report.Database.Tables[0].SetDataSource(dtCaso);

                var reportStream = report.ExportToStream(ExportFormatType.PortableDocFormat);
                byte[] fileContent = Utils.Utils.StreamToBytes(reportStream);

                context.Response.Clear();
                context.Response.AddHeader("content-disposition", $"attachment;filename=\"{filename}\"");
                context.Response.AddHeader("Content-Length", fileContent.Length.ToString());
                context.Response.ContentType = "application/pdf";
                context.Response.BinaryWrite(fileContent);
                context.Response.Flush();
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