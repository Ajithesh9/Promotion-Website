import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import StudentCard from './components/StudentCard';
import TopperSpotlight from './components/TopperSpotlight';
import { getCAStudents, getMecStudents, getCECStudents } from './data/mockData';
import { Phone, MapPin, Quote, ChevronRight, PlayCircle, ArrowLeft, ArrowRight } from 'lucide-react';

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

function App() {
  const caStudents = getCAStudents();
  const mecStudents = getMecStudents();
  const cecStudents = getCECStudents();
  const topper = caStudents.length > 0 ? caStudents[0] : null;

  const caScrollRef = useRef(null);
  const mecScrollRef = useRef(null);
  const cecScrollRef = useRef(null);

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
    <div className="min-h-screen selection:bg-primary selection:text-white overflow-x-hidden relative">
      <Navbar />

      {/* HERO SECTION */}
      <header id="home" className="pt-32 pb-16 px-6 text-center max-w-7xl mx-auto relative z-10">
        <div className="inline-block border border-primary/30 bg-primary/10 px-4 py-1 rounded-full mb-6">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Aditya CA Academy</span>
        </div>
        <h1 className="hero-title">
          Forging the Next Generation of <br />
          <span className="text-primary">Chartered Accountants</span>
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
      <section id="ca-foundation" className="py-16 border-t border-border/30 bg-background/95">
        <div className="max-w-7xl mx-auto px-6 relative">
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

          {/* Corrected: Removed 'group' class to fix ghost hovering */}
          <div className="relative">
            <div className="carousel-container" ref={caScrollRef}>
              {caStudents.map((student, index) => (
                <StudentCard key={student.htno || index} student={student} rank={index + 1} type="CA" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- JR MEC SECTION --- */}
      <section id="jr-mec" className="py-16 border-t border-border/30 bg-background/95 relative">
        <div className="max-w-7xl mx-auto px-6 relative">
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
        </div>
      </section>

      {/* --- JR CEC SECTION --- */}
      <section id="jr-cec" className="py-16 border-t border-border/30 bg-background/95 relative">
        <div className="max-w-7xl mx-auto px-6 relative">
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
        </div>
      </section>

      {/* --- VIDEO HIGHLIGHTS --- */}
      <section id="highlights" className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
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
        </div>
      </section>

      {/* --- MANAGEMENT --- */}
      <section id="management" className="py-16 px-6 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Visionary Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {managementData.map((leader, index) => (
              <div key={index} className="management-card group">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-black py-12 border-t border-border">
        {/* Updated Grid: Changed to 12-column grid on desktop for better spacing control */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Logo Section - lg:col-span-3 (25%) */}
          <div className="lg:col-span-3">
            {/* FIX 1: Added 'w-auto' and 'object-contain' to prevent dragging/distortion */}
            <img src="/assets/assets/logo.png" className="h-24 w-auto object-contain mb-6 opacity-90 brightness-110" alt="Aditya Logo" />
            <p className="text-muted text-sm leading-relaxed">
              Aditya CA Academy is dedicated to shaping the future of finance professionals through rigorous training and holistic development.
            </p>
          </div>

          {/* Contact Section - lg:col-span-3 (25%) */}
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

          {/* QR Code - lg:col-span-2 (16.6%) */}
          {/* FIX 2: Reduced column span to 2 to minimize empty space between QR and Map */}
          <div className="flex flex-col items-start lg:col-span-2">
            <h4 className="text-white font-bold mb-4">Scan Contact</h4>
            <div className="bg-white p-2 rounded-lg">
              <img src="/assets/assets/qrcode3.png" className="w-24 h-24" alt="QR Code" />
            </div>
          </div>

          {/* Map Section - lg:col-span-4 (33.3%) */}
          {/* Increased span to 4 to take up remaining space, bringing it closer to QR */}
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
    </div>
  );
}

export default App;