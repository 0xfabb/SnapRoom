"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSectionOne() {
  const router = useRouter();
  return (
    <div className="relative flex max-w-screen flex-col items-center justify-center bg-black">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
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
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
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
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => router.push("/room")}
            className="w-60 transform rounded-lg bg-purple-800 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:hover:bg-purple-900"
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
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <Image
              src="/snaproom-ss.png"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-fit"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-1">
        {/* <div className="size-7 rounded-full bg-gradient-to-br from-blue-500 to-red-500" /> */}
        <Image
          src="/favicon-32x32.png"
          alt="Landing page preview"
          width={32}
          height={12}
          className="rounded-full object-cover"
        />

        <h1 className="text-base text-white font-bold md:text-2xl">napRoom</h1>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-neutral text-white px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row">
        {/* Left section: logo and text */}
        <aside className="flex items-center gap-4 text-center sm:text-left">
          <Image
            src="/favicon-32x32.png"
            width={50}
            height={50}
            alt="Company Logo"
            className="rounded"
          />
          <p className="text-sm leading-relaxed">
            SnapRoom Technology
            <br />
            A FabX Product
          </p>
        </aside>

      
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <h6 className="text-sm font-semibold uppercase tracking-wide">
            CODEBASE 
          </h6>
          <div className="flex gap-4">
            <a href="https://github.com/0xfabb/snaproom" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg
                className="h-6 w-6 fill-current text-white hover:text-gray-400 transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.804 8.207 11.397.6.11.82-.26.82-.577v-2.038c-3.338.724-4.042-1.612-4.042-1.612-.546-1.394-1.333-1.766-1.333-1.766-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.24 1.838 1.24 1.07 1.832 2.808 1.303 3.49.998.108-.773.42-1.303.762-1.604-2.666-.302-5.466-1.335-5.466-5.925 0-1.31.468-2.385 1.236-3.222-.124-.302-.535-.98.116-2.04 0 0 .896-.288 2.937 1.104 2.283-.636 4.736-.636 6.98 0 2.04-1.392 2.937-1.104 2.937-1.104.651 1.06.242 1.738.116 2.04.768.837 1.236 1.912 1.236 3.222 0 4.597-2.805 5.621-5.474 5.924.43.369.818 1.092.818 2.206v3.281c0 .318.22.687.82.576 4.77-1.593 8.207-6.094 8.207-11.397 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
           
          </div>
        </div>
      </div>
    </footer>
  );
};


