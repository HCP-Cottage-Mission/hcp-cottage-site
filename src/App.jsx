import React from 'react';
import { Menu, X, MapPin, Star, Calendar, ArrowRight, Instagram, Heart, ShieldCheck, Plane, Train, Coffee, Utensils, ShoppingBag, Lock } from 'lucide-react';

// Property Gallery Batch
import gal1 from './pics/washer.jpg';
import gal2 from './pics/Kitchen-glasses-left-refrigerator.jpg';
import gal3 from './pics/cottage_walkway_night_2.jpg';
import gal4 from './pics/cottage_porch_sofa.jpg';
import gal5 from './pics/cottage_interior_main.jpg';
import gal6 from './pics/cottage_closet.jpg';
import gal7 from './pics/cottage_porch_dinette.jpg';
import gal8 from './pics/cottage_porch_lights.jpg';
import gal9 from './pics/cottage_porch_sittingarea.jpg';
import gal10 from './pics/cottage_gal_40.jpg';
import gal11 from './pics/cottage_walkway_night_1.jpg';
import gal14 from './pics/cottage_guestgate_open.jpg';
import gal18 from './pics/cottage_gal_18.jpg';
import kit1 from './pics/cottage_cottage_full_kitchen.jpg';
import kit2 from './pics/cottage_kitchen_sink.jpg';
import kit3 from './pics/cottage_kitchen_stove.jpg';
import amenities1 from './pics/cottage_Livingroom-tv-left.jpg';
import gate_night from './pics/cottage_gate_lock_night.jpg';

