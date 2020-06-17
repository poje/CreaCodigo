$.fn.select2.defaults.set("theme", "bootstrap");
$.fn.select2.defaults.set("allowClear", "false");
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

/*********** <VAR GLOBALES> ***********/
var baseUrl = "ResolucionProyecto.aspx/";
var requierePlazasUrgencia = false;
var requiereTipoTermino = false;
var adjuntoOffline = null;
var identificadorLicitacionSeleccionado = null;
var hdfIdUsuario = -1;
var hdfCodigoProyectoHijo = "0";
var rutValido = false;
var idctdwn = 0;
var icodCodigoGenerado = 0;
var icodDatoResolucion = null;
var contadorAdjuntoCdp = 0;

/**********<INIT TAB RESOLUCION>*********/
$(document).ready(function () {

    /************ DEFAULTS ***********/
    // Disable search and ordering by default
    $.extend($.fn.dataTable.defaults,
        {
            pageLength: 10,
            autoWidth: false,
            paging: true,
            lengthChange: false,
            pagingType: "numbers",
            ordering: false,
            info: false,
            cache: false,
            searching: false,
            destroy: true,
            scrollX: false,
            language: {
                "url": "../js/localization/dt_es.json"
            }
        });

    jconfirm.defaults = {
        icon: "fa fa-warning",
        title: "CREACIÓN DE CÓDIGO",
        titleClass: "titulo-confirm",
        type: "blue",
        theme: "bootstrap"
    };

    $.when(CreaOfflineId()).done(function (a1) {

        hdfIdUsuario = $("input[id$=hdfIdUsuario]").val();

        CheckPermisos();


        BloquearResolucion(false);
        BloquearAdjudicado(false);
        BloquearGeneraCodigo(false);


        IniciarControles();

    });


    guardarDatosProyectos();

});

/********* <EVENTOS CLICK> *********/
EventosClick = () => {
    $("#btnGuardaResolucion").on("click",
        function (e) {
            e.preventDefault();

            var msg = "";
            var dataListMsg = "";

            var p = CollectDatosResolucion("C", null);

            msg = ValidaDatoResolucion(p, "C");

            dataListMsg = '<dl class="m-1"><dt class="mb-2">Faltan los siguientes items requeridos : </dt>' +
                msg.toString().replace(/,/g, "") +
                "</dl>";

            if (msg.length === 0) {
                // Realizar AJAX al WebMethod
                CreaDatoResolucion(p);
            }
            else {
                $.confirm({
                    title: "DATO RESOLUCIÓN",
                    content: dataListMsg,
                    buttons: {
                        ok: {
                            text: "OK",
                            btnClass: "btn-primary",
                            keys: ["enter"],
                            action: function () {
                                // Nothing to do
                            }
                        }
                    }
                });

            }


        });

    $("#btnAdjuntoResolucion").on("click",
        function (e) {
            e.preventDefault();

            if ($("#lblAdjuntoResolucion").val().includes("pdf"))
                AdjuntarArchivo("R");
            else {
                $.confirm({
                    title: "ADJUNTAR ARCHIVO",
                    content: "Debe EXAMINAR y luego ADJUNTAR el archivo.",
                    buttons: {
                        ok: {
                            text: "OK",
                            btnClass: "btn-primary",
                            keys: ["enter"],
                            action: function () {

                            }
                        }
                    }
                });
            }


        });

    $("#btnAdjuntoProyectoAdjudicado").on("click",
        function (e) {
            e.preventDefault();

            if ($("#lblAdjuntoProyectoAdjudicado").val().includes("pdf"))
                AdjuntarArchivo("PA");
            else {
                $.confirm({
                    title: "ADJUNTAR ARCHIVO",
                    content: "Debe EXAMINAR y luego ADJUNTAR el archivo.",
                    buttons: {
                        ok: {
                            text: "OK",
                            btnClass: "btn-primary",
                            keys: ["enter"],
                            action: function () {

                            }
                        }
                    }
                });
            }


        });

    $("#btnGuardarDatosProyectoAdj").on("click",
        function (e) {
            e.preventDefault();

            var msg = "";
            var dataListMsg = "";

            var p = CollectDatosProyectoAdjudicado("C", null);

            msg = ValidaDatoAdjudicado(p, "C");

            dataListMsg = '<dl class="m-1"><dt class="mb-2">Faltan los siguientes items requeridos : </dt>' +
                msg.toString().replace(/,/g, "") +
                "</dl>";

            if (msg.length === 0) {
                // Realizar AJAX al WebMethod
                CreaDatoAdjudicado(p);
            }
            else {
                $.confirm({
                    title: "PROYECTO ADJUDICADO",
                    content: dataListMsg,
                    buttons: {
                        ok: {
                            text: "OK",
                            btnClass: "btn-primary",
                            keys: ["enter"],
                            action: function () {
                                // Nothing to do
                            }
                        }
                    }
                });

            }


        });

    $("#btnRenovarCodigo").on("click",
        function (e) {
            e.preventDefault();
            CreaCodigoReserva("C", $("#select-codigoGenerar").val(), false);
        });

    $("#btnGenerarCodigo").on("click",
        function (e) {
            e.preventDefault();

            var msg = "";
            var dataListMsg = "";

            clearInterval(idctdwn);
            var p = CollectDatosCodigoGenerado($("#select-codigoGenerar").val());

            msg = ValidaDatoGenerado(p);

            dataListMsg = '<dl class="m-1"><dt class="mb-2">Faltan los siguientes items requeridos : </dt>' +
                msg.toString().replace(/,/g, "") +
                "</dl>";

            if (msg.length === 0) {
                // Realizar AJAX al WebMethod
                CreaCodigoGenerado("C", $("#select-codigoGenerar").val(), p.CodProyecto, p.CodProyectoHijo);
            } else {
                $.confirm({
                    title: "GENERAR CÓDIGO",
                    content: dataListMsg,
                    buttons: {
                        ok: {
                            text: "OK",
                            btnClass: "btn-primary",
                            keys: ["enter"],
                            action: function () {
                                // Nothing to do
                            }
                        }
                    }
                });
            }



        });

    $(".limpiar").on("click",
        function (e) {
            e.preventDefault();
            location.reload(true);
        });

    $('a[data-toggle="tab"]').click(function (e) {

        if ($(this).hasClass("disabled")) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        //if ($(this).hasClass("listaproyectoresolucion")) {
        //    //ListaProyectoResolucionEdicion();
        //};

        //if ($(this).hasClass("listaproyectoadjudicado")) {
        //    //ListaProyectoAdjudicadoEdicion();
        //};

    });

    $("#btnImprimeCodigoGenerado").on("click",
        function (e) {
            e.preventDefault();
            ImprimeComprobante();
        }
    );

    $("#btnEditaResolucionTxt").on("click",
        function (e) {

            e.preventDefault();
            // Ocultar boton Edita (Texto)
            document.getElementById("pnlEditaResolucionTxt").style.display = "none";
            // Ocultar boton Guardar
            document.getElementById("btnGuardaResolucion").style.display = "none";
            // Ocultar Panel de Campso antes de seleccionar
            document.getElementById("pnlDatoResolucion").style.display = "none";
            // Ocultar DDL de Lista Proyectos Licitacion
            document.getElementById("select-listalicitacion").style.display = "none";
            // Mostrar Panel de Proyecto
            document.getElementById("pnlProyectoResolucion").style.display = "inline-block";

        });

    $("#btnEditaAdjudicadoTxt").on("click",
        function (e) {

            e.preventDefault();
            // Ocultar boton Edita (Texto)
            document.getElementById("pnlEditaAdjudicadoTxt").style.display = "none";
            // Ocultar boton Guardar
            document.getElementById("btnGuardarDatosProyectoAdj").style.display = "none";
            // Ocultar Panel de Campo antes de seleccionar
            document.getElementById("pnlDatoAdjudicado").style.display = "none";
            // Ocultar DDL de Lista Proyectos Licitacion
            document.getElementById("select-listalicitacionAdjudicado").style.display = "none";
            // Mostrar Panel de Proyecto
            document.getElementById("pnlProyectoAdjudicado").style.display = "inline-block";

        });


};
/********* </EVENTOS CLICK> *********/

