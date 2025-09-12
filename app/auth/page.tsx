"use client";
import Particles from "@/components/magicui/particles";
import Icon from "@/components/ui-engineer/Icon";
import Separator from "@/components/ui-engineer/separator";
import TurnstileWidget from "@/components/ui-engineer/turnstile-widget";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Auth() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("sign-in");
   const router = useRouter();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

   async function handleSignUp() {
      try {
         setLoading(true);
         const res = await fetch("/api/supabase/auth/sign-up", {
            method: "POST",
            body: JSON.stringify({ email, password }),
         });
         const json = await res.json();
         if (res.ok) {
            toast("Sign up successfully", {
               //TODO: check user exists
               description: "Please check your email to verify your account !",
            });
         } else {
            toast(json.error, {
               description: "Please try again !",
            });
         }
      } finally {
         setLoading(false);
      }
   }

   async function handleSignIn({
      provider,
      email,
      password,
      anonymous,
      capchaToken,
   }: {
      provider?: "google" | "github";
      email?: string;
      password?: string;
      anonymous?: boolean;
      capchaToken?: string;
   }) {
      try {
         setLoading(true);

         let body: Record<string, unknown> = {};
         if (provider) body = { provider };
         else if (anonymous)
            body = { anonymous: true, captchaToken: capchaToken };
         else body = { email, password };

         const res = await fetch("/api/supabase/auth/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
         });

         const json = await res.json();

         if (res.ok) {
            if (json.data?.url) {
               window.location.href = json.data.url;
            } else {
               Cookies.set("auth-success", "true", { path: "/" });
               router.push("/");
            }
         } else {
            toast(
               json.error ||
                  `${
                     provider ?? (anonymous ? "Anonymous" : "Email")
                  } Sign-In failed`,
               {
                  description: "Please try again!",
               }
            );
         }
      } finally {
         setLoading(false);
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
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger
                  value="sign-in"
                  className="text-primary-foreground-1"
               >
                  Sign In
               </TabsTrigger>
               <TabsTrigger
                  value="sign-up"
                  className="text-primary-foreground-1"
               >
                  Sign Up
               </TabsTrigger>
            </TabsList>

            <div className="flex max-w-xl flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="sign-in" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className=" flex flex-col">
                           <p className="text-2xl uppercase">SIGN IN</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Make changes to your account here. Click save when
                           you&apos;re done. 🧩
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-85 p-0 flex flex-col justify-center space-y-3">
                        <div className="grid grid-cols-2 gap-5">
                           <Button
                              variant={"ghost"}
                              className="border shadow-sm"
                              onClick={() =>
                                 handleSignIn({ provider: "github" })
                              }
                           >
                              <Icon styles="solid" name="github" />
                              Github
                           </Button>
                           <Button
                              variant={"ghost"}
                              className="border shadow-sm"
                              onClick={() =>
                                 handleSignIn({ provider: "google" })
                              }
                           >
                              <Icon styles="solid" name="google-logo-bold" />
                              Google
                           </Button>
                        </div>
                        <Separator />
                        <div className="space-y-1">
                           <Label htmlFor="username">Email</Label>
                           <Input
                              className=" text-sm border-primary/30 dark:border-input"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Your Email"
                           />
                        </div>
                        <div className="space-y-1">
                           <Label htmlFor="password">Password</Label>
                           <Input
                              className="text-sm border-primary/30 dark:border-input"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter Your Password"
                           />
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-3">
                           <Link
                              href={"auth/forgot-password"}
                              className="text-gray-950 underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2 dark:text-white"
                           >
                              Forgot Password &rarr;
                           </Link>
                           <Button
                              className="w-2/5"
                              type="button"
                              onClick={() => handleSignIn({ email, password })}
                           >
                              {loading ? "Loading..." : "Sign In"}
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               </TabsContent>

               <TabsContent value="sign-up" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className=" flex flex-col">
                           <p className="text-2xl uppercase">SIGN UP</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Create your account to unleash your dreams
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-85 p-0 flex flex-col justify-center space-y-3">
                        <div className="space-y-1">
                           <Label htmlFor="username">Email</Label>
                           <Input
                              className=" text-sm border-primary/30 dark:border-input"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Your Email"
                           />
                        </div>
                        <div className="space-y-1">
                           <Label htmlFor="password">Password</Label>
                           <Input
                              className="text-sm border-primary/30 dark:border-input"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter Your Password"
                           />
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-3">
                           {/* <Button
                              className="w-2/5 border border-primary/50"
                              type="button"
                              variant={"ghost"}
                              onClick={() => handleSignIn({ anonymous: true })}
                           >
                              Anonymous
                           </Button> */}
                           <TurnstileWidget
                              onSuccess={(tok) =>
                                 handleSignIn({
                                    anonymous: true,
                                    capchaToken: tok,
                                 })
                              }
                           />
                           <Button
                              className="w-2/5"
                              type="button"
                              onClick={handleSignUp}
                           >
                              {loading ? "Loading..." : "Sign Up"}
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
