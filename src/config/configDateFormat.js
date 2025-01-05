
const formatDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours()
    let min = today.getMinutes()
    let second = today.getSeconds()

    if (hh < 10) hh = '0' + hh
    if (min < 10) min = '0' + min
    if (second < 10) second = '0' + second
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${hh}:${min}:${second} ${dd}/${mm}/${yyyy}`
}

export default formatDate