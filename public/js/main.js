$(document).ready(function() {
    $('.delete-appointment').on('click', function() {
        var id = $(this).data('id')
        var url = '/delete/' + id
        if (confirm('Delete Appointment?')) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result) {
                    console.log('Deleting appointment')
                    window.location.href='/'
            },
            error: function(err) { console.log(err) }
            })
        }
    })
})