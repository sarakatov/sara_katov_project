import express  from  "express";
import { config } from "dotenv";
import cors from 'cors'
import {connectTodb} from "./config/dbConnection.js" 
import productRouter from "./routes/product.js"
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js'

config();
const app=express();
app.use(express.json());
app.use(cors());
connectTodb();

app.use("/api/products",productRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})