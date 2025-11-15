import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { VerifiedUserIcon, BadgeIcon, HubIcon } from './icons';

interface LandingPageProps {
    onStartValidation: (identifier: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartValidation }) => {
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
            <Header />
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