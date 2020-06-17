/******* Iniciar Select2 ******/
$.fn.select2.defaults.set("theme", "bootstrap");
$.fn.select2.defaults.set("containerCssClass", "input-sm");
$.fn.modal.Constructor.prototype.enforceFocus = function () { };
$.fn.select2.defaults.set("language",
    {
        errorLoading: function () {
            return "<span>Error en la carga</span>";
        },
        loadingMore: function () {
            return "Cargando más resultados...";
        },
        noResults: function () {
            return "No se encontraron resultados";
        },
        searching: function () {
            return "<span><i class='fa fa-spin fa-spinner'></i>Buscando...</span>";
        }
    });

$.fn.bootstrapSwitch.defaults.size = "small";
$.fn.bootstrapSwitch.defaults.onColor = "warning";
$.fn.bootstrapSwitch.defaults.offColor = "warning";
$.datepicker.setDefaults($.datepicker.regional["es"]);

//SET CURSOR POSITION
$.fn.setCursorPosition = function (pos) {
    this.each(function (index, elem) {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    });
    return this;
};

alertify.defaults.theme.ok = "btn btn-primary";
alertify.defaults.theme.cancel = "btn btn-danger";
alertify.defaults.theme.input = "form-control";
alertify.defaults.glossary.title = "SENAINFO";
alertify.defaults.glossary.ok = "ACEPTAR";
alertify.defaults.glossary.cancel = "CANCELAR";

