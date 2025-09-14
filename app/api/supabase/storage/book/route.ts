import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
   process.env.SUPABASE_URL!,
   process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
   const cookieHeader = req.headers.get("cookie") || "";
   const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("="))
   );

   const paymentCookie = cookies["payment-success"];
   if (!paymentCookie) {
      return NextResponse.json(
         { error: "Bạn cần thanh toán trước khi tải file." },
         { status: 403 }
      );
   }

   try {
      const { data, error } = await supabase.storage
         .from("E-Book")
         .createSignedUrl("Bi Mat Cua May Man.pdf", 1800);

      if (error || !data) {
         return NextResponse.json(
            { error: error?.message || "Lỗi server" },
            { status: 500 }
         );
      }

      return NextResponse.json({ url: data.signedUrl });
   } catch (err) {
      console.error("Lỗi tạo signed URL:", err);
      return NextResponse.json({ error: "Đã xảy ra lỗi" }, { status: 500 });
   }
}
