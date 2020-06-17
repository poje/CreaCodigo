/******* Iniciar Select2 ******/
$.fn.select2.defaults.set("theme", "bootstrap");
$.fn.select2.defaults.set("allowClear", "true");
$.fn.modal.Constructor.prototype.enforceFocus = function() {};
$.fn.select2.defaults.set("language",
    {
        errorLoading: function() {
            return "<span>Error en la carga</span>";
        },
        loadingMore: function() {
            return "Cargando más resultados...";
        },
        noResults: function() {
            return "No se encontraron resultados";
        },
        searching: function() {
            return "<span><i class='fa fa-spin fa-spinner'></i>Buscando...</span>";
        }
    });

$.fn.bootstrapSwitch.defaults.size = "small";
$.fn.bootstrapSwitch.defaults.onColor = "warning";
$.fn.bootstrapSwitch.defaults.offColor = "warning";

$.validator.setDefaults({
    submitHandler: function() {
        alert("submitted!");
    }
});

//override defaults
//alertify.defaults.transition = "slide";
alertify.defaults.theme.ok = "btn btn-primary";
alertify.defaults.theme.cancel = "btn btn-danger";
alertify.defaults.theme.input = "form-control";

/******* Globales *******/
var base = "RegistroTrabajadorProyecto.aspx";
var dataVigencia = [{ id: "V", text: "VIGENTE" }, { id: "C", text: "CADUCADO" }];
var dataSexo = [{ id: "H", text: "HOMBRE" }, { id: "M", text: "MUJER" }];
var rutValido = false;
var formMode = "new";
var activeTab = "lnkTabTrabajadorProyecto";

function OnInit() {

    $('a[data-toggle="tab"]').on('shown.bs.tab',
        function(e) {
            activeTab = $(e.target).attr('id');
        });

    IniciarSpinner();
    IniciarGridListarTrabajadores();

    var hdCodDireccionRegional = $("input[id$=hdfCodDireccionRegional]").val();
    IniciarSimpleSelect($(".sexo"), dataSexo, "Selecciona Sexo");

    ListarProyecto(hdCodDireccionRegional);

    EventosInicial();
    EventosModalRegistroTrabajador();

}

function EventosInicial() {

    // Validaciones Form Nuevo Trabajador
    var formNuevo = $("#frmNuevoTrabajador");
    ValidafrmNuevoTrabajador(formNuevo);

    var formEliminar = $("#frmEliminarTrabajador");
    ValidafrmEliminarTrabajador(formEliminar);

    // Validaciones Form Nuevo Trabajador Senainfo
    var formNuevoSenainfo = $("#frmNuevoTrabajadorSenainfo");
    ValidafrmNuevoTrabajadorSenainfo(formNuevoSenainfo);

    // Evento Agregar Registro Trabajador
    $("#btnTrabajadorProyecto").click(function(e) {
        formMode = "new";
        $("#btnAgregarRegistroTrabajador")
            .html("<i class='fa fa-floppy-o' aria-hidden='true'></i> Agregar Registro");
        $("#mdlRegistroTrabajador").modal("show");
    });


}

function EventosModalRegistroTrabajador() {

    ListarProfesionOficio();
    ListarCargo();

    AgregaValidacionRutInput($("#tbxRutTrabajador"));

    $("#tbxRutTrabajador").change(function() {
        $(this).trigger("blur");
    });

    // Evento Agregar Registro Trabajador
    $("#btnAgregarRegistroTrabajador").click(function(e) {

        var form = $("#frmNuevoTrabajador");

        switch (formMode) {
        case "new":
            if (form.valid()) { /* Form Valido */
                $("#btnAgregarRegistroTrabajador").prop("disabled", true);
                var paramNew = BindingParamNoLogin("new");
                CrearTrabajadorNoLogin(paramNew);
            }
            break;
        case "edit":
            if (form.valid()) { /* Form Valido */
                $("#btnAgregarRegistroTrabajador").prop("disabled", true);
                var paramEdit = BindingParamNoLogin("edit");
                ActualizarTrabajadorNoLogin(paramEdit);
            }
            break;
        }

    });

    $("#btnEliminarTrabajador").click(function(e) {

        var form = $("#frmEliminarTrabajador");

        if (form.valid()) {
            $("#btnEliminarTrabajador").prop("disabled", true);
            var paramDel = BindingParamNoLogin("delete");
            EliminarTrabajadorNoLogin(paramDel);
        }
    });

    $(".cerrar_rt").click(function(e) {
        LimpiarModalRegistroTrabajador();
    });

    // Validacion Telefono
    $(".telefono").inputmask({ "mask": "9[9]-9999999[9]" }); //specifying options

    var evtSpace = jQuery.Event("keydown");
    evtSpace.which = 32;

    $(".telefono").keyup(function(e) {

        var x = $(this).val();

        if ($(this).val().charAt(0) === "9" && e.keyCode === 57 && x.match(/\d/g).length === 1) {

            $(this).val(x.substring(0, 1) + " ");
            $(".telefono").trigger(evtSpace);
        }

    });

}

