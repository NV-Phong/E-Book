import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
   const supabase = await createClient();
   const {
      data: { user },
      error: userError,
   } = await supabase.auth.getUser();

   if (userError || !user) {
      return NextResponse.json({ error: "Unauthorize" }, { status: 401 });
   }

   const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

   if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }

   return NextResponse.json({ data });
}
