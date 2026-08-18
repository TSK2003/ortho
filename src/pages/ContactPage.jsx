import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  PhoneCall, 
  Mail, 
  Clock, 
  Building2, 
  Calendar,
  CheckCircle2,
  Activity,
  Send,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { useAdmin } from '../context/AdminContext';

const ContactPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'OrthoCare',
    fullName: 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery',
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784',
    email: 'info@orthocarehospital.org',
    address: 'No. 45, Ortho Institute Avenue, Near High Court Junction, Palayamkottai, Tirunelveli, Pin: 627002',
  };

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      
      <PageHero
        title="Contact & 24/7 Fracture Emergency Helpline"
        subtitle="Connect with our orthopedic clinical desk, schedule robotic joint replacement consultations, or call our 24/7 trauma team."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Contact Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Hospital Clinical Desk</span>
              <h3 className="text-xl font-bold text-slate-950 mt-1 font-heading">Direct Contact Lines</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              {/* Emergency Hotline */}
              <a
                href={`tel:${hospitalInfo.emergencyNumber || '1800-419-6784'}`}
                className="flex items-start space-x-3 p-4 bg-amber-50 text-amber-900 rounded-2xl border border-amber-200 font-bold hover:bg-amber-100 transition-colors"
              >
                <PhoneCall className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 animate-pulse" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                    24/7 Level-1 Fracture & Trauma Helpline
                  </span>
                  <span className="text-sm font-black">{hospitalInfo.emergencyNumber || '1800-419-6784'}</span>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">OPD Appointment Desk</span>
                  <span className="font-semibold text-slate-900">{hospitalInfo.phone || '+91 98401 23456'}</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Email Desk</span>
                  <span className="font-semibold text-slate-900">{hospitalInfo.email || 'info@orthocarehospital.org'}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Main Campus Address</span>
                  <span className="font-medium text-slate-800 leading-snug">
                    {hospitalInfo.address}
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">OPD Operating Hours</span>
                  <span className="font-medium text-slate-800">
                    Mon - Sat: 8:00 AM - 8:00 PM (Emergency 24/7)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenAppointment && onOpenAppointment()}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book In-Hospital Consultation</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Online Query Form</span>
              <h3 className="text-xl font-bold text-slate-950 mt-1 font-heading">Send Us a Clinical Message</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our surgical patient care team will respond within 2 hours.
              </p>
            </div>

            {formSent ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">Message Sent Successfully</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you. Our orthopedic clinical coordinator will contact you at <span className="font-bold text-slate-900">{formData.phone}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sundaram"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98401 23456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Medical / Surgical Message</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your joint pain, injury duration, or upload need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message to Ortho Desk</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default ContactPage;
