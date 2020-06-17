setInstitucion = (institucion) => {
    if (!institucion.id)
        return institucion.text;

    var markup =
        `<div class='select2-result-repository__description' data-id='${institucion.CodInstitucion}' data-rutInstitucion='${institucion.RutInstitucion}'>
            <span class='glyphicon glyphicon-home'></span>&nbsp; 
            ${institucion.NombreInstitucion} 
             </div>
            <div><strong>Cod:${institucion.CodInstitucion}, Rut: ${institucion.RutInstitucion}
            </strong></div>`;

    //${ institucion.Rut }, Cod: ${ institucion.CodInstitucion }, Direccion: ${ institucion.Direccion } 
    return markup;
}

setProyecto = (proyecto) => {
    if (!proyecto.id)
        return proyecto.text;

    var markup = `<div class='select2-result-repository__description'>
            <span class='glyphicon glyphicon-home'></span>&nbsp; 
            ${proyecto.NombreProyecto} 
             </div>`;

    return markup;
}

setModeloIntervencion = (modelo) => {
    if (!modelo.id)
        return modelo.text;

    var markup = `<div class='select2-result-repository__description' 
                    data-id='${modelo.CodModeloIntervencion}'   
                    data-emin='${modelo.EdadMinimaIngreso}' 
                    data-emax='${modelo.edadMaximaIngreso}'>
                        <span class='glyphicon glyphicon-home'></span>&nbsp; 
                        ${modelo.Descripcion} 
                  </div>
                  <div><strong>
                    Cod: ${modelo.CodModeloIntervencion}, Edad Minima: ${modelo.EdadMinimaIngreso}, Edad Máxima: ${modelo.EdadMaximaIngreso}, Ley 20032: ${(modelo.LRPA) === 0 ? "NO": "SI" }
                  </strong></div>`;

    return markup;
}

setLicitacion = (licitacion) => {
    if (!licitacion.CodLicitacion)
        return licitacion.text;

    return `<div class='select2-result-repository__description' 
                    data-id='${licitacion.codLicitacion}' data-Depto='${licitacion.CodDeptoSename}'>
                        <span class='glyphicon glyphicon-home'></span>&nbsp; 
                        Cod. Licitacion : ${licitacion.CodLicitacion}, Numero Licitacion: ${licitacion.NumeroLicitacion}, Numero Cdp: ${licitacion.NumeroCdp}
                  </div>
                  <div><strong>
                    Depto: ${licitacion.Depto}
                  </strong></div>`;
}