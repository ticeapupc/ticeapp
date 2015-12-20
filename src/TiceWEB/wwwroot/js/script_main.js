function isEmpty(str) {
    return (!str || 0 === str.length);
}

function buscarCapacitaciones() {
    jQuery.support.cors = true;
    var codigoTaller = $('select#selectCapaTaller').val();
    var codigoPeriodo = $('select#selectCapaPeriodo').val();
    var nombreCapacitacion = $('input#inputCapaNombre').val();
    if (isEmpty(codigoTaller)) {
        alert('Debe seleccionar un taller');
    } else if (isEmpty(codigoPeriodo)) {
        alert('Debe seleccionar un periodo');
    }
    if (!isEmpty(codigoTaller) && !isEmpty(codigoPeriodo)) {
        $.ajax({
            url: 'http://localhost:49492/api/Capacitacion?codigoTaller=' + codigoTaller + '&codigoPeriodo=' + codigoPeriodo + '&nombreCapacitacion=' + nombreCapacitacion,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                WriteResponse(data);
                bindTableResult();
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
}

function WriteResponse(capas) {
    var strResult = '';
    $.each(capas, function (index, capa) {
        strResult += '<tr rel="' + capa.codigoCapacitacion + '">';
        strResult += '<td> ' + capa.nombre + '</td>';
        strResult += '<td>' + capa.nombreTaller + '</td>';
        strResult += '<td>' + capa.capacitacionActiva + '</td>';
        strResult += '<td>' + capa.periodo + '</td>';
        strResult += '<td>' + capa.fechaCapacitacion + '</td>';
        strResult += '<td></td>';//estado
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" data-rel="' + capa.codigoCapacitacion + '">'
        strResult += '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    $("#tbodyResult").html(strResult);
}

function bindTableResult() {
    $('#tblCapacitaciones tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {
            $('input#capaSelected').val('');
            $(this).removeClass('success');
            $('#txtCrearCapa').text('Crear Capacitacion');
        } else {
            $('input#capaSelected').val($(this).attr('rel'));
            $(this).addClass('success').siblings().removeClass('success');
            $('#txtCrearCapa').text('Editar Capacitacion');
        }
    });
}

function irCrearCapa() {
    var codigoCapa = $('input#capaSelected').val();
    if (!isEmpty(codigoCapa)) {
        window.location.href = "/Home/EditarCapa/?codigoCapa=" + codigoCapa;
    } else {
        window.location.href = "/Home/CrearCapa";
    }
}

$(document).ready(function () {
    $('#btnBuscarCapa').on('click', buscarCapacitaciones);
});