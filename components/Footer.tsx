import Link from "next/link";
import { Github, Twitter, Linkedin, MessageSquare, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-amber-400/20">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(251, 191, 36, 0.1), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="pt-16 pb-12">
          {/* Top Section - Hero */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">SnapRoom</h2>
            </div>
            <p className="text-lg md:text-xl text-amber-200/80 max-w-2xl mx-auto mb-8">
              The fastest way to share files and ideas across devices and teammates — 
              no logins, no clutter, just one private space.
            </p>
            <Link
              href="/room"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <span>Start a Room</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Product */}
            <div>
              <h3 className="text-amber-400 font-semibold text-lg mb-4"> Product</h3>
              <ul className="space-y-3">
                {[
                  "Live Chat Rooms",
                  "File Sharing",
                  "Save Room History",
                  "Real-time Sync",
                  "Mobile Friendly"
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-amber-200/80 hover:text-amber-200 transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Teams */}
            <div>
              <h3 className="text-amber-400 font-semibold text-lg mb-4"> For Teams</h3>
              <ul className="space-y-3">
                {[
                  "College Groups",
                  "Remote Designers",
                  "Startup Collabs",
                  "Instant Classrooms",
                  "Interview Rooms"
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-amber-200/80 hover:text-amber-200 transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-amber-400 font-semibold text-lg mb-4"> Resources</h3>
              <ul className="space-y-3">
                {[
                  { name: "GitHub Repo", href: "https://github.com/0xfabb/snaproom" },
                  { name: "Documentation", href: "#", soon: true },
                  { name: "Discord Community", href: "#", soon: true },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Use", href: "#" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-amber-200/80 hover:text-amber-200 transition-colors text-sm flex items-center space-x-2"
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span>{item.name}</span>
                      {item.soon && (
                        <span className="text-xs bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-amber-400 font-semibold text-lg mb-4"> SnapRoom</h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "#" },
                  { name: "Blog", href: "#", soon: true },
                  { name: "We're Hiring", href: "#" },
                  { name: "Support", href: "#" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-amber-200/80 hover:text-amber-200 transition-colors text-sm flex items-center space-x-2"
                    >
                      <span>{item.name}</span>
                      {item.soon && (
                        <span className="text-xs bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-400/20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Left Side - Tagline */}
            <div className="text-center md:text-left">
              <p className="text-amber-200/80 text-sm mb-2">
                 SnapRoom is built with love by hackers who hate friction.
              </p>
              <p className="text-amber-200/60 text-sm">
             Made in India 🇮🇳 | © 2025 SnapRoom Inc.
              </p>
            </div>

            {/* Right Side - Social Links */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-200 hover:text-amber-400 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/0xfabb/snaproom"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-200 hover:text-amber-400 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-200 hover:text-amber-400 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-200 hover:text-amber-400 transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}