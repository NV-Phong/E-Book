"use client";

import { useEffect, useRef, useState } from "react";
import { usePayOS } from "@payos/payos-checkout";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CreditCard, QrCode, Smartphone, Shield, Clock } from "lucide-react";
import Icon from "./ui-engineer/Icon";

interface BookPaymentProps {
   title: string;
   amount: number;
}

export function BookPayment({ title, amount }: BookPaymentProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const [checkoutUrl, setCheckoutUrl] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const { open } = usePayOS({
      ELEMENT_ID: "embedded-payment-container",
      CHECKOUT_URL: checkoutUrl,
      embedded: true,
      RETURN_URL: window.location.href,
      onSuccess: () => alert("Thanh toán thành công!"),
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

   return (
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
         <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg uppercase">
               <CreditCard className="h-5 w-5 text-primary" />
               Thông tin thanh toán
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border">
               <div>
                  <p className="font-medium text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">Sách điện tử</p>
               </div>
               <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                     {amount.toLocaleString("vi-VN")} VND
                  </p>
                  <Badge className="text-primary-foreground-darker uppercase text-[10px] bg-primary/10 rounded-sm border-primary/20">
                     <Icon
                        name="bitcoin"
                        styles="bulk"
                        size={15}
                        className="!bg-primary"
                     />
                     Giá ưu đãi
                  </Badge>
               </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
               <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-primary/15">
                  <QrCode className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Quét mã QR</span>
               </div>
               <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-primary/15">
                  <Smartphone className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Chuyển khoản</span>
               </div>
               <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-primary/15">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Bảo mật</span>
               </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/30 p-3 rounded-lg">
               <Clock className="h-4 w-4" />
               <span>
                  Thanh toán an toàn và nhanh chóng trong vòng 2-5 phút
               </span>
            </div>

            <Button
               onClick={handlePayment}
               className="w-full"
               disabled={isLoading}
            >
               {isLoading ? "Đang xử lý..." : "Thanh Toán Ngay"}
            </Button>

            <div
               id="embedded-payment-container"
               ref={containerRef}
               className={`w-full min-h-[400px] h-[400px] rounded-lg border bg-background/50 mt-4 ${
                  !checkoutUrl ? "hidden" : ""
               }`}
            />
         </CardContent>
      </Card>
   );
}
