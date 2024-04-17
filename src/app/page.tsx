"use client";

import NavBar from "@/components/NavBar";





export default function Home() {
   
  return (
   <div className="text-zinc-100 min-h-screen">
    <NavBar /> 
    <div className="">
        <p className="text-lg py-8 px-6 flex flex-col justify-center">
          Thoughts, Questions , or just need a reminder? Leave yourself a note below! 📨
        </p>
        <div className="h-1 bg-spray-400 shadow-spray-200" />
        <div className="flex justify-center items-center h-full px-8 py-10">
          <div className="w-screen grid grid-cols-2 gap-8 items-center">
            {Array.from({length: 20}).map((_, i) => {
              return (
                <div key={i} className="border-2 rounded-md border-rum-500 flex">
                  <div className="w-1 rounded bg-spray-300" />
                  <div className="p-8 bg-spray-950/85 w-full">IM A  BEAST!</div>
                </div>
              )
            })}
          </div>
        </div>
    </div>
   </div> 
  );
}

