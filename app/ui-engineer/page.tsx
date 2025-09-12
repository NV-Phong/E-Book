"use client";
import Icon from "@/components/ui-engineer/Icon";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import routesData from "@/data/routes.json";
import { RouteItem, RoutesData } from "@/types/route";

const extractPaths = (routes: RouteItem[], basePath: string = ""): string[] => {
   const paths: string[] = [];
   routes.forEach((route) => {
      const currentPath = basePath ? `${basePath}/${route.path}` : route.path;
      paths.push(currentPath);
      if (route.children && route.children.length > 0) {
         paths.push(...extractPaths(route.children, currentPath));
      }
   });
   return paths;
};

export default function UIEngineer() {
   const router = useRouter();
   const [currentTab, setCurrentTab] = useState("ui/ux");
   const [items, setItems] = useState<string[]>([]);
   const [APIitems, setAPIItems] = useState<string[]>([]);

   useEffect(() => {
      const typedRoutesData = routesData as RoutesData;
      const uiRoute = typedRoutesData.routes.find(
         (route) => route.path === "ui-engineer"
      );
      const uiPaths = uiRoute?.children ? extractPaths(uiRoute.children) : [];
      setItems(uiPaths);
   }, []);

   useEffect(() => {
      const typedRoutesData = routesData as RoutesData;
      const apiRoute = typedRoutesData.api.find(
         (route) => route.path === "api"
      );
      const apiPaths = apiRoute?.children
         ? extractPaths(apiRoute.children)
         : [];
      setAPIItems(apiPaths);
   }, []);

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger value="ui/ux" className="text-primary">
                  UI/UX
               </TabsTrigger>
               <TabsTrigger value="api" className="text-primary">
                  API
               </TabsTrigger>
            </TabsList>
            <div className="flex max-w-xl flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="ui/ux" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className=" flex flex-col">
                           <Badge className="text-primary-foreground-darker bg-primary/10 rounded-sm border-primary/20">
                              <Icon
                                 size={15}
                                 styles="bulk"
                                 className="!bg-primary-foreground-darker"
                                 name="start-up"
                              />
                              Coming Soon
                           </Badge>
                           <p className="text-2xl">UI ENGINEER</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           This site will be a place to store and share my UI/UX
                           components and prototypes.
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="space-y-2 p-0 flex">
                        <ul>
                           {items.map((item) => (
                              <li
                                 key={item}
                                 className="flex items-center gap-2"
                              >
                                 <Icon
                                    size={10}
                                    name={"solid/star"}
                                    className="mt-1"
                                 />
                                 <Link
                                    href={`/ui-engineer/${item}`}
                                    className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent border-none text-gray-950 underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2 dark:text-white"
                                 >
                                    {item}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex gap-50 justify-between mt-5">
                           <Link
                              href={"/"}
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
               <TabsContent value="api" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className=" flex flex-col">
                           <Badge className="text-primary-foreground-darker bg-primary/10 rounded-sm border-primary/20">
                              <Icon
                                 size={15}
                                 styles="bulk"
                                 className="!bg-primary-foreground-darker"
                                 name="start-up"
                              />
                              Coming Soon
                           </Badge>
                           <p className="text-2xl">API</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           This site will be a place to store and share my UI/UX
                           components and prototypes.
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="space-y-2 p-0 flex">
                        <ul>
                           {APIitems.map((item) => (
                              <li
                                 key={item}
                                 className="flex items-center gap-2"
                              >
                                 <Icon
                                    size={10}
                                    name={"solid/star"}
                                    className="mt-1"
                                 />
                                 <Link
                                    href={`/api/${item.replace(
                                       /\[.*?\]/g,
                                       ":id"
                                    )}`}
                                    className="text-gray-950 underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2 dark:text-white"
                                 >
                                    {item}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex gap-50 justify-between mt-5">
                           <Link
                              href={"/"}
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
