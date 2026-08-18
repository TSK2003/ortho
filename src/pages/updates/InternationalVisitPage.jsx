import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Globe, Award, Calendar, ShieldCheck, PhoneCall } from 'lucide-react';

const InternationalVisitPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="International Orthopedic Tourism & Global Delegations"
        subtitle="Welcoming international patients for world-class robotic joint replacements, complex spine reconstructions, and global fellowship training."
        breadcrumb={[{ label: 'International Patients' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 text-blue-700">
            <Globe className="w-10 h-10 text-blue-600 shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-950 font-heading">Global Orthopedic Concierge Desk</h2>
              <p className="text-xs text-slate-500">Sub-millimeter robotic surgery at a fraction of Western hospital costs with dedicated international patient care.</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            OrthoCare is a destination of choice for patients from Sri Lanka, the Middle East, Southeast Asia, the UK, and Africa seeking advanced Mako robotic total knee and hip replacements, endoscopic spine decompression, and complex deformity corrections.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 block">✈️ Airport Concierge & Visa Support</span>
              <p className="text-slate-500 text-[11px]">Direct medical visa invitation letters and private ambulance/car airport pickups from Madurai and Trivandrum airports.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 block">🏨 Deluxe Attendant Suites</span>
              <p className="text-slate-500 text-[11px]">Private spacious suites with personalized nutrition, multilingual translators, and high-speed Wi-Fi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalVisitPage;
