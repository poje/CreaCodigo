using SenainfoSdk;
using SenainfoSdk.BusinessData;
using System;
using System.Data;
using System.Web;

namespace Sename.Senainfo.CreaCodigo
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            //var idUsuarioLogin = 120360;
            //Session["IdUsuario"] = 79533; //SENAINFOTMP 
            //Session["icodtrabajador"] = 68588; //SENAINFOTMP 
            //Session["UserName"] = "hector.gatica@gmail.com"; // 
            //Session["Usuario"] = "Hector Gatica";

            //Session["IdUsuario"] = 79983; //SENAINFOTEST
            //Session["icodtrabajador"] = 68625; //SENAINFOTEST
            //Session["UserName"] = "dino.garcia.s7379@gmail.com"; // 
            //Session["Usuario"] = "Dino Garcia";

            // Usuario de Test
            //Session["IdUsuario"] = 84993; //SENAINFOTEST
            //Session["icodtrabajador"] = 74653; //SENAINFOTEST
            //Session["contrasena"] = "252";
            //Session["UserName"] = "ADMINISTRADORPROYECTO@EJEMPLO.CL"; // 
            //Session["Usuario"] = "ADMINISTRADOR DE PROYECTO";

            var idUsuarioLogin = 99605;
            Session["IdUsuario"] = 69044;
            Session["Icodtrabajador"] = 58007;
            Session["UserName"] = "jorge.villaseca91@gmail.com";
            Session["Usuario"] = "Jorge Villaseca Riquelme";
            Session["contrasena"] = 252;


            // Usuario de Certificación
            //Session["IdUsuario"] = 94953;
            //Session["Icodtrabajador"] = 82164;
            //Session["UserName"] = "ADMINISTARDOR PROYECTO";
            //Session["Usuario"] = "adminsitradorproyecto@senainfo.cl";
            //Session["contrasena"] = 265;


            //Session["IdUsuario"] = 27342; //SENAINFOTMP 
            //Session["icodtrabajador"] = 15665; //SENAINFOTMP 
            //Session["UserName"] = "lcalderon@sename.cl"; // 
            //Session["Usuario"] = "Leslie Calderon";

            // Usuario PreProd
            //Session["IdUsuario"] = 89855; //SENAINFOTEST
            //Session["icodtrabajador"] = 78902; //SENAINFOTEST
            //Session["contrasena"] = "265";
            //Session["UserName"] = "massiel.rodriguez@sename.cl"; // 
            //Session["Usuario"] = "Massiel Rodríguez";

            //AgregarToken(395, "146209E4-C62A-48FB-BD77-2913E3D64DD5"); // Administrador Senainfo
            //AgregarToken(397, "C4C499B5-1DDF-4FDB-9AB1-6B4F110A0A65"); // Uplae
            //AgregarToken(398, "1FECB5C2-839A-4579-BFC1-16D9246230F0"); // Administrador Proyecto
            //AgregarToken(564, "94C05295-2C48-4E3D-AAC8-E1F54DEF8156");
            //AgregarToken(565,"8F4B0B00-B205-4F95-93A1-589A9885BF28");
            //AgregarToken(566,"EA3D2B9D-4427-40B2-8845-34344CF50A54");
            //AgregarToken(567,"D49BFD09-01AD-4642-9450-DD5F920E17CE");
            //AgregarToken(568,"DFEE8A05-DC9B-4291-ACA4-5E02A38EAFDC");

            //AgregarToken();

            var sql = string.Format(@"SELECT t4.IdToken, t4.TokenCadena
            FROM Usuarios t1 INNER JOIN RolesUsuarios t2 ON t1.IdUsuario = t2.IdUsuario
                             INNER JOIN RolesTokens t3 ON t2.IdRol=t3.IdRol
                             INNER JOIN Tokens t4 ON t3.IdToken = t4.IdToken
            WHERE t1.IdUsuario = {0}
            UNION
            SELECT tt2.IdToken, tt2.TokenCadena
            FROM UsuariosTokens tt1 INNER JOIN Tokens tt2 ON tt1.IdToken = tt2.IdToken
            WHERE tt1.IdUsuario = {0}", idUsuarioLogin);

            var mDataSet = new DataSet();
            var da = new System.Data.SqlClient.SqlDataAdapter(sql, System.Configuration.ConfigurationManager.ConnectionStrings["SENAINFOCONN"].ConnectionString);
            da.Fill(mDataSet);
            Session["tokens"] = mDataSet;

            #region Carga de parametricas
            Session["dsParametricas"] = new DataSet();

            var instColl = new institucioncoll();
            var par = new parcoll();
            var ncoll = new ninocoll();

            var dtInstituciones = instColl.GetData(Convert.ToInt32(Session["IdUsuario"])); dtInstituciones.TableName = "dtInstituciones";
            var dtTipoAsistenciaEscolar = par.GetparTipoAsistenciaEscolar(); dtTipoAsistenciaEscolar.TableName = "dtTipoAsistenciaEscolar";
            var dtTipoMaltrato = par.GetparTipoMaltrato(); dtTipoMaltrato.TableName = "dtTipoMaltrato";
            var dtRelacionPresuntoMaltratador = ncoll.Get_TipoRelacionMaltrato(); dtRelacionPresuntoMaltratador.TableName = "dtRelacionPresuntoMaltratador";
            var dtDroga = par.GetparDrogas(); dtDroga.TableName = "dtDroga";
            var dtTipoConsumoDroga = par.GetparTipoConsumoDroga(); dtTipoConsumoDroga.TableName = "dtTipoConsumoDroga";
            var dtTipoDiagnosticosPsicologico = par.GetparTipoDiagnosticosPsicologico(); dtTipoDiagnosticosPsicologico.TableName = "dtTipoDiagnosticosPsicologico";
            var dtInsercionLaboral = par.GetparInsercionLaboral(); dtInsercionLaboral.TableName = "dtInsercionLaboral";
            var dtTipoTribunal = par.GetparTipoTribunal(); dtTipoTribunal.TableName = "dtparTipoTribunal";
            var dtparRegion = par.GetparRegion(); dtparRegion.TableName = "dtparRegion";
            var dtTipoCausalIngreso = par.GetTipoCausal(); dtTipoCausalIngreso.TableName = "dtTipoCausalIngreso";
            var dtparNacionalidades = par.GetparNacionalidades(); dtparNacionalidades.TableName = "dtparNacionalidades";
            var dtparTipoCausalIngreso = par.GetparTipoCausalIngreso(0); dtparTipoCausalIngreso.TableName = "parTipoCausalIngreso";

            var dsParametricas = new DataSet();

            dsParametricas.Tables.Add(dtInstituciones);
            dsParametricas.Tables.Add(dtTipoAsistenciaEscolar);
            dsParametricas.Tables.Add(dtTipoMaltrato);
            dsParametricas.Tables.Add(dtRelacionPresuntoMaltratador);
            dsParametricas.Tables.Add(dtDroga);
            dsParametricas.Tables.Add(dtTipoConsumoDroga);
            dsParametricas.Tables.Add(dtTipoDiagnosticosPsicologico);
            dsParametricas.Tables.Add(dtInsercionLaboral);
            dsParametricas.Tables.Add(dtTipoTribunal);
            dsParametricas.Tables.Add(dtparRegion);
            dsParametricas.Tables.Add(dtTipoCausalIngreso);
            dsParametricas.Tables.Add(dtparNacionalidades);
            dsParametricas.Tables.Add(dtparTipoCausalIngreso);

            Session["dsParametricas"] = dsParametricas;
            #endregion
        }

        public static void AgregarToken()
        {
            var mDataSet = new DataSet();
            var dt = new DataTable();
            dt.Columns.Add(new DataColumn("IdToken", typeof(int)));
            dt.Columns.Add(new DataColumn("TokenCadena", typeof(string)));

            AgregaRows(dt, 398, "1FECB5C2-839A-4579-BFC1-16D9246230F0");
            AgregaRows(dt, 564, "94C05295-2C48-4E3D-AAC8-E1F54DEF8156");
            AgregaRows(dt, 565, "8F4B0B00-B205-4F95-93A1-589A9885BF28");
            AgregaRows(dt, 566, "EA3D2B9D-4427-40B2-8845-34344CF50A54");
            AgregaRows(dt, 567, "D49BFD09-01AD-4642-9450-DD5F920E17CE");
            AgregaRows(dt, 568, "DFEE8A05-DC9B-4291-ACA4-5E02A38EAFDC");
            AgregaRows(dt, 569, "63C218BF-3116-4C74-8508-E01144C53F01");

            mDataSet.Tables.Add(dt);

            HttpContext.Current.Session["tokens"] = mDataSet;
        }

        public static void AgregaRows(DataTable dtTokens, int idtoken, string tokenCadena)
        {

            DataRow dr = dtTokens.NewRow();
            dr["IdToken"] = idtoken;
            dr["TokenCadena"] = tokenCadena;
            dtTokens.Rows.Add(dr);
        }

        #region Sin usar
        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }

        #endregion

    }
}