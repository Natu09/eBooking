function ensureLoggedIn(req, res, next) {
    console.log(req.signedCookies)
    if (req.signedCookies.user_id) {
        next();
    } else {
        res.status(401);
        next(new Error("Un-Authorized"))
    }
}

module.exports = {
    ensureLoggedIn
}