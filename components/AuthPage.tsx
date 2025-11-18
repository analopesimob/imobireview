
import React, { useState } from 'react';
import { 
  LogoIcon, 
  PersonIcon, 
  HomeIcon, 
  BuildingIcon, 
  VisibilityIcon, 
  VisibilityOffIcon, 
  GoogleIcon 
} from './icons';

interface AuthPageProps {
    onLoginClick?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginClick }) => {
  const [role, setRole] = useState<'tenant' | 'landlord' | 'agency' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background-light flex flex-col font-display">
      {/* Simple Header with Logo */}
      <header className="px-6 md:px-10 py-6">
        <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={onLoginClick}>
            <div className="size-8 text-accent">
                <LogoIcon />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">ImobiReview</h2>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 md:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tight leading-tight">
              Seu próximo imóvel <br />
              começa com informação <br />
              confiável
            </h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-md">
              Crie seu perfil para alugar com tranquilidade, acessando avaliações reais e informações transparentes que tornam suas decisões mais seguras.
            </p>
          </div>

          {/* Right Content - Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto md:ml-auto relative">
            <div className="absolute top-8 right-8">
              
            </div>
            
            <h2 className="text-3xl font-bold text-primary mb-8 mt-2">Crie sua conta</h2>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-primary">Email</label>
                    <input 
                        type="email" 
                        placeholder="Digite seu e-mail" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-primary">Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Crie uma senha forte" 
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-10"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                        >
                            {showPassword ? <VisibilityIcon className="w-5 h-5"/> : <VisibilityOffIcon className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-primary">Confirme sua senha</label>
                    <div className="relative">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirme sua senha" 
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-10"
                        />
                        <button 
                             type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                        >
                            {showConfirmPassword ? <VisibilityIcon className="w-5 h-5"/> : <VisibilityOffIcon className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium text-text-primary">Eu sou...</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button 
                            type="button"
                            onClick={() => setRole('tenant')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${role === 'tenant' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                        >
                            <PersonIcon className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Inquilino</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setRole('landlord')}
                             className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${role === 'landlord' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                        >
                            <HomeIcon className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Locador</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setRole('agency')}
                             className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${role === 'agency' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                        >
                            <BuildingIcon className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Imobiliária</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor="terms" className="text-sm text-text-secondary">
                        Concordo com os<a href="#" className="text-primary font-semibold hover:underline">Termos de Serviço</a> e a <a href="#" className="text-primary font-semibold hover:underline">Política de Privacidade</a>.
                    </label>
                </div>

                <button type="submit" className="w-full py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg shadow-primary/20">
                    Criar Conta
                </button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
                </div>
            </div>

            <button className="w-full py-3.5 bg-white border border-gray-200 text-text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">
                <GoogleIcon className="w-5 h-5" />
                Sign up with Google
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;