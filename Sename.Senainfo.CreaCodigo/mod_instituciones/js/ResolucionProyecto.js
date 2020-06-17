var idRol = 0;
var table = null;
var tableAdosados = null;

alertify.defaults.transition = "slide";
alertify.defaults.theme.ok = "btn btn-primary";
alertify.defaults.theme.cancel = "btn btn-danger";
alertify.defaults.theme.input = "form-control";


Init = () => {
    configInicial();
    // Inicializar controles ddl como select2
    $(".ddl").select2({
        width: "100%"
    });
};

configInicial = () => {
    iniciarSpinner();
    //inicializarControlFechas();

    $("#liTabAnexo1").removeClass("bloqueado");
    $("#liTabDatosProyecto").removeClass("bloqueado");
    $("#liTabDatosResolucion").removeClass("bloqueado");
    $("div.error").hide();

    $("#btnLimpiar").on("click", (e) => {
        e.preventDefault();
        console.log("limpiando...");
        limpiar(false);
    });

    //guardarDatosProyectos();
    bloqueoInicial();
};


iniciarSpinner = () => {
    var $loading = $("#spinner").hide();

    $(document)
        .ajaxStart(function () {
            $loading.show();
        })
        .ajaxStop(function () {
            $loading.hide();
        });
};

cargaDatepicker = (obj, fechaInicio, fechaTermino, funcion) => {
    obj.datepicker("destroy");

    obj.datepicker({
        minDate: fechaInicio,
        maxDate: fechaTermino,
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        onSelect: funcion
    });
};

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

getTextSelectedValueInput2 = obj => {
    var text;
    try {
        text = $(obj).first().select2('data')[0].text;
    } catch (e) {
        text = '';
    }

    return text; /*$(obj).first().select2('data')[0].text;*/
};

function ObtenerFechaMoment(obj) {
    return moment(obj.val(), "DD-MM-YYYY").format();
};

setStateBootstrapSwitch = (obj, stateToSet) => {
    $("[name='" + obj[0].name + "']").bootstrapSwitch("state", stateToSet);
};

setValueSelect2 = (obj, value) => {
    $(obj)
        .val(value)
        .trigger("change");
};

getStateBootstrapSwitch = obj => {
    var state = $(obj).first().bootstrapSwitch("state");
    /*$("[name='" + obj[0].name + "']").bootstrapSwitch("state");*/
    if (state) {
        return 1;
    }

    return 0;
};

getStateBootstrapSwitchsetStateBootstrapSwitch = (obj, stateToSet) => {
    $("[name='" + obj[0].name + "']").bootstrapSwitch("state", stateToSet);
};

setDisabledBootstrapSwitch = (obj, stateDisabledToSet) => {
    $("[name='" + obj[0].name + "']").bootstrapSwitch(
        "toggleDisabled",
        stateDisabledToSet
    );
};