import React, { useState } from 'react';
import { Play, Pause, Volume2, CheckCircle, Video, X, Globe, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RegistrationGuidanceModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      id: 1,
      time: "0:05",
      title: t('guidance.step1'),
      desc: "Select 'Buyer' if you are looking to purchase authentic handloom items. Select 'Weaver' if you are a traditional artisan selling your handcrafted fabrics directly.",
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      time: "0:25",
      title: t('guidance.step2'),
      desc: "For Weavers: Select your Weaver ID Proof type (Ministry of Textiles Pehchan Card / National Artisan ID), enter your card number, and upload a photo of your physical card to validate your identity and earn the Verified Artisan badge on your products.",
      img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      time: "0:45",
      title: t('guidance.step3'),
      desc: "Set your preferred regional language (English, Hindi, Telugu, Tamil, Bengali) and enter your UPI ID for direct 100% bank payout upon customer order placement!",
      img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-amber-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-950 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Video className="w-6 h-6 text-amber-400 animate-pulse" />
            <h3 className="font-serif font-bold text-lg">{t('guidance.modalTitle')}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-amber-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-slate-950 aspect-video flex flex-col justify-between overflow-hidden group">
          <img 
            src={steps[currentStep - 1].img} 
            alt="Tutorial Step" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 transition-all duration-500"
          />
          
          {/* Overlay Badge */}
          <div className="relative z-10 p-4 flex justify-between items-start">
            <div className="bg-amber-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow">
              <Sparkles className="w-3.5 h-3.5" /> Official Weaver Guidance Tutorial
            </div>
            <div className="bg-slate-900/80 text-amber-300 text-xs px-2.5 py-1 rounded-md border border-amber-500/30">
              Language: <span className="font-bold uppercase text-white">{i18n.language}</span>
            </div>
          </div>

          {/* Subtitles & Active Step Overlay */}
          <div className="relative z-10 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-1">
              <span>Chapter {currentStep} of 3</span>
              <span>•</span>
              <span>{steps[currentStep - 1].time}</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{steps[currentStep - 1].title}</h4>
            <p className="text-slate-200 text-sm leading-relaxed max-w-2xl bg-black/40 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
              {steps[currentStep - 1].desc}
            </p>
          </div>

          {/* Video Controls Bar */}
          <div className="relative z-10 bg-slate-900/90 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white transition"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <Volume2 className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 font-mono">00:15 / 01:20</span>
            </div>

            {/* Chapter Jump Buttons */}
            <div className="flex gap-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`px-3 py-1 rounded-md transition font-medium text-xs ${
                    currentStep === step.id 
                      ? 'bg-amber-600 text-white shadow-sm' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Step {step.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-amber-50 flex items-center justify-between border-t border-amber-100">
          <div className="flex items-center gap-2 text-amber-900 text-xs font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Need extra assistance? Use our AI WeaveBot chat assistant anytime!</span>
          </div>
          <button
            onClick={onClose}
            className="bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow transition"
          >
            {t('guidance.close')}
          </button>
        </div>

      </div>
    </div>
  );
}
