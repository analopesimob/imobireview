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
import { ThumbsUpIcon, PersonIcon, HomeIcon, BuildingIcon, CheckCircleIcon, ChevronLeftIcon, CloseIcon } from './icons';
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
    condoScore: number; // New separate score
    criteriaScores: { [key: string]: number };
    title: string;
    comment: string;
    justification: string;
    isAnonymous: boolean;
    isInCondo: boolean;
};

// --- Components for the New Design ---

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex justify-between items-center mb-10 relative px-2">
            {/* Connecting Line */}
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
            <div 
                className="absolute left-0 top-1/2 h-1 bg-accent -z-10 rounded-full transition-all duration-700 ease-in-out" 
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>

            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isActive = stepNum <= currentStep;
                const isCurrent = stepNum === currentStep;

                return (
                    <div key={index} className="relative flex flex-col items-center group">
                        <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all duration-500 z-10 ${
                                isActive 
                                ? 'bg-primary border-accent text-white shadow-[0_0_0_4px_rgba(136,212,152,0.2)]' 
                                : 'bg-white border-gray-200 text-gray-300'
                            } ${isCurrent ? 'scale-110' : ''}`}
                        >
                            {isActive ? <CheckCircleIcon className="w-5 h-5" /> : stepNum}
                        </div>
                        <span className={`absolute -bottom-8 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${isCurrent ? 'text-primary' : 'text-gray-300'}`}>
                            {['Alvo', 'Período', 'Avaliação', 'Detalhes', 'Resumo'][index]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

const SelectionCard: React.FC<{
    label: string, 
    icon: React.ReactNode, 
    selected: boolean, 
    onClick: () => void
}> = ({ label, icon, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`group w-full flex flex-col items-center p-8 rounded-3xl border-2 transition-all duration-300 ${
        selected
          ? 'bg-primary border-primary shadow-2xl transform -translate-y-2'
          : 'bg-white border-gray-100 hover:border-accent hover:shadow-lg hover:-translate-y-1'
      }`}
    >
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
            selected ? 'bg-white/10 text-accent rotate-3' : 'bg-gray-50 text-gray-400 group-hover:bg-accent/10 group-hover:text-primary group-hover:-rotate-3'
        }`}>
             {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10" })}
        </div>
        <span className={`font-bold text-xl mb-1 ${selected ? 'text-white' : 'text-gray-700 group-hover:text-primary'}`}>
            {label}
        </span>
        <span className={`text-xs font-medium uppercase tracking-widest ${selected ? 'text-accent' : 'text-gray-400'}`}>
            Selecionar
        </span>
    </button>
);

const ScoreCard: React.FC<{ label: string, score: number, onChange: (val: number) => void }> = ({ label, score, onChange }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between group gap-3">
        <label className="font-bold text-gray-700 text-base group-hover:text-primary transition-colors text-center sm:text-left">{label}</label>
        <div className="bg-gray-50 px-3 py-1.5 rounded-xl group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
            <StarRating rating={score} onRating={onChange} size="md" />
        </div>
    </div>
);

