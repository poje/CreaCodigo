/******* Iniciar Select2 ******/
$.fn.select2.defaults.set("theme", "bootstrap");
$.fn.select2.defaults.set("allowClear", "true");
$.fn.modal.Constructor.prototype.enforceFocus = function () { };
$.fn.select2.defaults.set("language", {
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

$.validator.setDefaults({
    submitHandler: function () {
        alert("submitted!");
    }
});

/******* Globales *******/
var base = "InstitucionTrabajadores.aspx";
var codProyecto = 0;
var rutValido = false;
var dataVigencia = [{ id: "V", text: "VIGENTE" }, { id: "C", text: "CADUCADO" }];


/******* Inicializaciones *********/
function IniciarControles() {
    IniciarSpinner();
    IniciarWizard();
    IniciarCheckboxes();

    IniciarGridListarTrabajadores();
    IniciarGridBusqInstitucion();
    ListarProfesionOficio();
    ListarCargo();

    /* Init Select2 simple */
    //IniciarSimpleSelect($("#ddl-vigencia"), dataVigencia,"Selecciona un Estado");

    ListarInstitucion(null);
    ListarProyecto(null);
    
    EventosBuscadores();
    EventosFinalizar();
}

function IniciarSimpleSelect(control, data, placeHolder) {
    control.select2({
        data: dataVigencia,
        minimumResultsForSearch: 10,
        allowClear: false
});
    
}

function IniciarCheckboxes() {
    
    $("[name='chkNuevoTrabProyecto']").bootstrapSwitch(
        {
            onText: "Si",
            offText: "No",
            onSwitchChange: function(event, state) {
                if (state) {
                    //document.getElementById("wrapper-gridVerTrabajadorNoLogin").style.display = "none";
                    DeshabilitarNextStep(false);
                } else {
                    //document.getElementById("wrapper-gridVerTrabajadorNoLogin").style.display = "block";
                    DeshabilitarNextStep(true);
                }
            }
        });

    $("[name='chkNuevoTrabajador']").bootstrapSwitch(
        {
            onText: "Si",
            offText: "No",
            onSwitchChange: function (event, state) {
                if (state) {
                    DeshabilitarNextStep(false);
                } else {
                    DeshabilitarNextStep(true);
                }
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

function IniciarWizard() {

    var form = $("#frmNuevoTrabajador");
    form = ValidafrmNuevoTrabajador(form);

    var wizard = $("#wizard").steps({
        /* Settings */
        //forceMoveForward: true,
        //enableFinishButton: false,

        /* Events */
        onStepChanging: function (event, currentIndex, newIndex) {
            
            switch (newIndex) {
                case 0: /* Step Inicio */
                    return true;
                    break;

                case 1: /* Formulario */
                    return true;
                    break;

                case 2: /* Finalizar */
                    
                    form = $("#frmNuevoTrabajador");
                    //form = ValidafrmNuevoTrabajador(form);
                    
                    if (form.valid()) { /* Form Valido */
                        var listContainer = $("#listaFinalizar");
                        listContainer.empty();
                        $("#msgTrabajador").html("Se creará el Trabajador con los siguientes datos: ");
                        listContainer.append("<li class='list-group-item list-group-item-warning'> " + $("#tbxNombreTrabajador").val().toUpperCase() + " " + $("#tbxApellidoPaterno").val().toUpperCase() + "</li>");
                        listContainer.append("<li class='list-group-item list-group-item-warning'> " + $("#ddl-institucion").select2("data")[0].text.toUpperCase() + "</li>");
                        listContainer.append("<li class='list-group-item list-group-item-warning'> " + $("#ddl-proyecto").select2("data")[0].text.toUpperCase() + "</li>");
                        DeshabilitarFinalizar(true);
                        
                        var trabajadorParams = new Object();
                        trabajadorParams.CodInstitucion = $("#ddl-institucion").select2("data")[0].id;
                        trabajadorParams.CodProyecto = $("#ddl-proyecto").select2("data")[0].id;
                        trabajadorParams.RutTrabajador = $("#tbxRutTrabajador").val().toUpperCase();

                        if (ExisteTrabajadorNoLogin(trabajadorParams))
                            return false;
                        else
                            return true;

                    } else /* Form Invalido */
                        return false;
                    

                    break;
                    
                default: /*  Default para evitar Warning */
                    return true;
                    break;
            }
              
            
            },
            onStepChanged: function (event, currentIndex, priorIndex) { }, 
            onCanceled: function (event) { },
            onFinishing: function(event, currentIndex) { return true; }, 
            onFinished: function(event, currentIndex) {
                location.reload();
            },

        /* Labels */
        labels: {
            cancel: "Cancelar",
            current: "paso actual:",
            pagination: "Paginación",
            finish: "Finalizar",
            next: "Siguiente",
            previous: "Anterior",
            loading: "Cargando ..."
        }
            
        });
    EventosStepOne();
}

function IniciarGridListarTrabajadores() {

    $("#gridVerTrabajadorNoLogin").DataTable(
        {
            "paging": true,
            "lengthChange": false,
            "pagingType": "numbers",
            "ordering": false,
            "info": false,
            "searching": false,
            "language": {
                "search": "Buscar",
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se han encontrado resultados",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No se han encontrado resultados"
            },
            "createdRow": function(row, data, index) {
                $("td", row).eq(0).html(index + 1);

            },
            "footerCallback": function(tfoot, data, start, end, display) {
            },
            "columnDefs": [
                {
                    "targets": [1],
                    "visible": false,
                    "searchable": false
                }
            ]
        });
    
}

function IniciarGridBusqInstitucion() {

   $("#gridVerInstitucion").DataTable(
        {
            "paging": true,
            "lengthChange": false,
            "pagingType": "numbers",
            "ordering": false,
            "info": false,
            "searching": false,
            "language": {
                "search": "Buscar",
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se han encontrado resultados",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No se han encontrado resultados"
            },
            "createdRow": function (row, data, index) {
            },
            "footerCallback": function (tfoot, data, start, end, display) {
            },
            "columnDefs": [
                {
                    orderable: false,
                    className: "select-checkbox",
                    targets: -1
                }
            ],
            "select": {
                style: "single",
                selector: "td:last-child"
            }

        });

}

/******* Eventos *********/
function OcultarNuevoStepOne()
{
    document.getElementById("stepOne_TipoUsuario").style.display = "none";
    document.getElementById("stepOne_RutUsuario").style.display = "none";
    document.getElementById("stepOne_VerTrabajador").style.display = "none";
    document.getElementById("stepOne_NuevoTrabajador").style.display = "none";
}

function OcultarModStepOne() {
    document.getElementById("stepOne_ModificarTipoUsuario").style.display = "none";
    document.getElementById("stepOne_RutUsuario").style.display = "none";
}

function OcultarElimStepOne() {
    document.getElementById("stepOne_EliminarTipoUsuario").style.display = "none";
    document.getElementById("stepOne_RutUsuario").style.display = "none";
}

function EventosStepOne() {

    DeshabilitarNextStep(true);

    $(".radio-accion input:radio").click(function () {

        var optaccion = $("input[name='accion']:checked").val();
        switch (optaccion) {
            case "new":
                document.getElementById("stepOne_TipoUsuario").style.display = "block";
                
                $("input[name='tipousuario']:checked").prop('checked', false);
                console.log("new");
                OcultarModStepOne();
                OcultarElimStepOne();
                DeshabilitarNextStep(true);
                break;
            case "modify":
                document.getElementById("stepOne_ModificarTipoUsuario").style.display = "block";
                $("input[name='modtipousuario']:checked").prop('checked', false);
                console.log("mod");
                OcultarNuevoStepOne();
                OcultarElimStepOne();
                DeshabilitarNextStep(true);
                break;
            case "delete":
                document.getElementById("stepOne_EliminarTipoUsuario").style.display = "block";
                $("input[name='elimtipousuario']:checked").prop('checked', false);
                console.log("elim");
                OcultarNuevoStepOne();
                OcultarModStepOne();
                DeshabilitarNextStep(true);
                break;
        }
    });

    $(".radio-tipousuario input:radio").click(function () { // Agregar Tipo Usuario

        var opttipousuario = $("input[name='tipousuario']:checked").val();
        switch (opttipousuario) {
            case "senainfo":
            document.getElementById("stepOne_RutUsuario").style.display = "none";
            document.getElementById("stepOne_VerTrabajador").style.display = "none";
            document.getElementById("stepOne_NuevoTrabajador").style.display = "none";

            DeshabilitarNextStep(true);
            break;
        case "proyecto":
            document.getElementById("stepOne_RutUsuario").style.display = "block";
            document.getElementById("stepOne_NuevoTrabajador").style.display = "none";
            $("#rutUsuario").val("");
            AgregaValidacionRutInput($("#rutUsuario"),"proyecto");
            DeshabilitarNextStep(true);
            break;
        }
    });

    $(".radio-modtipousuario input:radio").click(function () { // Modificar Tipo Usuario

        var opttipousuario = $("input[name='modtipousuario']:checked").val();
        switch (opttipousuario) {
        case "senainfo":
         

            DeshabilitarNextStep(true);
            break;
        case "proyecto":
            document.getElementById("stepOne_RutUsuario").style.display = "block";
           
            $("#rutUsuario").val("");
            AgregaValidacionRutInput($("#rutUsuario"), "proyecto");
            DeshabilitarNextStep(true);
            break;
        }
    });

    $(".radio-elimtipousuario input:radio").click(function () { // Eliminar Tipo Usuario

        var opttipousuario = $("input[name='elimtipousuario']:checked").val();
        switch (opttipousuario) {
        case "senainfo":


            DeshabilitarNextStep(true);
            break;
        case "proyecto":
            document.getElementById("stepOne_RutUsuario").style.display = "block";

            $("#rutUsuario").val("");
            AgregaValidacionRutInput($("#rutUsuario"), "proyecto");
            DeshabilitarNextStep(true);
            break;
        }
    });
}

function EventosBuscadores() {
   
    $("#btnBuscarTrabajadores").click(function (e) {
        $("#mdlBuscarTrabajadores").modal("show");
    });

    $("#btnBuscarProyecto").click(function (e) {
        $("#mdlBuscarProyecto").modal("show");
    });
    
    $("#btnBuscarInstitucion").click(function (e) {
        ListarTipoInstitucion();
        $("#mdlBuscarInstitucion").modal("show");
    });

    // Buscador Institucion
    $("#btnBusInstBuscar").click(function (e) {
        var tableBuscarInstitucion = $("#gridVerInstitucion");
        tableBuscarInstitucion.unbind();

        BusquedaInstitucion(tableBuscarInstitucion.DataTable(), $("#busInstCodigoInstitucion").val(), $("#busInstRutInstitucion").val(), $("#busInstNombreInstitucion").val(), $("#busInstTipoInstitucion").val());
    });

    $(".cerrar-institucion").click(function(e) {
        LimpiarBusquedaInstitucion();

    });

}

function EventosFinalizar() {

    $("#btnGuardarTrabajadorProy").click(function (e) {
        
        $("#btnGuardarTrabajadorProy").prop("disabled", true);

        var trabajadorParams = new Object();
        trabajadorParams.CodInstitucion = $("#ddl-institucion").select2("data")[0].id;
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

        $("#pSpinner").text("Creando Trabajador...");
        CrearTrabajadorNoLogin(trabajadorParams);
    });
}

/******* Validaciones *********/

function ValidafrmNuevoTrabajador(form) {
    
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
                maxlength: 10
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
            nombres: "Nombre requerido",
            paterno: "Apellido Paterno requerido",
            materno: "Apellido Materno requerido",
            telefono: "Teléfono requerido",
            horas: {
                required: "Número Horas comprometidas requerido",
                number: "Se permiten solo números",
                min: "Número tiene que ser mayor a 0",
                max: "Número tiene que ser menor a 200"
        },
            institucion: "Institución requerida",
            proyecto: "Proyecto requerido",
            cargo: "Cargo requerido",
            profesion: "Profesion requerida",
            vigencia: "Vigencia requerida"
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

function AgregaValidacionRutInput(obj,tipousuario) {
        if (obj.length > 0) {
            obj.Rut({
                on_error: function() {
                    rutValido = false;
                    BindingRut(tipousuario);
                },
                on_success: function() {
                    rutValido = true;
                    BindingRut(tipousuario);
                },
                format_on: "keyup"
            });
        }
}

/******* Llamadas AJAX & Binding *******/
function BindingRut(tipousuario) {
    $("#btnValidarRut").unbind();
    $("#btnValidarRut").click(function (e) {

        switch (tipousuario) {
        case "proyecto":
            //if ($("#rutUsuario").val() && rutValido) {
              if (rutValido) {
                document.getElementById("stepOne_VerTrabajador").style.display = "block";
                $("[name='chkNuevoTrabProyecto']").bootstrapSwitch("state", false);
                LimpiarFormTrabajador(false); /* No es trabajador Senainfo */
                $("#tbxRutTrabajador").val($("#rutUsuario").val());
                ListarTrabajador($("#gridVerTrabajadorNoLogin").DataTable(), $("#rutUsuario").val());
            }
            else {
               
                //showRequired("Por favor ingrese Rut", "rutRequerido");
                document.getElementById("stepOne_VerTrabajador").style.display = "none";
                alertify.parent(document.body);
                alertify.alert("RUT Inválido");
            }

            break;
        case "senainfo":
            break;
        }

        e.preventDefault();
    });
}

function ListarProfesionOficio() {

    var profesion = $("#ddl-profesion");
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

    var cargo = $("#ddl-cargo");
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

function ListarInstitucion(codInstitucion) {

    var institucion = $("#ddl-institucion");
    institucion.unbind();

    $.ajax({
        type: "POST",
        url: base + "/ListarInstitucion",
        data: "{'codInstitucion':'" + codInstitucion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        institucion.select2({
            placeholder: "Selecciona una Institución",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodInstitucion;
                    obj.text = obj.text || obj.NombreInstitucion;
                    return obj;
                }),
            escapeMarkup: function (markup) {
                return markup;
            } // let our custom formatter work

        }).on("change.select2",
            function () {
                if ($(this).val()) {
                    console.log("Event Change Institucion");
                    $(this).trigger("blur");
                    ListarProyecto($(this).val());
                } else {
                    var proyecto = $("#ddl-proyecto");
                    proyecto.empty();
                }

            });

        if (codInstitucion === null) {
            institucion.val(null);
            institucion.trigger("change.select2");
        } else {
            institucion.val(codInstitucion);
            institucion.trigger("change.select2");
        }

    });
}

function ListarProyecto(codInstitucion) {

    if (codInstitucion !== null) {
        var proyecto = $("#ddl-proyecto");
        proyecto.empty();
        proyecto.unbind();

        $.ajax({
            type: "POST",
            url: base + "/ListarProyecto",
            data: "{'codInstitucion':'" + codInstitucion + "'}",
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
                        console.log("Event Change Proyecto");
                    }
                });

            proyecto.val(null);
            proyecto.trigger("change.select2");

        });
    } else 
        $("#ddl-proyecto").select2();
        
}

function ListarTrabajador(table ,rutTrabajador) {
    
    document.getElementById("stepOne_VerTrabajador").style.display = "none";

    table.clear();
    table.draw();

    $.ajax({
        type: "POST",
        url: base + "/ListarTrabajador",
        data: "{'rutTrabajador':'" + rutTrabajador + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(r) {},
        error: function(r) {
            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
        }
    }).then(function(r) {

        showNuevoTrabajador(false);
      
        $.each(r.d,
            function() {

                table.row.add([
                    "",
                    this.IdTrabajador,
                    this.NombreTrabajador,
                    this.RutTrabajador,
                    this.NombreInstitucion,
                    this.IndVigencia
                ]);

            });

        if (table.data().any()) {
            table.draw();

            document.getElementById("stepOne_VerTrabajador").style.display = "block";
            
        } else {
            table.clear();
            table.draw();
            showNuevoTrabajador(true);

            var $loading = $("#spinner").hide();
            $loading.hide();
        }

    });

}

function ListarTipoInstitucion() {
    
    var tipo = $("#busInstTipoInstitucion");

    $.ajax({
        type: "POST",
        url: base + "/ListarTipoInstitucion",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) { },
        error: function (r) {
            showError("No se realizó la selección", "msgErrorW");
        }
    }).then(function (data) {

        tipo.select2({
            placeholder: "Selecciona Tipo de Institución",
            data: $.map(data.d,
                function(obj) {
                    obj.id = obj.id || obj.CodTipoInstitucion;
                    obj.text = obj.text || obj.TipoInstitucion;
                    return obj;
                }),
            cache: true,
            escapeMarkup: function (markup) {
                return markup;
            } // let our custom formatter work

        });

        tipo.val(null);
        tipo.trigger("change");

    });

}

function BusquedaInstitucion(table, codInstitucion, rutInstitucion, nombreInstitucion, codTipoInstitucion) {
    
    document.getElementById("wrapper-gridVerInstitucion").style.display = "none";

    table.clear();
    table.draw();

    $.ajax({
        type: "POST",
        url: base + "/BusquedaInstitucion",
        data: "{'codInstitucion':'" + codInstitucion +  "', 'rutInstitucion':'" + rutInstitucion + "', 'nombreInstitucion':'" + nombreInstitucion + "', 'codTipoInstitucion':'" + codTipoInstitucion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) { },
        error: function (r) {
            showError("Demasiados resultados. Por favor, redefina su búsqueda.", "msgErrorW");
        }
    }).then(function (r) {
        
        /* Adjuntar Eventos de Select si Ajax funcionó OK */
        table.on('select', function (e, dt, type, indexes) {
            var rows = table.rows(indexes).data()[0];
            
                ListarInstitucion(rows[0]);
            })
            .on("deselect", function (e, dt, type, indexes) {
                var rows = table.rows(indexes).data()[0];
                
            });
        /**************************************************/

        $.each(r.d,
            function () {

                table.row.add([
                    this.CodInstitucion,
                    this.NombreInstitucion,
                    this.RutInstitucion,
                    this.TipoInstitucion,
                    ""
                ]);

            });

        if (table.data().any()) {
            table.draw();

            document.getElementById("wrapper-gridVerInstitucion").style.display = "block";

        } else {
            table.clear();
            table.draw();
            

            var $loading = $("#spinner").hide();
            $loading.hide();
        }

    });

}

/******* AJAX PROMISES *******/
function ExisteTrabajadorNoLogin(trabajadorParams) {
    var jqXhr = $.ajax({
        type: "POST",
        url: base + "/ExisteTrabajadorNoLogin",
        data: "{'trabajadorParams':'" + JSON.stringify(trabajadorParams) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });

    
        jqXhr.done(function(r) {
            if (r.d === true) /* Existe el usuario con la tripleta CodInstitucion, CodProyecto y Vigente */
                return true;
            else
                return false; 
        });
  
}

/******* AJAX INSERT *********/
function CrearTrabajadorNoLogin(trabajadorParams) {
    $.ajax({
        type: "POST",
        url: base + "/CrearTrabajadorNoLogin",
        data: "{'trabajadorParams':'" + JSON.stringify(trabajadorParams) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
        
        },
        error: function (r) {
            alertify.parent(document.body);
            alertify.alert("Ha ocurrido un error, contacte al Administrador.");
            $("#btnGuardarTrabajadorProy").prop("disabled", false);
        }
    }).then(function (data) {
       
        // create the option and append to Select2
        var d = data.d;
        if (d === true) {
            DeshabilitarDoneSteps(true);
            alertify.parent(document.body);
            alertify.alert("Se ha creado el nuevo trabajador de forma exitosa.");
            DeshabilitarFinalizar(false);
            $("#pSpinner").text("Cargando...");
        }

    });
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

    msg.parents("div").find("input").focusin(function () {
        clsRequired(divtext);
    });
}

