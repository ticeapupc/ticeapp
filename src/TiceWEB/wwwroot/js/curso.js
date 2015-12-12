var uri = 'http://localhost:49492/api/Actividad?periodo=2015-03&estado=A';

function CursosxActividad() {
    jQuery.support.cors = true;
    $.ajax({
        url: 'http://localhost:49492/api/Actividad?periodo=2015-03&estado=A',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteResponse(data);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}


function WriteResponse(cursos) {
    var strResult = "<table><th>Codigo</th><th>Curso</th><th>Fecha</th><th>Periodo</th><th>Modalidad</th><th>Docente</th><th>Estado</th>";
    $.each(cursos, function (index, cursos) {
        strResult += "<tr><td>" + cursos.Codigo + "</td><td> " + cursos.Curso + "</td><td>" + cursos.Fecha + "</td><td>" + cursos.Periodo + "</td><td>" + cursos.Modalidad + "</td><td>" + cursos.Docente +"</td><td>" + cursos.Estado+ "</td></tr>";
    });
    strResult += "</table>";
    $("#divResult").html(strResult);
}

function find() {
    var periodo = $('#periodo').val();
    var estado = $('#estado').val();


    $.getJSON(uri + 'periodo=' + periodo + '&estado=' + estado)
      .done(function (data) {
          $.each(data, function (key, item) {
              // Add a list item for the product.
              $('<li>', { text: formatItem(item) }).appendTo($('#products'));
          });
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
            'codigoCurso': $('#guardarActividad select#selectCurso').val(),
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

$(document).ready(function () {
    // Add Team button click
    $('#btnGuardarActividad').on('click', guardarActividad);
    $('#tblCursos tbody tr').on('click', function (event) {
        if ($(this).hasClass('highlight')) {
            $(this).removeClass('highlight');
            $('.btn-actividad').addClass('disabled');
        } else {
            $(this).addClass('highlight').siblings().removeClass('highlight');
            $('.btn-actividad').removeClass('disabled');
        }        
    });
    $('#myModalCurso').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('rel') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        //modal.find('.modal-title').text('New message to ' + recipient)
        //modal.find('.modal-body input').val(recipient)
        $('input#inputCursoNombre').val(recipient);
        $('select#selectCursoEstado').val('');
        $('textarea#textareaObs').val('');
    })
});