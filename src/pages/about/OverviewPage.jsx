import React from 'react';
import PageHero from '../../components/common/PageHero';
import { ShieldCheck, Activity, Award, CheckCircle2, Cpu, Zap } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const OverviewPage = () => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'OrthoCare',
    fullName: 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery'
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Institutional Overview"
        subtitle="Discover how OrthoCare is setting new benchmarks in Robotic Joint Replacement, Endoscopic Spine Care, and Polytrauma Salvage."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Overview' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase">
            <span>Institute Profile</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
            Dedicated Robotic Joint Replacement & Advanced Orthopedic Center
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {hospitalInfo.fullName || 'OrthoCare'} is an internationally recognized Center of Excellence in Orthopedic Surgery. By pairing world-class orthopedic surgeons with Stryker Mako 4th Gen robotic arms, Medtronic 3D O-Arm navigation, Karl Storz 4K arthroscopy towers, and zero-infection Class-100 laminar operation theatres, we ensure world-standard surgical outcomes and accelerated patient recovery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 font-heading">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>NABH & ISAKOS Global Standards</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adhering to strict international surgical safety guidelines, pre-operative screening, complete implant barcoding, and zero-infection laminar airflow sterile operating suites.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 font-heading">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>24/7 Level-1 Trauma & Pelvic Fracture Care</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Around-the-clock polytrauma emergency response with mobile digital C-arm imaging, immediate fracture stabilization, and Ilizarov non-union bone salvage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
