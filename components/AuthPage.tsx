import React, { useState, useEffect } from 'react';
import EffectBackground from './EffectBackground';
import { ProfileType } from '../types';
import { 
  LogoIcon, 
  VisibilityIcon, 
  VisibilityOffIcon, 
  GoogleIcon,
  CloseIcon,
  AppleIcon,
  FacebookIcon,
  MailIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  PhoneIcon,
  PersonIcon,
  HomeIcon,
  BuildingIcon,
  UploadCloudIcon,
  CheckCircleIcon,
  ShieldIcon
} from './icons';

interface AuthPageProps {
    onLoginClick?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  
  // State for multi-step signup
  const [signUpStep, setSignUpStep] = useState<'role' | 'initial' | 'email' | 'details'>('role');
  const [selectedRole, setSelectedRole] = useState<ProfileType | null>(null);
  
  // Generic fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // Individual fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  
  // Agency specific fields
  const [agencyName, setAgencyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [creci, setCreci] = useState('');
  const [creciFile, setCreciFile] = useState<File | null>(null);
  const [isCreciScanning, setIsCreciScanning] = useState(false);

  // Reset state when modal is closed
  useEffect(() => {
    if (!isSignUpOpen) {
        setSignUpStep('role');
        setSelectedRole(null);
        setEmail('');
        setPhone('');
        setFirstName('');
        setLastName('');
        setDob('');
        setPassword('');
        setAgencyName('');
        setCnpj('');
        setCreci('');
        setCreciFile(null);
        setIsCreciScanning(false);
    }
  }, [isSignUpOpen]);

  const handleRoleSelect = (role: ProfileType) => {
      setSelectedRole(role);
      setSignUpStep('initial');
  }

  const handleEmailContinue = () => {
      if(email.trim()) {
          setSignUpStep('details');
      }
  }

  const handlePhoneContinue = () => {
      if(phone.trim()) {
          setSignUpStep('details');
      }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCreciFile(file);
      setIsCreciScanning(true);
      
      // Simulate professional scanning/validation
      setTimeout(() => {
          setIsCreciScanning(false);
      }, 2500);
    }
  }

  const handleFinalSignUp = () => {
      // Simulate API call / Success
      console.log("Signing up as:", selectedRole, {
          email, phone, password, firstName, lastName, dob, agencyName, cnpj, creci, creciFile
      });
      setIsSignUpOpen(false);
      if (onLoginClick) onLoginClick();
  }

