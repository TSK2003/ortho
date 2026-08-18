import React from 'react';
import PageHero from '../components/common/PageHero';
import { insurancePartners, insuranceFaqs } from '../data/insuranceData';
import { ShieldCheck, CheckCircle2, PhoneCall, Building2, HelpCircle } from 'lucide-react';

const corporatePartners = [
  "Indian Olympic Association & Athletics Federation",
  "State Police & Paramilitary Welfare Medical Wing",
  "Southern Railway & Central Government Health Scheme (CGHS)",
  "Ex-Servicemen Contributory Health Scheme (ECHS)",
  "Tata Motors & Major Industrial Workplaces",
  "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)"
];

const InsurancesPage = ({ onOpenEnquiry }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-12">
      <PageHero
        title="Orthopedic Insurance & 100% Cashless Surgery Desk"
        subtitle="Empaneled with leading health insurers, TPAs, and Government Schemes for robotic joint replacement and spine surgeries."
        breadcrumb={[{ label: 'Insurances & TPA' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Insurance Partners Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
              100% Cashless Approvals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">Empaneled Insurance & TPA Network</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insurancePartners.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md block w-fit">{item.category || item.badge}</span>
                  <h3 className="text-base font-bold text-slate-950 font-heading">{item.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.coverage}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Instant Pre-Auth Desk</span>
                  </span>
                  <button
                    onClick={onOpenEnquiry}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                  >
                    Check Coverage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Partnerships */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-950 flex items-center space-x-2 font-heading">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Government Schemes & Corporate Institutional Tie-Ups</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corporatePartners.map((corp, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-3 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{corp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance FAQs */}
        {insuranceFaqs && insuranceFaqs.length > 0 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950 flex items-center space-x-2 font-heading">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Insurance & Cashless Surgery FAQs</span>
            </h3>
            <div className="space-y-3">
              {insuranceFaqs.map((faq, idx) => (
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

export default InsurancesPage;
