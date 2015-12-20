function isEmpty(str) {
    return (!str || 0 === str.length);
}

function cargarTareaDocumentos() {
    jQuery.support.cors = true;
    var codigoTarea = $('input#codigoTarea').val();
    $.ajax({
        url: 'http://localhost:49492/api/Documento?tarea=' + codigoTarea,
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
    $.each(tareas, function (index, documento) {
        strResult += '<tr rel="' + documento.codigoDocumento + '">';
        strResult += '<td>' + documento.codigoDocumento + '</td>';
        strResult += '<td> ' + documento.titulo + '</td>';
        strResult += '<td>' + documento.fechaCreacion + '</td>';
        strResult += '<td>' + documento.autor + '</td>';
        strResult += '<td>' + documento.codigoTipoDocumento + '</td>';
        strResult += '<td>' + documento.estado + '</td>';
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalEditDocumento" data-rel="' + documento.codigoDocumento + '">'
        strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalDelDocumento" data-rel="' + documento.codigoDocumento + '">'
        strResult += '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    //strResult += "</table>";
    $("#tbodyResult").html(strResult);
}

function bindTableResult() {
    $('#tblDocumentos tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {
            $('input#documentoSelected').val('');
            $(this).removeClass('success');
        } else {
            $('input#documentoSelected').val($(this).attr('rel'));
            $(this).addClass('success').siblings().removeClass('success');
        }
    });
}

function bindEditarDoc(){
    $('#myModalEditDocumento').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        jQuery.support.cors = true;
        var codigoCurso = $('input#codigoCurso').val();
        var codigoActividad = $('input#codigoActividad').val();
        var codigoTarea = $('input#codigoTarea').val();
        if (!isEmpty(codigoTarea)) {
            var _url = 'http://localhost:49492/api/Documento?codigoCurso=' + codigoCurso + '&codigoActividad=' + codigoActividad + '&codigoTarea=' + codigoTarea + '&codigoDocumento=' + recipient;
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, doc) {
                        $('#inputDocNombreCurso').val(doc.Curso);
                        $('#inputDocCodigoCurso').val(doc.codigoCurso);
                        $('#inputDocNombreActividad').val(doc.Actividad);
                        $('#inputDocCodigoActividad').val(doc.codigoActividad);
                        $('#inputDocCodigoTarea').val(doc.codigoTarea);
                        $('#inputDocNombreTarea').val(doc.codigoTarea);
                        $('#inputDocCodigoDocumento').val(doc.codigoDocumento);
                        
                        $('#inputDocTitulo').val(doc.titulo);
                        $('#inputDocAutor').val(doc.autor);
                        $('#selectDocTipo').val(doc.codigoTipoDocumento);
                        $('#textareaDocDesc').val(doc.descripcion);
                        
                    });
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });
        }
    });
}

function bindDeleteDoc() {
    $('#myModalDelDocumento').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('#codDocumentoToDel').val(recipient);
    });
}
function deleteDocumento(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    var codigoCurso = $('input#codigoCurso').val();
    var codigoActividad = $('input#codigoActividad').val();
    var codigoTarea = $('input#codigoTarea').val();
    var codigoDocumento = $('#codDocumentoToDel').val();
    if (!isEmpty(codigoDocumento)) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:49492/api/Documento?codigoCurso=' + codigoCurso + '&codigoActividad=' + codigoActividad + '&codigoTarea=' + codigoTarea + '&codigoDocumento=' + codigoDocumento,
            dataType: 'JSON'
        }).done(function (response) {
            if (response == '-1') {
                cargarTareaDocumentos();
            }
            else {
                alert('Error al eliminar documento');
            }
        });
    } else {
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function editarDocumento(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarDocumento input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {
        var editDocumento = {
            'codigoCurso': $('#guardarDocumento input#inputDocCodigoCurso').val(),
            'codigoActividad': $('#guardarDocumento input#inputDocCodigoActividad').val(),
            'codigoTarea': $('#guardarDocumento input#inputDocCodigoTarea').val(),
            'codigoDocumento': $('#guardarDocumento input#inputDocCodigoDocumento').val(),
            'titulo': $('#guardarDocumento input#inputDocTitulo').val(),
            'autor': $('#guardarDocumento input#inputDocAutor').val(),
            'codigoTipoDocumento': $('#guardarDocumento select#selectDocTipo').val(),
            'descripcion': $('#guardarDocumento textarea#textareaDocDesc').val(),
            'rutaDocumento': 'admin',
            'estado': 'admin',
            'usuarioCreacion': 'admin'
        }
        $.ajax({
            type: 'POST',
            data: editDocumento,
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
                $('#myModalEditDocumento').modal('toggle');
                cargarTareaDocumentos();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    } else {
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

$(document).ready(function () {

    $('#btnConfirmDelete').on('click', deleteDocumento);
    $('#btnEditarDocumento').on('click', editarDocumento);
    
    bindDeleteDoc();
    bindEditarDoc();

    cargarTareaDocumentos();

});