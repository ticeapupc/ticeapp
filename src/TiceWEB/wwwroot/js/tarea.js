function cargarActividadTareas() {
    jQuery.support.cors = true;
    var codigoActividad = $('input#codigoActividad').val();
    $.ajax({
        url: 'http://localhost:49492/api/Tarea?actividad=' + codigoActividad,
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

function WriteResponse(tareas) {
    var strResult = '';
    //var strResult = "<table><th>Codigo</th><th>Curso</th><th>Fecha</th><th>Periodo</th><th>Modalidad</th><th>Docente</th><th>Estado</th>";
    $.each(tareas, function (index, tarea) {
        strResult += '<tr rel="' + tarea.codigoTarea + '">';
        strResult += '<td>' + tarea.codigoTarea + '</td>';
        strResult += '<td> ' + tarea.titulo + '</td>';
        strResult += '<td>' + tarea.fechaCreacion + '</td>';
        strResult += '<td>' + tarea.codigoPrioridad + '</td>';
        strResult += '<td></td>';//estado
        strResult += '<td></td>';//avance
        strResult += '<td></td>';//asignado
        strResult += '<td>' + tarea.fechaInicio + '</td>';
        strResult += '<td>' + tarea.fechaFin + '</td>';
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalEditTarea" data-rel="' + tarea.codigoTarea + '">'
        strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalDelTarea" data-rel="' + tarea.codigoTarea + '">'
        strResult += '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    //strResult += "</table>";
    $("#tbodyResult").html(strResult);
}

function bindTableResult() {
    $('#tblTareas tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {
            $('input#tareaSelected').val('');
            $(this).removeClass('success');
            $('.btn-documento').addClass('disabled');
        } else {
            $('input#tareaSelected').val($(this).attr('rel'));
            $(this).addClass('success').siblings().removeClass('success');
            $('.btn-documento').removeClass('disabled');
        }
    });
}

function bindDeleteTarea() {
    $('#myModalDelTarea').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('label#lblResult').text('La tarea ' + recipient + ' tiene documentos pendientes por cerrar');
    });
}

function bindEditarTarea() {
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
}

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

    bindDeleteTarea();
    bindEditarTarea();
    cargarActividadTareas();

});