// Validar que solamente se ingresen dígitos en el campo horas.
function isNumberKey(evt) {

    var charCode = (evt.which) ? evt.which : evt.keyCode;

    // Se permite el borrar, tecla DEL
    if (charCode === 127)
        return true;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

/******* Globales *******/

var tituloVentana = "SENAINFO";
var base = "RegistroTrabajador.aspx";
//var dataVigenciaTrabajador = [{ id: "V", text: "VIGENTE" }, { id: "C", text: "CADUCADO" }];
var dataVigenciaUsuario = [{ id: "V", text: "VIGENTE" }, { id: "C", text: "CADUCADO" }, { id: "P", text: "PENDIENTE" }];

// Data Para Filtros
var dataVigenciaFiltroTrabajador = [
    { id: "T", text: "TODOS" }, { id: "V", text: "VIGENTE" }, { id: "C", text: "CADUCADO" }
];
var dataVigenciaFiltroUsuario = [
    { id: "T", text: "TODOS" }, { id: "V", text: "VIGENTE" }, { id: "C", text: "CADUCADO" },
    { id: "P", text: "PENDIENTE" }
];
var dataVigenciaFiltroRelacionPy = [
    { id: "T", text: "TODOS" }, { id: "V", text: "VIGENTE" }, { id: "C", text: "CADUCADO" }
];
var dataFiltroEstadoRegistro = [
    { id: "T", text: "TODOS" }, { id: "C", text: "COMPLETO" }, { id: "I", text: "INCOMPLETO" }
];

var dataSexo = [{ id: "H", text: "HOMBRE" }, { id: "M", text: "MUJER" }];
var dataRoles = new Object();
var rutValido = false;

var hdCodDireccionRegional = null;
var filtroDireccionRegional = null;
var hdCodRegion = -1;
var hdCodProyecto = -1;
var hdCodInstitucion = -1;
var hdRolUsuario = "";
var hdICodTrabajador = null;

/** Trabajador **/
var hdCodDireccionTrabajador = 0; // Sin Informacion
var hdRolPrincipalTrabajador = -1; // Sin Informacion
var hdVigenciaUsuario = "";
var hdUltimoEgreso = null;
var tipoOperacion = "new";
var tipoBotonGrid = "editar";


var tipoTrabajador = "P"; // P => Proyecto , S => Senainfo
var tipoAsociacion = "P";

var evtSpace = jQuery.Event("keydown");
evtSpace.which = 32;


OnInit = () => {
    $(".institucion").select2();
    $(".proyecto").select2();
    $(".direccion").select2();
    $(".direccionfiltro").select2();

    IniciarSpinner();
    IniciarGridListarTrabajadores();
    //IniciarCheckboxes(); -> Se reemplaza por la línea de abajo para inicializar el valor.
    $("#rdCredencialNo").prop("checked", true);
    $("#rdCredencialSi").prop("disabled", false);
    $("#rdCredencialNo").prop("disabled", false);

    IniciarCheckeoUsuarioMail();
    //IniciarEventosCheckboxCredencial();


    hdCodDireccionRegional = $("input[id$=hdfCodDireccionRegional]").val();
    hdCodRegion = $("input[id$=hdfCodRegion]").val();
    hdCodProyecto = $("input[id$=hdfCodProyecto]").val();
    hdCodInstitucion = $("input[id$=hdfCodInstitucion]").val();
    hdRolUsuario = $("input[id$=hdfRolUsuario]").val();
    hdICodTrabajador = $("input[id$=ServerICodTrabajador]").val();

    $(".urlbase").text($(".urlbase").text() + " (" + toTitleCase(hdRolUsuario.toLowerCase().replace("_", " ")) + ")");

    ListarEstamentos();

    if (hdRolUsuario === "ADMINISTRADOR_PROYECTO") {

        IniciarSimpleSelect($(".sexo"), dataSexo, "Selecciona Sexo", true);
        //IniciarSimpleSelect($(".vigenciatrabajador"), dataVigenciaTrabajador, "Selecciona Vigencia", false);
        IniciarSimpleSelect($(".vigenciausuario"), dataVigenciaUsuario, "Selecciona Vigencia", false);
        //IniciarFiltros();

        ListarRegion();

        //$(".vigenciatrabajador").prop("disabled", true);
        $(".vigenciausuario").prop("disabled", true);


        ListarProfesionOficio();
        ListarCargo();
        ListarInstitucion(hdCodInstitucion, hdCodDireccionRegional, "V");
        ListarRolPrincipal();

        AgregaValidacionRutInput($(".rut"));

        $(".rut").on("blur", function () {
            //$("#frmNuevoTrabajadorSenainfo").removeData("validator");

            var rutLimpio = $(".rut").val().replace(/ /g, '');
            $(".rut").val(rutLimpio);
            //$(this).trigger("blur");

            if (rutValido) {
                var rut = $(".rut").val();
                if (tipoAsociacion === "P") {
                    BindTrabajadorPorRut(rut);
                }
            }
            //else {
            //    //document.getElementById("wgridVerTrabajadores").style.display = "none";
            //}

        });

        $(".rut").on("paste",
            function() {
            }).trigger("blur");

        $(".rut").keypress(function (t) {
            if (t.charCode === 32)
                return false;
        });

        $(".telefono").inputmask({ "mask": "9[9]-9999999[9]" }); //specifying options

        $(".telefono").focus(function (e) {
            $(".telefono").setCursorPosition(1);
        });

        $(".telefono").keyup(function (e) {
            var x = $(this).val();

            if ($(this).val().charAt(0) === "2" && e.keyCode === 57 && x.match(/\d/g).length === 1) {

                $(this).val(x.substring(0, 1) + " ");
                $(".telefono").trigger(evtSpace);
            }

            if (($(this).val().charAt(0) === "9" && e.keyCode === 57 && x.match(/\d/g).length === 1) ||
                ($(this).val().charAt(0) === "2" && e.keyCode === 50 && x.match(/\d/g).length === 1)) {

                $(this).val(x.substring(0, 1) + " ");
                $(".telefono").trigger(evtSpace);
            }
        });

        eventosClick();
        //EvtInicial();

        //EvtRegistroTrabajadorSenainfo();


    } else {
        alertify.confirm(tituloVentana,
            "Este formulario solo puede ser usado por el Administrador de Proyecto. Para uso de UPLAE o Administrador de Sistema, presione ACEPTAR.",
            function () {
                window.location.replace("reg_trabajadores.aspx");
            },
            function () {
                window.location.replace("https://www.senainfo.cl");
            });
    }

    //$("[name='chkCredencial']").bootstrapSwitch("state", true);


}


eventosClick = () => {
    // Evento Agregar Registro Trabajador
    if (tipoTrabajador === "S")
        ValidafrmNuevoTrabajadorSenainfo($("#frmNuevoTrabajadorSenainfo"));
    else if (tipoTrabajador === "P") {
        ValidafrmNuevoTrabajadorProyecto($("#frmNuevoTrabajadorSenainfo"));
    }

    $("#btnGuardarTrabajador").click(function (e) {
        e.preventDefault();

        var form = $("#frmNuevoTrabajadorSenainfo");

        switch (tipoTrabajador) {
            case "S":

                //TODO CrearTrabajador Login
                if (!$(".proyecto").val()) {
                    RequerirProyecto(false);
                    RequerirHoras(false);
                    RequerirCargo(false);
                }

                form.validate();

                if (form.valid()) {

                    if (parseInt($("#hdfICodTrabajador").val())) { // Tiene Valor , Por lo tanto , seguro autocomplete desde un RUT

                        document.getElementById("btnGuardarTrabajador").style.display = "none";
                        document.getElementById("btnModificarTrabajador").style.display = "inline";
                        HabilitarBotonesMail(false);
                        ModificarBackground();

                    } else { // Trabajador  Nuevo
                        HabilitaGuardar(false);
                        var trabajadorSenainfo = BindingTrabajador("nuevo");
                        CrearTrabajadorLogin(trabajadorSenainfo);
                    }


                } else {
                    HabilitaGuardar(true);
                }

                break;
            case "P":
                //TODO CrearTrabajador Asociado al Proyecto

                form.validate();

                if (form.valid()) {

                    if (parseInt($("#hdfICodTrabajador").val())
                    ) { // Tiene Valor , Por lo tanto , seguro autocomplete desde un RUT

                        document.getElementById("btnGuardarTrabajador").style.display = "none";
                        document.getElementById("btnModificarTrabajador").style.display = "inline";
                        HabilitarBotonesMail(false);
                        ModificarBackground();

                    } else { // Trabajador  Nuevo

                        HabilitaGuardar(false);
                        var trabajadorProyecto = BindingTrabajador("nuevo");
                        CrearTrabajadorNoLogin(trabajadorProyecto);

                    }

                } else {
                    HabilitaGuardar(true);
                }
                break;
            default:
                break;
        }

    });

    $("#btnLimpiarTrabajador").click(function (e) {

        e.preventDefault();

        switch (tipoTrabajador) {
            case "S":
                //TODO Limpiar Trabajador Login
                LimpiarForm("S");
                break;
            case "P":
                //TODO Limpiar Trabajador Asociado al Proyecto
                LimpiarForm("P");
                HabilitaGuardar(true);
                break;
            default:
                break;
        }

    });

    //$("#btnRestaurarTrabajador").click(function (e) {
    //    e.preventDefault();

    //    $("#btnRestaurarTrabajador").prop("disabled", true);
    //    var parametros = BindingTrabajador("restaurar");

    //    RestaurarTrabajador(parametros);

    //});

    $("#btnEgresarTrabajador").click(function (e) {

        e.preventDefault();

        var form = $("#frmEliminarTrabajador");

        if (form.valid()) {
            $("#btnEgresarTrabajador").prop("disabled", true);
            var paramDel = BindingTrabajador("egresar");
            EgresarTrabajador(paramDel);

            LimpiarForm(tipoTrabajador);
        }


        //ListarTrabajador($("#gridVerTrabajadores").DataTable(), null, null, $(this).val(), $(".institucion").select2("data")[0].id, hdCodDireccionRegional, "V", "P");
        //IniciarGridListarTrabajadores();
        //$("#btnLimpiarTrabajador").click();


    });

    $("#btnModificarTrabajador").click(function (e) {

        e.preventDefault();

        ModificarBackground();
    });

    $("#btnReenviarCorreo").click(function (e) {
        e.preventDefault();

        alertify.confirm(tituloVentana,
            "¿Deseas reenviar la solicitud de cambio de password?",
            function () {

                if (tipoTrabajador === "S") {
                    $("#btnReenviarCorreo").prop("disabled", true);
                    ReenvioMail(parseInt($("#hdfICodTrabajador").val()));
                } else
                    $("#btnReenviarCorreo").prop("disabled", true);

            },
            function () {
            });

    });

    $("#btnCancelarCorreo").click(function (e) {
        e.preventDefault();

        alertify.confirm(tituloVentana,
            "¿Deseas cancelar la solicitud de cambio de password?",
            function () {
                CancelarSolicitudMail($("#hdfICodTrabajador").val());
                HabilitarBotonesMail(false);
            },
            function () {
            });
    });

    $("#btnCambiarPassword").click(function (e) {
        e.preventDefault();

        alertify.confirm(tituloVentana,
            "Se generará un mail para cambio de password. ¿Confirmar?",
            function () {
                GeneraCambioPassword($("#hdfICodTrabajador").val());
            },
            function () {
            });
    });

    $("#btnActivarCaducada").click(function (e) {
        e.preventDefault();

        //$(".vigenciatrabajador").val("V").trigger("change.select2");
        $(".vigenciausuario").val("V").trigger("change.select2");

        ModificarBackground();

        //HabilitaBtnActivar(false);  comentado por MAGA el  14-10-2019
    });

    $("#btnNuevoTrabajador").click(function (e) {
        e.preventDefault();

        LimpiarForm("S");

        $("#textoNuevoModificar").text("Ingresar");

        CerrarListaBackground();
        AbrirRegistroBackground();
    });

    $("#btnCancelarTrabajador").click(function (e) {
        e.preventDefault();

        LimpiarForm("S");
        CerrarListaBackground();
        AbrirRegistroBackground();
    });
   
}

function EvtInicial() {

    ValidafrmEliminarTrabajador($("#frmEliminarTrabajador"));

    // Validaciones Form Nuevo Trabajador Senainfo

    if (tipoTrabajador === "S")
        ValidafrmNuevoTrabajadorSenainfo($("#frmNuevoTrabajadorSenainfo"));
    else if (tipoTrabajador === "P") {
        ValidafrmNuevoTrabajadorProyecto($("#frmNuevoTrabajadorSenainfo"));
    }

    // Evento Agregar Registro Trabajador
    $("#btnGuardarTrabajador").click(function (e) {

        e.preventDefault();
        switch (tipoTrabajador) {
            case "S":
                var form = $("#frmNuevoTrabajadorSenainfo");
                ValidafrmNuevoTrabajadorSenainfo(form);
                //TODO CrearTrabajador Login

                if (!$(".proyecto").val()) {
                    RequerirProyecto(false);
                    RequerirHoras(false);
                    RequerirCargo(false);
                }



                form.validate();

                if (form.valid()) {

                    if (parseInt($("#hdfICodTrabajador").val())) { // Tiene Valor , Por lo tanto , seguro autocomplete desde un RUT

                        document.getElementById("btnGuardarTrabajador").style.display = "none";
                        document.getElementById("btnModificarTrabajador").style.display = "inline";
                        HabilitarBotonesMail(false);
                        ModificarBackground();

                    } else { // Trabajador  Nuevo
                        HabilitaGuardar(false);
                        var trabajadorSenainfo = BindingTrabajador("nuevo");
                        CrearTrabajadorLogin(trabajadorSenainfo);
                    }


                } else {
                    HabilitaGuardar(true);
                }

                break;
            case "P":
                //TODO CrearTrabajador Asociado al Proyecto

                var form = $("#frmNuevoTrabajadorSenainfo");
                ValidafrmNuevoTrabajadorProyecto(form);
                form.validate();
                if (form.valid()) {

                    if (parseInt($("#hdfICodTrabajador").val())
                    ) { // Tiene Valor , Por lo tanto , seguro autocomplete desde un RUT

                        document.getElementById("btnGuardarTrabajador").style.display = "none";
                        document.getElementById("btnModificarTrabajador").style.display = "inline";
                        HabilitarBotonesMail(false);
                        ModificarBackground();

                    } else { // Trabajador  Nuevo

                        HabilitaGuardar(false);
                        var trabajadorProyecto = BindingTrabajador("nuevo");
                        CrearTrabajadorNoLogin(trabajadorProyecto);

                    }

                } else {
                    HabilitaGuardar(true);
                }
                break;
            default:
                break;
        }

        //IniciarGridListarTrabajadores();
        //ListarTrabajador($("#gridVerTrabajadores").DataTable(), null, null, $(this).val(), $(".institucion").select2("data")[0].id, hdCodDireccionRegional, "V", "P");
        //$("#btnLimpiarTrabajador").click();

    });

    $("#btnLimpiarTrabajador").click(function (e) {

        e.preventDefault();

        switch (tipoTrabajador) {
            case "S":
                //TODO Limpiar Trabajador Login
                LimpiarForm("S");
                break;
            case "P":
                //TODO Limpiar Trabajador Asociado al Proyecto
                LimpiarForm("P");
                HabilitaGuardar(true);
                break;
            default:
                break;
        }

    });

    //$("#btnRestaurarTrabajador").click(function (e) {
    //    e.preventDefault();

    //    $("#btnRestaurarTrabajador").prop("disabled", true);
    //    var parametros = BindingTrabajador("restaurar");

    //    RestaurarTrabajador(parametros);

    //});

    $("#btnEgresarTrabajador").click(function (e) {

        e.preventDefault();

        var form = $("#frmEliminarTrabajador");

        if (form.valid()) {
            $("#btnEgresarTrabajador").prop("disabled", true);
            var paramDel = BindingTrabajador("egresar");
            EgresarTrabajador(paramDel);

            LimpiarForm(tipoTrabajador);
        }


        //ListarTrabajador($("#gridVerTrabajadores").DataTable(), null, null, $(this).val(), $(".institucion").select2("data")[0].id, hdCodDireccionRegional, "V", "P");
        //IniciarGridListarTrabajadores();
        //$("#btnLimpiarTrabajador").click();


    });

    $("#btnModificarTrabajador").click(function (e) {

        e.preventDefault();

        ModificarBackground();
    });

    $("#btnReenviarCorreo").click(function (e) {
        e.preventDefault();

        alertify.confirm(tituloVentana,
            "¿Desea reenviar la solicitud de cambio de password?",
            function () {

                if (tipoTrabajador === "S") {
                    $("#btnReenviarCorreo").prop("disabled", true);
                    ReenvioMail(parseInt($("#hdfICodTrabajador").val()));
                } else
                    $("#btnReenviarCorreo").prop("disabled", true);

            },
            function () {
            });

    });

    $("#btnCancelarCorreo").click(function (e) {
        e.preventDefault();

        alertify.confirm(tituloVentana,
            "¿Desea cancelar la solicitud de cambio de password?",
            function () {
                CancelarSolicitudMail($("#hdfICodTrabajador").val());
                HabilitarBotonesMail(false);
            },
            function () {
            });
    });

    $("#btnCambiarPassword").click(function (e) {
        e.preventDefault();

        alertify.confirm(tituloVentana,
            "Se generará un mail para cambio de password. ¿Confirmar?",
            function () {
                GeneraCambioPassword($("#hdfICodTrabajador").val());
            },
            function () {
            });
    });

    $("#btnActivarCaducada").click(function (e) {
        e.preventDefault();

        //$(".vigenciatrabajador").val("V").trigger("change.select2");
        $(".vigenciausuario").val("V").trigger("change.select2");

        HabilitaBtnActivar(false);
        ModificarBackground();
    });

    HabilitarFechaIngreso(false);


}

function HabilitarAccionesDireccion(opcion) {
    if (opcion) {
        document.getElementById("wDireccionRegional").style.display = "block";
    } else {
        document.getElementById("wDireccionRegional").style.display = "none";
    }
}

function EvtRegistroTrabajadorSenainfo() {
    AgregaValidacionRutInput($(".rut"));

    $(".rut").change(function () {
        var rutLimpio = $(".rut").val().replace(/ /g, '');
        $(".rut").val(rutLimpio);

        $(this).trigger("blur");

        if (rutValido) {
            var rut = $(".rut").val();

            if (tipoAsociacion === "P") {
                BindTrabajadorPorRut(rut);
            }

        } else {
            document.getElementById("wgridVerTrabajadores").style.display = "none";
        }

    });

    $(".rut").keypress(function (t) {
        if (t.charCode === 32)
            return false;
    });


    // Validacion Telefono
    $(".telefono").inputmask({ "mask": "9[9]-9999999[9]" }); //specifying options

    $(".telefono").focus(function (e) {
        $(".telefono").setCursorPosition(1);
    });

    $(".telefono").keyup(function (e) {

        var x = $(this).val();

        if ($(this).val().charAt(0) === "2" && e.keyCode === 57 && x.match(/\d/g).length === 1) {

            $(this).val(x.substring(0, 1) + " ");
            $(".telefono").trigger(evtSpace);
        }

        if (($(this).val().charAt(0) === "9" && e.keyCode === 57 && x.match(/\d/g).length === 1) ||
            ($(this).val().charAt(0) === "2" && e.keyCode === 50 && x.match(/\d/g).length === 1)) {

            $(this).val(x.substring(0, 1) + " ");
            $(".telefono").trigger(evtSpace);
        }


    });

}

function IniciarDatePicker(control, fechaCreacion, fechaHoy) {

    control.datepicker("destroy");
    control.datepicker({
        minDate: fechaCreacion,
        maxDate: fechaHoy,
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        onSelect: function (dateText, inst) {
            $("#fgFechaIngreso").removeClass("has-error");
            $("#fgFechaIngreso em").css("display", "none");
        }
    });
}

function IniciarGridListarTrabajadores() {


    var table = $("#gridVerTrabajadores").DataTable(
        {
            "pageLength": 10,
            "autoWidth": false,
            "paging": true,
            "lengthChange": false,
            "pagingType": "numbers",
            "ordering": false,
            "info": false,
            "cache": false,
            "searching": true,
            "destroy": true,
            "language": {
                "search": "Buscar",
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se han encontrado resultados",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No se han encontrado resultados"
            },
            "dom": "Bfrtip",
            buttons: [
                {
                    extend: "excelHtml5",
                    dom: "<'floatRight'B><'clear'>frtip",
                    text: "<i class='fa fa-file-excel-o'></i> Exportar Excel",
                    exportOptions: {
                        columns: ":visible"
                    }
                }
            ],
            "createdRow": function (row, data, index) {
                //$("td", row).eq(3).html(data[3].substring(0, 60) + "...");
            },
            "footerCallback": function (tfoot, data, start, end, display) {
            },
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [3],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [4],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [5],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [6],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [12],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [16],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [-2],
                    render: function (data, type, row) {
                        return "<button class='editar-trabajador' title='Editar Trabajador'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button>";
                    }
                },
                {
                    "targets": [-1],
                    render: function (data, type, row) {
                        return "<button class='egresar-trabajador' title='Egresar Trabajador'><i class='fa fa-user-times' aria-hidden='true'></i></button>";
                    }
                }
                //},
                //{
                //    "targets": [-3],
                //    render: function (data, type, row) {
                //        return "<button class='restaurar-trabajador' title='Restaurar Trabajador'><i class='fa fa-universal-access' aria-hidden='true'></i></button>";
                //    }
                //}
            ]
        });


    /* Restaurar Trabajador
    //$("#gridVerTrabajadores tbody").on("click",
    //    ".restaurar-trabajador",
    //    function (evt) {
    //        tipoBotonGrid = "restaurar";
    //        var data = table.row($(this).parents("tr")).data();

    //        var icodTrabajador = parseInt(data[0]);
    //        var rutTrabajador = data[2].toString();
    //        var codInstitucion = data[4] ? parseInt(data[4]) : null;
    //        var codProyecto = data[6] ? parseInt(data[6]) : null;
    //        var realizaLogin = data[8].toString();
    //        var idTrabajadorProyecto = data[16] ? parseInt(data[16]) : null;

    //        var vigUsuario = data[10];
    //        var vigTrabajador = data[9];
    //        var vigRelacion = data[11] ? data[11].toString() : null;


    //        if (vigUsuario === "C" && vigTrabajador === "C" && vigRelacion === "C") {
    //            evt.preventDefault();

    //            $("#modalRestaurarTrabajador").modal("show");

    //            $("#modalRestaurarTrabajador").attr("data-icodtrabajador", icodTrabajador);
    //            $("#modalRestaurarTrabajador").attr("data-codproyecto", codProyecto);
    //            $("#modalRestaurarTrabajador").attr("data-codInstitucion", codInstitucion);
    //            $("#modalRestaurarTrabajador").attr("data-ruttrabajador", rutTrabajador);
    //            $("#modalRestaurarTrabajador").attr("data-realizalogin", realizaLogin);
    //            $("#modalRestaurarTrabajador").attr("data-idtrabajadorproyecto", idTrabajadorProyecto);
    //        } else {
    //            evt.preventDefault();
    //            alertify.set("notifier", "position", "top-center");
    //            alertify.error("El Trabajador no se puede restaurar, deben estar caducado, también sus credenciales y su relación al proyecto");

    //            $(this).prop("disabled", true);
    //        }
    //    });
    */

    // Editar Trabajador
    $("#gridVerTrabajadores tbody").on("click",
        ".editar-trabajador",
        function (evt) {
            //Deshabilito Opciones
            evt.preventDefault();
            var nuevoProyecto = false;

            // Se coloca en blanco el campo oculto del correo
            $("#hdfEmailUsuario").val(""); 

            $("#textoNuevoModificar").text("Modificar");

            var data = table.row($(this).parents("tr")).data();

            //var vigenciaTrabajador = data[9].toString();
            var vigenciaUsuario = data[10].toString();
            //var vigenciaTrabajadorProyecto = data[11].toString();

            //Obtengo las vigencias para mostrar opciones según corresponda

            if (vigenciaUsuario === "P") {
                HabilitaBtnReenviarMail(true);
                HabilitaBtnActivar(true);
            }

            if (vigenciaUsuario === "C") {
                HabilitaBtnActivar(true);
                HabilitaBtnCambiarPassword(true);
            }


            //Obtengo Tipo de trabajador

            if (data[8] === "No") {
                tipoTrabajador = "P";
                $("#hdfRealizaLogin").val(false);
            } else {
                tipoTrabajador = "S";
                $("#hdfRealizaLogin").val(true);
            }

            if (data[15] === '') {
                $("#hdfFechaEgresoCaducar").val('');
            } else {
                $("#hdfFechaEgresoCaducar").val(data[15].toString());
            }

            //Obtengo el rol principal del trabajador seleccionado
            var rolPrincipalTrabajador = data[12] ? data[12].toString() : null;

            //Consultamos si puede editar el rol del trabajador seleccionado
            if (puedeEditarRol(parseInt(rolPrincipalTrabajador))) {
                $(".email").off();

                tipoBotonGrid = "editar";
                tipoOperacion = "edit";

                var icodTrabajador = parseInt(data[0]);
                var rutTrabajador = data[2].toString();

                var codProyecto = data[6] ? parseInt(data[6]) : null;
                hdVigenciaUsuario = data[10] ? data[10].toString() : null;
                var estadoRegistro = data[13] ? data[13].toString() : "";

                // Vigencias
                //var vigTrabajador = data[9] ? data[9].toString() : null;
                //var vigUsuario = data[10] ? data[10].toString() : null;
                var vigRelacion = data[11] ? data[11].toString() : null;

                //if (vigUsuario === "C") {
                //    alertify.set("notifier", "position", "top-center");
                //    alertify.error("El trabajador está CADUCADO del Proyecto. Debes efectuar un nuevo ingreso");
                //    return;
                //}

                if (vigRelacion === "C") {
                    //alertify.set("notifier", "position", "top-center");
                    //alertify.error("El trabajador está EGRESADO del Proyecto. Debes efectuar un nuevo ingreso");
                    HabilitaModificar(false);
                    HabilitaGuardar(false);
                } else {
                    HabilitaModificar(true);
                }

                //else {

                //Dependiendo del tipo de trabajador, se movera a si/no el switch que indica que posee usuario senainfo
                if (tipoTrabajador === "S") {
                    //$("[name='chkCredencial']").bootstrapSwitch("state", true);
                    $("#rdCredencialSi").prop("checked", true);
                    $("#rdCredencialSi").prop("disabled", true);
                    $("#rdCredencialNo").prop("disabled", true);
                    BackgroundCredencial(true);
                } else {
                    //$("[name='chkCredencial']").bootstrapSwitch("state", false);
                    $("#rdCredencialNo").prop("checked", true);
                    $("#rdCredencialSi").prop("disabled", false);
                    $("#rdCredencialNo").prop("disabled", false);
                    BackgroundCredencial(false);

                    // 28-10-2019 - Se agrega la validación del correo al momento de cambiar el mismo.
                    IniciarCheckeoUsuarioMail();
                }

                ModificarTrabajadorBinding(icodTrabajador,
                    rutTrabajador,
                    codProyecto,
                    nuevoProyecto,
                    estadoRegistro);

                $("#hdfVigenciaProyecto").val(data[11] ? data[11].toString() : "");

                AbrirRegistroBackground();
                CerrarListaBackground();

            } else {
                alertify.alert("SENAINFO",
                    "No tienes acceso para editar este tipo de Rol de Usuario",
                    function () {
                    });
            }
        });

    // Eliminar / Egresar Trabajador
    $("#gridVerTrabajadores tbody").on("click",
        ".egresar-trabajador",
        function (evt) {
            tipoBotonGrid = "egresar";
            var data = table.row($(this).parents("tr")).data();
            if (data[15] == "") {
                var icodTrabajador = parseInt(data[0]);
                var rutTrabajador = data[2].toString();
                var codInstitucion = data[4] ? parseInt(data[4]) : null;
                var codProyecto = data[6] ? parseInt(data[6]) : null;
                var realizaLogin = data[8].toString();
                var idTrabajadorProyecto = data[16] ? parseInt(data[16]) : null;
                //Obtengo el rol principal del trabajador seleccionado
                var rolPrincipalTrabajador = data[12] ? data[12].toString() : null;

                // Validar que se intente egresar al mismo trabajador que está logueado en el sistema.
                if (icodTrabajador == $("#ServerICodTrabajador").val()) {
                    evt.preventDefault();
                    alertify.set("notifier", "position", "top-center");
                    alertify.error("No se permite EGRESAR al trabajador que se encuentra logueado.");

                    $(this).prop("disabled", true);
                    return;
                }

                //Consultamos si puede editar el rol del trabajador seleccionado
                if (!puedeEditarRol(parseInt(rolPrincipalTrabajador))) {
                    evt.preventDefault();
                    alertify.set("notifier", "position", "top-center");
                    alertify.error("No tienes acceso para egresar este tipo de Rol de Usuario.");

                    $(this).prop("disabled", true);
                    return;
                }

                if (codProyecto != null) {
                    evt.preventDefault();

                    $("#mdlEgresarTrabajador").modal("show");
                    $("#mdlEgresarTrabajador").attr("data-icodtrabajador", icodTrabajador);
                    $("#mdlEgresarTrabajador").attr("data-codproyecto", codProyecto);
                    $("#mdlEgresarTrabajador").attr("data-codInstitucion", codInstitucion);
                    $("#mdlEgresarTrabajador").attr("data-ruttrabajador", rutTrabajador);
                    $("#mdlEgresarTrabajador").attr("data-realizalogin", realizaLogin);
                    $("#mdlEgresarTrabajador").attr("data-idtrabajadorproyecto", idTrabajadorProyecto);

                    ListarCausalEgreso();

                } else {
                    evt.preventDefault();
                    alertify.set("notifier", "position", "top-center");
                    alertify.error("El trabajador no tiene Proyecto para EGRESAR.");

                    $(this).prop("disabled", true);
                }
            } else {
                evt.preventDefault();
                alertify.set("notifier", "position", "top-center");
                alertify.error("El Trabajador ya ha sido egresado anteriormente.");

                $(this).prop("disabled", true);
            }

        });

}

