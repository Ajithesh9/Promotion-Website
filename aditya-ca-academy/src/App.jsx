import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import StudentCard from './components/StudentCard';
import TopperSpotlight from './components/TopperSpotlight';
import { getCAStudents, getMecStudents, getCECStudents } from './data/mockData';
import { Phone, MapPin, Quote, ChevronRight, PlayCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const managementData = [
  // ... (Keep existing management data)
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

function App() {
  const caStudents = getCAStudents();
  const mecStudents = getMecStudents();
  const cecStudents = getCECStudents(); // [NEW]
  const topper = caStudents.length > 0 ? caStudents[0] : null;

  // Refs
  const caScrollRef = useRef(null);
  const mecScrollRef = useRef(null);
  const cecScrollRef = useRef(null); // [NEW]

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
    <div className="min-h-screen selection:bg-brand-orange selection:text-white overflow-x-hidden">
      <Navbar />

      {/* HEADER & TOPPER SECTIONS (Keep as is) */}
      <header id="home" className="pt-32 pb-16 px-6 text-center max-w-7xl mx-auto">
        <div className="inline-block border border-brand-orange/30 bg-brand-orange/10 px-4 py-1 rounded-full mb-6">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Aditya CA Academy</span>
        </div>
        <h1 className="hero-title">
          Forging the Next Generation of <br />
          <span className="text-brand-orange">Chartered Accountants</span>
        </h1>
        <p className="hero-subtitle">
          Join an institution where discipline meets excellence. With 100% pass percentages and state-wide ranks, we turn aspirations into achievements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#ca-foundation" className="btn-primary">
            View Results <ChevronRight size={18} />
          </a>
          <a href="#contact" className="btn-secondary">
            Contact Campus
          </a>
        </div>
      </header>

      <TopperSpotlight topper={topper} />

      {/* --- CA FOUNDATION SECTION --- */}
      <section id="ca-foundation" className="py-12 border-t border-brand-border/30">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="mb-2">
            <div className="section-title">
              <div className="h-8 w-1 bg-brand-orange rounded-full"></div>
              <h2>CA Foundation Results</h2>
            </div>
            <p className="section-desc">Swipe to explore our top performers.</p>
          </div>

          <div className="relative group">
            <button onClick={() => scroll('left', caScrollRef)} className="nav-arrow-btn -left-4 lg:-left-16" aria-label="Scroll Left">
              <ArrowLeft size={20} />
            </button>
            <div className="carousel-container" ref={caScrollRef}>
              {caStudents.map((student, index) => (
                <StudentCard key={student.htno || index} student={student} rank={index + 1} type="CA" />
              ))}
            </div>
            <button onClick={() => scroll('right', caScrollRef)} className="nav-arrow-btn -right-4 lg:-right-16" aria-label="Scroll Right">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* --- JR MEC SECTION --- */}
      <section id="jr-mec" className="py-16 max-w-7xl mx-auto px-6 relative border-t border-brand-border/30">
        <div className="mb-2">
          <div className="section-title">
            <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
            <h2>Jr. MEC Highlights</h2>
          </div>
          <p className="section-desc">Consistent excellence in Intermediate Exams</p>
        </div>

        <div className="relative group">
          <button onClick={() => scroll('left', mecScrollRef)} className="nav-arrow-btn -left-4 lg:-left-16" aria-label="Scroll Left">
            <ArrowLeft size={20} />
          </button>
          <div className="carousel-container" ref={mecScrollRef}>
            {mecStudents.map((student, index) => (
              <StudentCard key={index} student={student} rank={index + 1} type="MEC" />
            ))}
          </div>
          <button onClick={() => scroll('right', mecScrollRef)} className="nav-arrow-btn -right-4 lg:-right-16" aria-label="Scroll Right">
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* --- [NEW] JR CEC SECTION --- */}
      <section id="jr-cec" className="py-16 max-w-7xl mx-auto px-6 relative border-t border-brand-border/30">
        <div className="mb-2">
          <div className="section-title">
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
            <h2>Jr. CEC Highlights</h2>
          </div>
          <p className="section-desc">Top performers in Commerce, Economics, and Civics.</p>
        </div>

        <div className="relative group">
          <button onClick={() => scroll('left', cecScrollRef)} className="nav-arrow-btn -left-4 lg:-left-16" aria-label="Scroll Left">
            <ArrowLeft size={20} />
          </button>
          <div className="carousel-container" ref={cecScrollRef}>
            {cecStudents.map((student, index) => (
              <StudentCard key={index} student={student} rank={index + 1} type="CEC" />
            ))}
          </div>
          <button onClick={() => scroll('right', cecScrollRef)} className="nav-arrow-btn -right-4 lg:-right-16" aria-label="Scroll Right">
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* --- VIDEO HIGHLIGHTS --- */}
      <section id="highlights" className="py-16 bg-brand-card border-y border-brand-border">
        {/* (Keep content same as original) */}
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* ... (Keep Video Section code) ... */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PlayCircle className="text-brand-orange" size={24} />
              <span className="text-brand-orange font-bold uppercase tracking-widest text-sm">Academy Highlights</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Experience Life at <br /> Aditya CA Academy
            </h2>
            <p className="text-brand-text mb-8 leading-relaxed">
              From rigorous study hours to expert mentorship, see how we mold students into professionals.
            </p>
          </div>
          <div className="bg-brand-dark p-2 border border-brand-border rounded-xl shadow-xl">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/RPeBdfYPP8A?rel=0&modestbranding=1"
                title="Aditya Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- MANAGEMENT & FOOTER (Keep as is) --- */}
      <section id="management" className="py-16 px-6 bg-brand-card border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Visionary Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {managementData.map((leader, index) => (
              <div key={index} className="management-card group">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-16 h-16 object-cover rounded-full border border-brand-border group-hover:border-brand-orange transition-colors"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{leader.name}</h3>
                    <p className="text-brand-orange text-xs uppercase font-bold tracking-wider">{leader.title}</p>
                  </div>
                </div>
                <p className="text-brand-text text-sm italic leading-relaxed mb-4">
                  "{leader.quote}"
                </p>
                <div className="flex justify-end">
                  <Quote size={20} className="text-brand-border" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-black py-12 border-t border-brand-border">
        {/* ... (Footer content same as original) ... */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <img src="/assets/assets/logo.png" className="h-10 mb-6 opacity-90 brightness-110" alt="Aditya Logo" />
            <p className="text-brand-text text-sm leading-relaxed max-w-sm">
              Aditya CA Academy is dedicated to shaping the future of finance professionals through rigorous training and holistic development.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-brand-text">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-orange" />
                <span>+91 99633 76665</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-brand-orange" />
                <span>Lakshminarayana Nagar,<br />Kakinada - 533004</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h4 className="text-white font-bold mb-4">Scan Contact</h4>
            <div className="bg-white p-2 rounded-lg">
              <img src="/assets/assets/qrcode3.png" className="w-24 h-24" alt="QR Code" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-brand-border/50 text-center text-xs text-brand-text">
          © 2025 Aditya CA Academy. All rights reserved. | <a href="https://github.com/ajithesh9" className="hover:text-brand-orange transition-colors">Designed by Ajithesh</a>
        </div>
      </footer>
    </div>
  );
}

export default App;