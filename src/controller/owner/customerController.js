
const showCustomers = async (req, res) => {

    res.render('customerManage', {
        username: req.session?.user?.name
    })
}

module.exports = {
    showCustomers
}