function IniciarSpinner() {
    var $loading = $("#spinner").hide();

    $(document)
        .ajaxStart(function () {
            $loading.show();
        })
        .ajaxStop(function () {
            $loading.hide();
        });
}

function IniciarSimpleSelect(control, data, placeHolder, limpiar) {
    control.select2({
        placeholder: placeHolder,
        data: data,
        minimumResultsForSearch: 10,
        //allowClear: true
    });

    if (limpiar) {
        control.val(null).trigger("change");
    }
}

function IniciarSimpleSelectGrid(control, data, placeHolder, limpiar) {
    var grid = $("#gridVerTrabajadores").DataTable();

    control.select2({
        placeholder: placeHolder,
        data: data,
        minimumResultsForSearch: 10,
        allowClear: true
    });

    if (limpiar) {
        control.val(null).trigger("change");
    }
}

function IniciarCheckeoUsuarioMail() {

    $(".email").on("change",
        function () {
            if (($(".email").val() !== "") && ($("#rdCredencialSi").prop("checked") === true)) {

                ExisteUsuarioMail($(".email").val());
               // ($(".email").val());

            } else {
                $(".email").attr("disabled", false);
            }

        });

}

function BackgroundCredencial(opcion) {
    if (opcion) {
        ValidafrmNuevoTrabajadorSenainfo($("#frmNuevoTrabajadorSenainfo"));
        RequerirEmail(true);
        RequerirRolPrincipal(true);
        RequerirProyecto(false);
        RequerirCargo(false);
        RequerirHoras(false);
        tipoTrabajador = "S";

        $("#rdCredencialSi").prop("checked", true);

        document.getElementById("wrapperCredencial").style.display = "block";
        $(".vigenciausuario").val("V").trigger("change");
        //$(".vigenciatrabajador").val("V").trigger("change");

    } else {
        ValidafrmNuevoTrabajadorProyecto($("#frmNuevoTrabajadorSenainfo"));
        RequerirEmail(false);
        RequerirRolPrincipal(false);
        RequerirProyecto(true);
        RequerirCargo(true);
        RequerirHoras(true);
        tipoTrabajador = "P";

        $("#rdCredencialNo").prop("checked", true);

        document.getElementById("wrapperCredencial").style.display = "none";
       //$(".vigenciatrabajador").val("V").trigger("change");
    }

}


function AsignarCredencial(opcion) {

    BackgroundCredencial(opcion);

    if (opcion) {

        // Para que cuando se cambié a sí y existe el correo del usuario entonces asignarlo
        if ($(".email").val() !== "" || $(".email").val() !== " ") {
            $("#hdfEmailUsuario").val($(".email").val());
            $("#hdfRealizaLogin").val(true);

            ExisteUsuarioMail($(".email").val());

            //if ($(".email").val() !== "" || $(".email").val() !== " ") {
            //    IniciarCheckeoUsuarioMail();
            //}
            //else {
            //    ExisteUsuarioMail($(".email").val());
            //}
        }
    } else {
        
        // Se vuelve a poner el correo del usuario
        if ($("#hdfEmailUsuario").val() !== "" || $("#hdfEmailUsuario").val() !== " ") {
            $(".email").val($("#hdfEmailUsuario").val());
            $("#hdfEmailUsuario").val("");
            $("#hdfRealizaLogin").val(false);
        }
    }
}

//function IniciarFiltros() {

//    var table = $("#gridVerTrabajadores").DataTable();

//    IniciarSimpleSelectGrid($(".flt-vigenciarelacionpy"), dataVigenciaFiltroRelacionPy, "Selecciona Vigencia", true);
//    IniciarSimpleSelectGrid($(".flt-vigenciausuario"), dataVigenciaFiltroUsuario, "Selecciona Vigencia", true);
//    IniciarSimpleSelectGrid($(".flt-vigenciatrabajador"), dataVigenciaFiltroTrabajador, "Selecciona Vigencia", true);
//    IniciarSimpleSelectGrid($(".flt-estadoregistro"), dataFiltroEstadoRegistro, "Selecciona Vigencia", true);

//    $(".flt-estadoregistro").on("change",
//        function () {

//            switch ($(this).val()) {
//                case "T":
//                    table.columns(13).search("").draw();
//                    break;
//                case "I":
//                    table.columns(13).search("^INCOMPLETO$", true, false).draw();
//                    break;
//                case "C":
//                    table.columns(13).search("^COMPLETO$", true, false).draw();
//                    break;
//                default:
//                    table.columns(13).search("").draw();
//                    break;

//            }


//        }
//    );

//    $(".flt-vigenciarelacionpy").on("change",
//        function () {

//            if ($(this).val()) {
//                if ($(this).val() === "T") {
//                    table.columns(11).search("").draw();
//                } else {
//                    table.columns(11).search($(this).val()).draw();
//                }
//            }
//        }
//    );

//    $(".flt-vigenciausuario").on("change",
//        function () {

//            if ($(this).val()) {

//                switch ($(this).val()) {
//                    case "T":
//                        table.columns(10).search("").draw();
//                        break;
//                    case "V":
//                        table.columns(10).search("^V$|^$", true, false).draw();
//                        break;
//                    case "C":
//                        table.columns(10).search("C").draw();
//                        break;
//                    case "P":
//                        table.columns(10).search("P").draw();
//                        break;

//                    default:
//                        table.columns(10).search("").draw();
//                        break;

//                }


//            }
//        }
//    );

//    $(".flt-vigenciatrabajador").on("change",
//        function () {

//            if ($(this).val()) {
//                if ($(this).val() === "T") {
//                    table.columns(9).search("").draw();
//                } else {
//                    var vigTrabajador = $(".flt-vigenciatrabajador").val()
//                        ? $(".flt-vigenciatrabajador").select2("data")[0].id
//                        : null;
//                    table.columns(9).search($(this).val()).draw();
//                }
//            }
//        }
//    );

//}

/******* GRID LISTAR *******/

function ListarTrabajador(table, rut, icodTrabajador, codProyecto, codInstitucion, codDireccionRegional, indVigencia, tipoAsociacion) {

    //tipoAsociacion
    //P = proyecto
    //D = direccion

    var parameters = new Object();

    if (rutValido)
        parameters.RutTrabajador = rut;
    else
        parameters.RutTrabajador = null;

    // Caso Listar Todos
    parameters.CodProyecto = codProyecto;
    parameters.CodInstitucion = codInstitucion;
    parameters.ICodTrabajador = icodTrabajador;
    parameters.CodDireccionRegional = codDireccionRegional;
    parameters.IndVigencia = indVigencia;

    table.clear();
    table.draw();

    $.ajax({
        type: "POST",
        url: (tipoAsociacion === "P") ? base + "/ListarTrabajador" : base + "/ListarTrabajadoresDireccion",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) { },
        error: function (r) {
            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
        }
    }).then(function (r) {

        $.each(r.d,
            function () {

                var nombreProyecto = "PARTICIPA EN OTRO PROYECTO";
                var codProyecto = null;

                var usuarioSenainfo = "No";
                if (this.UsuarioSenainfo)
                    usuarioSenainfo = "Sí";

                if (this.CodProyecto == ($(".proyecto").val() ? $(".proyecto").select2("data")[0].id : null)) {
                    codProyecto = this.CodProyecto;
                    nombreProyecto = this.NombreProyecto;
                }

                table.row.add([
                    this.ICodTrabajador,
                    this.NombreTrabajador,
                    this.RutTrabajador,
                    this.NombreInstitucion,
                    this.CodInstitucion,
                    nombreProyecto,
                    codProyecto,
                    this.Cargo,
                    usuarioSenainfo,
                    this.IndVigenciaTrabajador,
                    this.IndVigenciaUsuario,
                    this.IndVigenciaProyecto,
                    this.RolPrincipal,
                    this.EstadoRegistro,
                    ((this.FechaIngreso == null) ? "" : moment(this.FechaIngreso).format("DD-MM-YYYY")),
                    ((this.FechaEgreso == null) ? "" : moment(this.FechaEgreso).format("DD-MM-YYYY")),
                    this.IdTrabajadorProyecto
                ]);


            });


        if (table.data().any()) {
            table.draw();

            CerrarListaBackground();

            if (document.getElementById("wgridVerTrabajadores").style.display === "block")
                document.getElementById("wrapperTrabajador").style.display = "none";

            if (document.getElementById("wrapperTrabajador").style.display === "none")
                document.getElementById("wgridVerTrabajadores").style.display = "block";

        } else {
            table.clear();
            table.draw();

            document.getElementById("wgridVerTrabajadores").style.display = "none";

            var $loading = $("#spinner").hide();
            $loading.hide();
        }

    });

}

