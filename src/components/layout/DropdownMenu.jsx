import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const aboutMenuItems = [
  { label: 'Institutional Overview', path: '/about/overview' },
  { label: 'Vision & Mission', path: '/about/vision-mission' },
  { label: 'Clinical Leadership & Governance', path: '/about/management' },
  { label: 'Chief Orthopedic Surgeons', path: '/about/doctors' },
  { label: 'Surgeon OPD Schedule & Hours', path: '/about/consultant-time' },
  { label: 'Surgical Recovery Testimonials', path: '/about/testimonials' },
  { label: 'Careers at OrthoCare', path: '/about/career' },
];

export const healthCenterMenuItems = [
  { label: 'Main Orthopedic Hospital Campus', path: '/branches' },
  { label: 'City Joint Replacement Clinic', path: '/branches' },
  { label: 'Master Bone & Joint Diagnostic Packages', path: '/health-center/master-health-checkup' },
];

export const updatesMenuItems = [
  { label: 'Institute News & Surgical Milestones', path: '/updates/hospital-updates' },
  { label: 'Live Arthroscopy & Surgical Masterclasses', path: '/updates/recent-events' },
  { label: 'HBOT & Bone Healing Suite', path: '/updates/hbot' },
  { label: 'Surgical Demonstration Videos', path: '/updates/videos' },
  { label: 'Operating Suites & Hospital Gallery', path: '/updates/gallery' },
  { label: 'Surgical Outcomes & Satisfaction', path: '/updates/patient-satisfaction' },
  { label: 'Class-100 Zero-Infection OT Standards', path: '/updates/infection-control' },
];

const DropdownMenu = ({ items, onClose }) => {
  return (
    <div className="w-72 bg-white shadow-2xl rounded-2xl border border-slate-100 py-2 transform transition-all duration-200">
      {items.map((item, idx) => (
        <Link
          key={idx}
          to={item.path}
          onClick={onClose}
          className="group flex items-center justify-between px-4 py-2.5 text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
        >
          <span>{item.label}</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600" />
        </Link>
      ))}
    </div>
  );
};

export default DropdownMenu;
