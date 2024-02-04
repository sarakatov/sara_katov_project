import { userModel, userValidatorForLogin, userValidatorForAdd } from "../models/user.js";
import { hash, compare } from "bcrypt";
import { generateToken } from "../middlwares/generateToken.js";
import { generateTokenUser } from "../middlwares/generateToken.js";
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await userModel.find();
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const getUserByUserName = async (req, res) => {
    let { userName } = req.params;
    if (!userName)
        return res.send("לא הוכנס שם משתמש")
    try {
        const user = await userModel.findOne({ userName })
        if (!user)
            return res.status(404).json({ type: "לא נמצא", message: "לא מצא כזה שם משתמש" })
        res.json(user)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const addUser = async (req, res) => {
    let validate = userValidatorForAdd(req.body)
    if (validate.error)
        return res.status(400).json({ error: validate.error.details[0].message })
    try {
        let { userName, email, id, password, role } = req.body;
        let sameUser = await userModel.findOne({ $or: [{ userName: userName }, { email: email }] })
        if (sameUser)
            return res.status(409).json({ type: "כפילות", message: "ישנו משתמש עם כזה שם או מייל" })
        let hashedPassword = await hash(password, 15);

        if (role == "admin") {
            let token = req.headers["xxx-token"];
            if (!token)
                return res.status(409).json({ type: "לא מנהל", message: "לא מנהל" })
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded)
                return res.status(409).json({ type: "לא מנהל", message: "לא מנהל" })

        }
        let newUser = await userModel.create({ userName, email, id, password: hashedPassword, role });
        res.json({ newUser });
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}
export const loginUser = async (req, res) => {
    let validate = userValidatorForLogin(req.body)
    if (validate.error)
        return res.status(400).json({ error: validate.error.details[0].message })
    try {
        let { email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        if (!user || !await compare(password, user.password))
            return res.status(404).json({ type: "לא נמצא", message: "לא מצא כזה שם משתמש" })
        if (user.role == "admin") {
            let token = generateToken(user)
            res.json({ token })
        }
        else {
            let token2 = generateTokenUser(user)
            res.json({ token2 })
        }
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}
export const updateUser = async (req, res) => {
    let { userName } = req.params;
    try {
        let user = await userModel.findOne({ userName });
        if (!user)
            return res.status(404).send("not found!")
        await userModel.findByIdAndUpdate(user._id, req.body);
        let userUpdated = await userModel.findById(user._id)
        res.json(userUpdated);
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}
