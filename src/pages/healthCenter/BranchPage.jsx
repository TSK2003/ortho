import React from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../../components/common/PageHero';
import { branchesList as defaultBranches } from '../../data/branchesData';
import { useAdmin } from '../../context/AdminContext';
import { MapPin, Phone, Mail, Clock, CheckCircle, Calendar, PhoneCall, ShieldCheck } from 'lucide-react';

const BranchPage = ({ onOpenAppointment }) => {
  const { branchId } = useParams();
  const adminContext = useAdmin();
  const branchesList = adminContext?.branches || defaultBranches;

  const branch = branchesList.find((b) => b.id === branchId || b.slug === branchId) || branchesList[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title={branch.name}
        subtitle={`${branch.city} • Advanced Orthopedic Hospital & Fracture Care Center`}
        breadcrumb={[{ label: 'Hospitals & Clinics', path: '/branches' }, { label: branch.name }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Banner Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
              Surgical Campus
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">{branch.name}</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Equipped with Class-100 Laminar Operating Theatres, emergency digital C-arm fracture imaging, and Chief Orthopedic Surgeons.
            </p>
            
            <div className="space-y-2 text-xs text-slate-700 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.phone || branch.mobile}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.timing || branch.timings}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-3">
              <button
                onClick={() => onOpenAppointment && onOpenAppointment({ branchId: branch.id, branchName: branch.name })}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 cursor-pointer transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment at this Campus</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img src={branch.image} alt={branch.name} className="w-full h-72 object-cover rounded-3xl shadow-sm" />
          </div>
        </div>

        {/* Facilities Available */}
        {(branch.features || branch.facilities) && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-950 font-heading">Orthopedic & Surgical Infrastructure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(branch.features || branch.facilities).map((service, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">{service}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BranchPage;