function showError(error, divtext) {

    var msg = $("#" + divtext);
    msg.empty();
    document.getElementById(divtext).style.display = "block";

    msg.append(error);
    msg.fadeTo(3000, 500).slideUp(500, function () {
        msg.slideUp(500);
    });
}

function showNuevoTrabajador(opcion) {
    if (opcion) {
        document.getElementById("stepOne_VerTrabajador").style.display = "none";
        document.getElementById("stepOne_NuevoTrabajador").style.display = "block";
    } else {
        document.getElementById("stepOne_VerTrabajador").style.display = "block";
        document.getElementById("stepOne_NuevoTrabajador").style.display = "none";
    }
}

function DeshabilitarNextStep(flag) {
    var steps = $(".steps ul").find(".current");

    if (flag)
        $(steps).next("li").addClass("disabled");
    else
        $(steps).next("li").removeClass("disabled");

    var nextbutton = $(".actions > ul > li:nth-child(2) > a");

    if (flag) {
        nextbutton.attr("href", "#");
        nextbutton = $(".actions > ul > li:nth-child(2)");
        nextbutton.addClass("disabled");


    } else {
        nextbutton.attr("href", "#next");
        nextbutton = $(".actions > ul > li:nth-child(2)");
        nextbutton.removeClass("disabled");

    }
    
}

