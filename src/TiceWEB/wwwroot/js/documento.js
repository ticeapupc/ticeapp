
$(document).ready(function () {



    // Add Team button click
    $('#tblDocumentos tbody tr').on('click', function (event) {
        if ($(this).hasClass('highlight')) {
            $(this).removeClass('highlight');
        } else {
            $(this).addClass('highlight').siblings().removeClass('highlight');
        }
    });

    $('#myModalDelDocumento').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        
    });
    $('#myModalEditDocumento').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('#selectDocCurso').val('1');
        $('#selectDocActividad').val('1');
        $('#selectDocTarea').val('1');
        $('#inputDocTitulo').val('1');
        $('#inputDocAutor').val('1');
        $('#selectDocTipo').val('1');
        $('#textareaDocDesc').val('1');
    });
});