
const showOrders = async (req, res) => {

    res.render('orderManage', {
        username: req.session?.user?.name
    })
}

module.exports = {
    showOrders
}