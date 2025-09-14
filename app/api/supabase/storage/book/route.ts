import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs"; 

const supabase = createClient(
   process.env.SUPABASE_URL!,
   process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
   const { data, error } = await supabase.storage
      .from("E-Book")
      .createSignedUrl("Bi Mat Cua May Man.pdf", 1800);

   if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }

   return NextResponse.json({ url: data.signedUrl });
}
