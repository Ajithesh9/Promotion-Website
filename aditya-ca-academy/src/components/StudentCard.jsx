import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Sparkles } from 'lucide-react';

const TopperSpotlight = ({ topper }) => {
    if (!topper) return null;

    return (
        <section className="topper-wrapper">
            {/* Background Glow */}
            <div className="topper-glow"></div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="topper-card"
            >
                {/* Decorative Watermark */}
                <div className="topper-watermark">
                    <Trophy size={250} className="text-white -rotate-12" />
                </div>

                {/* Photo Section */}
                <div className="topper-image-section">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay z-10 pointer-events-none"></div>

                    <img
                        src="/assets/topper.webp"
                        className="topper-image"
                        alt={`Topper ${topper.name}`}
                    />

                    {/* Gradient */}
                    <div className="topper-gradient-overlay"></div>
                </div>

                {/* Details Section */}
                <div className="topper-details-section">
                    <div className="mb-8">
                        <div className="topper-tagline">
                            <Sparkles size={16} />
                            <span>Outstanding Performance</span>
                        </div>
                        <h2 className="topper-name">
                            {topper.name}
                        </h2>
                        <p className="topper-subtitle">CA Foundation 2024</p>
                    </div>

                    {/* Stats */}
                    <div className="mb-8">
                        <div className="topper-score-container">
                            <div className="flex items-baseline">
                                <span className="topper-score-main">{topper.marks}</span>
                                <span className="topper-score-sub">/ {topper.max} Marks</span>
                            </div>
                            <p className="topper-htno-text">
                                Hall Ticket: <span className="text-white/80 select-text">{topper.htno}</span>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="topper-footer">
                        <div className="topper-icon-circle">
                            <Award size={20} />
                        </div>
                        <div>
                            <h4 className="topper-footer-title">All India Topper</h4>
                            <p className="topper-footer-desc">Proven excellence with consistent hard work.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default TopperSpotlight;