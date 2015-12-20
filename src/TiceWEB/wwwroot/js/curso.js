function bindEditarCurso(){
    $('#myModalCurso').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('rel') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        //modal.find('.modal-title').text('New message to ' + recipient)
        //modal.find('.modal-body input').val(recipient)
        jQuery.support.cors = true;
        var _url = 'http://localhost:49492/api/AsignacionCurso?codigo=' + recipient;
        $.ajax({
            url: _url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, curso) {
                    $('input#inputCursoCodigo').val(curso.Codigo);
                    $('input#inputCursoNombre').val(curso.Curso);
                    $('select#selectCursoEstado').val(curso.Estado);
                    $('textarea#textareaObs').val('');
                });
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    })
}

function bindNuevaActividad() {
    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this)
        jQuery.support.cors = true;
        var codigoCurso = $('input#cursoSelected').val();
        if (!isEmpty(codigoCurso)) {
            var _url = 'http://localhost:49492/api/AsignacionCurso?codigo=' + codigoCurso;
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, curso) {
                        $('input#inputActividadCursoCodigo').val(curso.Codigo);
                        $('input#inputActividadCursoNombre').val(curso.Curso);
                    });
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });
        } else {
            notie.alert(1, 'Debe seleccionar un curso', 2);
        }        
    })
}

function buscarCursosxAsignacion(qPeriodo, qEstado) {
    if (qPeriodo === '') {
        notie.alert(1, 'Debe seleccionar un Periodo', 2);
    } else if (qEstado === '') {
        notie.alert(1, 'Debe seleccionar un Estado', 2);
    } else {
        $('#qPeriodoLast').val(qPeriodo);
        $('#qEstadoLast').val(qEstado);
        var _url = 'http://localhost:49492/api/AsignacionCurso?periodo=' + qPeriodo + '&estado=' + qEstado;
        //ttp://localhost:49492/api/Actividad?periodo=2015-03&estado=A
        $.ajax({
            url: _url,
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

function cursosxAsignacion(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var qPeriodo = $('#qPeriodo').val();
    var qEstado = $('#qEstado').val();
    buscarCursosxAsignacion(qPeriodo, qEstado);
}

function actualizarCursosxAsignacion(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var qPeriodo = $('#qPeriodoLast').val();
    var qEstado = $('#qEstadoLast').val();
    if (isEmpty(qPeriodo))
        cursosxAsignacion(event);
    else
        buscarCursosxAsignacion(qPeriodo, qEstado);
}

function WriteResponse(cursos) {
    var strResult = '';
    //var strResult = "<table><th>Codigo</th><th>Curso</th><th>Fecha</th><th>Periodo</th><th>Modalidad</th><th>Docente</th><th>Estado</th>";
    $.each(cursos, function (index, cursos) {
        strResult += '<tr rel="'+cursos.Codigo+'"><td>' + cursos.Codigo + '</td><td> ' + cursos.Curso + '</td><td>' + cursos.Fecha + '</td><td>' + cursos.Periodo + '</td><td>' + cursos.Modalidad + '</td><td>' + cursos.Docente +'</td><td>' + cursos.Estado+ '</td>';
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalCurso" data-rel="'+cursos.Codigo+'">';
        strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
        strResult += '</td></tr>';
    });
    //strResult += "</table>";
    $("#tbodyResult").html(strResult);
}

function bindTableResult() {
    $('#tblCursos tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {
            $('input#cursoSelected').val('');
            $('#tbActividades').addClass('disabled');
            $(this).removeClass('success');
            $('.btn-actividad').addClass('disabled');
        } else {
            $('input#cursoSelected').val($(this).attr('rel'));
            $('#tbActividades').removeClass('disabled');
            $(this).addClass('success').siblings().removeClass('success');
            $('.btn-actividad').removeClass('disabled');
        }
    });
}

function guardarActividad(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarActividad input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {

        var nuevaActividad = {
            'codigoCurso': $('#guardarActividad input#inputActividadCursoCodigo').val(),
            'codigoTipoCurso': $('#guardarActividad select#selectTipo').val(),
            'titulo': $('#guardarActividad input#inputTitulo').val(),
            'fechaInicio': $('#guardarActividad input#datepicker1').val(),
            'fechaFin': $('#guardarActividad input#datepicker2').val(),
            'codigoSesion': $('#guardarActividad select#selectSesion').val(),
            'codigoEstado': $('#guardarActividad select#selectEstado').val(),
            'descripcion': $('#guardarActividad textarea#textareaDesc').val(),
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
            alert(response);
            if (response == '-1') {
                // Clear the form inputs
                $('#guardarActividad input').val('');
                $('#guardarActividad select').val('');
                $('#guardarActividad textarea').val('');
                // Update the table
                $('#myModal').modal('toggle');
            }
            else {
                alert('Error al guardar actividad');
            }
        });

    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function editarCurso(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarCurso input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {

        var editCurso = {
            'codigoCurso': $('#guardarCurso input#inputCursoCodigo').val(),
            'nombreCurso': $('#guardarCurso input#inputCursoNombre').val(),
            'estado': $('#guardarCurso select#selectCursoEstado').val(),
            'observaciones': $('#guardarCurso textarea#textareaObs').val(),
            'usuarioModificacion': 'admin'
        }

        $.ajax({
            type: 'POST',
            data: editCurso,
            url: 'http://localhost:49492/api/AsignacionCurso',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            if (response == '2') {
                // Clear the form inputs
                $('#guardarCurso input').val('');
                $('#guardarCurso select').val('');
                $('#guardarCurso textarea').val('');
                // Update the table
                $('#myModalCurso').modal('toggle');
                actualizarCursosxAsignacion(event);
            }
            else {
                alert('Error al actualizar curso');
            }
        });

    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function detActividades() {
    var codigoCurso = $('input#cursoSelected').val();
    if (!isEmpty(codigoCurso)) {
        window.location.href = "/Home/Actividad/?codigoCurso=" + codigoCurso;
    } else {
        notie.alert(1, 'Debe seleccionar un curso', 2);
    }
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

$(document).ready(function () {
    // Add Team button click
    $('#btnGuardarActividad').on('click', guardarActividad);
    $('#btnEditarCurso').on('click', editarCurso);
    $('#btnBuscarCurso').on('click', cursosxAsignacion);
    bindEditarCurso();
    bindNuevaActividad();
});