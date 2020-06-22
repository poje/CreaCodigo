$(document).ready(function () {
    cargadropdownLicitacion(null);

    inicializaSwitchs();
    inicializaMasks();

    $(".sexo-poblacion").select2({
        placeholder: {
            id: 0,
            text: 'Seleccionar Sexo'
        }
    });

    $("#DatosAdosado").css("display", "none");

    cargaDropdownRegiones();
    cargaDropdownTipoAtencion();
    cargadropdownBanco();

    bloqueoInicial();
    

    $("#ProyectosLicitacion").DataTable();


    table = $("#ProyectosLicitacion").DataTable({
        pageLength: 5,
        autoWidth: false,
        paging: true,
        lengthChange: true,
        pagingType: "numbers",
        ordering: false,
        info: false,
        cache: false,
        searching: false,
        destroy: true,
        language: {
            search: "Buscar",
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "No se han encontrado resultados",
            info: "Mostrando página _PAGE_ de _PAGES_",
            infoEmpty: "No se han encontrado resultados"
        },
        dom: "Bfrtip",
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
        createdRow: (row, data, index) => {
            $("td", row).eq(1).addClass("hidden");
            $("td", row).eq(3).addClass("hidden");
            $("td", row).eq(8).addClass("hidden");
            $("td", row).eq(10).addClass("hidden");
            $("td", row).eq(12).addClass("hidden");
            $("td", row).eq(14).addClass("hidden");

            if ($("td", row).eq(15).text() === "0")
                $("td", row).eq(16).text("No");
            else
                $("td", row).eq(16).text("Si");

            if ($("td", row).eq(18).text() === "0")
                $("td", row).eq(19).text("No");
            else
                $("td", row).eq(19).text("Si");

            var cmi = data[8]; //CodModeloIntervencion (cmi)

            ajaxObtenerCantidadModelosAdosados.data = `{'codModeloIntervencion':${cmi}}`;

            Promise.all([getAjaxDataPromise(ajaxObtenerCantidadModelosAdosados)]).then(datas => {
                var cantidadModelosIntervencionAdosado = datas[0].d;

                if (cantidadModelosIntervencionAdosado > 0) {
                    $("td", row).eq(21).append("<button class='agregar-adosado' title='Agregar Adosado'><i class='fa fa-plus' aria-hidden='true'></i>Agregar Proyecto Adosado</button>");
                } else {
                    $("td", row).eq(21).text('No Permitido');
                }
            });
        }
    });


    tableAdosados = $("#ProyectosAdosados").DataTable({
        pageLength: 50,
        autoWidth: false,
        paging: false,
        lengthChange: false,
        pagingType: "numbers",
        ordering: false,
        info: false,
        cache: false,
        searching: false,
        destroy: true,
        language: {
            search: "Buscar",
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "No se han encontrado resultados",
            info: "Mostrando página _PAGE_ de _PAGES_",
            infoEmpty: "No se han encontrado resultados"
        },
        dom: "Bfrtip",
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
        columnDefs: [
            {
                
            }
        ],
        createdRow: (row, data, index) => {
        }
    });

    function tablaAdosados(dataRow) {
        return `<div class="col-md-12">
                    <div class="col-md-3 text-center form-group">
                        <label>Proyecto Adosado</label>
                          Proyecto Continuidad ${dataRow.codProyectoContinuidad}
                        <br />
                        <input type="checkbox" class="checkbox" id="chkProyectoAdosado" name="chkProyectoAdosado">
                    </div>
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
                    <div class="col-md-3">
                        <div class="text-center" style="padding-top: 10%;">
                            <p><i>La edad esta determinada según el módelo de intervención seleccionado</i></p>
                        </div>
                    </div>

                </div>`;
    }

    $("#ProyectosLicitacion tbody").on("click",
        ".agregar-adosado",
        function (evt) {
            evt.preventDefault();

            var data = table.row($(this).parents("tr")).data();

            $("#DatosAdosado").css("display","");

            cargaDropdownModeloAdosado(data[8]);

            $("#CodLicitacionSeleccionado").val(data[0]);

            $("#lblTituloDatosProyectoAdosado").text(`Datos de Proyecto Adosado (Agregando Proyecto Adosado a Cod. Licitacion Proyecto ${data[0]})`);

        });

    $("#btnGuardarProyectoLicitacion").on("click", function (e) {
        e.preventDefault();

        var codLicitacion = getSelectedValueInput2($("#select-datoanexo"));

        table.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var d = this.data();

            var lp = LicitacionProyecto(codLicitacion, d[0], d[2], d[5], d[6], d[7], d[9], d[11], d[13], d[15], d[17], d[19], d[20], d[22], d[24], 'V', d[4], d[24], d[26]);

            lp = JSON.stringify(lp);

            $.ajax({
                type: "POST",
                url: "ResolucionProyecto.aspx/GuardarLicitacionProyecto",
                data: `{'licitacionProyecto': ${lp}}`,
                dataType: "json",
                contentType: 'application/json; charset="utf-8"',
                success: data => { },
                complete: () => {},
                error: () => { }
            }).then(data => { });
        });

        table.clear().draw();

        alertify.set('notifier', 'position', 'top-center');
        alertify.success(`Datos Guardados Correctamente`);

    });

    $("#btnProcesarExcelProyectoLicitacion").on("click", function (e) {
        e.preventDefault();

        if ($("#lblAdjuntoExcel").val().includes("xls"))
            AdjuntarArchivo("CMP");
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

    $("#AgregaProyectoLicitacion").on("click", (e) => {
        e.preventDefault();

        var lpt = LicitacionProyectosTabla();

        var lp = JSON.stringify(lpt);

        $.ajax({
            type: "POST",
            url: "ResolucionProyecto.aspx/GuardarLicitacionProyecto",
            data: `{'licitacionProyecto': ${lp}}`,
            dataType: "json",
            contentType: 'application/json; charset="utf-8"',
            success: data => { },
            complete: () => {},
            error: () => { }
        }).then(data => {
            //TODO: Agregar funcionalidad de que cuando se agreguen nuevos proyectos, actualice la tabla de Proyectos Licitacion
            $("#CodLicitacionSeleccionado").val(data.d);
        });
        
    });

    $("#AgregarProyectoAdosado").on("click", (e) => {

        e.preventDefault();


        var proyectoAdosadoProyectoLicitacion = {
            codLicitacionProyecto: $("#CodLicitacionSeleccionado").val(),
            codModeloIntervencion : getSelectedValueInput2($(".modelo-intervencion-adosado")),
            numeroPlazas: $(".nro-plazas-adosado").val(),
            monto: $(".monto-periodo-adosado").val(),
            indVigencia: 'V'
        }
        
        var p = JSON.stringify(proyectoAdosadoProyectoLicitacion);

        $.ajax({
            type: "POST",
            url: 'ResolucionProyecto.aspx/GuardarAdosadosProyectoLIcitacion',
            data: `{'proyectoAdosadoProyectoLicitacion':${p}}`,
            contentType: 'application/json;charset="utf-8"',
            dataType: 'json',
            success: function () {
                alert("se ha agregado correctamente");
            },
            error: function (error) {
                console.log(error);
            }
        }).then(function (data) {
            $("#DatosAdosado").css("display","none");

            $("#CodLicitacionSeleccionado").val(0);
            alertify.set('notifier', 'position', 'top-center');
            alertify.success(`Proyecto Adosado Agregado correctamente`);
        });
    });
});


