import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
   const requestUrl = new URL(request.url);
   const code = requestUrl.searchParams.get("code");
   const origin = requestUrl.origin;

   if (code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
         const response = NextResponse.redirect(`${origin}/`);
         response.cookies.set("auth-success", "true", {
            httpOnly: false,
            maxAge: 10,
            path: "/",
         });
         return response;
      } else {
         const response = NextResponse.redirect(`${origin}/auth`);
         response.cookies.set("auth-error", "true", {
            httpOnly: false,
            maxAge: 10,
            path: "/",
         });
         return response;
      }
   }

   return NextResponse.redirect(`${origin}/`);
}
