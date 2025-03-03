import fs from 'fs'
import path from 'path'

import productRepository from "../../repositories/owner/productRopository"
import productValidator from "../../validators/productValidator"

import form from '../../config/configFormidable';

const showProducts = (req, res) => {
    res.render('product/productManage', {
        username: req.session?.user?.name,
        message: req.query.message,
    })
}

const showCreateProducForm = (req, res) => {
    res.render('product/createProduct', {
        username: req.session?.user?.name,
        fields: {},
        helpers: {
            isFieldsValid: function (fields, field) {
                if (fields && fields[field]) {
                    return fields[field][0]
                }
                return ''
            },
        }
    })
}

const saveNewProduct = async (req, res, next) => {

    let data = {}
    form.on('field', (name, value) => {
        data = {
            ...data,
            [name]: value
        }
    });

    form.once('end', () => {
        const errors = productValidator.validCreateProduct(data)

        if (Object.keys(errors).length > 0) {
            errors.uploaded_file = "Vui lòng tải lại ảnh sản phẩm."
            form.emit("error", errors);
        }
    });

    await form.parse(req, async (err, fields, files) => {
        if (err) {
            const filePath = files.uploaded_file[0].filepath
            fs.unlink(filePath, (err) => {

            });
            return res.render('product/createProduct', {
                username: req.session?.user?.name,
                errors: err,
                data,
                helpers: {
                    isFieldsValid: function (data, key) {
                        if (data && data[key]) {
                            return data[key]
                        }
                        return ""
                    },
                }
            });
        }

        const respon = await productRepository.saveProducts({ fields, files })

        if (respon && respon.code === '1') {

            res.redirect(`/get-products?message=${encodeURIComponent(respon.message)}`)
        } else {
            res.send(respon.message)
        }
    });
}

module.exports = {
    showProducts,
    showCreateProducForm,
    saveNewProduct
}