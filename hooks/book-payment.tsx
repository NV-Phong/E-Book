"use client";

import { useEffect, useRef, useState } from "react";
import { usePayOS } from "@payos/payos-checkout";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useBookPayment(title: string, amount: number) {
   const containerRef = useRef<HTMLDivElement>(null);
   const [checkoutUrl, setCheckoutUrl] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const { open } = usePayOS({
      ELEMENT_ID: "embedded-payment-container",
      CHECKOUT_URL: checkoutUrl,
      embedded: true,
      RETURN_URL: window.location.href,
      onSuccess: async (order: any) => {
         Cookies.set(
            "payment-success",
            JSON.stringify({
               orderCode: order?.orderCode ?? "",
               time: Date.now(),
            })
         );

         await new Promise((r) => setTimeout(r, 50));

         router.push("/success");
      },
   });

   useEffect(() => {
      if (checkoutUrl && containerRef.current) {
         open();
      }
   }, [checkoutUrl, open]);

   const handlePayment = async () => {
      setIsLoading(true);
      try {
         const res = await fetch("/api/next/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               orderCode: Number(String(Date.now()).slice(-6)),
               amount,
               description: title,
               items: [{ name: title, quantity: 1, price: amount }],
               returnUrl: window.location.href,
               cancelUrl: window.location.href,
            }),
         });
         const data = await res.json();
         setCheckoutUrl(data.checkoutUrl);
      } catch (err) {
         console.error(err);
      } finally {
         setIsLoading(false);
      }
   };

   return {
      containerRef,
      checkoutUrl,
      isLoading,
      handlePayment,
   };
}
