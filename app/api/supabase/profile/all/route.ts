import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
   try {
      const supabase = await createClient();

      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
         return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ profiles: data });
   } catch (err: unknown) {
      let message = "Internal error";

      if (err instanceof Error) {
         message = err.message;
      }

      return NextResponse.json({ error: message }, { status: 500 });
   }
}
