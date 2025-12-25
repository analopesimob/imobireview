import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import EffectBackground from './EffectBackground';
import {
	ShieldCheck, 
	Route,
	BadgeCheck,
	Home,
	User,
	Building,
	Upload,
	UserCheck,
	HatGlasses,
	Medal,
	MapPinHouse,
	MessagesSquare,
	Hotel,
	PencilLine,
	ChartLine,
} from 'lucide-react';

interface AboutPageProps {
    onAuthClick: () => void;
    onHomeClick: () => void;
}

type RoleTab = 'tenant' | 'landlord' | 'agency';

const AboutPage: React.FC<AboutPageProps> = ({ onAuthClick, onHomeClick }) => {
    const [activeTab, setActiveTab] = useState<RoleTab>('tenant');

    const steps = {
        tenant: [
            {
                id: '01',
                title: 'Crie sua conta & Verifique',
                description: 'Crie sua conta segura. Verificamos identidades para garantir que você está interagindo com pessoas reais, não bots.',
                icon: <UserCheck className="w-6 h-6 text-white" />
            },
            {
                id: '02',
                title: 'Upload Contrato',
                description: 'Upload seu contrato de locação de forma segura. Validamos o documento para confirmar a relação sem expor dados sensíveis.',
                icon: <Upload className="w-6 h-6 text-white" />
            },
            {
                id: '03',
                title: 'Avaliação Anônima',
                description: 'Avalie a propriedade e o proprietário honestamente. Sua avaliação é vinculada a um contrato verificado, mas sua identidade pública permanece anônima.',
                icon: <HatGlasses className="w-6 h-6 text-white" />
            },
            {
                id: '04',
                title: 'Ganhe reputação',
                description: 'Bom inquilino merece reconhecimento. Crie um "Inquilino Verificado" que ajuda você a encontrar seu próximo lar mais rápido.',
                icon: <Medal className="w-6 h-6 text-white" />
            }
        ],
        landlord: [
            {
                id: '01',
                title: 'Verifique Propriedade',
                description: 'Registre e prove a propriedade. Esse selo de confiança atrai candidatos sérios e de qualidade.',
                icon: <MapPinHouse className="w-6 h-6 text-white" />
            },
            {
                id: '02',
                title: 'Verifique Inquilino',
                description: 'Acesse o histórico de aluguel, o comportamento financeiro e a reputação do candidato antes da aprovação.',
                icon: <UserCheck className="w-6 h-6 text-white" />
            },
            {
                id: '03',
                title: 'Receba Feedback',
                description: 'Receba feedback construtivo e privado dos inquilinos para melhorar sua gestão imobiliária e valor.',
                icon: <MessagesSquare className="w-6 h-6 text-white" />
            },
            {
                id: '04',
                title: 'Líder de mercado',
                description: 'Boas avaliações impulsionam seu anúncio e aumentam o valor percebido pelos inquilinos.',
                icon: <Medal className="w-6 h-6 text-white" />
            }
        ],
        agency: [
             {
                id: '01',
                title: 'Perfil da Agência',
                description: 'Crie um perfil para sua agência. Mostre seu portfólio, equipe e credenciais profissionais.',
                icon: <Hotel className="w-6 h-6 text-white" />
            },
            {
                id: '02',
                title: 'Avaliações Centralizadas',
                description: 'Agregue avaliações de todas as suas propriedades gerenciadas em um dashboard. Transforme inquilinos felizes em sua equipe de marketing.',
                icon: <PencilLine className="w-6 h-6 text-white" />
            },
            {
                id: '03',
                title: 'Transparência',
                description: 'Mostre estatísticas de eficiência de sua agência (tempos de reparo, pontuações de comunicação) para atrair novos clientes.',
                icon: <ChartLine className="w-6 h-6 text-white" />
            },
            {
                id: '04',
                title: 'Autoridade',
                description: 'Use um "ImobiReview Score" alto para dominar seu mercado local e assinar mais contratos.',
                icon: <Medal className="w-6 h-6 text-white" />
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light font-display">
            <Header onAuthClick={onAuthClick} onHomeClick={onHomeClick} onAboutClick={() => {}} />
            
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-[#051326] text-white pt-24 pb-32 overflow-hidden">
                    {/* Abstract Background Shapes */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                    </div>

                    {/* Conteúdo */}
                    <div className="container mx-auto px-4 text-center relative z-10">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-white/10">
                            <ShieldCheck className="w-4 h-4 animate-bounce" />
                            Nossa Missão
                        </div>

                        {/* Título */}
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Tecnologia, dados <br />
                            e <span className="text-accent">Confiança</span> nas locações
                        </h1>

                        {/* Subtítulo */}
                        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                            Reconstruindo a confiança no mercado imobiliário.
                            Criamos um ecossistema transparente onde inquilinos,
                            proprietários e imobiliárias são avaliados de forma justa,
                            promovendo segurança para todos.
                        </p>
                    </div>
                </section>
                {/* Values Section - Floating Cards */}
                <section className="px-4 -mt-16 relative z-20 mb-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-accent hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">100% Verificado</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Sem avaliações falsas. Cada avaliação é vinculada a um documento de contrato de locação validado.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-primary hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                    <Route className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">Respeito Mutuo</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Avaliações justas entre inquilinos e proprietários. Um relacionamento transparente para os dois lados.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-accent hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                                    <BadgeCheck className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">Dados Orientados</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Vá além das "intuições". Faça decisões com base em dados históricos, regularidade de pagamentos e estatísticas de manutenção de propriedade.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive Role Section */}
                <section className="px-4 pb-24">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-primary mb-4">Como funciona para você</h2>
                            <p className="text-gray-600">Selecione seu perfil para ver como o ImobiReview empoderará sua jornada.</p>
                        </div>

                        {/* Custom Tab Navigation */}
                        <div className="flex justify-center mb-12">
                            <div className="bg-white p-1.5 rounded-full shadow-md border border-gray-100 inline-flex">
                                <button 
                                    onClick={() => setActiveTab('tenant')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                                        activeTab === 'tenant' 
                                        ? 'bg-primary text-white shadow-lg' 
                                        : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                    }`}
                                >
                                    <User className="w-4 h-4" /> Inquilino
                                </button>
                                <button 
                                    onClick={() => setActiveTab('landlord')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                                        activeTab === 'landlord' 
                                        ? 'bg-primary text-white shadow-lg' 
                                        : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                    }`}
                                >
                                    <Home className="w-4 h-4" /> Proprietário
                                </button>
                                <button 
                                    onClick={() => setActiveTab('agency')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                                        activeTab === 'agency' 
                                        ? 'bg-primary text-white shadow-lg' 
                                        : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                    }`}
                                >
                                    <Building className="w-4 h-4" /> Imobiliária
                                </button>
                            </div>
                        </div>

                        {/* Grid Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {steps[activeTab].map((step, index) => (
                                <div key={step.id} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6 relative z-10">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300 ${
                                            index % 2 === 0 ? 'bg-primary' : 'bg-accent'
                                        }`}>
                                            {React.cloneElement(step.icon as React.ReactElement, {
                                                className: index % 2 === 0 ? 'text-accent w-6 h-6' : 'text-primary w-6 h-6'
                                            })}
                                        </div>
                                        <span className="text-6xl font-black text-gray-50 opacity-50 group-hover:text-gray-100 group-hover:scale-110 transition-all duration-500 absolute -right-4 -top-6">
                                            {step.id}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3 relative z-10 group-hover:text-accent transition-colors">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-24 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary to-[#0f3461] rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
                            {/* Decorative Circle */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <EffectBackground />
                            <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">
                                Pronto para se juntar à revolução transparente?
                            </h2>
                            <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
                                Crie sua conta gratuita hoje e comece a construir sua reputação no mercado imobiliário.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                                <button 
                                    onClick={onAuthClick}
                                    className="px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-white hover:text-primary transition-all shadow-lg transform hover:-translate-y-1"
                                >
                                    Comece grátis
                                </button>
                                <button 
                                    onClick={onHomeClick}
                                    className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                                >
                                    Explore Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;