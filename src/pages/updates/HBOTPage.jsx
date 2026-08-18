import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Activity, ShieldCheck, Zap, Calendar } from 'lucide-react';

const HBOTPage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Hyperbaric Oxygen Therapy (HBOT) & Bone Healing"
        subtitle="Accelerating Bone Regeneration, Eliminating Chronic Osteomyelitis (Bone Infection), and Salvaging Non-Union Fractures."
        breadcrumb={[{ label: 'HBOT & Bone Healing' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
              Advanced Regenerative Orthopedics
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">High-Pressure 100% Oxygen Therapy</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Hyperbaric Oxygen Therapy (HBOT) delivers 100% medical-grade oxygen at 2.0 to 2.5 times normal atmospheric pressure. This dissolves 15-20 times more oxygen directly into blood plasma and bone marrow, stimulating osteogenesis (bone-growth), promoting rapid capillary neo-vascularization, and eradicating resistant anaerobic bacteria in chronic osteomyelitis.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book HBOT Evaluation</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
              alt="Hyperbaric Oxygen Therapy Suite"
              className="w-full h-72 object-cover rounded-3xl shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HBOTPage;
