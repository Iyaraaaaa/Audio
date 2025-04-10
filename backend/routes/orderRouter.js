import express from 'express';
import { approveOrRejectOrder, createOrder, getOrders, getQuote } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/",createOrder)
orderRouter.post("/quote", getQuote)
orderRouter.get("/",getOrders)
orderRouter.put("/status/:orderId",approveOrRejectOrder)

export default orderRouter;