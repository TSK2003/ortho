import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  UserCheck, 
  ShieldCheck, 
  Activity,
  Award,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { servicesList as defaultServices } from '../data/servicesData';
import { useAdmin } from '../context/AdminContext';
import PageHero from '../components/common/PageHero';

const ServiceDetailPage = ({ onOpenAppointment }) => {
  const { slug } = useParams();
  const adminContext = useAdmin();
  const servicesList = adminContext?.services || defaultServices;
  const hospitalInfo = adminContext?.hospitalInfo || { fullName: 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery' };

  const service = servicesList.find((s) => s.slug === slug) || servicesList[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-10">
      
      <PageHero
        title={service.title}
        subtitle={service.shortDesc}
        breadcrumb={[
          { label: 'Surgeries & Specialties', path: '/services/robotic-knee-replacement' },
          { label: service.title }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* TOP OVERVIEW & IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* About The Procedure (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Surgical Scope & Procedural Excellence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-heading">
              Overview: {service.title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {service.about}
            </p>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onOpenAppointment && onOpenAppointment({ department: service.title })}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation for {service.title}</span>
              </button>
            </div>
          </div>

          {/* Department Hero Image (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
            <img
              src={service.heroImage}
              alt={service.title}
              className="w-full h-64 sm:h-72 object-cover"
            />
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Class-100 Laminar Airflow Operating Standards</p>
                <p className="text-[11px] text-slate-500">Zero-Infection Surgical Protocol with Full Implant Traceability</p>
              </div>
            </div>
          </div>

        </div>

        {/* TREATMENTS & BENEFITS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Treatments / Surgical Techniques */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3 flex items-center space-x-2 font-heading">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Specialized Surgical Techniques & Protocols</span>
            </h3>
            <ul className="space-y-3">
              {(service.treatments || []).map((treatment, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs text-slate-700">
                  <span className="w-5 h-5 bg-blue-50 text-blue-800 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-blue-100">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{treatment}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Benefits */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3 flex items-center space-x-2 font-heading">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Patient Outcomes & Clinical Benefits</span>
            </h3>
            <ul className="space-y-3">
              {(service.benefits || []).map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CONSULTANT SURGEONS FOR THIS SPECIALTY */}
        {service.doctors && service.doctors.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <h3 className="text-lg font-bold text-slate-950 font-heading">
              Lead Consultant Surgeons for {service.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.doctors.map((doc, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                    {doc.name.split(' ')[1]?.[0] || 'D'}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                    <p className="text-[11px] text-blue-700 font-semibold">{doc.qualification}</p>
                    <p className="text-[11px] text-slate-500">{doc.role} • {doc.experience} Experience</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-slate-950 font-heading">
              Frequently Asked Questions: {service.title}
            </h3>
            <div className="space-y-3">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{faq.question}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ServiceDetailPage;
