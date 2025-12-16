import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', href: '#home' },
        { name: 'CA Foundation', href: '#ca-foundation' },
        { name: 'Jr. MEC', href: '#jr-mec' },
        { name: 'Jr. CEC', href: '#jr-cec' },
        { name: 'Highlights', href: '#highlights' },
        { name: 'Management', href: '#management' },
    ];

    return (
        // Updated: bg-background/95, border-border, text-muted
        <nav className={`fixed w-full z-50 top-0 transition-all duration-300 border-b ${scrolled ? 'bg-background/95 border-border shadow-lg backdrop-blur-md py-2' : 'bg-transparent border-transparent py-2'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2">
                    <img src="/assets/assets/logo.png" className="h-16 md:h-18 brightness-110" alt="Aditya Logo" />
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            // Updated: text-muted
                            className="text-sm font-medium text-muted hover:text-white transition-colors uppercase tracking-wide"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="assets/CA ACADEMY BRO NEW 2024 MAR.pdf"
                        download
                        // Updated: bg-primary
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded font-semibold text-sm hover:bg-orange-600 transition-all"
                    >
                        <Download size={16} /> Brochure
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    // Updated: bg-surface, border-border, hover:text-primary
                    <div className="absolute top-full left-0 w-full bg-surface border-b border-border p-6 md:hidden flex flex-col gap-4 shadow-2xl">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-slate-300 hover:text-primary"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;