function CargaDatosTrabajadorSeleccionado(datos) {

    //Consultamos inicialmente, si ya existe en la institución, en caso que no exista, se cargarán los datos.
    //if (TrabajadorExisteEnInstitucionSeleccionada(datos.CodInstitucion, datos.RutTrabajador) === 0) {

    var codInstitucionSeleccionada = parseInt($(".institucion").val());

    // Se coloca desde un comienzo en bloqueado, porque según el caso de vigencia se activará
    $("#rdCredencialNo").prop("checked", true);
    $("#rdCredencialSi").prop("disabled", false);
    $("#rdCredencialNo").prop("disabled", false);
    document.getElementById("wrapperCredencial").style.display = "none";

    // Si los datos del usuario encontrado pertenecen a otra institución, 
    // quiere decir que no existe el trabajador en la institución actual y que se creará como nuevo.
    if (datos.CodInstitucion !== codInstitucionSeleccionada) {

        $(".paterno").val(datos.Paterno);
        $(".materno").val(datos.Materno);
        $(".nombres").val(datos.Nombres);
        $(".sexo").val(datos.Sexo).trigger("change.select2");
        $(".profesion").val(datos.CodProfesion).trigger("change.select2");

        $(".rut").prop("disabled", true);
        $(".paterno").prop("disabled", true);
        $(".materno").prop("disabled", true);
        $(".nombres").prop("disabled", true);

        LimpiarCamposParaNuevoRegistro();
        HabilitarLogicaFechaIngreso();
        HabilitaBtnActivar(false);
        HabilitaGuardar(true);
        HabilitaBtnCambiarPassword(false);
        HabilitaBtnReenviarMail(false);

        return;
    }

    //Logica para mostrar u ocultar botones
    //Basados principalmente en las vigencias de usuario y Relacion Trabajador-Proyecto
    var vigUsuario = datos.IndVigenciaUsuario;
    var vigTrabajadorProyecto = datos.IndVigenciaProyecto;

    //if (datos.IndVigenciaTrabajador === "V")
    //    HabilitaBtnCaducar(true);

    if (vigUsuario === "P" && vigTrabajadorProyecto === "V") {
        HabilitaBtnActivar(true);
        HabilitaBtnReenviarMail(true);
    } else {
        HabilitaBtnActivar(false);
        HabilitaBtnReenviarMail(false);
    }

    if (vigUsuario === "C" && vigTrabajadorProyecto === "V")
        HabilitaBtnActivar(true);

    if ((vigUsuario === "P" || vigUsuario === "V" || vigUsuario === "" || vigUsuario === " ") &&
        vigTrabajadorProyecto === "V" &&
        datos.IndVigenciaTrabajador === "V" && 
        datos.CodInstitucion == $(".institucion").val()) {
        $(".rut").val("");
        HabilitaGuardar(false);
        alertify.set("notifier", "position", "top-center");
        alertify.success(
            "Este trabajador ya se encuentra ingresado en este proyecto");

        return;
    }

    //$(".rut").val(this.RutTrabajador);

    //$("#hdfICodTrabajador").val(datos.ICodTrabajador);
    $(".paterno").val(datos.Paterno);
    $(".materno").val(datos.Materno);
    $(".nombres").val(datos.Nombres);
    $(".profesion").val(datos.CodProfesion).trigger("change.select2");
    $(".cargo").val(datos.CodCargo).trigger("change.select2");
    $(".email").val(datos.Mail);
    $(".telefono").val(datos.Telefono);
    $(".sexo").val(datos.Sexo).trigger("change.select2");
    $(".horas").val(datos.HorasComprometidas);

    HabilitaGuardar(true);
    //$(".fechaingreso").val(datos.FechaIngreso);

    $(".fechaingreso").val(((datos.FechaIngreso == null) ? "" : moment(datos.FechaIngreso).format("DD-MM-YYYY")));

    hdUltimoEgreso = datos.UltimaFechaEgreso;

    if (datos.IndVigenciaUsuario != "" && datos.IndVigenciaUsuario != " " && datos.IndVigenciaUsuario != null) {
        $("#hdfRealizaLogin").val(true);

        // 28-08-2019 MAGA - VER SI HACE FALTA QUE ESTO SE HAGA CON LA FORMA NUEVA
        //$("[name='chkCredencial']").bootstrapSwitch("state", true);


        // la activación o no de esta parte depende de los datos del usuario no es que simplemente se activa.
        BackgroundCredencial(true);
        //if (vigUsuario === "P" || vigUsuario === "V") {
        //    BackgroundCredencial(true);
        //}

        $("#rdCredencialSi").prop("disabled", true);
        $("#rdCredencialNo").prop("disabled", true);

        $(".rolprincipal").val(datos.RolPrincipal).trigger("change.select2");

        //$(".usuario").val(this.UsuarioLogin);
        $(".usuario").val(datos.Mail);
        $(".estado-trabajador").val(datos.EstadoTrabajador);

        ValidaEstados(datos.IndVigenciaTrabajador,
            datos.IndVigenciaUsuario,
            datos.IndVigenciaProyecto);
    }

    $(".rut").prop("disabled", true);
    $(".paterno").prop("disabled", true);
    $(".materno").prop("disabled", true);
    $(".nombres").prop("disabled", true);
    $(".email").prop("disabled", true);
    $(".profesion").prop("disabled", true);

    if (vigTrabajadorProyecto === "C" && vigUsuario === "C" && datos.IndVigenciaTrabajador === "C") {
        $(".email").prop("disabled", false);
        $(".email").val("");
        alertify.set("notifier", "position", "top-center");
        alertify.alert(
            "Se ha cargado la identidad del trabajador ingresado anteriormente, ingrese la información faltante.");
        tipoOperacion = "edit";
    }

    if (vigTrabajadorProyecto === "C" && vigUsuario === "V" && datos.IndVigenciaTrabajador === "V") {
        //LimpiarCamposParaNuevoRegistro();
        //HabilitaBtnCaducar(false);
        HabilitaBtnCambiarPassword(false);
        HabilitarLogicaFechaIngreso();

        alertify.set("notifier", "position", "top-center");
        alertify.alert(
            "La relación del trabajador con el proyecto se encuentra CADUCADA, se deben actualizar los datos para vincular al proyecto nuevamente.");
        tipoOperacion = "edit";
    }

    if (vigTrabajadorProyecto === "V" && vigUsuario === "C" && datos.IndVigenciaTrabajador === "V") {
        $(".email").prop("disabled", false);
        $("#hdfICodTrabajador").val(datos.ICodTrabajador);
        HabilitaModificar(true);
        alertify.set("notifier", "position", "top-center");
        alertify.alert(
            "El Usuario del proyecto se encuentra CADUCADO, se debe ingresar un nuevo correo para generar nuevas credenciales.");
        tipoOperacion = "edit";
    }

    // comentado hoy 17-10-2019 verificar que esto ya no es necesario por lo puesto arriba
    //if ((vigUsuario === "" || vigUsuario === " ") && datos.CodInstitucion !== codInstitucionSeleccionada) { 
    //    $(".email").prop("disabled", false).val("");
    //}


    if (vigTrabajadorProyecto === "C" && vigUsuario === "P" && datos.IndVigenciaTrabajador === "V") {
        //$(".email").prop("disabled", false);
        //LimpiarCamposParaNuevoRegistro();
        HabilitaBtnActivar(false);
        HabilitaBtnReenviarMail(false);
        HabilitaBtnCambiarPassword(false);
        //HabilitaBtnCaducar(false);
        HabilitarLogicaFechaIngreso();
        tipoOperacion = "edit";
        alertify.set("notifier", "position", "top-center");
        alertify.alert(
            "La relación del trabajador con el proyecto se encuentra CADUCADA, se deben actualizar los datos para vincular al proyecto nuevamente.");
    }

    if (vigTrabajadorProyecto === "V" &&
        vigUsuario === "V" &&
        datos.IndVigenciaTrabajador === "V" &&
        (datos.CodInstitucion === codInstitucionSeleccionada) || (vigTrabajadorProyecto === "V" && vigUsuario === "P" && datos.IndVigenciaTrabajador === "C")) {
        HabilitaModificar(true);
        $("#hdfICodTrabajador").val(datos.ICodTrabajador);
    }

    if ($("#rdCredencialNo").prop("checked") === true) {
        $(".email").prop("disabled", false);
    }

    if (vigTrabajadorProyecto !== null)
        tipoOperacion = "edit";
    else 
        tipoOperacion = "new";
}

function LimpiarCamposParaNuevoRegistro() {
    $("#hdfICodTrabajador").val(null);
    $(".email").prop("disabled", false);
    $(".email").val("");
    $(".fechaingreso").datepicker("destroy");
    $(".fechaingreso").prop("disabled", false);
    $(".fechaingreso").val("");
    $(".usuario").val("");
}


function TrabajadorExisteEnInstitucionSeleccionada(codInstitucion, rutTrabajador) {

    $.ajax({
        type: "POST",
        url: base + "/ExisteTrabajadorEnInstitucionSeleccionada",
        data: "{'codInstitucion':'" + codInstitucion + "', 'rutTrabajador':'" + rutTrabajador + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
            return 10;
        }
    }).then(function (data) {
        console.log("entre");
        var d = data;

        var existe = parseInt(d);
        return existe;
    });
}
//function CantidadRelacionProyectosTrabajador(codTrabajador) {
//    $.ajax({
//        type: "POST",
//        url: base + "/CantidadProyectosRelacionadosTrabajador",
//        data: "{'icodTrabajador':'" + codTrabajador + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (r) {
//        },
//        error: function (r) {
//            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
//            return 10;
//        }
//    }).then(function (data) {
//        var cantidad = parseInt(data.d);
//        if (cantidad > 1)
//            $("#btnCaducarTrabajador").click(caducarTrabajadorClickProyectosRelacionados());
//        else
//            $("#btnCaducarTrabajador").click(caducarTrabajadorClick());


//    });
//}

function BindTrabajadorPorRut(rut) {

    var numItems = 0;
    var parameters = new Object();

    if (rutValido)
        parameters.RutTrabajador = rut;
    else
        parameters.RutTrabajador = null;

    // Caso Listar Todos
    parameters.CodProyecto = $(".proyecto").val();
    parameters.CodInstitucion = $(".institucion").val();
    parameters.ICodTrabajador = null;
    parameters.CodDireccionRegional = null;
    parameters.IndVigencia = null;

    $.ajax({
        type: "POST",
        url: base + "/ListarTrabajadorPorRut",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            numItems = r.d.length;
        },
        error: function (r) {
            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
        }
    }).then(function (r) {
        if (numItems > 0) {
            //$.each(r.d,
            //function () {

            if (puedeEditarRol(parseInt(this.RolPrincipal))) {

                var data = r.d[0];

                CargaDatosTrabajadorSeleccionado(data);
                HabilitarFechaIngreso(true);
                HabilitarLogicaFechaIngreso();


            } else {

                HabilitarFechaIngreso(true);
                HabilitarLogicaFechaIngreso();

                IniciarEventosCheckboxCredencial();

                var $loading = $("#spinner").hide();
                $loading.hide();

            }
            //});
        } else {
            HabilitarFechaIngreso(true);
            HabilitarLogicaFechaIngreso();
            HabilitaGuardar(true);
        }
    });
}

////if (TrabajadorExisteEnInstitucionSeleccionada($(".institucion").val(), $(".rut").val()) === 0) {

//var fechaCreacionProyecto = FechaLocal($(".proyecto").select2("data")[0].FechaCreacion);
//var fechaHoy = moment().format("DD-MM-YYYY");
//hdUltimoEgreso = moment(this.FechaEgreso).format("DD-MM-YYYY");
//hdCodDireccionTrabajador = this.CodDireccionRegional;


//$("#hdfRealizaLogin").val(false);
//$("#chkCredencial").off("switchChange.bootstrapSwitch");
//$("#hdfICodTrabajador").val(this.ICodTrabajador);

//switch (this.IndVigenciaProyecto) {
//    case "C":

//        $(".rut").val($.Rut.formatear(this.RutTrabajador)).trigger("blur");
//        $(".paterno").val(this.Paterno.toUpperCase()).trigger("blur");
//        $(".materno").val(this.Materno.toUpperCase()).trigger("blur");
//        $(".nombres").val(this.Nombres.toUpperCase()).trigger("blur");
//        //$(".profesion").val(this.CodProfesion).trigger("change.select2");

//        if (this.CodCargo === 0) {
//            $(".cargo").val(null).trigger("change.select2");
//            RequerirCargo(true);
//        } else
//            $(".cargo").val(this.CodCargo).trigger("change.select2");

//        IniciarEventosCheckboxCredencial();

//        //$(".email").val(this.Mail).trigger("blur");

//        $(".telefono").val(this.Telefono).trigger("blur");

//        if (this.HorasComprometidas === 0) {
//            $(".horas").val(0);
//            RequerirHoras(true);
//        } else
//            $(".horas").val(this.HorasComprometidas);

//        $(".sexo").prop("disabled", false);
//        $(".sexo").val(this.Sexo).trigger("change.select2");

//        //fechaUltimoEgreso > fechaCreacionProyecto ? fechaUltimoEgreso : fechaCreacionProyecto
//        //HabilitarLogicaFechaIngreso();

//        $(".fechaingreso").prop("disabled", false);


//        //$(".fechaingreso").val(((this.FechaIngreso == null) ? "" : moment(this.FechaIngreso).format("DD-MM-YYYY")));

//        $(".vigenciatrabajador").val(this.IndVigenciaTrabajador).trigger("change.select2");
//        //$(".vigenciausuario").val(this.IndVigenciaUsuario).trigger("change.select2");
//        $(".vigenciausuario").val("C").trigger("change.select2");


//        IniciarDatePicker($(".fechaingreso"),
//            moment(this.FechaEgreso).format("DD-MM-YYYY")
//                ? moment(this.FechaEgreso).format("DD-MM-YYYY")
//                : fechaCreacionProyecto,
//            fechaHoy);


//        $(".rut").prop("disabled", true);
//        $(".paterno").prop("disabled", true);
//        $(".materno").prop("disabled", true);
//        $(".nombres").prop("disabled", true);
//        $(".sexo").prop("disabled", true);


//        alertify.set("notifier", "position", "top-center");
//        alertify.error(
//            "El trabajador está EGRESADO del Proyecto. Debes efectuar un nuevo Ingreso");

//        break;

//    case "V":

//        $(".rut").val($.Rut.formatear(this.RutTrabajador)).trigger("blur");
//        $(".paterno").val(this.Paterno.toUpperCase()).trigger("blur");
//        $(".materno").val(this.Materno.toUpperCase()).trigger("blur");
//        $(".nombres").val(this.Nombres.toUpperCase()).trigger("blur");
//        $(".profesion").val(this.CodProfesion).trigger("change.select2");

