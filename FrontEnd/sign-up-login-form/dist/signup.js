

const AUTH_URL1 = 'http://localhost:3000'
console.log("hello from signup")

$(() => {
    $('#signupform').submit((event) => {
        event.preventDefault();
        console.log('submited!!');
        const fname = $('#fname').val();
        const lname = $('#lname').val();
        const email = $('#suemail').val();
        const password = $('#password').val();

        // const dob = $('#dob').val()[0];
        // console.log(dob)
        
        const user = {
            fname,
            lname,
            email, 
            password,
            //dob
        }
        signup(user)
           .then(result => {
               window.location.replace("http://localhost:8080/filter-users-fullcalendar/dist/")
               console.log(result)

           })
    })
})

function signup(user) {
    return $.post(`${AUTH_URL1}/auth/signup/`, user);
}