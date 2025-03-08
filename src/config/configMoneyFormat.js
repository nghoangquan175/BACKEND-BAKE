
function formatMoney(money) {
    money = +money
    return money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
export default formatMoney