import { NextResponse } from "next/server";
import crypto from "crypto";

const PAYOS_CLIENT_ID = process.env.PAYOS_CLIENT_ID!;
const PAYOS_API_KEY = process.env.PAYOS_API_KEY!;
const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY!;
const PAYOS_ENDPOINT = process.env.PAYOS_ENDPOINT!;

export async function POST(req: Request) {
   try {
      const { amount, description } = await req.json();
      const orderId = `ORDER_${Date.now()}`;
      const payload = {
         orderId,
         amount,
         description,
         cancelUrl: process.env.PAYMENT_CANCEL,
         returnUrl: process.env.PAYMENT_SUCCESS,
      };

      const rawSignature = `amount=${payload.amount}&cancelUrl=${payload.cancelUrl}&description=${payload.description}&orderId=${payload.orderId}&returnUrl=${payload.returnUrl}${PAYOS_CHECKSUM_KEY}`;
      const signature = crypto
         .createHash("sha256")
         .update(rawSignature)
         .digest("hex");

      const body = {
         ...payload,
         signature,
      };

      const response = await fetch(PAYOS_ENDPOINT, {
         method: "POST",
         headers: {
            "x-client-id": PAYOS_CLIENT_ID,
            "x-api-key": PAYOS_API_KEY,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      });

      const data = await response.json();
      return NextResponse.json(data);
   } catch (err: unknown) {
      let message = "Internal error";

      if (err instanceof Error) {
         message = err.message;
      }

      return NextResponse.json({ error: message }, { status: 500 });
   }
}