/********* <EVENTOS ARCHIVOS> *********/
$(document).on("change", ":file", function () {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function () {
    $(':file').on('fileselect', function (event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' archivos seleccionados' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });
});
/********* </EVENTOS ARCHIVOS> *********/

function IniciarControles() {
    // Inicializar controles ddl como select2
    //$(".ddl").select2();
    $.when(CargaInstitucionUsuario(), CargaListaLicitacionProyecto("R"), CargaTipoResolucion(), CargaListaLicitacionProyecto("A"), CargaTipoTerminoResolucion(), CargaListaLicitacionProyecto("G")).done(function (a1, a2, a3, a4, a5, a6) {
        InicializaInputMask();
        InicializarDatePickers();

        //TODO
        //if (token o rol , permitido para editar )
        //BloqueoInicial(false);
    });

    EventosClick();
    AgregaValidacionRutInput($(".rut"));
}

/********* <DROPDOWNS> *********/
function CargaInstitucionUsuario() {
    var institucion = $("#select-institucion");
    institucion.empty();
    institucion.unbind();
    institucion.select2("destroy").select2();

    return $.ajax({
        type: "POST",
        url: baseUrl + "ListaInstitucionUsuario",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

        },
        error: function (r) {
            console.log("Ocurrió un error al cargar la Lista de Instituciones");
        }
    }).then(function (data) {

        institucion.select2({
            placeholder: "SELECCIONAR",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodInstitucion;
                    obj.text = obj.text || obj.Nombre;
                    return obj;
                }),
            escapeMarkup: function (markup) {
                return markup;
            },
            matcher: matchCustom,
            templateResult: tmplInstitucionResult,
            allowClear: false

        }).on("change",
            function () {
                if ($(this).val()) {

                }
            });

        if (data.d.length > 0)
            institucion.val(null).trigger("change");

    });
}

function CargaListaLicitacionProyecto(opcion) {

    var p = new Object();
    p.Opcion = opcion;

    var listalicitacion = "";

    switch (opcion) {
        case "R":
            listalicitacion = $("#select-listalicitacion");
            break;
        case "A":
            listalicitacion = $("#select-listalicitacionAdjudicado");
            break;
        case "G":
            listalicitacion = $("#select-codigoGenerar");
            break;
    }

    listalicitacion.empty();
    listalicitacion.unbind();
    listalicitacion.select2("destroy").select2();

    return $.ajax({
        type: "POST",
        url: baseUrl + "ListaLicitacionProyecto",
        data: "{'parameters':'" + JSON.stringify(p) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

        },
        error: function (r) {
            console.log("Ocurrió un error al cargar la Lista de Licitaciones");
        }
    }).then(function (data) {

        listalicitacion.select2({
            placeholder: "SELECCIONAR",
            data: $.map(data.d,
                function (obj) {
                    if (opcion === "R") {
                        obj.id = obj.id || obj.CodLicitacionProyecto;
                        obj.text = obj.text || obj.Descripcion;
                    }

                    if (opcion === "A") {
                        obj.id = obj.id || obj.IcodDatoResolucion;
                        obj.text = obj.text || obj.Descripcion;
                    }

                    if (opcion === "G") {
                        obj.id = obj.id || obj.IcodProyectoAdjudicado;
                        obj.text = obj.text || obj.Descripcion;
                    }

                    return obj;
                }),
            escapeMarkup: function (markup) {
                return markup;
            },
            matcher: matchCustom,
            allowClear: false

        }).on("change",
            function () {
                if ($(this).val()) {

                    if (opcion === "A") { // Adjudicado , debo listar algunos datos
                        ListaDatosResolucion($(this).val());
                    }

                    if (opcion === "R") {
                        //Obtener Nemotecnico
                        ObtenerNemotecnico($(this).val());
                    }

                    if (opcion === "G") { // Tab Generar, debo mostrar panel
                        document.getElementById("pnlInfoGeneraCodigo").style.display = "block";

                        ListaDatoProyectoAdjudicado($(this).val());
                        CreaCodigoReserva("C", $(this).val(), false);
                    }

                }
            }).on("select2:select",
                function (e) {
                    var ddl = e.params.data;
                    identificadorLicitacionSeleccionado = ddl.text;
                });

        if (data.d.length > 0)
            listalicitacion.val(null).trigger("change");

    });
};

function ObtenerNemotecnico(codLicitacionProyecto) {

    $.ajax({
        type: "POST",
        url: baseUrl + "ObtenerNemotecnico",
        data: `{'codLicitacionProyecto': ${codLicitacionProyecto}}`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

        },
        error: function (r) {
            console.log("Ocurrió un error al cargar la Lista de tipo de Resolución");
        }
    }).then(function (data) {
        $("#tbxNemotecnicoRes").val(data.d);
    });
}

function CargaTipoResolucion() {
    var tipoResolucion = $("#select-listatiporesolucion");
    tipoResolucion.empty();
    tipoResolucion.unbind();
    tipoResolucion.select2("destroy").select2();

    return $.ajax({
        type: "POST",
        url: baseUrl + "ListaTipoResolucion",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

        },
        error: function (r) {
            console.log("Ocurrió un error al cargar la Lista de tipo de Resolución");
        }
    }).then(function (data) {

        tipoResolucion.select2({
            placeholder: "SELECCIONAR",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodTipoResolucion;
                    obj.text = obj.text || obj.GlosaResolucion;
                    return obj;
                }),
            escapeMarkup: function (markup) {
                return markup;
            },
            matcher: matchCustom,
            allowClear: false

        }).on("change",
            function () {
                if ($(this).val()) {

                    switch ($(this).val()) {
                        case "3":
                            document.getElementById("pnlTipoTermino").style.display = "block";
                            document.getElementById("pnlPlazasUrgencia").style.display = "none";
                            requiereTipoTermino = true;
                            break;
                        case "4":
                            document.getElementById("pnlPlazasUrgencia").style.display = "block";
                            document.getElementById("pnlTipoTermino").style.display = "none";
                            requierePlazasUrgencia = true;
                            break;
                        default:
                            requiereTipoTermino = false;
                            requierePlazasUrgencia = false;
                            break;
                    }



                }
            });

        //if (data.d.length > 0)
        //    tipoResolucion.val(null).trigger("change");

        tipoResolucion.val(1).trigger("change");

    });
}

function CargaTipoTerminoResolucion() {
    var tipoTermino = $("#select-tipotermino");
    tipoTermino.empty();
    tipoTermino.unbind();
    tipoTermino.select2("destroy").select2();

    return $.ajax({
        type: "POST",
        url: baseUrl + "ListaTipoTerminoResolucion",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

        },
        error: function (r) {
            console.log("Ocurrió un error al cargar la Lista de tipo de Termino de Resolución");
        }
    }).then(function (data) {

        tipoTermino.select2({
            placeholder: "SELECCIONAR",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodTipoTermino;
                    obj.text = obj.text || obj.Descripcion;
                    return obj;
                }),
            escapeMarkup: function (markup) {
                return markup;
            },
            matcher: matchCustom,
            allowClear: false

        }).on("change",
            function () {
                if ($(this).val()) {


                }
            });

        if (data.d.length > 0)
            tipoTermino.val(null).trigger("change");

    });
}

cargadropdownBanco = () => {
    getAjaxDataPromise(ajaxBancos)
        .then(data => {
            cargaSelect2Banco(data);
        })
        .catch(error => {
            console.log("error al cargar dropdown bancos " + error);
        });
};
/********* </DROPDOWNS> *********/

