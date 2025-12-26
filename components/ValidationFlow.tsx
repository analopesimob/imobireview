import React, { useState, useEffect } from 'react';
import { ProfileType } from '../types';
import { 
    UploadCloudIcon, 
    CheckCircleIcon, 
    PersonIcon, 
    HomeIcon, 
    BuildingIcon,
    ShieldIcon,
    CloseIcon,
    LogoIcon
} from './icons';

interface ValidationFlowProps {
  revieweeIdentifier: string;
  onValidationSuccess: (role: ProfileType) => void;
  onCancel: () => void;
}

const RoleCard: React.FC<{
    label: string, 
    icon: React.ReactNode, 
    selected: boolean, 
    onClick: () => void
}> = ({ label, icon, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`relative w-full p-6 rounded-[2rem] border-2 transition-all duration-500 group overflow-hidden ${
        selected
          ? 'bg-primary border-accent shadow-[0_20px_50px_-15px_rgba(136,212,152,0.3)] -translate-y-2'
          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1'
      }`}
    >
        {/* Glow de fundo no selecionado */}
        {selected && (
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-accent/20 rounded-full blur-[40px] animate-pulse"></div>
        )}

        <div className="relative z-10 flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                selected ? 'bg-accent text-primary scale-110 rotate-[360deg]' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary group-hover:rotate-12'
            }`}>
                {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
            </div>
            
            <div className="text-left">
                <span className={`block font-black text-lg tracking-tight transition-colors duration-300 ${selected ? 'text-white' : 'text-gray-800'}`}>
                    {label}
                </span>
                <p className={`text-xs mt-0.5 font-medium transition-colors duration-300 ${selected ? 'text-accent' : 'text-gray-400'}`}>
                    {label === ProfileType.Tenant ? 'Eu aluguei este imóvel' : label === ProfileType.Landlord ? 'Eu sou o proprietário' : 'Eu realizei a intermediação'}
                </p>
            </div>
        </div>

        {selected && (
            <div className="absolute bottom-4 right-6 text-accent animate-bounce">
                <CheckCircleIcon className="w-5 h-5" />
            </div>
        )}
    </button>
);

const FileUploader: React.FC<{onFileUpload: (file: File) => void}> = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleFile = (file: File | null) => {
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            setUploadedFile(file);
            setIsScanning(true);
            setTimeout(() => {
                setIsScanning(false);
                onFileUpload(file);
            }, 2500);
        } else {
            alert('Por favor, envie um PDF ou Imagem válida.');
        }
    }

    if (uploadedFile) {
        return (
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#051326] border border-white/10 p-1 group">
                 {/* Laser Scanner Effect */}
                 {isScanning && (
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_20px_#88D498] animate-laser z-20"></div>
                )}
                
                <div className="bg-gradient-to-br from-primary to-[#0f3461] rounded-[2.3rem] p-10 flex flex-col items-center justify-center text-center relative z-10 min-h-[300px]">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 ${isScanning ? 'bg-white/5 text-white animate-pulse' : 'bg-accent text-primary scale-110'}`}>
                        {isScanning ? <ShieldIcon className="w-10 h-10" /> : <CheckCircleIcon className="w-10 h-10" />}
                    </div>
                    
                    <div>
                        <h4 className="font-black text-2xl text-white mb-2 tracking-tight">
                            {isScanning ? 'Autenticando...' : 'Documento Pronto'}
                        </h4>
                        <p className={`text-sm font-bold uppercase tracking-widest ${isScanning ? 'text-blue-300' : 'text-accent'}`}>
                            {isScanning ? 'Validando assinaturas digitais' : uploadedFile.name}
                        </p>
                    </div>

                    {!isScanning && (
                        <button 
                            onClick={() => setUploadedFile(null)} 
                            className="mt-8 px-6 py-2 rounded-full bg-white/10 hover:bg-red-500/20 text-white text-xs font-bold transition-all border border-white/10"
                        >
                            Substituir Arquivo
                        </button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div 
            className={`relative group cursor-pointer overflow-hidden rounded-[3rem] transition-all duration-500 border-2 border-dashed ${
                isDragging 
                ? 'bg-accent/5 border-accent scale-[1.02] shadow-2xl' 
                : 'bg-gray-50/50 border-gray-200 hover:border-primary hover:bg-white hover:shadow-2xl'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
        >
            <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
            />
            
            <div className="p-16 flex flex-col items-center justify-center text-center relative z-10">
                <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 transition-all duration-500 ${
                    isDragging ? 'bg-primary text-accent rotate-12 scale-110' : 'bg-white text-gray-300 shadow-xl group-hover:text-primary group-hover:-rotate-12 group-hover:scale-110'
                }`}>
                    <UploadCloudIcon className="w-12 h-12" />
                </div>
                <h3 className="font-black text-2xl text-primary mb-3 tracking-tight">
                    Solte o contrato aqui
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
                    Arraste o PDF ou tire uma foto do documento para validação criptográfica.
                </p>
                <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-white border border-gray-100 px-5 py-2.5 rounded-full shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <ShieldIcon className="w-4 h-4 text-accent" />
                    Upload 100% Criptografado
                </div>
            </div>
        </div>
    )
}

