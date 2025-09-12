import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
   const supabase = await createClient();
   const { email, password, provider, anonymous, captchaToken } =
      await req.json();
   const origin = new URL(req.url).origin;

   //-------------------------------------------------- OAUTH --------------------------------------------------//

   if (provider) {
      const { data, error } = await supabase.auth.signInWithOAuth({
         provider,
         options: {
            redirectTo: `${origin}/api/next/auth/callback`,
         },
      });
      return error
         ? NextResponse.json({ error: error.message }, { status: 400 })
         : NextResponse.json({ data });
   }

   //-------------------------------------------------- ANONYMOUS --------------------------------------------------//
   if (anonymous) {
      const { data, error } = await supabase.auth.signInAnonymously({
         options: { captchaToken },
      });
      return error
         ? NextResponse.json({ error: error.message }, { status: 400 })
         : NextResponse.json({ data });
   }

   //-------------------------------------------------- EMAIL/PASSWORD --------------------------------------------------//

   const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
   });
   return error
      ? NextResponse.json({ error: error.message }, { status: 400 })
      : NextResponse.json({ data });
}
