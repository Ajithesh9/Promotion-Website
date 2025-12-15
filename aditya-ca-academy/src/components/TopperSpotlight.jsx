import React from 'react';
import { motion } from 'framer-motion';

const TopperSpotlight = ({ topper }) => {
    if (!topper) return null;

    return (
        <section className="relative max-w-6xl mx-auto px-6 mb-16 z-10">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="topper-card"
            >
                {/* Photo Left */}
                <div className="md:w-2/5 h-80 md:h-auto relative bg-brand-dark">
                    <img
                        src="/assets/topper.webp"
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
                        alt="All India Topper"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent md:bg-gradient-to-r"></div>
                </div>

                {/* Content Right */}
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-0.5 w-8 bg-brand-orange"></span>
                        <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">All India Topper</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {topper.name}
                    </h2>

                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-6xl font-extrabold text-brand-orange">
                            {topper.marks}
                        </span>
                        <div className="text-brand-text">
                            <span className="block text-xs uppercase tracking-wide">Secured</span>
                            <span className="font-bold text-white text-lg">Out of {topper.max}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="bg-brand-dark border border-brand-border px-4 py-2 rounded">
                            <p className="text-[10px] uppercase text-brand-text mb-1">Hall Ticket</p>
                            <p className="font-mono text-white tracking-wide">{topper.htno}</p>
                        </div>
                        <div className="bg-brand-dark border border-brand-border px-4 py-2 rounded">
                            <p className="text-[10px] uppercase text-brand-text mb-1">Batch</p>
                            <p className="text-white">CA Foundation</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default TopperSpotlight;