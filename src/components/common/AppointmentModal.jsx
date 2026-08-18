import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Printer, 
  FileText, 
  CreditCard, 
  Send, 
  MessageSquare, 
  AlertCircle, 
  QrCode, 
  Sparkles,
  Activity
} from 'lucide-react';
import { branchesList as fallbackBranches } from '../../data/branchesData';
import { chiefDoctorsList as fallbackDoctors } from '../../data/doctorsData';
import { servicesList as fallbackServices } from '../../data/servicesData';
import { useAdmin } from '../../context/AdminContext';

const AppointmentModal = ({ isOpen, onClose, initialData = {} }) => {
  const adminContext = useAdmin();
  const branchesList = adminContext?.branches || fallbackBranches;
  const chiefDoctorsList = adminContext?.doctors || fallbackDoctors;
  const servicesList = adminContext?.services || fallbackServices;
  const appointments = adminContext?.appointments || [];
  const addAppointment = adminContext?.addAppointment;
  const hospitalInfo = adminContext?.hospitalInfo || { 
    name: 'OrthoCare', 
    fullName: 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery',
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784'
  };

  // Helper to filter orthopedic surgeons based on selected department
  const filterDoctorsByDept = (deptName) => {
    if (!deptName) return chiefDoctorsList;
    const lowerDept = deptName.toLowerCase();
    
    const matched = chiefDoctorsList.filter((doc) => {
      const docDept = (doc.department || '').toLowerCase();
      const docBio = (doc.bio || '').toLowerCase();
      return docDept.includes(lowerDept) || lowerDept.includes(docDept) ||
        (lowerDept.includes('joint') && docDept.includes('joint')) ||
        (lowerDept.includes('knee') && (docDept.includes('joint') || docDept.includes('knee'))) ||
        (lowerDept.includes('hip') && (docDept.includes('joint') || docDept.includes('hip'))) ||
        (lowerDept.includes('spine') && docDept.includes('spine')) ||
        (lowerDept.includes('sport') && docDept.includes('sport')) ||
        (lowerDept.includes('trauma') && docDept.includes('trauma')) ||
        (lowerDept.includes('fracture') && docDept.includes('trauma')) ||
        (lowerDept.includes('pediatric') && docDept.includes('pediatric')) ||
        (lowerDept.includes('hand') && docDept.includes('hand'));
    });

    if (matched.length > 0) return matched;
    return chiefDoctorsList;
  };

  // Check if a specific time slot is already booked for the chosen surgeon on the chosen date
  const isSlotBooked = (doctorName, date, slot) => {
    return appointments.some((apt) => {
      const docMatch = (apt.doctorName || '').toLowerCase().trim() === (doctorName || '').toLowerCase().trim();
      const dateMatch = (apt.date || '').trim() === (date || '').trim();
      const timeMatch = (apt.time || apt.timeSlot || '').toLowerCase().trim() === slot.toLowerCase().trim();
      const active = (apt.status || 'confirmed').toLowerCase() !== 'cancelled';
      return docMatch && dateMatch && timeMatch && active;
    });
  };

  // State
  const [isSuccess, setIsSuccess] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState(null);
  const [emailDispatched, setEmailDispatched] = useState(false);

  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    email: '',
    age: '',
    gender: 'Male',
    department: initialData?.department || (servicesList[0]?.title || 'Robotic Total & Partial Knee Replacement'),
    doctorName: initialData?.doctorName || (chiefDoctorsList[0]?.name || 'Dr. Rajeshwar V. Natarajan, MS (Ortho)'),
    date: initialData?.date || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '09:30 AM',
    sessionType: 'In-Hospital Orthopedic Consultation',
    consultationFee: 700,
    paymentMethod: 'Pay at Hospital Counter / UPI',
    symptomsNotes: '',
    branchName: 'OrthoCare Main Institute & Surgical Hospital'
  });

  const timeSlots = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM',
    '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  // Sync when initialData changes
  useEffect(() => {
    if (isOpen) {
      const dept = initialData?.department || servicesList[0]?.title || 'Robotic Total & Partial Knee Replacement';
      const availableDocs = filterDoctorsByDept(dept);
      const doc = initialData?.doctorName || (availableDocs[0]?.name || chiefDoctorsList[0]?.name);
      const date = initialData?.date || new Date(Date.now() + 86400000).toISOString().split('T')[0];

      let availableSlot = '09:30 AM';
      for (const slot of timeSlots) {
        if (!isSlotBooked(doc, date, slot)) {
          availableSlot = slot;
          break;
        }
      }

      setFormData((prev) => ({
        ...prev,
        department: dept,
        doctorName: doc,
        date: date,
        timeSlot: availableSlot,
        patientName: '',
        mobileNumber: '',
        email: '',
        sessionType: 'In-Hospital Orthopedic Consultation',
        consultationFee: 700,
        paymentMethod: 'Pay at Hospital Counter / UPI',
        symptomsNotes: ''
      }));
      setIsSuccess(false);
      setSuccessReceipt(null);
      setEmailDispatched(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const currentAvailableDoctors = filterDoctorsByDept(formData.department);

  const handleDepartmentChange = (newDept) => {
    const available = filterDoctorsByDept(newDept);
    const firstDoc = available[0]?.name || chiefDoctorsList[0]?.name;
    
    let availableSlot = '09:30 AM';
    for (const slot of timeSlots) {
      if (!isSlotBooked(firstDoc, formData.date, slot)) {
        availableSlot = slot;
        break;
      }
    }

    setFormData({
      ...formData,
      department: newDept,
      doctorName: firstDoc,
      timeSlot: availableSlot
    });
  };

  const handleDoctorChange = (newDoctor) => {
    let availableSlot = formData.timeSlot;
    if (isSlotBooked(newDoctor, formData.date, availableSlot)) {
      for (const slot of timeSlots) {
        if (!isSlotBooked(newDoctor, formData.date, slot)) {
          availableSlot = slot;
          break;
        }
      }
    }

    setFormData({
      ...formData,
      doctorName: newDoctor,
      timeSlot: availableSlot
    });
  };

  const handleDateChange = (newDate) => {
    let availableSlot = formData.timeSlot;
    if (isSlotBooked(formData.doctorName, newDate, availableSlot)) {
      for (const slot of timeSlots) {
        if (!isSlotBooked(formData.doctorName, newDate, slot)) {
          availableSlot = slot;
          break;
        }
      }
    }

    setFormData({
      ...formData,
      date: newDate,
      timeSlot: availableSlot
    });
  };

  // Generate Unique Sequential Token ID (ORT001, ORT002, ...)
  const generateAppointmentToken = () => {
    const existingCount = appointments.length;
    const lastStored = parseInt(localStorage.getItem('orthocare_last_apt_num') || '0', 10);
    const nextNum = Math.max(existingCount, lastStored) + 1;
    localStorage.setItem('orthocare_last_apt_num', nextNum.toString());
    const padded = String(nextNum).padStart(3, '0');
    return `ORT${padded}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.patientName.trim() || !formData.mobileNumber.trim()) {
      alert('Please provide your full name and contact number.');
      return;
    }

    const token = generateAppointmentToken();

    const newAppointment = {
      appointmentId: token,
      token: token,
      patientName: formData.patientName,
      mobileNumber: formData.mobileNumber,
      email: formData.email || 'N/A',
      age: formData.age || 'Adult',
      gender: formData.gender,
      department: formData.department,
      doctorName: formData.doctorName,
      date: formData.date,
      time: formData.timeSlot,
      sessionType: formData.sessionType,
      fee: formData.consultationFee,
      paymentMethod: formData.paymentMethod,
      symptoms: formData.symptomsNotes || 'Orthopedic Consultation & Joint Evaluation',
      branchName: formData.branchName,
      status: 'confirmed',
      bookedAt: new Date().toISOString()
    };

    if (addAppointment) {
      addAppointment(newAppointment);
    }

    setSuccessReceipt(newAppointment);
    setIsSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!successReceipt) return;
    const text = `
=====================================================
      ORTHOCARE INSTITUTE OF ORTHOPEDICS & TRAUMA
              OFFICIAL OPD CONSULTATION SLIP
=====================================================
TOKEN NUMBER       : ${successReceipt.token}
PATIENT NAME       : ${successReceipt.patientName}
PHONE NUMBER       : ${successReceipt.mobileNumber}
EMAIL              : ${successReceipt.email}
AGE / GENDER       : ${successReceipt.age} / ${successReceipt.gender}
-----------------------------------------------------
ORTHOPEDIC SPECIALTY: ${successReceipt.department}
CONSULTANT SURGEON : ${successReceipt.doctorName}
CONSULTATION TYPE  : ${successReceipt.sessionType}
APPOINTMENT DATE   : ${successReceipt.date}
TIME SLOT          : ${successReceipt.time}
HOSPITAL LOCATION  : ${successReceipt.branchName}
-----------------------------------------------------
CONSULTATION FEE   : Rs. ${successReceipt.fee}
PAYMENT MODE       : ${successReceipt.paymentMethod}
STATUS             : CONFIRMED (PRIORITY CLINICAL QUEUE)
-----------------------------------------------------
24/7 TRAUMA HOTLINE: 1800-419-6784
HOSPITAL DESK      : ${hospitalInfo?.phone || '+91 98401 23456'}
=====================================================
Please arrive 15 minutes before your slot.
Bring your prior X-Rays, MRI scans, and medical reports.
    `;
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `OrthoCare_Token_${successReceipt.token}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleWhatsApp = () => {
    if (!successReceipt) return;
    const text = encodeURIComponent(
      `Hello OrthoCare, I have booked an Orthopedic Consultation. Token #${successReceipt.token} for ${successReceipt.patientName} with ${successReceipt.doctorName} on ${successReceipt.date} at ${successReceipt.time}.`
    );
    window.open(`https://wa.me/919840123456?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Center of Excellence in Orthopedics</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
            {isSuccess ? 'Consultation Token Confirmed' : 'Book Orthopedic Surgeon Consultation'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {isSuccess 
              ? 'Your appointment has been registered in our outpatient hospital clinical system.' 
              : 'Consult senior joint replacement, spine, sports medicine, and trauma specialists.'}
          </p>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {isSuccess && successReceipt ? (
            /* SUCCESS CONFIRMATION & PRINT SLIP */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-extrabold text-emerald-950 font-heading">
                  Consultation Token #{successReceipt.token} Generated!
                </h3>
                <p className="text-xs text-emerald-800">
                  Confirmed for <span className="font-bold">{successReceipt.patientName}</span> with <span className="font-bold">{successReceipt.doctorName}</span>.
                </p>
              </div>

              {/* Digital Slip Card */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Token Number</span>
                    <span className="text-2xl font-black text-blue-700 font-mono tracking-tight">{successReceipt.token}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Confirmed & Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Patient Name</span>
                    <span className="font-bold text-slate-900">{successReceipt.patientName} ({successReceipt.gender}, {successReceipt.age} yrs)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Contact Mobile</span>
                    <span className="font-bold text-slate-900">{successReceipt.mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Specialty / Procedure</span>
                    <span className="font-bold text-slate-900">{successReceipt.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Consultant Surgeon</span>
                    <span className="font-bold text-slate-900">{successReceipt.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Date & Time</span>
                    <span className="font-bold text-blue-800">{successReceipt.date} at {successReceipt.time}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">OPD Consultation Fee</span>
                    <span className="font-bold text-slate-900">₹ {successReceipt.fee} ({successReceipt.paymentMethod})</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>📍 {successReceipt.branchName}</span>
                  <span>☎ 24/7 Trauma: 1800-419-6784</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Slip</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Alert</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline cursor-pointer"
                >
                  Close & Return to Hospital Portal
                </button>
              </div>

            </div>
          ) : (
            /* BOOKING FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Specialty & Surgeon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Orthopedic Specialty / Surgery
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Orthopedic Surgeon
                  </label>
                  <select
                    value={formData.doctorName}
                    onChange={(e) => handleDoctorChange(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                  >
                    {currentAvailableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Patient Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sundaram"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Contact Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98401 23456"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Age, Gender & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    placeholder="e.g. 54"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 4: Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Available Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white font-mono"
                  >
                    {timeSlots.map((slot) => {
                      const booked = isSlotBooked(formData.doctorName, formData.date, slot);
                      return (
                        <option key={slot} value={slot} disabled={booked}>
                          {slot} {booked ? '— (Already Booked)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Symptoms / Chief Complaint */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Joint / Spine Symptom or Surgical Reason
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Severe right knee grinding pain for 2 years, difficulty climbing stairs / Sciatica shooting pain in left leg..."
                  value={formData.symptomsNotes}
                  onChange={(e) => setFormData({ ...formData, symptomsNotes: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              {/* Hospital Location & Fee Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-blue-900">
                <div>
                  <span className="font-bold block">Consultation Fee: ₹ {formData.consultationFee}</span>
                  <span className="text-[11px] text-blue-700">Includes Physical Exam & Digital X-Ray Review</span>
                </div>
                <div className="text-right text-[11px] text-slate-600">
                  <span>Payable at OPD Counter</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  Generate Consultation Token & Confirm Appointment
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default AppointmentModal;
