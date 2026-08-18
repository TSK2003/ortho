import React from 'react';
import PageHero from '../../components/common/PageHero';
import { chiefDoctorsList as defaultDoctors } from '../../data/doctorsData';
import { useAdmin } from '../../context/AdminContext';
import { Clock, Calendar, MapPin, ShieldCheck } from 'lucide-react';

const ConsultantTimePage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const doctorsList = adminContext?.doctors || defaultDoctors;

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Orthopedic Surgeon OPD Schedule & Consultation Hours"
        subtitle="Check weekly surgical consultation and outpatient timings for all our chief orthopedic and spine faculty."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Surgeon Schedule' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 to-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-heading">Weekly Surgical OPD & Clinic Schedule</h2>
              <p className="text-xs text-slate-300">Prior appointment booking is recommended for minimal OPD wait time</p>
            </div>
            <span className="px-3.5 py-1 bg-blue-600 text-white rounded-xl text-xs font-bold w-fit">
              Mon - Sat (Emergency 24/7)
            </span>
          </div>

          <div className="divide-y divide-slate-200">
            {doctorsList.map((doc) => (
              <div key={doc.id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 font-heading">{doc.name}</h3>
                    <p className="text-[11px] text-blue-700 font-semibold">{doc.department}</p>
                    <span className="text-[10px] text-slate-500">{doc.qualification}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
                  <div className="flex items-center space-x-2 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">{doc.timing}</span>
                  </div>

                  <button
                    onClick={() => onOpenAppointment && onOpenAppointment({ doctorName: doc.name, department: doc.department })}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                  >
                    Book OPD Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantTimePage;
