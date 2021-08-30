import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
export const create = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Them san pham khong thanh cong"
            })
        }
        const { name, description, price, category } = fields;
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                error: "Bạn cần nhập thông tin"
            })
        }
        let product = new Product(fields);
        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((error, data) => {
            if (error) {
                res.status(400).json({
                    error: "Không được thêm sản phẩm"
                })
            }
            res.json(data);
        })
    });

}
export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Khong tim thay san pham"
            })
        }
        req.product = product;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.product);
}
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            product: deletedProduct,
            message: "Sản phẩm đã được xóa thành công"
        })
    })
}
export const list = (req, res) => {
    Product.find((err, data) => {
        if (err) {
            error: "Không tìm thấy sản phẩm"
        }
        res.json(data)
    })
}
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Sửa san pham khong thanh cong"
            })
        }
        const { name, description, price, category } = fields;
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                error: "Bạn cần nhập thông tin"
            })
        }
        // let product = new Product(fields);
        let product = req.product;
        product = _.assignIn(product, fields);
        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((error, data) => {
            if (error) {
                res.status(400).json({
                    error: "Không sửa được sản phẩm"
                })
            }
            res.json(data);
        })
    });
}
export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}