// var routes = [];

var defaultdataType = "json";
var defaultContentType = 'application/json; charset="utf-8"';

function ajaxData(
    type,
    url,
    data,
    dataType,
    contentType,
    success,
    error,
    complete
) {
    return {
        type: type,
        url: url,
        data: data,
        dataType: dataType,
        contentType: contentType,
        success: success,
        error: error,
        complete: complete
    };
}

var ajaxCargaGridResoluciones = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerResoluciones",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxInstituciones = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerInstitucionByUserId",
    `{}`,
    defaultdataType,
    defaultContentType
);


//var dataJson = JSON.stringify({ institucion: { CodInstitucion: $(".institucion").val(), IndVigencia: "V", EstadoProyecto: 1 } });
var ajaxProyectosxInstitucion = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerProyectosxInstitucion",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxProyectosByUserid = new ajaxData(
    "POST",
    'ResolucionProyecto.aspx/ObtenerProyectosByUserId',
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxTipoResolucion = new ajaxData(
    "POST",
    'ResolucionProyecto.aspx/ObtenerTiposResolucion',
    `{}`,
    defaultdataType,
    defaultContentType
)

var ajaxTipoTerminoResolucion = new ajaxData(
    "POST",
    'ResolucionProyecto.aspx/ObtenerTipoTerminoResolucion',
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxProyectosOrigen = new ajaxData(
    "POST",
    'ResolucionProyecto.aspx/ObtenerProyectoOrigen',
    `{}`,
    defaultdataType,
    defaultContentType
);


var ajaxInstitucionOrigen = new ajaxData(
    "POST",
    'ResolucionProyecto.aspx/ObtenerInstitucionOrigen',
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxRegiones = new ajaxData(
    "POST",
    'ResolucionProyecto.aspx/ObtenerRegiones',
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxDiasAtencion = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerDiasAtencion",
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxLineaAccion = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerTipoProyecto",
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxLineaAccionxModelo = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerTipoProyectoxModelo",
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxComuna = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerComunas",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxBancos = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerBancos",
    `{}`,
    defaultdataType,
    defaultContentType
);


var ajaxModeloIntervencion = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/GetModelosIntervencion",
    '{}',
    "json",
    'application/json; charset="utf-8"'
);

var ajaxModeloIntervencionxDepto = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/GetModelosIntervencionxDepto",
    '{}',
    "json",
    'application/json; charset="utf-8"'
);

var ajaxDeptosSename = new ajaxData(
    "POST",
    //"ResolucionProyecto.aspx/ObtenerDeptosSenamexModeloIntervencion",
    "ResolucionProyecto.aspx/ObtenerDeptosSename",
    `{}`,
    defaultdataType,
    defaultContentType
);


var ajaxTipoAtencion = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerTiposAtencion",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxModalidadAtencion = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerModalidadesAtencion",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxSistemaAsistencial = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerSistemasAsistenciales",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxTipoPago = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerTipoPago",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxMateria = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerMaterias",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxFactoresLey20032 = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerFactorLey",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxDatosProyecto = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/ObtenerDatosProyecto',
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxDatosUltimaResolucion = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/ObtenerDatosResolucion',
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxRol = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerIdRol",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxTokens = new ajaxData(
    "POST",
    "ResolucionProyecto.aspx/ObtenerTokens",
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxGuardarResolucionProyecto = new ajaxData(
    "ResolucionProyecto.aspx/Guardar",
    "POST",
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxGuardarResolucion = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/GuardarResolucion',
    `{}`,
    defaultdataType,
    defaultContentType
);

var ajaxObtenerModelosAdosados = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/ObtenerModelosAdosados',
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxObtenerCantidadModelosAdosados = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/ObtenerCantidadModelosAdosados',
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxGuardarDatosProyectos = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/GuardarDatosProyecto',
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxListaLicitacionProyecto = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/ListaLicitacionProyecto',
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxGuardarVerificadorAdjunto = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/GuardarValidacionArchivoResolucion',
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxListaDatosAnexo = new ajaxData('POST', 'ResolucionProyecto.aspx/ListarDatosAnexos', '{}', defaultdataType, defaultContentType);
var ajaxListarLicitaciones = new ajaxData('POST', 'ResolucionProyecto.aspx/ObtenerLicitaciones', {}, defaultdataType, defaultContentType);

var ajaxListaProyectoContinuidad = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/ObtenerProyectosDestino',
    '{}',
    defaultdataType,
    defaultContentType
);
var ajaxObtenerDatosProyectoContinuidad = new ajaxData(
     'POST',
    'ResolucionProyecto.aspx/ObtenerDatosProyectoContinuidad',
    '{}',
    defaultdataType,
    defaultContentType
);

var ajaxObtenerProyectos = new ajaxData(
    'POST',
    'ResolucionProyecto.aspx/ObtenerProyectos',
    '{}',
    defaultdataType,
    defaultContentType
);
