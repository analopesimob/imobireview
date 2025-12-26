import React, { useState, useMemo, useEffect } from 'react';
import StarRating from './StarRating';
import { 
    TENANT_REVIEWING_AGENCY_CRITERIA,
    LANDLORD_REVIEWING_TENANT_CRITERIA,
    TENANT_REVIEWING_LANDLORD_CRITERIA,
    LANDLORD_REVIEWING_AGENCY_CRITERIA,
    AGENCY_REVIEWING_TENANT_CRITERIA,
    AGENCY_REVIEWING_LANDLORD_CRITERIA,
    CONDOMINIUM_CRITERIA,
} from '../constants';
import { 
    ThumbsUpIcon, 
    PersonIcon, 
    HomeIcon, 
    BuildingIcon, 
    CheckCircleIcon, 
    ChevronLeftIcon, 
    CloseIcon,
    ShieldIcon,
    LogoIcon,
    EditDocumentIcon
} from './icons';
import { EarthLockIcon, Home, Building, User } from 'lucide-react';
import { ProfileType } from '../types';

interface ReviewFlowProps {
  reviewerRole: ProfileType;
  onCancel: () => void;
}

type FormData = {
    reviewerRole: ProfileType;
    revieweeRole: ProfileType | null;
    contractStart: string;
    contractEnd: string;
    overallScore: number;
    condoScore: number;
    criteriaScores: { [key: string]: number };
    title: string;
    comment: string;
    justification: string;
    isAnonymous: boolean;
    isInCondo: boolean;
};

// --- Sub-componentes Estilizados ---

