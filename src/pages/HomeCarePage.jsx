import React from 'react';
import PageHero from '../components/common/PageHero';
import { 
  Activity, 
  Stethoscope, 
  UserCheck, 
  Calendar, 
  PhoneCall, 
  ShieldCheck, 
  Heart,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

const homeCareServices = [
  {
    id: "home-ortho-joint-recovery",
    title: "Post-Op Joint Replacement Home Care",
    icon: ShieldCheck,
    color: "bg-blue-600",
    desc: "Licensed orthopedic physiotherapists and surgical dressing nurses visit post-TKR and post-THR patients at home for wound dressing and guided mobilization.",
    features: ["Total Knee & Hip Replacement Protocol", "Portable CPM Continuous Passive Motion Unit", "Stair Climbing & Fall-Safe Retraining"]
  },
  {
    id: "home-spine-core-rehab",
    title: "Post-Spine Surgery & Sciatica Home Care",
    icon: Activity,
    color: "bg-indigo-600",
    desc: "Specialized core stabilization, log-rolling, and post-microdiscectomy / post-spinal fusion home rehabilitation under surgeon supervision.",
    features: ["Safe Ergonomic Bed Mobility", "McKenzie Spine Directional Exercises", "Nerve Root Flossing & Posture Alignment"]
  },
  {
    id: "home-fracture-cast-care",
    title: "Fracture & Plaster Cast Home Monitoring",
    icon: UserCheck,
    color: "bg-sky-600",
    desc: "Certified orthopedic technicians visit to inspect plaster casts, change sterile dressings, monitor neurovascular distal pulse, and deliver limb elevation aids.",
    features: ["Fiberglass & POP Cast Inspection", "Suture / Staple Removal at Home", "Swelling & Compartment Safety Monitoring"]
  },
  {
    id: "senior-osteoporosis-fall-proof",
    title: "Elderly Bone Health & Fall Prevention",
    icon: Heart,
    color: "bg-emerald-600",
    desc: "Comprehensive home fall-risk audits, non-slip bathroom adaptations, and gentle bone-loading balance routines for osteoporosis patients.",
    features: ["Home Environmental Hazard Audit", "Custom Walker & Cane Fitting", "Balance & Proprioception Training"]
  },
  {
    id: "tele-ortho-consultation",
    title: "Video Tele-Ortho Second Opinion",
    icon: Sparkles,
    color: "bg-purple-600",
    desc: "Connect directly with our Chief Orthopedic Surgeons from home for detailed X-Ray/MRI reviews and surgical second opinions.",
    features: ["HD Digital X-Ray & MRI Screen Sharing", "Surgical Need Assessment", "Electronic Prescription & Recovery Roadmap"]
  },
  {
    id: "sports-return-to-play-home",
    title: "Athletic Return-to-Play Conditioning",
    icon: Award,
    color: "bg-amber-600",
    desc: "Post-ACL reconstruction and sports injury athletes receive home biomechanical agility drills and functional force-plate benchmark testing.",
    features: ["Plyometric & Jumping Kinematics", "Kinesiology Taping & Muscle Activation", "Return-to-Sport Objective Testing"]
  }
];

const HomeCarePage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="OrthoCare Home Recovery & Tele-Ortho Services"
        subtitle="Bringing hospital-grade orthopedic rehabilitation, sterile post-op wound care, and surgeon consultations directly to your doorstep."
        breadcrumb={[{ label: 'Home Recovery' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeCareServices.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${service.color} text-white rounded-2xl flex items-center justify-center shadow-sm`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950 font-heading">{service.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{service.desc}</p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenAppointment && onOpenAppointment({ department: service.title })}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs"
                  >
                    Request Home Visit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HomeCarePage;
