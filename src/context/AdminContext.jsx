import React, { createContext, useContext, useState, useEffect } from 'react';

// Import default data
import { servicesList as defaultServices } from '../data/servicesData';
import { chiefDoctorsList as defaultDoctors } from '../data/doctorsData';
import { branchesList as defaultBranches } from '../data/branchesData';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { technologiesList as defaultTechnologies } from '../data/technologiesData';
import { initialBedsList, initialWardsList } from '../data/bedsData';
import { initialStaffList } from '../data/staffData';

const AdminContext = createContext(null);

const STORAGE_KEY = 'orthocare_admin_data_v2';

const defaultHospitalInfo = {
  name: 'OrthoCare',
  tagline: 'Institute of Orthopedics, Robotic Joint Replacement & Spine Surgery',
  fullName: 'OrthoCare Advanced Institute of Orthopedics & Trauma Surgery',
  description: 'OrthoCare is an internationally accredited Center of Excellence in Mako Robotic Knee and Hip Replacement, 3D Navigated Spine Surgery, 4K Keyhole Arthroscopy, 24/7 Level-1 Orthopedic Trauma Care, and Pediatric Deformity Correction.',
  email: 'info@orthocarehospital.org',
  phone: '+91 98401 23456',
  emergencyNumber: '1800-419-6784',
  address: 'No. 45, Ortho Institute Avenue, Near High Court Junction, Palayamkottai, Tirunelveli, Pin: 627002',
  whatsappNumber: '919840123456',
};

const defaultHeroContent = {
  badge: 'Robotic Joint & Spine Center of Excellence',
  heading: 'Pioneering Sub-Millimeter Robotic Joint Surgery & Advanced Spine Care',
  description: 'Mako 4th Gen robotic-arm total knee and anterior hip replacements, 3D navigated endoscopic spine surgery, 4K keyhole sports arthroscopy, and 24/7 Level-1 fracture trauma care.',
  heroImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=85',
  stats: [
    { number: '12,000+', label: 'Robotic Surgeries Done' },
    { number: '25+', label: 'Chief Orthopedic Surgeons' },
    { number: '99.4%', label: 'Surgical Success Rate' },
    { number: '< 0.1%', label: 'Infection Rate (Class 100 OT)' },
  ],
  emergencyLabel: '24/7 Fracture & Orthopedic Trauma Hotline',
  emergencyHotline: '1800-419-6784',
};

const defaultWhyChooseUs = [
  {
    title: 'Mako 4th Gen Robotic Joint Precision',
    desc: 'Sub-millimeter 3D CT mapping and haptic boundary protection ensuring 25-30+ years implant longevity with same-day walking.',
    icon: 'Cpu',
  },
  {
    title: 'Class-100 Laminar Airflow Operation Theatres',
    desc: 'Ultra-sterile surgical suites with HEPA vertical laminar airflow achieving a near-zero (< 0.1%) prosthetic infection rate.',
    icon: 'ShieldCheck',
  },
  {
    title: '3D Navigated Minimally Invasive Spine Center',
    desc: '32-channel continuous neuro-monitoring (IONM) and 7mm endoscopic discectomy for slip disc and sciatica.',
    icon: 'Activity',
  },
  {
    title: '24/7 Level-1 Trauma & Pelvic Fracture Care',
    desc: 'Round-the-clock polytrauma surgical team, emergency digital C-arm suites, and Ilizarov non-union bone salvage.',
    icon: 'Award',
  },
];

// Helper: load from localStorage or return default
function loadData(key, defaultValue) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed[key] !== undefined && parsed[key] !== null) return parsed[key];
    }
  } catch (e) {
    console.error('AdminContext: Error loading data from localStorage', e);
  }
  return defaultValue;
}

// Helper: save full state to localStorage
function saveAllData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('AdminContext: Error saving data to localStorage', e);
  }
}