// --- Main Component ---

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

  // Determine standard criteria based on roles (For the main reviewee)
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

  // Combined active criteria for initialization
  const allActiveCriteria = useMemo(() => {
      let criteria = [...standardCriteria];
      if (formData.isInCondo && formData.reviewerRole === ProfileType.Tenant) {
          criteria = [...criteria, ...CONDOMINIUM_CRITERIA];
      }
      return criteria;
  }, [standardCriteria, formData.isInCondo, formData.reviewerRole]);

  // Initialize scores when criteria changes
  useEffect(() => {
      setFormData(prev => {
          const newScores = { ...prev.criteriaScores };
          allActiveCriteria.forEach(crit => {
              if (newScores[crit] === undefined) newScores[crit] = 0;
          });
          return { ...prev, criteriaScores: newScores };
      });
  }, [allActiveCriteria]);
  
  // Calculate Scores SEPARATELY whenever criteria scores change
  useEffect(() => {
      // 1. Calculate Main Overall Score
      const mainScores = standardCriteria.map(crit => formData.criteriaScores[crit] || 0);
      const mainTotal = mainScores.reduce((a, b) => a + b, 0);
      const mainAvg = mainScores.length > 0 ? mainTotal / mainScores.length : 0;
      
      // 2. Calculate Condo Score (if applicable)
      let condoAvg = 0;
      if (formData.isInCondo) {
          const condoScores = CONDOMINIUM_CRITERIA.map(crit => formData.criteriaScores[crit] || 0);
          const condoTotal = condoScores.reduce((a, b) => a + b, 0);
          condoAvg = condoScores.length > 0 ? condoTotal / condoScores.length : 0;
      }

      setFormData(prev => ({
          ...prev,
          overallScore: parseFloat(mainAvg.toFixed(1)),
          condoScore: parseFloat(condoAvg.toFixed(1))
      }));
  }, [formData.criteriaScores, standardCriteria, formData.isInCondo]);

  const handleRoleChange = (roleType: 'revieweeRole', value: ProfileType) => {
    setFormData(prev => ({ ...prev, [roleType]: value }));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScoreChange = (name: string, score: number) => {
    setFormData(prev => ({
      ...prev,
      criteriaScores: {
        ...prev.criteriaScores,
        [name]: score
      }
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const getRevieweeOptions = (reviewer: ProfileType): ProfileType[] => {
      switch(reviewer) {
          case ProfileType.Tenant: return [ProfileType.Landlord, ProfileType.Agency];
          case ProfileType.Landlord: return [ProfileType.Tenant, ProfileType.Agency];
          case ProfileType.Agency: return [ProfileType.Tenant, ProfileType.Landlord];
          default: return [];
      }
  }

  const getIconForRole = (role: ProfileType) => {
      switch(role) {
          case ProfileType.Tenant: return <PersonIcon />;
          case ProfileType.Landlord: return <HomeIcon />;
          case ProfileType.Agency: return <BuildingIcon />;
          default: return <PersonIcon />;
      }
  }
  
  const isNextDisabled = () => {
      if (step === 1) return !formData.revieweeRole;
      if (step === 2) return !formData.contractStart || !formData.contractEnd;
      
      if (step === 3) {
          // Check standard criteria
          const mainComplete = standardCriteria.every(crit => (formData.criteriaScores[crit] || 0) > 0);
          if (!mainComplete) return true;

          // Check condo criteria if enabled
          if (formData.isInCondo) {
              const condoComplete = CONDOMINIUM_CRITERIA.every(crit => (formData.criteriaScores[crit] || 0) > 0);
              if (!condoComplete) return true;
          }
          return false;
      }

      if (step === 4) {
          if (!formData.title.trim() || !formData.comment.trim()) return true;
          if (formData.overallScore <= 3 && !formData.justification.trim()) return true;
          return false;
      }
      return false;
  }

  // --- Step Renders ---
  
  const renderStepContent = () => {
    switch(step) {
        case 1: // Who
            return (
                <div className="animate-fadeIn">
                     <h2 className="text-3xl font-black text-primary text-center mb-2">Quem você está avaliando?</h2>
                     <p className="text-gray-500 text-center mb-10 max-w-md mx-auto">
                        Selecione o perfil que você deseja avaliar para conectar sua experiência ao perfil correto.
                     </p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {getRevieweeOptions(formData.reviewerRole).map(role => (
                            <SelectionCard
                                key={role}
                                label={role}
                                icon={getIconForRole(role)}
                                selected={formData.revieweeRole === role}
                                onClick={() => handleRoleChange('revieweeRole', role)}
                            />
                        ))}
                     </div>
                </div>
            );
        case 2: // When
            return (
                <div className="animate-fadeIn">
                    <h2 className="text-3xl font-black text-primary text-center mb-2">Período do Contrato</h2>
                    <p className="text-gray-500 text-center mb-10 max-w-md mx-auto">
                        Definir as datas ajuda outros usuários a entenderem o contexto da sua avaliação.
                    </p>
                    <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-inner">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Data de Início</label>
                                <input 
                                    type="date" 
                                    name="contractStart" 
                                    value={formData.contractStart} 
                                    onChange={handleInputChange} 
                                    className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-accent text-primary font-bold text-lg" 
                                />
                            </div>
                            <div className="hidden md:block w-8 h-1 bg-gray-300 rounded-full mt-6"></div>
                            <div className="w-full">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Data de Término</label>
                                <input 
                                    type="date" 
                                    name="contractEnd" 
                                    value={formData.contractEnd} 
                                    onChange={handleInputChange} 
                                    className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-accent text-primary font-bold text-lg" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 3: // Score
           const getScoreLabel = (score: number) => {
				if (score === 0) return "Avaliação Calculada";
				if (score <= 2) return "Ruim";
				if (score <= 3) return "Razoável";
				if (score <= 4) return "Bom";
				if (score < 5) return "Muito bom";
				return "Excelente";
			};

			const scoreColor = formData.overallScore <= 2
				? 'bg-red-500 text-white'
				: formData.overallScore <= 3
				? 'bg-yellow-400 text-yellow-900'
				: formData.overallScore <= 4
				? 'bg-orange-400 text-orange-900'
				: formData.overallScore < 5
				? 'bg-blue-500 text-white'
				: 'bg-green-500 text-white';

			const condoScoreColor =
				formData.condoScore <= 2
					? 'bg-red-500 text-white'
					: formData.condoScore <= 3
					? 'bg-yellow-400 text-yellow-900'
					: formData.condoScore <= 4
					? 'bg-orange-400 text-orange-900'
					: formData.condoScore < 5
					? 'bg-blue-500 text-white'
					: 'bg-green-500 text-white';

            return (
                <div className="animate-fadeIn">
                     <h2 className="text-3xl font-black text-primary text-center mb-2">Métricas de Desempenho</h2>
                     <p className="text-gray-500 text-center mb-10 max-w-md mx-auto">
                        Seja justo e honesto. As notas são calculadas automaticamente.
                     </p>
                     
                     <div className="max-w-3xl mx-auto space-y-12 pb-12">
                        {/* --- MAIN REVIEWEE SECTION --- */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                                Avaliação Principal: <span className="text-primary">{formData.revieweeRole}</span>
                            </h3>

                            {/* Main Score Display - Centered and Larger */}
                            <div className="bg-primary rounded-3xl p-10 text-white shadow-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 transform hover:scale-[1.01]">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] border-[40px] border-white/5 rounded-full"></div>
                                
                                <div className="relative z-10 flex flex-col items-center w-full">
                                    <h3 className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-6">Nota Geral (Automática)</h3>
                                    
                                    {/* Centered Large Stars */}
                                    <div className="scale-150 mb-6 drop-shadow-md">
                                        <StarRating rating={Math.round(formData.overallScore)} mode="display" size="lg" />
                                    </div>
                                    
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-6xl font-black tracking-tighter">{formData.overallScore}</span>
                                        <div className={`inline-block px-6 py-1.5 rounded-full font-bold text-sm shadow-lg transition-colors duration-300 ${formData.overallScore > 0 ? scoreColor : 'bg-white/10 text-gray-300'}`}>
                                            {getScoreLabel(formData.overallScore)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Criteria Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {standardCriteria.map(criterion => (
                                    <ScoreCard 
                                        key={criterion} 
                                        label={criterion} 
                                        score={formData.criteriaScores[criterion] || 0} 
                                        onChange={(s) => handleScoreChange(criterion, s)} 
                                    />
                                ))}
                            </div>
                        </div>

                        {/* --- CONDO TOGGLE --- */}
                        {formData.reviewerRole === ProfileType.Tenant && (
                            <div className={`p-6 rounded-2xl flex items-center justify-between mt-8 border transition-all duration-300 ${
                                formData.isInCondo 
                                ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                                : 'bg-gray-50 border-gray-100'
                            }`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors ${formData.isInCondo ? 'bg-blue-500 text-white' : 'bg-white text-gray-400'}`}>
                                        <BuildingIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg">O imóvel fica em condomínio?</p>
                                        <p className="text-sm text-gray-500">Habilita uma seção exclusiva para avaliar áreas comuns e gestão.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer" 
                                        checked={formData.isInCondo} 
                                        onChange={(e) => setFormData(prev => ({...prev, isInCondo: e.target.checked}))} 
                                    />
                                    <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
                                </label>
                            </div>
                        )}

                        {/* --- CONDO REVIEW SECTION (REDESIGNED) --- */}
                        {formData.isInCondo && (
                             <div className="animate-slideUp relative">
                                {/* Visual styling for the condo section */}
                                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-8 shadow-xl">
                                    
                                    <div className="flex flex-col items-center mb-8 border-b border-blue-100 pb-6">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 text-blue-600">
                                            <BuildingIcon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-800 text-center">
                                            Avaliação do Condomínio
                                        </h3>
                                        <p className="text-gray-500 text-sm">Avalie a estrutura e convivência</p>
                                    </div>
                                    
                                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
                                        
                                        {/* Condo Score Display - Distinct Look */}
                                        <div className="w-full md:w-1/3 bg-white rounded-2xl p-6 border border-blue-100 shadow-lg flex flex-col items-center justify-center text-center">
                                            <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-4">Nota Condomínio</span>
                                            
                                            <div className="scale-110 mb-4">
                                                <StarRating rating={Math.round(formData.condoScore)} mode="display" size="md" />
                                            </div>
                                            
                                            <span className="text-5xl font-black text-gray-800 mb-2">{formData.condoScore}</span>
                                            
                                            <div className={`px-4 py-1 rounded-full font-bold text-xs transition-colors duration-300 ${formData.condoScore > 0 ? condoScoreColor : 'bg-gray-100 text-gray-400'}`}>
                                                {getScoreLabel(formData.condoScore)}
                                            </div>
                                        </div>

                                        {/* Condo Criteria Grid */}
                                        <div className="w-full md:w-2/3 grid grid-cols-1 gap-3 content-center">
                                            {CONDOMINIUM_CRITERIA.map(criterion => (
                                                <ScoreCard 
                                                    key={criterion} 
                                                    label={criterion} 
                                                    score={formData.criteriaScores[criterion] || 0} 
                                                    onChange={(s) => handleScoreChange(criterion, s)} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                     </div>
                </div>
            );
        case 4: // Details
            return (
                <div className="animate-fadeIn">
                    <h2 className="text-3xl font-black text-primary text-center mb-2">Os Detalhes</h2>
                    <p className="text-gray-500 text-center mb-8 max-w-md mx-auto">
                        O contexto é fundamental. Conte a história por trás da nota.
                    </p>
                    
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Título da Avaliação</label>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Resuma sua experiência..." 
                                value={formData.title} 
                                onChange={handleInputChange} 
                                className="w-full text-xl font-bold placeholder:text-gray-300 border-none border-b-2 border-gray-100 focus:border-accent focus:ring-0 px-0 py-2 transition-all bg-transparent"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Seu Comentário</label>
                             <textarea 
                                name="comment" 
                                rows={6} 
                                placeholder="Descreva sua experiência em detalhes. Mencione prós e contras específicos..." 
                                value={formData.comment} 
                                onChange={handleInputChange} 
                                className="w-full p-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent text-gray-700 leading-relaxed resize-none shadow-inner" 
                            />
                        </div>

                        {formData.overallScore > 0 && formData.overallScore <= 3 && (
                            <div className="p-6 bg-red-50 rounded-2xl border border-red-100 animate-slideUp">
                                <div className="flex items-center gap-2 mb-3 text-red-800 font-bold">
                                    <span className="material-symbols-outlined">warning</span>
                                    <span>Justificativa Obrigatória para Nota Baixa</span>
                                </div>
                                <textarea 
                                    name="justification" 
                                    rows={3} 
                                    placeholder="Por favor, explique especificamente o motivo da nota baixa para garantir a justiça..." 
                                    value={formData.justification} 
                                    onChange={handleInputChange} 
                                    className="w-full p-4 rounded-xl bg-white border border-red-200 focus:ring-2 focus:ring-red-500 outline-none text-gray-700" 
                                />
                            </div>
                        )}
                    </div>
                </div>
            );
        case 5: // Summary
            return (
                 <div className="animate-fadeIn max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black text-primary text-center mb-8">Resumo da Avaliação</h2>
                    
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
                        {/* Header Banner */}
                        <div className="bg-primary p-6 text-white flex justify-between items-center relative overflow-hidden">
                             <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
                             <div>
                                 <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Avaliando</p>
                                 <h3 className="text-xl font-bold">{formData.revieweeRole}</h3>
                             </div>
                             
                             <div className="flex gap-4">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-center">
                                    <div className="text-2xl font-black text-accent">{formData.overallScore}</div>
                                    <div className="text-[10px] uppercase font-bold">Geral</div>
                                </div>
                                {formData.isInCondo && (
                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-center">
                                        <div className="text-2xl font-black text-blue-200">{formData.condoScore}</div>
                                        <div className="text-[10px] uppercase font-bold">Condomínio</div>
                                    </div>
                                )}
                             </div>
                        </div>

                        <div className="p-8">
                            <h4 className="text-xl font-bold text-primary mb-4">"{formData.title}"</h4>
                            <p className="text-gray-600 leading-relaxed mb-6 italic border-l-4 border-accent pl-4">
                                {formData.comment}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                 <div>
                                     <h5 className="font-bold text-gray-800 text-sm mb-3 border-b pb-1">Critérios: {formData.revieweeRole}</h5>
                                     {standardCriteria.map((key) => (
                                        <div key={key} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2 mb-2">
                                            <span className="text-gray-500 truncate mr-2">{key}</span>
                                            <div className="flex gap-0.5 shrink-0">
                                                {Array.from({length: formData.criteriaScores[key]}).map((_, i) => (
                                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                 </div>
                                 
                                 {formData.isInCondo && (
                                     <div>
                                        <h5 className="font-bold text-gray-800 text-sm mb-3 border-b pb-1">Critérios: Condomínio</h5>
                                        {CONDOMINIUM_CRITERIA.map((key) => (
                                            <div key={key} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2 mb-2">
                                                <span className="text-gray-500 truncate mr-2">{key}</span>
                                                <div className="flex gap-0.5 shrink-0">
                                                    {Array.from({length: formData.criteriaScores[key]}).map((_, i) => (
                                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                 )}
                            </div>

                            <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${formData.isAnonymous ? 'bg-primary border-primary' : 'bg-white border-gray-300'}`}>
                                    <input type="checkbox" checked={formData.isAnonymous} onChange={(e) => setFormData(prev => ({...prev, isAnonymous: e.target.checked}))} className="hidden" />
                                    {formData.isAnonymous && <CheckCircleIcon className="w-4 h-4 text-white" />}
                                </div>
                                <div>
                                    <span className="font-bold text-gray-800 block text-sm">Postar Anonimamente</span>
                                    <span className="text-xs text-gray-500">Sua identidade será ocultada da visão pública.</span>
                                </div>
                            </label>
                        </div>
                    </div>
                 </div>
            );
        case 6: // Success
             return (
                <div className="text-center py-20 animate-scaleIn">
                    <div className="w-32 h-32 mx-auto relative mb-8">
                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-accent to-green-400 rounded-full flex items-center justify-center shadow-2xl shadow-green-200">
                            <ThumbsUpIcon className="w-16 h-16 text-white" />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black text-primary mb-6">Avaliação Publicada!</h2>
                    <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed mb-10">
                        Você acabou de contribuir para um mercado imobiliário mais transparente. Sua voz importa.
                    </p>
                    <button
                        onClick={onCancel}
                        className="bg-primary text-white font-bold px-12 py-4 rounded-full hover:bg-[#0f3461] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        Voltar ao Painel
                    </button>
                </div>
            )
        default: return null;
    }
  }

  const totalSteps = 5;

  return (
    <div className="max-w-4xl mx-auto py-8">
        {step <= totalSteps && (
             <StepIndicator currentStep={step} totalSteps={totalSteps} />
        )}

        <div className="mt-8 min-h-[600px] flex flex-col justify-between relative">
             {/* Content Area */}
             <div className="mb-12 relative z-10">
                {renderStepContent()}
             </div>

             {/* Navigation Footer */}
             {step <= totalSteps && (
                <div className="flex justify-between items-center pt-8 border-t border-gray-100 sticky bottom-0 bg-background-light/90 backdrop-blur-sm p-4 z-20">
                    <button
                        onClick={step === 1 ? onCancel : prevStep}
                        className="text-gray-400 font-bold hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                        {step !== 1 && <ChevronLeftIcon className="w-4 h-4" />}
                        {step === 1 ? 'Cancelar' : 'Voltar'}
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={isNextDisabled()}
                        className="bg-primary text-white font-bold px-10 py-3 rounded-xl hover:bg-[#0f3461] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform active:scale-95 flex items-center gap-2"
                    >
                        {step === totalSteps ? 'Publicar Avaliação' : 'Próximo Passo'}
                        {step !== totalSteps && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                    </button>
                </div>
             )}
        </div>
        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
             @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            @keyframes slideUp {
                from { transform: translateY(10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default ReviewFlow;