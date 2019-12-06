$(() => {
    console.log('Hello from sign up jQueer')
    $('form').submit((event) => {
        event.preventDefault();
        console.log('submited!!');
        const fname = $('#fname').val();
        const lname = $('#lname').val();
        const email = $('#email').val();
        const health_care = $('#health_care').val();
        const password = $('#password').val();
        const user = {
            fname,
            lname,
            email,
            health_care,
            password
        }
        console.log(user)

        signup(user)
            .then(result => {
                console.log(result)
                window.location = `/?id=${result.id}`
            })
    
            .catch(error => {
                console.error(error)
                $errorMessage = $('#errorMessage')
                $errorMessage.text(error.responseJSON.message)
                $errorMessage.show()
            })

    });
});

function signup(user) {
    return $.post(`${AUTH_URL}/auth/signup`, user);
}

var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;