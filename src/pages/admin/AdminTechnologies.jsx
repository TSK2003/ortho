import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Cpu, Plus, Pencil, Trash2, X, Save, Search, ShieldCheck, Sparkles } from 'lucide-react';

const AdminTechnologies = () => {
  const { technologies, addTechnology, updateTechnology, deleteTechnology } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', category: 'Robotic Surgery', heroImage: '', description: '', badge: '' });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = technologies.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || (t.category && t.category.toLowerCase().includes(search.toLowerCase())));

  const openAdd = () => { 
    setEditingId(null); 
    setForm({ 
      name: '', 
      slug: '', 
      category: 'Robotic Surgery', 
      heroImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', 
      description: '', 
      badge: 'Sub-Millimeter Precision' 
    }); 
    setShowForm(true); 
  };
  
  const openEdit = (item) => { 
    setEditingId(item.id); 
    setForm({ ...item, heroImage: item.heroImage || item.image }); 
    setShowForm(true); 
  };

  const handleSave = (e) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const updatedData = { ...form, slug, image: form.heroImage };
    if (editingId) { 
      updateTechnology(editingId, updatedData); 
    } else { 
      addTechnology(updatedData); 
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <Cpu className="w-5 h-5 text-blue-700" />
            <span>Robotic Surgical Suites & Orthopedic Tech</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage Stryker Mako, Medtronic 3D O-Arm, 4K Storz Arthroscopy, and Class-100 Laminar OT suites (Total: {technologies.length})</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" /><span>Add Robotic Tech</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search surgical technologies..."
          className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tech) => (
          <div key={tech.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-44 w-full bg-slate-950 overflow-hidden relative">
              <img src={tech.heroImage || tech.image} alt={tech.name} className="h-full w-full object-cover" />
              {tech.badge && (
                <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {tech.badge}
                </div>
              )}
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">{tech.category}</span>
                  <h3 className="font-bold text-sm text-slate-950 font-heading leading-snug">{tech.name}</h3>
                </div>
                <div className="flex items-center space-x-1 shrink-0">
                  <button onClick={() => openEdit(tech)} className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteConfirm(tech.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{tech.description}</p>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-3 border border-slate-200 text-xs">
            <h3 className="text-base font-bold text-slate-950 font-heading">Delete Technology?</h3>
            <p className="text-slate-500">This will remove the technology record from the public showcase.</p>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-3.5 py-2 bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 rounded-xl">Cancel</button>
              <button onClick={() => { deleteTechnology(deleteConfirm); setDeleteConfirm(null); }} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-4 max-h-[90vh] overflow-y-auto border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">{editingId ? 'Edit Technology' : 'Add New Robotic Suite'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Equipment Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Stryker Mako 4th Gen Robotic Arm" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge Highlight</label>
                  <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. 0.5mm Accuracy" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs resize-none" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input type="text" value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
              </div>
              <div className="pt-3 flex space-x-2">
                <button type="button" onClick={() => setShowForm(false)} className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-sm cursor-pointer">Save Technology</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTechnologies;
