/**

 * @fileoverview     Archivo encargado de la lógica de Ingreso y Revisión de información en formulario de Resolución/Proyecto
 * @version          1.0
 * @author           Jorge Villaseca
 * History

 * v1.0 Carga de Promesas para mejorar flujo de Resoluciones Proyectos

/**
* Tiene todas las promesas utilizadas en el formulario
*/

/**
 * Promesa encargada de hacer llamadas ajax, basandose en los parametros recibidos
 */

agregarSelectOption = obj => {
    $(obj).append('<option value="-1>Seleccionar</option>');
    $(obj)
        .val(-1)
        .trigger("change.select2");
};

getAjaxDataPromise = ajaxParams => {
    return new Promise((resolve, reject) => {
        var datos = $.ajax({
            type: ajaxParams.type,
            url: ajaxParams.url,
            data: ajaxParams.data,
            contentType: ajaxParams.contentType,
            dataType: ajaxParams.dataType,
            success: ajaxParams.success,
            error: ajaxParams.error,
            complete: ajaxParams.complete
        });

        if (datos === null)
            reject(
                new Error(error => {
                    "Error al realizar consulta ajax" + error;
                })
            );

        resolve(datos);
    });
};

cargaSelect2Regiones = data => {
    return new Promise((resolve, reject) => {
        $(".region").empty();
        $(".region").select2({
            placeholder: "Seleccione una región",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodRegion;
                obj.text = obj.text || obj.NombreRegion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".region"));

        $(".region").on("change", e => {
            var codRegion = getSelectedValueInput2($(".region"));

            ajaxComuna.data = `{'codRegion':'${codRegion}'}`;

            Promise.all([
                //getAjaxDataPromise(ajaxInstituciones),
                getAjaxDataPromise(ajaxComuna)
            ])
                .then(values => {
                    //cargaSelect2Instituciones(values[0]);
                    cargaSelect2Comuna(values[0]);
                })
                .catch(error => {
                    console.log(error);
                });
        });

        if ($(".region") === null)
            reject(
                new Error("Ha ocurrido un error al cargar select2 Regiones " + error)
            );

        resolve($(".region"));
    });
};

cargaSelect2Instituciones = data => {
    return new Promise((resolve, reject) => {
        $(".institucion").empty();

        $(".institucion").select2({
            placeholder: "Seleccione una institución",
            width: "100%",
            templateResult: setInstitucion,
            templateSelect: setInstitucion,
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodInstitucion;
                obj.text = obj.text || obj.NombreInstitucion;
                return obj;
            }),
            cache: false,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".institucion"));

        $(".institucion").on("change", e => {
            $(".proyecto").empty();

            //Si es proyecto en ejecución
            if (!getStateBootstrapSwitch($("#chkEjecucion"))) {
                var codInstitucion = getSelectedValueInput2($(".institucion"));
                var indVigencia = "V";
                var dataJson = `{'indVigencia':'${indVigencia}','codInstitucion':'${codInstitucion}'}`;

                ajaxProyectosByUserid.data = dataJson;

                getAjaxDataPromise(ajaxProyectosByUserid)
                    .then(data => {
                        cargaSelect2Proyectos(data);
                    })
                    .catch(error => {
                        console.log("error al cargar dropdown de Proyectos " + error);
                    });
            }
        });

        if ($(".institucion") === null)
            reject(
                new Error(
                    "ha ocurrido un error al cagar select2 de instituciones " + error
                )
            );

        resolve($(".institucion"));
    });
};

cargaSelect2Proyectos = data => {
    return new Promise((resolve, reject) => {
        $(".proyecto").select2({
            placeholder: "Seleccione un Proyecto",
            width: "100%",
            templateResult: setProyecto,
            templateSelect: setProyecto,
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodProyecto;
                obj.text = obj.text || obj.NombreProyecto;
                return obj;
            }),
            cache: false,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".proyecto"));

        if ($(".proyecto") === null)
            reject(new Error("error al cargar select2 Proyectos " + error.text));

        resolve($(".proyecto"));
    });
};

