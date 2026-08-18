import React from 'react';
import { Link } from 'react-router-dom';
import { servicesList } from '../../data/servicesData';
import { ChevronRight, Activity, Sparkles, ShieldCheck } from 'lucide-react';

const MegaMenu = ({ onClose }) => {
  return (
    <div className="w-full bg-white shadow-2xl rounded-2xl border border-slate-100 p-6 md:p-8 transform transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Orthopedic Surgeries & Super Specialties</h3>
            <p className="text-xs text-slate-500">Mako robotic joint replacements, keyhole arthroscopy, 3D spine navigation, and trauma care</p>
          </div>
        </div>
        <Link
          to="/services/robotic-knee-replacement"
          onClick={onClose}
          className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center space-x-1"
        >
          <span>View All Procedures</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Specialties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {servicesList.map((dep) => (
          <Link
            key={dep.id}
            to={`/services/${dep.slug}`}
            onClick={onClose}
            className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all border border-transparent hover:border-blue-100"
          >
            <div className="mt-0.5 p-2 bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white rounded-lg transition-colors shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-900 transition-colors leading-tight">
                {dep.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {dep.shortDesc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Equipped with Stryker Mako Robot, Medtronic 3D O-Arm, 4K Arthroscopy & Class-100 Laminar OT</span>
        </div>
        <a
          href="tel:1800-419-6784"
          className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
        >
          24/7 Trauma Helpline: 1800-419-6784
        </a>
      </div>
    </div>
  );
};

export default MegaMenu;
