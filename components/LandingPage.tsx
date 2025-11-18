import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { 
    VerifiedUserIcon, 
    PersonIcon, 
    HomeIcon, 
    BuildingIcon, 
    ShieldIcon, 
    HandshakeIcon, 
    QuoteIcon,
    CheckCircleIcon
} from './icons';
import StarRating from './StarRating';
import { MOCK_AGENCY_PROFILE } from '../constants';

interface LandingPageProps {
    onStartValidation: (identifier: string) => void;
    onAuthClick: () => void;
    onViewProfile: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartValidation, onAuthClick, onViewProfile }) => {
    const [identifier, setIdentifier] = useState('');
    const profile = MOCK_AGENCY_PROFILE;

    const handleSearch = () => {
        if (identifier.trim()) {
            onStartValidation(identifier.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const scrollToSearch = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header onAuthClick={onAuthClick} onHomeClick={scrollToTop} />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative bg-primary pb-32 md:pb-48 pt-16 md:pt-24 px-4 text-center overflow-hidden">
                    {/* Background Pattern/Gradient */}
                    <div className="absolute inset-0 z-0 bg-primary"></div> 
                    
                    <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
                        <h1 className="text-white text-4xl md:text-6xl font-black tracking-tight mb-4">
                            Trasparência para você alugar com confiança
                        </h1>
                        <h2 className="text-gray-300 text-lg md:text-xl font-normal mb-8">
                            Busque por proprietários, Inquilinos ou Imobiliárias e avalie sua experiência.
                        </h2>

                        <div className="w-full max-w-xl flex flex-col items-center">
                            <div className="flex w-full items-stretch rounded-lg h-12 shadow-lg overflow-hidden">
                                <input
                                    className="flex-1 px-4 text-gray-900 focus:outline-none border-none bg-white placeholder:text-gray-400"
                                    placeholder="CPF/ CNPJ"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="px-8 bg-accent text-primary font-bold hover:bg-opacity-90 transition-colors"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Preview Card */}
                <div className="relative z-20 -mt-24 md:-mt-32 px-4 mb-24">
                    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left Column: Agency Info - Compacted */}
                            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                                <div className="mb-5">
                                    <h3 className="text-xl font-bold text-primary">{profile.name}</h3>
                                    <p className="text-gray-400 text-sm font-medium">{profile.type}</p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-baseline text-primary">
                                            <span className="text-4xl font-black">{profile.overallReputation}</span>
                                            <span className="text-xl text-gray-400 font-medium">/5.0</span>
                                        </div>
                                        <p className="text-gray-400 text-xs font-medium mt-1">Reputação geral</p>
                                    </div>
                                    <div className="scale-90 origin-right">
                                        <StarRating rating={profile.overallReputation} mode="display" size="lg" />
                                    </div>
                                </div>

                                <div className="space-y-2.5 mb-5 border-b border-gray-100 pb-5">
                                    {profile.criteriaAverages.map((item) => (
                                        <div key={item.subject}>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-600 text-xs font-medium">{item.subject}</span>
                                                    <span className="material-symbols-outlined text-gray-300 text-[14px] cursor-help">info</span>
                                                </div>
                                                <span className="text-primary font-bold text-xs">{item.score}</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-accent rounded-full" 
                                                    style={{ width: `${(item.score / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* External Reputation - Compacted */}
                                <div className="mb-5">
                                    <h4 className="text-primary font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <span>⭐</span> Reputação Externa
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                           <span className="text-gray-600 font-medium">Google Reviews</span>
                                           <div className="text-right flex items-center gap-1">
                                               <span className="text-primary font-bold">{profile.externalReputation.google.score}</span> <span className="text-gray-400">/ 5</span>
                                               <span className="text-[10px] text-gray-400">({profile.externalReputation.google.total})</span>
                                           </div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                           <span className="text-gray-600 font-medium">Reclame Aqui</span>
                                           <div className="flex items-center gap-1.5">
                                               <span className="text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded text-[10px] font-bold">{profile.externalReputation.reclameAqui.status}</span>
                                               <span className="text-primary font-bold">{profile.externalReputation.reclameAqui.score}</span>
                                           </div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                           <span className="text-gray-600 font-medium">Serasa</span>
                                           <span className="text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded text-[10px] font-bold">{profile.externalReputation.serasa.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Legal Transparency - Compacted */}
                                <div>
                                    <h4 className="text-primary font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <span>🏛️</span> Transparência Jurídica
                                    </h4>
                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-gray-600 text-xs font-medium">Processos ativos</span>
                                            <span className="text-primary font-bold text-xs">{profile.legalTransparency.activeProcesses}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                             <span className="text-gray-600 text-xs font-medium">Última consulta</span>
                                             <span className="text-gray-400 text-[10px]">{profile.legalTransparency.lastCheck}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Reviews */}
                            <div className="p-8 bg-white">
                                <h3 className="text-lg font-bold text-primary mb-6">Recent Reviews</h3>
                                
                                <div className="space-y-8">
                                    {profile.reviews.slice(0, 2).map(review => (
                                        <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-primary">{review.author}</span>
                                                    <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${review.authorProfile === 'Inquilino' ? 'bg-accent' : 'bg-primary'}`}>
                                                        {review.authorProfile}
                                                    </span>
                                                </div>
                                                <StarRating rating={review.overallScore} mode="display" size="sm" />
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                                "{review.comment}"
                                            </p>
                                            <p className="text-gray-400 text-xs">{review.date}</p>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={onViewProfile}
                                    className="w-full mt-6 py-3 bg-gray-100 text-primary font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm uppercase tracking-wide"
                                >
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 1: Why We Created ImobiReview */}
                <section className="px-4 md:px-10 mb-24">
                    <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                            <h2 className="text-4xl font-black text-primary tracking-tight">Porque Criamos o ImobiReview</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Alugar não deveria ser um salto no escuro. Na ImobiReview, acreditamos que a confiança é construída com dados — não com achismos.
                            </p>
                            <button 
                                onClick={onAuthClick}
                                className="px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-opacity-90 transition-colors inline-block"
                            >
                                Crie sua Conta Gratuita
                            </button>
                        </div>
                        <div className="flex-1 flex justify-center">
                            {/* Stylized Verified User Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-sm transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                                        <PersonIcon className="w-8 h-8 text-gray-500"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary text-lg flex items-center gap-1">
                                            Usuário Verificado 
                                            <VerifiedUserIcon className="text-accent text-xl" />
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <span className="font-black text-primary">4.8</span>
                                            <StarRating rating={5} mode="display" size="sm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 font-medium">
                                            <span className="text-gray-500">Comunicação</span>
                                            <span className="text-primary">Excelente</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent w-[90%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 font-medium">
                                            <span className="text-gray-500">Condição do Imóvel</span>
                                            <span className="text-primary">Ótima</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent w-[85%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 font-medium">
                                            <span className="text-gray-500">Pontualidade</span>
                                            <span className="text-primary">Excepcional</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent w-[95%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: How It Works */}
                <section className="px-4 md:px-10 py-20 bg-background-light">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-black text-primary mb-4">Como Funciona</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
                            Simples, transparente e poderoso. Veja como o ImobiReview transforma o processo de aluguel para todos.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Column 1 */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <PersonIcon className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-primary text-lg mb-3">Para Inquilinos</h3>
                                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                                    <li>Crie seu perfil e construa sua reputação.</li>
                                    <li>Encontre imóveis com proprietários e agências avaliados.</li>
                                    <li>Avalie sua experiência ao final do contrato.</li>
                                </ol>
                            </div>
                            
                            {/* Column 2 */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <HomeIcon className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-primary text-lg mb-3">Para Proprietários</h3>
                                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                                    <li>Cadastre-se e verifique seu perfil.</li>
                                    <li>Encontre inquilinos com histórico verificado.</li>
                                    <li>Avalie seus inquilinos e melhore sua reputação.</li>
                                </ol>
                            </div>
                            
                            {/* Column 3 */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <HandshakeIcon className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-primary text-lg mb-3">Para Imobiliárias</h3>
                                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                                    <li>Crie o perfil da sua agência.</li>
                                    <li>Gerencie múltiplos imóveis e locações.</li>
                                    <li>Aumente a confiança e atraia mais clientes.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Benefits */}
                <section className="px-4 md:px-10 py-20">
                    <div className="max-w-6xl mx-auto">
                         <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-primary mb-4">Benefícios Para Todos</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Criamos um ecossistema onde a confiança e a transparência beneficiam cada parte envolvida no aluguel.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldIcon className="w-6 h-6 text-accent" />
                                    <h3 className="font-bold text-xl text-primary">Inquilinos</h3>
                                </div>
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Alugue com segurança, conhecendo a reputação do imóvel e do proprietário.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Construa um histórico positivo que abre portas para futuras locações.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Evite surpresas desagradáveis e burocracia excessiva.
                                    </li>
                                </ul>
                            </div>

                             {/* Card 2 */}
                             <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircleIcon className="w-6 h-6 text-accent" />
                                    <h3 className="font-bold text-xl text-primary">Proprietários</h3>
                                </div>
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Escolha inquilinos responsáveis com base em dados reais.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Reduza o risco de inadimplência e danos ao imóvel.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Valorize seu imóvel e sua reputação como um bom locador.
                                    </li>
                                </ul>
                            </div>

                             {/* Card 3 */}
                             <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <BuildingIcon className="w-6 h-6 text-accent" />
                                    <h3 className="font-bold text-xl text-primary">Imobiliárias</h3>
                                </div>
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Otimize o processo de seleção de inquilinos.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Aumente a credibilidade e a confiança na sua marca.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent font-bold">•</span>
                                        Atraia mais proprietários e inquilinos qualificados.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="text-center mt-12">
                            <button 
                                onClick={onAuthClick}
                                className="px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg"
                            >
                                Comece seu Perfil Gratuito
                            </button>
                        </div>
                    </div>
                </section>

                {/* Testimonial Section */}
                <section className="bg-primary py-20 px-4 md:px-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <QuoteIcon className="w-12 h-12 text-accent mx-auto mb-6" />
                        <h3 className="text-2xl md:text-3xl font-bold leading-snug mb-8">
                            "O ImobiReview mudou completamente minha perspectiva sobre alugar. Finalmente uma plataforma que traz segurança e transparência para inquilinos e proprietários. É a tranquilidade que o mercado precisava."
                        </h3>
                        <div>
                            <p className="font-bold text-lg">Mariana Silva</p>
                            <p className="text-accent text-sm font-medium">Inquilina Verificada</p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 px-4 bg-background-light text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
                        Pronto para transformar sua experiência de aluguel?
                    </h2>
                    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                        Junte-se a milhares de usuários que estão construindo um mercado imobiliário mais justo e transparente.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={scrollToSearch}
                            className="px-8 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg"
                        >
                            Encontre uma Reputação Agora
                        </button>
                        <button 
                            onClick={onAuthClick}
                            className="px-8 py-3 bg-gray-200 text-primary font-bold rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Sou Proprietário ou Agência
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;