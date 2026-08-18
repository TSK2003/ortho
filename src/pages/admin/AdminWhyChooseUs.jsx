import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Award, Save, RotateCcw, Plus, Trash2, ShieldCheck } from 'lucide-react';

const AdminWhyChooseUs = () => {
  const { whyChooseUs, setWhyChooseUs } = useAdmin();
  const [items, setItems] = useState([...whyChooseUs]);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setWhyChooseUs([...items]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { title: 'New Surgical Advantage', desc: 'Description of orthopedic surgical excellence...', icon: 'ShieldCheck' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const iconOptions = ['ShieldCheck', 'Cpu', 'Award', 'Zap', 'Building2', 'Activity', 'Clock', 'Stethoscope'];

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
          <Award className="w-5 h-5 text-blue-700" />
          <span>Why Choose Us Surgical Clinical Highlights</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Customize the institutional surgical trust highlights and orthopedic advantages displayed on the landing page.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Highlight Card #{idx + 1}</span>
              <button type="button" onClick={() => removeItem(idx)} className="p-1 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Feature Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(idx, 'title', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Icon Representation</label>
                <select
                  value={item.icon}
                  onChange={(e) => updateItem(idx, 'icon', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-semibold"
                >
                  {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
            </div>
            <div className="text-xs">
              <label className="block font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={item.desc}
                onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="w-full py-3.5 bg-white hover:bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4 text-blue-700" />
          <span>Add New Surgical Advantage Card</span>
        </button>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setItems([...whyChooseUs])}
            className="px-3.5 py-2 text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Saved</span>
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? 'Saved Successfully' : 'Save Highlights'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminWhyChooseUs;
