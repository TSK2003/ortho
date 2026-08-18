import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Star, Quote, Heart, Activity, ShieldCheck } from 'lucide-react';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'S. Senthilkumar (62 Yrs)',
      condition: 'Mako Robotic Total Knee Replacement',
      surgeon: 'Dr. Rajeshwar V. Natarajan, MS (Ortho)',
      comment: 'I suffered from excruciating bone-on-bone knee osteoarthritis for 6 years. With Dr. Rajeshwar’s Mako robotic surgery, I was walking unassisted in 5 hours! Today I climb stairs effortlessly without pain.',
      rating: 5
    },
    {
      name: 'V. Meenakshi (54 Yrs)',
      condition: '7mm Keyhole Endoscopic Microdiscectomy',
      surgeon: 'Dr. Arun Sharma, MS (Ortho, Spine)',
      comment: 'Severe sciatica down my left leg prevented me from sleeping or standing. Dr. Arun performed a 7mm endoscopic disc removal and I went home the same evening 100% pain-free.',
      rating: 5
    },
    {
      name: 'Pooja Radhakrishnan (24 Yrs)',
      condition: '4K Arthroscopic ACL & Meniscal Repair',
      surgeon: 'Dr. Vikramaditya Rao, MS (Ortho)',
      comment: 'Tore my ACL and meniscus playing state football. Dr. Vikram performed an anatomical ACL reconstruction with internal bracing. I cleared functional agility tests and returned to football in 7 months!',
      rating: 5
    },
    {
      name: 'M. Thangavel (48 Yrs)',
      condition: 'Ilizarov Complex Tibia Non-Union Salvage',
      surgeon: 'Dr. K. Senthil Nathan, MS (Ortho)',
      comment: 'After a severe motorcycle crash, my leg bone failed to heal for 14 months elsewhere. Dr. Senthil applied an Ilizarov circular frame and regrew 4 cm of solid new bone. Truly life-saving!',
      rating: 5
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Patient Recovery Stories & Surgical Outcomes"
        subtitle="Read firsthand experiences of patients who restored their active mobility through robotic joint surgery, arthroscopy, and spine care at OrthoCare."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Testimonials' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">{t.name}</h4>
                  <p className="text-[11px] text-blue-700 font-semibold">{t.condition}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Surgeon: {t.surgeon.split(',')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
