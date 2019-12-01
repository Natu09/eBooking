console.log("Hello from login")
const AUTH_URL = 'http://localhost:3000'

$(() => {
    $('#loginForm').submit((event) => {
        event.preventDefault();
        console.log('submited!!');
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        const user = {
            email,
            password
        }
        login(user)
            .then(result => {
                console.log("justin")
                window.location.href = "http://localhost:8080/filter-users-fullcalendar/dist/"
                console.log(result.id)
                console.log(result)
            })
        //    .catch(error => {
        //         console.error(error)
        //         const $errorMessage = $('#errorMessage');
        //         $errorMessage.text(error.responseJSON.message);
        //         $errorMessage.show()
        //    })

    });
});

function login(user) {
    // console.log(`${AUTH_URL}/login`);
    return $.post(`${AUTH_URL}/auth/login/`, user);
}