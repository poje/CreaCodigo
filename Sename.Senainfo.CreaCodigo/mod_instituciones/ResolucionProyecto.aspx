<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ResolucionProyecto.aspx.cs" Inherits="Sename.Senainfo.CreaCodigo.mod_instituciones.ResolucionProyecto" %>

<%@ Register Src="~/SenainfoSdk/C_menu_colgante.ascx" TagPrefix="uc1" TagName="menu_colgante" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Registro de Resolución / Proyectos</title>
    <link rel="icon" href="../images/favicon.ico" />

    <script src="../js/jquery-3.2.1.min.js"></script>
    <script src="../js/jquery.cookie.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/jquery-ui.js"></script>
    <script src="../js/jquery.Rut.js"></script>
    <script src="../js/jquery.inputmask.bundle.min.js"></script>
    <script src="../js/jquery.validate.min.js"></script>
    <script src="../js/jquery-confirm.min.js"></script>
    <script src="../js/year-select.js"></script>
    <script src="../js/select2.full.min.js"></script>
    <script src="../js/select2-selectionTitleAttribute.js"></script>
    <script src="../js/datatables.min.js"></script>
    <script src="../js/alertify.min.js"></script>
    <script src="../js/additional-methods.min.js"></script>
    <script src="../js/localization/messages_es.min.js"></script>
    <script src="../js/bootstrap-switch.min.js"></script>

    <%--Botones Exportar--%>
    <script src="../js/jquery.dataTables.min.js"></script>
    <script src="../js/dataTables.buttons.min.js"></script>
    <script src="../js/jszip.min.js"></script>
    <script src="../js/pdfmake.min.js"></script>
    <script src="../js/vfs_fonts.js"></script>
    <script src="../js/buttons.html5.min.js"></script>

    <script src="../js/localization/jquery.ui.datepicker-es.js"></script>
    <script src="../js/moment.min.js"></script>



    <script src="js/ResolucionProyecto.js"></script>

    <script src="js/ResolucionProyectoTemplatesSelect2/Templates.js"></script>
    <script src="js/ResolucionProyectoJS/ResolucionProyectoRoutes.js"></script>
    <script src="js/ResolucionProyectoJS/ResolucionProyectoPromises.js"></script>

    <script src="js/ResolucionProyectoJS/ResProyDatosLicitacion.js"></script>
    <script src="js/ResolucionProyectoJS/ResProyDatosProyectoLicitacion.js"></script>
    <script src="js/ResolucionProyectoJS/ResProyDatosResolucion.js"></script>
    <script src="js/ResolucionProyectoJS/ResProyDatosProyecto.js"></script>
    <script src="js/ResolucionProyectoJS/ResProyGeneraCodigo.js"></script>
    <script src="js/ResolucionProyectoJS/ResProyRevisionDatos.js"></script>




    <link href="../css/bootstrap-switch.min.css" rel="stylesheet" />
    <link href="../css/jquery-ui.css" rel="stylesheet" />
    <link href="../css/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="../css/theme.css" rel="stylesheet" />

    <link href="../css/datatables.min.css" rel="stylesheet" />

    <link href="../css/select2.min.css" rel="stylesheet" />
    <link href="../css/select2-bootstrap.min.css" rel="stylesheet" />
    <link href="../css/alertify.min.css" rel="stylesheet" />

    <%--<link href="css/mod_instituciones.css" rel="stylesheet" />--%>
    <link href="../css/themes/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/jquery-confirm.min.css" rel="stylesheet" />

    <link href="../css/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="../css/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="../css/font-awesome.min.css" rel="stylesheet" />


    <link href="../css/jquery.ui.theme.css" rel="stylesheet" />
    <link href="css/resolucionProyecto.css" rel="stylesheet" />

</head>

