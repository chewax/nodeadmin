$( document ).ready(function() {

    $('#confirmDelete').on('shown.bs.modal', function(e) {

        $(this).find('#btnDelete').click(function(){
            $.ajax({
                url: $(e.relatedTarget).data('href'),
                type: $(e.relatedTarget).data('method'),
                success: function(result) {
                    console.log("success");
                }
            });
        })

    });

});

