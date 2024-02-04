import {
    getAllProduct, getProductByCode, addProduct
    , deleteProduct, updateProduct
} from "../controller/product.js";
import express from "express";
import { auth } from "../middlwares/auth.js";
const router=express.Router();
router.get("/",getAllProduct)  
router.get("/:code", getProductByCode)  
router.put("/:code",auth, updateProduct)  
router.post("/",auth,addProduct) 
router.delete("/:code",auth,deleteProduct)  
 
export default router;  
