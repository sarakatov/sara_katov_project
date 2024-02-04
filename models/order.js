import mongoose from "mongoose";
import Joi from 'Joi';

const minimalProduct = mongoose.Schema({
    code: String,
    count:Number
})

const orderSchema = mongoose.Schema({
    code: String,
    ordDate: {type:Date,default:new Date()},
    dueDate:{type:Date,default: function() {
        return new Date(this.ordDate.getTime() + 5 * 24 * 60 * 60 * 1000);  
      }},
    address:String,
    custCode:String,
    products:[minimalProduct],
    isStarted:{type:Boolean,default:false}
})
 

export const orderModel = mongoose.model("orders", orderSchema);

export const orderValidator = (_order) => {
    const schema=Joi.object({
        address:Joi.string().required(),
        products:Joi.required()
    });
    return schema.validate(_order);
}


