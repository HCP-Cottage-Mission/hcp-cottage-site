import React from 'react';
import { Menu, X, MapPin, Star, Calendar, ArrowRight, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import heroImage from './assets/hero.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#fdfdfb] text-[#1a1a1a]">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold tracking-tight text-[#c5a059]">HCP</span>
            <span className="text-2xl font-serif font-light tracking-widest uppercase">Cottage</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12 px-2">
            <a href="#about" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#c5a059] transition-colors">The Experience</a>
            <a href="#amenities" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#c5a059] transition-colors">Amenities</a>
            <a href="#gallery" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#c5a059] transition-colors">Gallery</a>
            <a href="#booking" className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-all duration-300">Book Stay</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img 
          src={heroImage} 
          alt="Luxury Cottage Exterior" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 hero-overlay"></div>
        
        <div className="relative z-10 text-center max-w-4xl px-6 fade-in-up">
          <div className="flex items-center justify-center space-x-2 mb-6 text-[#c5a059]">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-[0.3em]">The Heart of Serenity</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight italic">
            Elegance <span className="font-light not-italic">Defined,</span><br />
            Nature <span className="font-light not-italic">Embraced.</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of luxury living in our sanctuary. Designed for those who seek tranquility without compromising on sophistication.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button className="w-full md:w-auto bg-[#c5a059] text-white px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#1a1a1a] transition-all duration-500 shadow-xl shadow-black/20">
              Reserve Your Escape
            </button>
            <button className="w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all duration-500">
              Explore Amenities
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-white/30"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#fdfdfb]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              A Masterpiece of <br />
              <span className="text-[#c5a059] italic px-2">Modern Comfort</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light italic">
              HCP Cottage is more than a destination; it's a curated experience designed to rejuvenate the spirit. Every corner of our property reflects a commitment to architectural excellence and guest comfort.
            </p>
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100 italic font-bold uppercase tracking-widest text-[#1a1a1a]">
              <div className="flex items-center space-x-3 italic">
                <Star className="w-5 h-5 text-[#c5a059] italic" />
                <span className="text-xs">5-Star Rating</span>
              </div>
              <div className="flex items-center space-x-3 italic">
                <ShieldCheck className="w-5 h-5 text-[#c5a059] italic" />
                <span className="text-xs">Secure Haven</span>
              </div>
            </div>
            <button className="flex items-center text-sm font-bold text-[#1a1a1a] uppercase tracking-widest hover:text-[#c5a059] transition-colors group italic">
              Our Vision <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform italic" />
            </button>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-[#c5a059]/10"></div>
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="font-serif italic text-4xl">Interior Harmony</span>
                </div>
             </div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#c5a059] rounded-2xl p-8 flex flex-col justify-end text-white shadow-xl shadow-[#c5a059]/20 hidden md:flex">
                <p className="text-4xl font-serif font-bold italic">24/7</p>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-2 italic shadow-sm">White Glove Concierge</p>
             </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-32 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 italic">Unrivaled <span className="font-light not-italic italic uppercase tracking-tighter">Amenities</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light italic">Refined luxury at your fingertips. Every detail meticulously planned.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 italic">
          {[
            { title: 'Panoramic Views', desc: 'Floor-to-ceiling windows overlooking pristine vistas.', icon: <MapPin className="w-6 h-6 text-[#c5a059] italic" /> },
            { title: 'Smart Integration', desc: 'Full home automation for seamless comfort.', icon: <Calendar className="w-6 h-6 text-[#c5a059] italic" /> },
            { title: 'Private Spa', desc: 'Indulge in our heated therapy pool and sauna.', icon: <Star className="w-6 h-6 text-[#c5a059] italic" /> },
          ].map((item, i) => (
            <div key={i} className="p-12 border border-white/10 rounded-3xl hover:border-[#c5a059] transition-all duration-500 group relative overflow-hidden italic">
              <div className="mb-8">{item.icon}</div>
              <h3 className="text-2xl font-serif mb-4 italic uppercase">{item.title}</h3>
              <p className="text-gray-500 font-light italic uppercase tracking-tighter">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-serif font-bold tracking-tight text-[#c5a059] italic uppercase tracking-tighter shadow-sm">HCP</span>
            <span className="text-xl font-serif font-light tracking-widest uppercase">Cottage</span>
          </div>
          
          <div className="flex space-x-8 italic">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-[#c5a059] cursor-pointer transition-colors italic" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-[#c5a059] cursor-pointer transition-colors italic uppercase tracking-widest" />
          </div>
          
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 italic shadow-sm hover:text-white transition-colors uppercase tracking-widest">
            © 2026 HCP Cottage. Managed by Joanne.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
