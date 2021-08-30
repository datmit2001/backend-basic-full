import Category from '../models/category';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

export const create = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Them danh muc khong thanh cong"
            })
        }
        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                error: "Bạn cần nhập thông tin"
            })
        }
        let category = new Category(fields);
        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Không thêm được danh mục"
                })
            }
            res.json({ data })
        })
    });

}
export const list = (req, res) => {
    Category.find((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Không tìm được danh mục"
            })
        }
        res.json(categories)
    })
}
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: 'Không tìm thấy danh mục'
            })
        }
        req.category = category;
        console.log(req.category);
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.category)
}
// export const update = (req, res) => {
//     const category = req.category;
//     category.name = req.body.name;
//     category.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "Danh mục này không tồn tại"
//             })
//         }
//         res.json({ data });
//     });
// }
export const update = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Sua danh muc khong thanh cong"
            })
        }
        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                error: "Bạn cần nhập thông tin"
            })
        }
        let category = req.category;
        category = _.assignIn(category, fields);
        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Danh mục này không tồn tại"
                })
            }
            res.json({ data });
        });
    });

}
export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deletedCategory) => {
        if (err) {
            res.status(400).json({
                error: "Danh mục này không tồn tại"
            })
        }
        res.json({
            deletedCategory,
            message: "Xóa danh mục thành công"
        });
    })
}