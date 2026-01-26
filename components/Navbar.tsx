'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/employment', label: 'Employment' },
    { href: '/due-diligence', label: 'Due Diligence' },
    { href: '/job-inquiry', label: 'Job Inquiry' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-[#fffc01] animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.jpeg" 
              alt="Global Recruitment Logo" 
              width={50} 
              height={50}
              className="rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <span className="text-xl font-bold text-[#060709] group-hover:text-[#de261e] transition-colors duration-300">
              Mahanayaka Mudalige Enterprises
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#060709] hover:text-[#de261e] font-medium transition-all duration-300 relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#de261e] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              href="/login"
              className="bg-[#de261e] text-white px-4 py-2 rounded-lg hover:bg-[#de261e]/90 transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#ffaeab]/20 transition-colors duration-300"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#060709] animate-spin-once" />
            ) : (
              <Menu className="w-6 h-6 text-[#060709] animate-pulse" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#ffaeab]/30 animate-slideDown">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#060709] hover:text-[#de261e] font-medium px-4 py-2 rounded-lg hover:bg-[#ffaeab]/20 transition-all duration-300 transform hover:translate-x-2 animate-fadeInLeft"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="bg-[#de261e] text-white px-4 py-2 rounded-lg hover:bg-[#de261e]/90 text-center transition-all duration-300 hover:scale-105 transform animate-fadeInLeft"
                style={{ animationDelay: '0.25s' }}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}