function LicitacionProyectosTabla() {

    return {
        codDatosAnexo: getSelectedValueInput2($("#select-datoanexo")),
        codRegion: getSelectedValueInput2($(".region")),
        region: getTextSelectedValueInput2($(".region")),
        codComuna: getSelectedValueInput2($(".comuna")),
        comuna: getTextSelectedValueInput2($(".comuna")),
        focalizacion: $(".focalizacion").val(),
        sexoPoblAtendida: getSelectedValueInput2($(".sexo-poblacion")),
        numeroMesesConvenio: $(".nro-meses-convenio").val(),
        codModeloIntervencion: getSelectedValueInput2($(".modelo-intervencion")),
        modeloIntervencion: getTextSelectedValueInput2($(".modelo-intervencion")),
        codLineaAccion: getSelectedValueInput2($(".linea-accion")),
        lineaAccion: getTextSelectedValueInput2($(".linea-accion")),
        codModalidadAtencion: getSelectedValueInput2($(".modalidad-atencion")),
        modalidadAtencion: getTextSelectedValueInput2($(".modalidad-atencion")),
        codTipoAtencion: getSelectedValueInput2($(".tipo-atencion")),
        tipoAtencion: getTextSelectedValueInput2($(".tipo-atencion")),
        valorFactorVidaFamiliar: getStateBootstrapSwitch($("#chkFactorVidaFamiliar")),
        factorVidaFamiliar: getStateBootstrapSwitch($("#chkFactorVidaFamiliar")),
        nroPlazas: $(".nro-plazas").val(),
        montoPeriodoLicitar: $(".monto-periodo-licitar").val(),
        esProyectoContinuidad: getStateBootstrapSwitch($("#chkEsProyectoContinuidad")),
        esProyectoContinuidadTexto: getStateBootstrapSwitch($("#chkEsProyectoContinuidad")) === 0 ? 'No' : 'Si',
        codProyectoContinuidad: getSelectedValueInput2($(".proyecto-continuidad"))
    };
}