/********* <AJAX CALL'S> *********/
function CreaOfflineId() {

    return $.ajax({
        type: "POST",
        url: baseUrl + "CreaOfflineId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) { },
        error: function (r) {
            console.log("Error al generar el identificador");
        }
    }).then(function (r) {
        adjuntoOffline = r.d;
    });
};

function CreaDatoResolucion(p) {
    return $.ajax({
        type: "POST",
        url: baseUrl + "CreaDatoResolucion",
        data: "{'parameters':'" + JSON.stringify(p) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) { },
        error: function (r) {
            console.log("No se pudo guardar el Dato de Resolución, por favor contacte a Mesa de Ayuda Senainfo.", "msgErrorW");
        }
    }).then(function (data) {

        var r = data.d;

        if (r.Estado == "OK") {

            $.confirm({
                title: "RESOLUCIÓN",
                content: "Se realizó el ingreso de la resolución. Se recargará el Formulario",
                buttons: {
                    ok: {
                        text: "OK",
                        btnClass: "btn-primary",
                        keys: ["enter"],
                        action: function () {
                            location.reload(true);
                        }
                    }
                }
            });
        }

        if (r.Estado.includes("EXISTE")) {

            $.confirm({
                title: "RESOLUCIÓN",
                content: "Ya se ingreso una resolución de APERTURA con estos datos.",
                buttons: {
                    ok: {
                        text: "OK",
                        btnClass: "btn-primary",
                        keys: ["enter"],
                        action: function () {
                            //location.reload(true);
                        }
                    }
                }
            });
        }


    });
}

function CreaDatoAdjudicado(p) {
    return $.ajax({
        type: "POST",
        url: baseUrl + "CreaDatoAdjudicado",
        data: "{'parameters':'" + JSON.stringify(p) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) { },
        error: function (r) {
            console.log("No se pudo guardar el Dato del TAB Proyecto Adjudicado, por favor contacte a Mesa de Ayuda Senainfo.", "msgErrorW");
        }
    }).then(function (data) {
        var r = data.d;

        if (r.Estado == "OK") {

            $.confirm({
                title: "PROYECTO ADJUDICADO",
                content: "Se realizó el ingreso del Proyecto. Se recargará el Formulario",
                buttons: {
                    ok: {
                        text: "OK",
                        btnClass: "btn-primary",
                        keys: ["enter"],
                        action: function () {
                            location.reload(true);
                        }
                    }
                }
            });
        }

    });
}

function CreaCodigoReserva(opcion, icodProyectoAdjudicado, soloDatos) {
    var p = new Object();
    p.Opcion = opcion;
    p.IcodProyectoAdjudicado = icodProyectoAdjudicado;

    return $.ajax({
        type: "POST",
        url: baseUrl + "CreaCodigoReserva",
        data: "{'parameters':'" + JSON.stringify(p) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (!soloDatos)
                MostrarCuentaCodProyecto(r);
        },
        error: function (r) {
            console.log("No se pudo generar el codigo de reserva, por favor contacte a Mesa de Ayuda Senainfo.", "msgErrorW");
        }
    }).then(function (data) {
    });
}

function CreaCodigoGenerado(opcion, icodProyectoAdjudicado, codProyecto, codProyectoHijo) {

    var p = new Object();
    p.Opcion = opcion;
    p.IcodProyectoAdjudicado = icodProyectoAdjudicado;
    p.CodProyecto = codProyecto;
    p.CodProyectoHijo = codProyectoHijo;

    return $.ajax({
        type: "POST",
        url: baseUrl + "CreaCodigoGenerado",
        data: "{'parameters':'" + JSON.stringify(p) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

        },
        error: function (r) {
            console.log("No se pudo generar el codigo, por favor contacte a Mesa de Ayuda Senainfo.", "msgErrorW");
        }
    }).then(function (data) {

        var r = data.d;

        if (r.Estado === "OK") {

            BlockAfterNewCode();

            $.confirm({
                onContentReady: function () {
                    // when content is fetched & rendered in DOM
                    $(".btn-print").prepend('<span class="glyphicon glyphicon-print"> </span>');
                },
                title: "CREACIÓN DE CÓDIGO",
                content: "Se creó el código para el proyecto seleccionado",
                buttons: {
                    ok: {
                        text: "OK",
                        btnClass: "btn-primary",
                        keys: ["enter"],
                        action: function () {
                            //TODO
                            location.reload(true);
                            // DESHABILITAR TODAS LAS TABS
                        }
                    },
                    print: {
                        icon: "glyphicon glyphicon-print",
                        text: " IMPRIMIR COMPROBANTE",
                        btnClass: "btn-success btn-print",
                        action: function () {
                            //TODO
                            // HABILITAR BOTON DE DESCARGA
                            icodCodigoGenerado = r.Id;
                            ImprimeComprobante();
                        }
                    }
                }
            });
        } else {
            $.confirm({
                title: "CREACIÓN DE CÓDIGO",
                content: "Se produjo un ERROR en la creación del código",
                buttons: {
                    ok: {
                        text: "OK",
                        btnClass: "btn-primary",
                        keys: ["enter"],
                        action: function () {
                            //location.reload(true);
                        }
                    }
                }
            });
        }

    });
}

function ListaDatosResolucion(icodDatoResolucion) {

    var p = new Object();
    p.IdUsuario = hdfIdUsuario;
    p.IcodDatoResolucion = icodDatoResolucion;

    return $.ajax({
        type: "POST",
        url: baseUrl + "ListaDatosResolucion",
        data: "{'parameters':'" + JSON.stringify(p) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) { },
        error: function (r) {
            console.log("No se pudo guardar el Dato de Resolución, por favor contacte a Mesa de Ayuda Senainfo.", "msgErrorW");
        }
    }).then(function (data) {
        var d = data.d;


        var fechaInicio = moment(d.FechaInicio).format("DD-MM-YYYY");
        var fechaTermino = moment(d.FechaTermino).format("DD-MM-YYYY");

        $("#tbxFechaInicioProyectpAdj").val(fechaInicio);
        $("#tbxFechaTerminoProyectpAdj").val(fechaTermino);
        $("#tbxRutInstitucionAdj").val(d.RutInstitucion);
        $("#tbxNombreProyectoAdj").val(d.NombreProyecto);


    });
}

function ListaDatoProyectoAdjudicado(icodProyectoAdjudicado) {
    var p = new Object();
    p.IdUsuario = hdfIdUsuario;
    p.IcodProyectoAdjudicado = icodProyectoAdjudicado;

    return $.ajax({
        type: "POST",
        url: baseUrl + "ListaDatoProyectoAdjudicado",
        data: "{'parameters':'" + JSON.stringify(p) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            console.log("No se pudo cargar el proyecto adjudicado, por favor contacte a Mesa de Ayuda Senainfo.", "msgErrorW");
        }
    }).then(function (data) {

        var d = data.d;

        if (d) {
            $("#lblNombreProyecto").text(d.Nombre);
            $("#lblEmailProyecto").text(d.EmailProyecto);
            $("#lblRutInstitucion").text(d.RutInstitucion);
            $("#lblInicio").text(moment(d.FechaInicio).format("DD-MM-YYYY"));
            $("#lblTermino").text(moment(d.FechaTermino).format("DD-MM-YYYY"));
            $("#lblCodigoProyecto").text(d.CodProyecto);
            $("#lblProyectoAdosado").text(d.ProyectoAdosado === 0 ? "NO" : "SI");

            $("#lblNombreDirector").text(d.NombreDirector);
            $("#lblRutDirector").text(d.RutDirector);
            $("#lblTelefono").text(d.Telefono);
            $("#lblBanco").text(d.Banco);
            $("#lblCtaCte").text(d.CuentaCorriente);
        }


    });
}

/********* </AJAX CALL'S> ********/

