import Lenis from 'lenis';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import StudentCard from './components/StudentCard';
import TopperSpotlight from './components/TopperSpotlight';
import Chatbot from './components/Chatbox';
import { getCAStudents, getMecStudents, getCECStudents } from './data/mockData';
import {
  Phone, MapPin, Quote, ChevronRight, PlayCircle, ArrowLeft, ArrowRight,
  Calculator, BookOpen, TrendingUp, GraduationCap, Coins, PieChart, FileSpreadsheet
} from 'lucide-react';

const managementData = [
  {
    name: "Dr. N. Sesha Reddy",
    title: "Chairman",
    quote: "Beginning as a Lecturer, I overcame hardships to form ADITYA. Today, we stand tall with 50 institutions.",
    image: "https://ik.imagekit.io/lhb4hvprkpz/chairman-1_D8kjSfVCM.jpg?updatedAt=1627469626139",
    tag: "Exclusive Leader"
  },
  {
    name: "Dr. N. Sathish Reddy",
    title: "Vice Chairman",
    quote: "My MBA from UTS, Australia, inspires me to blend global methodologies with Aditya's vision.",
    image: "https://ik.imagekit.io/lhb4hvprkpz/vc-2_TaWGfVOgE.jpg?updatedAt=1627469627538",
    tag: "Dynamic Visionary"
  },
  {
    name: "Mr. N K Deepak Reddy",
    title: "Secretary",
    quote: "My mission is to equip students with the skills they need to excel in today's industry.",
    image: "https://ik.imagekit.io/lhb4hvprkpz/secretary-3_H7GP-UizK.jpg?updatedAt=1627469626751",
    tag: "Organizational Expert"
  }
];

