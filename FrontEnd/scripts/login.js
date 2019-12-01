$(() => {
    console.log('Hello from jQueer')
    $('form').submit((event) => {
        event.preventDefault();
        console.log('submited!!');
        const email = $('#email').val();
        const password = $('#password').val();
        const user = {
            email,
            password
        }
        login(user)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.error(error)
                $errorMessage = $('#errorMessage')
                $errorMessage.text(error.responseJSON.message)
                $errorMessage.show()
            })

    });
});

function login(user) {
    return $.post(`${AUTH_URL}/auth/login`, user);
}