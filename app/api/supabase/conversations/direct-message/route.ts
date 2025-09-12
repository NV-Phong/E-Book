import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface StartConversationBody {
   target_user_id: string;
}

export async function POST(request: Request) {
   const supabase = await createClient();
   const { user } = (await supabase.auth.getUser()).data;

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const body: StartConversationBody = await request.json();
   const { target_user_id } = body;

   if (!target_user_id) {
      return NextResponse.json(
         { error: "Missing target_user_id" },
         { status: 400 }
      );
   }

   try {
      const { data: userConvs, error: userConvsError } = await supabase
         .from("conversation_participants")
         .select("conversation_id")
         .eq("user_id", user.id);

      if (userConvsError) {
         return NextResponse.json(
            { error: userConvsError.message },
            { status: 400 }
         );
      }

      const { data: targetConvs, error: targetConvsError } = await supabase
         .from("conversation_participants")
         .select("conversation_id")
         .eq("user_id", target_user_id);

      if (targetConvsError) {
         return NextResponse.json(
            { error: targetConvsError.message },
            { status: 400 }
         );
      }

      const common = userConvs
         .map((c) => c.conversation_id)
         .filter((id) =>
            targetConvs.map((t) => t.conversation_id).includes(id)
         );

      let conversation;

      if (common.length > 0) {
         conversation = { id: common[0] };
      } else {
         const { data: newConversation, error: convError } = await supabase
            .from("conversations")
            .insert({ type: "dm", created_by: user.id })
            .select()
            .single();

         if (convError || !newConversation) {
            return NextResponse.json(
               { error: convError?.message || "Failed to create conversation" },
               { status: 400 }
            );
         }

         conversation = newConversation;

         const { error: partError } = await supabase
            .from("conversation_participants")
            .insert([
               {
                  conversation_id: conversation.id,
                  user_id: user.id,
                  role: "owner",
               },
               {
                  conversation_id: conversation.id,
                  user_id: target_user_id,
                  role: "member",
               },
            ]);

         if (partError) {
            return NextResponse.json(
               { error: partError.message },
               { status: 400 }
            );
         }
      }

      return NextResponse.json({ data: conversation });
   } catch (err: unknown) {
      let message = "Internal error";

      if (err instanceof Error) {
         message = err.message;
      }

      return NextResponse.json({ error: message }, { status: 500 });
   }
}
