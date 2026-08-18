import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Star, Smile, ShieldCheck, Award } from 'lucide-react';

const PatientSatisfactionPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Surgical Outcomes & Patient Satisfaction Metrics"
        subtitle="Objective sub-millimeter surgical accuracy data and patient satisfaction ratings across 12,000+ robotic orthopedic surgeries."
        breadcrumb={[{ label: 'Outcomes & Satisfaction' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-blue-700 font-heading">99.4%</p>
            <p className="text-xs font-bold text-slate-800 mt-1">Satisfaction Score</p>
            <span className="text-[10px] text-slate-400">Post-Op Recovery Survey</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-emerald-700 font-heading">&lt; 0.1%</p>
            <p className="text-xs font-bold text-slate-800 mt-1">Infection Rate</p>
            <span className="text-[10px] text-slate-400">Class-100 Laminar OT</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-blue-700 font-heading">12,000+</p>
            <p className="text-xs font-bold text-slate-800 mt-1">Robotic Surgeries</p>
            <span className="text-[10px] text-slate-400">Successful Outcomes</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-amber-500 font-heading">4.9 / 5</p>
            <p className="text-xs font-bold text-slate-800 mt-1">Google Reviews</p>
            <span className="text-[10px] text-slate-400">Over 2,400+ Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSatisfactionPage;
