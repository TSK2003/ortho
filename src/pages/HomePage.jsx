import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ChevronRight, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  UserCheck, 
  Clock, 
  PhoneCall,
  Quote,
  Star,
  Cpu,
  BedDouble,
  Search,
  Check,
  ArrowRight,
  Zap,
  Award,
  Layers,
  Heart,
  Smile,
  Compass,
  CheckCircle2
} from 'lucide-react';

import { servicesList as defaultServices } from '../data/servicesData';
import { branchesList as defaultBranches } from '../data/branchesData';
import { chiefDoctorsList as defaultDoctors } from '../data/doctorsData';
import { technologiesList as defaultTechnologies } from '../data/technologiesData';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { healthPackages } from '../data/healthCenterData';
import { insurancePartners } from '../data/insuranceData';
import { useAdmin } from '../context/AdminContext';

const clinicalHighlights = [
  { number: '12,000+', label: 'Robotic Surgeries Done', subtext: 'Sub-Millimeter Precision' },
  { number: '25+', label: 'Chief Ortho Surgeons', subtext: 'MS & International Fellows' },
  { number: '99.4%', label: 'Surgical Success Rate', subtext: 'NABH Benchmark Standards' },
  { number: '< 0.1%', label: 'Surgical Infection Rate', subtext: 'Class 100 Laminar Airflow OT' },
];

const painCategories = [
  { 
    id: 'knee', 
    name: 'Knee Pain & Arthritis', 
    icon: ShieldCheck, 
    desc: 'Severe knee arthritis, cartilage wear, meniscus tears & ligament injuries.',
    symptoms: ['Grinding / popping sound while walking', 'Difficulty climbing stairs or squatting', 'Morning stiffness lasting > 30 minutes', 'Knee bowing (Varus/Valgus deformity)'],
    recommended: 'Mako Robotic Total/Partial Knee Replacement or Keyhole Arthroscopy',
    serviceSlug: 'robotic-knee-replacement'
  },
  { 
    id: 'spine', 
    name: 'Spine, Neck & Sciatica', 
    icon: Layers, 
    desc: 'Herniated disc (Slip disc), radiating leg sciatica, cervical spondylosis & scoliosis.',
    symptoms: ['Electric shooting pain down the leg or foot', 'Numbness or tingling in toes/fingers', 'Severe low back pain after sitting or standing', 'Loss of grip strength or walking balance'],
    recommended: '7mm Keyhole Endoscopic Microdiscectomy or MIS-TLIF Spine Fusion',
    serviceSlug: 'spine-surgery-microdiscectomy'
  },
  { 
    id: 'hip', 
    name: 'Hip Pain & AVN', 
    icon: Sparkles, 
    desc: 'Avascular Necrosis (AVN) of femoral head, hip osteoarthritis, labral tears.',
    symptoms: ['Deep groin pain radiating to knee', 'Difficulty putting on socks or shoes', 'Limping or uneven leg length', 'Severe pain upon weight bearing'],
    recommended: 'Direct Anterior Muscle-Sparing Total Hip Arthroplasty (THR)',
    serviceSlug: 'total-hip-replacement'
  },
  { 
    id: 'shoulder', 
    name: 'Shoulder & Rotator Cuff', 
    icon: Stethoscope, 
    desc: 'Rotator cuff tears, recurrent shoulder dislocations (Bankart) & frozen shoulder.',
    symptoms: ['Inability to lift arm overhead', 'Severe night pain interrupting sleep', 'Shoulder popping out of joint repeatedly', 'Loss of reaching range of motion'],
    recommended: '4K Arthroscopic Rotator Cuff Repair or Reverse Shoulder Replacement',
    serviceSlug: 'shoulder-rotator-cuff-bankart'
  },
  { 
    id: 'sports', 
    name: 'Sports Injury & Ligament Tears', 
    icon: Activity, 
    desc: 'ACL, PCL, MCL tears, runner’s knee, hamstring tears, ankle sprains.',
    symptoms: ['Sudden knee "pop" during cutting or pivoting', 'Knee giving way / instability while running', 'Rapid swelling within 2 hours of injury', 'Locking or catching in the knee joint'],
    recommended: 'Arthroscopic Anatomic ACL Reconstruction + Internal Brace',
    serviceSlug: 'arthroscopic-acl-sports-surgery'
  },
  { 
    id: 'trauma', 
    name: 'Fractures & Bone Non-Union', 
    icon: Zap, 
    desc: 'High-velocity road accident fractures, open fractures, non-healing bones.',
    symptoms: ['Severe localized pain & inability to bear weight', 'Visible limb deformity or abnormal mobility', 'Non-healing fracture after months (Non-union)', 'Chronic bone infection (Osteomyelitis)'],
    recommended: '24/7 Level-1 Trauma MIPPO Plating & Ilizarov Bone Salvage',
    serviceSlug: 'complex-trauma-ilizarov'
  },
];

