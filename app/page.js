"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const AIComponentGenerator = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('ui');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main min-h-screen bg-zinc-950">
     
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-500 opacity-10 blur-3xl"></div>
      </div>
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-900/90 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-400 to-sky-500"></div>
            <span className="text-white font-bold text-xl">AICom</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-zinc-400 hover:text-white transition">Features</a>
            <a href="#examples" className="text-zinc-400 hover:text-white transition">Examples</a>
            <a href="#pricing" className="text-zinc-400 hover:text-white transition">Contact</a>
          </div>
          
          <Link href="/dashboard">
            <button className="bg-gradient-to-br from-emerald-400 to-sky-500 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition duration-300 border border-zinc-700">
              Get Started
            </button>
          </Link>
        </div>
      </nav>
      
     
      <section className="relative pt-32 pb-20 px-4 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                AI-Powered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">Component Generator</span>
              </h1>
              <p className="text-lg text-zinc-400 mb-8">
                Transform your ideas into beautiful UI components with just a text prompt. Our AI creates React components that match your vision instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/dashboard">
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-sky-600 text-white rounded-md font-medium hover:from-emerald-600 hover:to-sky-700 transition-all shadow-lg">
                    Try For Free
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 shadow-2xl">
                <div className="bg-zinc-900 rounded-lg p-4 overflow-hidden">
                  <div className="flex gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                    <span className="text-orange-400">{"<"}</span>
                    <span className="text-sky-400">Card</span>
                    <span className="text-orange-400">{">"}</span>{"\n"}
                    {"  "}<span className="text-orange-400">{"<"}</span>
                    <span className="text-sky-400">CardHeader</span>
                    <span className="text-orange-400">{">"}</span>{"\n"}
                    {"    "}<span className="text-orange-400">{"<"}</span>
                    <span className="text-sky-400">CardTitle</span>
                    <span className="text-orange-400">{">"}</span>
                    <span className="text-gray-100">AI Generated Component</span>
                    <span className="text-orange-400">{"</"}</span>
                    <span className="text-sky-400">CardTitle</span>
                    <span className="text-orange-400">{">"}</span>{"\n"}
                    {"  "}<span className="text-orange-400">{"</"}</span>
                    <span className="text-sky-400">CardHeader</span>
                    <span className="text-orange-400">{">"}</span>{"\n"}
                    <span className="text-orange-400">{"</"}</span>
                    <span className="text-sky-400">Card</span>
                    <span className="text-orange-400">{">"}</span>
                  </pre>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-emerald-600 to-sky-600 rounded-md -z-10 blur-lg opacity-50"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">Powerful Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Generation",
                description: "Transform text descriptions into fully responsive React components in seconds.",
                icon: "✨"
              },
              {
                title: "Code Export",
                description: "Download clean, maintainable React code that's ready to use in your projects.",
                icon: "📦"
              },
              {
                title: "Customization",
                description: "Easily modify generated components with our intuitive visual editor.",
                icon: "🎨"
              },
              {
                title: "Component Library",
                description: "Access a growing library of pre-built components for faster development.",
                icon: "📚"
              },
              {
                title: "Theme Support",
                description: "Automatically adapts to your project's theme or choose from our templates.",
                icon: "🎭"
              },
              {
                title: "Responsive Design",
                description: "All components are mobile-first and fully responsive out of the box.",
                icon: "📱"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-zinc-800 p-6 rounded-lg border-l-4 border-emerald-500 hover:bg-zinc-750 transition-all group">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-sky-600 rounded-md text-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section id="examples" className="relative py-20 px-4 bg-zinc-900 z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            See It In Action
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
            Our AI understands your requirements and generates beautiful, functional components instantly.
          </p>
          
          <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <button 
                className={`px-4 py-2 rounded-md transition-all ${activeTab === 'ui' ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
                onClick={() => setActiveTab('ui')}
              >
                UI Components
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition-all ${activeTab === 'form' ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
                onClick={() => setActiveTab('form')}
              >
                Forms
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition-all ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboards
              </button>
            </div>
            
            <div className="bg-zinc-900 rounded-lg p-4 aspect-video flex items-center justify-center border border-zinc-700">
              {activeTab === 'ui' && (
                <div className="text-white text-center">
                  <p className="text-lg mb-2">UI Components Demo</p>
                  <p className="text-zinc-400">Interactive demo showing AI-generated UI components</p>
                </div>
              )}
              {activeTab === 'form' && (
                <div className="text-white text-center">
                  <p className="text-lg mb-2">Form Builder Demo</p>
                  <p className="text-zinc-400">See how our AI creates beautiful forms with validation</p>
                </div>
              )}
              {activeTab === 'dashboard' && (
                <div className="text-white text-center">
                  <p className="text-lg mb-2">Dashboard Creator Demo</p>
                  <p className="text-zinc-400">Generate complete dashboards with charts and metrics</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="relative py-20 px-4 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-8 md:p-12 border-l-4 border-emerald-500 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to revolutionize your UI development?</h2>
                <p className="text-zinc-400 mb-0 md:mb-0">Join thousands of developers using AIGen to accelerate their workflow.</p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-sky-600 text-white rounded-md font-medium hover:from-emerald-600 hover:to-sky-700 transition-all whitespace-nowrap">
                    Get Early Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-zinc-800 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-500 to-sky-600"></div>
              <span className="text-white font-bold text-xl">AICom</span>
            </div>
            
            <div className="flex gap-6 text-zinc-400">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
            
            <div className="text-zinc-500 text-sm md:block hidden">
              © 2025 AICom. All rights reserved.

            </div>
            <div className='text-zinc-500 text-sm md:hidden block'>Created and designed by 💗 Abhishek 💗 </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIComponentGenerator;