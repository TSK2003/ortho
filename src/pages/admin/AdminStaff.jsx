import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  CheckCircle2,
  Activity,
  ShieldCheck
} from 'lucide-react';

const shiftOptions = [
  'Morning OT Shift (07:00 - 15:00)',
  'Evening Ward Shift (13:00 - 21:00)',
  'Night Emergency Trauma (20:00 - 08:00)',
  'General OPD Shift (09:00 - 18:00)',
  'On-Call Surgical Team'
];

const categoryOptions = [
  'Surgeon', // Senior Orthopedic Surgeon
  'Nursing', // OT Scrub / Inpatient Nurse
  'Technician', // C-Arm / Plaster Technician
  'Administrative'
];

const emptyStaff = {
  empId: '',
  name: '',
  category: 'Surgeon',
  role: '',
  department: 'Robotic Joint Replacement & Arthroplasty',
  assignedWard: 'Robotic Surgical OT-1',
  shift: 'Morning OT Shift (07:00 - 15:00)',
  dutyStatus: 'On Duty',
  phone: '',
  email: '',
  qualification: ''
};

const AdminStaff = () => {
  const {
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    updateStaffDutyStatus,
    updateStaffShift
  } = useAdmin();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedShift, setSelectedShift] = useState('ALL');
  const [selectedDutyStatus, setSelectedDutyStatus] = useState('ALL');

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyStaff });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Workforce Metrics
  const totalStaff = staff.length;
  const onDutyCount = staff.filter((s) => s.dutyStatus === 'On Duty').length;
  const offDutyCount = staff.filter((s) => s.dutyStatus === 'Off Duty').length;
  const onLeaveCount = staff.filter((s) => s.dutyStatus === 'On Leave').length;

  // Filtered List
  const filteredStaff = staff.filter((s) => {
    const matchCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchShift = selectedShift === 'ALL' || s.shift === selectedShift;
    const matchStatus = selectedDutyStatus === 'ALL' || s.dutyStatus === selectedDutyStatus;
    const matchSearch =
      (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.empId || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.role || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.department || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.assignedWard || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchShift && matchStatus && matchSearch;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm({
      ...emptyStaff,
      empId: `ORT-EMP-${Math.floor(100 + Math.random() * 900)}`
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.role) return;

    if (editingId) {
      updateStaff(editingId, form);
    } else {
      addStaff({
        ...form,
        id: `staff-${Date.now()}`
      });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteStaff(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <Users className="w-5 h-5 text-blue-700" />
            <span>Orthopedic Surgeons, OT & Clinical Staff Workforce</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time management of surgical teams, scrub nurses, plaster techs, and duty rosters.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Workforce KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Clinical Staff</span>
          <p className="text-2xl font-black text-slate-950 font-heading">{totalStaff}</p>
          <span className="text-[10px] text-blue-700 font-semibold">Hospital Roster</span>
        </div>
        <div className="bg-emerald-50/60 p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-emerald-800 uppercase">On Duty</span>
          <p className="text-2xl font-black text-emerald-900 font-heading">{onDutyCount}</p>
          <span className="text-[10px] text-emerald-700 font-medium">In Operating OT & Wards</span>
        </div>
        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Off Duty</span>
          <p className="text-2xl font-black text-slate-800 font-heading">{offDutyCount}</p>
          <span className="text-[10px] text-slate-400 font-medium">Next Shift Scheduled</span>
        </div>
        <div className="bg-amber-50/60 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-amber-800 uppercase">On Leave</span>
          <p className="text-2xl font-black text-amber-900 font-heading">{onLeaveCount}</p>
          <span className="text-[10px] text-amber-700 font-medium">Approved Medical Leave</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, employee ID, role, or surgical ward..."
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs"
          />
        </div>
        <select
          value={selectedDutyStatus}
          onChange={(e) => setSelectedDutyStatus(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 shadow-2xs"
        >
          <option value="ALL">All Duty Statuses</option>
          <option value="On Duty">On Duty</option>
          <option value="Off Duty">Off Duty</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200 font-bold text-slate-700 uppercase text-[10px] tracking-wider">
                <th className="px-5 py-3.5">Emp ID & Name</th>
                <th className="px-5 py-3.5">Role & Category</th>
                <th className="px-5 py-3.5">Specialty & Assigned Unit</th>
                <th className="px-5 py-3.5">Current Shift</th>
                <th className="px-5 py-3.5">Duty Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((item) => {
                const isOnDuty = item.dutyStatus === 'On Duty';
                const isOnLeave = item.dutyStatus === 'On Leave';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-950">{item.name}</div>
                      <div className="text-[10px] text-blue-700 font-mono font-semibold">{item.empId}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{item.role}</div>
                      <div className="text-[10px] text-slate-500">{item.qualification}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800">{item.department}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{item.assignedWard}</div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={item.shift}
                        onChange={(e) => updateStaffShift(item.id, e.target.value)}
                        className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-800 focus:outline-none"
                      >
                        {shiftOptions.map((sh, idx) => (
                          <option key={idx} value={sh}>{sh}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={item.dutyStatus}
                        onChange={(e) => updateStaffDutyStatus(item.id, e.target.value)}
                        className={`p-1.5 rounded-lg text-[10px] font-bold uppercase border ${
                          isOnDuty ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                          isOnLeave ? 'bg-amber-50 text-amber-800 border-amber-300' :
                          'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        <option value="On Duty">On Duty</option>
                        <option value="Off Duty">Off Duty</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">
                {editingId ? 'Edit Staff Member' : 'Add New Clinical Staff'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Emp ID</label>
                  <input
                    type="text"
                    value={form.empId}
                    onChange={(e) => setForm({ ...form, empId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Senior Scrub Nurse"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    placeholder="e.g. B.Sc (Nursing), OT Tech"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned OT / Ward</label>
                  <input
                    type="text"
                    value={form.assignedWard}
                    onChange={(e) => setForm({ ...form, assignedWard: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                >
                  Save Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Remove Staff Member?</h3>
            <p className="text-xs text-slate-500">This action cannot be undone.</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="w-1/2 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="w-1/2 py-2 bg-red-600 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminStaff;
