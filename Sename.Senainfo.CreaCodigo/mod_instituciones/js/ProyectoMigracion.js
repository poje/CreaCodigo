$.fn.select2.defaults.set("theme", "bootstrap");

var arraySeleccionados = [];
var tipoSolicitudMigracion = 0;

init = () => {


    $(".container-ticket-migracion").hide();

    $("#tableNinosMigracion").css("display","none");
    $('.dd').select2({
        placeholder: 'Seleccione...'
    });

    $(".rdoTipoInstitucion").on("change", function () {
        axios.post("ProyectoMigracion.aspx/ObtenerInstitucionesMigracion", {
            tipoInstitucion: this.value
        }).then(response => {
            $(".institucion-origen").empty();
            $(".proyecto-origen").empty();

            $(".institucion-origen").select2({
                placeholder: {
                    id: 0,
                    text: 'Seleccione una Institución',
                },
                data: $.map(response.data.d, function (obj) {
                    obj.id = obj.id || obj.CodInstitucion
                    obj.text = obj.text || obj.NombreInstitucion

                    return obj;
                }),
                allowClear: true
            });

            setValueSelect2($(".institucion-origen"), 0);

            // $(".institucion-origen").val(0).trigger("change");
        }).catch(error => {
            console.log(error);
        });
    });

    $(".institucion-origen").on("change", function () {
        var codInstitucion = this.value === "" ? 0 : this.value;

        axios.post("ProyectoMigracion.aspx/ObtenerProyectos", {
            codInstitucion: codInstitucion
        }).then(response => {
            $(".proyecto-origen").empty();
            $(".proyecto-origen").select2({
                placeholder: {
                    id: 0,
                    text: 'Seleccione un Proyecto',
                },
                data: $.map(response.data.d, function (obj) {
                    obj.id = obj.id || obj.CodProyecto
                    obj.text = obj.text || obj.NombreProyecto

                    return obj;
                }),
                allowClear: true
            })

            setValueSelect2($(".proyecto-origen"), 0);
        }).catch(error => {
            console.log(error);
        });
    });

    $(".rdoTipoSeleccion").on("change", function () {
        var codProyecto = getSelectedValueInput2($(".proyecto-origen"));
        //var tipoListado = this.value;
        tipoSolicitudMigracion = this.value;

        axios.post("ProyectoMigracion.aspx/ObtenerListadoNinosMigracion", {
            codProyecto: codProyecto
        }).then(response => {
            var table = $("#tableNinosMigracion").DataTable();

            $("#tableNinosMigracion").hide();

            table.clear().draw();

            if (tipoSolicitudMigracion === "2") {
                $.each(response.data.d, function () {
                    table.row.add([
                        this.Icodie,
                        this.Nombres,
                        this.ApellidoPaterno,
                        this.ApellidoMaterno,
                        this.Rut,
                        this.Edad,
                        '<input type="checkbox" class="seleccionado"  />'
                    ]);
                });
            }
            else {
                $.each(response.data.d, function () {
                    table.row.add([
                        this.Icodie,
                        this.Nombres,
                        this.ApellidoPaterno,
                        this.ApellidoMaterno,
                        this.Rut,
                        this.Edad,
                        '<input type="checkbox" class="seleccionado" disabled="disabled"  />'
                    ]);
                });

                arraySeleccionados = [];
            }

            table.draw();

            $("#tableNinosMigracion").fadeIn(250);
        }).catch(error => {
            console.log('error', error);
        });
    });

    $(".proyecto-origen").on("change", function () {
        var codProyectoOrigen = getSelectedValueInput2($(".proyecto-origen"));

        $(".proyecto-destino").empty();

        axios.post("ProyectoMigracion.aspx/ObtenerProyectosDestino", {
            codProyecto: codProyectoOrigen
        }).then(response => {
            $(".proyecto-destino").select2({
                placeholder: {
                    id: 0,
                    text: 'Seleccione Proyecto Destino'
                },
                data: $.map(response.data.d, function (obj) {
                    obj.id = obj.id || obj.CodProyecto;
                    obj.text = obj.text || obj.NombreProyecto;

                    return obj;
                }),
                allowClear: true
            });

            setValueSelect2($(".proyecto-destino"), 0);

        }).catch(error => {
            console.log(error);
        });
    });

    $(".fecha-migracion").datepicker();

    if (!alertify.myAlert) {
        //define a new dialog
        alertify.dialog('myAlert', function () {
            return {
                main: function (message) {
                    this.message = message;
                },
                setup: function () {
                    return {
                        buttons: [{ text: "Aceptar", key: 27/*Esc*/ }],
                        focus: { element: 0 }
                    };
                },
                prepare: function () {
                    this.setContent(this.message);
                }
            }
        });
    }

    $("#chkTicketMigracion").bootstrapSwitch({
        onText: "Si",
        offText: "No",
        disabled: false
    }).on("switchChange.bootstrapSwitch", (event, state) => {
        if (state) {
            ObtenerTicketMigracion();
            $(".container-ticket-migracion").fadeIn(250);
        } else {
            $(".container-ticket-migracion").fadeOut(250);
        }
    });

    //ObtenerTicketMigracion();
};