cargaSelect2TipoResolucion = data => {
    return new Promise((resolve, reject) => {
        $(".tipo-resolucion").select2({
            placeholder: "Seleccione un Tipo de Resolución",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodTipoResolucion;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: false,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".tipo-resolucion"));

        if ($(".tipo-resolucion") === null)
            reject(
                new Error("error al cargar select2 Tipo Resolucion " + error.text)
            );

        resolve($(".tipo-resolucion"));
    });
};

cargaSelectAnos = () => {
    $(".ano")
        .yearselect({ start: moment().year() - 1, end: moment().year() })
        .select2({
            placeholder: "Seleccione un Año"
        });

    agregarSelectOption($(".ano"));
};

cargaSelect2TipoTermino = data => {
    return new Promise((resolve, reject) => {
        $(".tipo-termino").select2({
            placeholder: "Seleccione un Tipo de Termino",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodTipoTermino;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: false,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".tipo-termino"));

        if ($(".tipo-termino") === null)
            reject(new Error("error al cargar select2 Tipo Termino " + error.text));

        resolve($(".tipo-termino"));
    });
};

cargaSelect2InstitucionOrigen = data => {
    return new Promise((resolve, reject) => {
        $(".institucion-origen").select2({
            placeholder: "Seleccione una Institución de Origen",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodInstitucion;
                obj.text = obj.text || obj.NombreInstitucion;
                return obj;
            }),
            cache: false,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".institucion-origen"));

        $(".institucion-origen").on("change", e => {

            // var codInstitucion = getSelectedValueInput2($(".institucion"));

            var dataInstitucion = $(".institucion-origen").select2('data')[0];

            var dataJson = `{'codInstitucion':'${dataInstitucion.CodInstitucion}'}`

            ajaxProyectosOrigen.data = dataJson;

            getAjaxDataPromise(ajaxProyectosOrigen)
                .then(data => {
                    console.log(data);
                    cargaSelect2ProyectoOrigen(data);
                }).catch(error => {
                    console.log(error);
                });
        });

        if ($(".institucion-origen") === null)
            reject(
                new Error("error al cargar select2 Institucion Origen " + error.text)
            );

        resolve($(".institucion-origen"));
    });
};

cargaSelect2ProyectoOrigen = data => {
    return new Promise((resolve, reject) => {
        $(".proyecto-origen").select2({
            placeholder: "Seleccione un Proyecto de Origen",
            width: "100%",
            templateResult: setProyecto,
            templateSelect: setProyecto,
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodProyecto;
                obj.text = obj.text || obj.Nombre;
                return obj;
            }),
            cache: false,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".proyecto-origen"));

        if ($(".proyecto-origen") === null)
            reject(
                new Error("error al cargar select2 Proyecto Origen " + error.text)
            );

        resolve($(".proyecto-origen"));
    });
};

cargaSelect2Comuna = data => {
    return new Promise((resolve, reject) => {
        $(".comuna").empty();
        $(".comuna").select2({
            placeholder: "Seleccione una Comuna",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodComuna;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".comuna"));

        if ($(".comuna") === null)
            reject(new Error("error al cargar dropdown comuna " + error));

        resolve($(".comuna"));
    });
};

cargaSelect2Banco = data => {
    return new Promise((resolve, reject) => {
        $(".banco").select2({
            placeholder: "Seleccione un Banco",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodBanco;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".banco"));

        if ($(".banco") === null)
            reject(new Error("error al cargar dropdown comuna " + error));

        resolve($(".banco"));
    });
};

