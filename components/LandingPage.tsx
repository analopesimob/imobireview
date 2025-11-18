import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { VerifiedUserIcon, BadgeIcon, HubIcon } from './icons';
import StarRating from './StarRating';

interface LandingPageProps {
    onStartValidation: (identifier: string) => void;
	onAuthClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartValidation, onAuthClick  }) => {
    const [identifier, setIdentifier] = useState('');

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

    return (
        <div className="flex flex-col min-h-screen">
            <Header onAuthClick={onAuthClick} />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="flex min-h-[480px] md:min-h-[550px] flex-col gap-8 items-center justify-center p-4 text-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(10, 35, 66, 0.85) 0%, rgba(10, 35, 66, 0.95) 100%)` }}>
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-tighter md:text-5xl">
                            Transparência para você alugar com confiança
                        </h1>
                        <h2 className="text-gray-300 text-base font-normal leading-normal md:text-lg">
                            Busque por proprietários, inquilinos ou imobiliárias e avalie sua experiência.
                        </h2>
                    </div>
                    <div className="w-full max-w-lg flex flex-col items-center">
						<div className="flex w-full items-stretch rounded-xl h-14 shadow-lg overflow-hidden">
							<input
								className="flex-1 min-w-0 px-5 text-base text-gray-900 bg-white placeholder:text-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
								placeholder="CPF/CNPJ"
								value={identifier}
								onChange={(e) => setIdentifier(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<button
								onClick={handleSearch}
								className="w-28 bg-accent text-primary text-base font-bold tracking-wide hover:bg-opacity-90 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
							>
								Buscar
							</button>
						</div>
					</div>
                </div>

				{/* Floating Preview Card */}
                <div className="relative z-20 -mt-24 md:-mt-32 px-4 mb-16">
                    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left Column: Agency Info - Compacted */}
                            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                                <div className="mb-5">
                                    <h3 className="text-xl font-bold text-primary">Imobiliária</h3>
                                    <p className="text-gray-400 text-sm font-medium">Real Estate Agency</p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-baseline text-primary">
                                            <span className="text-4xl font-black">4.8</span>
                                            <span className="text-xl text-gray-400 font-medium">/5.0</span>
                                        </div>
                                        <p className="text-gray-400 text-xs font-medium mt-1">Reputação geral</p>
                                    </div>
                                    <div className="scale-90 origin-right">
                                        <StarRating rating={4.8} mode="display" size="lg" />
                                    </div>
                                </div>

                                <div className="space-y-2.5 mb-5 border-b border-gray-100 pb-5">
                                    {[
                                        { label: 'Comunicação', score: 5.0 },
                                        { label: 'Transparência', score: 4.9 },
                                        { label: 'Profissionalismo', score: 4.7 },
                                        { label: 'Resolução', score: 4.6 }
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-600 text-xs font-medium">{item.label}</span>
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
                                               <span className="text-primary font-bold">4.2</span> <span className="text-gray-400">/ 5</span>
                                               <span className="text-[10px] text-gray-400">(132)</span>
                                           </div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                           <span className="text-gray-600 font-medium">Reclame Aqui</span>
                                           <div className="flex items-center gap-1.5">
                                               <span className="text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded text-[10px] font-bold">Bom</span>
                                               <span className="text-primary font-bold">8.3</span>
                                           </div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                           <span className="text-gray-600 font-medium">Serasa</span>
                                           <span className="text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded text-[10px] font-bold">Baixo risco</span>
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
                                            <span className="text-primary font-bold text-xs">0</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                             <span className="text-gray-600 text-xs font-medium">Última consulta</span>
                                             <span className="text-gray-400 text-[10px]">30 dias atrás</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Reviews */}
                            <div className="p-8 bg-white">
                                <h3 className="text-lg font-bold text-primary mb-6">Recent Reviews</h3>
                                
                                <div className="space-y-8">
                                    {/* Review 1 */}
                                    <div className="pb-6 border-b border-gray-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-primary">Carlos Pereira</span>
                                                <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Inquilino</span>
                                            </div>
                                            <StarRating rating={5} mode="display" size="sm" />
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                            "Processo de locação muito transparente e rápido. A comunicação com a imobiliária foi excelente, sempre dispostos a ajudar."
                                        </p>
                                        <p className="text-gray-400 text-xs">2 weeks ago</p>
                                    </div>

                                    {/* Review 2 */}
                                    <div className="pb-6 border-b border-gray-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-primary">Ana Souza</span>
                                                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Proprietária</span>
                                            </div>
                                            <StarRating rating={5} mode="display" size="sm" />
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                            "Ótima experiência como proprietária. Encontraram um bom inquilino rapidamente e cuidam de toda a burocracia. Recomendo."
                                        </p>
                                        <p className="text-gray-400 text-xs">1 month ago</p>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-3 bg-gray-100 text-primary font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                    Ver todos os comentários
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Feature Section */}
                <div className="px-6 md:px-10 flex justify-center py-16 lg:py-24 bg-white">
                    <div className="flex flex-col gap-12 w-full max-w-5xl">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-primary tracking-tight text-3xl font-bold md:text-4xl max-w-3xl">
                                    Construindo Confiança no Mercado Imobiliário, uma Avaliação por Vez
                                </h1>
                                <p className="text-gray-600 text-base font-normal leading-relaxed max-w-3xl">
                                    A ImobiReview conecta proprietários, inquilinos e imobiliárias em um espaço de avaliação confiável, incentivando relações mais seguras e transparentes.
                                </p>
                            </div>
                            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold tracking-wide w-fit hover:bg-opacity-90 transition-colors">
                                <span className="truncate">Detalhes</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 bg-background-light p-6 flex-col">
                                <div className="text-accent"><VerifiedUserIcon /></div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-primary text-lg font-bold">Feedback Verificado</h2>
                                    <p className="text-gray-600 text-sm leading-relaxed">Consulte opiniões reais de clientes verificados e faça escolhas mais seguras.</p>
                                </div>
                            </div>
                            <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 bg-background-light p-6 flex-col">
                                <div className="text-accent"><BadgeIcon /></div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-primary text-lg font-bold">Perfis Detalhados</h2>
                                    <p className="text-gray-600 text-sm leading-relaxed">Acesse informações completas sobre profissionais e empresas, com histórico, avaliações e desempenho.</p>
                                </div>
                            </div>
                            <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 bg-background-light p-6 flex-col">
                                <div className="text-accent"><HubIcon /></div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-primary text-lg font-bold">Transparência em Todo o Processo</h2>
                                    <p className="text-gray-600 text-sm leading-relaxed">Nossa plataforma garante um processo de avaliação justo e aberto para todos os envolvidos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;