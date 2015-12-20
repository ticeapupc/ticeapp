function isEmpty(str) {
    return (!str || 0 === str.length);
}

function crearCapa() {
    var codigoCapa = $('input#codigoCapa').val();
    if (!isEmpty(codigoCapa)) {
        window.location.href = "/Home/CrearCapa/?codigoCapa=" + codigoCapa;
    } else {
        notie.alert(1, 'Debe guardar la capacitación', 2);
    }
}

function crearTallerMaterial() {
    var codigoCapa = $('input#codigoCapa').val();
    if (!isEmpty(codigoCapa)) {
        window.location.href = "/Home/CrearCapa2/?codigoCapa=" + codigoCapa;
    } else {
        notie.alert(1, 'Debe guardar la capacitación', 2);
    }
}

function crearParticipante() {
    var codigoCapa = $('input#codigoCapa').val();
    if (!isEmpty(codigoCapa)) {
        window.location.href = "/Home/CrearCapa3/?codigoCapa=" + codigoCapa;
    } else {
        notie.alert(1, 'Debe guardar la capacitación', 2);
    }
}

function cargarParticipantes() {
	var codigoCapacitacion = $('input#codigoCapa').val();
    jQuery.support.cors = true;
	var _url1 = 'http://localhost:49492/api/Docente';
	var _url2 = 'http://localhost:49492/api/CapacitacionParticipante?codigoCapacitacion=' +codigoCapacitacion;
    $.ajax({
        url: _url1,
        type: 'GET',
        dataType: 'json',
        success: function (dataDocente) {
			$.ajax({
        		url: _url2,
        		type: 'GET',
        		dataType: 'json',
        		success: function (participantes) {
					WriteResponseParticipantes(dataDocente,participantes);
					bindTableResultParticipantes();
				},
            	error: function (x, y, z) {
					alert(x + '\n' +y + '\n' +z);
				}
            });
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function WriteResponseParticipantes(docentes,participantes) {
    var strResult = '';
    $.each(docentes, function (index, docente) {
    	strResult += '<tr rel="' + docente.codigoDo0cente + '">';
    	if(findByCodDocente(docente.codigoDo0cente,participantes)){
			strResult += '<td><div class="checkbox"><label><input rel="'+docente.codigoDo0cente+'" value="' + docente.codigoDo0cente+'" type="checkbox" checked></label></div></td>';
		}else{
			strResult += '<td><div class="checkbox"><label><input rel="'+docente.codigoDo0cente+'" value="' + docente.codigoDo0cente+'" type="checkbox"></label></div></td>';
		}
    	strResult += '<td > ' + docente.codigoDo0cente + '</td><td id="nom'+ docente.codigoDo0cente+ '"> ' + docente.apellidos + ', ' +docente.nombres + '</td>';
        strResult += '</tr>';
    });
    $("#tBodyResult").html(strResult);
}

function findByCodDocente(codDocente,participantes) {
	for (item in participantes) {
		if(participantes[item].codigoDocente == codDocente) {
			return true;
		}
    }
	return false;
}

function bindTableResultParticipantes() {
	var codigoCapacitacion = $('input#codigoCapa').val();
    $('#tblParticipantes tbody tr').on('click', function(event) {
    	if($(this).hasClass('success')) {
            $('input#participanteSelected').val('');
            $(this).removeClass('success');
            } else {
            $('input#participanteSelected').val($(this).attr('rel'));
            $(this).addClass('success').siblings().removeClass('success');
            }
            });
    $('#tblParticipantes input[type=checkbox]').change(function () {
    	if ($(this).is(':checked')) {
    	//checked
		var rel = $(this).attr('rel');
		var nom = $('#nom' + rel).text();
		if (!isEmpty(rel)) {
			var addParticipante = {
				'codigoDocente': rel,
			'codigoCapacitacion': codigoCapacitacion,
				'nombreCompleto': nom,
				'enviarConvocatoria': true
				}
			$.ajax({
					type: 'POST',
						data: addParticipante,
						url: 'http://localhost:49492/api/CapacitacionParticipante',
							dataType: 'JSON'
							}).done(function (response) {
								if (response != '-1') {
					alert('Error al guardar capacitación');
    }
				});
				}
				} else {
    	//not checked
		var rel = $(this).attr('rel');
		if (!isEmpty(rel)) {
			$.ajax({
			type: 'POST',
				data: addParticipante,
				url: 'http://localhost:49492/api/CapacitacionParticipante?codigoDocente='+rel+'&codigoCapacitacion='+codigoCapacitacion,
					dataType: 'JSON'
					}).done(function (response) {
						if (response != '-1') {
					alert('Error al guardar capacitación');
					}
				});
			}
		}
	});
}

function cancelar() {
    window.location.href = "/Home/Main";
}

$(document).ready(function () {
    $('#btnCancelar').on('click', cancelar);
    cargarParticipantes();
});