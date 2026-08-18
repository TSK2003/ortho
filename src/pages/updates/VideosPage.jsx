import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Play, Activity } from 'lucide-react';

const VideosPage = () => {
  const videoCards = [
    {
      title: 'Mako Robotic Knee Replacement: 4-Hour Post-Op Walking Milestone',
      duration: '4:20 min',
      category: 'Robotic Surgery',
      thumb: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '7mm Keyhole Endoscopic Microdiscectomy: Spine Surgery Explained',
      duration: '5:45 min',
      category: 'Spine Care',
      thumb: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '4K Keyhole Arthroscopic ACL Reconstruction & Return-to-Play Drills',
      duration: '6:10 min',
      category: 'Sports Medicine',
      thumb: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Surgical Demonstration & Patient Recovery Videos"
        subtitle="Watch real surgical workflows, robotic knee mobilization milestones, and spine decompression procedures."
        breadcrumb={[{ label: 'Videos' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoCards.map((vid, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-xl transition-all">
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-14 h-14 bg-blue-600/90 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2.5 right-2.5 bg-slate-950/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                  {vid.duration}
                </span>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">{vid.category}</span>
                <h3 className="text-xs font-bold text-slate-950 font-heading mt-1.5 leading-snug">{vid.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
