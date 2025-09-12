"use client";

const GradientBackground = () => {
   return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
         <div className="w-full h-full relative">
            <div className="absolute -left-1/4 -top-1/4 w-[150vw] h-[150vh] sm:w-[120vw] sm:h-[120vh] lg:w-[100vw] lg:h-[100vh]">
               <div
                  className="w-full h-full rounded-full bg-pastel-2 opacity-10"
                  style={{
                     filter: "blur(min(25vw, 250px))",
                     transform: "scale(0.8)",
                  }}
               />
            </div>

            <div className="absolute -right-1/4 -top-1/4 w-[150vw] h-[150vh] sm:w-[120vw] sm:h-[120vh] lg:w-[100vw] lg:h-[100vh]">
               <div
                  className="w-full h-full rounded-full bg-pastel-3 opacity-10"
                  style={{
                     filter: "blur(min(20vw, 200px))",
                     transform: "scale(0.7)",
                  }}
               />
            </div>

            <div className="absolute left-1/2 -bottom-1/4 w-[100vw] h-[100vh] -translate-x-1/2">
               <div
                  className="w-full h-full rounded-full bg-pastel-4 opacity-10"
                  style={{
                     filter: "blur(min(15vw, 150px))",
                     transform: "scale(0.6)",
                  }}
               />
            </div>

            <div className="absolute -right-1/3 top-1/2 w-[80vw] h-[80vh] -translate-y-1/2">
               <div
                  className="w-full h-full rounded-full bg-pastel-5 opacity-10"
                  style={{
                     filter: "blur(min(12vw, 120px))",
                     transform: "scale(0.5)",
                  }}
               />
            </div>

            <div className="absolute left-1/4 top-3/4 w-[60vw] h-[60vh] sm:hidden">
               <div
                  className="w-full h-full rounded-full bg-pastel-6 opacity-10"
                  style={{
                     filter: "blur(min(10vw, 100px))",
                     transform: "scale(0.4)",
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default GradientBackground;
