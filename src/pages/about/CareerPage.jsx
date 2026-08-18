import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Briefcase, Send, CheckCircle2 } from 'lucide-react';

const CareerPage = () => {
  const jobs = [
    {
      title: 'Senior Consultant Orthopedic Surgeon (MS / DNB)',
      department: 'Robotic Joint Replacement & Arthroplasty',
      experience: '5+ Years Post-MS',
      type: 'Full-Time',
      description: 'Looking for fellowship-trained joint replacement surgeons experienced in primary and revision robotic total knee & hip surgeries.'
    },
    {
      title: 'Consultant Spine & Neuro-Spine Surgeon (MS / MCh)',
      department: 'Minimally Invasive Spine Center',
      experience: '3+ Years Post-MS',
      type: 'Full-Time',
      description: 'Seeking spine surgeons skilled in endoscopic microdiscectomy, MIS-TLIF, and intraoperative neuro-monitoring.'
    },
    {
      title: 'Orthopedic Operation Theatre Scrub Nurse (B.Sc / GNM)',
      department: 'Robotic & Orthopedic OT Suite',
      experience: '2+ Years OT Experience',
      type: 'Full-Time',
      description: 'Role for scrub and circulation nurses trained in orthopedic implant handling, Class-100 laminar sterility, and joint instrumentation.'
    },
    {
      title: 'Orthopedic Rehabilitation Physiotherapist (MPT Ortho)',
      department: 'Inpatient & Post-Surgical Recovery Wing',
      experience: '2+ Years',
      type: 'Full-Time',
      description: 'Conducting Day-1 post-TKR/THR mobilization, continuous passive motion (CPM) training, and spine core rehabilitation.'
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Careers at OrthoCare"
        subtitle="Join South India's premier Institute of Orthopedics & Robotic Joint Surgery. Work alongside internationally fellowship-trained surgeons."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Careers' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {job.type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{job.experience}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-950 font-heading mt-2">{job.title}</h3>
                <p className="text-xs text-blue-700 font-semibold">{job.department}</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{job.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">careers@orthocarehospital.org</span>
                <a
                  href="mailto:careers@orthocarehospital.org"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
