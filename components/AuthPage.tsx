import React, { useState } from 'react';
import { 
  VisibilityIcon, 
  VisibilityOffIcon, 
  GoogleIcon 
} from './icons';
import GradientButton from './GradientButtonBlue';

interface AuthPageProps {
    onLoginClick?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginClick }) => {
  const [role, setRole] = useState<'tenant' | 'landlord' | 'agency' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-display">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-primary z-0">
        {/* Gradient Mesh */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#1a4b85] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6BA87A] rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-[#0f3461] rounded-full blur-[80px] opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative flex items-center justify-center h-full py-10">
        <div className="w-full max-w-5xl bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Lado Esquerdo - Formulário de Autenticação (Branco/Claro) */}
          <div className="w-full md:w-1/2 bg-[#F3F5F9] p-8 md:p-12 flex flex-col justify-center relative">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary mb-6" onClick={onLoginClick}>
                <div className="size-10 text-accent">
                    <img src="/public/logo.png" alt="Logo" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">ImobiReview</h2>
              </div>
              
              <h1 className="text-3xl font-bold text-primary mb-2">
                Já tem uma conta?
              </h1>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <input 
                      type="email" 
                      placeholder="user@example.com" 
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                  />
              </div>

              <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">Senha</label>
                  <div className="relative">
                      <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••••••" 
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-10 text-gray-800"
                      />
                      <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                      >
                          {showPassword ? <VisibilityIcon className="w-5 h-5"/> : <VisibilityOffIcon className="w-5 h-5"/>}
                      </button>
                  </div>
              </div>

              <button 
                className="w-full py-3 bg-primary hover:bg-[#0f3461] text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-primary/30 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                  ENTRAR
              </button>

              <button 
                className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                  <GoogleIcon className="w-5 h-5" />
                  ENTRAR COM GOOGLE
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-xs text-gray-500 hover:text-primary underline decoration-gray-300 underline-offset-2">
                ESQUECI MINHA SENHA
              </a>
            </div>
          </div>

          {/* Lado direito - Visuais (Escuro/Azul) */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0A2342] to-[#051326] relative p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-full h-full">
              <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] border-[40px] border-white/5 rounded-full"></div>
              <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] border-[2px] border-white/10 rounded-full"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/10 blur-3xl rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full justify-center items-start">
               {/* Área de texto principal */}
               <div className="mb-auto mt-auto">
                 <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                   Seu próximo imóvel <br />começa com informação <br /> confiável
                 </h2>
                 <p className="text-blue-200 text-lg font-light mb-8">
                   Crie seu perfil para alugar com tranquilidade, acessando avaliações reais e informações transparentes que tornam suas decisões mais seguras.
                 </p>
               </div>
               
               {/* CTA Area */}
               <div className="relative w-full bg-[#0d2d55]/80 backdrop-blur-md rounded-xl p-6 border border-white/10 mt-8">
                  <h3 className="text-white font-bold text-lg mb-4 text-center">Primeira vez por aqui?</h3>
                  <GradientButton 
                    onClick={onLoginClick} // Em um aplicativo real, isso poderia alternar para o modo de cadastro.
                    className="w-full py-3 bg-white text-secondary hover:bg-gray-100 font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:-translate-y-0.5"
                  >
                    CRIAR MINHA CONTA
                  </GradientButton>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;