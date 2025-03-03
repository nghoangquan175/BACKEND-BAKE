
const validCreateProduct = ({ price, discounted_price, size }) => {

    const errors = {};
    if (!price || isNaN(price) || Number(price) <= 0) {
        errors.price = "Giá không được âm!"
    }
    if (!discounted_price || isNaN(discounted_price) || Number(discounted_price) < 0) {
        errors.discounted_price = "Giá khuyễn mãi không được âm!"

    }
    if ((Number(discounted_price) >= Number(price)) && !errors.discounted_price) {
        errors.discounted_price = "Giá khuyễn mãi không được lớn hơn hoặc bằng giá gốc!"
    }
    const sizeRegex = /^(\d+(\.\d+)?)\s*\*\s*(\d+(\.\d+)?)$/;
    const match = sizeRegex.exec(size.trim());
    if (!match) {
        errors.size = 'Kích thước phải có định dạng "Chiều dài * Chiều rộng" (ví dụ: 10 * 20)';
    }

    return errors
}

module.exports = {
    validCreateProduct
}