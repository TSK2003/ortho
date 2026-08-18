import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Activity, 
  ChevronRight,
  Calendar,
  UserCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { servicesList as defaultServices } from '../../data/servicesData';
import { branchesList as defaultBranches } from '../../data/branchesData';
import { useAdmin } from '../../context/AdminContext';

const Navbar = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'OrthoCare',
    tagline: 'Institute of Orthopedics & Joint Replacement'
  };
  const servicesList = adminContext?.services || defaultServices;
  const branchesList = adminContext?.branches || defaultBranches;

  const [isSticky, setIsSticky] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setServicesDropdownOpen(false);
    setBranchesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`w-full z-40 transition-all duration-200 ${
        isSticky
          ? 'sticky top-0 shadow-md bg-white/95 backdrop-blur-md border-b border-slate-200'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. BRAND LOGO */}
          <Link
            to="/"
            onClick={() => {
              setServicesDropdownOpen(false);
              setBranchesDropdownOpen(false);
              window.scrollTo(0, 0);
            }}
            className="flex items-center space-x-3 group py-1 shrink-0"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md group-hover:from-blue-700 group-hover:to-indigo-800 transition-all">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-slate-950 uppercase font-heading leading-tight">
                  {hospitalInfo.name || 'ORTHOCARE'}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              </div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider leading-none">
                Robotic Joint & Spine Institute
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 font-medium">
            
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname === '/'
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Orthopedic Specialties Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center space-x-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  servicesDropdownOpen || location.pathname.startsWith('/services')
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                <span>Surgeries & Specialties</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${servicesDropdownOpen ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-96 z-50 animate-in fade-in duration-150">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 max-h-[78vh] overflow-y-auto">
                    <div className="px-3 py-2 bg-blue-50/90 rounded-xl mb-2 flex items-center justify-between border border-blue-100">
                      <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">Orthopedic Surgeries</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full shadow-2xs">{servicesList.length} Specialties</span>
                    </div>
                    <div className="space-y-1">
                      {servicesList.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-colors group"
                        >
                          <span className="truncate font-semibold">{service.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Technologies */}
            <Link
              to="/technologies"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/technologies')
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Robotic & Tech
            </Link>

            {/* Branches / Hospitals */}
            <div
              className="relative"
              onMouseEnter={() => setBranchesDropdownOpen(true)}
              onMouseLeave={() => setBranchesDropdownOpen(false)}
            >
              <button
                onClick={() => setBranchesDropdownOpen(!branchesDropdownOpen)}
                className={`flex items-center space-x-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  branchesDropdownOpen || location.pathname.startsWith('/branches')
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                <span>Hospitals & Clinics</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${branchesDropdownOpen ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </button>

              {branchesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-80 z-50 animate-in fade-in duration-150">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5">
                    <div className="space-y-1">
                      {branchesList.map((branch) => (
                        <Link
                          key={branch.id}
                          to="/branches"
                          className="block px-3 py-2.5 text-xs text-slate-700 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <span className="font-bold block text-slate-900 leading-tight">{branch.name}</span>
                          <span className="text-[10px] text-slate-500 block truncate mt-0.5">{branch.phone}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Insights */}
            <Link
              to="/blog"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/blog')
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Patient Guides
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/about')
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              About Institute
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/contact')
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>

          </nav>

          {/* 3. RIGHT CALL TO ACTIONS */}
          <div className="hidden sm:flex items-center space-x-2.5 shrink-0">
            <Link
              to="/login"
              className="flex items-center space-x-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors whitespace-nowrap border border-slate-200"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Portal</span>
            </Link>

            <button
              onClick={() => onOpenAppointment()}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* 4. MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 text-sm font-semibold">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Home
          </Link>
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              <span>Specialties & Surgeries</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mt-1 max-h-52 overflow-y-auto font-normal text-xs">
                {servicesList.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1.5 text-slate-700 hover:text-blue-700 font-medium"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/technologies"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Robotic & Tech
          </Link>
          <Link
            to="/branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Hospitals & Clinics
          </Link>
          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Patient Guides
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            About Institute
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center space-x-2 text-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Portal Login</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center space-x-2 text-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
