"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

export function usePaymentSuccess() {
   const [paid, setPaid] = useState(false);
   const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
   const [timeLeft, setTimeLeft] = useState<number>(0);

   useEffect(() => {
      const raw = Cookies.get("payment-success");
      if (raw) {
         setPaid(true);
         try {
            const data = JSON.parse(raw);
            toast.success("Thanh toán thành công 🎉", {
               description: `Mã đơn hàng: ${data.orderCode}`,
            });
         } catch {
            toast.success("Thanh toán thành công 🎉");
         }

         const cache = Cookies.get("download-link");
         if (cache) {
            const { url, expiredAt } = JSON.parse(cache);
            if (Date.now() < expiredAt) {
               setDownloadUrl(url);
               setTimeLeft(Math.floor((expiredAt - Date.now()) / 1000));
               return;
            }
         }

         fetch("/api/storage/book")
            .then((res) => res.json())
            .then((data) => {
               if (data.url) {
                  const expiredAt = Date.now() + 30 * 60 * 1000;
                  Cookies.set(
                     "download-link",
                     JSON.stringify({ url: data.url, expiredAt }),
                     { expires: 1 / 48 }
                  );
                  setDownloadUrl(data.url);
                  setTimeLeft(1800);
               }
            });
      }
   }, []);

   useEffect(() => {
      if (!timeLeft) return;
      const timer = setInterval(() => {
         setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
   }, [timeLeft]);

   const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60)
         .toString()
         .padStart(2, "0");
      const s = (seconds % 60).toString().padStart(2, "0");
      return `${m}:${s}`;
   };

   return { paid, downloadUrl, timeLeft, formatTime };
}
