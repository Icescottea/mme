import { Shield, FileCheck, Users, Award, CheckCircle, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

export default function DueDiligence() {
  const services = [
    {
      icon: FileCheck,
      title: 'Document Verification',
      description: 'Comprehensive verification of all educational certificates, work experience, and professional licenses.',
    },
    {
      icon: Shield,
      title: 'Background Checks',
      description: 'Thorough background screening including criminal records, employment history, and reference checks.',
    },
    {
      icon: Users,
      title: 'Employer Verification',
      description: 'Validation of employer credentials, company registration, and legitimacy of job offers.',
    },
    {
      icon: Award,
      title: 'Compliance Certification',
      description: 'Ensuring all placements meet international labor standards and local regulations.',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Assessment',
      description: 'We review all submitted documents and credentials to establish authenticity.',
    },
    {
      step: '02',
      title: 'Verification Process',
      description: 'Our team conducts comprehensive checks with issuing authorities and institutions.',
    },
    {
      step: '03',
      title: 'Employer Validation',
      description: 'We verify employer credentials and ensure compliance with labor standards.',
    },
    {
      step: '04',
      title: 'Final Certification',
      description: 'Upon successful verification, we provide certification and clearance for placement.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#060709] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-[#fffc01]" />
            <h1 className="text-4xl font-bold">Due Diligence Services</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Our comprehensive due diligence process ensures transparency, compliance, and security for both job seekers and employers.
          </p>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-500 mb-6">
                Why Due Diligence Matters
              </h2>
              <p className="text-lg text-slate-400 mb-6">
                In international recruitment, due diligence is not just a formality but a critical safeguard. Our rigorous verification process protects both candidates and employers from fraud, misrepresentation, and non-compliance issues.
              </p>
              <ul className="space-y-4">
                {[
                  'Protects against fraudulent job offers and scams',
                  'Ensures compliance with international labor laws',
                  'Verifies authenticity of credentials and documents',
                  'Builds trust between employers and candidates',
                  'Minimizes legal and financial risks',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#de261e] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#ffaeab]/20 p-8 rounded-2xl">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#fffc01]/20 p-2 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-[#de261e]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-500">Stay Protected</h3>
                </div>
                <p className="text-slate-400 mb-4">
                  International recruitment scams cost job seekers millions each year. Our due diligence process helps you avoid:
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Fake job offers and advance fee fraud</li>
                  <li>• Unlicensed or fraudulent agencies</li>
                  <li>• Misrepresented job conditions</li>
                  <li>• Non-compliant employment contracts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#ffaeab]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-500 mb-4">
              Our Due Diligence Services
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Comprehensive verification and compliance services to ensure safe and legitimate placements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#fffc01]/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#de261e]" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-400 mb-4">
              Our Verification Process
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              A systematic approach to ensure complete transparency and compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#de261e]">
                  <div className="text-5xl font-bold text-[#ffaeab]/30 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#ffaeab]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="bg-[#de261e] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Committed to International Standards
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We adhere to ILO conventions, local labor laws, and international best practices in recruitment and employment.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-white/90">Compliance Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">Zero</div>
                <div className="text-white/90">Fraud Incidents</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-white/90">Years Experience</div>
              </div>
            </div>

            {/* License Image */}
            <div className="max-w-4xl mx-auto bg-white p-4 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-bold text-[#060709] mb-4">Our Official License</h3>
              <div className="relative w-full h-auto">
                <Image
                  src="/license.png"
                  alt="Official Recruitment License"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority
                />
              </div>
              <p className="text-sm text-[#060709] mt-4">
                Licensed and certified by the Sri Lanka Bureau of Foreign Employment (SLBFE)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}