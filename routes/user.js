import {
    getAllUsers, addUser,getUserByUserName,loginUser,updateUser
} from "../controller/user.js";
import express from "express";
import { auth } from "../middlwares/auth.js";
const router=express.Router();
router.get("/",auth, getAllUsers)  
router.get("/:userName", getUserByUserName)  
router.post("/login",loginUser)  
router.post("/",addUser) 
router.put("/:userName",updateUser) 

 
export default router;