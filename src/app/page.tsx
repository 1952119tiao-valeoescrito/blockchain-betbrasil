"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Descomente se for usar logo.png
import { ArrowRight, ShieldCheck, Zap, Globe, Coins, Lock, Cpu, Menu, X, ChevronRight, BarChart3 } from 'lucide-react';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-slate-100 selection:bg-[#cfb16d] selection:text-black overflow-x-hidden">
      
      {/* BACKGROUND EFFECTS (Dourado Sutil) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#cfb16d]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#cfb16d]/5 blur-[120px] rounded-full"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0b0c10]/90 backdrop-blur-md border-[#2a2d35] py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo Placeholder (B) */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#2a2d35] shadow-lg shadow-[#cfb16d]/10 flex items-center justify-center bg-[#13151a]">
               {/* <Image src="/images/logo.png" ... /> Se tiver logo, use aqui */}
               <span className="text-[#cfb16d] font-bold text-xl">B</span>
            </div>
            <sp