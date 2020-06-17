// Global


$(document).ready(function () {
    console.log("Iniciando Tab 1...");
    
    cargadropdownDepto();

    $("#btnGuardarAnexo1").on("click", (e) => {
        e.preventDefault();

        var msg = "";
        var dataListMsg = "";

        var p = CollectDatosAnexo1("C");

        msg = ValidaDatoAnexo1(p, "C");

        dataListMsg = '<dl class="m-1"><dt class="mb-2">Faltan los siguientes items requeridos : </dt>' +
            msg.toString().replace(/,/g, "") +
            "</dl>";

        if (msg.length === 0) {
            
            var jsonData = JSON.stringify({ 'numeroCdp': `${p.NumeroCdp}`, 'icodVerificadorOffline': `${p.IcodVerificadorOffline}`, 'codDeptoSename': `${p.CodDeptoSename}` });

            $.ajax({
                type: "POST",
                url: "ResolucionProyecto.aspx/GuardarAnexo",
                data: jsonData,
                dataType: 'json',
                contentType: 'application/json; charset="utf-8"',
                success: data => { },
                complete: console.log("Completado correctamente"),
                error: () => { }
            }).then(data => {

                if (data.d !== -1) {
                    $.confirm({
                        title: "DATOS ANEXO 1",
                        content: "Se realizó el ingreso de los datos. Se recargará el Formulario",
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
                } else {
                    $.confirm({
                        title: "DATOS ANEXO 1",
                        content: "El número CDP que estás ingresando, ya existe",
                        buttons: {
                            ok: {
                                text: "OK",
                                btnClass: "btn-primary",
                                keys: ["enter"],
                                action: function() {
                                    
                                }
                            }
                        }
                    });
            }

            });

        }
        else {
            $.confirm({
                title: "DATOS ANEXO 1",
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
    
    $("#btnAdjuntoCdp").on("click",
        function (e) {
            e.preventDefault();

            if ($("#lblAdjuntoCdp").val().includes("pdf"))
                AdjuntarArchivo("CDP");
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

    CargaDatosAnexo(null);

    BloquearLicitacion(false);
});

cargadropdownDepto = () => {

    var codDepto = null;
    ajaxDeptosSename.data = `{'codDepto': ${codDepto}}`;

    getAjaxDataPromise(ajaxDeptosSename)
        .then(data => {
            cargaSelect2Deptos(data);
        })
        .catch(error => {
            console.log("ha ocurrido un error " + error);
        });
};

cargadropdownLicitacion = (codLicitacion) => {

    ajaxListarLicitaciones.data = `{'codLicitacion': ${codLicitacion}}`;

    getAjaxDataPromise(ajaxListarLicitaciones)
        .then(data => {
            cargaSelect2Licitaciones(data);
        })
        .catch(error => {
            console.log(`error al cargar dropdown Licitaciones ${error}"`);
        });
};

BloquearLicitacion = (opcion) => {

    if (opcion === true) {
       //
    }

    var arrVariablesAdjudicado = [
        "ddlDeptos",
        "txtNumeroCdp",
        "btnAdjuntoCdp",
        "btnGuardarAnexo1"
    ];

    arrVariablesAdjudicado.forEach(
        function (currentValue, index) {
            document.getElementById(currentValue).disabled = opcion;
        }
    );
}

CargaDatosAnexo = (codDatosAnexo) => {
    var datoAnexo = $("#select-datoanexo");
    datoAnexo.empty();
    datoAnexo.unbind();
    //datoAnexo.select2("destroy").select2();

    return $.ajax({
        type: "POST",
        url: baseUrl + "ObtenerDatosAnexos",
        data: `{'codDatosAnexo': ${codDatosAnexo}}`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

        },
        error: function (r) {
            console.log("Ocurrió un error al cargar la Lista de tipo de Resolución");
        }
    }).then(function (data) {

        datoAnexo.select2({
            placeholder: "SELECCIONAR",
            data: $.map(data.d,
                function (obj) {
                    obj.id = obj.id || obj.CodDatosAnexo;
                    obj.text = obj.text || obj.NumeroCdp;
                    return obj;
                }),
            escapeMarkup: function (markup) {
                return markup;
            },
            matcher: matchCustom,
            templateResult: tmplDatosAnexoResult,
            templateSelection: tmplDatosAnexoSelect,
            allowClear: false

        }).on("change",
            function () {
                if ($(this).val()) {
                                    }
            });

        datoAnexo.val(null).trigger("change");

    });
}

/********* VALIDACIONES ***********/
function ValidaDatoAnexo1(p, opcion) {
    var msg = [];
    var strstartdd = '<dd class="small"><i class="fa fa-times mr-1"></i>';
    var strenddd = "</dd>";

    if (!p.NumeroCdp) {
        msg.push(strstartdd + " Debe incluir el Número CDP" + strenddd);
    }
    
    if (!p.IcodVerificadorOffline) {
        msg.push(strstartdd + " Se han perdido los datos del formulario. Por favor vuelva a ingresa a Senainfo" + strenddd);
    }

    if (!p.CodDeptoSename) {
        msg.push(strstartdd + " Debe especificar el Departamento de Sename" + strenddd);
    }

    if (p.ContadorAdjuntoCdp === 0) {
        msg.push(strstartdd + " Debe adjuntar el archivo correspondiente al CDP" + strenddd);
    }

    return msg;
}

function CollectDatosAnexo1(opcion) {
    var p = new Object();

    if (opcion === "C") {
        p.NumeroCdp = parseInt($(".nro-cdp").val());
        p.CodDeptoSename = $("#ddlDeptos").val();
        p.IcodVerificadorOffline = adjuntoOffline;
        p.ContadorAdjuntoCdp = contadorAdjuntoCdp;
    }

    return p;
}

/********* TEMPLATES ***********/
function tmplDatosAnexoResult(repo) {
    if (repo.loading) return repo.text;

    var texto = "<div class='select2-result-repository__description'>Número CDP : " +
        repo.NumeroCdp + 
        "</div>";

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__title'>" +
        "<b>" +
        repo.Departamento +
        "</b>" +
        "</div>";

    markup = markup + texto + "</div>";

    return markup;
}

function tmplDatosAnexoSelect(repo) {
    return repo.NumeroCdp || repo.text;
}