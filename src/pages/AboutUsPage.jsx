import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { useAdmin } from '../context/AdminContext';
import { 
  ShieldCheck, 
  Award, 
  Activity, 
  Users, 
  Building2, 
  CheckCircle2,
  Calendar,
  ArrowRight,
  Stethoscope,
  Sparkles,
  Zap,
  Cpu
} from 'lucide-react';

const AboutUsPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'OrthoCare',
    fullName: 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery'
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-16 pb-20">
      
      <PageHero
        title={`About ${hospitalInfo.fullName || 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery'}`}
        subtitle="International Center of Excellence in Mako Robotic Joint Replacement, 3D Spine Surgery, 4K Arthroscopy, and 24/7 Level-1 Trauma Care."
        breadcrumb={[{ label: 'About Institute' }]}
      />

      {/* 1. INSTITUTIONAL LEGACY & HERO NARRATIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-slate-100 bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85"
                  alt="OrthoCare Robotic Joint Replacement Operating Theatre"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* Stat Badge */}
              <div className="absolute -bottom-5 right-4 bg-slate-950 text-white p-5 rounded-2xl shadow-2xl border border-slate-700 space-y-1">
                <div className="font-heading text-2xl font-extrabold text-blue-400">22+ Years</div>
                <div className="text-[11px] text-slate-300">Of Surgical Orthopedic Excellence</div>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-7 space-y-5 text-slate-700">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Center of Surgical Excellence</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight">
                Pioneering Robotic Orthopedic Surgery & Bone Health
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                {hospitalInfo.fullName || 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery'} was founded with a singular mission: to bring the world’s most advanced sub-millimeter robotic joint replacements, keyhole endoscopic spine surgery, and 24/7 Level-1 fracture trauma care to patients with uncompromising clinical standards.
              </p>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Our faculty includes Master of Surgery (MS Ortho) consultants, M.Ch Orthopedics, and fellowship-trained surgeons from prestigious orthopedic institutes across Germany (ENDO-Klinik), the UK, and Switzerland (AO Spine).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-heading text-xl font-extrabold text-blue-700">12,000+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Robotic Surgeries Done</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-heading text-xl font-extrabold text-blue-700">25+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Chief Ortho Surgeons</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-heading text-xl font-extrabold text-emerald-700">&lt; 0.1%</div>
                  <div className="text-[11px] text-slate-600 font-medium">Surgical Infection Rate</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Lead Surgeon</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Robotic Precision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mako 4th Generation robotic arm with 3D CT mapping prevents healthy bone loss, protects cruciate ligaments, and ensures 25-30+ years joint longevity.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Zero-Infection Standard</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ultra-clean Class 100 laminar airflow operating suites with HEPA filtration ensure an infection rate well below international CDC benchmarks.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">24/7 Level-1 Trauma Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Immediate life-and-limb saving response for high-energy road accidents, complex pelvic fractures, and Ilizarov non-union reconstructions.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
