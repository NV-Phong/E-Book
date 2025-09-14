import { BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Footer() {
   return (
      <footer className="border-t border-border py-10">
         <div className="container mx-auto px-10">
            <div className="grid md:grid-cols-4">
               <div>
                  <div className="flex items-center space-x-2 mb-4">
                     <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary-foreground" />
                     </div>
                     <span className="text-xl font-bold text-foreground">
                        E-Book
                     </span>
                  </div>
                  <p className="text-muted-foreground">
                     This E-Book platform is simple, secure, and seamless.
                     Discover and enjoy your favorite books anytime.
                  </p>
               </div>

               <div>
                  <h3 className="mb-4 font-semibold text-foreground">
                     Dịch vụ
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                     <li>
                        <a
                           href="#"
                           className="transition-colors hover:text-primary"
                        >
                           Sách điện tử
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="transition-colors hover:text-primary"
                        >
                           Mua sách
                        </a>
                     </li>
                     <li>
                        <a
                           href="#"
                           className="transition-colors hover:text-primary"
                        >
                           Tải xuống & đọc
                        </a>
                     </li>
                  </ul>
               </div>

               <div>
                  <h3 className="font-semibold text-foreground mb-4">Hỗ trợ</h3>
                  <ul className="space-y-2 text-muted-foreground">
                     <li>
                        <a href="#" className="hover:text-primary">
                           Trung tâm trợ giúp
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:text-primary">
                           Liên hệ
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:text-primary">
                           FAQ
                        </a>
                     </li>
                  </ul>
               </div>

               <div className="flex flex-col space-y-3">
                  <h3 className="font-semibold text-foreground mb-4">
                     Liên hệ
                  </h3>
                  <CardFooter className="flex flex-col items-start w-85 gap-1 p-1 pt-1 border border-primary/15 bg-primary/10 rounded-lg">
                     <Badge className="uppercase font-normal text-[10px] text-primary-foreground-darker bg-transparent h-5 rounded-sm border-none">
                        Press enter to send
                     </Badge>

                     <Input
                        className="w-full border-none max-h-30 bg-card resize-none"
                        placeholder="How can we help you?"
                     />
                  </CardFooter>
                  <ul className="space-y-3 text-muted-foreground">
                     <li>Email: support@e-bookx.vercel.app</li>
                     <li>Hotline: 1900 1234</li>
                     <li>Địa chỉ: 123 Đường ABC, TP.HCM</li>
                  </ul>
               </div>
            </div>

            <Separator className="my-8" />

            <div className="text-center text-muted-foreground">
               <p>&copy; 2025 E-Book. All rights reserved.</p>
            </div>
         </div>
      </footer>
   );
}
