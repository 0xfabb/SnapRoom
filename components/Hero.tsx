import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Upload, Zap, Brain, FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Gradient */}
      <div
        className="z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(251, 191, 36, 0.15), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* <div className="mb-16"> */}
          {/* Logo & Brand */}
          {/* <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl md:text-2xl">S</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">SnapRoom</h1>
          </div>

          <h2 className="text-xl md:text-3xl font-semibold text-amber-200 mb-6 leading-relaxed">
            👋 Share files. Sync text. Meet your other device. Instantly.
          </h2>
          <p className="text-lg md:text-xl text-amber-200/80 max-w-4xl mx-auto mb-12 leading-relaxed">
            Your own private space to chat, share, and sync files across devices or with your team — 
            no signups, no friction, no history.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              href="/room"
              className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/25 flex items-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>Create a SnapRoom</span>
            </Link>
            <Link
              href="#features"
              className="group border border-amber-400/30 text-amber-200 hover:text-amber-100 hover:bg-amber-400/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm flex items-center space-x-2"
            >
              <span>How it works</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div> */}
        <div className="text-white text-5xl mb-12 text-center font-black">
            
    Why use SnapRoom?
        </div>
        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Zap,
              title: "Start instantly",
              description: "Just enter your name and room ID",
              emoji: "🟢"
            },
            {
              icon: Upload,
              title: "Upload files up to 25MB",
              description: "Viewable by everyone in room",
              emoji: "📂"
            },
            {
              icon: Brain,
              title: "All messages + files stay in-memory",
              description: "Unless saved",
              emoji: "🧠"
            },
            {
              icon: FileText,
              title: "Optionally save entire room",
              description: "With one click for later use",
              emoji: "🧾"
            },
            {
              icon: Zap,
              title: "Built for quick thoughts",
              description: "Remote collabs, device syncing",
              emoji: "⚡"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-amber-950/20 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-amber-950/30 hover:border-amber-400/30 ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{feature.emoji}</span>
                {React.createElement(feature.icon, { className: "w-6 h-6 text-amber-400" })}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-amber-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-amber-200/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-amber-950/30 to-orange-950/30 backdrop-blur-xl border border-amber-400/20 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-amber-200/80 mb-6 text-lg">
            Create your first SnapRoom in seconds — no account required.
          </p>
    
            
         
        </div>
      </div>
    </section>
  );
}