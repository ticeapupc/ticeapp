
function guardarTarea(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarTarea input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {
        
        var nuevaTarea = {
            'codigoCurso': $('#guardarTarea select#selectCurso').val(),
            'codigoActividad': $('#guardarTarea select#selectActividad').val(),
            'titulo': $('#guardarTarea input#inputTitulo').val(),
            'codigoPrioridad': $('#guardarTarea select#selectPrioridad').val(),
            'estado': $('#guardarTarea select#selectEstado').val(),
            'porcentajeCompletado': $('#guardarTarea input#inputCompletado').val(),
            'codigoRecurso': $('#guardarTarea input#inputAsignado').val(),
            'descripcion': $('#guardarTarea textarea#textareaDesc').val(),
            'fechaInicio': $('#guardarTarea input#datepicker1').val(),
            'fechaFin': $('#guardarTarea input#datepicker2').val(),
            'usuarioCreacion': 'admin'
        }

        $.ajax({
            type: 'POST',
            data: nuevaTarea,
            url: 'http://localhost:49492/api/Tarea',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            if (response === '-1') {
                // Clear the form inputs
                $('#guardarTarea input').val('');
                $('#guardarTarea select').val('');
                $('#guardarTarea textarea').val('');
                // Update the table
                
            }
            else {
                alert('Error: ' + response.msg);
            }
        });

    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

$(document).ready(function () {
    $("#inputActivFecIni").datepicker({ dateFormat: "yy-mm-dd" });
    $("#inputActivFecFin").datepicker({ dateFormat: "yy-mm-dd" });
    // Add Team button click
    $('#btnGuardarTarea').on('click', guardarTarea);
    $('#tblActividades tbody tr').on('click', function (event) {
        if ($(this).hasClass('highlight')) {
            $(this).removeClass('highlight');
            $('.btn-tarea').addClass('disabled');
        } else {
            $(this).addClass('highlight').siblings().removeClass('highlight');
            $('.btn-tarea').removeClass('disabled');
        }
    });
    $('#myModalDelActividad').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('label#lblResult').text('La actividad ' + recipient + ' tiene tareas pendientes por cerrar');
    });
    $('#myModalEditActividad').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('#selectActivCurso').val('1');
        $('#selectActivTipo').val('1');
        $('#inputActivTitulo').val('1');
        $('#inputActivFecIni').val('1');
        $('#inputActivFecFin').val('1');
        $('#selectActivSesion').val('1');
        $('#selectActivEstado').val('1');
        $('#textareaActivDesc').val('1');
    });
});