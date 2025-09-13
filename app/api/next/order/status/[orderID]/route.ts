import { NextResponse } from "next/server";

export async function GET(
   req: Request,
   { params }: { params: Promise<{ orderID: string }> }
) {
   const { orderID } = await params;

   const mockDB: Record<string, { status: string; downloadUrl: string }> = {
      ORDER_123: {
         status: "PAID",
         downloadUrl: "https://drive.google.com/ebook",
      },
   };

   const order = mockDB[orderID];

   if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
   }

   return NextResponse.json(order);
}
