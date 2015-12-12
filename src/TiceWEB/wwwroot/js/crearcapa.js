
function guardarCapa(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    /*
    $('#guardarActividad input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {

        var nuevaActividad = {
            'codigoCurso': $('#guardarActividad select#selectCurso').val(),
            'codigoTipoCurso': $('#guardarActividad select#selectTipo').val(),
            'titulo': $('#guardarActividad input#inputTitulo').val(),
            'fechaInicio': $('#guardarActividad input#datepicker1').val(),
            'fechaFin': $('#guardarActividad input#datepicker2').val(),
            'codigoSesion': $('#guardarActividad select#selectSesion').val(),
            'codigoEstado': $('#guardarActividad select#selectEstado').val(),
            'descripcion': $('#guardarActividad select#textareaDesc').val(),
            'usuarioCreacion': 'admin',
            'codigoModalidad': '1',
            'codigoPeriodo':'1'
        }

        $.ajax({
            type: 'POST',
            data: nuevaActividad,
            url: 'http://localhost:49492/api/Actividad',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Clear the form inputs
                $('#guardarActividad input').val('');
                $('#guardarActividad select').val('');
                // Update the table
                alert('actualizar vista');
            }
            else {
                alert('Error: ' + response.msg);
            }
        });

    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }*/
    notie.alert(1, 'Se registró la capacitación correctamente', 2);
}

$(document).ready(function () {
    // Add Team button click
    $('#btnGuardarCapacitacion').on('click', guardarCapa);
    $('.spinner .btn:first-of-type').on('click', function () {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) + 1);
    });
    $('.spinner .btn:last-of-type').on('click', function () {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) - 1);
    });
});