<body>
    <style>
        #tabs { /*padding-top: 15%;*/
        }

        .bloqueado {
            pointer-events: none;
        }

        .centrar-chk {
            padding-top: 20px;
        }

        .error {
            color: red;
        }

        .origen {
            padding-top: 1%;
        }

        .factores th {
            background-color: #3c83bf !important;
            color: white;
        }

        /*.btnNuevoProyecto {
            padding-top: 6.5%;
        }*/

        /*.btnNuevoProyecto button {
            height: 34px;
        }*/

        #divProyectoNuevo {
            padding-top: 2.2%;
        }

        #gridResoluciones td {
            text-align: center;
        }

        .spinner {
            background: rgb(255, 255, 255);
            background: rgba(255, 255, 255, 0.2);
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -50px;
            /* half width of the spinner gif */
            margin-top: -50px;
            /* half height of the spinner gif */
            z-index: 9999;
            overflow: auto;
            width: 229px;
            /* width of the spinner gif */
            height: 51px;
            /*hight of the spinner gif +2px to fix IE8 issue */
            font-family: Tahoma;
            font-size: 11px;
            font-weight: bold;
            text-align: center;
        }

        .form-group.required .control-label:after {
            content: "*";
            color: red;
            padding-left: 5px;
        }

        .has-error {
            border: red;
        }

        #ProyectosLicitacion {
            margin-top: 2%;
        }

        .hidden {
            display: none;
        }

        #hide input[type=file] {
            display: none;
            margin: 10px;
        }

            #hide input[type=file] + label {
                display: inline-block;
                margin: 20px;
                padding: 4px 32px;
                background-color: #FFFFFF;
                border: solid 1px #666F77;
                border-radius: 6px;
                color: #666F77;
            }

            #hide input[type=file]:active + label {
                background-image: none;
                background-color: #2D6C7A;
                color: #FFFFFF;
            }
    </style>
    <form id="ResolucionProyectoForm" runat="server" novalidate>
        <uc1:menu_colgante runat="server" ID="C_menu_colgante"></uc1:menu_colgante>

        <%--<input type="hidden" id="roles" value="262,282,262,249,263,252,254,256"/>--%>
        <asp:HiddenField runat="server" ID="roles" Value="262,282,262,249,263,252,254,256" />
        <asp:HiddenField ID="hdfIdUsuario" runat="server" />
        <asp:HiddenField ID="hdfCodigoProyectoHijo" runat="server" />

        <asp:HiddenField ID="hdfAccesoPagina" runat="server" />
        <asp:HiddenField ID="hdfLecturaAnexo1" runat="server" />
        <asp:HiddenField ID="hdfLecturaTabLicitacion" runat="server" />
        <asp:HiddenField ID="hdfLecturaTabResolucion" runat="server" />
        <asp:HiddenField ID="hdfLecturaTabDatos" runat="server" />
        <asp:HiddenField ID="hdfLecturaTabGenera" runat="server" />
        <asp:HiddenField ID="hdfEscrituraAnexo1" runat="server" />
        <asp:HiddenField ID="hdfEscrituraTabLicitacion" runat="server" />
        <asp:HiddenField ID="hdfEscrituraTabResolucion" runat="server" />
        <asp:HiddenField ID="hdfEscrituraTabDatos" runat="server" />
        <asp:HiddenField ID="hdfEscrituraTabGenera" runat="server" />



        <div class="col-md-12 theme-showcase">

            <ol class="breadcrumb">
                <li>
                    <a id="lnkIndex" href="#" runat="server">Inicio</a>
                </li>
                <li class="active">Instituciones</li>
                <li class="active urlbase">Registro de Resolución / Proyectos</li>
            </ol>

            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="row">
                            <div id="msgInfoW" style="display: none;" class="alert alert-info text-center" role="alert">
                            </div>
                            <div id="msgCorrectoW" style="display: none;" class="alert alert-success text-center"
                                role="alert">
                            </div>
                            <div id="msgErrorW" style="display: none;" class="alert alert-warning text-center"
                                role="alert">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="spinner" class="spinner text-center">
                <p id="pSpinner">
                    <img id="img-spinner" src="../images/Cursors/ajax-loader.gif" alt="Cargando..." />
                    Cargando...
                </p>
            </div>

            <div id="pnlMain" class="row" style="display: none;">
                <div class="col-md-12">
                    <div id="tabs">
                        <ul class="nav nav-tabs">
                            <li class="" id="liTabAnexo1" style="display: none;">
                                <a id="tabDatosAnexo1" href="#DatosAnexo1" data-toggle="tab">Datos Licitación</a>
                            </li>
                            <li class="" id="liTabLicitacionProyecto" style="display: none;">
                                <a id="tabDatosLicitacionProyecto" href="#DatosLicitacion" data-toggle="tab">Datos Proyecto Licitación</a>
                            </li>
                            <li class="" id="liTabDatosResolucion" style="display: none;">
                                <a id="tabDatosResolucion" href="#DatosResolucion" data-toggle="tab">Datos Resolución</a>
                            </li>
                            <li class="" id="liTabDatosProyecto" style="display: none;">
                                <a id="tabDatosProyecto" href="#DatosProyectoAdjudicado" data-toggle="tab">Datos Proyecto Adjudicado</a>
                            </li>
                            <li class="" id="liTabGeneracionCodigo" style="display: none;">
                                <a id="tabGeneraCodigo" href="#GeneraCodigoProyecto" data-toggle="tab">Generar Código Proyecto</a>
                            </li>
                        </ul>

                        <div class="tab-content">
                            <div class="tab-pane fade" id="DatosAnexo1">
                                <p>&nbsp;</p>
                                <div class="col-md-12">
                                    <div class="form-group col-md-6">
                                        <label for="">Número CDP</label>
                                        <input type="text" class="nro-cdp form-control" id="txtNumeroCdp" disabled />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="">Área de Atención</label>
                                            <select class="depto form-control ddl" id="ddlDeptos" style="width: 100%;" disabled>
                                                <%--                    <option value="0">Seleccionar</option>--%>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">


                                    <div class="col-md-6 form-group">
                                        <label>Adjuntar CDP (*)</label>
                                        <div class="input-group">
                                            <label class="input-group-btn">
                                                <span class="btn btn-primary btn-sm">Examinar&hellip;
                                                        <input type="file" name="AdjuntoCdp" style="display: none;" id="fileAdjuntoCdp" accept=".pdf" />
                                                </span>

                                            </label>
                                            <input id="lblAdjuntoCdp" type="text" class="form-control input-sm" readonly />


                                        </div>
                                        <span class="help-block">Seleccionar un archivo
                                        </span>

                                    </div>
                                    <div class="col-md-2 form-group">
                                        <label>Adjuntar</label>
                                        <div class="input-group">
                                            <button class="btn btn-primary btn-sm text-center" id="btnAdjuntoCdp" disabled>Adjuntar <i class="fa fa-upload" aria-hidden="true"></i></button>
                                        </div>
                                    </div>

                                    <div id="pnlAdjuntarCdp" style="display: none;">
                                        <div class="col-md-12">
                                            <div class="form-group col-md-6">
                                                <table id="tblAdjuntoCdp" class="table table-bordered table-responsive small">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Id</th>
                                                            <th scope="col">Archivo Verificador</th>
                                                            <th scope="col">Tipo Verificador</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="pull-right">
                                            <button class="btn btn-primary limpiar"><span class="glyphicon glyphicon-refresh"></span>Limpiar</button>
                                            <button id="btnGuardarAnexo1" class="btn btn-warning" disabled><span class="glyphicon glyphicon-save"></span>Guardar Datos Anexo 1</button>
                                        </div>
                                    </div>

                                    <p>&nbsp;</p>


                                </div>

                                <p>&nbsp;</p>
                            </div>
                            <div class="tab-pane fade" id="DatosLicitacion">
                                <p>&nbsp;</p>

                                <blockquote style="border-left: 5px solid gray; margin-left: 1%;">
                                    <p>La edad esta determinada según el módelo de intervención seleccionado</p>
                                    <%--<small>Frase célebre de <cite title="Nombre Apellidos">Nombre Apellidos</cite></small>--%>
                                </blockquote>

                                <div class="col-md-12">
                                    <div class="col-md-6">
                                        <label for="">
                                            Seleccionar Licitacion Disponible (Desde Anexo 1)

                                        </label>
                                        <select class="form-control input-sm ddl" id="select-datoanexo" style="width: 100%;"></select>

                                    </div>


                                    <div class="col-md-6">
                                        <label>Focalización</label>
                                        <textarea class="form-control input-sm focalizacion" placeholder="Ingrese Focalización..."></textarea>
                                    </div>
                                </div>

                                <div class="col-md-12" style="padding-top: 2%;">
                                    <%--<label class="subtitulo-form">Datos Proyecto Licitación</label>--%>
                                    <div class="col-md-3 form-group">
                                        <label for="">Región</label>
                                        <select type="text" class="region form-control ddl">
                                            <%--                    <option value="0">Seleccionar</option>--%>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="">Comuna</label>
                                        <select type="text" class="comuna form-control ddl" style="width: 100%;">
                                            <%--<option value="0">Seleccionar</option>--%>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="">Sexo Pobl. Atendida</label>
                                        <select type="text" class="sexo-poblacion form-control input-sm" style="width: 100%;">
                                            <option value="0">Seleccionar Sexo</option>
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                            <option value="A">Ambas</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="">Número de Meses Convenio</label>
                                        <input type="text" class="nro-meses-convenio form-control" />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-3 text-center form-group">
                                        <label>Es Proyecto Continuidad?</label>
                                        <br />
                                        <input type="checkbox" class="checkbox" id="chkEsProyectoContinuidad" name="chkEsProyectoContinuidad" />
                                    </div>
                                    <div class="col-md-9 form-group">
                                        <label>Proyecto al que se le dará continuidad</label>
                                        <br />
                                        <select class="proyecto-continuidad form-control ddl"></select>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="col-md-6 form-group">
                                        <label for="">Modelo de Intervención</label>
                                        <select type="text" class="modelo-intervencion form-control ddl" style="width: 100%;">
                                            <%--<option value="0">Seleccionar</option>--%>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="">Línea de Acción</label>
                                        <select type="text" class="linea-accion form-control ddl" style="width: 100%;">
                                            <%--<option value="0">Seleccionar</option>--%>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="">Modalidad de Atención</label>
                                        <select type="text" class="modalidad-atencion form-control ddl" style="width: 100%;">
                                            <%--                    <option value="0">Seleccionar</option>--%>
                                        </select>
                                    </div>

                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-3 form-group">
                                        <label for="">Tipo de Atención</label>
                                        <select type="text" class="tipo-atencion form-control ddl" style="width: 100%;">
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="">Cobertura (Nº Plazas)</label>
                                        <input type="text" class="nro-plazas form-control" />
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label>Monto Periodo a Licitar</label>
                                        <div class="input-group">
                                            <span class="input-group-addon" style="color: black;">$</span>
                                            <input type="text" class="monto-periodo-licitar form-control" aria-describedby="inputGroupSuccess2Status" />
                                        </div>
                                    </div>
                                    <div class="col-md-3 text-center form-group">
                                        <label>Factor Vida Familiar</label>
                                        <br />
                                        <input type="checkbox" class="checkbox" id="chkFactorVidaFamiliar" name="chkFactorVidaFamiliar">
                                    </div>
                                </div>


                                <div class="col-md-4 col-md-offset-9">
                                    <button class="btn btn-primary" id="AgregaProyectoLicitacion" style="margin-top: 25px;">
                                        Agregar Proyecto a Licitación
                                    </button>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Importar Proyectos</label>
                                    <div class="input-group">
                                        <label class="input-group-btn">
                                            <span class="btn btn-primary btn-sm">Examinar&hellip;
                                                <input type="file" name="AdjuntoCdp" style="display: none;" id="fileAdjuntoExcel" accept=".xls*" />
                                            </span>
                                        </label>

                                        <input id="lblAdjuntoExcel" type="text" class="form-control input-sm" readonly />
                                    </div>
                                    <span class="help-block">Seleccionar un archivo

                                    </span>
                                </div>

                                <div id="pnlAdjuntarExcel" style="display: none;">
                                    <div class="col-md-12">
                                        <div class="form-group col-md-6">
                                            <table id="tblAdjuntoExcel" class="table table-bordered table-responsive small">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Id</th>
                                                        <th scope="col">Archivo Verificador</th>
                                                        <th scope="col">Tipo Verificador</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group" style="padding-top: 0.5%;">
                                        <br />
                                        <button id="btnProcesarExcelProyectoLicitacion" class="btn btn-info input-sm">
                                            <span class="glyphicon glyphicon-cloud-upload"></span>&nbsp;
                                            Procesar Archivo
                                        </button>
                                    </div>
                                </div>

                                <input type="hidden" id="CodLicitacionSeleccionado" value="0" />
                                
                                <div class="col-md-12" style="overflow-x: scroll; padding-top: 20px;" width="1000">
                                    <hr />
                                    <label class="subtitulo-form">Proyectos Licitacion</label>
                                    <table class="table table-bordered table-hover" id="ProyectosLicitacion">
                                        <thead class="titulo-tabla">
                                            <tr>
                                                <th>Cod. Proyecto Licitación</th>
                                                <th class="hidden">CodRegión</th>
                                                <th>Región</th>
                                                <th class="hidden">CodComuna</th>
                                                <th>Comuna</th>
                                                <th>Focalización</th>
                                                <th>Sexo Pobl.</th>
                                                <th>Nº Meses Convenio</th>
                                                <th class="hidden">CodModeloIntervencion</th>
                                                <th>Mod. Intervención</th>
                                                <th class="hidden">CodLineaAccion</th>
                                                <th>Línea de Acción</th>
                                                <th class="hidden">CodModalidadAtencion</th>
                                                <th>Modalidad de Atención</th>
                                                <th class="hidden">CodTipoAtencion</th>
                                                <th>Tipo de Atención</th>
                                                <%--<th class="">valorFactorVidaFamiliar</th>--%>
                                                <th>Factor Vida Familiar</th>
                                                <th>Cobertura (Nº de Plazas)</th>
                                                <th>Monto Periodo a Licitar</th>
                                                <%--<th class="hidden">valorProyectoAdosado</th--%>
                                                <%--<th>Proyecto Adosado?</th>--%>
                                                <%--<th class="hidden">CodModeloIntervencionAdosado</th>--%>
                                                <%--<th>Mod. Intervención Adosado</th>--%>
                                                <%--<th>Número Plazas Adosado</th>--%>
                                                <%--<th class="">EsProyectoContinuidad</th>--%>
                                                <th>Es Proyecto Continuidad?</th>
                                                <th>CodProyecto a Continuar</th>
                                                <th>Agregar Proyectos Adosados</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center">
                                        </tbody>
                                        <tfoot></tfoot>
                                    </table>
                                </div>


                                <div class="col-md-12" id="DatosAdosado">
                                    <br />
                                    <label class="subtitulo-form" id="lblTituloDatosProyectoAdosado">Datos de Proyecto Adosado</label>
                                    <div class="col-md-12">
                                        <%--<div class="col-md-3 text-center form-group">
                                            <label>Proyecto Adosado</label>
                                            <br />
                                            <input type="checkbox" class="checkbox" id="chkProyectoAdosado" name="chkProyectoAdosado">
                                        </div>--%>
                                        <div class="col-md-3 form-group">
                                            <label>Modelo de Intervención Adosado</label>

                                            <select class="modelo-intervencion-adosado form-control ddl" style="width: 100%;">
                                                <%--                    <option value="0">Seleccionar</option>--%>
                                            </select>
                                        </div>
                                        <div class="col-md-3 form-group">
                                            <label>Número Plazas Adosado</label>
                                            <span class="glyphicon glyphicon-currency"></span>
                                            <input type="text" class="nro-plazas-adosado form-control">
                                        </div>
                                        <div class="col-md-3 form-group">
                                            <label>Monto de Periodo Licitar Adosado</label>
                                            <span class="glyphicon glyphicon-currency"></span>
                                            <input type="text" class="monto-periodo-adosado form-control">
                                        </div>
                                        <div class="col-md-3">
                                            <br />
                                            <button class="btn btn-info" id="AgregarProyectoAdosado"><span class="glyphicon glyphicon-save-file"></span>&nbsp; Agregar Proyecto Adosado</button>
                                        </div>

                                    </div>



                                </div>

                                

                                <div class="col-md-12" style="overflow-x: scroll; padding-top: 20px;" width="1000">
                                    <hr />
                                    <label class="subtitulo-form">Proyectos Adosados Relacionados</label>
                                    <table class="table table-bordered table-hover" id="ProyectosAdosados">
                                        <thead class="titulo-tabla">
                                            <tr>
                                                <th>Cod. Adosado Proyecto Licitacion</th>
                                                <th>Cod. Licitacion Proyecto</th>
                                                <th>CodModeloIntervención</th>
                                                <th>Modelo Intervención</th>
                                                <th>Numero Plazas</th>
                                                <th>Monto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="col-md-12">
                                    <%--<div class="col-md-6 col-md-offset-8" style="padding-top: 2%;">--%>
                                    <div class="pull-right" style="padding-top: 2%;">
                                        <button class="btn btn-warning" id="btnLimpiar">Limpiar</button>
                                        <button class="btn btn-primary" id="btnGuardarProyectoLicitacion">Guardar Datos Proyecto Licitación</button>
                                    </div>
                                </div>

                                <p>&nbsp;</p>
                            </div>
                            <%-- Hector Gatica--%>
                            <div class="tab-pane fade" id="DatosResolucion">
                                <p>&nbsp;</p>


                                <div id="pnlEditaResolucionTxt" class="col-md-12">
                                    <div class="col-md-12 tab-aviso">
                                        <span class="form-group">Si deseas editar datos de una Resolución EXISTENTE, envía la solicitud vía SISTEMA DE TICKETS </span>
                                        <button id="btnEditaResolucionTxt" class="btn btn-success btn-sm" style="display: none;"><span class="glyphicon glyphicon-edit"></span>IR</button>

                                    </div>
                                </div>


                                <div class="col-md-12">
                                    <div id="pnlProyectoResolucion" class="col-md-12 form-group" style="display: none;">

                                        <div class="col-md-12">
                                            <div class="pull-right">
                                                <button class="btn btn-primary limpiar"><span class="glyphicon glyphicon-refresh"></span>Recargar Formulario</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <p>&nbsp;</p>

                                <div id="pnlDatoResolucion" style="display: block;">
                                    <div class="col-md-12">
                                        <div class="col-md-4 form-group">
                                            <label>Proyecto Licitacion (*)</label>
                                            <select id="select-listalicitacion" class="ddl form-control input-sm" style="width: 100%;" disabled></select>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-2 form-group">

                                            <label>Prefijo</label>
                                            <input id="tbxNemotecnicoRes" type="text" class="form-control  input-sm" disabled maxlength="100" />

                                        </div>
                                        <div class="col-md-10 form-group">

                                            <label>Nombre Proyecto (*)</label>
                                            <input id="tbxNombreProyectoRes" type="text" class="form-control  input-sm" disabled maxlength="100" />

                                        </div>

                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-6 form-group">

                                            <label>Institución</label>
                                            <select id="select-institucion" type="text" class="ddl form-control input-sm" style="width: 100%;" disabled></select>
                                        </div>
                                        <div class="col-md-6 form-group">

                                            <label>Dirección (*)</label>
                                            <input id="tbxDireccionProyectoRes" type="text" class="form-control input-sm" disabled />

                                        </div>
                                    </div>


                                    <div class="col-md-12">
                                        <div class="col-md-4 form-group">
                                            <label>Tipo Resolución (*)</label>
                                            <select id="select-listatiporesolucion" class="ddl form-control input-sm" style="width: 100%;" disabled></select>
                                        </div>

                                        <div class="col-md-4 form-group">
                                            <label>N° Resolución (*)</label>
                                            <input id="nro-resolucion" type="text" class="nro-resolucion form-control input-sm" disabled />
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label>Fecha Resolución (*)</label>
                                            <input id="fecha-resolucion" type="text" class="fecha-resolucion fecha form-control input-sm" disabled />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-4 form-group">
                                            <label>Fecha Convenio (*)</label>
                                            <input id="fecha-convenio-resol" type="text" class="fecha-convenio-resol fecha form-control input-sm" disabled />
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label>Fecha Inicio (*)</label>
                                            <input id="fecha-inicio-resol" type="text" class="fecha-inicio-resol fecha form-control input-sm" disabled />
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label>Fecha Termino (*)</label>
                                            <input id="fecha-termino-resol" type="text" class="fecha-termino-resol fecha-termino form-control input-sm" disabled />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div id="pnlTipoTermino" class="col-md-2 form-group" style="display: none;">
                                            <label>Tipo Termino (*)</label>
                                            <select id="select-tipotermino" class="ddl form-control input-sm" style="width: 100%;" disabled></select>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-6 form-group">
                                            <label>Resolución (*)</label>
                                            <div class="input-group">
                                                <label class="input-group-btn">
                                                    <span class="btn btn-primary btn-sm">Examinar&hellip;
                                                        <input type="file" name="AdjuntoResolucion" style="display: none;" id="fileAdjuntoResolucion" accept=".pdf" />
                                                    </span>

                                                </label>
                                                <input id="lblAdjuntoResolucion" type="text" class="form-control input-sm" readonly />


                                            </div>
                                            <span class="help-block">Seleccionar un archivo
                                            </span>

                                        </div>
                                        <div class="col-md-2 form-group">
                                            <label>Adjuntar</label>
                                            <div class="input-group">
                                                <button class="btn btn-primary btn-sm text-center" id="btnAdjuntoResolucion" disabled>Adjuntar <i class="fa fa-upload" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                        <div id="pnlPlazasUrgencia" class="col-md-2 form-group" style="display: none;">
                                            <label>N° Plazas</label>
                                            <input type="text" class="nro-plazas form-control input-sm" />
                                        </div>
                                    </div>


                                    <div id="pnlAdjuntarArchivoResolucion" style="display: none;">
                                        <div class="col-md-12">
                                            <div class="form-group col-md-6">
                                                <table id="tblAdjuntoResolucion" class="table table-bordered table-responsive small">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Id</th>
                                                            <th scope="col">Archivo Verificador</th>
                                                            <th scope="col">Tipo Verificador</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>


                                    <div class="col-md-12">
                                        <div class="pull-right">
                                            <button class="btn btn-primary limpiar"><span class="glyphicon glyphicon-refresh"></span>Limpiar</button>
                                            <button id="btnGuardaResolucion" class="btn btn-warning" disabled><span class="glyphicon glyphicon-save"></span>Guardar Datos Resolución</button>
                                        </div>
                                    </div>

                                    <p>&nbsp;</p>

                                </div>
                            </div>

                            <%-- /Hector Gatica--%>
                            <div class="tab-pane fade" id="DatosProyectoAdjudicado">
                                <p>&nbsp;</p>

                                <div id="pnlEditaAdjudicadoTxt" class="col-md-12">
                                    <div class="col-md-12 tab-aviso">
                                        <span class="form-group">Si deseas editar los datos de un Proyecto EXISTENTE, envía la solicitud vía SISTEMA DE TICKETS</span>
                                        <button id="btnEditaAdjudicadoTxt" class="btn btn-success btn-sm" style="display: none;"><span class="glyphicon glyphicon-edit"></span>IR</button>
                                    </div>
                                </div>



                                <div class="col-md-12">
                                    <div id="pnlProyectoAdjudicado" class="col-md-12 form-group" style="display: none;">

                                        <div class="col-md-12">
                                            <div class="pull-right">
                                                <button class="btn btn-primary limpiar"><span class="glyphicon glyphicon-refresh"></span>Recargar Formulario</button>
                                            </div>
                                        </div>
                                    </div>



                                </div>

                                <p>&nbsp;</p>
                                <div id="pnlDatoAdjudicado" style="display: block;">

                                    <div class="col-md-12">

                                        <div class="col-md-12 row">
                                            <div class="col-md-4 form-group">
                                                <label>Proyecto Licitacion (*)</label>
                                                <select id="select-listalicitacionAdjudicado" class="ddl form-control input-sm" style="width: 100%;" disabled></select>
                                            </div>
                                        </div>

                                        <div class="col-md-4 form-group">

                                            <label>Nombre Proyecto (*)</label>
                                            <input id="tbxNombreProyectoAdj" type="text" class="form-control  input-sm" disabled />

                                        </div>
                                        <div class="col-md-4 form-group">

                                            <label>Email Proyecto (*)</label>
                                            <input id="tbxMailProyectoAdj" type="text" class="form-control input-sm" disabled />
                                        </div>
                                        <div class="col-md-4">

                                            <label>Rut Institución (*)</label>
                                            <input id="tbxRutInstitucionAdj" type="text" class="form-control input-sm" placeholder="" maxlength="12" disabled />
                                        </div>

                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-4 form-group">

                                            <label>Fecha Inicio (*)</label>
                                            <input id="tbxFechaInicioProyectpAdj" type="text" class="fecha-inicio-proyecto fecha form-control input-sm" disabled />

                                        </div>
                                        <div class="col-md-4 form-group">

                                            <label>Fecha Termino (*)</label>
                                            <input id="tbxFechaTerminoProyectpAdj" type="text" class="fecha-termino-proyecto fecha-termino form-control input-sm" disabled />
                                        </div>

                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-4 form-group">

                                            <label>Telefono (*)</label>
                                            <input id="tbxTelefonoProyectpAdj" type="text" class="form-control input-sm" disabled />

                                        </div>
                                        <div class="col-md-4 form-group">

                                            <label>Nombre Director (*)</label>
                                            <input id="tbxNombreDirectorProyectpAdj" type="text" class="form-control input-sm" disabled />
                                        </div>
                                        <div class="col-md-4 form-group">

                                            <label>Rut Director (*)</label>
                                            <input id="tbxRutDirectorProyectoAdj" type="text" class="rut form-control input-sm" placeholder="" maxlength="12" disabled />


                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-6 form-group">

                                            <label>Banco (*)</label>
                                            <select id="select-bancoAdj" class="banco form-control input-sm" disabled>
                                                <option>Seleccionar</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6 form-group">

                                            <label>N° de Cuenta Corriente (*)</label>
                                            <input id="tbxCtaCteAdj" type="text" class="form-control input-sm" disabled />

                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-6 form-group">
                                            <label>Cuenta Corriente</label>
                                            <div class="input-group">
                                                <label class="input-group-btn">
                                                    <span class="btn btn-primary btn-sm">Examinar&hellip;
                                                        <input type="file" name="AdjuntoProyectoAdjudicado" style="display: none;" id="fileAdjuntoProyectoAdjudicado" accept=".pdf" />
                                                    </span>

                                                </label>
                                                <input id="lblAdjuntoProyectoAdjudicado" type="text" class="form-control input-sm" readonly />


                                            </div>
                                            <span class="help-block">Seleccionar un archivo
                                            </span>

                                        </div>
                                        <div class="col-md-2 form-group">
                                            <label>Adjuntar</label>
                                            <div class="input-group">
                                                <button class="btn btn-primary btn-sm text-center" id="btnAdjuntoProyectoAdjudicado">Adjuntar <i class="fa fa-upload" aria-hidden="true" disabled></i></button>
                                            </div>
                                        </div>

                                    </div>


                                    <div id="pnlAdjuntarArchivoProyectoAdjudicado" style="display: none;">
                                        <div class="col-md-12">
                                            <div class="form-group col-md-6">
                                                <table id="tblAdjuntoProyectoAdjudicado" class="table table-bordered table-responsive small">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Id</th>
                                                            <th scope="col">Archivo Verificador</th>
                                                            <th scope="col">Tipo Verificador</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>



                                    <div class="col-md-12">
                                        <div class="pull-right">
                                            <button class="btn btn-primary limpiar"><span class="glyphicon glyphicon-refresh"></span>Limpiar</button>
                                            <button id="btnGuardarDatosProyectoAdj" class="btn btn-warning" disabled><span class="glyphicon glyphicon-save"></span>Guardar Datos Proyecto</button>
                                        </div>
                                    </div>

                                    <p>&nbsp;</p>

                                </div>
                            </div>
                            <div class="tab-pane fade" id="GeneraCodigoProyecto">
                                <p>&nbsp;</p>

                                <div class="col-md-12">

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div id="msgDescargando" style="display: none;" class="alert alert-success text-center" role="alert"></div>
                                        </div>
                                    </div>

                                    <div class="col-md-12 row">
                                        <div class="col-md-4 form-group">
                                            <label>Proyecto Licitacion a Generar (*)</label>
                                            <select id="select-codigoGenerar" class="ddl form-control input-sm" style="width: 100%;" disabled></select>
                                        </div>
                                    </div>


                                    <div class="col-md-12 row">
                                        <div id="pnlInfoGeneraCodigo" style="display: none;">
                                            <div class="col-md-12 form-group">
                                                <div class="panel panel-warning">
                                                    <div class="panel-heading">
                                                        <h3 class="panel-title" id="titProyecto">Proyecto</h3>
                                                    </div>
                                                    <div class="panel-body">

                                                        <table id="tblInfoProyecto" class="" style="width: 100%">
                                                            <thead>
                                                                <tr>
                                                                    <th>Nombre Proyecto</th>
                                                                    <th>Email Proyecto</th>
                                                                    <th>Rut Institución</th>
                                                                    <th>Código Proyecto (*)</th>
                                                                    <th>Inicio</th>
                                                                    <th>Termino</th>
                                                                    <th>Proyecto Adosado</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <span id="lblNombreProyecto"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblEmailProyecto"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblRutInstitucion"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblCodigoProyecto"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblInicio"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblTermino"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblProyectoAdosado"></span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>


                                                    </div>
                                                </div>
                                            </div>


                                            <div class="col-md-12 form-group">
                                                <div class="panel panel-warning">
                                                    <div class="panel-heading">
                                                        <h3 class="panel-title" id="titProyectoInfo">Información Adicional</h3>
                                                    </div>
                                                    <div class="panel-body">

                                                        <table id="tblInfoAdicionalProyecto" class="" style="width: 100%">
                                                            <thead>
                                                                <tr>
                                                                    <th>Nombre Director</th>
                                                                    <th>Rut Director</th>
                                                                    <th>Teléfono</th>
                                                                    <th>Banco</th>
                                                                    <th>Cta. Corriente</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <span id="lblNombreDirector"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblRutDirector"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblTelefono"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblBanco"></span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="lblCtaCte"></span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>


                                                    </div>
                                                </div>

                                                <div class="col-md-12 row">
                                                    <span id="countdownCodProyecto" class="small"></span>
                                                    <button id="btnRenovarCodigo" class="btn btn-sm btn-success" style="display: none;">Renovar Código !</button>
                                                </div>

                                            </div>

                                            <div class="col-md-12">
                                                <div class="pull-right">
                                                    <button id="btnLimpiarRecargaCodigo" class="btn btn-primary limpiar"><span class="glyphicon glyphicon-refresh"></span>Limpiar</button>
                                                    <button id="btnImprimeCodigoGenerado" class="btn btn-success" disabled><span class="glyphicon glyphicon-print"></span>Imprimir Comprobante</button>
                                                    <button id="btnGenerarCodigo" class="btn btn-primary" disabled><span class="glyphicon glyphicon-save"></span>Generar Código Proyecto</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>

                                <p>&nbsp;</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <script>
        $(document).ready((e) => {
            Init();
        });

    </script>
</body>
</html>