const ReputationOrb: React.FC<{ score: number }> = ({ score }) => {
    const getColor = () => {
        if (score === 0) return 'from-gray-400 to-gray-600 shadow-gray-400/20';
        if (score <= 2.5) return 'from-red-400 to-red-600 shadow-red-400/40';
        if (score <= 3.8) return 'from-yellow-400 to-orange-500 shadow-yellow-400/40';
        return 'from-accent to-[#5cb874] shadow-accent/40';
    };

    return (
        <div className="flex flex-col items-center mb-12 animate-float">
            <div className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${getColor()} shadow-[0_0_50px_-5px] flex items-center justify-center transition-all duration-700 border-4 border-white/20`}>
                <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-20"></div>
                <span className="text-4xl font-black text-white drop-shadow-md">
                    {score > 0 ? score.toFixed(1) : '?'}
                </span>
            </div>
            <div className="mt-4 px-4 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Score de Transparência</span>
            </div>
        </div>
    );
};

const GlassSelectionCard: React.FC<{
    label: string, 
    icon: React.ReactNode, 
    selected: boolean, 
    onClick: () => void
}> = ({ label, icon, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`relative group w-full p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
        selected
          ? 'bg-white/10 border-accent shadow-[0_20px_60px_-15px_rgba(136,212,152,0.3)] -translate-y-2'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
    >
        {selected && <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>}
        
        <div className="relative z-10 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 ${
                selected ? 'bg-accent text-primary scale-110' : 'bg-white/5 text-gray-400 group-hover:text-white group-hover:scale-105'
            }`}>
                 {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10" })}
            </div>
            <span className={`font-black text-xl tracking-tight transition-colors ${selected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                {label}
            </span>
            <div className={`mt-2 h-1 w-8 rounded-full transition-all duration-500 ${selected ? 'bg-accent w-12' : 'bg-transparent'}`}></div>
        </div>
    </button>
);

const MetricRow: React.FC<{ label: string, score: number, onChange: (val: number) => void }> = ({ label, score, onChange }) => (
    <div className="w-full bg-white/5 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/5 flex flex-col sm:flex-row items-center justify-between group hover:bg-white/10 transition-all gap-4">
        <label className="font-bold text-gray-300 text-sm group-hover:text-white transition-colors">{label}</label>
        <div className="bg-primary/40 px-4 py-2 rounded-2xl border border-white/5 shadow-inner">
            <StarRating rating={score} onRating={onChange} size="md" />
        </div>
    </div>
);

// --- Main Flow Component ---

const ReviewFlow: React.FC<ReviewFlowProps> = ({ reviewerRole, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    reviewerRole: reviewerRole,
    revieweeRole: null,
    contractStart: '',
    contractEnd: '',
    overallScore: 0,
    condoScore: 0,
    criteriaScores: {},
    title: '',
    comment: '',
    justification: '',
    isAnonymous: false,
    isInCondo: false,
  });

  const standardCriteria = useMemo(() => {
    const { reviewerRole, revieweeRole } = formData;
    if (reviewerRole === ProfileType.Tenant && revieweeRole === ProfileType.Agency) return TENANT_REVIEWING_AGENCY_CRITERIA;
    if (reviewerRole === ProfileType.Tenant && revieweeRole === ProfileType.Landlord) return TENANT_REVIEWING_LANDLORD_CRITERIA;
    if (reviewerRole === ProfileType.Landlord && revieweeRole === ProfileType.Tenant) return LANDLORD_REVIEWING_TENANT_CRITERIA;
    if (reviewerRole === ProfileType.Landlord && revieweeRole === ProfileType.Agency) return LANDLORD_REVIEWING_AGENCY_CRITERIA;
    if (reviewerRole === ProfileType.Agency && revieweeRole === ProfileType.Tenant) return AGENCY_REVIEWING_TENANT_CRITERIA;
    if (reviewerRole === ProfileType.Agency && revieweeRole === ProfileType.Landlord) return AGENCY_REVIEWING_LANDLORD_CRITERIA;
    return [];
  }, [formData.reviewerRole, formData.revieweeRole]);

  useEffect(() => {
      const mainScores = standardCriteria.map(crit => formData.criteriaScores[crit] || 0);
      const mainAvg = mainScores.length > 0 ? mainScores.reduce((a, b) => a + b, 0) / mainScores.length : 0;
      
      let condoAvg = 0;
      if (formData.isInCondo) {
          const condoScores = CONDOMINIUM_CRITERIA.map(crit => formData.criteriaScores[crit] || 0);
          condoAvg = condoScores.length > 0 ? condoScores.reduce((a, b) => a + b, 0) / condoScores.length : 0;
      }

      setFormData(prev => ({
          ...prev,
          overallScore: parseFloat(mainAvg.toFixed(1)),
          condoScore: parseFloat(condoAvg.toFixed(1))
      }));
  }, [formData.criteriaScores, standardCriteria, formData.isInCondo]);

  const handleScoreChange = (name: string, score: number) => {
    setFormData(prev => ({
      ...prev,
      criteriaScores: { ...prev.criteriaScores, [name]: score }
    }));
  };

  const isNextDisabled = () => {
      if (step === 1) return !formData.revieweeRole;
      if (step === 2) return !formData.contractStart || !formData.contractEnd;
      if (step === 3) {
          const mainComplete = standardCriteria.every(crit => (formData.criteriaScores[crit] || 0) > 0);
          if (formData.isInCondo) {
              return !mainComplete || !CONDOMINIUM_CRITERIA.every(crit => (formData.criteriaScores[crit] || 0) > 0);
          }
          return !mainComplete;
      }
      if (step === 4) return !formData.title.trim() || !formData.comment.trim();
      return false;
  }

  const renderContent = () => {
    switch(step) {
        case 1:
            return (
                <div className="animate-in flex flex-col items-center">
                    <h2 className="text-4xl font-black text-white text-center mb-4 tracking-tighter">Quem vamos avaliar?</h2>
                    <p className="text-blue-100/60 text-center mb-12 max-w-sm">Selecione o alvo da sua experiência para iniciarmos.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                        {(reviewerRole === ProfileType.Tenant ? [ProfileType.Landlord, ProfileType.Agency] : 
                          reviewerRole === ProfileType.Landlord ? [ProfileType.Tenant, ProfileType.Agency] : 
                          [ProfileType.Tenant, ProfileType.Landlord]).map(role => (
                            <GlassSelectionCard
                                key={role}
                                label={role}
                                icon={role === ProfileType.Tenant ? <User /> : role === ProfileType.Landlord ? <Home /> : <Building />}
                                selected={formData.revieweeRole === role}
                                onClick={() => setFormData({...formData, revieweeRole: role})}
                            />
                        ))}
                    </div>
                </div>
            );
        case 2:
            return (
                <div className="animate-in flex flex-col items-center">
                    <h2 className="text-4xl font-black text-white text-center mb-4 tracking-tighter">Período da Jornada</h2>
                    <p className="text-blue-100/60 text-center mb-12 max-w-sm">Quando aconteceu essa experiência imobiliária?</p>
                    
                    <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full">
                                <label className="block text-[10px] font-black uppercase text-accent tracking-[0.2em] mb-3">Check-in</label>
                                <input type="date" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-bold focus:border-accent outline-none" value={formData.contractStart} onChange={(e) => setFormData({...formData, contractStart: e.target.value})} />
                            </div>
                            <div className="w-8 h-px bg-white/10 hidden md:block mt-6"></div>
                            <div className="w-full">
                                <label className="block text-[10px] font-black uppercase text-accent tracking-[0.2em] mb-3">Check-out</label>
                                <input type="date" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-bold focus:border-accent outline-none" value={formData.contractEnd} onChange={(e) => setFormData({...formData, contractEnd: e.target.value})} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 3:
            return (
                <div className="animate-in flex flex-col items-center">
                    <ReputationOrb score={formData.overallScore} />
                    <h2 className="text-4xl font-black text-white text-center mb-12 tracking-tighter">Métricas de Precisão</h2>
                    
                    <div className="w-full max-w-3xl space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {standardCriteria.map(crit => (
                                <MetricRow key={crit} label={crit} score={formData.criteriaScores[crit] || 0} onChange={(s) => handleScoreChange(crit, s)} />
                            ))}
                        </div>

                        {reviewerRole === ProfileType.Tenant && (
                            <div className="pt-8 border-t border-white/10">
                                <button 
                                    onClick={() => setFormData({...formData, isInCondo: !formData.isInCondo})}
                                    className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${
                                        formData.isInCondo ? 'bg-accent/10 border-accent' : 'bg-white/5 border-white/10 opacity-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.isInCondo ? 'bg-accent text-primary' : 'bg-white/10 text-white'}`}>
                                            <Building className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-black text-white text-sm">Avaliar Condomínio?</p>
                                            <p className="text-[10px] text-blue-100/50 uppercase tracking-widest">Estrutura e Gestão</p>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full relative transition-colors ${formData.isInCondo ? 'bg-accent' : 'bg-white/20'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isInCondo ? 'left-7' : 'left-1'}`}></div>
                                    </div>
                                </button>

                                {formData.isInCondo && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate-slide-up">
                                        {CONDOMINIUM_CRITERIA.map(crit => (
                                            <MetricRow key={crit} label={crit} score={formData.criteriaScores[crit] || 0} onChange={(s) => handleScoreChange(crit, s)} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            );
        case 4:
            return (
                <div className="animate-in flex flex-col items-center">
                    <div className="w-20 h-20 bg-accent text-primary rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-accent/20">
                        <EditDocumentIcon className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black text-white text-center mb-4 tracking-tighter">Sua Narrativa</h2>
                    <p className="text-blue-100/60 text-center mb-12 max-w-sm">Detalhes fazem a diferença para quem busca confiança.</p>

                    <div className="w-full max-w-2xl space-y-6">
                        <input 
                            type="text" 
                            placeholder="Título da sua história..." 
                            className="w-full bg-transparent border-b-2 border-white/10 p-4 text-2xl font-black text-white focus:border-accent outline-none placeholder:text-white/10 transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                        <textarea 
                            rows={6}
                            placeholder="Descreva os pontos positivos, negativos e o que poderia ser melhor..." 
                            className="w-full bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-blue-50 font-medium focus:border-accent outline-none placeholder:text-white/10 resize-none transition-all"
                            value={formData.comment}
                            onChange={(e) => setFormData({...formData, comment: e.target.value})}
                        />
                    </div>
                </div>
            );
        case 5:
            return (
                <div className="animate-in flex flex-col items-center">
                    <h2 className="text-4xl font-black text-white text-center mb-12 tracking-tighter">Selo de Transparência</h2>
                    
                    <div className="w-full max-w-xl bg-white rounded-[3rem] p-1 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div className="bg-primary rounded-[2.8rem] p-10 text-white relative">
                            <div className="absolute top-[-50px] right-[-50px] opacity-10"><LogoIcon className="w-64 h-64" /></div>
                            
                            <div className="flex justify-between items-start mb-10 border-b border-white/10 pb-8">
                                <div>
                                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">Avaliando</p>
                                    <h3 className="text-2xl font-black">{formData.revieweeRole}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">Score Final</p>
                                    <h3 className="text-4xl font-black">{formData.overallScore}</h3>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold mb-4">"{formData.title}"</h4>
                            <p className="text-blue-100/70 text-sm leading-relaxed italic mb-10">"{formData.comment}"</p>

                            <label className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 cursor-pointer group hover:bg-white/10 transition-all">
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.isAnonymous ? 'bg-accent border-accent' : 'border-white/30'}`}>
                                    {formData.isAnonymous && <CheckCircleIcon className="w-4 h-4 text-primary" />}
                                    <input type="checkbox" className="hidden" checked={formData.isAnonymous} onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-black uppercase tracking-widest text-white">Postar como Anônimo</p>
                                    <p className="text-[10px] text-gray-400">Proteja sua identidade no feed público</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            );
        case 6:
            return (
                <div className="animate-scale-in text-center py-20">
                    <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_60px_rgba(136,212,152,0.4)]">
                        <ThumbsUpIcon className="w-16 h-16 text-primary" />
                    </div>
                    <h2 className="text-6xl font-black text-white mb-6 tracking-tighter">Avaliação enviada!</h2>
                    <p className="text-blue-100 text-xl max-w-md mx-auto mb-12 opacity-80">Sua avaliação foi autenticada e ajudará milhares de pessoas a alugarem com segurança.</p>
                    <button onClick={onCancel} className="px-12 py-5 bg-accent text-primary font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-widest text-sm">Voltar ao Início</button>
                </div>
            );
        default: return null;
    }
  }

  return (
    <div className="min-h-[90vh] flex flex-col bg-[#051326] relative overflow-hidden font-display rounded-[1.5rem] shadow-[0_60px_160px_-40px_rgba(0,0,0,0.9)]">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-[-20%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-[-20%] w-[800px] h-[800px] bg-primary rounded-full blur-[120px] opacity-50"></div>
        </div>

        {/* Minimal Header */}
        <header className="px-10 py-8 flex justify-between items-center relative z-20">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 text-accent"><EarthLockIcon className="w-8 h-8" /></div>
                <span className="text-white font-black tracking-widest text-xs uppercase">ImobiReview Protocol</span>
            </div>
            <button onClick={onCancel} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-all">
                <CloseIcon className="w-5 h-5" />
            </button>
        </header>

        {/* Content Section */}
        <main className="flex-grow flex flex-col justify-center px-4 relative z-20">
            <div className="container mx-auto max-w-5xl py-20">
                {renderContent()}
            </div>
        </main>

        {/* Navigation Footer */}
        {step <= 5 && (
            <footer className="p-10 relative z-30">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <button 
                        onClick={() => step === 1 ? onCancel() : setStep(s => s - 1)}
                        className="px-8 py-3 rounded-full text-white/40 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-all flex items-center gap-2"
                    >
                        <ChevronLeftIcon className="w-4 h-4" /> {step === 1 ? 'Cancelar avaliação' : 'Voltar'}
                    </button>
                    
                    <div className="flex gap-2">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-accent' : 'w-2 bg-white/10'}`}></div>
                        ))}
                    </div>

                    <button 
                        onClick={() => setStep(s => s + 1)}
                        disabled={isNextDisabled()}
                        className="px-12 py-4 bg-accent text-primary font-black rounded-2xl hover:bg-white transition-all shadow-xl shadow-accent/10 active:scale-95 disabled:opacity-20 disabled:grayscale uppercase tracking-widest text-xs"
                    >
                        {step === 5 ? 'Publicar Agora' : 'Prosseguir'}
                    </button>
                </div>
            </footer>
        )}

        <style>{`
            @keyframes in {
                from { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(10px); }
                to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
            }
            .animate-in { animation: in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .animate-float { animation: float 6s ease-in-out infinite; }

            @keyframes slide-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }

            @keyframes scale-in {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        `}</style>
    </div>
  );
};

export default ReviewFlow;