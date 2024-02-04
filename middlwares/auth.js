import jwt from 'jsonwebtoken';
export const auth = async (req, res, next) => {
    let token = req.headers["xxx-token"];
    if (!token)
        return res.status(401).json({ type: "לא מנהל", message: "משתמש לא מנהל" })
    try {   
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded)
            return res.status(401).json({ type: "לא מנהל", message: "משתמש לא מנהל" })
        next();
    }
    catch (err) {
        return res.status(401).json({ type: "לא מנהל", message: "משתמש לא מנהל" })
    }
}
export const authUser = async (req, res, next) => {
    let token = req.headers["yyy-token"];
    if (!token)
        return res.status(401).json({ type: "לא רשום", message: "משתמש לא רשום" })
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
        if (!decoded)
            return res.status(401).json({ type: "לא רשום", message: "משתמש לא רשום" })
        next();
    }
    catch (err) {
        return res.status(401).json({ type: "לא רשום", message: "משתמש לא רשום" })
    }
}