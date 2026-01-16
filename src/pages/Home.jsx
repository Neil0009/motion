import React from 'react';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Process from '@/components/home/Process';
import Industries from '@/components/home/Industries';
import Contact from '@/components/home/Contact';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Hero />
      <Services />
      <Process />
      <Industries />
      <Contact />
      <Footer />
    </div>
  );
}