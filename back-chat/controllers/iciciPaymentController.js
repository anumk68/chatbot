import db from "../config/db.js";
import { encrypt, decrypt } from "../utils/iciciCrypto.js";

export const createICICIPayment = async (req, res) => {
  try {
    const { agentCount, chatbotId, emails, role, group } = req.body;

    if (!agentCount || agentCount < 1) {
      return res.status(400).json({ message: "Invalid agent count" });
    }

    // 💲 $9 per agent → INR
    const USD_TO_INR = 83;
    const PRICE_PER_AGENT_USD = 9;

    const amount =
      agentCount * PRICE_PER_AGENT_USD * USD_TO_INR; // INR

    const referenceNo = `AGENT_${Date.now()}`;

    await db.query(
      `INSERT INTO payments 
      (reference_no, chatbot_id, amount, emails, role, group_name, status)
      VALUES (?, ?, ?, ?, ?, ?, 'PENDING')`,
      [
        referenceNo,
        chatbotId,
        amount,
        JSON.stringify(emails),
        role,
        group
      ]
    );

    const requestString =
      `merchantid=${process.env.ICICI_MERCHANT_ID}` +
      `&amount=${amount}` +
      `&referenceno=${referenceNo}` +
      `&redirecturl=${process.env.ICICI_SUCCESS_URL}`;

    const encData = encrypt(
      requestString,
      process.env.ICICI_ENCRYPTION_KEY
    );

    const paymentUrl =
      `${process.env.ICICI_PAYMENT_URL}` +
      `?merchantid=${process.env.ICICI_MERCHANT_ID}` +
      `&encdata=${encodeURIComponent(encData)}`;

    res.json({
      paymentUrl,
      debug: {
        amountINR: amount,
        amountUSD: agentCount * PRICE_PER_AGENT_USD
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "ICICI payment init failed" });
  }
};


// ICICI SUCCESS / FAILURE CALLBACK
export const iciciPaymentResponse = async (req, res) => {
  try {
    const encrypted = req.body.encdata;
    const decrypted = decrypt(
      encrypted,
      process.env.ICICI_ENCRYPTION_KEY
    );

    const params = Object.fromEntries(
      decrypted.split("&").map(p => p.split("="))
    );

    const { referenceno, status } = params;

    if (status === "SUCCESS") {
      await db.query(
        "UPDATE payments SET status='SUCCESS' WHERE reference_no=?",
        [referenceno]
      );

      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-success?ref=${referenceno}`
      );
    }

    await db.query(
      "UPDATE payments SET status='FAILED' WHERE reference_no=?",
      [referenceno]
    );

    res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment verification failed");
  }
};
