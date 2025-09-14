"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSeparator,
   InputOTPSlot,
} from "@/components/ui/input-otp";
import Separator from "@/components/ui-engineer/separator";
import { usePaymentSuccess } from "@/hooks/payment-success";

export default function Success() {
   const router = useRouter();
   const [currentTab, setCurrentTab] = useState("success");
   const { paid, downloadUrl, timeLeft, formatTime } = usePaymentSuccess();

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <div className="flex max-w-lg flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="success" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className="flex flex-col">
                           <p className="text-2xl uppercase">Success</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           {paid
                              ? "Bạn đã thanh toán thành công. 🎉"
                              : "Chưa có thanh toán nào được ghi nhận."}
                        </CardDescription>
                     </CardHeader>

                     {paid && <Separator>Link sẽ hết hạn sau</Separator>}

                     <CardContent className="space-y-2 p-0 flex flex-col items-center">
                        {paid ? (
                           downloadUrl ? (
                              <>
                                 {timeLeft > 0 && (
                                    <InputOTP
                                       maxLength={4}
                                       value={formatTime(timeLeft).replace(
                                          ":",
                                          ""
                                       )}
                                    >
                                       <InputOTPGroup>
                                          <InputOTPSlot index={0} />
                                          <InputOTPSlot index={1} />
                                       </InputOTPGroup>
                                       <InputOTPSeparator />
                                       <InputOTPGroup>
                                          <InputOTPSlot index={2} />
                                          <InputOTPSlot index={3} />
                                       </InputOTPGroup>
                                    </InputOTP>
                                 )}
                              </>
                           ) : (
                              <p className="text-sm text-gray-500 mt-4">
                                 Đang chuẩn bị link tải...
                              </p>
                           )
                        ) : (
                           <p className="text-sm text-red-500 mt-4">
                              Vui lòng thanh toán để nhận link tải e-book.
                           </p>
                        )}
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-5 gap-20">
                           <Button
                              variant={"ghost"}
                              onClick={() => router.push("/")}
                              className="border"
                           >
                              Return Home
                           </Button>
                           {paid && downloadUrl ? (
                              <a href={downloadUrl} target="_blank">
                                 <Button>Download E-Book</Button>
                              </a>
                           ) : (
                              <Button onClick={() => router.push("/")}>
                                 Payment Now
                              </Button>
                           )}
                        </div>
                     </CardFooter>
                  </Card>
               </TabsContent>
            </div>
         </Tabs>
         <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
         <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
      </div>
   );
}
