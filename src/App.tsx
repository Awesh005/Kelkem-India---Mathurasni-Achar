/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  Award,
  Leaf,
  Users,
  Utensils,
  Target,
  Rocket,
  ShieldCheck,
  Lightbulb,
  Heart,
  Handshake,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Company', id: 'company', dropdown: [
      { name: 'About Us', id: 'company' },
      { name: 'Founder Message', id: 'founder' }
    ]},
    { name: 'Products', id: 'products' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'company') {
      setCurrentPage('company');
      window.scrollTo(0, 0);
    } else if (id === 'founder') {
      setCurrentPage('founder');
      window.scrollTo(0, 0);
    } else if (id === 'products') {
      setCurrentPage('products');
      window.scrollTo(0, 0);
    } else if (id === 'gallery') {
      setCurrentPage('gallery');
      window.scrollTo(0, 0);
    } else if (id === 'contact') {
      setCurrentPage('contact');
      window.scrollTo(0, 0);
    } else {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsOpen(false);
    setIsCompanyOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled || currentPage !== 'home' ? 'bg-white/80 backdrop-blur-2xl shadow-sm py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
          <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500 border border-stone-100">
            <img src="/company logo.jpeg" alt="Kelkem Logo" className="w-full h-full object-contain p-1" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold leading-none tracking-tighter ${scrolled || currentPage !== 'home' ? 'text-spice-red' : 'text-white'}`}>Mathurasni</h1>
            <p className={`text-[10px] uppercase tracking-[0.3em] font-bold ${scrolled || currentPage !== 'home' ? 'text-mustard' : 'text-mustard/80'}`}>Achar & Spices</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group/nav"
              onMouseEnter={() => link.dropdown && setIsCompanyOpen(true)}
              onMouseLeave={() => link.dropdown && setIsCompanyOpen(false)}
            >
              <button 
                onClick={() => !link.dropdown && handleNavClick(link.id)}
                className={`font-semibold transition-all duration-300 text-[11px] uppercase tracking-[0.2em] flex items-center gap-1 group ${
                  (currentPage === link.id || (link.dropdown && link.dropdown.some(d => d.id === currentPage)))
                    ? 'text-spice-red' 
                    : (scrolled || currentPage !== 'home' ? 'text-stone-500 hover:text-spice-red' : 'text-white/80 hover:text-white')
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${isCompanyOpen ? 'rotate-180' : ''}`} />}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-spice-red transition-transform duration-300 origin-left ${(currentPage === link.id || (link.dropdown && link.dropdown.some(d => d.id === currentPage))) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>

              {link.dropdown && (
                <AnimatePresence>
                  {isCompanyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden py-2"
                    >
                      {link.dropdown.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavClick(subItem.id)}
                          className={`w-full text-left px-6 py-3 text-[11px] uppercase tracking-widest font-bold transition-all duration-300 hover:bg-stone-50 ${currentPage === subItem.id ? 'text-spice-red bg-stone-50' : 'text-stone-600 hover:text-spice-red'}`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <button className={`btn-primary ${scrolled || currentPage !== 'home' ? '' : 'shadow-2xl shadow-spice-red/40'}`}>Shop Now</button>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden p-2 rounded-xl transition-colors ${scrolled || currentPage !== 'home' ? 'text-stone-800 bg-stone-100' : 'text-white bg-white/10 backdrop-blur-md'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-stone-100 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      if (link.dropdown) {
                        setIsCompanyOpen(!isCompanyOpen);
                      } else {
                        handleNavClick(link.id);
                      }
                    }}
                    className={`text-left text-2xl font-serif font-bold transition-colors flex items-center justify-between ${
                      (currentPage === link.id || (link.dropdown && link.dropdown.some(d => d.id === currentPage))) ? 'text-spice-red' : 'text-stone-800'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={24} className={`transition-transform duration-300 ${isCompanyOpen ? 'rotate-180' : ''}`} />}
                  </button>
                  
                  {link.dropdown && isCompanyOpen && (
                    <div className="flex flex-col gap-4 pl-6 border-l-2 border-stone-100">
                      {link.dropdown.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavClick(subItem.id)}
                          className={`text-left text-lg font-serif font-medium transition-colors ${currentPage === subItem.id ? 'text-spice-red' : 'text-stone-500'}`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button className="btn-primary w-full py-5">Shop Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-stone-900">
      {/* Background with parallax-like effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000" 
          alt="Indian Spices and Pickles" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent"></div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-56 pb-20 md:pt-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 py-2 px-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
              <span className="w-2 h-2 bg-mustard rounded-full animate-pulse"></span>
              Kelkem India Pvt Ltd
            </span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] text-white">
              Taste the <span className="text-mustard italic font-serif font-medium">Soul</span> of India.
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 mb-12 leading-relaxed font-light max-w-xl">
              Handcrafted pickles and stone-ground spices that bring the authentic heritage of Indian kitchens to your table.
            </p>
            <div className="flex flex-wrap gap-6">
              <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary flex items-center gap-3 shadow-2xl shadow-spice-red/30">
                Explore Collection <ChevronRight size={18} />
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-stone-900 transition-all duration-500 uppercase tracking-widest text-xs shadow-xl">
                Get in Touch
              </button>
            </div>
            
            {/* Product Logo Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-16 flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl w-fit"
            >
              <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shadow-lg border border-white/20">
                <img src="/product logo.jpeg" alt="Product Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <p className="text-white font-bold text-sm uppercase tracking-widest">Premium Quality</p>
                <p className="text-mustard text-[10px] uppercase tracking-[0.2em] font-bold">Mathurasni Certified</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-mustard to-transparent"></div>
      </motion.div>
    </section>
  );
};

const CompanyPage = () => {
  const coreValues = [
    { icon: <ShieldCheck className="text-spice-red" />, title: "Quality", desc: "Uncompromising standards in every product we manufacture." },
    { icon: <Handshake className="text-spice-red" />, title: "Integrity", desc: "Honesty and transparency in all our business dealings." },
    { icon: <Lightbulb className="text-spice-red" />, title: "Innovation", desc: "Continuously evolving our processes and product range." },
    { icon: <Heart className="text-spice-red" />, title: "Customer Satisfaction", desc: "Our ultimate goal is to bring joy to every household." },
    { icon: <Users className="text-spice-red" />, title: "Trust", desc: "Building long-lasting relationships with our consumers." },
  ];

  const missionPoints = [
    "Provide high-quality and hygienically prepared food products.",
    "Preserve and promote traditional Indian recipes and flavors.",
    "Build a strong distribution network across India.",
    "Ensure customer satisfaction through quality, innovation, and trust."
  ];

  return (
    <div className="pt-24">
      {/* Page Header */}
      <section className="bg-stone-900 py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/legacy .png" 
            className="w-full h-full object-cover"
            alt="Legacy Background"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <span className="text-mustard font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Our Legacy</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">Our Company</h1>
          <p className="text-stone-400 text-lg uppercase tracking-[0.3em] font-light">Kelkem India Pvt Ltd</p>
        </motion.div>
      </section>

    {/* About Us Section */}
<section className="section-padding bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-mustard font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
          About Us
        </span>

        <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-10 text-stone-900 leading-[1.1]">
          Authentic Taste, <br/>
          <span className="text-spice-red italic font-serif font-medium">
            Modern
          </span> Standards.
        </h2>

        <div className="space-y-8 text-stone-600 leading-relaxed text-lg font-light">
          <p>
            Kelkem India Private Limited is an emerging Indian company engaged in the manufacturing, marketing, and distribution of quality food products, pickles, spices, and FMCG goods.
          </p>
          <p>
            The company focuses on delivering traditional Indian flavors with modern quality standards, hygienic production, and reliable distribution.
          </p>
          <p>
            Headquartered in Ranchi, Jharkhand, Kelkem India Pvt Ltd aims to build trusted consumer brands that bring authentic taste, purity, and quality to every household.
          </p>
        </div>

        {/* Brand Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-10 bg-warm-bg rounded-[2rem] border-l-8 border-spice-red shadow-sm"
        >
          <h4 className="text-spice-red font-bold mb-4 uppercase tracking-[0.2em] text-xs">
            Brand Highlight
          </h4>

          <p className="text-stone-800 font-serif text-2xl italic leading-relaxed">
            "Mathurasni Achar represents traditional homemade taste prepared with carefully selected ingredients and pure mustard oil."
          </p>
        </motion.div>
      </motion.div>

      {/* IMAGE SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-white p-4">
          <img
            src="/imageabout.jpg"
            alt="Kelkem India Production"
            className="w-full h-auto hover:scale-105 transition-transform duration-1000"
          />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
          className="absolute -bottom-10 -left-10 bg-mustard p-10 rounded-[2rem] text-white shadow-2xl"
        >
          <Award size={48} />
          <p className="mt-4 font-bold text-xl uppercase tracking-widest">
            Quality <br/> Certified
          </p>
        </motion.div>
      </motion.div>

    </div>
  </div>
</section>

      {/* Vision & Mission */}
      <section className="section-padding bg-warm-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-spice-red/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Vision */}
            <motion.div 
              whileHover={{ y: -15 }}
              className="bg-white p-16 rounded-[3rem] shadow-xl border border-stone-100 transition-all duration-500"
            >
              <div className="w-20 h-20 bg-mustard/10 rounded-2xl flex items-center justify-center text-mustard mb-10 shadow-inner">
                <Rocket size={40} />
              </div>
              <h3 className="text-4xl font-bold mb-8 text-stone-900">Our Vision</h3>
              <p className="text-stone-600 text-xl leading-relaxed font-light">
                To establish Kelkem India Pvt Ltd as a trusted and leading Indian FMCG company delivering high-quality food products and traditional flavors across India and international markets.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
              whileHover={{ y: -15 }}
              className="bg-white p-16 rounded-[3rem] shadow-xl border border-stone-100 transition-all duration-500"
            >
              <div className="w-20 h-20 bg-spice-red/10 rounded-2xl flex items-center justify-center text-spice-red mb-10 shadow-inner">
                <Target size={40} />
              </div>
              <h3 className="text-4xl font-bold mb-8 text-stone-900">Our Mission</h3>
              <ul className="space-y-6">
                {missionPoints.map((point, i) => (
                  <li key={i} className="flex gap-4 text-stone-600 text-lg font-light">
                    <CheckCircle2 className="text-spice-red shrink-0 mt-1" size={24} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-mustard font-bold uppercase tracking-[0.3em] text-xs mb-6 block">The Foundation</span>
            <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-20 text-stone-900">Our Core Values</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2rem] bg-warm-bg border border-stone-100 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:bg-spice-red group-hover:text-white transition-colors duration-500">
                  {React.cloneElement(value.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="font-bold text-stone-900 mb-4 text-xl">{value.title}</h4>
                <p className="text-sm text-stone-500 leading-relaxed font-light">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductsPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const products = [
    {
      id: 1,
      name: "Mathurasni Hara Mirch Ka Achar",
      category: "Pickles",
      desc: "Authentic Indian green chilli pickle prepared with fresh handpicked chillies, traditional spices, and pure mustard oil. It delivers a perfect balance of spicy flavor and homemade taste, making every meal more delicious.",
      image: "/16.jpeg"
    },
    {
      id: 2,
      name: "Mathurasni Rice Papad",
      category: "Papads",
      desc: "Crispy and light rice papads made with quality ingredients and traditional preparation methods. Perfect as a crunchy side dish with everyday Indian meals.",
      image: "/15.jpeg"
    },
    {
      id: 3,
      name: "Mathurasni Moong Dal Papad",
      category: "Papads",
      desc: "Delicious papads made from premium moong dal, offering a rich taste and perfect crispiness that enhances every meal.",
      image: "/15.jpeg"
    },
    {
      id: 4,
      name: "Mathurasni Punjabi Papad",
      category: "Papads",
      desc: "Authentic Punjabi-style papads packed with bold spices and traditional flavors, delivering a crunchy and flavorful experience.",
      image: "/15.jpeg"
    },
    {
      id: 5,
      name: "Mathurasni Chana Papad",
      category: "Papads",
      desc: "Tasty papads prepared from high-quality chana dal, providing a unique flavor and satisfying crunch.",
      image: "/15.jpeg"
    },
    {
      id: 6,
      name: "Mathurasni Urad Papad",
      category: "Papads",
      desc: "Classic urad dal papads crafted using traditional recipes, known for their rich taste and crispy texture.",
      image: "/15.jpeg"
    },
    {
      id: 7,
      name: "Mathurasni Aloo Papad",
      category: "Papads",
      desc: "Crispy potato papads made from carefully selected potatoes and spices, offering a delicious and crunchy snack option.",
      image: "/15.jpeg"
    },
    {
      id: 8,
      name: "Mathurasni Nimbu Ka Achar (Lemon Pickle)",
      category: "Pickles",
      desc: "Traditional Indian lemon pickle made with fresh, juicy lemons, aromatic spices, and pure mustard oil. It delivers a tangy, spicy, and authentic homemade flavor that perfectly complements everyday meals like dal, rice, and parathas.",
      image: "/14.jpeg"
    },
    {
      id: 9,
      name: "Mathurasni Kathal Ka Achar (Jackfruit Pickle)",
      category: "Pickles",
      desc: "Traditional jackfruit pickle prepared with tender kathal pieces, authentic Indian spices, and pure mustard oil. It offers a rich, spicy, and flavorful taste that adds a delicious traditional touch to every meal.",
      image: "/13.jpeg"
    },
    {
      id: 10,
      name: "Mathurasni Haldi Ka Achar (Turmeric Pickle)",
      category: "Pickles",
      desc: "A traditional pickle made from fresh turmeric roots blended with aromatic Indian spices and pure mustard oil. It offers a unique earthy flavor with a perfect balance of spice and tanginess, bringing authentic homemade taste to every meal.",
      image: "/12.jpeg"
    },
    {
      id: 11,
      name: "Mathurasni Pyaz Ka Achar (Onion Pickle)",
      category: "Pickles",
      desc: "A flavorful onion pickle prepared with fresh onions, traditional Indian spices, and pure mustard oil. It offers a tangy, spicy taste that perfectly complements Indian meals and adds a delicious homemade flavor to every bite.",
      image: "/11.jpeg"
    },
    {
      id: 12,
      name: "Mathurasni Lahsun Ka Achar (Garlic Pickle)",
      category: "Pickles",
      desc: "A rich and flavorful garlic pickle made with fresh garlic cloves, traditional Indian spices, and pure mustard oil. Its bold, tangy, and spicy taste adds a delicious punch to everyday meals like dal, rice, paratha, and roti.",
      image: "/10.jpeg"
    },
    {
      id: 13,
      name: "Mathurasni Aam Ka Achar (Mango Pickle)",
      category: "Pickles",
      desc: "A classic Indian mango pickle made from fresh raw mangoes, blended with traditional spices and pure mustard oil. Its rich, tangy, and spicy flavor adds the perfect homemade taste to every meal.",
      image: "/9.jpeg"
    },
    {
      id: 14,
      name: "Mathurasni Lal Mirch Bharwa Achar (Stuffed Red Chilli Pickle)",
      category: "Pickles",
      desc: "A traditional stuffed red chilli pickle made with carefully selected whole red chillies filled with aromatic Indian spices and preserved in pure mustard oil. It offers a bold, spicy, and flavorful taste that perfectly enhances any Indian meal.",
      image: "/8.jpeg"
    },
    {
      id: 15,
      name: "Mathurasni Ol Ka Achar (Elephant Foot Yam Pickle)",
      category: "Pickles",
      desc: "A traditional pickle made from fresh elephant foot yam (Ol), blended with aromatic Indian spices and pure mustard oil. It offers a rich, spicy, and tangy flavor that brings an authentic homemade taste to every meal.",
      image: "/7.jpeg"
    },
    {
      id: 16,
      name: "Mathurasni Jeevanprash",
      category: "Wellness",
      desc: "A nutritious Ayurvedic energy supplement made with natural ingredients, jaggery (gud), and herbal extracts. It helps boost energy, support immunity, and promote overall wellness while offering a rich traditional taste.",
      image: "/6.jpeg"
    },
    {
      id: 17,
      name: "Royal Oudh Premium Attar",
      category: "Fragrances",
      desc: "A luxurious and long-lasting fragrance crafted from rich oud essence, offering a deep, royal aroma that reflects elegance and tradition. Perfect for special occasions and everyday premium use.",
      image: "/5.jpeg"
    },
    {
      id: 18,
      name: "Derza White Rose Attar (6 ML)",
      category: "Fragrances",
      desc: "A delicate and refreshing fragrance inspired by the natural aroma of fresh white roses. This elegant attar offers a soft, floral scent that is perfect for daily wear and special occasions",
      image: "/4.jpeg"
    },
    {
      id: 19,
      name: "White Rose (Attar)",
      category: "Fragrances",
      desc: "A delicate and refreshing fragrance inspired by the natural aroma of fresh white roses.",
      image: "/2.jpeg"
    },
    {
      id: 20,
      name: "Saffron Sultan (Fragrance)",
      category: "Fragrances",
      desc: "A rich and exotic fragrance featuring the luxurious scent of saffron.",
      image: "/2.jpeg"
    },
    {
      id: 21,
      name: "Amber Al Noor (Attar Fragrance)",
      category: "Fragrances",
      desc: "A warm and inviting amber fragrance with traditional roots.",
      image: "/2.jpeg"
    },
    {
      id: 22,
      name: "Black Musk (Aggressive)",
      category: "Fragrances",
      desc: "A bold and intense musk fragrance for a strong presence.",
      image: "/2.jpeg"
    },
    {
      id: 23,
      name: "Black Musk – Desert",
      category: "Fragrances",
      desc: "A mysterious and earthy musk fragrance inspired by the desert.",
      image: "/2.jpeg"
    },
    {
      id: 24,
      name: "Sultan Al Noor (Mast Perfume)",
      category: "Fragrances",
      desc: "A regal and uplifting perfume that captures the essence of royalty.",
      image: "/2.jpeg"
    },
    {
      id: 25,
      name: "Royal Oudh (Attar)",
      category: "Fragrances",
      desc: "A classic and sophisticated oud attar for the discerning user.",
      image: "/2.jpeg"
    }
  ];

  const categories = ["All", "Pickles", "Papads", "Wellness", "Fragrances"];
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All" ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="pt-24 bg-warm-bg min-h-screen">
      {/* Header */}
      <section className="bg-stone-900 py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1664791461482-79f5deee490f?q=80&w=1153&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="w-full h-full object-cover"
            alt="Pickles Background"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <span className="text-mustard font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Our Collection</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">Our Products</h1>
          <p className="text-stone-400 text-lg uppercase tracking-[0.3em] font-light">Mathurasni Achar & Spices</p>
        </motion.div>
      </section>

      {/* Product Filter & Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-6 mb-20 overflow-x-auto pb-6 no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-12 py-4 rounded-full font-bold transition-all whitespace-nowrap uppercase tracking-widest text-xs ${
                  activeTab === cat 
                  ? 'bg-spice-red text-white shadow-2xl scale-105' 
                  : 'bg-white text-stone-500 hover:bg-stone-50 border border-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                  onClick={() => setSelectedImage(product.image)}
                  className="fmcg-card group cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 bg-mustard text-white px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-3xl font-bold text-stone-900 mb-4 group-hover:text-spice-red transition-colors">{product.name}</h3>
                    <p className="text-stone-500 text-base leading-relaxed mb-8 font-light">
                      {product.desc}
                    </p>
                    <div className="flex flex-col gap-4 pt-8 border-t border-stone-50">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const message = `Hello, I would like to enquire about this product: ${product.name}`;
                          window.open(`https://wa.me/917544866033?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-spice-red transition-all duration-500 shadow-lg shadow-stone-900/10 hover:shadow-spice-red/20 text-sm uppercase tracking-widest"
                      >
                        Enquiry Now
                      </button>
                      <button className="text-spice-red font-bold flex items-center justify-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-[10px]">
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mustard/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <motion.div 
              whileHover={{ y: -10 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-mustard/20 rounded-3xl flex items-center justify-center text-mustard mx-auto mb-8 shadow-inner">
                <Leaf size={40} />
              </div>
              <h4 className="text-2xl font-bold">100% Natural</h4>
              <p className="text-stone-400 text-base font-light leading-relaxed">No artificial colors or chemical preservatives used in our products. Pure as nature intended.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-spice-red/20 rounded-3xl flex items-center justify-center text-spice-red mx-auto mb-8 shadow-inner">
                <Award size={40} />
              </div>
              <h4 className="text-2xl font-bold">Premium Quality</h4>
              <p className="text-stone-400 text-base font-light leading-relaxed">Hand-picked ingredients sourced directly from the finest farms across India's spice heartlands.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-inner">
                <Users size={40} />
              </div>
              <h4 className="text-2xl font-bold">Trusted Heritage</h4>
              <p className="text-stone-400 text-base font-light leading-relaxed">Delivering authentic Indian taste to thousands of households, preserving recipes for generations.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-0 md:-right-16 text-white hover:text-mustard transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md"
              >
                <X size={32} />
              </button>
              <img 
                src={selectedImage} 
                alt="Product Enlarged" 
                className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GalleryPage = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    { url: "/16.jpeg", title: "Mathurasni Hara Mirch Ka Achar", category: "Pickles" },
    { url: "/15.jpeg", title: "Mathurasni Papad Range", category: "Papads" },
    { url: "/14.jpeg", title: "Mathurasni Nimbu Ka Achar", category: "Pickles" },
    { url: "/13.jpeg", title: "Mathurasni Kathal Ka Achar", category: "Pickles" },
    { url: "/12.jpeg", title: "Mathurasni Haldi Ka Achar", category: "Pickles" },
    { url: "/11.jpeg", title: "Mathurasni Pyaz Ka Achar", category: "Pickles" },
    { url: "/10.jpeg", title: "Mathurasni Lahsun Ka Achar", category: "Pickles" },
    { url: "/9.jpeg", title: "Mathurasni Aam Ka Achar", category: "Pickles" },
    { url: "/8.jpeg", title: "Mathurasni Lal Mirch Bharwa Achar", category: "Pickles" },
    { url: "/7.jpeg", title: "Mathurasni Ol Ka Achar", category: "Pickles" },
    { url: "/6.jpeg", title: "Mathurasni Jeevanprash", category: "Wellness" },
    { url: "/5.jpeg", title: "Royal Oudh Premium Attar", category: "Fragrances" },
    { url: "/4.jpeg", title: "Derza White Rose Attar", category: "Fragrances" },
    { url: "/2.jpeg", title: "Premium Fragrance Collection", category: "Fragrances" },
  ];

  return (
    <div className="pt-24 bg-warm-bg min-h-screen">
      {/* Header */}
      <section className="bg-stone-900 py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <span className="text-mustard font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Visual Journey</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">Our Gallery</h1>
          <p className="text-stone-400 text-lg uppercase tracking-[0.3em] font-light">Capturing the Essence of Tradition</p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedImg(img.url)}
                className="relative rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-xl break-inside-avoid border border-stone-100"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <span className="text-mustard text-[10px] font-bold uppercase tracking-widest mb-2">{img.category}</span>
                  <h3 className="text-white font-bold text-2xl">{img.title}</h3>
                  <div className="w-12 h-1 bg-mustard mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button 
              className="absolute top-10 right-10 text-white hover:text-mustard transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X size={48} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImg} 
              alt="Enlarged view" 
              className="max-w-full max-h-[85vh] rounded-[2rem] shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FounderMessagePage = () => {
  return (
    <div className="pt-24 bg-warm-bg min-h-screen">
      {/* Page Header */}
      <section className="bg-stone-900 py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Founder Background"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <span className="text-mustard font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Leadership</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">Founders' Message</h1>
          <p className="text-stone-400 text-lg uppercase tracking-[0.3em] font-light">A Vision for Authentic Taste</p>
        </motion.div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-white p-4">
                  <img 
                    src="./boy.png" 
                    alt="KAPIL PRASAD" 
                    className="w-full h-auto rounded-[2.5rem]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-spice-red p-6 rounded-[1.5rem] text-white shadow-2xl z-10">
                  <h4 className="font-bold text-lg">KAPIL PRASAD</h4>
                  <p className="text-white/80 uppercase tracking-widest text-[10px] mt-1">Founder</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-white p-4">
                  <img 
                    src="./girl.png" 
                    alt="Meghna Bharti" 
                    className="w-full h-auto rounded-[2.5rem]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-mustard p-6 rounded-[1.5rem] text-white shadow-2xl z-10">
                  <h4 className="font-bold text-lg">Meghna Bharti</h4>
                  <p className="text-white/80 uppercase tracking-widest text-[10px] mt-1">Founder</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
                "Our journey is rooted in the belief that <span className="text-spice-red">quality</span> and <span className="text-mustard">tradition</span> should never be compromised."
              </h2>
              <div className="space-y-6 text-stone-600 text-lg font-light leading-relaxed">
                <p>
                  Welcome to Kelkem India Pvt Ltd. Our story began with a simple yet powerful vision: to bring the authentic, homemade taste of Indian pickles and spices to every dining table across the country.
                </p>
                <p>
                  At Mathurasni, we understand that food is more than just sustenance; it's a connection to our heritage, our culture, and our memories. That's why we use only the finest ingredients, traditional recipes passed down through generations, and pure mustard oil to create products that resonate with the soul of India.
                </p>
                <p>
                  As we grow, our commitment to quality, hygiene, and customer trust remains unwavering. We are constantly innovating to meet modern standards while staying true to our roots.
                </p>
                <p>
                  Thank you for being a part of our journey. We promise to continue delivering the purity and taste that you and your family deserve.
                </p>
              </div>
              <div className="pt-8 border-t border-stone-100 flex flex-col gap-2">
                <div>
                  <p className="font-bold text-stone-900">KAPIL PRASAD & Meghna Bharti</p>
                  <p className="text-stone-400 text-sm">Founders, Kelkem India Pvt Ltd</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-24 bg-warm-bg min-h-screen">
      {/* Header */}
      <section className="bg-stone-900 py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <span className="text-mustard font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Get in Touch</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">Contact Us</h1>
          <p className="text-stone-400 text-lg uppercase tracking-[0.3em] font-light">We'd Love to Hear from You</p>
        </motion.div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border border-stone-100"
            >
              <h2 className="text-4xl font-bold text-stone-900 mb-10">Send a Message</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-8 py-5 bg-warm-bg rounded-2xl border border-stone-100 focus:outline-none focus:ring-2 focus:ring-spice-red/20 focus:border-spice-red transition-all font-light"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full px-8 py-5 bg-warm-bg rounded-2xl border border-stone-100 focus:outline-none focus:ring-2 focus:ring-spice-red/20 focus:border-spice-red transition-all font-light"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="w-full px-8 py-5 bg-warm-bg rounded-2xl border border-stone-100 focus:outline-none focus:ring-2 focus:ring-spice-red/20 focus:border-spice-red transition-all font-light"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-2">Your Message</label>
                  <textarea 
                    placeholder="How can we help you?" 
                    rows={5} 
                    className="w-full px-8 py-5 bg-warm-bg rounded-2xl border border-stone-100 focus:outline-none focus:ring-2 focus:ring-spice-red/20 focus:border-spice-red transition-all font-light"
                  ></textarea>
                </div>
                <button className="w-full bg-spice-red text-white py-6 rounded-2xl font-bold hover:bg-mustard transition-all duration-500 shadow-xl hover:-translate-y-1 uppercase tracking-[0.2em] text-xs">
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-white rounded-[2.5rem] shadow-xl border border-stone-100 group hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 bg-spice-red/10 rounded-2xl flex items-center justify-center text-spice-red mb-6 group-hover:bg-spice-red group-hover:text-white transition-colors">
                    <MapPin size={28} />
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2 text-xl">Our Office</h3>
                  <p className="text-stone-500 font-light leading-relaxed">Paryavaran Nagar, Hehal<br/>Ranchi 834005, Jharkhand, India</p>
                </div>
                <div className="p-10 bg-white rounded-[2.5rem] shadow-xl border border-stone-100 group hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 bg-mustard/10 rounded-2xl flex items-center justify-center text-mustard mb-6 group-hover:bg-mustard group-hover:text-white transition-colors">
                    <Phone size={28} />
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2 text-xl">Call Us</h3>
                  <p className="text-stone-500 font-light leading-relaxed">07544866033<br/>Mon - Sat, 9am - 6pm</p>
                </div>
              </div>

              {/* Map Section */}
              <div className="aspect-video bg-stone-200 rounded-[3rem] overflow-hidden shadow-2xl relative group border border-stone-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.623145455431!2d85.2796193!3d23.3656111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1001a938e3b%3A0x6d9a8e3b1a938e3b!2sKelkem%20India%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-1000"
                ></iframe>
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h4 className="font-bold text-lg mb-1 text-stone-900">Kelkem India Pvt Ltd</h4>
                  <p className="text-stone-500 text-xs mb-4">Paryavaran Nagar, Hehal, Ranchi</p>
                  <a 
                    href="https://share.google/GGil8oHAfImVTtJ3o" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-spice-red font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all"
                  >
                    Get Directions <ChevronRight size={14} />
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-12 bg-stone-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div>
                  <h4 className="text-2xl font-bold mb-2">Follow our journey</h4>
                  <p className="text-stone-400 font-light">Get the latest updates and recipes</p>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-mustard transition-all duration-500 hover:-translate-y-1">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-spice-red transition-all duration-500 hover:-translate-y-1">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-blue-500 transition-all duration-500 hover:-translate-y-1">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const InstagramSection = () => {
  const posts = [
    "/16.jpeg",
    "/17.jpeg",
    "/18.jpeg",
    "/19.jpeg",
    "/20.jpeg",
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-mustard font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Social Community</span>
          <h2 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4">Join the <span className="text-spice-red italic font-serif font-medium">Flavor</span> Family</h2>
          <p className="text-stone-500 font-light text-lg">Follow us for daily inspiration and traditional recipes</p>
          <a 
            href="https://www.instagram.com/achar_by_mathurasin?igsh=aWZ2YnFhcGpzZzFw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-stone-900 font-bold hover:text-spice-red transition-colors group"
          >
            @achar_by_mathurasin <Instagram size={20} className="group-hover:rotate-12 transition-transform" />
          </a>
        </motion.div>
      </div>
      
      <div className="relative">
        <div className="flex gap-6 animate-marquee whitespace-nowrap py-10">
          {[...posts, ...posts, ...posts].map((img, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10, scale: 1.05 }}
              className="w-72 h-72 shrink-0 rounded-[2rem] overflow-hidden group relative shadow-xl border border-stone-100"
            >
              <img 
                src={img} 
                alt="Instagram Post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                  <Instagram size={28} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
};

const ContactCTA = () => {
  return (
    <section className="py-32 bg-spice-red text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mustard/10 rounded-full blur-3xl -mr-48 -mb-48"></div>

      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-mustard font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Experience the Heritage</span>
          <h2 className="text-5xl md:text-8xl font-bold mb-10 leading-[0.9]">Ready to Taste <br/><span className="text-mustard italic font-serif font-medium">Tradition?</span></h2>
          <p className="text-xl md:text-2xl text-white/70 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you're looking for bulk orders, distributorship, or just want to share your love for pickles, we're here to connect.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-spice-red px-12 py-5 rounded-full font-bold hover:bg-mustard hover:text-white transition-all duration-500 shadow-2xl hover:-translate-y-1 uppercase tracking-widest text-xs"
            >
              Get in Touch
            </button>
            <a 
              href="tel:+919876543210" 
              className="bg-white/5 backdrop-blur-xl border border-white/20 px-12 py-5 rounded-full font-bold hover:bg-white/10 transition-all duration-500 flex items-center gap-3 uppercase tracking-widest text-xs"
            >
              <Phone size={18} /> Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Company = () => {
  return (
    <section id="company" className="section-padding bg-warm-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="/legacy .png" 
                alt="Traditional Indian Cooking" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2rem] shadow-2xl hidden md:block max-w-xs border border-stone-100"
            >
              <h3 className="text-spice-red font-serif text-4xl mb-3">25+ Years</h3>
              <p className="text-stone-600 text-sm leading-relaxed">Of preserving the authentic flavors and heritage of Indian households.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-mustard font-bold uppercase tracking-[0.3em] text-xs mb-6 block">About Kelkem India</span>
            <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-10 text-stone-900 leading-[1.1]">Legacy of Taste, <br/><span className="text-spice-red italic font-serif font-medium">Promise</span> of Quality.</h2>
            <p className="text-stone-600 mb-8 text-lg leading-relaxed font-light">
              Kelkem India Pvt Ltd is a pioneer in the FMCG sector, dedicated to bringing the authentic taste of India to global kitchens. Our flagship brand, <strong className="text-stone-900">Mathurasni Achar</strong>, is more than just a pickle; it's a journey through the vibrant spice markets and traditional kitchens of India.
            </p>
            <p className="text-stone-600 mb-12 text-lg leading-relaxed font-light">
              We believe in the purity of ingredients. Every jar of Mathurasni Achar is packed with hand-picked vegetables, cold-pressed oils, and spices that are ground in-house to ensure the highest standards of hygiene and flavor.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-mustard/10 rounded-2xl flex items-center justify-center text-mustard shrink-0 shadow-sm">
                  <Leaf size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-lg mb-1">Pure Ingredients</h4>
                  <p className="text-sm text-stone-500">No artificial preservatives or colors.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-spice-red/10 rounded-2xl flex items-center justify-center text-spice-red shrink-0 shadow-sm">
                  <Utensils size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-lg mb-1">Traditional Recipes</h4>
                  <p className="text-sm text-stone-500">Passed down through generations.</p>
                </div>
              </div>
            </div>

            <button className="btn-primary mt-16">Discover Our Story</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const categories = ["All", "Pickles", "Papads", "Wellness", "Fragrances"];
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const products = [
    {
      id: 1,
      name: "Mathurasni Hara Mirch Ka Achar",
      category: "Pickles",
      price: "₹149",
      image: "/16.jpeg"
    },
    {
      id: 2,
      name: "Mathurasni Rice Papad",
      category: "Papads",
      price: "₹99",
      image: "/15.jpeg"
    },
    {
      id: 3,
      name: "Mathurasni Moong Dal Papad",
      category: "Papads",
      price: "₹99",
      image: "/15.jpeg"
    },
    {
      id: 4,
      name: "Mathurasni Punjabi Papad",
      category: "Papads",
      price: "₹99",
      image: "/15.jpeg"
    },
    {
      id: 5,
      name: "Mathurasni Chana Papad",
      category: "Papads",
      price: "₹99",
      image: "/15.jpeg"
    },
    {
      id: 6,
      name: "Mathurasni Urad Papad",
      category: "Papads",
      price: "₹99",
      image: "/15.jpeg"
    },
    {
      id: 7,
      name: "Mathurasni Aloo Papad",
      category: "Papads",
      price: "₹99",
      image: "/15.jpeg"
    },
    {
      id: 8,
      name: "Mathurasni Nimbu Ka Achar",
      category: "Pickles",
      price: "₹149",
      image: "/14.jpeg"
    },
    {
      id: 9,
      name: "Mathurasni Kathal Ka Achar",
      category: "Pickles",
      price: "₹159",
      image: "/13.jpeg"
    },
    {
      id: 10,
      name: "Mathurasni Haldi Ka Achar",
      category: "Pickles",
      price: "₹169",
      image: "/12.jpeg"
    },
    {
      id: 11,
      name: "Mathurasni Pyaz Ka Achar",
      category: "Pickles",
      price: "₹139",
      image: "/11.jpeg"
    },
    {
      id: 12,
      name: "Mathurasni Lahsun Ka Achar",
      category: "Pickles",
      price: "₹179",
      image: "/10.jpeg"
    },
    {
      id: 13,
      name: "Mathurasni Aam Ka Achar",
      category: "Pickles",
      price: "₹149",
      image: "/9.jpeg"
    },
    {
      id: 14,
      name: "Mathurasni Lal Mirch Bharwa Achar",
      category: "Pickles",
      price: "₹189",
      image: "/8.jpeg"
    },
    {
      id: 15,
      name: "Mathurasni Ol Ka Achar",
      category: "Pickles",
      price: "₹159",
      image: "/7.jpeg"
    },
    {
      id: 16,
      name: "Mathurasni Jeevanprash",
      category: "Wellness",
      price: "₹299",
      image: "/6.jpeg"
    },
    {
      id: 17,
      name: "Royal Oudh Premium Attar",
      category: "Fragrances",
      price: "₹499",
      image: "/5.jpeg"
    },
    {
      id: 18,
      name: "Derza White Rose Attar",
      category: "Fragrances",
      price: "₹399",
      image: "/4.jpeg"
    },
    {
      id: 19,
      name: "White Rose (Attar)",
      category: "Fragrances",
      price: "₹349",
      image: "/2.jpeg"
    }
  ];

  const filteredProducts = activeTab === "All" ? products : products.filter(p => p.category === activeTab);

  return (
    <section id="products" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-mustard font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Our Collection</span>
          <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-16 text-stone-900">Flavors for Every Palate</h2>
        </motion.div>
        
        <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-10 py-3 rounded-full font-bold transition-all whitespace-nowrap text-xs uppercase tracking-widest ${
                activeTab === cat 
                ? 'bg-spice-red text-white shadow-xl scale-105' 
                : 'bg-stone-50 text-stone-500 hover:bg-stone-100 border border-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                onClick={() => setSelectedImage(product.image)}
                className="fmcg-card group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-spice-red font-bold text-lg shadow-sm">
                    {product.price}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Quick View</button>
                  </div>
                </div>
                <div className="p-10 text-left">
                  <p className="text-mustard text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{product.category}</p>
                  <h3 className="text-2xl font-bold text-stone-900 mb-6 group-hover:text-spice-red transition-colors">{product.name}</h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const message = `Hello, I would like to enquire about this product: ${product.name}`;
                      window.open(`https://wa.me/917544866033?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-spice-red transition-all duration-500 shadow-lg shadow-stone-900/10 hover:shadow-spice-red/20"
                  >
                    Enquiry Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-16 right-0 md:-right-16 text-white hover:text-mustard transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md"
                >
                  <X size={32} />
                </button>
                <img 
                  src={selectedImage} 
                  alt="Product Enlarged" 
                  className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <button className="btn-secondary">View All Products</button>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "/16.jpeg",
    "/15.jpeg",
    "/14.jpeg",
    "/13.jpeg",
    "/12.jpeg",
    "/11.jpeg",
  ];

  return (
    <section id="gallery" className="section-padding bg-stone-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-mustard font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Visual Journey</span>
            <h2 className="text-5xl md:text-7xl font-bold mt-4 leading-[1.1]">Capturing the <span className="text-mustard italic font-serif font-medium">Essence</span> of Mathurasni</h2>
          </motion.div>
          <motion.button 
            whileHover={{ x: 10 }}
            className="text-mustard border-b-2 border-mustard/30 pb-2 hover:text-white hover:border-white transition-all font-bold uppercase tracking-widest text-xs"
          >
            View All Photos
          </motion.button>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <p className="text-white font-serif italic text-xl">Authentic Indian Heritage</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-warm-bg">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-stone-100">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-20"
          >
            <span className="text-mustard font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Get in Touch</span>
            <h2 className="text-5xl font-bold text-stone-900 mb-10 leading-tight">We'd love to <br/>hear from you.</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-spice-red/10 focus:border-spice-red transition-all duration-300 placeholder:text-stone-300" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-spice-red/10 focus:border-spice-red transition-all duration-300 placeholder:text-stone-300" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Subject</label>
                <select className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-spice-red/10 focus:border-spice-red transition-all duration-300 appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Bulk Orders</option>
                  <option>Distributorship</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Message</label>
                <textarea rows={5} className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-spice-red/10 focus:border-spice-red transition-all duration-300 placeholder:text-stone-300" placeholder="How can we help you?"></textarea>
              </div>
              <button className="btn-primary w-full py-5 text-sm">Send Message</button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-stone-900 p-12 md:p-20 text-white flex flex-col justify-between relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-spice-red/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-mustard/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-12">Contact Information</h3>
              <div className="space-y-10">
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-spice-red group-hover:border-spice-red transition-all duration-500">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Our Office</h4>
                    <p className="text-stone-400 leading-relaxed mb-2">Paryavaran Nagar, Hehal, Ranchi 834005, Jharkhand, India</p>
                    <a 
                      href="https://share.google/GGil8oHAfImVTtJ3o" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-mustard text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                    >
                      View on Google Maps <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-mustard group-hover:border-mustard transition-all duration-500">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Phone Number</h4>
                    <p className="text-stone-400 leading-relaxed">07544866033</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-spice-red group-hover:border-spice-red transition-all duration-500">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Email Address</h4>
                    <p className="text-stone-400 leading-relaxed">info@kelkemindia.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 relative z-10">
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-stone-500">Follow Our Journey</h4>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-spice-red transition-all duration-500 border border-white/10"><Facebook size={22} /></a>
                <a href="https://www.instagram.com/achar_by_mathurasin?igsh=aWZ2YnFhcGpzZzFw" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-spice-red transition-all duration-500 border border-white/10"><Instagram size={22} /></a>
                <a href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-spice-red transition-all duration-500 border border-white/10"><Twitter size={22} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-mustard font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Find Us</span>
          <h2 className="text-5xl font-bold text-stone-900">Our Location</h2>
        </motion.div>
        
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-stone-100 h-[500px] relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.623145455431!2d85.2796193!3d23.3656111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1001a938e3b%3A0x6d9a8e3b1a938e3b!2sKelkem%20India%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          <div className="absolute bottom-10 left-10 right-10 md:right-auto bg-white p-8 rounded-3xl shadow-2xl border border-stone-100 max-w-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h4 className="font-bold text-xl mb-2 text-stone-900">Kelkem India Pvt Ltd</h4>
            <p className="text-stone-500 text-sm mb-6">Paryavaran Nagar, Hehal, Ranchi 834005, Jharkhand, India</p>
            <a 
              href="https://share.google/GGil8oHAfImVTtJ3o" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-spice-red font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all"
            >
              Get Directions <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  return (
    <footer className="bg-stone-950 text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border border-white/10">
                <img src="/company logo.jpeg" alt="Kelkem Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-none text-white tracking-tighter">Mathurasni</h1>
                <p className="text-[10px] uppercase tracking-[0.3em] text-mustard font-bold">Achar & Spices</p>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Bringing the authentic flavors of Indian tradition to your dining table. Quality you can trust, taste you will remember. Handcrafted with love and heritage.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-spice-red transition-all duration-500 border border-white/10"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/achar_by_mathurasin?igsh=aWZ2YnFhcGpzZzFw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-spice-red transition-all duration-500 border border-white/10"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-spice-red transition-all duration-500 border border-white/10"><Twitter size={18} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:contents">
            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-xs text-mustard">Quick Links</h4>
              <ul className="space-y-5 text-stone-400 text-sm font-light">
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => { setCurrentPage('company'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Our Company</button></li>
                <li><button onClick={() => { setCurrentPage('products'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Products</button></li>
                <li><button onClick={() => { setCurrentPage('gallery'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Visual Gallery</button></li>
                <li><button onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Contact Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-xs text-mustard">Our Products</h4>
              <ul className="space-y-5 text-stone-400 text-sm font-light">
                <li><button onClick={() => { setCurrentPage('products'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Mango Pickle</button></li>
                <li><button onClick={() => { setCurrentPage('products'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Lime Pickle</button></li>
                <li><button onClick={() => { setCurrentPage('products'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Mixed Veg Pickle</button></li>
                <li><button onClick={() => { setCurrentPage('products'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Red Chilli Pickle</button></li>
                <li><button onClick={() => { setCurrentPage('products'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Premium Spices</button></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-xs text-mustard">Newsletter</h4>
            <p className="text-stone-400 text-sm mb-6 font-light leading-relaxed">Subscribe to get updates on new products and traditional recipes.</p>
            <div className="space-y-3">
              <input type="email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm w-full focus:outline-none focus:border-mustard transition-all" placeholder="Your email address" />
              <button className="w-full bg-mustard text-white px-6 py-4 rounded-2xl hover:bg-spice-red transition-all duration-500 font-bold uppercase tracking-widest text-[10px]">Subscribe Now</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-stone-500 text-xs uppercase tracking-[0.25em] font-semibold">

  {/* Left Side */}
  <div className="space-y-2 text-center md:text-left">
    <p className="text-stone-400">
      © 2026 <span className="text-white font-bold">Kelkem India Pvt Ltd</span>. Crafting Tradition.
    </p>

    <p className="text-stone-600 text-[11px] normal-case tracking-normal">
      Designed & Developed by{" "}
      <a
        href="https://bnintelhub.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-mustard font-semibold hover:text-white transition-colors"
      >
        BN Intelhub Pvt Ltd
      </a>, STPI Ranchi
    </p>
  </div>

  {/* Right Side Links */}
  <div className="flex flex-wrap justify-center md:justify-end gap-8">
    <a
      href="#"
      className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-mustard hover:after:w-full after:transition-all"
    >
      Privacy Policy
    </a>

    <a
      href="#"
      className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-mustard hover:after:w-full after:transition-all"
    >
      Terms of Service
    </a>

    <a
      href="#"
      className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-mustard hover:after:w-full after:transition-all"
    >
      Sitemap
    </a>
  </div>

</div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[60] w-14 h-14 bg-spice-red text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-mustard transition-all duration-500 hover:-translate-y-2 group"
        >
          <ChevronRight size={28} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen font-sans text-stone-900 selection:bg-mustard/30 selection:text-spice-red">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Company />
            <Products />
            <Gallery />
            <InstagramSection />
            <ContactCTA />
            <Contact />
            <MapSection />
          </>
        ) : currentPage === 'company' ? (
          <CompanyPage />
        ) : currentPage === 'founder' ? (
          <FounderMessagePage />
        ) : currentPage === 'products' ? (
          <ProductsPage />
        ) : currentPage === 'gallery' ? (
          <GalleryPage />
        ) : (
          <ContactPage />
        )}
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
      <ScrollToTop />
    </div>
  );
}