//        if (this.CodCargo === 0) {
//            $(".cargo").val(null).trigger("change.select2");
//            RequerirCargo(true);
//        } else
//            $(".cargo").val(this.CodCargo).trigger("change.select2");

//        IniciarEventosCheckboxCredencial();

//        $(".email").val(this.Mail).trigger("blur");

//        $(".telefono").val(this.Telefono).trigger("blur");

//        if (this.HorasComprometidas === 0) {
//            $(".horas").val(0);
//            RequerirHoras(true);
//        } else
//            $(".horas").val(this.HorasComprometidas);

//        $(".sexo").prop("disabled", false);
//        $(".sexo").val(this.Sexo).trigger("change.select2");

//        //fechaUltimoEgreso > fechaCreacionProyecto ? fechaUltimoEgreso : fechaCreacionProyecto
//        //HabilitarLogicaFechaIngreso();

//        $(".fechaingreso").prop("disabled", false);


//        $(".fechaingreso").val(((this.FechaIngreso == null)
//            ? ""
//            : moment(this.FechaIngreso).format("DD-MM-YYYY")));

//        $(".vigenciatrabajador").val(this.IndVigenciaTrabajador).trigger("change.select2");
//        $(".vigenciausuario").val(this.IndVigenciaUsuario).trigger("change.select2");
//        //$(".vigenciausuario").val("C").trigger("change.select2");


//        IniciarDatePicker($(".fechaingreso"),
//            moment(this.FechaEgreso).format("DD-MM-YYYY")
//                ? moment(this.FechaEgreso).format("DD-MM-YYYY")
//                : fechaCreacionProyecto,
//            fechaHoy);


//        $(".rut").prop("disabled", true);
//        $(".paterno").prop("disabled", true);
//        $(".materno").prop("disabled", true);
//        $(".nombres").prop("disabled", true);
//        $(".sexo").prop("disabled", true);
//        $(".email").prop("disabled", true);
//        $(".fechaingreso").prop("disabled", true);

//        //Datos de Credencial Senainfo
//        if (this.UsuarioSenainfo) {
//            ;
//            $("#hdfRealizaLogin").val(true);

//            $("[name='chkCredencial']").bootstrapSwitch("state", true);
//            //$(".email").off();


//            BackgroundCredencial(true);

//            $(".rolprincipal").val(this.RolPrincipal).trigger("change.select2");

//            //$(".usuario").val(this.UsuarioLogin);
//            $(".usuario").val(this.Mail);
//            $(".estado-trabajador").val(this.EstadoTrabajador);

//            ValidaEstados(this.IndVigenciaTrabajador,
//                this.IndVigenciaUsuario,
//                this.IndVigenciaProyecto);
//        }

//        IniciarCheckeoUsuarioMail();


//        break;

//}
//else {

//    alertify.alert("SENAINFO",
//        "No tienes acceso para editar este tipo de Rol de Usuario",
//        function () {
//        });
//}

//var fechaCreacionProyecto = FechaLocal($(".proyecto").select2("data")[0].FechaCreacion);
//var fechaHoy = moment().format("DD-MM-YYYY");
//hdUltimoEgreso = moment(this.FechaEgreso).format("DD-MM-YYYY");
//hdCodDireccionTrabajador = this.CodDireccionRegional;


//$("#hdfRealizaLogin").val(false);
//$("#chkCredencial").off("switchChange.bootstrapSwitch");
//$("#hdfICodTrabajador").val(this.ICodTrabajador);


////Identidad del Trabajador
//$(".rut").val($.Rut.formatear(this.RutTrabajador)).trigger("blur");
//$(".paterno").val(this.Paterno.toUpperCase()).trigger("blur");
//$(".materno").val(this.Materno.toUpperCase()).trigger("blur");
//$(".nombres").val(this.Nombres.toUpperCase()).trigger("blur");
//$(".profesion").val(this.CodProfesion).trigger("change.select2");

//if (this.CodCargo === 0) {
//    $(".cargo").val(null).trigger("change.select2");
//    RequerirCargo(true);
//} else
//    $(".cargo").val(this.CodCargo).trigger("change.select2");

//IniciarEventosCheckboxCredencial();

//$(".email").val(this.Mail).trigger("blur");

//$(".telefono").val(this.Telefono).trigger("blur");

//if (this.HorasComprometidas === 0) {
//    $(".horas").val(0);
//    RequerirHoras(true);
//} else
//    $(".horas").val(this.HorasComprometidas);

//$(".sexo").prop("disabled", false);
//$(".sexo").val(this.Sexo).trigger("change.select2");

////fechaUltimoEgreso > fechaCreacionProyecto ? fechaUltimoEgreso : fechaCreacionProyecto
////HabilitarLogicaFechaIngreso();

//$(".fechaingreso").prop("disabled", false);

//IniciarDatePicker($(".fechaingreso"), moment(this.FechaEgreso).format("DD-MM-YYYY") ? moment(this.FechaEgreso).format("DD-MM-YYYY") : fechaCreacionProyecto, fechaHoy);

//$(".fechaingreso").val(((this.FechaIngreso == null) ? "" : moment(this.FechaIngreso).format("DD-MM-YYYY")));

//$(".vigenciatrabajador").val(this.IndVigenciaTrabajador).trigger("change.select2");
////$(".vigenciausuario").val(this.IndVigenciaUsuario).trigger("change.select2");
//$(".vigenciausuario").val("C").trigger("change.select2");


////Datos de Credencial Senainfo
//if (this.UsuarioSenainfo) {
//    ;
//    $("#hdfRealizaLogin").val(true);

//    $("[name='chkCredencial']").bootstrapSwitch("state", true);
//    $(".email").off();


//    BackgroundCredencial(true);

//    $(".rolprincipal").val(this.RolPrincipal).trigger("change.select2");

//    //$(".usuario").val(this.UsuarioLogin);
//    $(".usuario").val(this.Mail);
//    $(".estado-trabajador").val(this.EstadoTrabajador);

//    ValidaEstados(this.IndVigenciaTrabajador,
//        this.IndVigenciaUsuario,
//        this.IndVigenciaProyecto);

//} else {
//    $("#hdfRealizaLogin").val(false);

//    $("[name='chkCredencial']").bootstrapSwitch("state", false);
//}

//;

//if (this.IndVigenciaProyecto === "C") {
//    $(".email").val("");
//    $(".usuario").val("");
//    $(".profesion").val(null).trigger("change.select2");
//    $(".fechaingreso").val("");
//    //document.getElementById("wrapperCredencial").style.display = "none";
//    $("#wrapperCredencial").css("display", "none");
//}

//if (TrabajadorExisteEnInstitucionSeleccionada($(".institucion").val(), $(".rut").val()) === 0) {
//    ;
//    console.log("entre a limpiar datos");
//    $(".cargo").val(null).trigger("change.select2");
//    $(".horas").val(0);
//    $(".fechaingreso").val("");
//    $(".email").val("");
//    $(".email").prop("disabled", false);
//    $("[name='chkCredencial']").bootstrapSwitch("disabled", false);
//    document.getElementById("wrapperCredencial").style.display = "none";
//    $("[name='chkCredencial']").bootstrapSwitch("state", false);
//    $(".usuario").val("");
//    $(".rolprincipal").val(null).trigger("change.select2");
//    $(".estado-trabajador").val("");
//    $("#hdfICodTrabajador").val("0");
//    $(".email").off();
//    IniciarCheckeoUsuarioMail();
//}



/******* NOTIFICACIONES ******/
function ReenvioMail(icodTrabajador) {
    $.ajax({
        type: "POST",
        url: base + "/ReenviarMail",
        data: "{'icodTrabajador':'" + icodTrabajador + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function () {

                });

            $("#btnGuardarTrabajador").prop("disabled", false);
            $("#btnAgregarRegistroTrabajador").prop("disabled", false);
        }
    }).then(function (data) {

        // create the option and append to Select2
        var d = data.d;
        switch (d) {
            case true:
                $("#btnReenviarCorreo").prop("disabled", false);
                alertify.set("notifier", "position", "top-center");
                alertify.success("Se ha Reenviado el correo al Trabajador.");
                LimpiarForm(tipoTrabajador);
                HabilitarBotonesMail(false);
                break;
            case false:
                alertify.set("notifier", "position", "top-center");
                alertify.error("No se pudo Reenviar el correo. Contacte con Mesa de Ayuda.");
                break;

        }

    });
}

function CancelarSolicitudMail(icodtrabajador) {
    $.ajax({
        type: "POST",
        url: base + "/CancelarSolicitudMail",
        data: "{'icodTrabajador':'" + icodtrabajador + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function () {
                });

            $("#btnReenviarCorreo").prop("disabled", false);
        }
    }).then(function (data) {

        // create the option and append to Select2
        var d = data.d;

        switch (d) {
            case true:
                $("#btnCancelarCorreo").prop("disabled", false);
                alertify.set("notifier", "position", "top-center");
                alertify.success("Se ha Cancelado la solicitud de Correo.");
                LimpiarForm(tipoTrabajador);
                HabilitarBotonesMail(false);
                break;
            case false:
                alertify.set("notifier", "position", "top-center");
                alertify.error("No se pudo Cancelar la solicitud. Contacte con Mesa de Ayuda.");
                break;

        }

    });
}

function GeneraCambioPassword(icodtrabajador) {
    $.ajax({
        type: "POST",
        url: base + "/GeneraCambioPassword",
        data: "{'icodTrabajador':'" + icodtrabajador + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function () {
                });

            $("#btnCambiarPassword").prop("disabled", false);
        }
    }).then(function (data) {

        // create the option and append to Select2
        var d = data.d;

        switch (d) {
            case true:
                $("#btnCambiarPassword").prop("disabled", false);
                alertify.set("notifier", "position", "top-center");
                alertify.success("Se ha emitido la solicitud de Cambio de Password vía correo.");
                LimpiarForm(tipoTrabajador);
                HabilitarBotonesMail(false);
                break;
            case false:
                alertify.set("notifier", "position", "top-center");
                alertify.error("No se pudo emitir la solicitud. Contacte con Mesa de Ayuda.");
                break;

        }

    });
}

function ExisteUsuarioMail(usuarioLogin) {
    $.ajax({
        type: "POST",
        url: base + "/ExisteUsuarioMail",
        data: "{'usuarioLogin':'" + usuarioLogin + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function () {
                });

            $("#btnReenviarCorreo").prop("disabled", false);
        }
    }).then(function (data) {

        // create the option and append to Select2
        var d = data.d;

        switch (d) {
            case true:
                alertify.set("notifier", "position", "top-center");
                alertify.error("El mail o cuenta de usuario " + usuarioLogin + " ya existe");
                $(".usuario").val("");
                $(".email").val("");
                $(".email").prop("disabled", false);  // Se agrega el deshabilitar porque si el mail ya existe tiene que poner otro.
                return true;
                break;
            case false:
                $(".usuario").val($(".email").val());
                return false;
                break;

        }

        return false;
    });
}

/******* DROP DOWN LISTAR *******/
function ListarRegion() {
    var region = $(".region");
    $.ajax({
        type: "POST",
        url: base + "/ListarRegion",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        region.select2({
            placeholder: "Selecciona una Región",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodRegion;
                    obj.text = obj.text || obj.NombreRegion;
                    return obj;
                }),

            cache: true,
            escapeMarkup: function (markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");
                    ListarDireccion($(this).val(), null);
                }
            }
        );

        switch (hdRolUsuario) {
            case "ADMINISTRADOR_PROYECTO":
                region.val(hdCodRegion).trigger("change.select2");
                break;
        }

    });
}

function ListarDireccion(codRegion, codDireccionRegional) {

    var parameters = new Object();
    parameters.CodRegion = codRegion;
    parameters.CodDireccionRegional = codDireccionRegional;

    var direccion = $(".direccion");

    if ($(direccion).hasClass("select2-hidden-accessible")) {
        direccion.select2("destroy");
    }

    direccion.empty();

    $.ajax({
        type: "POST",
        url: base + "/ListarDireccion",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        direccion.select2({
            placeholder: "Selecciona una Dirección Regional",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodDireccionRegional;
                    obj.text = obj.text || obj.NombreDireccion;
                    return obj;
                }),
            cache: true,
            selectionTitleAttribute: false,
            escapeMarkup: function (markup) {
                return markup;
            }, // let our custom formatter work
            templateResult: tmplDireccion,
            templateSelection: tmplDireccionSelect

        }).on("change.select2",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");

                }
            }
        );

        switch (hdRolUsuario) {
            case "ADMINISTRADOR_PROYECTO":
                direccion.val(hdCodDireccionRegional).trigger("change.select2");
                break;
            default:

                break;
        }

    });
}

function ListarProfesionOficio() {

    var profesion = $(".profesion");
    $.ajax({
        type: "POST",
        url: base + "/ListarProfesionOficio",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        profesion.select2({
            placeholder: "Selecciona una Profesión u Oficio",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodProfesion;
                    obj.text = obj.text || obj.Descripcion;
                    return obj;
                }),
            cache: true,
            escapeMarkup: function (markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");
                }
            }
        );

        profesion.val(null);
        profesion.trigger("change");

    });
}

function ListarCargo() {

    var cargo = $(".cargo");
    $.ajax({
        type: "POST",
        url: base + "/ListarCargo",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        cargo.select2({
            placeholder: "Selecciona un Cargo",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodCargo;
                    obj.text = obj.text || obj.Descripcion;
                    return obj;
                }),
            cache: true,
            escapeMarkup: function (markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");
                }
            }
        );

        cargo.val(null);
        cargo.trigger("change");

    });
}

