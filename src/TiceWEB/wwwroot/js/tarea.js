function isEmpty(str) {
    return (!str || 0 === str.length);
}

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
            $('#tbDocumentos').addClass('disabled');
            $(this).removeClass('success');
            $('.btn-documento').addClass('disabled');
        } else {
            $('input#tareaSelected').val($(this).attr('rel'));
            $('#tbDocumentos').removeClass('disabled');
            $(this).addClass('success').siblings().removeClass('success');
            $('.btn-documento').removeClass('disabled');
        }
    });
}

function bindNuevoDocumento() {
    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this)
        jQuery.support.cors = true;
        var codigoTarea = $('input#tareaSelected').val();
        var codigoCurso = $('input#codigoCurso').val();
        var codigoActividad = $('input#codigoActividad').val();
        if (!isEmpty(codigoTarea)) {
            var _url = 'http://localhost:49492/api/Tarea?codigoCurso=' + codigoCurso + '&codigoActividad=' + codigoActividad + '&codigoTarea=' + codigoTarea;
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, tarea) {
                        $('input#inputDocCursoCodigo').val(tarea.codigoCurso);
                        $('input#inputDocCursoNombre').val(tarea.Curso);
                        $('input#inputDocActividadCodigo').val(tarea.codigoActividad);
                        $('input#inputDocActividadNombre').val(tarea.Actividad);
                        $('input#inputDocTareaCodigo').val(tarea.codigoTarea);
                        $('input#inputDocTareaNombre').val(tarea.titulo);
                    });
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });
        } else {
            notie.alert(1, 'Debe seleccionar una tarea', 2);
        }
    })
}

function bindDeleteTarea() {
    $('#myModalDelTarea').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('#codTareaToDel').val(recipient);
    });
}

function bindEditarTarea() {
    $('#myModalEditTarea').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        jQuery.support.cors = true;
        var codigoCurso = $('input#codigoCurso').val();
        var codigoActividad = $('input#codigoActividad').val();
        if (!isEmpty(codigoActividad)) {
            var _url = 'http://localhost:49492/api/Tarea?codigoCurso=' + codigoCurso + '&codigoActividad=' + codigoActividad + '&codigoTarea=' + recipient;
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, tarea) {
                        $('#inputTareaNombreCurso').val(tarea.Curso);
                        $('#inputTareaCodigoCurso').val(tarea.codigoCurso);
                        $('#inputTareaNombreActividad').val(tarea.Actividad);
                        $('#inputTareaCodigoActividad').val(tarea.codigoActividad);
                        $('#inputTareaCodigoTarea').val(tarea.codigoTarea);
                        //
                        $('#inputTareaTitulo').val(tarea.titulo);
                        $('#selectTareaPrioridad').val('1');
                        $('#selectTareaEstado').val('1');
                        $('#inputTareaCompletado').val(tarea.porcentajeCompletado);
                        $('#inputTareaAsignado').val(tarea.codigoRecurso);
                        $('#textareaTareaDesc').val(tarea.descripcion);
                        $('#inputTareaFecIni').val(tarea.fechaInicio);
                        $('#inputTareaFecFin').val(tarea.fechaFin);
                    });
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });
        }
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
            'codigoCurso': $('#guardarDocumento input#inputDocCursoCodigo').val(),
            'codigoActividad': $('#guardarDocumento input#inputDocActividadCodigo').val(),
            'codigoTarea': $('#guardarDocumento input#inputDocTareaCodigo').val(),
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
            if (response == '-1') {
                // Clear the form inputs
                $('#guardarDocumento input').val('');
                $('#guardarDocumento select').val('');
                $('#guardarDocumento textarea').val('');
                // Update the table
                $('#myModal').modal('toggle');
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

function deleteTarea(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    var codigoCurso = $('input#codigoCurso').val();
    var codigoActividad = $('input#codigoActividad').val();
    var codigoTarea = $('#codTareaToDel').val();
    if (!isEmpty(codigoActividad)) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:49492/api/Tarea?codigoCurso=' + codigoCurso + '&codigoActividad=' + codigoActividad + '&codigoTarea=' + codigoTarea,
            dataType: 'JSON'
        }).done(function (response) {
            if (response == '-1') {
                cargarActividadTareas();
            }
            else {
                alert('Error al eliminar tarea');
            }
        });
    } else {
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function detDocumentos() {
    var codigoTarea = $('input#tareaSelected').val();
    var codigoCurso = $('input#codigoCurso').val();
    var codigoActividad = $('input#codigoActividad').val();
    if (!isEmpty(codigoTarea)) {
        window.location.href = "/Home/Documento/?codigoCurso=" + codigoCurso + "&codigoActividad=" + codigoActividad + "&codigoTarea=" + codigoTarea;
    } else {
        notie.alert(1, 'Debe seleccionar una tarea', 2);
    }
}

function editarTarea(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarTarea input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {        
        var editTarea = {
            'codigoCurso': $('#guardarTarea input#inputTareaCodigoCurso').val(),
            'codigoActividad': $('#guardarTarea input#inputTareaCodigoActividad').val(),
            'codigoTarea': $('#guardarTarea input#inputTareaCodigoTarea').val(),
            'titulo': $('#guardarTarea input#inputTareaTitulo').val(),
            'codigoPrioridad': $('#guardarTarea select#selectTareaPrioridad').val(),
            'estado': $('#guardarTarea select#selectTareaEstado').val(),
            'porcentajeCompletado': $('#guardarTarea input#inputTareaCompletado').val(),
            'codigoRecurso': $('#guardarTarea input#inputTareaAsignado').val(),
            'descripcion': $('#guardarTarea textarea#textareaTareaDesc').val(),
            'fechaInicio': $('#guardarTarea input#inputTareaFecIni').val(),
            'fechaFin': $('#guardarTarea input#inputTareaFecFin').val(),
            'usuarioCreacion': 'admin'
        }
        $.ajax({
            type: 'POST',
            data: editTarea,
            url: 'http://localhost:49492/api/Tarea',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            if (response == '-1') {
                // Clear the form inputs
                $('#guardarTarea input').val('');
                $('#guardarTarea select').val('');
                $('#guardarTarea textarea').val('');
                $('#myModalEditTarea').modal('toggle');
            }
            else {
                alert('Error al actualizar tarea');
            }
        });
    } else {
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

$(document).ready(function () {
    $("#inputTareaFecIni").datepicker({ dateFormat: "dd/mm/yy" });
    $("#inputTareaFecFin").datepicker({ dateFormat: "dd/mm/yy" });
    // Add Team button click
    $('#btnGuardarDocumento').on('click', guardarDocumento);
    $('#btnEditarTarea').on('click', editarTarea);    
    $('#btnConfirmDelete').on('click', deleteTarea);
    bindDeleteTarea();
    bindEditarTarea();
    bindNuevoDocumento();
    cargarActividadTareas();

});