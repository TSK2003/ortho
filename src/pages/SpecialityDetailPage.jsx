import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { departmentsList } from '../data/departmentsData';
import { 
  Stethoscope, 
  CheckCircle, 
  Award, 
  Zap, 
  Activity, 
  HelpCircle, 
  ChevronDown, 
  Calendar, 
  PhoneCall,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

const SpecialityDetailPage = ({ onOpenAppointment }) => {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);

  const dept = departmentsList.find(d => d.slug === slug || d.id === slug) || departmentsList[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      
      {/* Hero Banner */}
      <PageHero
        title={`Department of ${dept.name}`}
        subtitle={dept.shortDesc}
        breadcrumb={[
          { label: 'Surgeries & Specialties', path: '/services/robotic-knee-replacement' },
          { label: dept.name }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview & Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {dept.category} Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                Advanced Surgical Excellence in {dept.name}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {dept.description}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenAppointment && onOpenAppointment({ department: dept.name })}
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with {dept.doctorName.split(',')[0]}</span>
                </button>
              </div>
            </div>

            {/* Key Treatments */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Key Surgical Interventions & Procedures
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(dept.treatments || []).map((t, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="font-semibold">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities & Tech */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Specialized Surgical Infrastructure
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(dept.facilities || []).map((f, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {dept.faqs && dept.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {dept.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">{faq.question}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Surgeon Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                Department Lead
              </span>
              <div className="flex items-center space-x-3">
                <img
                  src={dept.doctorImg}
                  alt={dept.doctorName}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{dept.doctorName}</h4>
                  <p className="text-[11px] text-blue-700 font-semibold">{dept.doctorRole}</p>
                </div>
              </div>

              <button
                onClick={() => onOpenAppointment && onOpenAppointment({ doctorName: dept.doctorName, department: dept.name })}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Book OPD Consultation
              </button>
            </div>

            {/* Quick Helpline */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 space-y-3 border border-slate-800">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                24/7 Orthopedic Emergency
              </span>
              <h4 className="text-base font-bold font-heading">Need Urgent Fracture Care?</h4>
              <p className="text-xs text-slate-300">
                Our Level-1 Orthopedic Trauma team and emergency digital C-arm OTs are active round-the-clock.
              </p>
              <a
                href="tel:1800-419-6784"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors block text-center"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 1800-419-6784</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SpecialityDetailPage;
