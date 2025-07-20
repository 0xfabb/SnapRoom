"use client";

import { motion } from "motion/react";
import Image from "next/image";
import SS from "./SnapSS.png"
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function HeroSectionOne() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Indigo Cosmos Background with Top Glow */}
     <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251, 191, 36, 0.25), transparent 70%), #000000",
      }}
    />

      <Navbar />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10 md:py-20">
        <h1 className="mx-auto mt-18 max-w-4xl text-center text-2xl font-bold text-slate-300 md:text-4xl lg:text-7xl">
          {"Snap. Share. Sync. Anywhere.".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400"
        >
          Instantly share notes and code between devices — no login, no setup.
          Just open SnapRoom and start syncing in real time.
        </motion.p>
        
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => router.push("/room")}
            className="w-60 transform rounded-lg bg-gradient-to-br from-amber-400 to-orange-600  px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 "
          >
            Try SnapRoom
          </button>
        </motion.div>
        
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="mt-20 rounded-3xl border border-neutral-800 bg-neutral-900 p-4 shadow-md"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-700">
            <Image
              src={SS}
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-fit object-fit"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
      <Hero />
      
      <Footer />
    </div>
  );
}


