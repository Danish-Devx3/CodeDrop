"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Share2, Zap, Shield, Search, Terminal } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 left-0 z-[-2] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute top-1/2 right-0 z-[-2] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">CodeDrop</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-secondary-foreground text-sm font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-2 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-4"></span>
              </span>
              v2.0 is now live
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
              Share code <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-1 to-accent animate-gradient-x">
                without limits
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The modern way to store, share, and collaborate on code snippets. Beautiful syntax highlighting, instant sharing, and secure storage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-primary text-primary-foreground rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
              >
                Start Dropping Code
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/snippets"
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-card border border-border text-card-foreground rounded-2xl hover:bg-accent/10 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Explore Snippets
              </Link>
            </div>
          </motion.div>

          {/* Hero Image / Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30"></div>
            <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden min-h-[400px]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-5/80" />
                  <div className="w-3 h-3 rounded-full bg-chart-3/80" />
                  <div className="w-3 h-3 rounded-full bg-chart-2/80" />
                </div>
                <div className="ml-4 px-3 py-1 rounded-md bg-background/50 text-xs text-muted-foreground font-mono flex-1 text-center">
                  script.ts
                </div>
              </div>
              <div className="p-6 md:p-8 font-mono text-sm md:text-base overflow-x-auto">
                <div className="space-y-1">
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">1</span><span className="text-chart-1">import</span> <span className="text-chart-3">{`{`}</span> <span className="text-chart-1">NextApiRequest</span>, <span className="text-chart-1">NextApiResponse</span> <span className="text-chart-3">{`}`}</span> <span className="text-chart-1">from</span> <span className="text-chart-2">'next'</span>;</div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">2</span></div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">3</span><span className="text-chart-1">export</span> <span className="text-chart-1">default</span> <span className="text-chart-1">async</span> <span className="text-chart-1">function</span> <span className="text-chart-3">handler</span><span className="text-chart-3">(</span></div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">4</span>  <span className="text-chart-5">req</span>: <span className="text-chart-1">NextApiRequest</span>,</div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">5</span>  <span className="text-chart-5">res</span>: <span className="text-chart-1">NextApiResponse</span></div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">6</span><span className="text-chart-3">)</span> <span className="text-chart-3">{`{`}</span></div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">7</span>  <span className="text-chart-1">const</span> <span className="text-chart-3">{`{`}</span> <span className="text-chart-5">method</span> <span className="text-chart-3">{`}`}</span> = <span className="text-chart-5">req</span>;</div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">8</span>  </div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">9</span>  <span className="text-muted-foreground">// This is where the magic happens ✨</span></div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">10</span>  <span className="text-chart-1">res</span>.<span className="text-chart-3">status</span>(<span className="text-chart-3">200</span>).<span className="text-chart-3">json</span>(<span className="text-chart-3">{`{`}</span> <span className="text-chart-5">message</span>: <span className="text-chart-2">'CodeDrop is awesome! 🚀'</span> <span className="text-chart-3">{`}`}</span>);</div>
                  <div className="flex"><span className="text-primary w-8 select-none opacity-50">11</span><span className="text-chart-3">{`}`}</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-secondary/20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features to help you manage your development workflow better than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Zap className="w-6 h-6 text-chart-3" />,
                title: "Lightning Fast",
                description: "Built on modern edge infrastructure for millisecond latency anywhere in the world."
              },
              {
                icon: <Shield className="w-6 h-6 text-chart-2" />,
                title: "Secure by Design",
                description: "End-to-end encryption and private snippet options ensure your code stays yours."
              },
              {
                icon: <Share2 className="w-6 h-6 text-chart-1" />,
                title: "Easy Sharing",
                description: "Generate beautiful, shareable links for your snippets with a single click."
              },
              {
                icon: <Terminal className="w-6 h-6 text-primary" />,
                title: "Syntax Highlighting",
                description: "Support for over 100+ languages with automatic detection and beautiful themes."
              },
              {
                icon: <Code2 className="w-6 h-6 text-primary" />,
                title: "Versioning",
                description: "Keep track of changes with built-in version control for all your snippets."
              },
              {
                icon: <Search className="w-6 h-6 text-chart-5" />,
                title: "Smart Search",
                description: "Find any piece of code instantly with our advanced semantic search engine."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
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
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">CodeDrop</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 CodeDrop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
