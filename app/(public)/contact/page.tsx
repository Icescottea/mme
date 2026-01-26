'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+94 11 234 5678', '+94 77 123 4567'],
      color: 'blue',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@globalrecruitment.lk', 'careers@globalrecruitment.lk'],
      color: 'green',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Business Plaza', 'Colombo 03, Sri Lanka'],
      color: 'purple',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
      color: 'orange',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#de261e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Get in touch with our team. We're here to help with your recruitment needs.
          </p>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
               
          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 lg:grid-rows-4 gap-6 items-stretch">
            
            {/* LEFT: 4 cards */}
            <div className="lg:row-span-4 flex flex-col gap-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md flex-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-[#de261e]/10 text-[#de261e]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item.title}
                      </h3>
                    </div>
                
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div className="lg:row-span-2 bg-slate-200 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128446!2d79.84759931477298!3d6.927078995007607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259692f4c5a8f%3A0x5c9f7c8c8c8c8c8c!2sColombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
            </div>

            {/* Additional Info */}
            <div className="lg:row-span-2 bg-[#ffaeab]/20 p-8 rounded-2xl flex flex-col justify-center">
              <h3 className="text-xl font-bold text-[#ededed] mb-4">
                Visit Our Office
              </h3>
              <p className="text-[#c8c8c8] mb-6">
                We welcome walk-in consultations during office hours. Our team is ready to discuss your recruitment needs and answer any questions you may have.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm font-semibold text-[#060709] mb-2">
                  Parking Available
                </p>
                <p className="text-xs text-[#060709]/70">
                  Free parking for visitors in the building basement. Access via Main Street entrance.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#ffaeab]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#f1f1f1] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: 'How long does the recruitment process take?',
                a: 'Typically 4-8 weeks from application to placement, depending on the position and destination country.',
              },
              {
                q: 'Are there any fees for job seekers?',
                a: 'We operate transparently with no hidden fees. All costs are discussed upfront during consultation.',
              },
              {
                q: 'What documents do I need?',
                a: 'Valid passport, educational certificates, work experience letters, and professional licenses if applicable.',
              },
              {
                q: 'Do you provide visa assistance?',
                a: 'Yes, we guide you through the entire visa application process and documentation requirements.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-slate-800 mb-2">{item.q}</h4>
                <p className="text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}