/********* ADJUNTAR / LISTAR VERIFICADORES ***********/
function AdjuntarArchivo(tipoAdjunto) {

    // R : Resolucion
    // PA : Proyecto Adjudicado
    var tipoVerificador = -1;

    var formFile = new FormData();

    if (tipoAdjunto === "R") {
        var file1 = document.getElementById("fileAdjuntoResolucion").files[0];
        tipoVerificador = 1; // Tipo Resolución 
        formFile.append("AdjuntoResolucion", file1);
        formFile.append("AdjuntoOffline", adjuntoOffline);
        formFile.append("IdUsuario", hdfIdUsuario);
        formFile.append("TipoVerificador", tipoVerificador);
        formFile.append("IcodDatoResolucion", null); // No está disponible aún al no guardar la resolución , OJO al implementar la EDICION.
        formFile.append("IcodProyectoAdjudicado", null);
    }

    if (tipoAdjunto === "PA") {
        var file2 = document.getElementById("fileAdjuntoProyectoAdjudicado").files[0];
        tipoVerificador = 2; // Cuenta Corriente Proyecto Adjudicado
        formFile.append("AdjuntoProyectoAdjudicado", file2);
        formFile.append("AdjuntoOffline", adjuntoOffline);
        formFile.append("IdUsuario", hdfIdUsuario);
        formFile.append("TipoVerificador", tipoVerificador);
        formFile.append("IcodDatoResolucion", null); // No está disponible aún al no guardar la resolución , OJO al implementar la EDICION.
        formFile.append("IcodProyectoAdjudicado", null);
    }

    if (tipoAdjunto === "CDP") {
        var file3 = document.getElementById("fileAdjuntoCdp").files[0];
        tipoVerificador = 3; // Tipo Resolución 
        formFile.append("AdjuntoResolucion", file3);
        formFile.append("AdjuntoOffline", adjuntoOffline);
        formFile.append("IdUsuario", hdfIdUsuario);
        formFile.append("TipoVerificador", tipoVerificador);
        formFile.append("IcodDatoResolucion", null); // No está disponible aún al no guardar la resolución , OJO al implementar la EDICION.
        formFile.append("IcodProyectoAdjudicado", null);

    }

    if (tipoAdjunto === "CMP") {
        var file4 = document.getElementById("fileAdjuntoExcel").files[0];
        tipoVerificador = 4; // Tipo Resolución 
        formFile.append("AdjuntoResolucion", file4);
        formFile.append("AdjuntoOffline", adjuntoOffline);
        formFile.append("IdUsuario", hdfIdUsuario);
        formFile.append("TipoVerificador", tipoVerificador);
        formFile.append("IcodDatoResolucion", null); // No está disponible aún al no guardar la resolución , OJO al implementar la EDICION.
        formFile.append("IcodProyectoAdjudicado", null);
    }


    $.ajax({
        type: 'POST',
        url: "Handler/AdjuntaArchivo.ashx",
        data: formFile,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {

            if (response.includes("correctamente")) {
                if (tipoAdjunto === "R") {
                    document.getElementById("pnlAdjuntarArchivoResolucion").style.display = "block";
                    ListaArchivoTemporal("R");
                    ResetAdjunto("R");
                }

                if (tipoAdjunto === "PA") {
                    document.getElementById("pnlAdjuntarArchivoProyectoAdjudicado").style.display = "block";
                    ListaArchivoTemporal("PA");
                    ResetAdjunto("PA");
                }

                if (tipoAdjunto === "CDP") {
                    document.getElementById("pnlAdjuntarCdp").style.display = "block";
                    contadorAdjuntoCdp++;

                    ListaArchivoTemporal("CDP");
                    ResetAdjunto("CDP");
                }

                if (tipoAdjunto === "CMP") {
                    debugger;
                    document.getElementById("pnlAdjuntarExcel").style.display = "block";
                    ListaArchivoTemporal("CMP");
                    ResetAdjunto("CMP");

                    $.ajax({
                        type: 'POST',
                        url: 'ResolucionProyecto.aspx/CargarProyectosLicitacionExcel',
                        data: `{'rutaVirtual':'${adjuntoOffline}'}`,
                        cache: true,
                        contentType: 'application/json; charset="utf-8"',
                        dataType: 'json',
                        success: function () {
                            alert("archivo leido correctamente");
                        },
                        error: function () {
                        }
                    });
                }


            } else {
                // Manejar algun error al adjuntar el archivo. Por ejemplo : "Caracteres no permitidos"

                $.confirm({
                    title: "ERROR AL ADJUNTAR ARCHIVO",
                    content: response,
                    buttons: {
                        ok: {
                            text: "OK",
                            btnClass: "btn-primary",
                            keys: ["enter"],
                            action: function () {

                            }
                        }
                    }
                });
            }

        },
        error: function (error) {
            console.log("Ocurrió un error al subir el archivo");
        }
    });


}

