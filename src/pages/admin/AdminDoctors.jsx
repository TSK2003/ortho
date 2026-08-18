import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { UserRound, Plus, Pencil, Trash2, X, Save, Search, ShieldCheck } from 'lucide-react';

const emptyDoctor = {
  name: '', 
  qualification: 'MS (Ortho), MCh, FIJR (Germany)', 
  department: 'Robotic Joint Replacement & Arthroplasty', 
  branchId: 'main-campus', 
  experience: '15+ Years',
  image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
  bio: 'Specialist in robotic total knee and anterior hip replacement.', 
  timing: 'Mon - Sat: 09:00 AM - 02:00 PM',
};

const AdminDoctors = () => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor, branches } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyDoctor });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.department.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyDoctor });
    setShowForm(true);
  };

  const openEdit = (doc) => {
    setEditingId(doc.id);
    setForm({ ...doc });
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      updateDoctor(editingId, form);
    } else {
      addDoctor(form);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    deleteDoctor(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <UserRound className="w-5 h-5 text-blue-700" />
            <span>Chief Orthopedic Surgeons Directory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage consultant surgeons, qualifications, fellowships, and OPD consultation hours (Total: {doctors.length})</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add Surgeon</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by surgeon name or orthopedic subspecialty..."
          className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200 font-bold text-slate-700 uppercase text-[10px] tracking-wider">
                <th className="px-5 py-3.5">Consultant Surgeon</th>
                <th className="px-5 py-3.5">Specialty</th>
                <th className="px-5 py-3.5">Qualifications</th>
                <th className="px-5 py-3.5">Experience</th>
                <th className="px-5 py-3.5">OPD Timing</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shadow-2xs" />
                      <span className="font-bold text-slate-950 font-heading">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-blue-700">{doc.department}</td>
                  <td className="px-5 py-4 text-slate-600">{doc.qualification}</td>
                  <td className="px-5 py-4 text-slate-600 font-semibold">{doc.experience}</td>
                  <td className="px-5 py-4 text-slate-600">{doc.timing}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => openEdit(doc)}
                        className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(doc.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">
                {editingId ? 'Edit Surgeon' : 'Add New Surgeon'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Name *</label>
                <input
                  type="text" required
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. Rajeshwar V. Natarajan"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialty Department *</label>
                  <input
                    type="text" required
                    value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 18+ Years"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Qualifications & Fellowships</label>
                <input
                  type="text"
                  value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  placeholder="e.g. MS (Ortho), MCh, Fellow AO Spine"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">OPD Timings</label>
                <input
                  type="text"
                  value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })}
                  placeholder="e.g. Mon - Sat: 09:00 AM - 02:00 PM"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Clinical Bio</label>
                <textarea
                  rows="3"
                  value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                />
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button" onClick={() => setShowForm(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                >
                  Save Surgeon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Remove Surgeon Record?</h3>
            <p className="text-xs text-slate-500">This will remove the doctor from OPD scheduling.</p>
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

export default AdminDoctors;
