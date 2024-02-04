import { orderModel, orderValidator } from "../models/order.js";
 import jwt from 'jsonwebtoken';


export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await orderModel.find();
        res.json(allOrders)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const getOrderById = async (req, res) => {
    try {
        let token = req.headers["yyy-token"];
        let decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
        let custCode = decoded._id
        let allOrders = await orderModel.find({ custCode })
        return res.json(allOrders)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const addOrder = async (req, res) => {
    let validate = orderValidator(req.body)
    if (validate.error)
        return res.status(400).json({ error: validate.error.details[0].message })
    try {
        let { address, products } = req.body;
        let allOrders = await orderModel.find({});
        let order = allOrders[(allOrders.length) - 1]
        let code;
        if (!order)
            code = 1
        else
            code = parseInt(order.code) + 1;
        let token = req.headers["yyy-token"];
        let decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
        let custCode = decoded._id
        let newOrder = await orderModel.create({ custCode, code, address, products })
        res.json(newOrder)

    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const deleteOrder = async (req, res) => {
    try {
        let { code } = req.params;
        if (!code)
            return res.send("enter code!")
        let order = await orderModel.findOne({ code })
        if (!order)
            return res.status(404).send("not found!")
        if (order.isStarted)
            return res.send("this order is started")
        else {
            let tokenUser = req.headers["yyy-token"];
            let tokenAdmin = req.headers["xxx-token"];
            if (!(tokenAdmin || tokenUser))
                return res.status(401).json({ type: "not auth", message: "login or admin" })
            if (tokenAdmin) {
                let decoded = jwt.verify(tokenAdmin, process.env.JWT_SECRET);
                if (decoded) {
                    await orderModel.findByIdAndDelete(order._id)
                    return res.json(order)
                }
            }
            if (tokenUser) {
                console.log(tokenUser)
                let decoded = jwt.verify(tokenUser, process.env.JWT_SECRET_USER);
                if (decoded && decoded._id == order.custCode) {
                    await orderModel.findByIdAndDelete(order._id)
                    return res.json(order)
                }
            }

        }
        return res.status(401).json({ type: "not auth", message: "login or admin" })
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}



export const updateOrder = async (req, res) => {
    let { code } = req.params
    if (!code)
        return res.send("לא הוכנס קוד הזמנה")
    let order = await orderModel.findOne({ code })
    if (!order)
        return res.send("לא נמצא כזה הזמנה")
    try {
        if (order.isStarted)
            return res.send(" ההזמנה יצאה לדרך לא ניתן לעדכן")
        await orderModel.findByIdAndUpdate(order._id, req.body);
        res.json(order);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}