function ListaArchivoTemporal(tipoAdjunto) {

    switch (tipoAdjunto) {
        case "R":

            if ($.fn.dataTable.isDataTable("#tblAdjuntoResolucion")) {
                $("#tblAdjuntoResolucion").DataTable().destroy();
            }

            $("#tblAdjuntoResolucion tbody").off("click", ".borrar");

            var tableResolucion = $("#tblAdjuntoResolucion").DataTable(
                {
                    "searching": false,
                    "paging": false,
                    "responsive": true,
                    "createdRow": function (row, data, index) {
                        $(row).find('td:eq(0)').addClass("align-middle");
                        $(row).find('td:eq(1)').addClass("align-middle");
                    },
                    "footerCallback": function (tfoot, data, start, end, display) {
                    },
                    "columnDefs": [
                        {
                            "targets": [0], // Id
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": [-1],
                            render: function (data, type, row) {
                                return "<a href='#' class='borrar'>Borrar</a>";
                            }
                        }
                    ],
                    'order': [[1, "asc"]]
                });

            tableResolucion.clear();
            tableResolucion.draw();

            var r = new Object();
            r.AdjuntoOffline = adjuntoOffline;
            r.CodTipoVerificador = 1;

            $.ajax({
                type: "POST",
                url: baseUrl + "ListaArchivoTemporal",
                data: "{'parameters':'" + JSON.stringify(r) + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) { },
                error: function (r) {
                    console.log("Ocurrió un error, por favor contacte a Mesa de Ayuda Senainfo.");
                }
            }).then(function (r) {

                $.each(r.d,
                    function () {

                        tableResolucion.row.add([
                            this.IcodVerificadorAdjunto,
                            this.NombreArchivo,
                            this.TipoVerificador,
                            ""
                        ]);

                    });

                document.getElementById("pnlAdjuntarArchivoResolucion").style.display = "block";

                if (tableResolucion.data().any()) {
                    tableResolucion.columns.adjust().draw();
                } else {
                    tableResolucion.clear();
                    tableResolucion.draw();

                    var $loading = $("#spinner").hide();
                    $loading.hide();
                }

                $("#tblAdjuntoResolucion tbody").on("click",
                    ".borrar",
                    function (evt) {
                        evt.preventDefault();
                        var data = tableResolucion.row($(this).parents('tr')).data();
                        BorraArchivoTemporal(parseInt(data[0]), tipoAdjunto);
                    });

            });
            break;

        case "PA":
            if ($.fn.dataTable.isDataTable("#tblAdjuntoProyectoAdjudicado")) {
                $("#tblAdjuntoProyectoAdjudicado").DataTable().destroy();
            }

            $("#tblAdjuntoProyectoAdjudicado tbody").off("click", ".borrar");

            var tableProyectoAd = $("#tblAdjuntoProyectoAdjudicado").DataTable(
                {
                    "searching": false,
                    "paging": false,
                    "responsive": true,
                    "createdRow": function (row, data, index) {
                        $(row).find('td:eq(0)').addClass("align-middle");
                        $(row).find('td:eq(1)').addClass("align-middle");
                    },
                    "footerCallback": function (tfoot, data, start, end, display) {
                    },
                    "columnDefs": [
                        {
                            "targets": [0], // Id
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": [-1],
                            render: function (data, type, row) {
                                return "<a href='#' class='borrar'>Borrar</a>";
                            }
                        }
                    ],
                    'order': [[1, "asc"]]
                });

            tableProyectoAd.clear();
            tableProyectoAd.draw();

            var pa = new Object();
            pa.AdjuntoOffline = adjuntoOffline;
            pa.CodTipoVerificador = 2;

            $.ajax({
                type: "POST",
                url: baseUrl + "ListaArchivoTemporal",
                data: "{'parameters':'" + JSON.stringify(pa) + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) { },
                error: function (r) {
                    console.log("Ocurrió un error, por favor contacte a Mesa de Ayuda Senainfo.");
                }
            }).then(function (r) {

                $.each(r.d,
                    function () {

                        tableProyectoAd.row.add([
                            this.IcodVerificadorAdjunto,
                            this.NombreArchivo,
                            this.TipoVerificador,
                            ""
                        ]);

                    });

                document.getElementById("pnlAdjuntarArchivoProyectoAdjudicado").style.display = "block";

                if (tableProyectoAd.data().any()) {
                    tableProyectoAd.columns.adjust().draw();
                } else {
                    tableProyectoAd.clear();
                    tableProyectoAd.draw();

                    var $loading = $("#spinner").hide();
                    $loading.hide();
                }

                $("#tblAdjuntoProyectoAdjudicado tbody").on("click",
                    ".borrar",
                    function (evt) {
                        evt.preventDefault();
                        var data = tableProyectoAd.row($(this).parents('tr')).data();
                        BorraArchivoTemporal(parseInt(data[0]), tipoAdjunto);
                    });

            });
            break;

        case "CDP":
            if ($.fn.dataTable.isDataTable("#tblAdjuntoCdp")) {
                $("#tblAdjuntoCdp").DataTable().destroy();
            }

            $("#tblAdjuntoCdp tbody").off("click", ".borrar");

            var tableCdp = $("#tblAdjuntoCdp").DataTable(
                {
                    "searching": false,
                    "paging": false,
                    "responsive": true,
                    "createdRow": function (row, data, index) {
                        $(row).find('td:eq(0)').addClass("align-middle");
                        $(row).find('td:eq(1)').addClass("align-middle");
                    },
                    "footerCallback": function (tfoot, data, start, end, display) {
                    },
                    "columnDefs": [
                        {
                            "targets": [0], // Id
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": [-1],
                            render: function (data, type, row) {
                                return "<a href='#' class='borrar'>Borrar</a>";
                            }
                        }
                    ],
                    'order': [[1, "asc"]]
                });

            tableCdp.clear();
            tableCdp.draw();

            var pa = new Object();
            pa.AdjuntoOffline = adjuntoOffline;
            pa.CodTipoVerificador = 3;

            $.ajax({
                type: "POST",
                url: baseUrl + "ListaArchivoTemporal",
                data: "{'parameters':'" + JSON.stringify(pa) + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) { },
                error: function (r) {
                    console.log("Ocurrió un error, por favor contacte a Mesa de Ayuda Senainfo.");
                }
            }).then(function (r) {

                $.each(r.d,
                    function () {

                        tableCdp.row.add([
                            this.IcodVerificadorAdjunto,
                            this.NombreArchivo,
                            this.TipoVerificador,
                            ""
                        ]);

                    });

                document.getElementById("pnlAdjuntarCdp").style.display = "block";

                if (tableCdp.data().any()) {
                    tableCdp.columns.adjust().draw();
                } else {
                    tableCdp.clear();
                    tableCdp.draw();

                    var $loading = $("#spinner").hide();
                    $loading.hide();
                    contadorAdjuntoCdp = 0;
                }

                $("#tblAdjuntoCdp tbody").on("click",
                    ".borrar",
                    function (evt) {
                        evt.preventDefault();
                        var data = tableCdp.row($(this).parents('tr')).data();
                        BorraArchivoTemporal(parseInt(data[0]), tipoAdjunto);
                    });

            });
            break;
        case "CMP":
            if ($.fn.dataTable.isDataTable("#tblAdjuntoExcel")) {
                $("#tblAdjuntoExcel").DataTable().destroy();
            }

            $("#tblAdjuntoExcel tbody").off("click", ".borrar");

            var tableExcel = $("#tblAdjuntoExcel").DataTable(
                {
                    "searching": false,
                    "paging": false,
                    "responsive": true,
                    "createdRow": function (row, data, index) {
                        $(row).find('td:eq(0)').addClass("align-middle");
                        $(row).find('td:eq(1)').addClass("align-middle");
                    },
                    "footerCallback": function (tfoot, data, start, end, display) {
                    },
                    "columnDefs": [
                        {
                            "targets": [0], // Id
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": [-1],
                            render: function (data, type, row) {
                                return "<a href='#' class='borrar'>Borrar</a>";
                            }
                        }
                    ],
                    'order': [[1, "asc"]]
                });

            tableExcel.clear();
            tableExcel.draw();

            var cmp = new Object();
            cmp.AdjuntoOffline = adjuntoOffline;
            cmp.CodTipoVerificador = 4;

            $.ajax({
                type: "POST",
                url: baseUrl + "ListaArchivoTemporal",
                data: "{'parameters':'" + JSON.stringify(cmp) + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) { },
                error: function (r) {
                    console.log("Ocurrió un error, por favor contacte a Mesa de Ayuda Senainfo.");
                }
            }).then(function (r) {

                $.each(r.d,
                    function () {

                        tableExcel.row.add([
                            this.IcodVerificadorAdjunto,
                            this.NombreArchivo,
                            this.TipoVerificador,
                            ""
                        ]);

                    });

                document.getElementById("pnlAdjuntarExcel").style.display = "block";

                if (tableExcel.data().any()) {
                    tableExcel.columns.adjust().draw();
                } else {
                    tableExcel.clear();
                    tableExcel.draw();

                    var $loading = $("#spinner").hide();
                    $loading.hide();
                }

                $("#tblAdjuntoExcel tbody").on("click",
                    ".borrar",
                    function (evt) {
                        evt.preventDefault();
                        var data = tableExcel.row($(this).parents('tr')).data();
                        BorraArchivoTemporal(parseInt(data[0]), tipoAdjunto);
                    });

            });
            break;
    }



};

function BorraArchivoTemporal(idVerificadorAdjunto, tipoAdjunto) {

    var p = new Object();
    p.IdVerificadorAdjunto = idVerificadorAdjunto;

    $.ajax({
        type: "POST",
        url: baseUrl + "BorraArchivoTemporal",
        data: "{'parameters':'" + JSON.stringify(p) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            ListaArchivoTemporal(tipoAdjunto);
            contadorAdjuntoCdp--;
        },
        error: function (r) {
            showMsg("Ocurrió un error, por favor contacte a Mesa de Ayuda Senainfo.", "msgErrorW");
        }
    }).then(function (r) {

        var data = r.d;

        ResetAdjunto(tipoAdjunto);
    });
};

function ResetAdjunto(tipoAdjunto) {

    switch (tipoAdjunto) {
        case "R":
            $("#fileAdjuntoResolucion").val("");
            $("#lblAdjuntoResolucion").val("");
            break;
        case "PA":
            $("#fileAdjuntoProyectoAdjudicado").val("");
            $("#lblAdjuntoProyectoAdjudicado").val("");
            break;
        default:
            break;
    }

}

