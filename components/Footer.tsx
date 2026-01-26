'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060709] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="animate-fadeInUp">
            <h3 className="text-xl font-bold mb-4">Global Recruitment</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner in international recruitment and workforce management solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeInUp animation-delay-100">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/employment" className="text-gray-400 hover:text-[#fffc01] transition-colors duration-300 inline-block">
                  Employment
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/due-diligence" className="text-gray-400 hover:text-[#fffc01] transition-colors duration-300 inline-block">
                  Due Diligence
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/job-inquiry" className="text-gray-400 hover:text-[#fffc01] transition-colors duration-300 inline-block">
                  Job Inquiry
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link href="/contact" className="text-gray-400 hover:text-[#fffc01] transition-colors duration-300 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fadeInUp animation-delay-200">
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2 hover:text-[#fffc01] transition-colors duration-300 group">
                <Phone className="w-4 h-4 text-[#de261e] group-hover:animate-bounce" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#fffc01] transition-colors duration-300 group">
                <Mail className="w-4 h-4 text-[#de261e] group-hover:animate-bounce" />
                <span>info@globalrecruitment.lk</span>
              </li>
              <li className="flex items-start gap-2 hover:text-[#fffc01] transition-colors duration-300 group">
                <MapPin className="w-4 h-4 mt-1 text-[#de261e] group-hover:animate-bounce" />
                <span>123 Business Plaza, Colombo 03, Sri Lanka</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="animate-fadeInUp animation-delay-300">
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="bg-[#de261e] p-2 rounded-lg hover:bg-[#de261e]/80 transition-all duration-300 hover:scale-110 transform hover:rotate-6">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-[#de261e] p-2 rounded-lg hover:bg-[#de261e]/80 transition-all duration-300 hover:scale-110 transform hover:rotate-6">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400 animate-fadeIn animation-delay-400">
          <p>&copy; {new Date().getFullYear()} Global Recruitment Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}