const ValidationFlow: React.FC<ValidationFlowProps> = ({ revieweeIdentifier, onValidationSuccess, onCancel }) => {
    const [reviewerRole, setReviewerRole] = useState<ProfileType | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (step === 1 && reviewerRole) setStep(2);
        if (step === 2 && isReady) {
            onValidationSuccess(reviewerRole!);
        }
    }

    return (
        <div className="max-w-6xl mx-auto py-10 font-display">
            <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                
                {/* Lateral: Identity Panel */}
                <div className="w-full lg:w-80 shrink-0">
                    <div className="bg-primary h-full min-h-[450px] rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
                        {/* Background Effects */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-full blur-[80px]"></div>
                            <div className="absolute bottom-20 -left-10 w-32 h-32 bg-blue-400 rounded-full blur-[60px]"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]"></div>
                        </div>

                        <div className="relative z-10">
                            <button onClick={onCancel} className="flex items-center gap-2 text-gray-400 hover:text-white transition-all font-bold text-xs mb-10 group">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 group-hover:text-red-400 transition-all">
                                    <CloseIcon className="w-4 h-4" />
                                </div>
                                CANCELAR 
                            </button>
                            
                            <div className="mb-10">
                                <div className="w-12 h-12 bg-accent text-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                                    <ShieldIcon className="w-6 h-6" />
                                </div>
                                <h1 className="text-4xl font-black mb-4 tracking-tighter leading-none">Cofre de<br/>Confiança</h1>
                                <div className="h-1.5 w-12 bg-accent rounded-full mb-8"></div>
                                <p className="text-blue-100/70 text-sm font-medium leading-relaxed">
                                    Validamos sua relação contratual com <span className="text-white font-bold">{revieweeIdentifier}</span> para manter o ecossistema livre de fraudes.
                                </p>
                            </div>

                            {/* Progress Dots */}
                            <div className="space-y-6">
                                <div className={`flex items-center gap-4 transition-all duration-500 ${step === 1 ? 'translate-x-2' : 'opacity-40'}`}>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${step === 1 ? 'bg-accent border-accent text-primary shadow-[0_0_15px_rgba(136,212,152,0.5)]' : 'border-white/20 text-white'}`}>01</div>
                                    <span className="font-black text-xs uppercase tracking-widest">Seu Papel</span>
                                </div>
                                <div className={`flex items-center gap-4 transition-all duration-500 ${step === 2 ? 'translate-x-2' : 'opacity-40'}`}>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${step === 2 ? 'bg-accent border-accent text-primary shadow-[0_0_15px_rgba(136,212,152,0.5)]' : 'border-white/20 text-white'}`}>02</div>
                                    <span className="font-black text-xs uppercase tracking-widest">Prova Digital</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-8 border-t border-white/10 mt-10">
                            <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
                                Processamento Seguro
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow">
                    <div className="bg-white/70 backdrop-blur-xl rounded-[3.5rem] p-10 lg:p-16 shadow-2xl border border-white/80 h-full flex flex-col relative overflow-hidden">
                        {/* Watermark Logo */}
                        <div className="absolute -right-20 -bottom-20 opacity-[0.02] pointer-events-none">
                            <LogoIcon className="w-96 h-96" />
                        </div>

                        {step === 1 && (
                            <div className="animate-fadeIn flex-grow flex flex-col relative z-10">
                                <div className="mb-12">
                                    <h2 className="text-4xl font-black text-primary mb-3 tracking-tighter">Qual sua função?</h2>
                                    <p className="text-gray-500 font-medium">Selecione como você participou deste contrato.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-5 mb-12">
                                    <RoleCard
                                        label={ProfileType.Tenant}
                                        icon={<PersonIcon />}
                                        selected={reviewerRole === ProfileType.Tenant}
                                        onClick={() => setReviewerRole(ProfileType.Tenant)}
                                    />
                                    <RoleCard
                                        label={ProfileType.Landlord}
                                        icon={<HomeIcon />}
                                        selected={reviewerRole === ProfileType.Landlord}
                                        onClick={() => setReviewerRole(ProfileType.Landlord)}
                                    />
                                    <RoleCard
                                        label={ProfileType.Agency}
                                        icon={<BuildingIcon />}
                                        selected={reviewerRole === ProfileType.Agency}
                                        onClick={() => setReviewerRole(ProfileType.Agency)}
                                    />
                                </div>

                                <div className="mt-auto flex justify-end">
                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!reviewerRole}
                                        className="bg-primary disabled:opacity-30 disabled:cursor-not-allowed text-white px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-[#0f3461] transition-all shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 active:scale-95"
                                    >
                                        Próxima Etapa
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fadeIn flex-grow flex flex-col relative z-10">
                                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-4xl font-black text-primary mb-3 tracking-tighter">Upload do Documento</h2>
                                        <p className="text-gray-500 font-medium">Anexe o contrato ou comprovante que te liga ao imóvel.</p>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-primary font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all w-fit">
                                        ← Voltar
                                    </button>
                                </div>

                                <div className="flex-grow flex flex-col justify-center mb-10">
                                    <FileUploader onFileUpload={() => setIsReady(true)} />
                                </div>

                                <div className="mt-auto flex flex-col md:flex-row justify-between items-center bg-gray-50/80 p-6 rounded-[2rem] gap-6 border border-gray-100">
                                    <div className="flex items-center gap-4 max-w-sm">
                                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                            <ShieldIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed">
                                            Seus documentos são usados apenas para IA de validação e nunca são exibidos publicamente.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        disabled={!isReady}
                                        className="w-full md:w-auto bg-accent disabled:opacity-30 disabled:cursor-not-allowed text-primary px-10 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-accent/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95"
                                    >
                                        Validar e Iniciar
                                        <CheckCircleIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes laser {
                    0% { top: 0%; opacity: 0; filter: hue-rotate(0deg); }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; filter: hue-rotate(90deg); }
                }
                .animate-laser { animation: laser 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>
    );
};

export default ValidationFlow;