/********** <UTILS> ***********/
function CheckPermisos() {

    $('a[data-toggle="tab"]').addClass("disabled");
    $('a[data-toggle="tab"]').addClass("disabledTab");
    $('a[data-toggle="tab"]').addClass("nohover");

    var lecturaTabAnexo1 = $("input[id$=hdfLecturaAnexo1]").val() === "True";
    var lecturaTabLicitacion = $("input[id$=hdfLecturaTabLicitacion]").val() === "True";
    var lecturaTabResolucion = $("input[id$=hdfLecturaTabResolucion]").val() === "True";
    var lecturaTabDatos = $("input[id$=hdfLecturaTabDatos]").val() === "True";
    var lecturaTabGenera = $("input[id$=hdfLecturaTabGenera]").val() === "True";
    var escrituraTabAnexo1 = $("input[id$=hdfEscrituraAnexo1]").val() === "True";
    var escrituraTabLicitacion = $("input[id$=hdfEscrituraTabLicitacion]").val() === "True";
    var escrituraTabResolucion = $("input[id$=hdfEscrituraTabResolucion]").val() === "True";
    var escrituraTabDatos = $("input[id$=hdfEscrituraTabDatos]").val() === "True";
    var escrituraTabGenera = $("input[id$=hdfEscrituraTabGenera]").val() === "True";

    //lecturaTabLicitacion = true;
    //lecturaTabResolucion = false;
    //lecturaTabDatos = false;
    //lecturaTabGenera = false;

    if (lecturaTabAnexo1 || lecturaTabLicitacion || lecturaTabResolucion || lecturaTabDatos || lecturaTabGenera)
        document.getElementById("pnlMain").style.display = "block";

    // RESPETAR ORDEN

    if (lecturaTabAnexo1) {
        document.getElementById("liTabAnexo1").style.display = "block";
        $("#tabDatosAnexo1").removeClass("disabled disabledTab nohover");
        $("#liTabAnexo1").addClass("active");
        $('.nav-tabs a[href="#DatosAnexo1"]').tab("show");
        $("#DatosAnexo1").addClass("in active");
    }

    if (lecturaTabLicitacion) {
        document.getElementById("liTabLicitacionProyecto").style.display = "block";
        $("#tabDatosLicitacionProyecto").removeClass("disabled disabledTab nohover");
        if (!$("#liTabAnexo1").hasClass("active")) {
            //$("#liTabDatosTecnicos").addClass("active");
            $('.nav-tabs a[href="#DatosLicitacion"]').tab("show");
        }
    }

    if (lecturaTabResolucion) {
        document.getElementById("liTabDatosResolucion").style.display = "block";
        $("#tabDatosResolucion").removeClass("disabled disabledTab nohover");
        if (!$("#liTabAnexo1").hasClass("active") && !$("#liTabLicitacionProyecto").hasClass("active")) {
            $('.nav-tabs a[href="#DatosResolucion"]').tab("show");
        }
    }

    if (lecturaTabDatos) {
        document.getElementById("liTabDatosProyecto").style.display = "block";
        $("#tabDatosProyecto").removeClass("disabled disabledTab nohover");
        if (!$("#liTabAnexo1").hasClass("active") && !$("#liTabLicitacionProyecto").hasClass("active") && !$("#liTabDatosResolucion").hasClass("active")) {
            $('.nav-tabs a[href="#DatosProyectoAdjudicado"]').tab("show");
        }
    }

    if (lecturaTabGenera) {
        document.getElementById("liTabGeneracionCodigo").style.display = "block";
        $("#tabGeneraCodigo").removeClass("disabled disabledTab nohover");
        if (!$("#liTabAnexo1").hasClass("active") && !$("#liTabLicitacionProyecto").hasClass("active") && !$("#liTabDatosResolucion").hasClass("active") && !$("#liTabDatosProyecto").hasClass("active")) {
            $('.nav-tabs a[href="#GeneraCodigoProyecto"]').tab("show");
        }
    }
}

function LimpiaDatoResolucion() {

    icodDatoResolucion = null;
    $("#select-listatiporesolucion").val(null).trigger("change");
    $(".nro-resolucion").val("");
    $(".fecha-resolucion").val("");
    $(".fecha-convenio-resol").val("");
    $(".fecha-inicio-resol").val("");
    $(".fecha-termino-resol").val("");

    $(".nro-plazas").val("");
    $("#select-tipotermino").val("");
    adjuntoOffline = CreaOfflineId();
}
function ImprimeComprobante() {
    var filename = "CodigoGenerado_" + icodCodigoGenerado + ".pdf";
    showMsg("Descargando archivo : <b>" + filename + " </b>, por favor ESPERE...", "msgDescargando");
    window.location = "Handler/ImprimeCodigo.ashx?icodCodigoGenerado=" + icodCodigoGenerado;
}

function BlockAfterNewCode() {
    BloquearGeneraCodigo(true);

    document.getElementById("btnGenerarCodigo").style.display = "none";
    document.getElementById("btnRenovarCodigo").style.display = "none";

    $('a[data-toggle="tab"]').addClass("disabled");
    $('a[data-toggle="tab"]').addClass("disabledTab");
    $('a[data-toggle="tab"]').addClass("nohover");

    document.getElementById("btnImprimeCodigoGenerado").disabled = false;

}

function MostrarCuentaCodProyecto(data) {

    document.getElementById("btnRenovarCodigo").style.display = "none";

    var countDownDate = new Date();
    countDownDate.setMinutes(countDownDate.getMinutes() + 5);

    var endDate = countDownDate.getTime();

    var r = data.d;

    if (r.Estado.includes("OK")) {
        $("#lblCodigoProyecto").text(r.CodigoProyecto);
        $("input[id$=hdfCodigoProyectoHijo]").val(r.CodigoProyectoHijo);
    }

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = endDate - now;

        // Time calculations for days, hours, minutes and seconds
        //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (minutes !== 0)
            document.getElementById("countdownCodProyecto").innerHTML = "El codigo de Proyecto reservado caducará en : " + minutes + "m " + seconds + "s ";
        else
            document.getElementById("countdownCodProyecto").innerHTML = "El codigo de Proyecto reservado caducará en : " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdownCodProyecto").innerHTML = "";
            document.getElementById("btnRenovarCodigo").style.display = "inline-block";
            $("#lblCodigoProyecto").text("0");
            $("input[id$=hdfCodigoProyectoHijo]").val("0");

        }
    }, 1000);

    idctdwn = x;
}

function CollectDatosResolucion(opcion, codProyecto) {
    var p = new Object();

    if (opcion === "C") {
        p.IcodDatoResolucion = icodDatoResolucion;

        p.CodTipoResolucion = $("#select-listatiporesolucion").val();
        p.CodProyecto = null;
        p.CodLicitacionProyecto = $("#select-listalicitacion").val();
        p.CodTipoTermino = $("#select-tipotermino").val();
        p.IdentificadorResolucion = identificadorLicitacionSeleccionado;
        p.NumeroResolucion = $(".nro-resolucion").val();
        p.IcodVerificadorOffline = adjuntoOffline;
        p.FechaResolucion = $(".fecha-resolucion").val();
        p.FechaConvenio = $(".fecha-convenio-resol").val();
        p.FechaInicio = $(".fecha-inicio-resol").val();
        p.FechaTermino = $(".fecha-termino-resol").val();
        p.CodInstitucion = $("#select-institucion").val();
        p.NombreProyecto = $("#tbxNombreProyectoRes").val();
        p.DireccionProyecto = $("#tbxDireccionProyectoRes").val();

        if (p.CodTipoResolucion !== null && p.CodTipoResolucion.toString() === "4")
            p.NumeroPlazas = $(".nro-plazas").val();
        else
            p.NumeroPlazas = null;

        if (p.CodTipoResolucion !== null && p.CodTipoResolucion.toString() === "3")
            p.CodTipoTermino = $("#select-tipotermino").val();
        else
            p.CodTipoTermino = null;

    }

    if (opcion === "U") {
        p.CodTipoResolucion = null;
        p.CodProyecto = codProyecto;
        p.CodLicitacionProyecto = $("#select-listalicitacion").val();
        p.CodTipoTermino = $("#select-tipotermino").val();
        p.IdentificadorResolucion = identificadorLicitacionSeleccionado;
        p.NumeroResolucion = $(".nro-resolucion").val();
        p.IcodVerificadorOffline = adjuntoOffline;
        p.FechaResolucion = $(".fecha-resolucion").val();
        p.FechaConvenio = $(".fecha-convenio-resol").val();
        p.FechaInicio = $(".fecha-inicio-resol").val();
        p.FechaTermino = $(".fecha-termino-resol").val();
        p.NombreProyecto = $("#tbxNombreProyectoRes").val();

        if (p.CodTipoResolucion !== null && p.CodTipoResolucion.toString() === "4")
            p.NumeroPlazas = $(".nro-plazas").val();
        else
            p.NumeroPlazas = null;

        if (p.CodTipoResolucion !== null && p.CodTipoResolucion.toString() === "3")
            p.CodTipoTermino = $("#select-tipotermino").val();
        else
            p.CodTipoTermino = null;

    }

    return p;
}

