import { productModel, productValidator } from "../models/product.js";
import jwt from 'jsonwebtoken';
 
export const getAllProduct = async (req, res) => {
    try {
        let { search } = req.query;
        console.log(req.query)
        let perPage = req.query.perPage || 40;
        let page = req.query.page || 1;
        let filter = {};
        if (search) {
            let ex = new RegExp(search)
            filter.name = ex;
        }
        let allProduct = await productModel.find(filter).skip(perPage * (page - 1)).limit(perPage)
        res.json(allProduct)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const getProductByCode = async (req, res) => {
    let { code } = req.params;
    if (!code)
        return res.send("לא הוכנס קוד מוצר")
    try {
        const product = await productModel.findOne({ code })

        if (!product)
            return res.status(404).json({ type: "לא נמצא", message: "לא מצא כזה מוצר" })
        res.json(product)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const addProduct = async (req, res) => {
    let validate = productValidator(req.body)
    if (validate.error)
        return res.status(400).json({ error: validate.error.details[0].message })
    try {
        let { name, description, prodDate, imgUrl, price, color } = req.body;
        let allProduct = await productModel.find({});
        let prod = allProduct[(allProduct.length) - 1]
        let code;
        if (!prod)
            code = 1
        else
            code = parseInt(prod.code) + 1;
        let sameProduct = await productModel.findOne({ name, description, prodDate, imgUrl, price, color })
        if (sameProduct)
            return res.status(409).json({ type: "מוצר זהה", message: "ישנו מוצר כזה במערכת" })
        let newProduct = await productModel.create({ name,code, description, prodDate, imgUrl, price, color })
        res.json(newProduct)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        let { code } = req.params
        if (!code)
            return res.send("לא הוכנס קוד מוצר")
        let prod = await productModel.findOne({ code })
        if (!prod)
            return res.send("לא נמצא כזה מוצר")
        await productModel.findByIdAndDelete(prod._id)
        res.json(prod)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const updateProduct = async (req, res) => {
    let { code } = req.params
    if (!code)
        return res.send("לא הוכנס קוד מוצר")
    try {
        let prod = await productModel.findOne({ code })
        if (!prod)
            return res.send("לא נמצא כזה מוצר")
        console.log(prod._id)
        await productModel.findByIdAndUpdate(prod._id, req.body)
        res.json(prod)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