export const AdminProvider = ({ children }) => {
  const [hospitalInfo, setHospitalInfo] = useState(() => loadData('hospitalInfo', defaultHospitalInfo));
  const [heroContent, setHeroContent] = useState(() => loadData('heroContent', defaultHeroContent));
  const [whyChooseUs, setWhyChooseUs] = useState(() => loadData('whyChooseUs', defaultWhyChooseUs));
  const [doctors, setDoctors] = useState(() => loadData('doctors', defaultDoctors));
  const [services, setServices] = useState(() => loadData('services', defaultServices));
  const [branches, setBranches] = useState(() => loadData('branches', defaultBranches));
  const [blogPosts, setBlogPosts] = useState(() => loadData('blogPosts', defaultBlogPosts));
  const [technologies, setTechnologies] = useState(() => loadData('technologies', defaultTechnologies));
  const [beds, setBeds] = useState(() => loadData('beds', initialBedsList));
  const [wards, setWards] = useState(() => loadData('wards', initialWardsList));
  const [staff, setStaff] = useState(() => loadData('staff', initialStaffList));
  const [appointments, setAppointments] = useState(() => loadData('appointments', []));

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('orthocare_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    saveAllData({
      hospitalInfo,
      heroContent,
      whyChooseUs,
      doctors,
      services,
      branches,
      blogPosts,
      technologies,
      beds,
      wards,
      staff,
      appointments,
    });
  }, [
    hospitalInfo,
    heroContent,
    whyChooseUs,
    doctors,
    services,
    branches,
    blogPosts,
    technologies,
    beds,
    wards,
    staff,
    appointments,
  ]);

  // Auth functions
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('orthocare_admin_auth', 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('orthocare_admin_auth');
    } catch (e) {
      console.error(e);
    }
  };

  // ----------------------------------------------------
  // Hospital Info CRUD
  // ----------------------------------------------------
  const updateHospitalInfo = (updated) => {
    setHospitalInfo((prev) => ({ ...prev, ...updated }));
  };

  // ----------------------------------------------------
  // Doctors / Surgeons CRUD
  // ----------------------------------------------------
  const addDoctor = (doctor) => {
    const newDoc = { ...doctor, id: `doc-${Date.now()}` };
    setDoctors((prev) => [newDoc, ...prev]);
    return newDoc;
  };

  const updateDoctor = (id, updatedFields) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...updatedFields } : doc))
    );
  };

  const deleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  // ----------------------------------------------------
  // Services / Specialties CRUD
  // ----------------------------------------------------
  const addService = (service) => {
    const newSvc = { ...service, id: `svc-${Date.now()}` };
    setServices((prev) => [newSvc, ...prev]);
    return newSvc;
  };

  const updateService = (id, updatedFields) => {
    setServices((prev) =>
      prev.map((svc) => (svc.id === id ? { ...svc, ...updatedFields } : svc))
    );
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((svc) => svc.id !== id));
  };

  // ----------------------------------------------------
  // Branches CRUD
  // ----------------------------------------------------
  const addBranch = (branch) => {
    const newBranch = { ...branch, id: `branch-${Date.now()}` };
    setBranches((prev) => [...prev, newBranch]);
    return newBranch;
  };

  const updateBranch = (id, updatedFields) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBranch = (id) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  // ----------------------------------------------------
  // Blog Posts CRUD
  // ----------------------------------------------------
  const addBlogPost = (post) => {
    const newPost = { ...post, id: `blog-${Date.now()}` };
    setBlogPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updateBlogPost = (id, updatedFields) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteBlogPost = (id) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // ----------------------------------------------------
  // Technologies CRUD
  // ----------------------------------------------------
  const addTechnology = (tech) => {
    const newTech = { ...tech, id: `tech-${Date.now()}` };
    setTechnologies((prev) => [...prev, newTech]);
    return newTech;
  };

  const updateTechnology = (id, updatedFields) => {
    setTechnologies((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTechnology = (id) => {
    setTechnologies((prev) => prev.filter((t) => t.id !== id));
  };

  // ----------------------------------------------------
  // Beds & Ortho Recovery Suites CRUD
  // ----------------------------------------------------
  const admitPatientToBed = (bedId, admissionData) => {
    const now = new Date().toISOString().split('T')[0];
    setBeds((prev) =>
      prev.map((b) => {
        if (b.id === bedId) {
          return {
            ...b,
            status: 'occupied',
            patientName: admissionData.patientName,
            patientId: admissionData.patientId || `ORT-${Math.floor(10000 + Math.random() * 90000)}`,
            admittedDate: admissionData.admittedDate || now,
            attendingDoctor: admissionData.attendingDoctor || 'Dr. Rajeshwar V. Natarajan, MS (Ortho)',
            rehabSupport: admissionData.rehabSupport || 'Robotic TKR Post-Op Protocol',
            notes: admissionData.notes || 'Inpatient recovery & postoperative mobilization',
          };
        }
        return b;
      })
    );
  };

  const dischargePatientFromBed = (bedId) => {
    setBeds((prev) =>
      prev.map((b) => {
        if (b.id === bedId) {
          return {
            ...b,
            status: 'sanitizing',
            patientName: '',
            patientId: '',
            admittedDate: '',
            attendingDoctor: '',
            rehabSupport: 'Mechanized Orthopedic Bed',
            notes: 'Patient successfully discharged. Terminal disinfection underway.',
          };
        }
        return b;
      })
    );
  };

  const updateBedStatus = (bedId, newStatus) => {
    setBeds((prev) =>
      prev.map((b) => (b.id === bedId ? { ...b, status: newStatus } : b))
    );
  };

  const transferPatientBed = (fromBedId, toBedId) => {
    setBeds((prev) => {
      const fromBed = prev.find((b) => b.id === fromBedId);
      if (!fromBed) return prev;

      return prev.map((b) => {
        if (b.id === toBedId) {
          return {
            ...b,
            status: 'occupied',
            patientName: fromBed.patientName,
            patientId: fromBed.patientId,
            admittedDate: fromBed.admittedDate,
            attendingDoctor: fromBed.attendingDoctor,
            rehabSupport: fromBed.rehabSupport,
            notes: `Transferred from ${fromBed.bedNumber}. ${fromBed.notes || ''}`,
          };
        }
        if (b.id === fromBedId) {
          return {
            ...b,
            status: 'sanitizing',
            patientName: '',
            patientId: '',
            admittedDate: '',
            attendingDoctor: '',
            notes: `Patient transferred to new ward. Terminal sanitization in progress.`,
          };
        }
        return b;
      });
    });
  };

  const addBed = (bed) => {
    const newBed = { ...bed, id: `bed-${Date.now()}` };
    setBeds((prev) => [...prev, newBed]);
    return newBed;
  };

  const deleteBed = (bedId) => {
    setBeds((prev) => prev.filter((b) => b.id !== bedId));
  };

  // ----------------------------------------------------
  // Staff & Workforce CRUD
  // ----------------------------------------------------
  const addStaff = (member) => {
    const newStaff = { ...member, id: `staff-${Date.now()}` };
    setStaff((prev) => [newStaff, ...prev]);
    return newStaff;
  };

  const updateStaff = (id, updatedFields) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
  };

  const deleteStaff = (id) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStaffDutyStatus = (id, newStatus) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, dutyStatus: newStatus } : s))
    );
  };

  const updateStaffShift = (id, newShift) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, shift: newShift } : s))
    );
  };

  // ----------------------------------------------------
  // Appointments Management & Token Generation
  // ----------------------------------------------------
  const addAppointment = (appointment) => {
    const count = appointments.length + 1;
    const token = `ORT${String(count).padStart(3, '0')}`;

    const newAppointment = {
      ...appointment,
      appointmentId: token,
      token: token,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: 'Paid',
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  const updateAppointmentStatus = (tokenOrId, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.appointmentId === tokenOrId || apt.token === tokenOrId
          ? { ...apt, status: newStatus }
          : apt
      )
    );
  };

  const deleteAppointment = (tokenOrId) => {
    setAppointments((prev) =>
      prev.filter(
        (apt) => apt.appointmentId !== tokenOrId && apt.token !== tokenOrId
      )
    );
  };

  const value = {
    // Auth
    isAuthenticated,
    login,
    logout,

    // Hospital & Content
    hospitalInfo,
    updateHospitalInfo,
    heroContent,
    setHeroContent,
    whyChooseUs,
    setWhyChooseUs,

    // Doctors
    doctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,

    // Services
    services,
    addService,
    updateService,
    deleteService,

    // Branches
    branches,
    addBranch,
    updateBranch,
    deleteBranch,

    // Blog
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,

    // Technologies
    technologies,
    addTechnology,
    updateTechnology,
    deleteTechnology,

    // Beds / Suites
    beds,
    wards,
    admitPatientToBed,
    dischargePatientFromBed,
    updateBedStatus,
    transferPatientBed,
    addBed,
    deleteBed,

    // Staff
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    updateStaffDutyStatus,
    updateStaffShift,

    // Appointments
    appointments,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
