import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CalendarCheck, Search, Eye, CheckCircle2, XCircle, Printer, Download, Trash2, ShieldCheck } from 'lucide-react';

const AdminAppointments = () => {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewModal, setViewModal] = useState(null);

  const filtered = appointments.filter((a) => {
    const aptId = a.appointmentId || a.token || '';
    const patient = a.patientName || '';
    const doctor = a.doctorName || '';
    const matchSearch = patient.toLowerCase().includes(search.toLowerCase()) ||
      aptId.toLowerCase().includes(search.toLowerCase()) ||
      doctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || (a.status || 'confirmed').toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <CalendarCheck className="w-5 h-5 text-blue-700" />
            <span>Orthopedic Consultation & Surgery Tokens Queue</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time tracking of booked robotic joint replacement OPDs, fracture reviews, and spine consultations (Total: {appointments.length})</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search by patient name, token ID, or surgeon..."
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs" 
          />
        </div>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 shadow-2xs"
        >
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200 font-bold text-slate-700 uppercase text-[10px] tracking-wider">
                <th className="px-5 py-3.5">Token ID</th>
                <th className="px-5 py-3.5">Patient Name</th>
                <th className="px-5 py-3.5">Consultant Surgeon</th>
                <th className="px-5 py-3.5">Specialty / Procedure Mode</th>
                <th className="px-5 py-3.5">Date & Time Slot</th>
                <th className="px-5 py-3.5">Fee & Mode</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((apt, idx) => {
                const id = apt.appointmentId || apt.token || `ORT${String(idx + 1).padStart(3, '0')}`;
                const time = apt.time || apt.timeSlot || '10:30 AM';
                const fee = apt.fee || apt.consultationFee || 700;
                const status = (apt.status || 'confirmed').toLowerCase();

                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 font-bold text-blue-700 font-mono">{id}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{apt.patientName}</div>
                      <div className="text-[10px] text-slate-400">{apt.mobileNumber}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800">{apt.doctorName}</div>
                      <div className="text-[10px] text-blue-700 font-semibold">{apt.department}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="font-semibold text-slate-800">{apt.sessionType || 'In-Hospital OPD'}</span>
                      <span className="text-[10px] text-slate-400 block">{apt.branchName || 'Main Hospital'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">{apt.date}</div>
                      <div className="text-[10px] text-blue-700 font-medium">{time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-emerald-700">₹{fee}</span>
                      <span className="text-[10px] text-slate-400 block">({apt.paymentMethod || 'UPI / Counter'})</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                        status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        status === 'completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {status !== 'completed' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.appointmentId || apt.token, 'completed')}
                            className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Mark Completed"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {status !== 'cancelled' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.appointmentId || apt.token, 'cancelled')}
                            className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Cancel Token"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(apt.appointmentId || apt.token)}
                          className="p-1.5 bg-slate-100 text-slate-500 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