function CollectDatosProyectoAdjudicado(opcion, codProyecto) {
    var p = new Object();

    if (opcion === "C") {
        p.IcodDatoResolucion = $("#select-listalicitacionAdjudicado").val();
        p.CodProyecto = null;
    } else {
        p.IcodDatoResolucion = null;
        p.CodProyecto = codProyecto;
    }


    p.Nombre = $("#tbxNombreProyectoAdj").val();
    p.EmailProyecto = $("#tbxMailProyectoAdj").val();
    p.RutInstitucion = $("#tbxRutInstitucionAdj").val();
    p.FechaInicio = $("#tbxFechaInicioProyectpAdj").val();
    p.FechaTermino = $("#tbxFechaTerminoProyectpAdj").val();

    p.Telefono = $("#tbxTelefonoProyectpAdj").val();
    p.NombreDirector = $("#tbxNombreDirectorProyectpAdj").val();
    p.RutDirector = $("#tbxRutDirectorProyectoAdj").val();
    p.CelularDirector = "";
    p.CuentaCorriente = $("#tbxCtaCteAdj").val();
    p.CodBanco = $("#select-bancoAdj").val();
    p.IcodVerificadorOffline = adjuntoOffline;

    return p;
}

function CollectCodProyectoAdosado(data) {
    var d = data.d;
    if (r.Estado.includes("OK"))
        return d.Id;
    else
        return 0;
}

function CollectDatosCodigoGenerado(icodProyectoAdjudicado) {

    var p = new Object();
    p.IcodProyectoAdjudicado = icodProyectoAdjudicado;
    p.CodProyecto = $("#lblCodigoProyecto").text();
    p.CodProyectoHijo = null;
    p.ProyectoAdosado = $("#lblProyectoAdosado").text();

    if (p.ProyectoAdosado === "SI") {
        // Solicitar Reserva de Codigo Nuevamente
        //p.CodProyectoHijo = CreaCodigoReserva("C", icodProyectoAdjudicado, true);
        p.CodProyectoHijo = $("input[id$=hdfCodigoProyectoHijo]").val();
    }

    return p;
}

function BloqueoInicial(opcion) {
    $(".fecha-resolucion").attr("disabled", opcion);
    $(".fecha-convenio-resol").attr("disabled", opcion);
    $(".fecha-inicio-resol").attr("disabled", opcion);
    $(".fecha-termino-resol").attr("disabled", opcion);
};

function BloquearResolucion(opcion) {

    if (opcion === true) {
        //var d = document.getElementById("crdAntecedente");
        //d.className += " bg-light";

        //document.getElementById("tbxNumeroCaso").removeAttribute("readonly");
    }

    var arrVariablesResolucion = [
        "select-listalicitacion",
        "nro-resolucion",
        "fecha-resolucion",
        "fecha-convenio-resol",
        "fecha-inicio-resol",
        "fecha-termino-resol",
        "btnAdjuntoResolucion",
        "pnlPlazasUrgencia",
        "btnGuardaResolucion",
        "select-tipotermino",
        "tbxNombreProyectoRes",
        "tbxDireccionProyectoRes",
        "select-institucion"
    ];

    arrVariablesResolucion.forEach(
        function (currentValue, index) {
            document.getElementById(currentValue).disabled = opcion;
        }
    );
}

function BloquearAdjudicado(opcion) {

    if (opcion === true) {
        //var d = document.getElementById("crdAntecedente");
        //d.className += " bg-light";

        //document.getElementById("tbxNumeroCaso").removeAttribute("readonly");
    }

    var arrVariablesAdjudicado = [
        "select-listalicitacionAdjudicado",
        "tbxMailProyectoAdj",
        "tbxFechaInicioProyectpAdj",
        "tbxFechaTerminoProyectpAdj",
        "tbxTelefonoProyectpAdj",
        "tbxNombreDirectorProyectpAdj",
        "tbxRutDirectorProyectoAdj",
        "select-bancoAdj",
        "tbxCtaCteAdj",
        "btnAdjuntoProyectoAdjudicado",
        "btnGuardarDatosProyectoAdj"
    ];

    arrVariablesAdjudicado.forEach(
        function (currentValue, index) {
            document.getElementById(currentValue).disabled = opcion;
        }
    );
}

function BloquearGeneraCodigo(opcion) {

    if (opcion === true) {
        // Nothing to do
    }

    var arrVariablesGenera = [
        "select-codigoGenerar",
        "btnGenerarCodigo"
    ];

    arrVariablesGenera.forEach(
        function (currentValue, index) {
            document.getElementById(currentValue).disabled = opcion;
        }
    );
}

