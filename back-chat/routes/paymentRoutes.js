import express from "express";
import {
  createICICIPayment,
  iciciPaymentResponse
} from "../controllers/iciciPaymentController.js";

const router = express.Router();

router.post("/icici/create-payment", createICICIPayment);
router.post("/icici/response", iciciPaymentResponse);

export default router;
