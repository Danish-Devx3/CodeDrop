"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Share2, Zap, Shield, Search, Terminal } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-secondary/10 text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 left-0 z-[-2] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute top-1/2 right-0 z-[-2] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>



      {/* Hero Section */}
      <div className="p-4 md:p-8 pt-12 md:pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[1400px] bg-background rounded-lg shadow-2xl overflow-hidden relative"
        >

          {/* Hero Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center px-6 pb-16 pt-8 md:px-12 md:pb-24">
            {/* Left: Text Content */}
            <div className="space-y-8 max-w-2xl">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-full border border-border bg-secondary/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Seamless Code Sharing
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] text-foreground">
                Optimize, <br />
                <span className="text-primary">Outperform.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                The modern standard for storing and collaborating on code snippets. Secure, fast, and built for developers.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/snippets"
                  className="px-8 py-4 text-base font-bold bg-foreground text-background rounded-full hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
                >
                  Explore Snippets
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-4 text-base font-bold text-foreground border border-border rounded-full hover:bg-secondary/50 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-2xl opacity-50" />
              <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 will-change-transform">
                {/* Fake Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-chart-5/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-chart-3/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-chart-2/80" />
                  </div>
                  <div className="ml-4 px-3 py-1 rounded bg-background/50 text-[10px] text-muted-foreground font-mono flex-1 text-center truncate">
                    https://codedrop.app/s/83j29d
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 md:p-8 font-mono text-xs md:text-sm overflow-x-auto bg-card">
                  <div className="space-y-1.5">
                    <div className="flex"><span className="text-primary w-6 select-none opacity-30">1</span><span className="text-chart-1">import</span> <span className="text-chart-3">{`{`}</span> <span className="text-chart-1">NextApiRequest</span> <span className="text-chart-3">{`}`}</span> <span className="text-chart-1">from</span> <span className="text-chart-2">'next'</span>;</div>
                    <div className="flex"><span className="text-primary w-6 select-none opacity-30">2</span></div>
                    <div className="flex"><span className="text-primary w-6 select-none opacity-30">3</span><span className="text-muted-foreground">// Optimized for performance ⚡</span></div>
                    <div className="flex"><span className="text-primary w-6 select-none opacity-30">4</span><span className="text-chart-1">export</span> <span className="text-chart-1">default</span> <span className="text-chart-1">function</span> <span className="text-chart-3">handler</span><span className="text-chart-3">(</span><span className="text-chart-5">req</span><span className="text-chart-3">)</span> <span className="text-chart-3">{`{`}</span></div>
                    <div className="flex"><span className="text-primary w-6 select-none opacity-30">5</span>  <span className="text-chart-1">const</span> <span className="text-chart-5">data</span> = <span className="text-chart-3">await</span> <span className="text-chart-3">db</span>.<span className="text-chart-3">optimize</span><span className="text-chart-3">()</span>;</div>
                    <div className="flex"><span className="text-primary w-6 select-none opacity-30">6</span>  <span className="text-chart-1">return</span> <span className="text-chart-3">res</span>.<span className="text-chart-3">json</span><span className="text-chart-3">(</span><span className="text-chart-5">data</span><span className="text-chart-3">)</span>;</div>
                    <div className="flex"><span className="text-primary w-6 select-none opacity-30">7</span><span className="text-chart-3">{`}`}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              How CodeDrop Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to streamline your code sharing workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Paste Your Code",
                description: "Paste your snippet into our intelligent editor. We automatically detect the language and apply beautiful syntax highlighting.",
              },
              {
                step: "02",
                title: "Save & Organize",
                description: "Save your snippet to your personal library. Organize with tags and descriptive titles for easy retrieval later.",
              },
              {
                step: "03",
                title: "Share Instantly",
                description: "Get a unique, secure link to share your code with teammates, friends, or the world. Collaboration has never been easier.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-8 rounded-3xl bg-card border border-border group"
              >
                <div className="text-6xl font-black text-muted/20 absolute -top-4 -right-4 select-none group-hover:text-primary/10 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack / Project Details */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Built for Performance</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              CodeDrop is engineered with the latest web technologies to ensure a seamless, ultra-fast experience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Next.js 14", desc: "App Router & Server Actions" },
              { name: "TypeScript", desc: "Type-safe development" },
              { name: "TailwindCSS", desc: "Utility-first styling" },
              { name: "Framer Motion", desc: "Smooth animations" },
              { name: "MongoDB", desc: "Flexible document storage" },
              { name: "Clerk / Auth", desc: "Secure authentication" },
              { name: "Shadcn UI", desc: "Accessible components" },
              { name: "Vercel", desc: "Global edge deployment" },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-background border border-border text-center hover:border-primary/50 transition-colors"
              >
                <div className="font-bold text-foreground">{tech.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid (Refined) */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features to help you manage your development workflow better than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Zap className="w-6 h-6 text-chart-3" />,
                title: "Lightning Fast",
                description: "Built on modern edge infrastructure for millisecond latency anywhere.",
              },
              {
                icon: <Shield className="w-6 h-6 text-chart-2" />,
                title: "Secure by Design",
                description: "End-to-end encryption and private snippet options ensure your code stays yours.",
              },
              {
                icon: <Share2 className="w-6 h-6 text-chart-1" />,
                title: "Easy Sharing",
                description: "Generate beautiful, shareable links for your snippets with a single click.",
              },
              {
                icon: <Terminal className="w-6 h-6 text-primary" />,
                title: "Syntax Highlighting",
                description: "Support for over 100+ languages with automatic detection and themes.",
              },
              {
                icon: <Code2 className="w-6 h-6 text-primary" />,
                title: "Versioning",
                description: "Keep track of changes with built-in version control.",
              },
              {
                icon: <Search className="w-6 h-6 text-chart-5" />,
                title: "Smart Search",
                description: "Find any piece of code instantly with our advanced search engine.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8 bg-card/30 p-12 rounded-3xl border border-border backdrop-blur-md">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Ready to streamline your workflow?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of developers who trust CodeDrop for their daily coding needs.
            </p>
            <Link
              href="/register"
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <svg
              id="logo-35-footer"
              width="50"
              height="39"
              viewBox="0 0 50 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-auto"
            >
              <path
                d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                className="fill-primary"
              ></path>
              <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                className="fill-chart-1"
              ></path>
            </svg>
            <span className="text-foreground font-bold text-xl tracking-tight">
              Code<sub className="font-medium text-primary">Drop</sub>
            </span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/help" className="hover:text-foreground transition-colors">Help</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 CodeDrop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
