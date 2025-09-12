import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
   req: Request,
   { params }: { params: Promise<{ username: string }> }
) {
   const supabase = await createClient();
   const { username } = await params;
   const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

   if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }

   return NextResponse.json({ data });
}
