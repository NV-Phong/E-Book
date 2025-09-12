"use client";

import { usePathname } from "next/navigation";

interface HiddenComponentProps {
   routes?: string[];
   children: React.ReactNode;
}

export default function HiddenComponent({
   routes = [],
   children,
}: HiddenComponentProps) {
   const pathname = usePathname();

   if (routes.length === 0) return null;

   const shouldHide = routes.some((route) => {
      if (route.endsWith("/*")) {
         const prefix = route.replace("/*", "");
         return pathname.startsWith(prefix);
      }
      return pathname === route;
   });

   if (shouldHide) return null;
   return <>{children}</>;
}