cargaSelect2LineaAccion = (data, value) => {
    return new Promise((resolve, reject) => {
        $(".linea-accion").select2({
            placeholder: "Seleccione Linea de Acción",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.IdTipoProyecto;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".linea-accion"));


        $(".linea-accion").on("change", (e) => {
            //var tipoProyecto = getSelectedValueInput2($(".linea-accion"));

            //if (tipoProyecto === 7) {
            //    setDisabledBootstrapSwitch($("#chkFactorVidaFamiliar"), false);
            //} else {
            //    setDisabledBootstrapSwitch($("#chkFactorVidaFamiliar"), true);
            //}

            //ajaxModeloIntervencion.data = `{'tipoProyecto': '${tipoProyecto}'}`;

            //getAjaxDataPromise(ajaxModeloIntervencion)
            //    .then(data => {
            //        cargaSelect2ModeloIntervencion(data);
            //    })
            //    .catch(error => {
            //        console.log(error);
            //    })
        });

        if (value !== null)
            setValueSelect2($(".linea-accion"), value);

        if ($(".linea-accion") === null)
            reject(new Error("error al cargar dropdown comuna " + error));

        resolve($(".linea-accion"));
    });
};

cargaSelect2Deptos = data => {
    return new Promise((resolve, reject) => {
        $(".depto").select2({
            placeholder: "Seleccione un Departamento",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodDepartamentosSename;
                obj.text = obj.text || obj.Nombre;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".depto"));

        seleccionarValueSelect2($(".depto"), 0);

        //$(".depto").on("change.select2", function (e) {

        //    var codDepto = getSelectedValueInput2($(".depto"));

        //    ajaxModeloIntervencionxDepto.data = `{'codDepto':'${codDepto}'}`;

        //    $(".modelo-intervencion").attr("disabled", false);

        //    getAjaxDataPromise(ajaxModeloIntervencionxDepto)
        //        .then(data => {
        //            cargaSelect2ModeloIntervencion(data);
        //        })
        //        .catch(error => {
        //            console.log("error al cargar modelos de intervencion x depto " + error);
        //        });
        //});

        if ($(".depto") === null)
            reject(new Error("error al cargar dropdown comuna " + error));

        resolve($(".depto"));
    });
};