const patientStories = [
  {
    name: "S. Senthilkumar (Age 62)",
    location: "Tirunelveli",
    procedure: "Bilateral Mako Robotic Knee Replacement",
    surgeon: "Dr. Rajeshwar V. Natarajan",
    quote: "I was wheelchair-bound due to severe bone-on-bone arthritis. With Dr. Rajeshwar's robotic knee surgery, I was up and walking unassisted 5 hours post-surgery! Now I climb stairs effortlessly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Pooja Radhakrishnan (Age 24)",
    location: "Madurai",
    procedure: "4K Keyhole ACL Reconstruction",
    surgeon: "Dr. Vikramaditya Rao",
    quote: "After tearing my ACL during a state football tournament, I was devastated. Dr. Vikram performed an anatomical ACL reconstruction with internal bracing. I returned to competitive football in 7 months!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "V. Meenakshi (Age 54)",
    location: "Tenkasi",
    procedure: "Full-Endoscopic Microdiscectomy (7mm)",
    surgeon: "Dr. Arun Sharma",
    quote: "Excruciating sciatica leg pain made it impossible to sleep or sit. Dr. Arun performed a 7mm keyhole surgery and I was discharged the exact same evening with 100% pain relief.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
  }
];

const HomePage = ({ onOpenAppointment, onOpenEnquiry }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'OrthoCare',
    tagline: 'Institute of Orthopedics, Robotic Joint Replacement & Spine Surgery',
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784'
  };
  const heroContent = adminContext?.heroContent || {
    badge: 'Robotic Joint & Spine Center of Excellence',
    heading: 'Pioneering Sub-Millimeter Robotic Joint Surgery & Advanced Spine Care',
    description: 'Mako 4th Gen robotic-arm total knee and anterior hip replacements, 3D navigated endoscopic spine surgery, 4K keyhole sports arthroscopy, and 24/7 Level-1 fracture trauma care.',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85',
    emergencyLabel: '24/7 Fracture & Orthopedic Trauma Hotline',
    emergencyHotline: '1800-419-6784'
  };
  const servicesList = adminContext?.services || defaultServices;
  const chiefDoctorsList = adminContext?.doctors || defaultDoctors;
  const technologiesList = adminContext?.technologies || defaultTechnologies;
  const blogPosts = adminContext?.blogPosts || defaultBlogPosts;
  const beds = adminContext?.beds || [];

  const [selectedPain, setSelectedPain] = useState('knee');

  const activePainObj = painCategories.find((p) => p.id === selectedPain) || painCategories[0];
  const occupiedCount = beds.filter((b) => b.status === 'occupied').length;
  const availableCount = beds.filter((b) => b.status === 'available').length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{heroContent.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-heading">
                {heroContent.heading}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                {heroContent.description}
              </p>

              {/* Primary Hero Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenAppointment()}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Orthopedic Consultation</span>
                </button>

                <button
                  onClick={onOpenEnquiry}
                  className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm rounded-xl border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer backdrop-blur-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Second Opinion / Surgery Cost</span>
                </button>
              </div>

              {/* 24/7 Trauma Ribbon */}
              <div className="pt-2">
                <a
                  href={`tel:${heroContent.emergencyHotline?.replace(/[^0-9+]/g, '') || '1800-419-6784'}`}
                  className="inline-flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-amber-950/40 border border-amber-900/50 hover:bg-amber-950/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <PhoneCall className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                      {heroContent.emergencyLabel || '24/7 Level-1 Fracture & Trauma Helpline'}
                    </span>
                    <span className="text-sm font-extrabold text-amber-400 font-mono">
                      {heroContent.emergencyHotline || '1800-419-6784'}
                    </span>
                  </div>
                </a>
              </div>

            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 group">
                <img
                  src={heroContent.heroImage}
                  alt="OrthoCare Robotic Joint Replacement Surgery"
                  className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                
                {/* Floating Live Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-bold text-white">Stryker Mako Robotic Suite</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-950 px-2 py-0.5 rounded-md border border-blue-800">
                      Active In OT 1
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Sub-millimeter 3D CT mapping protecting healthy bone & ensuring 25-30+ year knee & hip longevity.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CLINICAL METRICS HIGHLIGHT BAR */}
      <section className="bg-white border-b border-slate-200 py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {clinicalHighlights.map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-blue-700 font-heading">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE JOINT PAIN SYMPTOM CHECKER */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
              Interactive Diagnostic Navigator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
              Where Are You Experiencing Bone or Joint Pain?
            </h2>
            <p className="text-slate-600 text-sm">
              Select your affected joint to view common symptoms, diagnostic indicators, and recommended orthopedic procedures.
            </p>
          </div>

          {/* Joint Buttons Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {painCategories.map((pain) => {
              const IconComp = pain.icon;
              const isActive = selectedPain === pain.id;
              return (
                <button
                  key={pain.id}
                  onClick={() => setSelectedPain(pain.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isActive
                      ? 'bg-blue-700 text-white border-blue-700 shadow-lg scale-102'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold leading-tight font-heading">{pain.name}</h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Pain Detail Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Clinical Assessment & Pathway</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  {activePainObj.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activePainObj.desc}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Common Clinical Indicators:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activePainObj.symptoms.map((symptom, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mt-4">
                  <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-1">
                    Recommended Orthopedic Procedure:
                  </span>
                  <p className="text-xs font-bold text-blue-800">
                    {activePainObj.recommended}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 space-y-4">
                <h4 className="text-base font-bold font-heading">Consult an Ortho Specialist</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Get a comprehensive digital X-ray review and clinical physical examination with our senior orthopedic surgeons.
                </p>
                
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => onOpenAppointment({ department: activePainObj.recommended })}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation for {activePainObj.name.split(' ')[0]}</span>
                  </button>

                  <Link
                    to={`/services/${activePainObj.serviceSlug}`}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>Read Complete Procedure Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. KEY ORTHOPEDIC SURGERIES & SPECIALTIES */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                Surgical Centers of Excellence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
                Specialized Orthopedic Surgeries & Procedures
              </h2>
              <p className="text-slate-600 text-sm">
                From sub-millimeter robotic knee replacements to keyhole endoscopic spine decompression, explore our surgical departments.
              </p>
            </div>
            
            <Link
              to="/services/robotic-knee-replacement"
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center space-x-1 shrink-0"
            >
              <span>Explore All Procedures</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Specialties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/80 backdrop-blur-xs">
                        Center of Excellence
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-700 transition-colors font-heading">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>

                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      {service.treatments.slice(0, 3).map((treatment, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-[11px] text-slate-700">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{treatment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 bg-white">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1"
                  >
                    <span>View Surgical Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onOpenAppointment({ department: service.title })}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CUTTING-EDGE TECHNOLOGY & ROBOTIC SUITE */}
      <section className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider px-3 py-1 bg-blue-900/60 rounded-full border border-blue-700">
              State-of-the-Art Technology
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Next-Generation Robotic & Intraoperative Systems
            </h2>
            <p className="text-slate-300 text-sm">
              We invest in world-leading surgical technologies to ensure unmatched precision, minimized pain, and zero prosthetic infection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technologiesList.slice(0, 3).map((tech) => (
              <div
                key={tech.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={tech.heroImage}
                      alt={tech.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider shadow-md">
                        {tech.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors font-heading">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {tech.shortDesc}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {tech.keyBenefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-400">
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/technologies/${tech.slug}`}
                    className="w-full py-2.5 bg-slate-800 hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>Read Technology Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/technologies"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-bold text-xs border border-blue-500/30 transition-colors"
            >
              <span>Explore All 6 Advanced Orthopedic Modalities</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. CHIEF ORTHOPEDIC SURGEONS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                Senior Clinical Faculty
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
                Meet Our Chief Orthopedic Surgeons
              </h2>
              <p className="text-slate-600 text-sm">
                Distinguished orthopedic and spine surgeons with fellowship credentials from premier surgical centers in Germany, the UK, and Switzerland.
              </p>
            </div>
            
            <Link
              to="/about/doctors"
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center space-x-1 shrink-0"
            >
              <span>View Full Surgeon Roster</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chiefDoctorsList.slice(0, 3).map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-60 overflow-hidden relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-bold text-white bg-blue-600 px-2.5 py-1 rounded-md">
                        {doctor.experience} Clinical Experience
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-base font-bold text-slate-950 font-heading">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-700">
                      {doctor.department}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {doctor.bio}
                    </p>
                    <div className="flex items-center space-x-1 text-[11px] text-slate-600 pt-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{doctor.timing}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenAppointment({ doctorName: doctor.name, department: doctor.department })}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation with {doctor.name.split(' ')[1]}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. PATIENT RECOVERY STORIES */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
              Verified Patient Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
              Real Patients, Restored Pain-Free Mobility
            </h2>
            <p className="text-slate-600 text-sm">
              Read how robotic joint replacements, keyhole arthroscopy, and spine decompression helped our patients regain active lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patientStories.map((story, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(story.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center space-x-3">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{story.name}</h4>
                    <span className="text-[10px] text-blue-700 font-semibold block">{story.procedure}</span>
                    <span className="text-[10px] text-slate-500 block">{story.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. MASTER BONE & JOINT HEALTH PACKAGES */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
              Preventive Bone & Joint Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
              Bone Mineral & Arthritis Screening Packages
            </h2>
            <p className="text-slate-600 text-sm">
              Early detection of osteoporosis, cartilage wear, and spine degeneration prevents severe fractures and chronic pain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                    {pkg.badge}
                  </span>
                  
                  <h3 className="text-sm font-bold text-slate-950 leading-snug font-heading">
                    {pkg.title}
                  </h3>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-black text-blue-700 font-mono">{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through font-mono">{pkg.originalPrice}</span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-tight">
                    {pkg.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    {pkg.tests.slice(0, 4).map((test, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="truncate">{test}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenAppointment({ department: pkg.title })}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Book Health Package
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CASHLESS TPA INSURANCE PARTNERS */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              100% Cashless Surgery Support
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Empanelled with All Major Insurance TPAs & Government Schemes
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {insurancePartners.map((partner) => (
              <div
                key={partner.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1 hover:border-blue-400 transition-colors"
              >
                <div className="text-xs font-bold text-slate-900">{partner.name}</div>
                <div className="text-[10px] text-emerald-700 font-semibold">{partner.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black font-heading">
              Need Expert Advice on Knee, Hip, or Spine Surgery?
            </h2>
            <p className="text-sm text-blue-100 max-w-xl">
              Get an accurate second opinion and customized surgical plan from our Chief Orthopedic Surgeons today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenAppointment()}
              className="px-6 py-3.5 bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Book OPD Appointment
            </button>
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-3.5 bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs rounded-xl border border-blue-400/40 transition-all cursor-pointer"
            >
              Request Surgery Cost
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