function DeshabilitarDoneSteps(flag) {
    var steps = $(".steps ul").find(".done");

    if (flag)
        $(steps).addClass("disabled");
    else
        $(steps).removeClass("disabled");

    var prevbutton = $(".actions > ul > li:nth-child(1) > a");

    if (flag) {
        prevbutton.attr("href", "#");
        prevbutton = $(".actions > ul > li:nth-child(1)");
        prevbutton.addClass("disabled");


    } else {
        prevbutton.attr("href", "#next");
        prevbutton = $(".actions > ul > li:nth-child(1)");
        prevbutton.removeClass("disabled");
    }

}

function DeshabilitarFinalizar(flag) {
   
    var finishbutton = $(".actions > ul > li:nth-child(3) > a");

    if (flag) {
        finishbutton.attr("href", "#");
        finishbutton = $(".actions > ul > li:nth-child(3)");
        finishbutton.addClass("disabled");


    } else {
        finishbutton.attr("href", "#finish");
        finishbutton.addClass("btn-finalizar");
        finishbutton = $(".actions > ul > li:nth-child(3)");
        finishbutton.removeClass("disabled");
        finishbutton.css({ display: "block" });
    }
}

function LimpiarBusquedaInstitucion() {
    document.getElementById("wrapper-gridVerInstitucion").style.display = "none";

    $("#busInstCodigoInstitucion").val("");
    $("#busInstRutInstitucion").val("");
    $("#busInstNombreInstitucion").val("");
    $("#busInstTipoInstitucion").val("");


}

function LimpiarFormTrabajador(esSenainfo) {
    if (!esSenainfo) {
        $("#tbxApellidoPaterno").val("");
        $("#tbxApellidoMaterno").val("");
        $("#tbxNombreTrabajador").val("");
        $("#tbxRutTrabajador").val("");
        $("#ddl-cargo").val(null).trigger("change");
        $("#ddl-profesion").val(null).trigger("change");
        $("#tbxHorasComprometidas").val("");
        //$("#ddl-vigencia").val("V");
        $("#ddl-proyecto").val(null).trigger("change");
        $("#ddl-institucion").val(null).trigger("change");
    }
}