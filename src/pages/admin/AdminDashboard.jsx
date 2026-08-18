import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  UserRound,
  Layers3,
  CalendarCheck,
  Cpu,
  BedDouble,
  Users,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

const StatCard = ({ label, value, subtext, icon: Icon, to, highlight }) => (
  <Link
    to={to}
    className={`bg-white rounded-3xl p-6 border shadow-sm transition-all flex flex-col justify-between ${
      highlight ? 'border-blue-300 bg-blue-50/40 hover:border-blue-500 hover:shadow-md' : 'border-slate-200 hover:border-blue-400 hover:shadow-md'
    }`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-slate-950 mt-1 font-heading">{value}</p>
        {subtext && <p className="text-[11px] text-slate-400 font-medium mt-0.5">{subtext}</p>}
      </div>
      <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center border border-blue-100 shadow-2xs">
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
      <span>Manage ERP Module</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </div>
  </Link>
);

const AdminDashboard = () => {
  const {
    doctors,
    services,
    appointments,
    technologies,
    beds,
    staff
  } = useAdmin();

  // Surgical Wards & ICU Beds metrics
  const totalBeds = beds?.length || 0;
  const occupiedBeds = (beds || []).filter((b) => b.status === 'occupied').length;
  const availableBeds = (beds || []).filter((b) => b.status === 'available').length;
  const sanitizingBeds = (beds || []).filter((b) => b.status === 'sanitizing').length;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Staff metrics
  const totalStaff = staff?.length || 0;
  const onDutyStaff = (staff || []).filter((s) => s.dutyStatus === 'On Duty').length;

  const stats = [
    { label: 'Robotic ICU & Ortho Wards', value: `${occupiedBeds}/${totalBeds} Occupied`, subtext: `${availableBeds} Available (${occupancyRate}% Bed Occupancy)`, icon: BedDouble, to: '/admin/beds', highlight: true },
    { label: 'Surgeons & OT Workforce', value: `${onDutyStaff}/${totalStaff} On Duty`, subtext: 'Active Surgical Teams', icon: Users, to: '/admin/staff', highlight: true },
    { label: 'OPD Tokens & Surgery Queue', value: appointments.length, subtext: 'Active Booking Queue', icon: CalendarCheck, to: '/admin/appointments' },
    { label: 'Chief Orthopedic Surgeons', value: doctors.length, subtext: 'MS / MCh Surgical Faculty', icon: UserRound, to: '/admin/doctors' },
    { label: 'Surgeries & Specialties', value: services.length, subtext: 'Surgical Procedures', icon: Layers3, to: '/admin/departments' },
    { label: 'Robotic Suites & Tech', value: technologies.length, subtext: 'Mako, O-Arm, 4K Storz', icon: Cpu, to: '/admin/technologies' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-950 font-heading">Orthopedic Hospital ERP Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Live inpatient recovery suites, OT schedule, and surgical team management</p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-xl text-xs font-bold border border-blue-200 flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live Surgical Operations</span>
        </span>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* TWO COLUMN LIVE ERP MONITOR: BEDS & APPOINTMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live Bed Occupancy Monitor */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <BedDouble className="w-5 h-5 text-blue-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">Robotic ICU & Ortho Wards Live Status</h2>
            </div>
            <Link to="/admin/beds" className="text-xs font-bold text-blue-700 hover:text-blue-900">
              Manage All Beds →
            </Link>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto">
            {(beds || []).slice(0, 5).map((bed) => (
              <div key={bed.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{bed.bedNumber}</span>
                  <span className="text-slate-500 ml-2">({bed.category})</span>
                  {bed.patientName && (
                    <p className="text-[11px] text-blue-700 font-semibold mt-0.5">
                      Patient: {bed.patientName} • {bed.condition}
                    </p>
                  )}
                </div>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                  bed.status === 'occupied' ? 'bg-amber-100 text-amber-800' : bed.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {bed.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Surgical Appointments Queue */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <CalendarCheck className="w-5 h-5 text-blue-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">Recent Consultation & Surgery Tokens</h2>
            </div>
            <Link to="/admin/appointments" className="text-xs font-bold text-blue-700 hover:text-blue-900">
              View All Queue →
            </Link>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto">
            {(appointments || []).slice(0, 5).map((apt, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-blue-700 font-mono">#{apt.token || apt.appointmentId}</span>
                  <span className="font-bold text-slate-900 ml-2">{apt.patientName}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {apt.department} • {apt.date}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                  {apt.status || 'Confirmed'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
