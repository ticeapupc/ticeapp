function isEmpty(str) {
    return (!str || 0 === str.length);
}

function bindSeleccionarTaller() {
    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('rel') // Extract info from data-* attributes
        var modal = $(this)
        jQuery.support.cors = true;
        var _url = 'http://localhost:49492/api/Taller';
        $.ajax({
            url: _url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                WriteResponseModal(data);
                bindTableModalResult();
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    })
}

function WriteResponseModal(talleres) {
    var strResult = '';
    $.each(talleres, function (index, taller) {
        strResult += '<tr rel="' + taller.codigoTaller + '"><td>' + taller.codigoTaller + '</td><td> ' + taller.nombreTaller + '</td>';
        strResult += '</tr>';
    });
    $("#modalTBodyResult").html(strResult);
}

function bindTableModalResult() {
    $('#tblTalleres tbody tr').on('click', function (event) {
        var selected = $(this).attr('rel');
        jQuery.support.cors = true;
        var _url = 'http://localhost:49492/api/Material?codigoTaller=' + selected;
        var codigoCapacitacion = $('input#codigoCapa').val();
        $.ajax({
            url: _url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var len = data.length;
                $.each(data, function (index, material) {
                    jQuery.support.cors = true;
                    var _url = 'http://localhost:49492/api/Capacitacion?codigoCapacitacion=' + codigoCapacitacion +
                        '&descripcion=' + material.nombreDocumento +
                        '&rutaDocumento=' + material.rutaDocumento;
                    $.ajax({
                        url: _url,
                        type: 'POST',
                        dataType: 'json',
                        success: function (data) {
                            console.log('index('+index+') - len('+len+')');
                            if (index+1 == len)
                                cargarMateriales();
                        },
                        error: function (x, y, z) {
                            alert(x + '\n' + y + '\n' + z);
                        }
                    });
                });
                $('#myModal').modal('toggle');
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    });
}

function cancelar() {
    window.location.href = "/Home/Main";
}

function cargarMateriales(){
    var codigoCapacitacion = $('input#codigoCapa').val();
    jQuery.support.cors = true;
    var _url = 'http://localhost:49492/api/CapacitacionMaterial?codigoCapacitacion='+codigoCapacitacion;
    $.ajax({
        url: _url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteResponseMateriales(data);
            bindTableResultMateriales();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}
function WriteResponseMateriales(materiales) {
    var strResult = '';
    $.each(materiales, function (index, material) {
        strResult += '<tr rel="' + material.codigoMaterial + '"><td>' + material.codigoMaterial + '</td><td> ' + material.descripcion + '</td>';
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalEditMaterial" data-rel="' + material.codigoMaterial + '">'
        strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalDelMaterial" data-rel="' + material.codigoMaterial + '">'
        strResult += '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    $("#tBodyResult").html(strResult);
}

function bindTableResultMateriales() {
    $('#tblMateriales tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {
            $('input#materialSelected').val('');
            $(this).removeClass('success');
        } else {
            $('input#materialSelected').val($(this).attr('rel'));            
            $(this).addClass('success').siblings().removeClass('success');
        }
    });
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


function cargarCapacitacion() {
    var codigoCapa = $('input#codigoCapa').val();
    if (!isEmpty(codigoCapa)) {
        jQuery.support.cors = true;
        var _url = 'http://localhost:49492/api/Capacitacion?codigoCapacitacion=' + codigoCapa;
        $.ajax({
            url: _url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, capa) {
                    $('#spNombreCapacitacion').text(capa.nombre);
                });
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
}

function cancelar() {
    window.location.href = "/Home/Main";
}

$(document).ready(function () {
    bindSeleccionarTaller();
    $('#btnCancelar').on('click', cancelar);
    cargarMateriales();
    cargarCapacitacion();
});