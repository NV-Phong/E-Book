import { NextResponse } from "next/server";
import crypto from "crypto";

const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY!;

export async function POST(req: Request) {
   try {
      const body = await req.json();

      const { orderId, amount, description, state, signature } = body;
      const rawSignature = `amount=${amount}&description=${description}&orderId=${orderId}&state=${state}${PAYOS_CHECKSUM_KEY}`;
      const expectedSignature = crypto
         .createHash("sha256")
         .update(rawSignature)
         .digest("hex");

      if (signature !== expectedSignature) {
         return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
         );
      }

      if (state === "PAID") {
         console.log(`Order ${orderId} đã thanh toán thành công`);
      }

      return NextResponse.json({ message: "ok" });
   } catch (err: unknown) {
      let message = "Internal error";

      if (err instanceof Error) {
         message = err.message;
      }

      return NextResponse.json({ error: message }, { status: 500 });
   }
}