function ListarRolPrincipal() {

    var rolprincipal = $(".rolprincipal");
    $.ajax({
        type: "POST",
        url: base + "/ListarRolPrincipal",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        rolprincipal.off();
        dataRoles = data.d;

        rolprincipal.select2({
            placeholder: "Selecciona un Rol",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.IdRol;
                    obj.text = obj.text || obj.DescripcionRol;
                    return obj;
                }),
            cache: true,
            escapeMarkup: function (markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");
                }
            }
        );

        rolprincipal.val(null);
        rolprincipal.trigger("change");

    });
}

ListarEstamentos = () => {
    $.ajax({
        type: "POST",
        url: base + "/ListarEstamentos",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: () => {

        },
        error: () => {

        }
    }).then(function (data) {
        $(".estamento").off();
        dataEstamentos = data.d;

        $(".estamento").select2({
            placeholder: "Seleccione un Estamento",
            data: $.map(data.d,
                (obj) => {
                    obj.id = obj.id || obj.TipoCargo;
                    obj.text = obj.text || obj.Descripcion;
                    return obj;
                }),
            cache: true,
            escapeMarkup: (markup) => {
                return markup;
            }
        }).on("change.select2",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");
                }
            } 
        );

        $(".estamento").val(null);
        $(".estamento").trigger("change");
    })
}

function ListarCausalEgreso() {
    var causalEgreso = $(".causalegreso");
    $.ajax({
        type: "POST",
        url: base + "/ListarCausalEgreso",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            showError("Ha ocurrido un error !", "msgErrorW");
        }
    }).then(function (data) {

        causalEgreso.select2({
            placeholder: "Selecciona una Causal de Egreso",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodCausalEgreso;
                    obj.text = obj.text || obj.DescripcionCausalEgreso;
                    return obj;
                }),
            cache: true,
            escapeMarkup: function (markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");
                }
            }
        );

        causalEgreso.val(null);
        causalEgreso.trigger("change");

    });
}

function ListarProyecto(control, codProyecto, codInstitucion, codDireccionRegional, indVigencia) {

    var numItems = 0;
    var parameters = new Object();
    parameters.CodDireccionRegional = codDireccionRegional;
    parameters.CodProyecto = codProyecto;
    parameters.CodInstitucion = codInstitucion;
    parameters.IndVigencia = indVigencia;
    parameters.ICodTrabajador = hdICodTrabajador;

    var proyecto = $("." + control);
    proyecto.empty();
    proyecto.unbind();

    $.ajax({
        type: "POST",
        url: base + "/ListarProyecto",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            numItems = r.d.length;
        },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        proyecto.select2({
            allowClear: false,
            placeholder: "Selecciona un Proyecto",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodProyecto;
                    obj.text = obj.text || obj.NombreProyecto;
                    return obj;
                }),
            escapeMarkup: function (markup) {
                return markup;
            }, // let our custom formatter work
            matcher: matchCustomProyecto,
            templateResult: tmplProyecto,
            templateSelection: tmplProyectoSelect

        }).on("change",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");

                    //TODO Seleccionar la región
                    // Se agrega esta validación para que al cambiar de proyecto se limpien todos los campos del área de trabajadores.
                    //if (document.getElementById("wrapperTrabajador").style.display === "block" &&
                    //    document.getElementById("wgridVerTrabajadores").style.display === "block") {
                    //    LimpiarForm("S");
                    //}

                    ListarTrabajador($("#gridVerTrabajadores").DataTable(), null, null, $(this).val(), $(".institucion").select2("data")[0].id, hdCodDireccionRegional, "V", "P");

                    // Si no es vacío , implemento requerir Cargo y Horas.
                    //RequerirCargo(true);
                    //RequerirHoras(true);

                    //HabilitarLogicaFechaIngreso();
                }


            });

        proyecto.on("select2:selecting",
            function (evt) {

                if (moment(evt.params.args.data.FechaTermino).isSameOrBefore(moment())) {
                    evt.preventDefault();
                    alertify.alert("SENAINFO",
                        "El Proyecto se encuentra Finalizado. No podrá agregar un nuevo trabajador.",
                        function () {

                        });
                }

            });


        if (numItems > 1) {
            proyecto.val(null).trigger("change");
        } else
            proyecto.trigger("change");


        //HabilitarLogicaFechaIngreso();
    });

}

function ListarInstitucion(codInstitucion, codDireccionRegional, indVigencia) {

    var parameters = new Object();
    parameters.CodDireccionRegional = codDireccionRegional;
    parameters.CodInstitucion = codInstitucion;
    parameters.IndVigencia = indVigencia;

    var institucion = $(".institucion");
    institucion.empty();
    institucion.unbind();

    institucion.select2();

    $.ajax({
        type: "POST",
        url: base + "/ListarInstitucion",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

        },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        institucion.select2({
            placeholder: "Selecciona un Institucion",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodInstitucion;
                    obj.text = obj.text || obj.NombreInstitucion;
                    return obj;
                }),
            escapeMarkup: function (markup) {
                return markup;
            }, // let our custom formatter work
            matcher: matchCustomInstitucion,
            templateResult: tmplInstitucion,
            templateSelection: tmplInstitucionSelect

        }).on("change",
            function () {
                if ($(this).val()) {
                    $(this).trigger("blur");

                    hdCodInstitucion = $(this).val();

                    ListarProyecto("proyecto",
                        null,
                        $(this).val(),
                        hdCodDireccionRegional,
                        "V");
                }


            });

        institucion.on("select2:selecting",
            function (evt) {

                if (tipoBotonGrid === "nuevoProyecto") {
                    evt.preventDefault();
                    alertify.set("notifier", "position", "top-center");
                    alertify.error(
                        "Para asociar un Nuevo Proyecto de una Institución diferente, debes solicitar caducar el usuario actual");
                }

            });

        switch (hdRolUsuario) {
            case "ADMINISTRADOR_PROYECTO":
                institucion.val(hdCodInstitucion).trigger("change");
                break;
        }

    });
}

/******* AJAX INSERT *********/

function BindingTrabajador(op) {
    var trabajador = new Object();

    switch (op) {
        case "nuevo":
            trabajador.CodInstitucion = $(".institucion").select2("data")[0].id;
            trabajador.CodProfesion = $(".profesion").select2("data")[0].id;
            trabajador.Paterno = $(".paterno").val().toUpperCase();
            trabajador.Materno = $(".materno").val().toUpperCase();
            trabajador.Nombres = $(".nombres").val().toUpperCase();
            trabajador.RutTrabajador = $(".rut").val().toUpperCase();
            trabajador.Telefono = $(".telefono").val().toUpperCase();
            trabajador.Mail = $(".email").val().toLowerCase();
            trabajador.CodRegion = $(".proyecto").val()
                ? $(".proyecto").select2("data")[0].CodRegion
                : ($(".direccion").val() ? $(".direccion").select2("data")[0].CodRegion : 0);

            trabajador.CodProyecto = $(".proyecto").val() ? $(".proyecto").select2("data")[0].id : null;
            trabajador.CodCargo = $(".cargo").val() ? $(".cargo").select2("data")[0].id : null;
            trabajador.CodCausalEgresoTrabajador = 0;
            trabajador.HorasComprometidas = $(".horas").val();
            trabajador.IndVigenciaTrabajador = "V";
            trabajador.IndVigenciaProyecto = "V";
            trabajador.IndVigenciaUsuario = "V";
            trabajador.FechaIngreso = $(".fechaingreso").val();
            trabajador.Sexo = $(".sexo").select2("data")[0].id;
            trabajador.TipoCargo = $(".estamento").val() ? $(".estamento").select2("data")[0].id : null;
            trabajador.FechaIngreso = $(".fechaingreso").val();

            if (tipoTrabajador === "S") {
                trabajador.CodDireccionRegional = $(".direccion").val() ? $(".direccion").select2("data")[0].id : 0;
                trabajador.RolPrincipal = $(".rolprincipal").select2("data")[0].id;
            }


            break;

        case "editar":
            trabajador.IcodTrabajador = $("#hdfICodTrabajador").val();
            trabajador.CodInstitucion = $(".institucion").select2("data")[0].id;
            trabajador.CodProfesion = $(".profesion").select2("data")[0].id;
            trabajador.Paterno = $(".paterno").val().toUpperCase();
            trabajador.Materno = $(".materno").val().toUpperCase();
            trabajador.Nombres = $(".nombres").val().toUpperCase();
            trabajador.RutTrabajador = $(".rut").val().toUpperCase();
            trabajador.Telefono = $(".telefono").val().toUpperCase();
            trabajador.Mail = $(".email").val().toLowerCase();
            trabajador.CodRegion = $(".proyecto").val()
                ? $(".proyecto").select2("data")[0].CodRegion
                : ($(".direccion").val() ? $(".direccion").select2("data")[0].CodRegion : 0);
            //trabajador.CodDireccionRegional = $(".direccion").select2("data")[0].id;
            trabajador.CodProyecto = $(".proyecto").val() ? $(".proyecto").select2("data")[0].id : null;
            trabajador.CodCargo = $(".cargo").val() ? $(".cargo").select2("data")[0].id : null;
            trabajador.CodCausalEgresoTrabajador = 0;
            trabajador.HorasComprometidas = $(".horas").val();
            trabajador.IndVigenciaTrabajador = "V";
            //trabajador.IndVigenciaUsuario = hdVigenciaUsuario ? hdVigenciaUsuario : null;
            //trabajador.IndVigenciaTrabajador = $(".vigenciatrabajador").val()
            //    ? $(".vigenciatrabajador").select2("data")[0].id
            //    : null;
            trabajador.IndVigenciaUsuario = $(".vigenciausuario").val()
                ? $(".vigenciausuario").select2("data")[0].id
                : null;

            trabajador.IndVigenciaProyecto = $("#hdfVigenciaProyecto").val();
            trabajador.Sexo = $(".sexo").select2("data")[0].id;
            trabajador.FechaIngreso = $(".fechaingreso").val();
            trabajador.RealizaLogin = $("#hdfRealizaLogin").val();
            trabajador.TipoCargo = $(".estamento").val() ? $(".estamento").select2("data")[0].id : null;

            if (tipoTrabajador === "S") {
                trabajador.CodDireccionRegional = $(".direccion").val() ? $(".direccion").select2("data")[0].id : 0;
                trabajador.RolPrincipal = $(".rolprincipal").val() ? $(".rolprincipal").select2("data")[0].id : null;
            }

            break;

        case "egresar":
            trabajador.CodInstitucion = $("#mdlEgresarTrabajador").attr("data-codinstitucion");
            trabajador.RutTrabajador = $("#mdlEgresarTrabajador").attr("data-ruttrabajador");

            if ($("#mdlEgresarTrabajador").data("realizaLogin") === "Sí")
                trabajador.RealizaLogin = true;
            else
                trabajador.RealizaLogin = false;

            trabajador.IndVigenciaTrabajador = "C";
            trabajador.CodProyecto = $("#mdlEgresarTrabajador").attr("data-codproyecto");

            trabajador.CodCausalEgresoTrabajador = $(".causalegreso").select2("data")[0].id;
            trabajador.IcodTrabajador = $("#mdlEgresarTrabajador").attr("data-icodtrabajador");
            trabajador.IdTrabajadorProyecto = $("#mdlEgresarTrabajador").attr("data-idtrabajadorproyecto");
            break;
    }

    return trabajador;
}


function ModificarTrabajadorBinding(icodTrabajador, rutTrabajador, codProyecto, nuevoProyecto, estadoRegistro) {

    var parameters = new Object();
    parameters.ICodTrabajador = icodTrabajador;
    parameters.RutTrabajador = rutTrabajador;
    parameters.CodDireccionRegional = null;
    parameters.CodProyecto = codProyecto;

    $.ajax({
        type: "POST",
        url: base + "/ListarTrabajador",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) { },
        error: function (r) {
            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
        }
    }).then(function (r) {
        var form = $("#frmNuevoTrabajadorSenainfo");

        var data = r.d[0];

        hdCodDireccionTrabajador = data.CodDireccionRegional;
        $(".direccion").val(data.CodDireccionRegional);
        $(".region").val(data.CodRegion);

        //TODO , binding formulario Modal Popup
        $(".institucion").val(data.CodInstitucion).trigger("change.select2");

        //ListarProyecto("ddl-proyectoSnf",
        //    data.CodProyecto,
        //    data.CodInstitucion,
        //    hdCodDireccionRegional,
        //    "V");

        $(".profesion").val(data.CodProfesion).trigger("change.select2");
        $(".paterno").val(data.Paterno.toUpperCase());
        $(".materno").val(data.Materno.toUpperCase());
        $(".nombres").val(data.Nombres.toUpperCase());
        $(".rut").val($.Rut.formatear(data.RutTrabajador)).trigger("change");
        $(".telefono").val(data.Telefono).trigger("blur");
        $(".telefono").trigger("keyup");
        $(".estamento").val(data.TipoCargo).trigger("change.select2");

        $(".email").val(data.Mail).trigger("blur");

        if (data.UsuarioSenainfo) {
            $(".email").trigger("change");

            $(".rolprincipal").val(data.RolPrincipal).trigger("change.select2");

            $(".usuario").val(data.UsuarioLogin);
            $(".estado-trabajador").val(data.EstadoTrabajador);

            ValidaEstados(data.IndVigenciaTrabajador, data.IndVigenciaUsuario, data.IndVigenciaProyecto);
        }

        $(".proyecto").prop("disabled", false);

        if ((data.CodProyecto != null) && (nuevoProyecto === false)) {
            //TODO Deshabilitar
            $(".cargo").val(data.CodCargo).trigger("change.select2");
            $(".horas").val(data.HorasComprometidas);
            $(".proyecto").prop("disabled", true);
            HabilitarFechaIngreso(true);

            $(".fechaingreso").val(moment(data.FechaIngreso).format("DD-MM-YYYY"));
        } else { // Nuevo Proyecto asociado

            $(".institucion").prop("disabled", false);
            $(".cargo").val(null).trigger("change.select2");
            $(".horas").val(0);
            $(".proyecto").prop("disabled", false);

            //ListarProyecto("ddl-proyectoSnf",
            //    null,
            //    this.CodInstitucion,
            //    hdCodDireccionRegional,
            //    "V");

            HabilitarFechaIngreso(true);

            $(".fechaingreso").val(moment(data.FechaIngreso).format("DD-MM-YYYY"));
        }


        $(".sexo").val(data.Sexo).trigger("change.select2");


        $(".vigenciatrabajador").val(data.IndVigenciaTrabajador).trigger("change.select2");
        $(".vigenciausuario").val(data.IndVigenciaUsuario).trigger("change.select2");

        $("#hdfICodTrabajador").val(icodTrabajador);

        hdUltimoEgreso = data.UltimaFechaEgreso;

        HabilitarLogicaFechaIngreso();
        HabilitaEdicionFormulario();
        //HabilitaEdicionFormulario(false, estadoRegistro);
        //IniciarCheckeoUsuarioMail();


        //if (this.IndVigenciaUsuario === "C") {
        //    $(".email").val("");
        //    $(".usuario").val("");
        //}


        if ($(".email").val() === "") {
            $(".email").prop("disabled", false);
            $(".fechaingreso").prop("disabled", false);
            IniciarCheckeoUsuarioMail();
        }

        if ($("#rdCredencialNo").prop("checked") === true) {
            $(".email").prop("disabled", false);
        }
    });
}

