import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const EXCEPTION_PREFIXES = ["/ui-engineer"];

export async function middleware(req: NextRequest) {
   const res = NextResponse.next();
   const supabase = await createClient();
   const {
      data: { user },
   } = await supabase.auth.getUser();

   if (
      !user &&
      !EXCEPTION_PREFIXES.some((route) =>
         req.nextUrl.pathname.startsWith(route),
      )
   ) {
      return NextResponse.redirect(new URL("/auth", req.url));
   }

   return res;
}

export const config = {
   matcher: ["/chat/:path*"],
};
