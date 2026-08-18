import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { MapPin, Plus, Pencil, Trash2, X, Save, Search, ShieldCheck } from 'lucide-react';

const AdminBranches = () => {
  const { branches, addBranch, updateBranch, deleteBranch } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', city: '', address: '', mobile: '', phone: '', email: '', timings: '', timing: '', image: '', facilities: [], features: [] });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [facilitiesText, setFacilitiesText] = useState('');

  const filtered = branches.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || (b.city && b.city.toLowerCase().includes(search.toLowerCase())));

  const openAdd = () => { 
    setEditingId(null); 
    setForm({ 
      name: '', 
      city: 'Tirunelveli', 
      address: '', 
      mobile: '+91 98401 23456', 
      phone: '+91 98401 23456', 
      email: 'info@orthocarehospital.org', 
      timing: 'Mon - Sat: 08:00 AM - 08:00 PM (Emergency 24/7)', 
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80', 
      facilities: [] 
    }); 
    setFacilitiesText(''); 
    setShowForm(true); 
  };

  const openEdit = (item) => { 
    setEditingId(item.id); 
    setForm({ ...item }); 
    setFacilitiesText((item.features || item.facilities || []).join(', ')); 
    setShowForm(true); 
  };

  const handleSave = (e) => {
    e.preventDefault();
    const facilities = facilitiesText.split(',').map((f) => f.trim()).filter(Boolean);
    const updatedData = { 
      ...form, 
      facilities, 
      features: facilities,
      phone: form.phone || form.mobile,
      timing: form.timing || form.timings
    };
    if (editingId) { 
      updateBranch(editingId, updatedData); 
    } else { 
      addBranch(updatedData); 
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <MapPin className="w-5 h-5 text-blue-700" />
            <span>Orthopedic Hospitals & Surgical Campuses</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage hospital campuses, joint replacement centres, and emergency fracture units (Total: {branches.length})</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" /><span>Add Hospital Campus</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search orthopedic hospitals and clinics..."
          className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((branch) => (
          <div key={branch.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-44 w-full bg-slate-950 overflow-hidden">
              <img src={branch.image} alt={branch.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-6 space-y-2 flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-950 font-heading leading-snug">{branch.name}</h3>
                  <span className="text-[11px] text-blue-700 font-semibold">{branch.city}</span>
                </div>
                <div className="flex items-center space-x-1 shrink-0">
                  <button onClick={() => openEdit(branch)} className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteConfirm(branch.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-600">{branch.address}</p>
              <p className="text-xs font-semibold text-slate-900">{branch.phone || branch.mobile}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(branch.features || branch.facilities || []).slice(0, 3).map((f, i) => (
                  <span key={i} className="px-2.5 py-0.5 bg-blue-50 text-blue-800 text-[10px] font-medium rounded-md border border-blue-100">{f}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-3 border border-slate-200 text-xs">
            <h3 className="text-base font-bold text-slate-950 font-heading">Delete Hospital Campus?</h3>
            <p className="text-slate-500">This will remove the campus from public hospital listings.</p>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-3.5 py-2 bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 rounded-xl">Cancel</button>
              <button onClick={() => { deleteBranch(deleteConfirm); setDeleteConfirm(null); }} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-4 max-h-[90vh] overflow-y-auto border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">{editingId ? 'Edit Hospital Campus' : 'Add New Hospital Campus'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Campus Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. OrthoCare City Joint Replacement Clinic" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Helpline Phone</label>
                  <input type="text" value={form.phone || form.mobile} onChange={(e) => setForm({ ...form, phone: e.target.value, mobile: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Address</label>
                <textarea rows="2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Facilities / Specialties (Comma Separated)</label>
                <input type="text" value={facilitiesText} onChange={(e) => setFacilitiesText(e.target.value)}
                  placeholder="Mako Robotics, 3D O-Arm, Daycare OT, DEXA Scan" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
              </div>
              <div className="pt-3 flex space-x-2">
                <button type="button" onClick={() => setShowForm(false)} className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-sm cursor-pointer">Save Campus</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBranches;
