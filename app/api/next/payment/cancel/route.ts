import { NextResponse } from "next/server";
import { PayOS } from "@payos/node";

const payOS = new PayOS({
   clientId: process.env.PAYOS_CLIENT_ID,
   apiKey: process.env.PAYOS_API_KEY,
   checksumKey: process.env.PAYOS_CHECKSUM_KEY,
});

export async function POST(req: Request) {
   try {
      const { paymentLinkId } = await req.json();

      if (!paymentLinkId) {
         return NextResponse.json(
            { error: "Không có paymentLinkId" },
            { status: 400 }
         );
      }

      await payOS.paymentRequests.cancel(paymentLinkId);

      return NextResponse.json({ success: true });
   } catch (err) {
      console.error("Lỗi hủy link:", err);
      return NextResponse.json(
         { error: "Đã xảy ra lỗi khi hủy link" },
         { status: 500 }
      );
   }
}