cargaSelect2ModeloIntervencion = data => {
    return new Promise((resolve, reject) => {
        $(".modelo-intervencion").empty();
        $(".modelo-intervencion").select2({
            placeholder: "Seleccione un Módelo de Intervención",
            width: "100%",
            templateResult: setModeloIntervencion,
            templateSelect: setModeloIntervencion,
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodModeloIntervencion;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });
        agregarSelectOption($(".modelo-intervencion"));
        $(".modelo-intervencion").on("change", (e) => {
            var dataModeloIntervencion = $(".modelo-intervencion").select2('data');

            if (dataModeloIntervencion.length > 0) {
                var lrpa = dataModeloIntervencion[0].LRPA;
                var codModeloIntervencion = dataModeloIntervencion[0].CodModeloIntervencion;

                var dataJsonModalidadAtencion = `{'lrpa':'${lrpa}', 'codModeloIntervencion': '${codModeloIntervencion}'}`;
                var dataJsonTipoAtencion = `{'lrpa':'${lrpa}'}`;
                var dataJsonModeloAdosado = `{'codModeloIntervencion':${codModeloIntervencion}}`;

                var dataJsonObtenerCantidadModelosAdosados = `{'codModeloIntervencion':${codModeloIntervencion}}`;

                //var dataJsonDeptos = `{'codModeloIntervencion':'${codModeloIntervencion}'}`;
                var dataJsonLineaAccionxModelo = `{'codModeloIntervencion':'${codModeloIntervencion}'}`;

                ajaxLineaAccionxModelo.data = dataJsonLineaAccionxModelo;
                ajaxModalidadAtencion.data = dataJsonModalidadAtencion;
                ajaxTipoAtencion.data = dataJsonTipoAtencion;
                ajaxObtenerModelosAdosados.data = dataJsonModeloAdosado;

                ajaxObtenerCantidadModelosAdosados.data = dataJsonObtenerCantidadModelosAdosados;
                //ajaxDeptosSename.data = dataJsonDeptos;

                //debugger;
                Promise.all([
                    getAjaxDataPromise(ajaxModalidadAtencion),
                    getAjaxDataPromise(ajaxTipoAtencion),
                    getAjaxDataPromise(ajaxObtenerModelosAdosados),
                    getAjaxDataPromise(ajaxLineaAccionxModelo),
                    getAjaxDataPromise(ajaxObtenerCantidadModelosAdosados)
                    //getAjaxDataPromise(ajaxDeptosSename)
                ]).then(datas => {

                    $.when(cargaSelect2LineaAccion(datas[3])).done(function () {
                        $(".linea-accion").val($(".linea-accion option:eq(0)")[0].value).trigger('change');
                    });


                    $.when(cargaSelect2ModalidadAtencion(datas[0])).done(function () {
                        $(".modalidad-atencion").val($(".modalidad-atencion option:eq(0)")[0].value).trigger('change');
                    });

                    cargaSelect2TipoAtencion(datas[1]);

                    var cantidadModelosAdosados = datas[4].d;

                    if (cantidadModelosAdosados > 0) {
                        setDisabledBootstrapSwitch($("#chkProyectoAdosado"), false);
                        //setStateBootstrapSwitch($("#chkProyectoAdosado"), true);

                        cargaSelect2ModelosAdosados(datas[2]);
                    }
                    //} else {
                    //    setStateBootstrapSwitch($("#chkProyectoAdosado"), false);
                    //    setDisabledBootstrapSwitch($("#chkProyectoAdosado"), false);
                    //}


                    //cargaSelect2Deptos(datas[2]);

                    //$('.depto').val($('.depto').val($('.depto option:eq(1)').val()).trigger('change'));
                    //$(".modalidad-atencion").val($('.modalidad-atencion').val($('.modalidad-atencion option:eq(0)').val()).trigger('change'));

                }).catch(error => {
                    console.log(error);
                });

            }
        });





        if ($(".modelo-intervencion") === null)
            reject(
                new Error("error al cargar dropdown Modelo Intervencion")
            );

        //        $(".modelo-intervencion").val(data.d[0].CodModeloIntervencion).trigger("change.select2");

        resolve($(".modelo-intervencion"));
    });
};

cargaSelect2ModalidadAtencion = data => {
    return new Promise((resolve, reject) => {

        $(".modalidad-atencion").empty();
        $(".modalidad-atencion").select2({
            placeholder: "Seleccione Modalidad de Atención",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodTematicaProyecto;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".modalidad-atencion"));

        if ($(".modalidad-atencion") === null) {
            reject(new Error("error al cargar dropdown modalidad de atención " + error));
        }

        resolve($(".modalidad-atencion"));
    });
};

cargaSelect2TipoAtencion = data => {
    return new Promise((resolve, reject) => {
        $(".tipo-atencion").select2({
            placeholder: "Seleccione un Tipo de Atención",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodTipoAtencion;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".tipo-atencion"));

        if ($(".tipo-atencion") === null)
            reject(new Error("error al cargar dropdown comuna " + error));

        resolve($(".tipo-atencion"));
    });
};

