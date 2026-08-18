import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  PhoneCall, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight,
  Award,
  Activity,
  Heart
} from 'lucide-react';
import { servicesList as defaultServices } from '../../data/servicesData';
import { useAdmin } from '../../context/AdminContext';

const Footer = () => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'OrthoCare',
    tagline: 'Institute of Orthopedics, Robotic Joint Replacement & Spine Surgery',
    fullName: 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery',
    description: 'OrthoCare is an internationally accredited Center of Excellence in Mako Robotic Knee and Hip Replacement, 3D Navigated Spine Surgery, 4K Keyhole Arthroscopy, 24/7 Level-1 Orthopedic Trauma Care, and Pediatric Deformity Correction.',
    email: 'info@orthocarehospital.org',
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784',
    address: 'No. 45, Ortho Institute Avenue, Near High Court Junction, Palayamkottai, Tirunelveli, Pin: 627002',
  };
  const servicesList = adminContext?.services || defaultServices;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block uppercase font-heading">
                  {hospitalInfo.name || 'ORTHOCARE'}
                </span>
                <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase block -mt-0.5">
                  {hospitalInfo.tagline || 'Institute of Orthopedics & Joint Replacement'}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              {hospitalInfo.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-300 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>NABH & ISAKOS Certified Joint Centre</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-300 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Mako 4th Gen Robotic Operating Suite</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home Page' },
                { to: '/branches', label: 'Hospitals & Joint Clinics' },
                { to: '/technologies', label: 'Robotic Arms & O-Arm Tech' },
                { to: '/blog', label: 'Orthopedic Patient Guides' },
                { to: '/about', label: 'About Institute & Surgeons' },
                { to: '/insurances', label: 'Cashless TPA Insurance' },
                { to: '/contact', label: 'Contact & Emergency Trauma' },
                { to: '/admin-panel-login', label: 'Surgeon & Staff Admin Login' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center space-x-1">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Orthopedic Surgeries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 font-heading">
              Key Surgeries
            </h4>
            <ul className="space-y-2">
              {servicesList.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.slug}`} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center space-x-1">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & 24/7 Trauma Hotline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 font-heading">
              Emergency & Address
            </h4>
            <div className="space-y-2.5">
              <a href={`tel:${hospitalInfo.emergencyNumber || '1800-419-6784'}`} className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-bold bg-amber-950/40 p-2.5 rounded-xl border border-amber-900/50">
                <PhoneCall className="w-4 h-4 shrink-0 animate-pulse" />
                <span>24/7 Trauma: {hospitalInfo.emergencyNumber || '1800-419-6784'}</span>
              </a>

              <div className="flex items-start space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>{hospitalInfo.phone || '+91 98401 23456'}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>{hospitalInfo.email || 'info@orthocarehospital.org'}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span className="leading-snug">{hospitalInfo.address}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>OPD: Mon - Sat 8:00 AM - 8:00 PM (Emergency 24/7)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-slate-500 gap-y-2 text-[11px]">
          <div>
            © {new Date().getFullYear()} {hospitalInfo.fullName || `${hospitalInfo.name} Advanced Institute of Orthopedics & Trauma Surgery`}. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">NABH Surgical Safety Charter</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Implant Traceability Protocol</a>
            <Link to="/admin-panel-login" className="hover:text-blue-400 transition-colors">Surgeon Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