// --- BACKGROUND PATTERN COMPONENT ---
const BackgroundPattern = () => {
  const icons = [
    Calculator, BookOpen, TrendingUp, GraduationCap,
    Coins, PieChart, FileSpreadsheet, Calculator,
    BookOpen, TrendingUp, GraduationCap, Coins
  ];

  return (
    // FIXED: Increased opacity from 0.03 to 0.15 so icons are clearly visible
    <div className="absolute inset-0 overflow-hidden opacity-[0.15] select-none pointer-events-none">
      <div className="flex flex-wrap gap-16 justify-center items-center p-12 w-[150%] -ml-[25%] -mt-20 transform -rotate-12">
        {Array.from({ length: 80 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={i} className="flex items-center justify-center w-24 h-24">
              {/* Increased stroke width for better visibility */}
              <Icon size={48} className="text-primary" strokeWidth={2} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ANIMATIONS
const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const heroItem = {
  hidden: { y: 20, opacity: 0, filter: 'blur(5px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function App() {
  const caStudents = getCAStudents();
  const mecStudents = getMecStudents();
  const cecStudents = getCECStudents();
  const topper = caStudents.length > 0 ? caStudents[0] : null;

  const caScrollRef = useRef(null);
  const mecScrollRef = useRef(null);
  const cecScrollRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.5,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scroll = (direction, ref) => {
    if (ref.current) {
      const firstCard = ref.current.children[0];
      if (firstCard) {
        const cardWidth = firstCard.clientWidth;
        const gap = 24;
        const scrollAmount = (cardWidth + gap) * 2;
        ref.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white overflow-x-hidden relative bg-background">

      {/* BACKGROUND LAYER - Finance Icons Pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <BackgroundPattern />
        {/* Slightly darker overlay to blend icons nicely */}
        <div className="absolute inset-0 bg-background/40"></div>
      </motion.div>

      <Navbar />

      {/* HERO SECTION */}
      <header id="home" className="pt-32 pb-16 px-6 text-center max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainer}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={heroItem} className="inline-block border border-primary/30 bg-primary/10 px-4 py-1 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Aditya CA Academy</span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={heroItem} className="hero-title mb-6">
            Forging the Next Generation of <br />
            <span className="text-primary relative inline-block">
              Chartered Accountants
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.99999 83.25 -3.00001 198 4.99997" stroke="currentColor" strokeWidth="3" /></svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={heroItem} className="hero-subtitle mb-8 max-w-2xl">
            Join an institution where discipline meets excellence. With 100% pass percentages and state-wide ranks, we turn aspirations into achievements.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#ca-foundation" className="btn-primary group">
              View Results <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Campus
            </a>
          </motion.div>
        </motion.div>
      </header>

      <TopperSpotlight topper={topper} />

      {/* --- CA FOUNDATION SECTION --- */}
      <section id="ca-foundation" className="py-16 border-t border-border/30 bg-background/95 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6 relative"
        >
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-title">
                <div className="h-8 w-1.5 bg-primary rounded-sm"></div>
                <h2>CA Foundation Results</h2>
              </div>
              <p className="section-desc">Setting benchmarks with outstanding scores.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left', caScrollRef)} className="w-10 h-10 flex items-center justify-center border border-border rounded hover:bg-primary hover:text-white transition-colors"><ArrowLeft size={20} /></button>
              <button onClick={() => scroll('right', caScrollRef)} className="w-10 h-10 flex items-center justify-center border border-border rounded hover:bg-primary hover:text-white transition-colors"><ArrowRight size={20} /></button>
            </div>
          </div>

          <div className="relative">
            <div className="carousel-container" ref={caScrollRef}>
              {caStudents.map((student, index) => (
                <StudentCard key={student.htno || index} student={student} rank={index + 1} type="CA" />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- JR MEC SECTION --- */}
      <section id="jr-mec" className="py-16 border-t border-border/30 bg-background/95 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6 relative"
        >
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-title">
                <div className="h-8 w-1.5 bg-blue-500 rounded-sm"></div>
                <h2>Jr. MEC Highlights</h2>
              </div>
              <p className="section-desc">Consistent excellence in Intermediate Exams</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left', mecScrollRef)} className="w-10 h-10 flex items-center justify-center border border-border rounded hover:bg-blue-500 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
              <button onClick={() => scroll('right', mecScrollRef)} className="w-10 h-10 flex items-center justify-center border border-border rounded hover:bg-blue-500 hover:text-white transition-colors"><ArrowRight size={20} /></button>
            </div>
          </div>

          <div className="carousel-container" ref={mecScrollRef}>
            {mecStudents.map((student, index) => (
              <StudentCard key={index} student={student} rank={index + 1} type="MEC" />
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- JR CEC SECTION --- */}
      <section id="jr-cec" className="py-16 border-t border-border/30 bg-background/95 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6 relative"
        >
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-title">
                <div className="h-8 w-1.5 bg-emerald-500 rounded-sm"></div>
                <h2>Jr. CEC Highlights</h2>
              </div>
              <p className="section-desc">Top performers in Commerce, Economics, and Civics.</p>
            </div>
          </div>

          <div className="carousel-container" ref={cecScrollRef}>
            {cecStudents.map((student, index) => (
              <StudentCard key={index} student={student} rank={index + 1} type="CEC" />
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- VIDEO HIGHLIGHTS --- */}
      <section id="highlights" className="py-16 bg-surface border-y border-border relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PlayCircle className="text-primary" size={24} />
              <span className="text-primary font-bold uppercase tracking-widest text-sm font-mono">Academy Highlights</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Experience Life at <br /> Aditya CA Academy
            </h2>
            <p className="text-muted mb-8 leading-relaxed text-lg">
              From rigorous study hours to expert mentorship, see how we mold students into professionals.
            </p>
          </div>
          <div className="bg-background p-2 border border-border rounded-xl shadow-xl">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/RPeBdfYPP8A?si=GAF7RFmnt19k6_oW"
                title="Aditya Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- MANAGEMENT --- */}
      <section id="management" className="py-16 px-6 bg-surface border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Visionary Leadership
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {managementData.map((leader, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="management-card group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-16 h-16 object-cover rounded-xl border border-border group-hover:border-primary transition-colors"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{leader.name}</h3>
                    <p className="text-primary text-xs uppercase font-bold tracking-wider">{leader.title}</p>
                  </div>
                </div>
                <p className="text-muted text-sm italic leading-relaxed mb-4">
                  "{leader.quote}"
                </p>
                <div className="flex justify-end">
                  <Quote size={20} className="text-border" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer id="contact" className="bg-black py-12 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-3">
            <img src="/assets/assets/logo.png" className="h-24 w-auto object-contain mb-6 opacity-90 brightness-110" alt="Aditya Logo" />
            <p className="text-muted text-sm leading-relaxed">
              Aditya CA Academy is dedicated to shaping the future of finance professionals through rigorous training and holistic development.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <div className="flex flex-col">
                  <span>+91 99633 76665</span>
                  <span>+91 9866912916</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-1" />
                <span>
                  Lakshminarayana Nagar, Near Aditya Degree College (Co-Ed.),<br />
                  Kakinada - 533004, Andhra Pradesh
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start lg:col-span-2">
            <h4 className="text-white font-bold mb-4">Scan Contact</h4>
            <div className="bg-white p-2 rounded-lg">
              <img src="/assets/assets/qrcode3.png" className="w-24 h-24" alt="QR Code" />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-white font-bold mb-4">Locate Us</h4>
            <div className="rounded-xl overflow-hidden border border-border shadow-lg h-full min-h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.2280076306683!2d82.241676974618!3d16.96333131488395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382871b1cc621f%3A0x2de4565cbdc8b5b8!2sADITYA%20CA%20ACADEMY%20%26%20ADITYA%20M.%20Sc.%2C%20Campus!5e0!3m2!1sen!2sin!4v1765891817798!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Campus Map"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted">
          © 2025 Aditya CA Academy. All rights reserved. | <a href="https://github.com/ajithesh9" className="hover:text-primary transition-colors">Designed by Ajithesh</a>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}

export default App;