cargaSelect2TipoPago = data => {
    return new Promise((resolve, reject) => {
        $(".tipo-pago").select2({
            placeholder: "Seleccione un Tipo de Pago",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.TipoSubvencion;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        if ($(".tipo-pago") === null)
            reject(new Error("error al cargar dropdown comuna " + error));

        resolve($(".tipo-pago"));
    });
};

cargaSelect2ModelosAdosados = data => {
    return new Promise((resolve, reject) => {
        $(".modelo-intervencion-adosado").empty();
        $(".modelo-intervencion-adosado").select2({
            placeholder: "Seleccione un Módelo de Intervención Adosado",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodModeloIntervencionHijo;
                obj.text = obj.text || obj.Descripcion;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        });

        agregarSelectOption($(".modelo-intervencion-adosado"));

        if ($(".modelo-intervencion-adosado") === null)
            reject(new Error("error al cargar dropdown comuna " + error));

        resolve($(".modelo-intervencion-adosado"));
    });
};

cargaselect2ProyectoContinuidad = data => {
    return new Promise((resolve, reject) => {
        $(".proyecto-continuidad").empty();
        $(".proyecto-continuidad").select2({
            placeholder: "Seleccione un Proyecto de Continuidad",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodProyecto;
                obj.text = obj.text || obj.Proyecto;
                return obj;
            }),
            cache: true,
            escapeMarkup: markup => markup,
            allowClear: true
        }).on("change", function (e) {
            var codProyectoContinuidad = getSelectedValueInput2($(".proyecto-continuidad"));
            //ajaxObtenerDatosProyectoContinuidad.data = `{'codProyectoContinuidad': '${codProyectoContinuidad}'}`;
            console.log(codProyectoContinuidad);

            ajaxObtenerDatosProyectoContinuidad.data = `{'codProyectoContinuidad': '${codProyectoContinuidad}'}`;

            var codDepto = $("#select-datoanexo").find(':selected').data('data').CodDeptoSename;

            ajaxModeloIntervencionxDepto.data = `{'codDepto': ${codDepto}}`;

            var datosProyectoContinuidad = null;

            getAjaxDataPromise(ajaxObtenerDatosProyectoContinuidad)
                .then(data => {
                    //console.log(data.d);

                    datosProyectoContinuidad = {
                        sexo: data.d.SexoProyecto,
                        codModeloIntervencion: data.d.CodModeloIntervencion,
                        tipoProyecto: data.d.CodTipoProyecto,
                        tipoSubvencion: data.d.CodTipoSubvencion,
                        codTipoAtencion: data.d.CodTipoAtencion,
                        codTematicaProyecto: data.d.CodTematicaProyecto,
                        montoLicitar: data.d.MontoLicitacion,
                        numeroPlazas: data.d.NumeroPlazas
                    };

                    seleccionarValueSelect2($(".modelo-intervencion"), datosProyectoContinuidad.codModeloIntervencion)
                        .then(() => {
                            ajaxLineaAccionxModelo.data = `{'codModeloIntervencion': '${datosProyectoContinuidad.codModeloIntervencion}'}`;
                            getAjaxDataPromise(ajaxLineaAccionxModelo)
                                .then(data => {
                                    cargaSelect2LineaAccion(data);
                                    seleccionarValueSelect2($(".linea-accion"), datosProyectoContinuidad.tipoProyecto);
                                });

                            ajaxModalidadAtencion.data = `{'codModeloIntervencion': '${datosProyectoContinuidad.codModeloIntervencion}'}`;

                            getAjaxDataPromise(ajaxModalidadAtencion)
                                .then(data => {
                                    cargaSelect2ModalidadAtencion(data);
                                    seleccionarValueSelect2($(".modalidad-atencion"), datosProyectoContinuidad.codTematicaProyecto);
                                });

                            getAjaxDataPromise(ajaxTipoAtencion)
                                .then(data => {
                                    cargaSelect2TipoAtencion(data);
                                    seleccionarValueSelect2($(".tipo-atencion"), datosProyectoContinuidad.codTipoAtencion);
                                });

                            $(".nro-plazas").val(datosProyectoContinuidad.numeroPlazas);
                            $(".monto-periodo-licitar").val(datosProyectoContinuidad.montoLicitar);
                        });

                }).catch(error => {
                    console.log(`error ${error}`);
                });

            resolve($(".proyecto-continuidad"));
        });
    });
};