function CrearTrabajadorLogin(trabajador) {

    $.ajax({
        type: "POST",
        url: base + "/CrearTrabajadorLogin",
        data: "{'trabajador':'" + JSON.stringify(trabajador) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    }).then(function (data) {

        // create the option and append to Select2
        var d = data.d;

        switch (parseInt(d)) {
            case -2:
                alertify.alert("SENAINFO",
                    "Trabajador ya existe en el Proyecto. Puede editar el existente o Egresarlo primero.",
                    function () {
                        HabilitaGuardar(true);

                    });
                break;
            case -1:
                $("#btnGuardarTrabajador").prop("disabled", false);
                alertify.alert("SENAINFO",
                    "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                    function () {

                    });

                break;
            case 0:
                alertify.alert("SENAINFO",
                    "Se ha Registrado el Trabajador de forma exitosa.",
                    function () {
                        if ($(".proyecto").val()) {
                            //TODO Limpiar Campos
                            LimpiarForm(tipoTrabajador);
                            HabilitaGuardar(true);
                        }
                    });
                break;
            case 1:
                $("#btnGuardarTrabajador").prop("disabled", false);
                alertify.alert("SENAINFO",
                    "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                    function () {

                    });

                break;

        }
    });

}

function CrearTrabajadorNoLogin(trabajador) {

    $.ajax({
        type: "POST",
        url: base + "/CrearTrabajadorNoLogin",
        data: "{'trabajador':'" + JSON.stringify(trabajador) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    }).then(function (data) {

        // create the option and append to Select2
        var d = data.d;

        switch (parseInt(d)) {
            case -2:
                alertify.alert("SENAINFO",
                    "Trabajador ya existe en el Proyecto.",
                    function () {
                        HabilitaGuardar(true);

                    });
                break;
            case -1:
                $("#btnGuardarTrabajador").prop("disabled", false);
                alertify.alert("SENAINFO",
                    "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                    function () {

                    });
                break;
            case 0:
                alertify.alert("SENAINFO",
                    "Se ha Registrado el Trabajador de forma exitosa.",
                    function () {
                        if ($(".proyecto").val()) {
                            //TODO Limpiar Campos
                            LimpiarForm(tipoTrabajador);
                            HabilitaGuardar(true);

                        }
                    });
                break;
            case 1:
                $("#btnGuardarTrabajador").prop("disabled", false);
                alertify.alert("SENAINFO",
                    "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                    function () {

                    });
                break;

        }

        //ListarTrabajador($("#gridVerTrabajadores").DataTable(), null, null, $(this).val(), $(".institucion").select2("data")[0].id, hdCodDireccionRegional, "V", "P");
        //IniciarGridListarTrabajadores();

        $("#btnLimpiarTrabajador").clicK();

    });
}

function ModificarBackground() {
    var form = $("#frmNuevoTrabajadorSenainfo");
    form.validate();
    //debugger;
    if (form.valid()) {
        $("#btnModificarTrabajador").prop("disabled", true);

        var trabajador = BindingTrabajador("editar");

        if ($("#hdfEmailUsuario").val().length > 1) {  //($("#hdfEmailUsuario").val() !== "" || $("#hdfEmailUsuario").val() !== " ")
            CrearTrabajadorLogin(trabajador);
        }
        else {
            ModificarTrabajador(trabajador);
        }

        document.getElementById("wrapperTrabajador").style.display = "none";

    } else {
        $("#btnModificarTrabajador").prop("disabled", false);
    }
}

function CerrarListaBackground() {
    var idgrid = "wgridVerTrabajadores";
    var divgrid = document.getElementById(idgrid);
    divgrid.style.display = divgrid.style.display == "none" ? "block" : "none";
}

function AbrirRegistroBackground() {
    var id = "wrapperTrabajador";
    var div = document.getElementById(id);
    div.style.display = div.style.display == "none" ? "block" : "none";
}

function ModificarTrabajador(trabajador) {
    $.ajax({
        type: "POST",
        url: base + "/ModificarTrabajador",
        data: "{'trabajador':'" + JSON.stringify(trabajador) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function () {
                });

            $("#btnModificarTrabajador").prop("disabled", false);
        }
    }).then(function (data) {

        // create the option and append to Select2
        var d = data.d;
        //debugger;
        switch (parseInt(d)) {
            case 0:
                alertify.set("notifier", "position", "top-center");
                alertify.success("Datos actualizados correctamente.");
                LimpiarForm(tipoTrabajador);
                break;
            case 1:
                alertify.set("notifier", "position", "top-center");
                alertify.success("Datos actualizados correctamente, además se ha enviado un correo para actualizar la clave de usuario");
                LimpiarForm(tipoTrabajador);
                break;
            case -1:
                alertify.set("notifier", "position", "top-center");
                alertify.error("Ha ocurrido un error. Contacte con Mesa de Ayuda.");
                break;
        }

        $("#btnModificarTrabajador").prop("disabled", false);

        //ListarTrabajador($("#gridVerTrabajadores").DataTable(), null, null, $(this).val(), $(".institucion").select2("data")[0].id, hdCodDireccionRegional, "V", "P");
        //IniciarGridListarTrabajadores();
    });
}

//function RestaurarTrabajador(trabajador) {
//    $.ajax({
//        type: "POST",
//        url: base + "/RestaurarTrabajador",

//        data: "{'trabajador':'" + JSON.stringify(trabajador) + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (r) {
//        },
//        error: function (r) {
//            $("#btnRestaurarTrabajador").prop("disabled", false);

//            alertify.alert("SENAINFO",
//                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
//                function () {
//                });


//        }
//    }).then(function (data) {
//        // create the option and append to Select2
//        var d = data.d;

//        switch (parseInt(d)) {
//            case 0:
//                $("#btnRestaurarTrabajador").prop("disabled", false);
//                alertify.alert("SENAINFO",
//                    "Se ha restaurado el Trabajador de forma exitosa.",
//                    function () {
//                        $("#modalRestaurarTrabajador").modal("hide");
//                    });
//                LimpiarForm();
//                break;
//            case -1:
//                alertify.alert("SENAINFO",
//                    "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
//                    function () {
//                    });
//                break;

//        }

//    });
//}

function EgresarTrabajador(trabajador) {
    $.ajax({
        type: "POST",
        url: base + "/EgresarTrabajador",
        data: "{'trabajador':'" + JSON.stringify(trabajador) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function () {
                });

            $("#btnAgregarRegistroTrabajador").prop("disabled", false);
            $("#btnGuardarTrabajador").prop("disabled", false);
        }
    }).then(function (data) {

        // create the option and append to Select2
        var d = data.d;

        switch (parseInt(d)) {
            case 0:
                $("#btnEgresarTrabajador").prop("disabled", false);
                alertify.alert("SENAINFO",
                    "Se ha EGRESADO el Trabajador de forma exitosa.",
                    function () {
                        $("#mdlEgresarTrabajador").modal("hide");
                    });
                break;
            case -1:
                $("#btnGuardarTrabajador").prop("disabled", false);
                alertify.alert("SENAINFO",
                    "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                    function () {
                    });
                break;

        }

        //ListarTrabajador($("#gridVerTrabajadores").DataTable(), null, null, $(this).val(), $(".institucion").select2("data")[0].id, hdCodDireccionRegional, "V", "P");
        //$("#btnLimpiarTrabajador").click();
        //IniciarGridListarTrabajadores();

    });
}

/******* Validaciones *********/
function ValidaEstados(indVigenciaTrabajador, indVigenciaUsuario, indVigenciaProyecto) {
    switch (indVigenciaTrabajador) {
        case "V":

            switch (indVigenciaUsuario) {
                case "V":
                    HabilitaBtnActivar(false);
                    HabilitaBtnCambiarPassword(true);
                    break;

                case "C":
                    HabilitaBtnActivar(true);
                    HabilitaModificar(false);
                    HabilitaGuardar(false);
                    break;

                case "P":
                    HabilitaBtnActivar(false);
                    HabilitaBtnReenviarMail(true);
                    break;

                default:
                    HabilitarBotonesMail();
                    break;
            }


            break;
        case "C":
        default:
            HabilitaBtnReenviarMail(false);
            HabilitaBtnActivar(false);
            HabilitaBtnCambiarPassword(false);
            break;
            break;
    }
}

function ValidafrmEliminarTrabajador(form) {
    form.validate({
        ignore: "input[type=hidden], .select2-input, .select2-focusser",
        rules: {
            causalegreso: "required"
        },
        onfocusout: function (element) {
            $(element).valid();
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
            return true;
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
        }
    });
}

function ValidafrmNuevoTrabajadorSenainfo(form) {

    $.validator.addMethod("ValidarFecha",
        function (value, element) {
            return value.match(/^(0?[1-9]|[12][0-9]|3[0-1])[/., -](0?[1-9]|1[0-2])[/., -](19|20)?\d{2}$/);
        },
        "Formato de fecha inválido"
    );

    $.validator.addMethod("ValidarTelefono",
        function (value, element) {
            return true;
        },
        "Formato incorrecto");

    $.validator.addMethod("ValidarEmail",
        function (value, element) {

            return value.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        },
        "Formato de correo incorrecto");

    form.validate({
        ignore: "input[type=hidden], .select2-input, .select2-focusser",
        rules: {
            nombres: {
                required: true,
                maxlength: 20
            },
            paterno: {
                required: true,
                maxlength: 20
            },
            materno: {
                required: true,
                maxlength: 20
            },
            telefono: {
                required: false,
                maxlength: 11,
                ValidarTelefono: true
            },
            rut: {
                required: true,
                maxlength: 12
                //ValidarRut: true
            },
            email: {
                required: true,
                email: true,
                ValidarEmail: true
            },
            institucionsnf: "required",
            rolprincipal: "required",
            profesion: "required",
            vigencia: "required"
        },
        onfocusout: function (element) {
            $(element).valid();
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
            return true;
            //return false;
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
        }

    });

    return form;

}

