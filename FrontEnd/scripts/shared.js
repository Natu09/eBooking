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


// Helper functions for the calendar
function dateFormatter(event) {
    let options = { hour12: false };

    let start = new Date(event.start);
    let startTime = start.toLocaleString('en-US', options)

    let end = new Date(event.end);
    let endTime = end.toLocaleString('en-US', options)

    return {
        start_time: startTime,
        end_time: endTime
    }
}