const galleryItems = [
  { src: gal5, label: 'Designer Studio' },
  { src: gal2, label: 'Artisanal Barware' },
  { src: gal18, label: 'Private Porch' },
  { src: gal14, label: 'Secure Gateway' },
  { src: gal9, label: 'Screened Retreat' },
  { src: gal7, label: 'Porch Dining' },
  { src: gal8, label: 'Evening Glow' },
  { src: gal11, label: 'Starlight Path' },
  { src: gal4, label: 'Quiet Corner' },
  { src: gal1, label: 'Guest Laundry' } // Bathroom/Closet at the end
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const amenities = [
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Security', desc: 'Sifely Multi-Lock Cluster Access' },
    { icon: <Plane className="w-6 h-6" />, title: 'Proximity', desc: '5min to Hartsfield Airport' },
    { icon: <Coffee className="w-6 h-6" />, title: 'Comfort', desc: 'Fully Screened-in Private Porch' },
    { icon: <Utensils className="w-6 h-6" />, title: 'Dining', desc: 'Steps from Historic District Eats' },
    { icon: <ShoppingBag className="w-6 h-6" />, title: 'Shopping', desc: 'Near Camp Creek Marketplace' },
    { icon: <Train className="w-6 h-6" />, title: 'Metro', desc: '1 Mile from MARTA Rail Station' }
  ];

  const dining = [
    { name: 'Nouveau Bar & Grill', type: 'Dinner', note: 'Fusion vibes in Historic College Park' },
    { name: 'Paper Plane', type: 'Cocktails', note: 'Artisanal drinks and local energy' },
    { name: 'The Manchester Arms', type: 'Pub', note: 'Classic British fare and craft beer' },
    { name: 'Don Chon', type: 'Mexican', note: 'Authentic local favorite nearby' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-[#8b5e34]">HCP</span>
            <span className="text-2xl font-serif font-light tracking-[0.2em] uppercase">Cottage</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest text-[#1c1917]/70">
            <a href="#experience" className="hover:text-[#8b5e34] transition-colors">Experience</a>
            <a href="#location" className="hover:text-[#8b5e34] transition-colors">Neighborhood</a>
            <a href="#amenities" className="hover:text-[#8b5e34] transition-colors">Amenities</a>
            <a href="#booking" className="text-[#8b5e34]">Book Now</a>
          </div>
          
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[#1c1917] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src={gal5} alt="Luxury Studio Interior" className="w-full h-full object-cover" />
           <div className="absolute inset-0 hero-overlay" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="mb-8 flex items-center justify-center space-x-4">
             <div className="h-[1px] w-12 bg-[#8b5e34]" />
             <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#8b5e34]">Masterpiece in the Historic District</span>
             <div className="h-[1px] w-12 bg-[#8b5e34]" />
          </div>
          <h1 className="text-6xl md:text-9xl font-serif text-white mb-8 italic">A Brilliant Retreat</h1>
          <p className="text-xl md:text-2xl font-light text-[#fafaf9]/80 mb-12 max-w-2xl mx-auto tracking-wide">
            Experience modern Southern charm in a meticulously designed studio cottage.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="#booking" className="w-full md:w-auto bg-[#8b5e34] text-white px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#1c1917] transition-all duration-500 shadow-2xl">
              Check Availability
            </a>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section id="experience" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif leading-[1.1]">
              A <span className="text-[#8b5e34] italic">Sanctuary</span> of <br />
              Modern Southern Charm
            </h2>
            <p className="text-[#57534e] text-lg leading-relaxed font-light">
              Escape to our cozy studio in picturesque Historic College Park. Designed for solo travelers or couples, this retreat offers private secure entry, a lush screened-in porch, and unmatched proximity to Metro Atlanta's finest attractions.
            </p>
            <p className="text-sm text-[#78716c] leading-relaxed">
              * Historic College Park offers tree-lined streets, historic homes, and a walkable vibe that feels like a hidden gem within the city.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-[600px] items-start">
            <img src={gal5} alt="Signature Living Space" className="w-full h-full object-cover rounded-2xl shadow-lg" />
            <div className="flex flex-col gap-4">
              <img src={kit1} alt="Artisanal Kitchen" className="w-full h-1/2 object-cover rounded-2xl shadow-lg" />
              <div className="grid grid-cols-2 gap-4 h-1/2">
                <img src={kit2} alt="Kitchen Details" className="w-full h-full object-cover rounded-2xl shadow-lg" />
                <img src={amenities1} alt="Studio Amenities" className="w-full h-full object-cover rounded-2xl shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Heritage Gallery */}
      <section className="py-12 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end mb-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#8b5e34] mb-4">The Collection</h3>
            <p className="text-3xl font-serif italic text-[#1c1917]">Visual Heritage</p>
          </div>
          <a href="#gallery" className="text-xs font-bold uppercase tracking-widest text-[#8b5e34] border-b border-[#8b5e34] pb-1 hover:text-[#1c1917] hover:border-[#1c1917] transition-all">
            More Pics <ArrowRight className="inline-block w-3 h-3 ml-2" />
          </a>
        </div>
        <div className="max-w-full overflow-hidden">
          <div className="flex space-x-4 px-4 overflow-x-auto no-scrollbar">
            {galleryItems.map((item, i) => (
              <div key={i} className="min-w-[400px] h-[500px] relative group overflow-hidden rounded-[2rem]">
                <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                   <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">{item.label}</p>
                   <p className="text-[#8b5e34] text-sm font-serif italic">The HCP Collection</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Dining */}
      <section id="location" className="py-32 px-6 bg-[#1c1917] text-[#fafaf9]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 italic">The Neighborhood</h2>
            <p className="text-[#a8a29e] font-light leading-relaxed">
              Nestled in the heart of Atlanta's historic charm. From high-end dining to direct airport access, your gateway to the city starts here.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dining.map((item, i) => (
              <div key={i} className="p-8 border border-[#44403c] rounded-3xl hover:border-[#8b5e34] transition-all group">
                <Coffee className="w-6 h-6 text-[#8b5e34] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                <p className="text-xs text-[#8b5e34] uppercase font-bold tracking-widest mb-4">{item.type}</p>
                <p className="text-sm text-[#a8a29e] font-light">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private and Secure - Exterior Cluster */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 space-y-8">
               <div className="inline-flex items-center space-x-2 text-[#8b5e34]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Peace of Mind</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-serif leading-tight">Private & <br />Secure Entrance</h2>
               <p className="text-[#57534e] text-lg leading-relaxed font-light">
                 Your stay features a private, smart-lock entry system. Enjoy the freedom of keyless access through our meticulously lighted paths and secure gate clusters.
               </p>
               <ul className="space-y-4">
                 {['24/7 Digital Check-in', 'Private Sifely Access', 'Midnight Path Lighting', 'Dual Keypad Security'].map((feat, i) => (
                   <li key={i} className="flex items-center space-x-3 text-sm font-bold uppercase tracking-tighter text-[#1c1917]">
                     <ArrowRight className="w-4 h-4 text-[#8b5e34]" />
                     <span>{feat}</span>
                   </li>
                 ))}
               </ul>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-end">
              <div className="grid grid-cols-2 gap-4 w-full">
                <img src={gate_night} alt="Secure Entry" className="w-full h-[300px] object-cover rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-500" />
                <img src={gal8} alt="Evening Safety" className="w-full h-[300px] object-cover rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-500" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[gal14, gal3, gal7, gal8, gal9, gal18].map((img, i) => (
               <div key={i} className="aspect-square overflow-hidden rounded-3xl shadow-lg">
                  <img src={img} alt="Exterior Perspective" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section id="amenities" className="py-32 px-6 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {amenities.map((item, i) => (
            <div key={i} className="p-12 border border-[#e7e5e4] rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-500">
               <div className="w-12 h-12 bg-[#8b5e34]/10 rounded-xl flex items-center justify-center text-[#8b5e34] mb-8">
                  {item.icon}
               </div>
               <h3 className="text-xl font-serif mb-4 italic leading-tight">{item.title}</h3>
               <p className="text-[#78716c] font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-white border-t border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-[#8b5e34]">HCP</span>
            <span className="text-2xl font-serif font-light tracking-[0.2em] uppercase">Cottage</span>
          </div>
          
          <div className="flex space-x-12">
            <a href="#" className="text-gray-400 hover:text-[#8b5e34] transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-[#8b5e34] transition-colors"><Heart className="w-6 h-6" /></a>
          </div>
          
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8a29e] mb-2">Designed for Escape</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1c1917]">© 2026 HCP Cottage • Managed by Joanne</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
