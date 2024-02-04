import mongoose from "mongoose";
import Joi from 'Joi';

const productSchema = mongoose.Schema({
    name: String,
    code: String,
    description: String,
    prodDate: Date,
    imgUrl: String,
    price: Number,
    color: String,
})
 

export const productModel = mongoose.model("products", productSchema);

export const productValidator = (_product) => {
    const schema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string().min(10).max(30),
        price:Joi.number().min(0).required(),
        color:Joi.string()
    });
    return schema.validate(_product);
}