function ValidafrmNuevoTrabajadorProyecto(form) {

    $.validator.addMethod("ValidarFecha",
        function (value, element) {
            return value.match(/^(0?[1-9]|[12][0-9]|3[0-1])[/., -](0?[1-9]|1[0-2])[/., -](19|20)?\d{2}$/);
        },
        "Formato de fecha inválido"
    );

    $.validator.addMethod("ValidarTelefono",
        function (value, element) {

            var num = (value.split("_").length - 1);

            if ((num === 0) || (num === 1))
                return true;
            else
                return false;
        },
        "Formato incorrecto");

    $.validator.addMethod("ValidarEmail",
        function (value, element) {

            return value.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        },
        "Formato de correo incorrecto");

    form.validate({
        ignore: "input[type=hidden], .select2-input, .select2-focusser",
        rules: {
            nombres: {
                required: true,
                maxlength: 20,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            paterno: {
                required: true,
                maxlength: 20,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            materno: {
                required: true,
                maxlength: 20,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            telefono: {
                required: false,
                maxlength: 11,
                ValidarTelefono: true
            },
            rut: {
                required: true,
                maxlength: 12,
                //ValidarRut: true
            },
            email: {
                required: true,
                email: true,
                ValidarEmail: true
            },
            institucionsnf: "required",

            profesion: "required"

        },
        onfocusout: function (element) {
            $(element).valid();
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            if (element.parent(".input-group").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

            //error.insertAfter(element);
            return true;
            //return false;
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
        },
        showErrors: function (errorMap, errorList) {
            var errors = this.numberOfInvalids(); // <- NUMBER OF INVALIDS

            $.each(errorMap,
                function (key, value) {
                    var parent = $('[name="' + key + '"]').parent();
                });

            this.defaultShowErrors(); // <- ENABLE default MESSAGES
        }
    });

    return form;

}

function AgregaValidacionRutInput(obj) {
    rutValido = false;

    if (obj.length > 0) {
        obj.Rut({
            on_error: function () {
                rutValido = false;
                $(".rut").val('');
                alert("Rut inválido");
            },
            on_success: function () {
                rutValido = true;
            },
            ignoreControlKeys: false,
            validateOn: "keyup paste keydown",
            format_on: "keyup change paste keydown blur"
        });
    }


}

function RequerirProyecto(opcion) {
    if (opcion) {
        $(".proyecto").rules("remove");
        $("#fgProyecto").addClass("required");
        $(".proyecto").prop("required", true);
        $(".proyecto").rules("add",
            {
                required: true
            });

    } else {
        $("#fgProyecto").removeClass("required error");
        $(".proyecto").prop("required", false);
        $(".proyecto").rules("remove");
    }
}

function RequerirFechaIngreso(opcion) {

    if (opcion) {
        $(".fechaingreso").rules("remove");
        $("#fgFechaIngreso").addClass("required");
        $(".fechaingreso").prop("required", true);
        $(".fechaingreso").rules("add",
            {
                required: true,
                ValidarFecha: true,
                messages: {
                    required: "Fecha Requerida",
                    ValidarFecha: "Ingrese Fecha válida"
                }

            });

    } else {
        $("#fgFechaIngreso").removeClass("required");
        $(".fechaingreso").prop("required", false);
        $(".fechaingreso").rules("remove");
    }
}

function RequerirHoras(opcion) {
    if (opcion) {
        $(".horas").rules("remove");
        $("#fgHoras").addClass("required");
        $(".horas").prop("required", true);
        $(".horas").rules("add",
            {
                required: true,
                number: true,
                min: 1,
                max: 200,
                messages: {
                    required: "Número Horas comprometidas requerido",
                    number: "Se permiten solo números",
                    min: "Número tiene que ser mayor a 0",
                    max: "Número tiene que ser menor a 200"
                }

            });

    } else {
        $("#fgHoras").removeClass("required");
        $(".horas").prop("required", false);
        $(".horas").rules("remove");
    }
}

function RequerirCargo(opcion) {
    if (opcion) {
        $(".cargo").rules("remove");
        $("#fgCargo").addClass("required");
        $(".cargo").prop("required", true);
        $(".cargo").rules("add",
            {
                required: true
            });

    } else {
        $("#fgCargo").removeClass("required error");
        $(".cargo").prop("required", false);
        $(".cargo").rules("remove");
    }
}

function RequerirRolPrincipal(opcion) {
    if (opcion) {
        $("#fgRolPrincipal").addClass("required");
        $(".rolprincipal").prop("required", true);
    } else {
        $("#fgRolPrincipal").removeClass("required");
        $(".rolprincipal").prop("required", false);

    }
}

function RequerirEmail(opcion) {

    if (opcion) {
        $("#fgEmail").addClass("required");
        $(".email").prop("required", true);

    } else {
        $("#fgEmail").removeClass("required");
        $(".email").prop("required", false);
    }

}

function puedeEditarRol(rolId) {
    //TODO Chequear si el RolId del Trabajador, se encuentra en la lista
    //Si no está en la lista, significa que el Usuario que está editando, no tiene el permiso para asignar ese Rol,
    //por ende, menos puede editarlo.
    if (rolId) {
        for (var i = 0; i < dataRoles.length; i++) {
            if (rolId === parseInt(dataRoles[i]["IdRol"])) {
                return true;
            }
        }

        return false;
    } else // null -> caso que no es trabajador senainfo, no tiene valor en Rol Principal
        return true;
}

/** Habilitar controles formulario **/
function HabilitaEdicionFormulario() {

    $(".rut").prop("disabled", true);
    $(".paterno").prop("disabled", true);
    $(".materno").prop("disabled", true);
    $(".nombres").prop("disabled", true);
    $(".region").prop("disabled", true);
    $(".direccion").prop("disabled", true);
    $(".vigenciatrabajador").prop("disabled", true);
    $(".fechaingreso").prop("disabled", true);
    $(".profesion").prop("disabled", true);

    $(".sexo").prop("disabled", false);
    $(".cargo").prop("disabled", false);
    $(".horas").prop("disabled", false);
    $(".telefono").prop("disabled", false);

    //Para los trabajadores con cuenta Senainfo NO se permite modificar el correo.
    if (tipoTrabajador === "S") {
        $(".email").prop("disabled", true);
    }

    //Para los trabajadores solamente en un proyecto se permite modificar el correo.
    if (tipoTrabajador === "P") {
        $(".email").prop("disabled", false);
    }
}

function HabilitaBtnCambiarPassword(opcion) {
    if (opcion) {
        document.getElementById("btnCambiarPassword").style.display = "inline";
    } else {
        document.getElementById("btnCambiarPassword").style.display = "none";
    }
}

function HabilitaBtnActivar(opcion) {
    if (opcion) {
        document.getElementById("btnActivarCaducada").style.display = "inline";
    } else {
        document.getElementById("btnActivarCaducada").style.display = "none";
    }
}

function HabilitaBtnReenviarMail(opcion) {
    if (opcion) {
        document.getElementById("btnReenviarCorreo").style.display = "inline";
        document.getElementById("btnCancelarCorreo").style.display = "inline";
    } else {
        document.getElementById("btnReenviarCorreo").style.display = "none";
        document.getElementById("btnCancelarCorreo").style.display = "none";
    }
}

function HabilitaModificar(opcion) {
    if (opcion) {
        document.getElementById("btnGuardarTrabajador").style.display = "none";
        document.getElementById("btnModificarTrabajador").style.display = "inline";

        $(".proyecto").prop("disabled", true);

        $(".institucion").prop("disabled", true);

    } else {
        document.getElementById("btnGuardarTrabajador").style.display = "inline";
        document.getElementById("btnModificarTrabajador").style.display = "none";
        $(".proyecto").prop("disabled", false);

        if (hdRolUsuario !== "ADMINISTRADOR_PROYECTO")
            $(".institucion").prop("disabled", false);
    }

}

function HabilitarFechaIngreso(opcion) {
    if (opcion) {
        $(".fechaingreso").prop("disabled", false);
    } else {
        $(".fechaingreso").prop("disabled", true);
    }
}

function HabilitaDireccion(opcion) {

    var direccion = $(".direccion");

    if (opcion) {
        $("#fgDireccion").addClass("required");
        $(".direccion").prop("required", true);
        $(".direccion").prop("disabled", false);

    } else {
        $("#fgDireccion").removeClass("required");
        $(".direccion").prop("required", false);
        $(".direccion").prop("disabled", true);

        direccion.select2("destroy");
        direccion.empty();
        direccion.select2();
    }

}

function HabilitaGuardar(opcion) {
    if (opcion)
        $("#btnGuardarTrabajador").prop("disabled", false);
    else
        $("#btnGuardarTrabajador").prop("disabled", true);
}

function HabilitarBotonesMail(opcion) {
    HabilitaBtnReenviarMail(opcion);
    HabilitaBtnActivar(opcion);
    HabilitaBtnCambiarPassword(opcion);
}

/*******     Utils     *******/
function FechaLocal(fecha) {
    return moment(fecha).format("DD-MM-YYYY");
}

function HabilitarLogicaFechaIngreso() {

    if ($(".proyecto").val()) {

        var fechaCreacionProyecto = FechaLocal($(".proyecto").select2("data")[0].FechaCreacion);

        var fechaHoy = moment().format("DD-MM-YYYY");
        var fechaUltimoEgreso = hdUltimoEgreso ? FechaLocal(hdUltimoEgreso) : fechaCreacionProyecto;

        IniciarDatePicker($(".fechaingreso"),
            fechaUltimoEgreso,
            fechaHoy);
        HabilitarFechaIngreso(true);
        RequerirFechaIngreso(true);
    }
}

function DesbloquearForm(opcion) {
    $(".rut").prop("disabled", !opcion);
    $(".paterno").prop("disabled", !opcion);
    $(".materno").prop("disabled", !opcion);
    $(".nombres").prop("disabled", !opcion);
    $(".region").prop("disabled", !opcion);
    $(".direccion").prop("disabled", !opcion);
    $(".email").prop("disabled", !opcion);
    //$(".vigenciatrabajador").prop("disabled", !opcion);
    $(".fechaingreso").prop("disabled", !opcion);

    //$(".usuario").prop("disabled", !opcion);
    //$(".rolprincipal").prop("disabled", !opcion);
    //$(".vigenciausuario").prop("disabled", !opcion);

    $(".sexo").prop("disabled", !opcion);
    $(".horas").prop("disabled", !opcion);
    $(".telefono").prop("disabled", !opcion);
    $(".cargo").prop("disabled", !opcion);
    $(".profesion").prop("disabled", !opcion);
    $(".fechaingreso").prop("disabled", !opcion);

}

function LimpiarVars() {
    tipoOperacion = "new";
    tipoBotonGrid = "editar";
    hdUltimoEgreso = null;
    $("#hdfICodTrabajador").val("");
    $("#hdfRealizaLogin").val(false);

    // Se coloca en blanco el campo oculto del correo
    $("#hdfEmailUsuario").val("");
}

//Todo Comentado
function LimpiarForm(tipoTrabajador) {

    //location.reload(true);
    $(".email").off();

    $("#textoNuevoModificar").text("");

    DesbloquearForm(true);

    LimpiarVars();

    // 28-08-2019 MAGA - VER SI HACE FALTA QUE ESTO SE HAGA CON LA FORMA NUEVA
    //$("[name='chkCredencial']").bootstrapSwitch("disabled", false);
    //$("[name='chkCredencial']").bootstrapSwitch("state", true);
    $("#rdCredencialNo").prop("checked", true);
    $("#rdCredencialSi").prop("disabled", false);
    $("#rdCredencialNo").prop("disabled", false);
    BackgroundCredencial(false);

    document.getElementById("wgridVerTrabajadores").style.display = "none";
    $("#frmNuevoTrabajadorSenainfo").removeData("validator");

    if (tipoTrabajador === "S") {
        $(".direccion").val(null).trigger("change.select2");
        $(".estado-trabajador").val("");
    }

    $(".profesion").val(null).trigger("change");
    $(".paterno").val("");
    $(".materno").val("");
    $(".nombres").val("");
    $(".rut").val("");
    $(".telefono").val("");
    $(".email").val("");
    $(".usuario").val("");

    $(".estamento").val(null).trigger("change");
    $(".cargo").val(null).trigger("change");
    $(".horas").val(0);
    $(".sexo").val(null).trigger("change");
    $(".fechaingreso").val(null);
    $(".vigenciausuario").val("V").trigger("change");
    $(".vigenciatrabajador").val("V").trigger("change");
    $(".rolprincipal").val(null).trigger("change.select2");

    HabilitaModificar(false);
    HabilitaGuardar(true);
    ValidafrmNuevoTrabajadorProyecto($("#frmNuevoTrabajadorSenainfo"));
    $(".proyecto").trigger("change");

    IniciarCheckeoUsuarioMail();
    HabilitarFechaIngreso(true);
    HabilitarLogicaFechaIngreso();
    HabilitarBotonesMail(false);
}

function LimpiarDireccion() {
    $(".direccion").val(null).trigger("change.select2");
}

function LimpiarInstitucionProyecto() {
    $(".institucion").val(null).trigger("change");
    $(".proyecto").val(null).trigger("change");
}

function clsRequired(divtext) {
    var msg = $("#" + divtext);
    msg.parents("div").find("input").removeClass("invalid-input");
    msg.empty();
    msg.removeClass("invalid-feedback");
    msg.parents("div").find("input").unbind("focusin");
}

function showRequired(error, divtext) {
    var msg = $("#" + divtext);
    msg.parents("div").find("input").addClass("invalid-input");
    msg.empty();
    msg.addClass("invalid-feedback");
    document.getElementById(divtext).style.display = "block";
    msg.append(error);

    msg.parents("div").find("input").focusin(function () {
        clsRequired(divtext);
    });
}

function showError(error, divtext) {

    var msg = $("#" + divtext);
    msg.empty();
    document.getElementById(divtext).style.display = "block";

    msg.append(error);
    msg.fadeTo(3000, 500).slideUp(500,
        function () {
            msg.slideUp(500);
        });
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g,
        function (match) {
            return match.toUpperCase();
        });
}

/********* Templates ***********/
function tmplInstitucion(repo) {
    if (repo.loading) return repo.text;

    var region = "<div class='select2-result-repository__description'>Cód : " +
        repo.CodInstitucion +
        ", Rut : " +
        repo.RutInstitucion +
        "</div>";

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__title'>" +
        repo.NombreInstitucion +
        "</div>";

    markup = markup + region + "</div>";

    return markup;
}

function tmplInstitucionSelect(repo) {
    return repo.NombreInstitucion || repo.text;
}

function tmplProyecto(repo) {
    if (repo.loading) return repo.text;

    var region = "<div class='select2-result-repository__description'>Cód. : " + repo.CodProyecto + "</div>";

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__title'>" +
        repo.NombreProyecto +
        "</div>";

    markup = markup + region + "</div>";

    return markup;
}

function tmplProyectoSelect(repo) {
    return repo.NombreProyecto || repo.text;
}

function tmplDireccion(repo) {
    if (repo.loading) return repo.text;

    var region = "<div class='select2-result-repository__description'>" + repo.RegionDescripcion + "</div>";

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__title'>" +
        repo.NombreDireccion +
        "</div>";

    markup = markup + region + "</div>";

    return markup;
}

function tmplDireccionSelect(repo) {
    return repo.NombreDireccion || repo.text;
}

/******* Custom  Search *******/
function matchCustomInstitucion(params, data) {

    if ($.trim(params.term) === "") {
        return data;
    }

    if (typeof data.text === "undefined") {
        return null;
    }

    if ((data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1) ||
        (data.id.indexOf(params.term) > -1) ||
        (data.RutInstitucion.indexOf(params.term) > -1)) {
        var modifiedData = $.extend({}, data, true);
        modifiedData.text += " (matched)";

        return modifiedData;
    }

    return null;
}

function matchCustomProyecto(params, data) {

    if ($.trim(params.term) === "") {
        return data;
    }

    if (typeof data.text === "undefined") {
        return null;
    }

    if ((data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1) || (data.id.indexOf(params.term) > -1)) {
        var modifiedData = $.extend({}, data, true);
        modifiedData.text += " (matched)";

        return modifiedData;
    }

    return null;
}