$("#tableNinosMigracion tbody").on("click", ".seleccionado", function (evt) {
    var table = $("#tableNinosMigracion").DataTable();
    var data = table.row($(this).parents("tr")).data();
    var icodie = data[0];

    if (arraySeleccionados.indexOf(icodie) === -1) {
        arraySeleccionados.push(icodie);
    } else {
        arraySeleccionados.splice(arraySeleccionados.indexOf(icodie), 1);
    }
});

$(".migrar-ninos").on("click", function () {
    var codProyectoOrigen = getSelectedValueInput2($(".proyecto-origen"));
    var codProyectoDestino = 9999999;//getSelectedValueInput2($(".proyecto-destino"));
    var fechaMigracion = ObtenerFechaMoment($(".fecha-migracion"));  //moment(new Date(), $(".fecha-migracion").val());
    var icodTicketSeleccionado = getSelectedValueInput2($(".ticket-migracion"));

    debugger;
    tipoSolicitudMigracion = parseInt(tipoSolicitudMigracion);

    if (codProyectoOrigen === 0 || 
        codProyectoOrigen === null || 
        codProyectoDestino === 0 || 
        codProyectoDestino === null || 
        fechaMigracion === null || 
        !fechaMigracion === "Invalid Date" || 
        $(".fecha-migracion").val() === "" || 
        (tipoSolicitudMigracion === 2 && arraySeleccionados.length === 0)) {
            alertify.myAlert('Debe completar campos obligatorios (*), en caso de haber seleccionado "Seleccionar Listados" debe haber al menos un icodie seleccionado');
    }
    else {
        axios.post("ProyectoMigracion.aspx/MigrarNinos", {
            ninosMigracion: arraySeleccionados,
            icodTicket: icodTicketSeleccionado,
            codProyectoOrigen: codProyectoOrigen,
            codProyectoDestino: codProyectoDestino,
            tipoSolucitudMigracion: tipoSolicitudMigracion, //1.- Todos los icodies, 2.- Icodies Especificos
			fechaMigracion: fechaMigracion
        }).then(response => {
            console.log(`Migrando Proyecto ${codProyectoOrigen} a Proyecto Destino ${codProyectoDestino}`);
        }).catch(error => {
            console.log(error);
        });
    }
});

agregarSelectOption = obj => {
    $(obj).append('<option value="-1>Seleccionar</option>');
    $(obj)
        .val(-1)
        .trigger("change.select2");
};

setValueSelect2 = (obj, value) => $(obj).val(value).trigger("change.select2");

getSelectedValueInput2 = obj => {
    var codigo;

    try {
        codigo = $(obj).select2("data")[0].id;
    } catch (e) {
        codigo = 0;
    }

    if (isNaN(codigo)) {
        return codigo;
    } else {
        if (codigo !== "") return parseInt(codigo);
        else return 0;
    }
};

ObtenerFechaMoment = obj => moment(obj.val(), "DD-MM-YYYY").format();

ObtenerTicketMigracion = () => {
    axios.post("ProyectoMigracion.aspx/ObtenerTicketsMigracion", {}).then(response => {
        $(".ticket-migracion").select2({
            width:'100%',
            placeholder: {
                id: 0,
                text: 'Seleccione Ticket'
            },
            data: $.map(response.data.d, function (obj) {
                obj.id = obj.id || obj.Icodticket;
                obj.text = obj.text || obj.AsuntoTicket;

                return obj;
            }),
            cache: true,
            selectionTitleAttribute: false,
            escapeMarkup: function (markup) {
                return markup;
            },
            templateResult: setTicketMigracionTemplate,
            templateSelect: setTicketMigracionTemplate
        }).on("change", function (evt) {
            $(".texto-detalle-ticket-seleccionado").text("");
            $(".texto-detalle-ticket-seleccionado").append($(".ticket-migracion").select2('data')[0].DetalleTicket);
        });

        setValueSelect2($(".ticket-migracion"), 0);

        $(".container-ticket-migracion").fadeIn(250);
    }).catch(error => {
        console.log(error);
    });
};

setTicketMigracionTemplate = (ticketMigracion) => {
    if (!ticketMigracion)
        return ticketMigracion.Descripcion;
    var markup =
        `<div class='select2-result-repository__description' data-id='${ticketMigracion.Icodticket}' data-EstadoTicket='${ticketMigracion.EstadoTicket}' data-DetalleTicket='${ticketMigracion.DetalleTicket}'>
            <span class='glyphicon glyphicon-pushpin'></span>&nbsp; Ticket# ${ticketMigracion.NumeroTicket}, Asunto: ${ticketMigracion.AsuntoTicket}
             </div> 
            <div><strong>Prioridad: ${ticketMigracion.PrioridadTicket}
            </strong></div>`;

    return markup;
}