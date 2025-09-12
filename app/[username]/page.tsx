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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useProfile } from "@/context/profile-context";

type ProfileType = {
   full_name: string | null;
   username: string;
   avatar_url: string | null;
   background_url: string | null;
};

export default function Profile() {
   const router = useRouter();
   const { username } = useParams<{ username: string }>();
   const { profile: contextProfile } = useProfile();
   const [currentTab, setCurrentTab] = useState("not-found");
   const [profile, setProfile] = useState<ProfileType | null>(contextProfile);

   useEffect(() => {
      if (contextProfile && contextProfile.username === username) {
         setProfile(contextProfile);
         return;
      }

      async function fetchProfile() {
         if (!username) return;
         try {
            const res = await fetch(`/api/profile/${username}`, {
               cache: "no-store",
            });
            const json = await res.json();
            if (res.ok) setProfile(json.data);
         } catch (err) {
            console.error("Failed to fetch profile", err);
         }
      }

      fetchProfile();
   }, [username, contextProfile]);

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <div className="flex max-w-lg flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="not-found" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className=" flex flex-col">
                           <code className="text-primary-foreground-1 -mb-2">
                              404
                           </code>
                           <p className="text-2xl uppercase">Profile</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           You&apos;re lost but hey, at least you found this
                           cute message 👉🏻👈🏻
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="space-y-2 p-0">
                        <div className="flex flex-col gap-3">
                           <div className="space-y-2">
                              <Label>Full Name</Label>
                              <Input
                                 value={profile?.full_name ?? ""}
                                 readOnly
                              />
                           </div>
                           <div className="space-y-2">
                              <Label>Avatar</Label>
                              {profile?.avatar_url ? (
                                 <Image
                                    src={profile.avatar_url}
                                    alt={profile.username}
                                    width={64}
                                    height={64}
                                    className="rounded-full border"
                                 />
                              ) : (
                                 <Image
                                    src="/default-avatar.png"
                                    alt="avatar"
                                    width={64}
                                    height={64}
                                    className="rounded-full border"
                                 />
                              )}
                           </div>
                           <div className="space-y-2">
                              <Label>Background</Label>
                              {profile?.background_url ? (
                                 <div className="relative w-full h-48">
                                    <Image
                                       src={profile.background_url}
                                       alt={profile.username}
                                       fill
                                       className="rounded-sm border object-cover"
                                    />
                                 </div>
                              ) : (
                                 <Image
                                    src="/default-avatar.png"
                                    alt="background"
                                    fill
                                    className="rounded-sm border"
                                 />
                              )}
                           </div>
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex gap-50 mt-5">
                           <Link
                              href="/resume"
                              className="text-gray-950 underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2 dark:text-white"
                           >
                              Report &rarr;
                           </Link>
                           <Button onClick={() => router.push("/")}>
                              Return Home
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