  const renderModalHeader = () => {
      if (signUpStep === 'role') {
         return (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <button onClick={() => setIsSignUpOpen(false)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                      <CloseIcon className="w-4 h-4 text-gray-800" />
                  </button>
                  <h3 className="font-bold text-gray-800 uppercase tracking-widest text-[10px]">Crie sua conta</h3>
                  <div className="w-8"></div>
              </div>
          );
      } else if (signUpStep === 'initial') {
          return (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <button onClick={() => setSignUpStep('role')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ChevronLeftIcon className="w-4 h-4 text-gray-800" />
                  </button>
                  <h3 className="font-bold text-gray-800 uppercase tracking-widest text-[10px]">Cadastrar</h3>
                  <div className="w-8"></div>
              </div>
          );
      } else if (signUpStep === 'email') {
           return (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <button onClick={() => setSignUpStep('initial')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ChevronLeftIcon className="w-4 h-4 text-gray-800" />
                  </button>
                  <h3 className="font-bold text-gray-800 uppercase tracking-widest text-[10px]">Cadastro por E-mail</h3>
                  <div className="w-8"></div>
              </div>
          );
      } else {
          const prev = email ? 'email' : 'initial';
          return (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <button onClick={() => setSignUpStep(prev)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ChevronLeftIcon className="w-4 h-4 text-gray-800" />
                  </button>
                  <h3 className="font-bold text-gray-800 uppercase tracking-widest text-[10px]">Finalizar cadastro</h3>
                  <div className="w-8"></div>
              </div>
          );
      }
  }

  const renderModalContent = () => {
      if (signUpStep === 'role') {
          return (
              <div className="animate-fadeIn">
                <div className="mb-8">
                      <h2 className="text-2xl font-black text-primary mb-2">Bem-vindo ao ImobiReview</h2>
                      <p className="text-sm text-gray-500">Para começar, selecione o tipo de conta que deseja criar.</p>
                </div>
                <div className="space-y-4">
                    <button onClick={() => handleRoleSelect(ProfileType.Tenant)} className="w-full flex items-center p-5 border border-gray-200 rounded-2xl hover:border-primary hover:bg-gray-50 transition-all group text-left hover:shadow-lg">
                        <div className="w-12 h-12 bg-green-50 text-accent rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-white transition-all">
                            <PersonIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 group-hover:text-primary">Sou Inquilino</h4>
                            <p className="text-xs text-gray-500">Quero avaliar imóveis, locadores e imobiliárias.</p>
                        </div>
                    </button>
                    <button onClick={() => handleRoleSelect(ProfileType.Landlord)} className="w-full flex items-center p-5 border border-gray-200 rounded-2xl hover:border-primary hover:bg-gray-50 transition-all group text-left hover:shadow-lg">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-white transition-all">
                            <HomeIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 group-hover:text-primary">Sou Locador</h4>
                            <p className="text-xs text-gray-500">Sou proprietário e quero avaliar meus inquilinos.</p>
                        </div>
                    </button>
                    <button onClick={() => handleRoleSelect(ProfileType.Agency)} className="w-full flex items-center p-5 border border-gray-200 rounded-2xl hover:border-primary hover:bg-gray-50 transition-all group text-left hover:shadow-lg">
                        <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-white transition-all">
                            <BuildingIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 group-hover:text-primary">Sou Imobiliária</h4>
                            <p className="text-xs text-gray-500">Gerencio contratos e quero construir meu score.</p>
                        </div>
                    </button>
                </div>
              </div>
          )
      }

      if (signUpStep === 'initial') {
          return (
              <div className="animate-fadeIn">
                   <div className="mb-6">
                      <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold mb-3 uppercase tracking-widest">
                          Perfil: {selectedRole}
                      </div>
                      <h2 className="text-2xl font-black text-primary mb-1">Verifique seu telefone</h2>
                      <p className="text-sm text-gray-500">Enviaremos um código para validar seu número.</p>
                  </div>

                  <div className="mb-4">
                      <div className="border border-gray-300 rounded-t-2xl px-4 py-3 relative hover:border-gray-800 focus-within:border-primary cursor-pointer transition-colors">
                          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">País</label>
                          <select className="w-full bg-transparent outline-none appearance-none text-gray-800 font-medium cursor-pointer">
                              <option>Brasil (+55)</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                          </div>
                      </div>
                      <div className="border-x border-b border-gray-300 rounded-b-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary relative -mt-[1px] transition-colors">
                           <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">Telefone</label>
                          <input 
                              type="tel" 
                              className="w-full outline-none text-gray-800 placeholder:text-gray-300 font-medium"
                              placeholder="(11) 99999-9999"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                          />
                      </div>
                  </div>

                  <button 
                    onClick={handlePhoneContinue}
                    disabled={!phone}
                    className="w-full bg-primary hover:bg-[#0f3461] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-all mb-6 shadow-lg active:scale-[0.98]"
                  >
                      Continuar
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                      <div className="h-[1px] bg-gray-200 flex-1"></div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ou</span>
                      <div className="h-[1px] bg-gray-200 flex-1"></div>
                  </div>

                  <div className="space-y-3">
                      <button className="w-full border border-gray-200 hover:bg-gray-50 rounded-xl py-3 px-4 flex items-center relative transition-colors">
                          <FacebookIcon className="w-5 h-5 absolute left-4 text-[#1877F2]" />
                          <span className="w-full text-center text-sm font-bold text-gray-700">Continuar com Facebook</span>
                      </button>
                      <button className="w-full border border-gray-200 hover:bg-gray-50 rounded-xl py-3 px-4 flex items-center relative transition-colors">
                          <GoogleIcon className="w-5 h-5 absolute left-4" />
                          <span className="w-full text-center text-sm font-bold text-gray-700">Continuar com Google</span>
                      </button>
                      <button onClick={() => setSignUpStep('email')} className="w-full border border-gray-200 hover:bg-gray-50 rounded-xl py-3 px-4 flex items-center relative transition-colors">
                          <MailIcon className="w-5 h-5 absolute left-4 text-gray-700" />
                          <span className="w-full text-center text-sm font-bold text-gray-700">Continuar com e-mail</span>
                      </button>
                  </div>
              </div>
          );
      }

      if (signUpStep === 'email') {
          return (
              <div className="animate-fadeIn">
                  <div className="mb-6">
                      <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold mb-3 uppercase tracking-widest">
                          Perfil: {selectedRole}
                      </div>
                      <h2 className="text-2xl font-black text-primary mb-1">Informe seu e-mail</h2>
                      <p className="text-sm text-gray-500">Usaremos este e-mail para comunicações seguras.</p>
                  </div>
                  
                  <div className="mb-4">
                      <div className="border border-gray-300 rounded-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary relative cursor-text transition-colors">
                           <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">E-mail</label>
                          <input 
                              type="email" 
                              className="w-full outline-none text-gray-800 placeholder:text-gray-300 font-medium"
                              placeholder="exemplo@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              autoFocus
                          />
                      </div>
                  </div>

                  <button 
                      onClick={handleEmailContinue}
                      disabled={!email}
                      className="w-full bg-primary hover:bg-[#0f3461] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all mb-6 shadow-lg active:scale-[0.98]"
                  >
                      Continuar
                  </button>
              </div>
          );
      }

      if (signUpStep === 'details') {
           return (
              <div className="animate-fadeIn">
                  {selectedRole === ProfileType.Agency ? (
                      // Agency-specific Details
                      <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-primary mb-1">Dados da Imobiliária</h2>
                            <p className="text-sm text-gray-500">Preencha os dados profissionais da sua agência.</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="border border-gray-300 rounded-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary transition-colors">
                                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">Nome da Imobiliária</label>
                                <input type="text" className="w-full outline-none text-gray-800 font-medium placeholder:text-gray-200" placeholder="Nome Fantasia" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary transition-colors">
                                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">CNPJ</label>
                                    <input type="text" placeholder="00.000.000/0001-00" className="w-full outline-none text-gray-800 font-medium placeholder:text-gray-200" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                                </div>
                                <div className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary transition-colors">
                                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">CRECI Jurídico</label>
                                    <input type="text" placeholder="Ex: 12345-J" className="w-full outline-none text-gray-800 font-medium placeholder:text-gray-200" value={creci} onChange={(e) => setCreci(e.target.value)} />
                                </div>
                            </div>
                            
                            {/* --- REDESIGNED CRECI UPLOADER (Validation Style) --- */}
                            <div className="mt-4">
                                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-3 tracking-wider ml-1">Comprovante CRECI</label>
                                {creciFile ? (
                                    <div className="relative overflow-hidden rounded-2xl bg-primary text-white p-1 shadow-lg group">
                                         {/* Scanning Animation Bar */}
                                         {isCreciScanning && (
                                            <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_20px_#88D498] animate-scan z-20"></div>
                                        )}
                                        
                                        <div className="bg-[#0f3461] rounded-xl p-5 flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isCreciScanning ? 'bg-white/10 text-white animate-pulse' : 'bg-accent text-primary shadow-lg scale-105'}`}>
                                                    {isCreciScanning ? <ShieldIcon className="w-6 h-6" /> : <CheckCircleIcon className="w-6 h-6" />}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="font-bold text-white text-sm truncate max-w-[200px]">{creciFile.name}</p>
                                                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isCreciScanning ? 'text-blue-300' : 'text-accent'}`}>
                                                        {isCreciScanning ? 'Validando documento...' : 'Documento Verificado'}
                                                    </p>
                                                </div>
                                            </div>
                                            {!isCreciScanning && (
                                                <button 
                                                    onClick={() => { setCreciFile(null); }} 
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 hover:text-white transition-all group-hover:opacity-100"
                                                >
                                                    <CloseIcon className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-white hover:shadow-md">
                                        <input 
                                            type="file" 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                                            onChange={handleFileChange}
                                            accept=".pdf,.jpg,.jpeg,.png"
                                        />
                                        <div className="p-8 flex flex-col items-center justify-center text-center relative z-10">
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                                                <UploadCloudIcon className="w-7 h-7" />
                                            </div>
                                            <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                                                Upload do CRECI
                                            </h3>
                                            <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">
                                                Clique ou arraste o PDF ou Imagem para validação profissional.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                      </>
                  ) : (
                      // Individual Details (Tenant/Landlord)
                      <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-primary mb-1">Dados Pessoais</h2>
                            <p className="text-sm text-gray-500">Seja bem-vindo! Precisamos de alguns dados básicos.</p>
                        </div>
                        <div className="mb-6">
                            <div className="mb-1">
                                <div className="border border-gray-300 rounded-t-2xl px-4 py-3 relative hover:border-gray-800 focus-within:border-primary transition-colors">
                                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">Primeiro Nome</label>
                                    <input type="text" className="w-full outline-none text-gray-800 font-medium" placeholder="Nome" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="border-x border-b border-gray-300 rounded-b-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary -mt-[1px] transition-colors">
                                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">Sobrenome</label>
                                    <input type="text" className="w-full outline-none text-gray-800 font-medium" placeholder="Sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="border border-gray-300 rounded-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary transition-colors">
                                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">Data de Nascimento</label>
                                <input type="date" className="w-full outline-none text-gray-800 font-medium bg-transparent" value={dob} onChange={(e) => setDob(e.target.value)} />
                            </div>
                        </div>
                      </>
                  )}

                  {/* Shared Info Fields */}
                  <div className="space-y-4 mb-6">
                      <div className="flex gap-4">
                        <div className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary bg-gray-50/50 transition-colors">
                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">E-mail</label>
                            <input type="email" className="w-full outline-none text-gray-800 font-medium bg-transparent" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary bg-gray-50/50 transition-colors">
                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">Telefone</label>
                            <input type="tel" className="w-full outline-none text-gray-800 font-medium bg-transparent" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                      </div>
                      
                      <div className="border border-gray-300 rounded-2xl px-4 py-3 hover:border-gray-800 focus-within:border-primary relative flex items-center transition-colors">
                          <div className="flex-grow">
                              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">Crie uma Senha</label>
                              <input type={showPassword ? "text" : "password"} className="w-full outline-none text-gray-800 font-medium placeholder:text-gray-200" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-primary hover:text-accent p-1 transition-colors">
                              {showPassword ? <VisibilityOffIcon className="w-5 h-5"/> : <VisibilityIcon className="w-5 h-5"/>}
                          </button>
                      </div>
                  </div>

                  <p className="text-[10px] text-gray-400 mb-8 leading-relaxed text-center px-4">
                      Ao selecionar <strong>Concordar e continuar</strong>, aceito os <a href="#" className="underline font-bold text-gray-600">Termos de Serviço</a> e as <a href="#" className="underline font-bold text-gray-600">Políticas de Privacidade</a> da ImobiReview.
                  </p>

                  <button 
                      onClick={handleFinalSignUp}
                      disabled={isCreciScanning}
                      className="w-full bg-primary hover:bg-[#0f3461] disabled:bg-gray-400 text-white font-black py-4 rounded-xl text-lg transition-all shadow-xl active:scale-[0.98] transform"
                  >
                      {isCreciScanning ? 'Aguardando validação...' : 'Concordar e continuar'}
                  </button>
              </div>
           );
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-display">
      {isSignUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
            <div className="bg-white w-full max-w-[568px] rounded-[32px] shadow-2xl overflow-hidden relative animate-slideUp flex flex-col max-h-[90vh] border border-white/20">
                {renderModalHeader()}
                <div className="p-8 md:p-10 overflow-y-auto">
                    {renderModalContent()}
                </div>
            </div>
        </div>
      )}

      <EffectBackground />

      <div className="container mx-auto px-8 z-10 relative flex items-center justify-center h-full py-10">
        <div className="w-full max-w-5xl bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">
          
          <div className="w-full md:w-1/2 bg-[#F3F5F9] p-8 md:p-12 flex flex-col justify-center relative">
            <div className="mb-8">
              <a href="landingPage" className="flex items-center text-primary mb-6">
                <img src="logo.png" alt="Logo" className="w-16"/>
                <h2 className="text-xl font-bold tracking-tight">ImobiReview</h2>
              </a>
              <h1 className="text-4xl font-black text-primary mb-2 leading-tight">Bem-vindo<br/>de volta</h1>
              <p className="text-gray-500 font-medium">Acesse seu painel e confira suas avaliações.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">E-mail</label>
                  <input type="email" placeholder="usuario@email.com" className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-gray-800 placeholder:text-gray-300 font-medium" />
              </div>
              <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Senha</label>
                  <div className="relative">
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all pr-12 text-gray-800 font-medium" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                          {showPassword ? <VisibilityIcon className="w-5 h-5"/> : <VisibilityOffIcon className="w-5 h-5"/>}
                      </button>
                  </div>
              </div>
              <button onClick={onLoginClick} className="w-full py-4 bg-primary hover:bg-[#0f3461] text-white font-black rounded-2xl transition-all duration-300 shadow-xl active:scale-[0.98] transform mt-2">LOG IN</button>
              
              <div className="flex items-center gap-4 py-2">
                  <div className="h-[1px] bg-gray-200 flex-1"></div>
                  <span className="text-[10px] text-gray-400 font-bold">OU</span>
                  <div className="h-[1px] bg-gray-200 flex-1"></div>
              </div>

              <button className="w-full py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-sm">
                  <GoogleIcon className="w-5 h-5" /> ENTRAR COM GOOGLE
              </button>
            </form>

            <div className="mt-8 text-center">
              <a href="#" className="text-xs text-gray-400 hover:text-primary font-bold transition-colors">ESQUECI MINHA SENHA</a>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0A2342] to-[#051326] relative p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full">
              <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] border-[60px] border-white/5 rounded-full"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/10 blur-[100px] rounded-full"></div>
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center items-start">
               <div className="mb-auto mt-auto max-w-xs">
                 <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6">Transparência no mercado imobiliário.</h2>
                 <p className="text-blue-200 text-lg font-medium leading-relaxed mb-8 opacity-80">Faça parte da revolução. Construa confiança e alugue com total segurança.</p>
               </div>
               <div className="relative w-full bg-[#0d2d55]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mt-8 shadow-2xl">
                  <h3 className="text-white font-black text-xl mb-4 text-center">Ainda não tem conta?</h3>
                  <button onClick={() => setIsSignUpOpen(true)} className="w-full py-4 bg-white text-primary hover:bg-white font-black rounded-2xl transition-all duration-500 shadow-2xl transform hover:-translate-y-1">CRIAR CONTA AGORA</button>
               </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
          @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
          .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-slideUp { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-scan { animation: scan 2.5s linear infinite; }
      `}</style>
    </div>
  );
};

export default AuthPage;