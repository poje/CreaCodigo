console.log("cargado desde resproy datos Proyecto");

function DatosProyecto() {
    return {
        ICodProyectoAdjudicado: 0
        , iCodVerificadorAdjunto: 0
        , iCodDatoResolucion: 0
        , Nombre: $(".nombre-proyecto").val()
        , Emailproyecto: $(".email").val()
        , RutInstitucion: $(".rut-institucion").val()
        , FechaInicio: ObtenerFechaMoment($(".fecha-inicio-proyecto"))
        , FechaTermino: ObtenerFechaMoment($(".fecha-termino-proyecto"))
        , Direccion: $(".direccion").val()
        , Telefono: $(".telefono").val()
        , NombreDirector: $(".nombre-director").val()
        , RutDirector: $(".rut-director").val()
        , CelularDirector: $(".celular-director").val()
        , CodBanco: getSelectedValueInput2($(".banco"))
        , cuentaCorriente: $(".nro-cuenta-corriente").val()
        , IndVigencia: 'V'
    };
}

function VerificadorAdjunto(iCodVerificadorAdjunto, codTipoVerificador, codArchivo, nombreArchivo, idUsuario, fechaCreacion, indVigencia) {
    return {
        IcodVerificadorAdjunto: iCodVerificadorAdjunto
        ,CodTipoVerificador : codTipoVerificador
        ,CodArchivo : codArchivo
        ,NombreArchivo : nombreArchivo
        ,IdUsuario : idUsuario
        ,FechaCreacion : fechaCreacion
        ,IndVigencia : indVigencia
    }
}


