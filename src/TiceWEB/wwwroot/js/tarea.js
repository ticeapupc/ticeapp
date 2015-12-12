
function guardarDocumento(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarDocumento input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {
        
        var nuevaTarea = {
            'codigoCurso': $('#guardarDocumento select#selectCurso').val(),
            'codigoActividad': $('#guardarDocumento select#selectActividad').val(),
            'codigoTarea': $('#guardarDocumento select#selectTarea').val(),
            'titulo': $('#guardarDocumento input#inputTitulo').val(),
            'autor': $('#guardarDocumento input#inputAutor').val(),
            'codigoTipoDocumento': $('#guardarDocumento select#selectTipo').val(),
            'descripcion': $('#guardarDocumento textarea#textareaDesc').val(),
            'rutaDocumento': 'admin',
            'estado': 'admin',
            'usuarioCreacion': 'admin'
        }

        $.ajax({
            type: 'POST',
            data: nuevaTarea,
            url: 'http://localhost:49492/api/Documento',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Clear the form inputs
                $('#guardarDocumento input').val('');
                $('#guardarDocumento select').val('');
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
    }
}

$(document).ready(function () {
    $("#inputTareaFecIni").datepicker({ dateFormat: "yy-mm-dd" });
    $("#inputTareaFecFin").datepicker({ dateFormat: "yy-mm-dd" });
    // Add Team button click
    $('#btnGuardarDocumento').on('click', guardarDocumento);
    $('#tblTareas tbody tr').on('click', function (event) {
        if ($(this).hasClass('highlight')) {
            $(this).removeClass('highlight');
            $('.btn-documento').addClass('disabled');
        } else {
            $(this).addClass('highlight').siblings().removeClass('highlight');
            $('.btn-documento').removeClass('disabled');
        }
    });
    $('#myModalDelTarea').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('label#lblResult').text('La tarea ' + recipient + ' tiene documentos pendientes por cerrar');
    });
    $('#myModalEditTarea').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('#selectTareaCurso').val('1');
        $('#selectTareaActividad').val('1');
        $('#inputTareaTitulo').val('1');
        $('#selectTareaPrioridad').val('1');
        $('#selectTareaEstado').val('1');
        $('#inputTareaCompletado').val('1');
        $('#inputTareaAsignado').val('1');
        $('#textareaTareaDesc').val('1');
        $('#inputTareaFecIni').val('1');
        $('#inputTareaFecFin').val('1');
    });
});