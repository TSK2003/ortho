import React from 'react';
import PageHero from '../../components/common/PageHero';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const InfectionControlPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Zero-Infection Surgical & Operation Theatre Protocols"
        subtitle="Class-100 Vertical Laminar Airflow Theatres, Positive Pressure Airlocks, and Space Suits for Joint Replacement."
        breadcrumb={[{ label: 'Infection Control' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 text-blue-700">
            <ShieldCheck className="w-10 h-10 text-blue-600 shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-950 font-heading">Class-100 Ultra-Clean Surgical Standards</h2>
              <p className="text-xs text-slate-500">Achieving a near-zero (&lt; 0.1%) prosthetic joint infection rate exceeding international CDC guidelines.</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
            {[
              'Class-100 (ISO Class 5) vertical laminar airflow with 99.997% HEPA filtration over the surgical field.',
              'Total Joint Replacement Helmet Space Suits with personal positive-pressure ventilation for surgical teams.',
              'Double-door hermetically sealed positive pressure airlocks preventing outside air entry.',
              '100% steam sterilization (CSSD) with biological spore indicators and RFID instrument tracking.',
              'Pre-operative nasal MRSA/MSSA screening and prophylactic targeted antibiotic timing within 30 mins of incision.',
              'Ultraviolet Germicidal (UV-C) automated robot terminal disinfection between all surgical procedures.'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfectionControlPage;
