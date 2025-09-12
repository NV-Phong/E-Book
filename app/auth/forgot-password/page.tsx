"use client";
import Particles from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSeparator,
   InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ForgotPassword() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("forgot-password");
   const router = useRouter();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

   function handleSend() {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
         setCurrentTab("otp");
      });
   }
   function handleVerify() {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
         setCurrentTab("reset-password");
      });
   }

   const tabOrder = ["forgot-password", "otp", "reset-password"];

   function handleBack() {
      const idx = tabOrder.indexOf(currentTab);
      if (idx > 0) {
         setCurrentTab(tabOrder[idx - 1]);
      }
   }

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         {showParticles && (
            <Particles
               className="absolute inset-0 z-0"
               quantity={100}
               ease={80}
               color={color}
               refresh
            />
         )}
         <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <div className="flex max-w-xl flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent
                  value="forgot-password"
                  className="flex justify-center"
               >
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className=" flex flex-col">
                           <p className="text-2xl uppercase">FORGOT PASSWORD</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Enter your email and we&apos;ll send you a link to
                           reset your password.
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-85 p-0 flex flex-col justify-center space-y-3">
                        <div className="space-y-1">
                           <Label>Email</Label>
                           <Input
                              className=" text-sm border-primary/30 dark:border-input"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Your Email"
                           />
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-3">
                           <Button
                              className="w-2/5 border border-primary/50"
                              type="button"
                              variant={"ghost"}
                              onClick={() => router.push("/auth")}
                           >
                              Back
                           </Button>
                           <Button
                              className="w-2/5"
                              type="button"
                              onClick={handleSend}
                           >
                              {loading ? "Loading..." : "Send"}
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               </TabsContent>

               <TabsContent value="otp" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className=" flex flex-col">
                           <p className="text-2xl uppercase">FORGOT PASSWORD</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Enter your OTP to reset your password.
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-85 p-0 flex flex-col justify-center items-center space-y-3">
                        <InputOTP maxLength={6}>
                           <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                           </InputOTPGroup>
                           <InputOTPSeparator />
                           <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                           </InputOTPGroup>
                        </InputOTP>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-3">
                           <Button
                              className="w-2/5 border border-primary/50"
                              type="button"
                              variant={"ghost"}
                              onClick={handleBack}
                           >
                              Back
                           </Button>
                           <Button
                              className="w-2/5"
                              type="button"
                              onClick={handleVerify}
                           >
                              {loading ? "Loading..." : "Verify"}
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               </TabsContent>

               <TabsContent
                  value="reset-password"
                  className="flex justify-center"
               >
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className=" flex flex-col">
                           <p className="text-2xl uppercase">FORGOT PASSWORD</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Type your new password.
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-85 p-0 flex flex-col justify-center space-y-3">
                        <div className="space-y-1">
                           <Label>Password</Label>
                           <Input
                              className=" text-sm border-primary/30 dark:border-input"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter Your Password"
                           />
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-3">
                           <Button
                              className="w-2/5 border border-primary/50"
                              type="button"
                              variant={"ghost"}
                              onClick={handleBack}
                           >
                              Back
                           </Button>
                           <Button
                              className="w-2/5"
                              type="button"
                              onClick={handleSend}
                           >
                              {loading ? "Loading..." : "Send"}
                           </Button>
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
