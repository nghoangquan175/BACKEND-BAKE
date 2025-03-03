import sql from "mssql"

const getProducts = async () => {
    try {

    } catch (error) {

    }
}

const saveProducts = async ({ fields, files }) => {
    try {
        const { name, des, price, discounted_price, size } = fields
        const fileName = files.uploaded_file[0].newFilename

        await sql.query`
            INSERT INTO Products (product_name, product_des, price, discounted_price, size, image_url)
            VALUES (${name[0]}, ${des[0]}, ${price[0]}, ${discounted_price[0]}, ${size[0]}, ${fileName})
        `
        return {
            message: 'Lưu thành công!',
            code: '1',
        }

    } catch (error) {
        console.log(error);
        return {
            message: 'Lỗi server!',
            code: '-1',
        }
    }
}

module.exports = {
    getProducts,
    saveProducts
}

