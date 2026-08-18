import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Robotic Joint Replacement Estimate',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-r from-slate-950 to-blue-950 p-5 text-white flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 bg-blue-900/80 text-blue-300 rounded text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Orthopedic Surgery Enquiry
              </span>
              <h3 className="text-base font-bold font-heading">Second Opinion & Cost Estimate</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-heading">Surgery Enquiry Received</h4>
            <p className="text-slate-600 text-xs leading-relaxed max-w-xs mx-auto">
              Thank you. Our Senior Orthopedic Clinical Coordinator will call you back within 30 minutes at <span className="font-bold text-blue-700">{formData.phone}</span> with cost estimates & doctor availability.
            </p>
            <button
              onClick={handleReset}
              className="mt-3 px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Patient Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Sundaram"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98401 23456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Procedure or Category</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs"
              >
                <option value="Robotic Joint Replacement Estimate">Robotic Knee / Hip Replacement Estimate</option>
                <option value="Minimally Invasive Spine Surgery Second Opinion">Minimally Invasive Spine Surgery Second Opinion</option>
                <option value="Arthroscopic ACL / Sports Injury Care">Arthroscopic ACL / Sports Injury Care</option>
                <option value="Complex Fracture & Non-Union Salvage">Complex Fracture & Non-Union Salvage</option>
                <option value="Pediatric Clubfoot & Deformity Correction">Pediatric Clubfoot & Deformity Correction</option>
                <option value="Cashless Insurance Pre-Authorization">Cashless Insurance Pre-Authorization</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Describe Symptoms or Upload Need</label>
              <textarea
                rows="3"
                placeholder="Mention joint pain duration, prior X-Ray/MRI findings, or specific surgeon preference..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 text-xs font-semibold hover:text-slate-900 cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>Request Callback & Estimate</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
