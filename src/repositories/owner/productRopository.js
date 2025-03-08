import sql from "mssql"
import formatDate from "../../config/configDateFormat"
import formatMoney from "../../config/configMoneyFormat"

const getProducts = async () => {
    try {
        const respon = await global.pool.request().query('SELECT * FROM Products');

        return {
            message: 'Lấy thành công!',
            data: respon.recordset,
            code: 1
        }
    } catch (error) {
        return {
            message: 'Lỗi server!',
            code: '-1',
        }
    }
}

const getProductByID = async (product_id) => {
    try {
        const product = await global.pool.request()
            .input('product_id', sql.UniqueIdentifier, product_id)
            .execute('getProductByID')

        return product
    } catch (error) {
        return {
            message: 'Lỗi server!',
            code: '-1',
        }
    }
}

const saveProducts = async ({ fields, files }) => {
    try {
        const { name, des, price, discounted_price, size } = fields
        const fileName = files.uploaded_file[0].newFilename

        await global.pool.request()
            .input('product_name', sql.NVarChar, name[0])
            .input('product_des', sql.NVarChar, des[0])
            .input('price', sql.VarChar, formatMoney(price[0]))
            .input('discounted_price', sql.VarChar, formatMoney(discounted_price[0]))
            .input('size', sql.VarChar, size[0])
            .input('image_url', sql.VarChar, fileName)
            .input('created_at', sql.VarChar, formatDate())
            .input('updated_at', sql.VarChar, formatDate())
            .execute('InsertProduct')

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
    saveProducts,
    getProductByID
}

