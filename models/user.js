import mongoose from "mongoose";
import Joi from 'Joi';

const userSchema = mongoose.Schema({
    id:String,
    email: String,
    userName: String,
    password: String,
    role:{type:String,default:"user"},
    DateRegistration:{type:Date,default:new Date()}
})
 

export const userModel = mongoose.model("users", userSchema);

export const userValidatorForLogin = (_user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8}')).required()
    });
    return schema.validate(_user);
}
export const userValidatorForAdd = (_user) => {
    const schema = Joi.object({
        id:Joi.string().min(9).max(9).pattern(new RegExp('^[0-9]{9}')),
        email:Joi.string().email().required(),
        userName: Joi.string().required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8}')).required(),
        role:Joi.string()
    });
    return schema.validate(_user);
}

