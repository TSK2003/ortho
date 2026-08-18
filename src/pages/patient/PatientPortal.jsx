import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Download, 
  Printer, 
  FileText, 
  Activity, 
  LogOut, 
  Phone, 
  ShieldCheck, 
  Stethoscope, 
  AlertCircle,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Zap,
  TrendingUp,
  Play,
  Award
} from 'lucide-react';

const PatientPortal = ({ onOpenAppointment }) => {
  const navigate = useNavigate();
  const { appointments, hospitalInfo, beds } = useAdmin();

  // Active patient session (demo)
  const patientData = {
    name: 'Karthick S',
    phone: '+91 63807 67265',
    email: 'karthick@example.com',
    age: '28 Yrs',
    bloodGroup: 'O+ Positive',
    uhid: 'UHID-ORT-88492',
    surgicalHistory: 'Mako Robotic Knee Replacement & ACL Reconstruction (Right Leg)'
  };

  // Find appointments related to this patient or fallback
  const patientAppointments = appointments.length > 0 ? appointments : [
    {
      appointmentId: 'ORT001',
      token: 'ORT001',
      patientName: 'Karthick S',
      doctorName: 'Dr. Rajeshwar V. Natarajan, MS (Ortho)',
      department: 'Robotic Joint Replacement & Arthroplasty',
      date: '2026-08-19',
      time: '10:30 AM',
      sessionType: 'Post-Surgical Review & Digital X-Ray',
      fee: 700,
      paymentMethod: 'Instant UPI (Paid)',
      status: 'confirmed',
      branchName: 'OrthoCare Main Institute & Surgical Hospital'
    }
  ];

  const [activeSlip, setActiveSlip] = useState(patientAppointments[0] || null);

  // Prescribed Home Ortho Recovery Protocols
  const prescribedExercises = [
    { name: 'Continuous Passive Motion (CPM) Knee Flexion', reps: '0° to 95° (20 mins)', focus: 'Cartilage Mobilization & Scar Prevention', status: 'Completed Morning' },
    { name: 'Isometric Quadriceps & Straight Leg Raise', reps: '15 reps (5-sec hold) x 3 sets', focus: 'Patellar Tracking & Extensor Strength', status: 'Completed Morning' },
    { name: 'Ankle Pumps & Deep Vein Thrombosis (DVT) Drills', reps: '30 reps every 2 hours', focus: 'Venous Return & Swelling Reduction', status: 'Active Hourly' },
    { name: 'Cryo-Pneumatic Cold Compression (Game Ready)', reps: '15 mins post-exercise', focus: 'Pain & Effusion Control', status: 'Pending Evening' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSlip = (apt) => {
    const text = `
=====================================================
      ORTHOCARE INSTITUTE OF ORTHOPEDICS & TRAUMA
              OFFICIAL OPD CONSULTATION SLIP
=====================================================
TOKEN NUMBER       : ${apt.appointmentId || apt.token}
PATIENT UHID       : ${patientData.uhid}
PATIENT NAME       : ${apt.patientName || patientData.name}
PHONE NUMBER       : ${apt.mobileNumber || patientData.phone}
AGE / GENDER       : ${patientData.age} / ${patientData.bloodGroup}
-----------------------------------------------------
ORTHOPEDIC SPECIALTY: ${apt.department}
CONSULTANT SURGEON : ${apt.doctorName}
CONSULTATION TYPE  : ${apt.sessionType || 'Post-Op Review'}
APPOINTMENT DATE   : ${apt.date}
TIME SLOT          : ${apt.time || apt.timeSlot}
CAMPUS LOCATION    : ${apt.branchName || 'Main Surgical Hospital'}
-----------------------------------------------------
CONSULTATION FEE   : Rs. ${apt.fee || 700} (CONFIRMED)
PAYMENT MODE       : ${apt.paymentMethod || 'UPI / Counter'}
STATUS             : CONFIRMED (PRIORITY SURGICAL QUEUE)
-----------------------------------------------------
24/7 TRAUMA HOTLINE: 1800-419-6784
HOSPITAL DESK      : ${hospitalInfo?.phone || '+91 98401 23456'}
=====================================================
Please bring your digital X-Ray barcode and implant warranty card.
    `;
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `OrthoCare_Slip_${apt.appointmentId || apt.token}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 antialiased pb-20">
      
      {/* Top Navbar */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-white block uppercase font-heading">
                {hospitalInfo.name || 'ORTHOCARE'} PATIENT PORTAL
              </span>
              <span className="text-[10px] text-blue-400 font-bold block -mt-0.5">
                Orthopedic Medical Records & Recovery Tracker
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Hospital Website
            </Link>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-lg text-xs font-bold transition-colors border border-red-800/50 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Patient Profile Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0 font-heading">
              {patientData.name[0]}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-950 font-heading">{patientData.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  {patientData.uhid}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {patientData.age} • Blood Group: <span className="font-bold text-slate-700">{patientData.bloodGroup}</span> • Mobile: {patientData.phone}
              </p>
              <p className="text-xs text-blue-700 font-semibold">
                Surgical History: {patientData.surgicalHistory}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenAppointment && onOpenAppointment()}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Follow-up OPD</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Appointments & Recovery Progress (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Upcoming / Active Appointments */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-950 flex items-center space-x-2 font-heading">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>My Orthopedic Appointments & Tokens</span>
                </h2>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {patientAppointments.length} Active
                </span>
              </div>

              <div className="space-y-3">
                {patientAppointments.map((apt, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveSlip(apt)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      activeSlip?.token === apt.token || activeSlip?.appointmentId === apt.appointmentId
                        ? 'bg-blue-50/70 border-blue-400 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-black text-blue-700 font-mono">Token #{apt.token || apt.appointmentId}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {apt.status || 'Confirmed'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{apt.department}</h4>
                      <p className="text-[11px] text-slate-500">{apt.doctorName}</p>
                      <p className="text-[11px] text-blue-800 font-semibold">📅 {apt.date} at {apt.time}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadSlip(apt);
                        }}
                        className="p-2.5 bg-white hover:bg-blue-600 hover:text-white text-slate-700 rounded-xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                        title="Download Slip"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescribed Post-Op Rehab & Mobility Routines */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-950 flex items-center space-x-2 font-heading">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Prescribed Orthopedic Recovery Protocol</span>
                </h2>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active Routine
                </span>
              </div>

              <div className="space-y-3">
                {prescribedExercises.map((ex, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">{ex.name}</h4>
                      <p className="text-[11px] text-blue-700 font-semibold">Target: {ex.focus}</p>
                      <p className="text-[11px] text-slate-500">Dose: {ex.reps}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      {ex.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Digital Slip & Implant Certificate (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Consultation Slip Preview */}
            {activeSlip && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">Official Receipt</span>
                    <h3 className="text-base font-bold text-slate-950 font-heading">OPD Consultation Slip</h3>
                  </div>
                  <span className="text-lg font-black text-blue-700 font-mono">
                    #{activeSlip.token || activeSlip.appointmentId}
                  </span>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient:</span>
                    <span className="font-bold text-slate-900">{activeSlip.patientName || patientData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">UHID:</span>
                    <span className="font-bold text-slate-900">{patientData.uhid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Surgeon:</span>
                    <span className="font-bold text-slate-900">{activeSlip.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-bold text-slate-900">{activeSlip.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Schedule:</span>
                    <span className="font-bold text-blue-800">{activeSlip.date} at {activeSlip.time}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold">
                    <span className="text-slate-500">Consultation Fee:</span>
                    <span className="text-slate-900">₹ {activeSlip.fee || 700} (Paid)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDownloadSlip(activeSlip)}
                    className="py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Slip</span>
                  </button>
                </div>
              </div>
            )}

            {/* Implant Warranty Card & Certifications */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 flex items-center justify-center text-blue-400 border border-blue-500/40">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">Titanium Implant Warranty Card</h4>
                  <p className="text-[11px] text-blue-300">FDA Certified Joint Prosthesis</p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Implant Model:</span>
                  <span className="font-bold text-white">Stryker Triathlon Oxinium Knee</span>
                </div>
                <div className="flex justify-between">
                  <span>Serial Barcode:</span>
                  <span className="font-mono text-blue-300">STR-98214-USA</span>
                </div>
                <div className="flex justify-between">
                  <span>Traceability:</span>
                  <span className="text-emerald-400 font-bold">100% Verified</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Life:</span>
                  <span className="font-bold text-white">25 - 30+ Years</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default PatientPortal;
