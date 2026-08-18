import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Award, ShieldCheck, UserCheck } from 'lucide-react';

const ManagementPage = () => {
  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Clinical Leadership & Surgical Governance"
        subtitle="Meet the distinguished orthopedic surgeons and healthcare directors guiding OrthoCare."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Leadership' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
              alt="Dr. Rajeshwar V. Natarajan"
              className="w-32 h-32 rounded-2xl object-cover border-2 border-blue-600 shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-50 px-2.5 py-0.5 rounded-md">Medical Director & Chief of Surgery</span>
              <h3 className="text-base font-bold text-slate-950 font-heading">Dr. Rajeshwar V. Natarajan, MS (Ortho), MCh, FIJR</h3>
              <p className="text-xs text-slate-500">22+ Years Experience • Fellow Joint Replacement (Germany)</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Overseeing robotic surgical protocols, Stryker Mako integration, and joint preservation standards across all hospital surgical suites.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80"
              alt="Dr. Arun Sharma"
              className="w-32 h-32 rounded-2xl object-cover border-2 border-blue-600 shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-50 px-2.5 py-0.5 rounded-md">Director of Spine Surgery</span>
              <h3 className="text-base font-bold text-slate-950 font-heading">Dr. Arun Sharma, MS (Ortho, Spine)</h3>
              <p className="text-xs text-slate-500">20+ Years Experience • Fellow AO Spine (Switzerland)</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Pioneering 7mm keyhole endoscopic microdiscectomy, 3D O-Arm navigation, and intraoperative neuro-monitoring protocols.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
