import React, { useState, useEffect } from 'react';
import { ProfileType } from '../types';
import { 
    UploadCloudIcon, 
    CheckCircleIcon, 
    PersonIcon, 
    HomeIcon, 
    BuildingIcon,
    ShieldIcon,
    CloseIcon
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
      className={`relative w-full p-6 rounded-2xl border transition-all duration-500 overflow-hidden group ${
        selected
          ? 'bg-primary border-primary shadow-[0_10px_40px_-10px_rgba(10,35,66,0.5)] transform -translate-y-2'
          : 'bg-white border-gray-100 hover:border-accent hover:shadow-lg hover:-translate-y-1'
      }`}
    >
        {/* Background glow for selected state */}
        {selected && (
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
        )}

        <div className="relative z-10 flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                selected ? 'bg-white/10 text-accent rotate-0' : 'bg-gray-50 text-gray-400 group-hover:bg-accent/10 group-hover:text-primary group-hover:rotate-6'
            }`}>
                {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
            </div>
            
            <div className="text-center">
                <span className={`block font-bold text-lg transition-colors duration-300 ${selected ? 'text-white' : 'text-gray-600 group-hover:text-primary'}`}>
                    {label}
                </span>
                <span className={`text-xs mt-1 block transition-colors duration-300 ${selected ? 'text-blue-200' : 'text-gray-400'}`}>
                    {label === ProfileType.Tenant ? 'Eu aluguei este imóvel.' : label === ProfileType.Landlord ? 'Eu sou propietário(a) deste imóvel.' : 'Eu intermediei esta locação.'}
                </span>
            </div>
        </div>

        {selected && (
            <div className="absolute top-4 right-4 text-accent animate-scaleIn">
                <CheckCircleIcon className="w-6 h-6" />
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
            // Simulate scanning effect
            setTimeout(() => {
                setIsScanning(false);
                onFileUpload(file);
            }, 2000);
        } else {
            alert('Please upload a valid file (PDF, JPG, PNG).');
        }
    }

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    };

    if (uploadedFile) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-primary text-white p-1">
                 {/* Scanning Animation Line */}
                 {isScanning && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_#88D498] animate-scan z-20"></div>
                )}
                
                <div className="bg-[#0f3461] rounded-xl p-6 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isScanning ? 'bg-white/10 text-white animate-pulse' : 'bg-accent text-primary'}`}>
                            {isScanning ? <ShieldIcon className="w-6 h-6" /> : <CheckCircleIcon className="w-6 h-6" />}
                        </div>
                        <div>
                            <p className="font-bold text-white text-lg">{uploadedFile.name}</p>
                            <p className={`text-sm font-medium ${isScanning ? 'text-blue-300' : 'text-accent'}`}>
                                {isScanning ? 'Validando autenticidade...' : 'Documento Verificado'}
                            </p>
                        </div>
                    </div>
                    {!isScanning && (
                        <button 
                            onClick={() => { setUploadedFile(null); }} 
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <CloseIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div 
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            className={`relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
                isDragging 
                ? 'bg-accent/10 border-2 border-accent scale-[1.01]' 
                : 'bg-gray-50 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-white'
            }`}
        >
            <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
            />
            
            <div className="p-12 flex flex-col items-center justify-center text-center relative z-10">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                    isDragging ? 'bg-white text-accent shadow-xl scale-110' : 'bg-white text-gray-400 shadow-sm group-hover:text-primary group-hover:scale-110'
                }`}>
                    <UploadCloudIcon className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-xl text-primary mb-2 group-hover:text-accent transition-colors">
                    Arraste e solte seu documento
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto mb-6">
                    Ou clique para procurar. Aceitamos PDF e Imagens.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <ShieldIcon className="w-3 h-3" />
                    Envio Criptografado
                </div>
            </div>
        </div>
    )
}

const ValidationFlow: React.FC<ValidationFlowProps> = ({ revieweeIdentifier, onValidationSuccess, onCancel }) => {
    const [reviewerRole, setReviewerRole] = useState<ProfileType | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [step, setStep] = useState(1);

    const handleFileSuccess = (file: File) => {
        setIsReady(true);
    };

    const handleNext = () => {
        if (step === 1 && reviewerRole) setStep(2);
        if (step === 2 && isReady) {
            onValidationSuccess(reviewerRole!);
        }
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side: Context & Progress */}
                <div className="w-full md:w-1/3">
                    <div className="bg-primary text-white rounded-3xl p-8 sticky top-24 overflow-hidden relative min-h-[400px] flex flex-col justify-between shadow-2xl">
                         {/* Abstract Art */}
                        <div className="absolute top-0 right-0 w-full h-full">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-[60px]"></div>
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#051326] to-transparent"></div>
                        </div>

                        <div className="relative z-10">
                            <button onClick={onCancel} className="text-sm text-gray-400 hover:text-white flex items-center gap-1 mb-8 transition-colors">
                                <CloseIcon className="w-4 h-4" /> Cancelar Verificação
                            </button>
                            
                            <h1 className="text-3xl font-black mb-2">Verificação<br/>de Segurança</h1>
                            <div className="h-1 w-12 bg-accent rounded-full mb-6"></div>
                            
                            <p className="text-blue-100 text-sm leading-relaxed mb-8">
                                Para garantir a integridade do ImobiReview, verificamos se uma relação contratual real existe antes de permitir uma avaliação para <span className="bg-white/10 px-1.5 rounded font-mono text-accent">{revieweeIdentifier}</span>.
                            </p>

                            <div className="space-y-6">
                                <div className={`flex items-center gap-4 transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step === 1 ? 'bg-accent border-accent text-primary' : 'border-white/30 text-white'}`}>1</div>
                                    <span className="font-bold">Quem é você neste contrato?</span>
                                </div>
                                <div className={`flex items-center gap-4 transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step === 2 ? 'bg-accent border-accent text-primary' : 'border-white/30 text-white'}`}>2</div>
                                    <span className="font-bold">Upload do Contrato</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-8 border-t border-white/10 mt-8">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <ShieldIcon className="w-4 h-4 text-accent" />
                                <span>Criptografia SSL de 256 bits</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Interactive Form */}
                <div className="w-full md:w-2/3">
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 min-h-[500px] flex flex-col">
                        {step === 1 && (
                            <div className="animate-fadeIn flex-grow flex flex-col">
                                <h2 className="text-2xl font-bold text-primary mb-2">Quem é você neste contrato?</h2>
                                <p className="text-gray-500 mb-8">Escolha a opção que representa sua participação no contrato:</p>
                                
                                <div className="grid grid-cols-1 gap-4 mb-8">
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
                                        className="bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0f3461] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fadeIn flex-grow flex flex-col">
                                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-primary mb-6 flex items-center gap-1 text-sm font-bold w-fit">
                                    ← Voltar
                                </button>
                                <h2 className="text-2xl font-bold text-primary mb-2">Prova de Vínculo</h2>
                                <p className="text-gray-500 mb-8">
                                    Envie um documento (Contrato de Locação, Escritura ou Conta de Serviço) que comprove sua relação com o imóvel.
                                </p>

                                <div className="flex-grow flex flex-col justify-center mb-8">
                                    <FileUploader onFileUpload={handleFileSuccess} />
                                </div>

                                <div className="mt-auto flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                    <div className="text-xs text-gray-500 max-w-[200px]">
                                        Seu documento é apenas usado para verificação e não será publicado.
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        disabled={!isReady}
                                        className="bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-primary px-8 py-3 rounded-xl font-bold hover:bg-[#7bc48b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
                                    >
                                        Verificar & Iniciar Avaliação
                                        <CheckCircleIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan { animation: scan 2s linear infinite; }
                @keyframes scaleIn {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default ValidationFlow;