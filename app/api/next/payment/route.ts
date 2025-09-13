import { NextResponse } from "next/server";
import { PayOS } from "@payos/node";

const payOS = new PayOS({
   clientId: process.env.PAYOS_CLIENT_ID,
   apiKey: process.env.PAYOS_API_KEY,
   checksumKey: process.env.PAYOS_CHECKSUM_KEY,
});

export async function POST(req: Request) {
   try {
      const { orderCode, amount, description, items, returnUrl, cancelUrl } =
         await req.json();

      const paymentLinkResponse = await payOS.paymentRequests.create({
         orderCode,
         amount,
         description,
         items,
         returnUrl,
         cancelUrl,
      });

      return NextResponse.json(paymentLinkResponse);
   } catch {
      return NextResponse.json({ error: "Đã xảy ra lỗi" }, { status: 500 });
   }
}