function LicitacionProyecto(codLicitacion, codRegion, codComuna, sexoPobl, nroMesesConvenio, modeloIntervencion, lineaAccion, modalidadAtencion, tipoAtencion, factorVidaFamiliar, nroPlazas,
    montoPeriodoLicitar, proyectoAdosado, modeloIntervencionAdosado, nroPlazasAdosado, indVigencia, focalizacion, esProyectoContinuidad, codProyectoContinuidad) {
    var licitacionProyecto = {
        codLicitacion: codLicitacion,
        codRegion: codRegion,
        codComuna: codComuna,
        sexoPoblAtendida: sexoPobl,
        numeroMesesConvenio: nroMesesConvenio,
        codModeloIntervencion: modeloIntervencion,
        codLineaAccion: lineaAccion,
        codModalidadAtencion: modalidadAtencion,
        codTipoAtencion: tipoAtencion,
        factorVidaFamiliar: factorVidaFamiliar,
        nroPlazas: nroPlazas,
        montoPeriodoLicitar: montoPeriodoLicitar,
        proyectoAdosado: proyectoAdosado,
        codModeloIntervencionAdosado: modeloIntervencionAdosado === "" ? 0 : parseInt(modeloIntervencionAdosado),
        nroPlazasAdosado: nroPlazasAdosado === "" ? 0 : parseInt(nroPlazasAdosado),
        indVigencia: indVigencia,
        focalizacion: focalizacion,
        esProyectoContinuidad: esProyectoContinuidad,
        codProyectoContinuidad: codProyectoContinuidad
    };

    return licitacionProyecto;
}

function Licitacion(codLicitacion, numeroCdp, numeroLicitacion, fechaLicitacion, codDeptoSename, indVigencia) {
    return licitacion = {
        codLicitacion: codLicitacion,
        numeroCdp: numeroCdp,
        numeroLicitacion: numeroLicitacion,
        fechaLicitacion: fechaLicitacion,
        codDeptoSename: codDeptoSename,
        indVigencia: indVigencia
    };
}


