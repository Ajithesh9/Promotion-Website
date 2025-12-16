import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Sparkles } from 'lucide-react';

const TopperSpotlight = ({ topper }) => {
    if (!topper) return null;

    return (
        <section className="relative max-w-5xl mx-auto px-6 mb-16 z-10 mt-8">
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 bg-brand-orange/20 rounded-full opacity-30 transform scale-90 blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-brand-card border border-brand-border rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative max-h-[500px]"
            >
                {/* Decorative Watermark */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                    <Trophy size={250} className="text-white -rotate-12" />
                </div>

                {/* Photo Section */}
                <div className="relative overflow-hidden min-h-[300px] md:w-5/12 md:min-h-full">
                    <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay z-10 pointer-events-none"></div>

                    <img
                        src="/assets/topper.webp"
                        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                        alt={`Topper ${topper.name}`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-brand-card z-10 pointer-events-none"></div>
                </div>

                {/* Details Section */}
                {/* md:pl-24 pushes the text to the right */}
                <div className="p-8 flex flex-col justify-center relative z-20 md:w-7/12 md:pl-24">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-brand-orange mb-2 font-bold uppercase tracking-widest text-xs select-none">
                            <Sparkles size={16} />
                            <span>Outstanding Performance</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-1 select-text">
                            {topper.name}
                        </h2>
                        <p className="text-brand-text text-base select-text">CA Foundation 2024</p>
                    </div>

                    {/* Stats - HUGE MARKS */}
                    <div className="mb-8">
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-baseline select-text">
                                <span className="text-7xl md:text-8xl font-extrabold text-brand-orange leading-[0.9] tracking-tighter">
                                    {topper.marks}
                                </span>
                                <span className="text-brand-text font-semibold text-2xl ml-2">
                                    / {topper.max} Marks
                                </span>
                            </div>
                            <p className="text-brand-text/50 font-mono text-sm font-medium tracking-widest uppercase mt-2 select-text cursor-text">
                                Hall Ticket: <span className="text-white/80">{topper.htno}</span>
                            </p>
                        </div>
                    </div>

                    {/* Footer - Highlightable */}
                    <div className="border-t border-brand-border pt-4 flex items-center gap-3 relative z-30">
                        <div className="bg-brand-orange/10 p-2 rounded-full text-brand-orange select-none">
                            <Award size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm select-text cursor-text">All India Topper</h4>
                            <p className="text-brand-text text-xs select-text cursor-text">Proven excellence with consistent hard work.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default TopperSpotlight;