
const home = async (req, res) => {
    res.render('home', {
        username: req.session.user.name
    })
}

module.exports = {
    home
}