$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});

const AUTH_URL = 'http://localhost:3000'


function redirectIfLoggedIn() {
    if (localStorage.user_id) {
        window.location = `/user_dashboard.html?id=${localStorage.user_id}`
    }
}

function logout() {
    console.log("Trying to log out")
    localStorage.removeItem('user_id');
    return $.get(`${AUTH_URL}/user/logout`)
        .then(res => {
            console.log(res)
            window.location = '/index.html'
            localStorage.removeItem('user_id');
        })
        .catch(err => {
            console.log(err)
        })
}