import { FlippingCard } from "@/components/ui/flipping-card";
import { Button } from "../ui/button";
import Image from "next/image";

interface CardData {
   id: string;
   front: {
      imageSrc: string;
      imageAlt: string;
      title: string;
      description: string;
   };
   back: {
      description: string;
      buttonText: string;
   };
}

const cardsData: CardData[] = [
   {
      id: "badtz-maru",
      front: {
         imageSrc:
            "https://i.pinimg.com/736x/08/61/b8/0861b8ac50d18270ef0e9292227a2af0.jpg",
         imageAlt: "Badtz-Maru",
         title: "Good Morning",
         description:
            "This is an e-book that helps you start the day with clarity, focus, and energy.",
      },
      back: {
         description:
            "This is an e-book that helps you start the day with clarity, focus, and energy.",
         buttonText: "Add to Cart",
      },
   },
   {
      id: "keroppi",
      front: {
         imageSrc:
            "https://i.pinimg.com/736x/63/44/ff/6344ffb33b4cffed41f094238958658f.jpg",
         imageAlt: "Keroppi",
         title: "UI / UX Rules",
         description:
            "This is an e-book that helps you start the day with clarity, focus, and energy.",
      },
      back: {
         description:
            "This is an e-book that helps you start the day with clarity, focus, and energy.",
         buttonText: "Add to Cart",
      },
   },
];

export function Library() {
   return (
      <div className="flex gap-4">
         {cardsData.map((card) => (
            <FlippingCard
               key={card.id}
               width={300}
               frontContent={<GenericCardFront data={card.front} />}
               backContent={<GenericCardBack data={card.back} />}
            />
         ))}
      </div>
   );
}

interface GenericCardFrontProps {
   data: CardData["front"];
}

function GenericCardFront({ data }: GenericCardFrontProps) {
   return (
      <div className="flex h-full w-full flex-col p-4">
         <Image
            src={data.imageSrc}
            alt={data.imageAlt}
            width={1000}
            height={1000}
            className="h-auto min-h-0 w-full flex-grow rounded-md object-cover"
         />
         <div className="p-2">
            <h3 className="mt-2 text-base font-semibold">{data.title}</h3>
            <p className="text-muted-foreground mt-2 text-[13.5px]">
               {data.description}
            </p>
         </div>
      </div>
   );
}

interface GenericCardBackProps {
   data: CardData["back"];
}

function GenericCardBack({ data }: GenericCardBackProps) {
   return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6">
         <p className="text-muted-foreground mt-2 text-center text-[13.5px]">
            {data.description}
         </p>
         <Button className="bg-foreground hover:bg-foreground/75 shadow-xl mt-6 flex h-8 w-min items-center justify-center rounded-md px-4 py-2 text-[13.5px] whitespace-nowrap">
            {data.buttonText}
         </Button>
      </div>
   );
}
