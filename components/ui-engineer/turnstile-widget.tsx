"use client";

import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Badge } from "../ui/badge";
import Icon from "./Icon";

interface TurnstileInstance {
   render: (
      element: HTMLElement,
      options: {
         sitekey: string;
         callback: (token: string) => void;
         theme?: "light" | "dark";
         size?: "normal" | "compact";
      },
   ) => void;
}

declare global {
   interface Window {
      turnstile?: TurnstileInstance;
   }
}

function TurnstileBox({ onSuccess }: { onSuccess: (token: string) => void }) {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!ref.current) return;

      ref.current.innerHTML = "";

      if (window.turnstile) {
         window.turnstile.render(ref.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
            callback: (token: string) => {
               onSuccess(token);
            },
            theme: "light",
            size: "normal",
         });
      } else {
         console.warn("⚠️ window.turnstile chưa load");
      }
   }, [onSuccess]);

   return (
      <div className="w-full flex justify-center">
         <div
            ref={ref}
            className="origin-top scale-[1.15]"
            style={{ transformOrigin: "top center" }}
         />
      </div>
   );
}

export default function TurnstileWidget({
   onSuccess,
}: {
   onSuccess: (token: string) => void;
}) {
   const [open, setOpen] = useState(false);

   return (
      <>
         {open &&
            createPortal(
               <div
                  className="fixed inset-0 backdrop-blur-[10px] z-[49]"
                  onClick={() => setOpen(false)}
               />,
               document.body,
            )}
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="ghost"
                  className="border border-primary/30 w-2/5"
                  type="button"
               >
                  Anonymous
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-93">
               <div className="grid gap-4">
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <h4 className="leading-none font-medium uppercase">
                           Verification
                        </h4>
                        <Badge className="text-primary-foreground-darker bg-primary/10 rounded-sm border-primary/20">
                           <Icon
                              size={15}
                              styles="bulk"
                              className="!bg-primary-foreground-darker"
                              name="start-up"
                           />
                           Required
                        </Badge>
                     </div>
                     <p className="text-muted-foreground text-sm">
                        Verifying before anonymous sign-in.
                     </p>
                  </div>
                  <TurnstileBox
                     onSuccess={(token) => {
                        setOpen(false);
                        onSuccess(token);
                     }}
                  />
               </div>
            </PopoverContent>
         </Popover>
      </>
   );
}
