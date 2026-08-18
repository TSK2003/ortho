import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Calendar,
  CheckCircle2,
  Mail,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { branchesList as defaultBranches } from '../data/branchesData';
import { useAdmin } from '../context/AdminContext';

const BranchesPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const branchesList = adminContext?.branches || defaultBranches;
  const hospitalInfo = adminContext?.hospitalInfo || { name: 'OrthoCare', fullName: 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery' };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-10">
      
      <PageHero
        title="Our Orthopedic Hospitals & Surgical Campuses"
        subtitle="Locate your nearest OrthoCare hospital for specialized robotic joint surgery, 24/7 Level-1 fracture trauma, spine care, and sports rehabilitation."
        breadcrumb={[{ label: 'Hospitals & Clinics' }]}
      />

      {/* BRANCHES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {branchesList.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:border-blue-500 hover:shadow-xl transition-all group"
            >
              {/* Branch Image */}
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/90 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider border border-slate-700">
                  {branch.city}
                </div>
                {branch.isMain && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    Main Surgical Campus
                  </div>
                )}
              </div>

              {/* Branch Details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-700 transition-colors font-heading">
                      {branch.name}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Address */}
                    <div className="flex items-start space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                      <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href={`tel:${branch.phone || branch.mobile}`} className="hover:text-blue-700">
                        {branch.phone || branch.mobile}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start space-x-2 text-slate-600">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{branch.timing || branch.timings}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {(branch.features || branch.facilities || []).map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-blue-50 text-blue-800 text-[11px] font-medium rounded-lg border border-blue-100"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors border border-slate-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>

                  <button
                    onClick={() => onOpenAppointment && onOpenAppointment({ branchName: branch.name, branchId: branch.id })}
                    className="w-full sm:w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book at this Campus</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BranchesPage;
