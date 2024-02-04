import {
    getAllOrders, getOrderById, addOrder
    , deleteOrder, updateOrder
} from "../controller/order.js";
import express from "express";
import {auth, authUser} from "../middlwares/auth.js";
const router=express.Router();
router.get("/",auth,getAllOrders)  
router.get("/userOrders",authUser, getOrderById)  
router.put("/:code",auth, updateOrder)  
router.post("/",authUser,addOrder) 
router.delete("/:code",deleteOrder)  
 
 
export default router; 