function IniciarGridListarTrabajadores() {

    var table = $("#gridVerTrabajadores").DataTable(
        {
            "autoWidth": false,
            "paging": true,
            "lengthChange": false,
            "pagingType": "numbers",
            "ordering": false,
            "info": false,
            "cache": true,
            "searching": false,
            "language": {
                "search": "Buscar",
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se han encontrado resultados",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No se han encontrado resultados"
            },
            "dom": 'Bfrtip',
            buttons: [
                {
                    extend: "excelHtml5",
                    dom: "<'floatRight'B><'clear'>frtip",
                    text: "<i class='fa fa-file-excel-o'></i> Exportar Excel"
                }
            ],
            "createdRow": function(row, data, index) {
                //$("td", row).eq(0).html(index + 1);

                if (data[3].length > 60) {
                    $("td", row).eq(3).html(data[3].substring(0, 60) + "...");
                }

            },
            "footerCallback": function(tfoot, data, start, end, display) {
            },
            "columnDefs": [
                {
                    "targets": [-2],
                    render: function(data, type, row) {
                        return "<button class='editar-trabajador' title='Editar Trabajador'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button>";
                    }
                },
                {
                    "targets": [-1],
                    render: function(data, type, row) {
                        return "<button class='eliminar-trabajador' title='Eliminar Trabajador'><i class='fa fa-user-times' aria-hidden='true'></i></button>";
                    }
                }
            ]
        });

    //Editar Trabajador asociado al Proyecto
    $("#gridVerTrabajadores tbody").on("click",
        ".editar-trabajador",
        function(evt) {
            var data = table.row($(this).parents("tr")).data();
            if (data[5] === "No") {
                evt.preventDefault();

                formMode = "edit";

                var idTrabajador = parseInt(data[0]);
                var rutTrabajador = data[2].toString();
                var codProyecto = $("#ddl-proyecto").select2("data")[0].id;

                ModificarTrabajadorProyecto(idTrabajador, rutTrabajador, codProyecto);
                $("#mdlRegistroTrabajador").attr("data-idtrabajador", idTrabajador);
                $("#mdlRegistroTrabajador").modal({ cache: false }, "show");

            } else {
                evt.preventDefault();
                alertify.alert("SENAINFO",
                    "No puedes MODIFICAR un Trabajador con acceso a Senainfo desde este formulario.",
                    function() {
                    });
                $(this).prop("disabled", true);
            }
        });

    $("#gridVerTrabajadores tbody").on("click",
        ".eliminar-trabajador",
        function(evt) {
            var data = table.row($(this).parents("tr")).data();
            if (data[5] === "No") {
                evt.preventDefault();

                formMode = "delete";

                var idTrabajador = parseInt(data[0]);
                var rutTrabajador = data[2];

                $("#mdlEliminarTrabajador").modal("show");
                $("#mdlEliminarTrabajador").attr("data-idtrabajador", idTrabajador);
                $("#mdlEliminarTrabajador").attr("data-ruttrabajador", rutTrabajador);

                ListarCausalEgreso();

            } else {
                evt.preventDefault();
                alertify.alert("SENAINFO",
                    "No puedes ELIMINAR un Trabajador con acceso a Senainfo desde este formulario.",
                    function() {
                    });

                $(this).prop("disabled", true);
            }
        });
}

function IniciarSpinner() {
    var $loading = $("#spinner").hide();

    $(document)
        .ajaxStart(function() {
            $loading.show();
        })
        .ajaxStop(function() {
            $loading.hide();
        });
}

