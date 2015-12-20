function isEmpty(str) {
    return (!str || 0 === str.length);
}

function guardarCapa(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarCapacitacion input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    $('#guardarCapacitacion select').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {

        var editActividad = {
            'nombre': $('#guardarCapacitacion input#inputCapaNombre').val(),
            'certificado': $('#guardarCapacitacion input#inputCapaCertificado').val(),
            'codigoPerido': $('#guardarCapacitacion select#selectCapaPeriodo').val(),
            'codigoTaller': '2',
            'descripcion': $('#guardarCapacitacion textarea#textareaCapaDescripcion').val(),
            'capacitacionActiva': $('#guardarCapacitacion input#inputCapaActivo').val(),
            'lugar': $('#guardarCapacitacion input#inputCapaLugar').val(),
            'fechaCapacitacion': $('#guardarCapacitacion input#inputCapaFechaCapa').val(),
            'hora': $('#guardarCapacitacion input#inputCapaHora').val(),
            'correoContacto': $('#guardarCapacitacion input#inputCapaCorreo').val(),
            'enviarNotificacion': $('#guardarCapacitacion input#inputCapaEnviarNoti').val(),
            'periodicidadEnvio': $('#guardarCapacitacion input#inputCapaPeriodicidad').val(),
            'fechaInicioEnvio': $('#guardarCapacitacion input#inputCapaFechaInicio').val(),
            'usuarioCreacion': 'admin'
        }

        var codigoCapa = $('input#codigoCapa').val();
        if (!isEmpty(codigoCapa)) {
            editActividad.codigoCapacitacion = codigoCapa;
        }
        
        $.ajax({
            type: 'POST',
            data: editActividad,
            url: 'http://localhost:49492/api/Capacitacion',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            var codigoCapacitacion = parseInt(response);
            if (codigoCapacitacion > 0) {
                $('input#codigoCapa').val(''+codigoCapacitacion);
                // Clear the form inputs
                /*
                $('#guardarCapacitacion input').val('');
                $('#guardarCapacitacion select').val('');
                $('#guardarCapacitacion textarea').val('');
                */
                //actualizar vista
                notie.alert(1, 'Se registró la capacitación correctamente', 2);
            }
            else {
                alert('Error al guardar capacitación');
            }
        });
    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function cancelar() {
    window.location.href = "/Home/Main";
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
                    $('input#inputCapaNombre').val(capa.nombre);
                    $('input#inputCapaCertificado').val(capa.certificado);
                    $('select#selectCapaPeriodo').val(capa.codigoPerido);
                    $('textarea#textareaCapaDescripcion').val(capa.descripcion);
                    $('input#inputCapaActivo').val(capa.capacitacionActiva);
                    $('input#inputCapaLugar').val(capa.lugar);
                    $('input#inputCapaFechaCapa').val(capa.fechaCapacitacion);
                    $('input#inputCapaHora').val(capa.horaCapacitacion);
                    $('input#inputCapaCorreo').val(capa.correoContacto);
                    $('input#inputCapaEnviarNoti').val(capa.enviarNotificacion);
                    $('input#inputCapaPeriodicidad').val(capa.periodicidadEnvio);
                    $('input#inputCapaFechaInicio').val(capa.fechaInicioEnvio);
                });
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
}

$(document).ready(function () {
    $("#inputCapaFechaCapa").datepicker({ dateFormat: "dd/mm/yy" });
    $("#inputCapaFechaInicio").datepicker({ dateFormat: "dd/mm/yy" });

    $('#btnGuardarCapacitacion').on('click', guardarCapa);

    $('.spinner .btn:first-of-type').on('click', function () {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) + 1);
    });
    $('.spinner .btn:last-of-type').on('click', function () {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) - 1);
    });
    $('#btnCancelar').on('click', cancelar);

    cargarCapacitacion();

});