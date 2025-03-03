

const showStaffs = async (req, res) => {

    res.render('staffManage', {
        username: req.session?.user?.name
    })
}

module.exports = {
    showStaffs
}