function IniciarSimpleSelect(control, data, placeHolder) {
    control.select2({
        data: data,
        minimumResultsForSearch: 10,
        allowClear: false
    });
}

/******* GRID LISTAR *******/

function ListarTrabajador(table, codProyecto) {

    var parameters = new Object();
    parameters.IdTrabajador = null;
    parameters.RutTrabajador = null;
    parameters.CodDireccionRegional = null;
    parameters.CodProyecto = codProyecto;

    table.clear();
    table.draw();

    $.ajax({
        type: "POST",
        url: base + "/ListarTrabajador",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {},
        error: function(r) {
            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
        }
    }).then(function(r) {

        $.each(r.d,
            function() {

                var usuarioSenainfo = "No";
                if (this.RealizaLogin)
                    usuarioSenainfo = "Sí";

                table.row.add([
                    this.IdTrabajador,
                    this.NombreTrabajador,
                    this.RutTrabajador,
                    this.NombreInstitucion,
                    this.Cargo,
                    usuarioSenainfo,
                    this.IndVigencia,
                    "",
                    ""
                ]);

            });

        if (table.data().any()) {
            table.draw();

        } else {
            table.clear();
            table.draw();


            var $loading = $("#spinner").hide();
            $loading.hide();
        }

    });

}

function ModificarTrabajadorProyecto(idTrabajador, rutTrabajador, codProyecto) {

    var parameters = new Object();
    parameters.IdTrabajador = idTrabajador;
    parameters.RutTrabajador = rutTrabajador;
    parameters.CodDireccionRegional = null;
    parameters.CodProyecto = codProyecto;

    $.ajax({
        type: "POST",
        url: base + "/ListarTrabajador",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {},
        error: function(r) {
            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
        }
    }).then(function(r) {

        $("#btnAgregarRegistroTrabajador")
            .html("<i class='fa fa-floppy-o' aria-hidden='true'></i> Modificar Registro");

        $.each(r.d,
            function() {
                //TODO , binding formulario Modal Popup
                $("#ddl-proyecto").val(this.CodProyecto);
                $("#ddl-proyecto").trigger("change.select2");

                $("#ddl-profesion").val(this.CodProfesion);
                $("#ddl-profesion").trigger("change.select2");

                $("#tbxApellidoPaterno").val(this.Paterno.toUpperCase());
                $("#tbxApellidoMaterno").val(this.Materno.toUpperCase());
                $("#tbxNombreTrabajador").val(this.Nombres.toUpperCase());

                $("#tbxRutTrabajador").val($.Rut.formatear(this.RutTrabajador));
                $("#tbxRutTrabajador").trigger("blur");


                $("#tbxTelefono").val(this.Telefono);
                $("#tbxTelefono").trigger("blur");

                $("#ddl-cargo").val(this.CodCargo);
                $("#ddl-cargo").trigger("change.select2");
                $("#tbxHorasComprometidas").val(this.HorasComprometidas);

                $("#ddl-sexo").val(this.Sexo);
                console.log(this.Sexo);
                $("#ddl-sexo").trigger("change.select2");

            });

    });
}

