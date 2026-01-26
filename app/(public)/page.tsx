import Link from 'next/link';
import { Briefcase, Shield, Users, Globe, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const services = [
    {
      icon: Briefcase,
      title: 'International Recruitment',
      description: 'Connect with global opportunities across multiple industries and countries.',
    },
    {
      icon: Shield,
      title: 'Due Diligence',
      description: 'Comprehensive verification and compliance services for peace of mind.',
    },
    {
      icon: Users,
      title: 'Workforce Management',
      description: 'End-to-end solutions for managing your international workforce.',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access to employment opportunities in Gulf, Europe, Asia, and beyond.',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Placements' },
    { number: '50+', label: 'Countries' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Success Rate' },
  ];

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920"
            alt="Professional business meeting"
            className="w-full h-full object-cover animate-[zoom_20s_ease-in-out_infinite_alternate]"
          />
          {/* Dark Overlay with fade in */}
          <div className="absolute inset-0 bg-[#060709]/70 animate-fadeIn"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl animate-slideInUp">
            <h1 className="text-5xl font-bold mb-6 text-white animate-fadeInDown">
              Your Gateway to Global Employment Opportunities
            </h1>
            <p className="text-xl text-gray-200 mb-8 animate-fadeInUp animation-delay-200">
              We connect talented professionals with leading employers worldwide, providing comprehensive recruitment and workforce management solutions.
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-400">
              <Link
                href="/employment"
                className="bg-[#fffc01] text-[#060709] px-8 py-3 rounded-lg font-semibold hover:bg-[#fffc01]/90 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-lg transform"
              >
                Browse Jobs
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/job-inquiry"
                className="bg-[#de261e] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#de261e]/90 transition-all duration-300 border-2 border-white/30 hover:scale-105 hover:shadow-lg transform"
              >
                Submit Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#ffaeab]/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-110 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-bold text-[#de261e] mb-2 hover:text-[#de261e]/80 transition-colors">
                  {stat.number}
                </div>
                <div className="text-zinc-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-[#060709] mb-4">
              Our Services
            </h2>
            <p className="text-xl text-[#060709]/70 max-w-2xl mx-auto">
              Comprehensive recruitment and workforce management solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#ffaeab]/30 transform hover:-translate-y-2 group animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-[#fffc01]/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#fffc01]/30 transition-all duration-300 group-hover:rotate-6 transform">
                    <Icon className="w-7 h-7 text-[#de261e] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#060709] mb-3 group-hover:text-[#de261e] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#060709]/70">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#ffaeab]/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h2 className="text-4xl font-bold text-[#ffffff] mb-6">
                Why Choose Global Recruitment?
              </h2>
              <p className="text-lg text-[#fcfcfc]/70 mb-8">
                With over 15 years of experience in international recruitment, we have established ourselves as a trusted partner for both job seekers and employers.
              </p>
              <ul className="space-y-4">
                {[
                  'Verified and legitimate employment opportunities',
                  'Comprehensive pre-departure orientation',
                  'Full compliance and documentation support',
                  'Post-placement assistance and support',
                  'Transparent process with no hidden fees',
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 transform hover:translate-x-2 transition-transform duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="w-6 h-6 text-[#de261e] flex-shrink-0 mt-0.5 animate-pulse" />
                    <span className="text-[#fefefe]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#de261e] to-[#de261e]/80 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fadeInUp animation-delay-200">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="mb-6 text-white/90">
                Submit your inquiry today and let our experienced team guide you through the process.
              </p>
              <Link
                href="/job-inquiry"
                className="bg-[#fffc01] text-[#060709] px-6 py-3 rounded-lg font-semibold hover:bg-[#fffc01]/90 transition-all duration-300 inline-block hover:scale-105 transform"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#de261e] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-white mb-4">
            Looking for Reliable Recruitment Partners?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services and how we can help you achieve your career goals.
          </p>
          <Link
            href="/contact"
            className="bg-[#fffc01] text-[#060709] px-8 py-3 rounded-lg font-semibold hover:bg-[#fffc01]/90 transition-all duration-300 inline-block hover:scale-105 transform hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}