function AgregaValidacionRutInput(obj) {
    rutValido = false;

    if (obj.length > 0) {
        obj.Rut({
            on_error: function () {
                rutValido = false;
                $(".rut").val("");
                $.confirm({
                    title: "RUT",
                    content: "Rut Inválido",
                    buttons: {
                        ok: {
                            text: "OK",
                            btnClass: "btn-primary",
                            keys: ["enter"],
                            action: function () {
                                // Nothing to do
                            }
                        }
                    }
                });
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

function showMsg(error, divtext) {

    var msg = $("#" + divtext);
    msg.empty();
    document.getElementById(divtext).style.display = "block";

    msg.append(error);
    msg.fadeTo(3000, 500).slideUp(500,
        function () {
            msg.slideUp(500);
        });
}

/********* VALIDACIONES ***********/
function ValidaDatoResolucion(p, opcion) {
    var msg = [];
    var strstartdd = '<dd class="small"><i class="fa fa-times mr-1"></i>';
    var strenddd = "</dd>";

    if (!p.CodTipoResolucion) {
        msg.push(strstartdd + " Debe incluir el Tipo de Resolución" + strenddd);
    }

    if (opcion === "C") {
        if (!p.CodLicitacionProyecto) {
            msg.push(strstartdd + " Debe escoger una Licitación" + strenddd);
        }

        if (!p.IdentificadorResolucion) {
            msg.push(strstartdd + " Debe escoger una Licitación" + strenddd);
        }
    }

    if (!p.NumeroResolucion) {
        msg.push(strstartdd + " Debe incluir un Número de Resolución" + strenddd);
    }

    if (!p.FechaConvenio) {
        msg.push(strstartdd + " Debe incluir la Fecha de Convenio" + strenddd);
    }

    if (!p.FechaResolucion) {
        msg.push(strstartdd + " Debe incluir la Fecha de Resolución" + strenddd);
    }


    if (!p.FechaInicio) {
        msg.push(strstartdd + " Debe incluir la Fecha de Inicio" + strenddd);
    }

    if (!p.FechaTermino) {
        msg.push(strstartdd + " Debe incluir la Fecha de Termino" + strenddd);
    }


    if ((p.CodTipoResolucion !== null && p.CodTipoResolucion.toString() === "4") && (p.NumeroPlazas === null)) {
        msg.push(strstartdd + " Debe incluir el número de Plazas" + strenddd);
    }

    if ((p.CodTipoResolucion !== null && p.CodTipoResolucion.toString() === "3") && (p.CodTipoTermino === null)) {
        msg.push(strstartdd + " Debe especificar el tipo de Termino de Resolución" + strenddd);
    }

    if (!p.DireccionProyecto) {
        msg.push(strstartdd + " Debe incluir la Dirección" + strenddd);
    }

    return msg;
}

function ValidaDatoAdjudicado(p, opcion) {
    var msg = [];
    var strstartdd = '<dd class="small"><i class="fa fa-times mr-1"></i>';
    var strenddd = "</dd>";

    if (opcion === "C") {
        if (!p.IcodDatoResolucion) {
            msg.push(strstartdd + " Debe elegir un Proyecto Adjudicado" + strenddd);
        }
    }

    if (!p.Nombre) {
        msg.push(strstartdd + " Debe escribir un Nombre de Proyecto" + strenddd);
    }

    if (!p.EmailProyecto) {
        msg.push(strstartdd + " Debe escribir un Email del Proyecto" + strenddd);
    }

    if (!p.FechaInicio) {
        msg.push(strstartdd + " Debe existir una Fecha de Inicio" + strenddd);
    }

    if (!p.FechaTermino) {
        msg.push(strstartdd + " Debe existir una Fecha de Termino" + strenddd);
    }

    if (!p.Telefono) {
        msg.push(strstartdd + " Debe incluir Teléfono" + strenddd);
    }

    if (!p.NombreDirector) {
        msg.push(strstartdd + " Debe incluir Nombre del Director" + strenddd);
    }

    if (!p.RutDirector) {
        msg.push(strstartdd + " Debe incluir Rut del Director" + strenddd);
    }

    if (!p.RutInstitucion) {
        msg.push(strstartdd + " Debe incluir Rut de la Institución" + strenddd);
    }

    if (!p.CuentaCorriente) {
        msg.push(strstartdd + " Debe incluir N° de Cuenta Corriente" + strenddd);
    }

    if (!p.CodBanco) {
        msg.push(strstartdd + " Debe elegir un Banco" + strenddd);
    }

    return msg;
}

function ValidaDatoGenerado(p) {
    var msg = [];
    var strstartdd = '<dd class="small"><i class="fa fa-times mr-1"></i>';
    var strenddd = "</dd>";

    if (p.CodProyecto === "0") {
        msg.push(strstartdd + " Debe RENOVAR el código proyecto ya que fue caducado" + strenddd);
        //Por seguridad muestro el boton de Renovar Codigo
        clearInterval(idctdwn);

        document.getElementById("countdownCodProyecto").innerHTML = "";
        document.getElementById("btnRenovarCodigo").style.display = "inline-block";
    }

    return msg;
}

function guardarDatosProyectos() {
    $("#btnGuardarDatosProyectos").on("click", (e) => {
        e.preventDefault();

        var formularioResoluciones = new FormData();
        var archivoCuentaCorriente = $(".archivo-cuenta-corriente")[0].files[0];

        formularioResoluciones.append('ArchivoCuentaCorriente', archivoCuentaCorriente);
        //formularioResoluciones.append('IdUsuario', 69044);

        $.ajax({
            type: 'POST',
            url: "Handler/GuardarArchivo.ashx",
            data: formularioResoluciones,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                //Guardar datos en tabla de validación
                var verificadorAdjunto = new VerificadorAdjunto(0, 2, response.CodArchivo, response.NombreArchivo, 0, new Date(), 'V');
                ajaxGuardarVerificadorAdjunto.data = JSON.stringify({ verificadorAdjunto: verificadorAdjunto });

                if (response.CodArchivo !== 0) {
                    $.ajax({
                        type: 'POST',
                        url: ajaxGuardarVerificadorAdjunto.url,
                        data: ajaxGuardarVerificadorAdjunto.data,
                        contentType: 'application/json',
                        success: (response) => {

                            //Guardar datos en tabla de datos de proyectos
                            var datosProyecto = new DatosProyecto();
                            datosProyecto.iCodVerificadorAdjunto = response.d;
                            datosProyecto.iCodDatoResolucion = 1; //Reemplazar por valor correspondiente a la resolución asociada.
                            ajaxGuardarDatosProyectos.data = JSON.stringify({ datosProyecto: datosProyecto });

                            $.ajax({
                                type: 'POST',
                                url: ajaxGuardarDatosProyectos.url,
                                data: ajaxGuardarDatosProyectos.data,
                                contentType: 'application/json',
                                success: (response) => {
                                    console.log(response);
                                },
                                error: (error) => {
                                    console.log(error);
                                }
                            });
                        },
                        error: (error) => {
                            console.log(error);
                        }
                    });
                } else {
                    alertify.alert(`Ha habido un error al Adjuntar el archivo : ${response.mensajeRespuestaSubida}`);
                }
            },
            error: function (error) {
                alert(error.message);
            }
        });
    });
}

InicializaInputMask = () => {

    $(".nro-resolucion").inputmask({
        regex: "\\d+",
        mask: "[9999999]"
    });

    $(".fecha").inputmask({
        regex: "^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$",
        mask: "[99-99-9999]"
    });

    $(".fecha-termino").inputmask({
        regex: "^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$",
        mask: "[99-99-9999]"
    });

};

inicializarControlFechas = () => {
    cargaDatepicker(
        $(".fecha-licitacion"),
        new Date(
            moment(new Date(moment().year() - 1, 0, 1), "DD-MM-YYYY").format()
        ),
        new Date($.now()),
        (dateText, inst) => {
            this.dateText = dateText.substr(0, 10);

            $(".fecha-licitacion").val(this.dateText);

            $(".fecha-resolucion").val("");
            $(".fecha-termino-proyecto").val("");
            $(".fecha-inicio-proyecto").val("");

            $(".fecha-resolucion").attr("disabled", false);
        }
    );

    $(".fecha-licitacion").on("change", (e) => {
        var m = moment(new Date().now);
        var mEvent = moment(new Date(e.target.value));

        console.log(m.year());
        console.log(mEvent.year());

        if (mEvent.year() <= m.year()) {
            if (!mEvent.isValid()) {
                $(".fecha-licitacion").val("");
            }
        }
    });
};


InicializarDatePickers = () => {

    cargaDatepicker(
        $(".fecha"),
        new Date(
            moment(new Date(moment().year() - 1, 0, 1), "DD-MM-YYYY").format()
        ),
        new Date($.now()),
        (dateText, inst) => {
            //On SELECT
        }
    );

    cargaDatepicker(
        $(".fecha-termino"),
        new Date(
            moment(new Date(moment().year() - 1, 0, 1), "DD-MM-YYYY").format()
        ),
        new Date(
            moment(new Date(moment().year() + 10, 0, 1), "DD-MM-YYYY").format()
        )
    );

};


/********* <MATCHER> **********/
function matchCustom(params, data) {

    if ($.trim(params.term) === "") {
        return data;
    }

    if (typeof data.text === "undefined") {
        return null;
    }

    if ((data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1) || (data.id.indexOf(params.term) > -1)) {
        var modifiedData = $.extend({}, data, true);
        modifiedData.text += ' (Encontrado)';

        return modifiedData;
    }

    return null;
}

/********* TEMPLATES ***********/
function tmplInstitucionResult(repo) {
    if (repo.loading) return repo.text;

    var texto = "<div class='select2-result-repository__description'>Código : " +
        repo.CodInstitucion + ", Rut : " + repo.RutInstitucion +
        "</div>";

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__title'>" +
        "<b>" +
        repo.Nombre +
        "</b>" +
        "</div>";

    markup = markup + texto + "</div>";

    return markup;
}