/******* DROP DOWN LISTAR *******/
function ListarProfesionOficio() {

    var profesion = $(".profesion");
    $.ajax({
        type: "POST",
        url: base + "/ListarProfesionOficio",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {
        },
        error: function(r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function(data) {

        profesion.select2({
            placeholder: "Selecciona una Profesión u Oficio",
            data: $.map(data.d,
                function(obj) {
                    obj.id = obj.id || obj.CodProfesion;
                    obj.text = obj.text || obj.Descripcion;
                    return obj;
                }),
            cache: true,
            escapeMarkup: function(markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function() {
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
        success: function(r) {
        },
        error: function(r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function(data) {

        cargo.select2({
            placeholder: "Selecciona un Cargo",
            data: $.map(data.d,
                function(obj) {
                    obj.id = obj.id || obj.CodCargo;
                    obj.text = obj.text || obj.Descripcion;
                    return obj;
                }),
            cache: true,
            escapeMarkup: function(markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function() {
                if ($(this).val()) {
                    $(this).trigger("blur");
                }
            }
        );

        cargo.val(null);
        cargo.trigger("change");

    });
}

function ListarCausalEgreso() {
    var causalEgreso = $("#ddl-CausalEgreso");
    $.ajax({
        type: "POST",
        url: base + "/ListarCausalEgreso",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {
        },
        error: function(r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function(data) {

        causalEgreso.select2({
            placeholder: "Selecciona una Causal de Egreso",
            data: $.map(data.d,
                function(obj) {
                    obj.id = obj.id || obj.CodCausalEgreso;
                    obj.text = obj.text || obj.DescripcionCausalEgreso;
                    return obj;
                }),
            cache: true,
            escapeMarkup: function(markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function() {
                if ($(this).val()) {
                    $(this).trigger("blur");
                }
            }
        );

        causalEgreso.val(null);
        causalEgreso.trigger("change");

    });
}

function ListarProyecto(codDireccionRegional) {

    var parameters = new Object();
    parameters.codDireccionRegional = codDireccionRegional;
    parameters.codProyecto = null;

    var proyecto = $(".proyecto");
    proyecto.empty();
    proyecto.unbind();

    $.ajax({
        type: "POST",
        url: base + "/ListarProyecto",
        data: "{'parameters':'" + JSON.stringify(parameters) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {

        },
        error: function(r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function(data) {

        proyecto.select2({
            placeholder: "Selecciona un Proyecto",
            data: $.map(data.d,
                function(obj) {
                    obj.id = obj.id || obj.CodProyecto;
                    obj.text = obj.text || obj.CodNombre;
                    return obj;
                }),
            escapeMarkup: function(markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function() {
                if ($(this).val()) {
                    $(this).trigger("blur");

                    if (activeTab === "lnkTabTrabajadorProyecto") {
                        document.getElementById("wgridVerTrabajadores").style.display = "block";
                        ListarTrabajador($("#gridVerTrabajadores").DataTable(), $("#ddl-proyecto").select2("data")[0].id);

                        $("#btnTrabajadorProyecto").prop("disabled", false);

                        // Fill Textbox Datos Proyecto / Institucion
                        $("#tbxInstitucion").val($("#ddl-proyecto").select2("data")[0].NombreInstitucion);
                        $("#tbxProyecto").val($("#ddl-proyecto").select2("data")[0].NombreProyecto);
                        $("#hdfCodProyecto").val($("#ddl-proyecto").select2("data")[0].CodProyecto);
                    } else {
                        $("#btnTrabajadorProyecto").prop("disabled", true);
                    }
                }
                else if (activeTab === "lnkTabTrabajadorSenainfo") {
                    
                }


            });

        proyecto.val(null);
        proyecto.trigger("change.select2");

    });

}

/******* AJAX INSERT *********/
function BindingParamNoLogin(op) {
    var trabajadorParams = new Object();

    switch (op) {
    case "new":
        trabajadorParams.CodInstitucion = $("#ddl-proyecto").select2("data")[0].CodInstitucion;
        trabajadorParams.CodProfesion = $("#ddl-profesion").select2("data")[0].id;
        trabajadorParams.Paterno = $("#tbxApellidoPaterno").val().toUpperCase();
        trabajadorParams.Materno = $("#tbxApellidoMaterno").val().toUpperCase();
        trabajadorParams.Nombres = $("#tbxNombreTrabajador").val().toUpperCase();
        trabajadorParams.RutTrabajador = $("#tbxRutTrabajador").val().toUpperCase();
        trabajadorParams.Telefono = $("#tbxTelefono").val().toUpperCase();
        trabajadorParams.Mail = null;
        trabajadorParams.RealizaLogin = false;
        trabajadorParams.IndVigenciaTrabajador = "V";
        trabajadorParams.CodProyecto = $("#ddl-proyecto").select2("data")[0].id;
        trabajadorParams.CodCargo = $("#ddl-cargo").select2("data")[0].id;
        trabajadorParams.CodCausalEgresoTrabajador = null;
        trabajadorParams.HorasComprometidas = $("#tbxHorasComprometidas").val();
        trabajadorParams.IdTrabajador = $("#mdlRegistroTrabajador").data("idtrabajador");
        trabajadorParams.Sexo = $("#ddl-sexo").select2("data")[0].id;
        break;
    case "edit":
        trabajadorParams.CodInstitucion = $("#ddl-proyecto").select2("data")[0].CodInstitucion;
        trabajadorParams.CodProfesion = $("#ddl-profesion").select2("data")[0].id;
        trabajadorParams.Paterno = $("#tbxApellidoPaterno").val().toUpperCase();
        trabajadorParams.Materno = $("#tbxApellidoMaterno").val().toUpperCase();
        trabajadorParams.Nombres = $("#tbxNombreTrabajador").val().toUpperCase();
        trabajadorParams.RutTrabajador = $("#tbxRutTrabajador").val().toUpperCase();
        trabajadorParams.Telefono = $("#tbxTelefono").val().toUpperCase();
        trabajadorParams.Mail = null;
        trabajadorParams.RealizaLogin = false;
        trabajadorParams.IndVigenciaTrabajador = "V";
        trabajadorParams.CodProyecto = $("#ddl-proyecto").select2("data")[0].id;
        trabajadorParams.CodCargo = $("#ddl-cargo").select2("data")[0].id;
        trabajadorParams.CodCausalEgresoTrabajador = null;
        trabajadorParams.HorasComprometidas = $("#tbxHorasComprometidas").val();
        trabajadorParams.IdTrabajador = $("#mdlRegistroTrabajador").data("idtrabajador");
        trabajadorParams.Sexo = $("#ddl-sexo").select2("data")[0].id;
        break;
    case "delete":
        trabajadorParams.CodInstitucion = $("#ddl-proyecto").select2("data")[0].CodInstitucion;
        trabajadorParams.RutTrabajador = $("#mdlEliminarTrabajador").data("ruttrabajador");
        trabajadorParams.RealizaLogin = false;
        trabajadorParams.IndVigenciaTrabajador = "C";
        trabajadorParams.CodProyecto = $("#ddl-proyecto").select2("data")[0].id;
        trabajadorParams.CodCausalEgresoTrabajador = $("#ddl-CausalEgreso").select2("data")[0].id;
        trabajadorParams.IdTrabajador = $("#mdlEliminarTrabajador").data("idtrabajador");
        break;
    }

    return trabajadorParams;
}

function CrearTrabajadorNoLogin(trabajadorParams) {

    $.ajax({
        type: "POST",
        url: base + "/CrearTrabajadorNoLogin",
        data: "{'trabajadorParams':'" + JSON.stringify(trabajadorParams) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {
        },
        error: function(r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function() {
                });

            $("#btnAgregarRegistroTrabajador").prop("disabled", false);
        }
    }).then(function(data) {

        // create the option and append to Select2
        var d = data.d;

        switch (parseInt(d)) {
        case -2:
            alertify.alert("SENAINFO",
                "Trabajador ya existe en el Proyecto.",
                function() {
                });
            break;
        case -1:
            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function() {
                });
            break;
        case 0:
            alertify.alert("SENAINFO",
                "Se ha Registrado el Trabajador de forma exitosa.",
                function() {
                    ListarTrabajador($("#gridVerTrabajadores").DataTable(),
                        $("#ddl-proyecto").select2("data")[0].id);
                });
            break;
        case 1:
            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function() {
                });
            break;

        }

    });
}

function ActualizarTrabajadorNoLogin(trabajadorParams) {
    $.ajax({
        type: "POST",
        url: base + "/ActualizarTrabajadorNoLogin",
        data: "{'trabajadorParams':'" + JSON.stringify(trabajadorParams) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {
        },
        error: function(r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function() {
                });

            $("#btnAgregarRegistroTrabajador").prop("disabled", false);
        }
    }).then(function(data) {

        // create the option and append to Select2
        var d = data.d;

        switch (parseInt(d)) {
        case 0:
            alertify.alert("SENAINFO",
                "Se ha actualizado el Trabajador de forma exitosa.",
                function() {
                    ListarTrabajador($("#gridVerTrabajadores").DataTable(),
                        $("#ddl-proyecto").select2("data")[0].id);
                    $("#mdlRegistroTrabajador").modal("hide");
                });
            break;
        case -1:
            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function() {
                });
            break;

        }

    });
}

function EliminarTrabajadorNoLogin(trabajadorParams) {
    $.ajax({
        type: "POST",
        url: base + "/EliminarTrabajadorNoLogin",
        data: "{'trabajadorParams':'" + JSON.stringify(trabajadorParams) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {
        },
        error: function(r) {

            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function() {
                });

            $("#btnAgregarRegistroTrabajador").prop("disabled", false);
        }
    }).then(function(data) {

        // create the option and append to Select2
        var d = data.d;

        switch (parseInt(d)) {
        case 0:
            alertify.alert("SENAINFO",
                "Se ha ELIMINADO el registro del Trabajador de forma exitosa.",
                function() {
                    ListarTrabajador($("#gridVerTrabajadores").DataTable(),
                        $("#ddl-proyecto").select2("data")[0].id);
                });
            break;
        case -1:
            alertify.alert("SENAINFO",
                "Ha ocurrido un error. Contacte con Mesa de Ayuda.",
                function() {
                });
            break;

        }

    });
}

/******* Validaciones *********/
function ValidafrmEliminarTrabajador(form) {
    form.validate({
        ignore: "input[type=hidden], .select2-input, .select2-focusser",
        rules: {
            causalegreso: "required"
        },
        onfocusout: function(element) {
            $(element).valid();
        },
        errorElement: "em",
        errorPlacement: function(error, element) {
            error.insertAfter(element);
            return true;
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
        }
    });
}


function ValidafrmNuevoTrabajadorSenainfo(form) {

    $.validator.addMethod("ValidarRut",
        function (value, element) {
            return rutValido;
        },
        "El rut es inválido");

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
                maxlength: 11
            },
            rut: {
                required: true,
                maxlength: 12,
                ValidarRut: true
            },
            horas: {
                required: true,
                number: true,
                min: 0,
                max: 200
            },
            email: {
                required: true,
                email: true
            },
            institucion: "required",
            proyecto: "required",
            cargo: "required",
            profesion: "required",
            vigencia: "required"
        },
        messages: {
            horas: {
                required: "Número Horas comprometidas requerido",
                number: "Se permiten solo números",
                min: "Número tiene que ser mayor a 0",
                max: "Número tiene que ser menor a 200"
            }
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

function ValidafrmNuevoTrabajador(form) {

    $.validator.addMethod("ValidarRut",
        function(value, element) {
            return rutValido;
        },
        "El rut es inválido");

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
                maxlength: 11
            },
            rut: {
                required: true,
                maxlength: 12,
                ValidarRut: true
            },
            horas: {
                required: true,
                number: true,
                min: 0,
                max: 200
            },
            institucion: "required",
            proyecto: "required",
            cargo: "required",
            profesion: "required",
            vigencia: "required"
        },
        messages: {
            horas: {
                required: "Número Horas comprometidas requerido",
                number: "Se permiten solo números",
                min: "Número tiene que ser mayor a 0",
                max: "Número tiene que ser menor a 200"
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
        errorElement: "em",
        errorPlacement: function(error, element) {
            error.insertAfter(element);
            return true;
            //return false;
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
        }

    });

    return form;
}

function AgregaValidacionRutInput(obj) {
    rutValido = false;

    if (obj.length > 0) {
        obj.Rut({
            on_error: function() {
                rutValido = false;

            },
            on_success: function() {
                rutValido = true;

            },
            ignoreControlKeys: false,
            validateOn: "change",
            format_on: "keyup blur keydown"
        });
    }
}

/*******     Utils     *******/
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

    msg.parents("div").find("input").focusin(function() {
        clsRequired(divtext);
    });
}

function showError(error, divtext) {

    var msg = $("#" + divtext);
    msg.empty();
    document.getElementById(divtext).style.display = "block";

    msg.append(error);
    msg.fadeTo(3000, 500).slideUp(500,
        function() {
            msg.slideUp(500);
        });
}

function LimpiarModalRegistroTrabajador() {
    $("#tbxApellidoPaterno").val("");
    $("#tbxApellidoMaterno").val("");
    $("#tbxNombreTrabajador").val("");
    $("#tbxTelefono").val("");
    $("#tbxRutTrabajador").val("");
    $("#ddl-cargo").val(null).trigger("change");
    $("#ddl-profesion").val(null).trigger("change");
    $("#tbxHorasComprometidas").val("");
    //$("#ddl-proyecto").val(null).trigger("change");

    $("#btnAgregarRegistroTrabajador").prop("disabled", false);
}
