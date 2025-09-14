"use client";

import { BookPayment } from "@/components/book";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import Particles from "@/components/magicui/particles";
import Icon from "@/components/ui-engineer/Icon";
import { Library } from "@/components/ui-engineer/library";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function NotFound() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("best-seller");

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

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

         <div className="flex items-center justify-center col-start-3 row-start-1">
            <div className="flex flex-col items-center justify-center">
               <div className="mb-9 mt-15 max-w-7xl mx-auto w-full pt-20 md:pt-0 text-center">
                  <h1 className="h-40 text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900 bg-opacity-50">
                     Wellcome to !
                     <GradualSpacing
                        className="font-display text-center text-5xl font-bold -tracking-widest text-neutral-900 dark:text-neutral-200 md:text-7xl md:leading-[5rem]"
                        text="E-Book"
                     />
                     <br />
                  </h1>
                  <p className="font-normal text-base text-neutral-700 max-w-3xl mx-auto dark:text-neutral-500">
                     This is a place where stories, knowledge, and creativity
                     meet. Here you can explore a wide range of books, from
                     inspiring tales to practical guides, all designed to help
                     you learn, grow, and enjoy the world of reading. Whether
                     for study, work, or relaxation, E-Book is your companion
                     anytime, anywhere.
                  </p>
               </div>
            </div>
         </div>

         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger value="best-seller" className="text-primary">
                  Best Seller
               </TabsTrigger>
               <TabsTrigger value="library" className="text-primary">
                  Library
               </TabsTrigger>
            </TabsList>

            <div className="flex w-auto flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="best-seller" className="flex justify-center">
                  <Card className="rounded-2xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className="flex flex-col">
                           <code className="text-primary-foreground-1 -mb-1">
                              -30%
                           </code>
                           <p className="text-2xl uppercase">Best Seller</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Our most popular and trusted picks, loved by
                           customers.
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-2 p-0 flex justify-center">
                        <ExpandableCard
                           title="Bí Mật Của May Mắn"
                           src="https://aiebp.edu.vn/uploads/thu-vien-aie/2018_08/38745607_1680531425388703_2689024482235908096_n.jpg"
                           description="Alex Rovira"
                           classNameExpanded="[&_h4]:text-foreground bg-background [&_h4]:font-medium"
                           price="2.000 VND"
                        >
                           <h4>Description</h4>
                           <p>
                              “Good Luck” by Alex Rovira is an inspiring fable
                              that shows how true fortune is created, not found.
                              Through the journey of two knights seeking a
                              magical clover, it reveals timeless lessons on
                              creating opportunities, achieving success, and
                              living with purpose.
                           </p>
                           <div className="w-full">
                              <BookPayment
                                 title={"Bí Mật Của May Mắn"}
                                 amount={2000}
                              />
                           </div>
                        </ExpandableCard>
                     </CardContent>
                     <CardFooter className="h-0 p-0 w-90"></CardFooter>
                  </Card>
               </TabsContent>

               <TabsContent value="library" className="flex justify-center">
                  <Card className="w-2xl border-none shadow-none">
                     <CardHeader>
                        <CardTitle className=" flex justify-between">
                           <p className="text-2xl uppercase">Library</p>
                           <Badge className="h-6 text-[10px] text-primary-foreground-darker bg-primary/10 rounded-sm border-primary/20">
                              <Icon
                                 size={12}
                                 styles="bulk"
                                 className="!bg-primary-foreground-darker"
                                 name="start-up"
                              />
                              Coming Soon
                           </Badge>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           This feature is under development
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2 flex justify-between">
                           <Library />
                        </div>
                     </CardContent>
                     <CardFooter className="align justify-between">
                        <Button
                           variant="ghost"
                           className="w-2/5 border"
                           type="button"
                        >
                           Clear
                        </Button>
                        <Button className="w-2/5" type="button" disabled>
                           Go to Payment
                        </Button>
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
