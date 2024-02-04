import jwt from "jsonwebtoken";
export const generateToken = (user) => {
    let jwtSecretKey = process.env.JWT_SECRET
    let data = {
        id: user._id,
        role: user.role
    }
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}
export const generateTokenUser = (user) => {
    let jwtSecretKey = process.env.JWT_SECRET_USER
    let data = {
        _id: user._id,
        role: user.role,
        userName: user.userName
    }
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}