cargaSelect2Licitaciones = data => {
    return new Promise((resolve, reject) => {
        $(".licitacion").empty();
        $(".licitacion").select2({
            placeholder: "Seleccione una Licitación",
            width: "100%",
            data: $.map(data.d, obj => {
                obj.id = obj.id || obj.CodLicitacion;
                obj.text = obj.text || obj.NumeroLicitacion;
                return obj;
            }),
            escapeMarkup: markup => markup,
            allowClear: true,
            templateSelect: setLicitacion,
            templateResult: setLicitacion
        });

        agregarSelectOption($(".licitacion"));

        $(".licitacion").on("change", function (e) {
            var codDepto = $(".licitacion").find(':selected').data('data').CodDeptoSename;

            ajaxModeloIntervencionxDepto.data = `{'codDepto':'${codDepto}'}`;

            $(".modelo-intervencion").attr("disabled", false);

            getAjaxDataPromise(ajaxModeloIntervencionxDepto)
                .then(data => {
                    cargaSelect2ModeloIntervencion(data);
                })
                .catch(error => {
                    console.log("error al cargar modelos de intervencion x depto " + error);
                });


            var codLicitacion = getSelectedValueInput2($(".licitacion"));

            ajaxObtenerProyectos.data = `{'codLicitacion':'${codLicitacion}'}`;

            getAjaxDataPromise(ajaxObtenerProyectos)
                .then(r=> {
                    console.log(r.d);
                    $.each(r.d, function () {

                        var boton = null;

                        table.row.add([
                            this.CodLicitacionProyecto,
                            this.CodRegion,
                            this.Region,
                            this.CodComuna,
                            this.Comuna,
                            this.Focalizacion,
                            this.SexoPoblAtendida,
                            this.NumeroMesesConvenio,
                            this.CodModeloIntervencion,
                            this.ModeloIntervencion,
                            this.CodLineaAccion,
                            this.LineaAccion,
                            this.CodModalidadAtencion,
                            this.ModalidadAtencion,
                            this.CodTipoAtencion,
                            this.TipoAtencion,
                            this.FactorVidaFamiliar,
                            this.NroPlazas,
                            this.MontoPeriodoLicitar,
                            this.EsProyectoContinuidad,
                            this.CodProyectoContinuidad,
                            ''
                        ]).draw(false);

                        $.each(this.ProyectosAdosados, function () {
                            tableAdosados.row.add([
                                this.CodAdosadoProyectoLicitacion,
                                this.CodLicitacionProyecto,
                                this.CodModeloIntervencion,
                                this.ModeloIntervencion,
                                this.NumeroPlazas,
                                this.Monto
                            ]).draw(false);
                        });

                        
                    });
                    //table.row.add([
                    //    data.d[i].CodRegion
                    //    //data.d[i].CodRegion,
                    //    //data.d[i].Region,
                    //    //data.d[i].CodComuna,
                    //    //data.d[i].Comuna,
                    //    //data.d[i].Focalizacion,
                    //    //data.d[i].SexoPoblAtendida,
                    //    //data.d[i].NumeroMesesConvenio,
                    //    //data.d[i].CodModeloIntervencion,
                    //    //data.d[i].ModeloIntervencion,
                    //    //data.d[i].CodLineaAccion,
                    //    //data.d[i].LineaAccion,
                    //    //data.d[i].CodModalidadAtencion,
                    //    //data.d[i].ModalidadAtencion,
                    //    //data.d[i].CodTipoAtencion,
                    //    //data.d[i].TipoAtencion,
                    //    //data.d[i].FactorVidaFamiliar,
                    //    //data.d[i].NroPlazas,
                    //    //data.d[i].MontoPeriodoLicitar,
                    //    //data.d[i].EsProyectoContinuidad,
                    //    //data.d[i].esProyectoContinuidadTexto,
                    //    //data.d[i].CodProyectoContinuidad
                    //]).draw(false);
                })
                .catch(error => {
                    console.log("error al cargar tabla de proyectos", error);
                });

        });

        if ($(".licitacion") === null)
            reject(new Error("error al cargar dropdown datos Anexo " + error));

        resolve($(".licitacion"));
    });
};

seleccionarValueSelect2 = (objS2, valueToS2) => {
    return new Promise((resolve, reject) => {
        $(objS2)
            .val(valueToS2)
            .trigger("change.select2");

        if ($(objS2) === null)
            reject(new Error("Objeto no ha sido inicializado correctamente"));

        resolve($(objS2));
    });
};

