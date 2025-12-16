import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Sparkles } from 'lucide-react';

const TopperSpotlight = ({ topper }) => {
    if (!topper) return null;

    return (
        <section className="relative max-w-5xl mx-auto px-6 mb-16 z-10 mt-8">
            {/* SIMPLE TOP GLOW (Requested Fix)
               - Visible mostly on the top side
               - Bleeds into the section above
               - Subtle and performance friendly 
            */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-primary/30 blur-[100px] -z-10 rounded-full mix-blend-screen pointer-events-none"></div>

            <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="bg-surface border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative max-h-[700px]"
            >
                {/* Decorative Watermark */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                    <Trophy size={250} className="text-white -rotate-12" />
                </div>

                {/* Photo Section */}
                <div className="relative min-h-[350px] md:w-1/2 md:min-h-full p-4">
                    {/* Inner wrapper for rounded corners */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                        <img
                            src="/assets/topper.webp"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            alt={`Topper ${topper.name}`}
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="p-8 flex flex-col justify-center relative z-20 md:w-1/2 md:pl-10">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-primary mb-2 font-bold uppercase tracking-widest text-xs select-none">
                            <Sparkles size={16} />
                            <span>Outstanding Performance</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-1 select-text">
                            {topper.name}
                        </h2>
                        <p className="text-muted text-base select-text">CA Foundation 2024</p>
                    </div>

                    {/* Stats */}
                    <div className="mb-8">
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-baseline select-text">
                                <span className="text-7xl md:text-8xl font-extrabold text-primary leading-[0.9] tracking-tighter">
                                    {topper.marks}
                                </span>
                                <span className="text-muted font-semibold text-2xl ml-2">
                                    / {topper.max} Marks
                                </span>
                            </div>
                            <p className="text-muted/50 font-mono text-sm font-medium tracking-widest uppercase mt-2 select-text cursor-text">
                                Hall Ticket: <span className="text-white/80">{topper.htno}</span>
                            </p>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <footer className="topper-spotlight-footer border-t border-border pt-6 flex items-center gap-6 relative z-30">
                        <div className="badge-icon-wrapper bg-primary/10 p-4 rounded-full text-primary select-none">
                            <Award size={30} />
                        </div>

                        <div className="badge-text-content">
                            <h4 className="text-white font-bold text-2xl select-text cursor-text">
                                All India Topper
                            </h4>
                            <p className="text-muted text-lg select-text cursor-text mt-1">
                                Proven excellence with consistent hard work.
                            </p>
                        </div>
                    </footer>
                </div>
            </motion.div>
        </section>
    );
};

export default TopperSpotlight;