inicializaSwitchs = () => {
    $("#chkEjecucion").bootstrapSwitch({
        onText: "Si",
        disabled: false,
        offText: "No"
    });

    $("#chkFactorVidaFamiliar").bootstrapSwitch({
        onText: "Si",
        disabled: true,
        offText: "No"
    });

    $("#chkProyectoOrigen").bootstrapSwitch({
        onText: "Si",
        disabled: false,
        offText: "No"
    });
    
    $("#chkProyectoOrigen").on("switchChange.bootstrapSwitch", function (
        event,
        state
    ) {
        if (state) {
            $("#ddlInstitucionOrigen").removeAttr("disabled");
            $("#ddlProyectoOrigen").removeAttr("disabled");
            $("#ddlInstitucionOrigen")
                .parent()
                .addClass("required");
            $("#ddlProyectoOrigen")
                .parent()
                .addClass("required");
        } else {
            $("#ddlInstitucionOrigen")
                .parent()
                .removeClass("required");
            $("#ddlInstitucionOrigen").attr("disabled", "disabled");
            $("#ddlProyectoOrigen")
                .parent()
                .removeClass("required");
            $("#ddlProyectoOrigen").attr("disabled", "disabled");
        }
    });

    $("#chkEjecucion").on("switchChange.bootstrapSwitch", function (event, state) {
        if (state) {
            $(".proyecto").select2("val", 0);

            $("#divProyecto").hide();
            $("#gridResoluciones_wrapper")
                .first()
                .hide();
            $("#divProyectoNuevo").show();
            $("#btnCargarCodNuevo").show();
        } else {
            $("#divProyecto").show();
            $(".proyecto-nuevo").val("");
            $("#divProyectoNuevo").hide();
            $("#btnCargarCodNuevo").hide();
        }
    });

    $("#chkProyectoOrigen").bootstrapSwitch("state", true, true);

    $("#chkDatosProyecto").bootstrapSwitch({
        onText: "Si",
        disabled: true,
        offText: "No"
    });

    $("#chkEsProyectoContinuidad").bootstrapSwitch({
        onText: "Si",
        disabled: false,
        offText: "No"
    }).on("switchChange.bootstrapSwitch", function (event, state) {
        if (state) {
            $(".proyecto-continuidad").attr("disabled", false);

            var codDepto = $("#select-datoanexo").find(':selected').data('data').CodDeptoSename;
            var codRegion = getSelectedValueInput2($(".region"));

            ajaxListaProyectoContinuidad.data = `{'codDepto': ${codDepto}, 'codRegion': ${codRegion}}`;

            getAjaxDataPromise(ajaxListaProyectoContinuidad)
                .then(data => {
                    cargaselect2ProyectoContinuidad(data);
                    agregarSelectOption($(".proyecto-continuidad"));
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            $(".proyecto-continuidad").attr("disabled", true);
        }

    });
};

inicializaMasks = () => {
    $(".nro-cdp").inputmask({
        regex: "\\d+",
        mask: "[9999999]"
    });

    $(".nro-licitacion").inputmask({
        regex: "\\d+",
        mask: "[9999999]"
    });

    $(".fecha-licitacion").inputmask({
        regex: "^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$",
        mask: "[99-99-9999]"
    });

    $(".nro-meses-convenio").inputmask({
        regex: "\\d+",
        mask: "[99]"
    });

    $(".monto-periodo-licitar").inputmask({
        regex: "\\d+",
        mask: "[999999999]"
    });

    $(".nro-plazas-adosado").inputmask({
        regex: "\\d+",
        mask: "[999]"
    });
};

cargaDropdownRegiones = () => {
    getAjaxDataPromise(ajaxRegiones)
        .then(data => {
            cargaSelect2Regiones(data);
        })
        .catch(error => {
            console.log("ha ocurrido un error " + error);
        });
};

cargaDropdownTipoAtencion = () => {
    var lrpa = 0;
    ajaxTipoAtencion.data = `{'lrpa':'${lrpa}'}`;

    getAjaxDataPromise(ajaxTipoAtencion)
        .then(data => {
            cargaSelect2TipoAtencion(data);
        })
        .catch(error => {
            console.log("ha ocurrido un error " + error);
        });
};

cargadropdownModalidadAtencion = (codModeloIntervencion) => {

    ajaxModalidadAtencion.data = `{'codModeloIntervencion':'${codModeloIntervencion}'}`;

    getAjaxDataPromise(ajaxModalidadAtencion)
        .then(data => {
            cargaSelect2ModalidadAtencion(data);
        })
        .catch(error => {
            console.log("ha ocurrido un error " + error);
        });
};

cargaDropdownModeloIntervencion = (codDepto) => {

    ajaxModeloIntervencionxDepto.data = `{'codDepto':'${codDepto}'}`;

    getAjaxDataPromise(ajaxModeloIntervencionxDepto)
        .then(data => {
            cargaSelect2ModeloIntervencion(data);
        })
        .catch(error => {
            console.log("ha ocurrido un error " + error);
        });
};

cargaDropdownModeloAdosado = (codModeloIntervencion) => {

    ajaxObtenerModelosAdosados.data = `{'codModeloIntervencion':'${codModeloIntervencion}'}`;

    getAjaxDataPromise(ajaxObtenerModelosAdosados)
        .then(data => {
            cargaSelect2ModelosAdosados(data);
        })
        .catch(error => {
            console.log("ha ocurrido un error " + error);
        });
};

cargaDropdownLineaAccion = () => {

    getAjaxDataPromise(ajaxLineaAccion)
        .then(data => {
            cargaSelect2LineaAccion(data);
        })
        .catch(error => {
            console.log("ha ocurrido un error " + error);
        });
};

bloqueoInicial = () => {
    $("#btnGuardarProyectoLicitacion").attr("disabled", true);
    setDisabledBootstrapSwitch($("#chkEsProyectoContinuidad"), false);
    $(".proyecto-continuidad").attr("disabled", true);
};

limpiar = (limpiarTabla) => {

    if (limpiarTabla)
        table.clear().draw();


    setValueSelect2($(".depto"), 0);
    setValueSelect2($(".region"), 0);
    setValueSelect2($(".comuna"), 0);
    setValueSelect2($(".linea-accion"), 0);
    setValueSelect2($(".modalidad-atencion"), 0);
    setValueSelect2($(".tipo-atencion"), 0);
    setValueSelect2($(".sexo-poblacion"), 0);
    $(".nro-plazas").val("");
    $(".monto-periodo-licitar").val("");
    setStateBootstrapSwitch($("#chkFactorVidaFamiliar"), false);
    $(".modelo-intervencion").attr("disabled", true);


    setValueSelect2($(".modelo-intervencion-adosado"), 0);
    $(".modelo-intervencion-adosado").attr("disabled", false);

    $(".nro-plazas-adosado").val('');
    $(".modelo-intervencion-adosado").attr("disabled", false);
}