import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { 
  PersonIcon, 
  HomeIcon, 
  BuildingIcon, 
  UploadCloudIcon, 
  EditDocumentIcon, 
  MedalIcon 
} from './icons';

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
                id: '01 — Quem é você?',
                title: 'Crie seu perfil e tenha uma identidade validada',
                description: 'Crie sua conta e valide sua identidade em poucos passos, contribuindo para uma comunidade mais segura e transparente.',
                icon: <EditDocumentIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '02 — Sua jornada de locação',
                title: 'Faça o upload do seu contrato de locação para validação',
                description: 'Envie seu contrato de locação e deixe que nosso sistema valide sua autenticidade, garantindo que as avaliações estejam vinculadas a locações reais.',
                icon: <UploadCloudIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '03 — Conte sua história',
                title: 'Deixe sua avaliação para ajudar outros inquilinos a fazer escolhas seguras',
                description: 'Divida sua experiência com outros inquilinos. Sua avaliação pode evitar dores de cabeça e ajudar alguém a encontrar um lugar melhor para morar.',
                icon: <EditDocumentIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '04 — Conquiste seu reconhecimento',
                title: 'Tenha um Score que abre portas para novas locações',
                description: 'Receba a avaliação do seu locador ao final da locação. Um bom histórico aumenta sua credibilidade e facilita a aprovação em futuros imóveis.',
                icon: <MedalIcon className="w-8 h-8 text-accent" />
            }
        ],
        landlord: [
            {
                id: '01 — Apresente-se como proprietário',
                title: 'Valide seu imóvel em poucos passos',
                description: 'Mostre quem você é e registre seu imóvel para começar uma jornada de locação mais segura.',
                icon: <HomeIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '02 — Sua experiência com inquilinos',
                title: 'Avalie potenciais inquilinos',
                description: 'Compartilhe como administra seu imóvel, sua comunicação e sua forma de conduzir a locação.',
                icon: <EditDocumentIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '03 — Receba e dê retornos reais',
                title: 'Receba retornos verificados',
                description: 'Acompanhe avaliações verificadas, entenda como os inquilinos o percebem e registre também sua experiência.',
                icon: <EditDocumentIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '04 — Construa sua reputação',
                title: 'Atraia melhores inquilinos',
                description: 'Transforme seu histórico positivo em confiança, destaque no mercado e inquilinos mais qualificados.',
                icon: <MedalIcon className="w-8 h-8 text-accent" />
            }
        ],
        agency: [
             {
                id: '01 — Apresente sua imobiliária',
                title: 'Crie o perfil da sua imobiliária',
                description: 'Mostre quem vocês são, seu propósito e o compromisso que têm com proprietários e inquilinos.',
                icon: <BuildingIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '02 — Sua atuação no mercado',
                title: 'Administre avaliações dos imóveis',
                description: 'Demonstre como administram imóveis, cuidam das relações e garantem boas experiências de locação.',
                icon: <UploadCloudIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '03 — Exiba sua reputação real',
                title: 'Transparência que gera confiança',
                description: 'Centralize avaliações verificadas e compartilhe a qualidade do atendimento da sua equipe.',
                icon: <EditDocumentIcon className="w-8 h-8 text-accent" />
            },
            {
                id: '04 — Fortaleça sua autoridade',
                title: 'Amplie sua autoridade no mercado',
                description: 'Transforme transparência e bons resultados em reconhecimento e destaque no mercado imobiliário.',
                icon: <MedalIcon className="w-8 h-8 text-accent" />
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header onAuthClick={onAuthClick} onHomeClick={onHomeClick} onAboutClick={() => {}} />
            
            <main className="flex-grow">
                {/* Header Section */}
                <section className="pt-20 pb-12 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-6">
                        Locação transparente<br />do começo, ao fim.
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Confiança começa com clareza. Escolha seu perfil e veja como o ImobiReview torna a locação mais justa para todos.
                    </p>
                </section>

                {/* Role Tabs */}
                <section className="px-4 mb-16">
                    <div className="max-w-3xl mx-auto flex justify-center border-b border-gray-200">
                        <button 
                            onClick={() => setActiveTab('tenant')}
                            className={`flex flex-col items-center px-8 py-4 border-b-2 transition-all ${activeTab === 'tenant' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            <PersonIcon className="w-6 h-6 mb-2" />
                            <span className="font-bold text-sm">Para Inquilinos</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('landlord')}
                            className={`flex flex-col items-center px-8 py-4 border-b-2 transition-all ${activeTab === 'landlord' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            <HomeIcon className="w-6 h-6 mb-2" />
                            <span className="font-bold text-sm">Para Proprietários</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('agency')}
                            className={`flex flex-col items-center px-8 py-4 border-b-2 transition-all ${activeTab === 'agency' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            <BuildingIcon className="w-6 h-6 mb-2" />
                            <span className="font-bold text-sm">Para Imobiliária</span>
                        </button>
                    </div>
                </section>

                {/* Steps List */}
                <section className="px-4 pb-24">
                    <div className="max-w-3xl mx-auto space-y-12">
                        {steps[activeTab].map((step) => (
                            <div key={step.id} className="flex gap-6 md:gap-8 items-start group">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-green-50 transition-colors">
                                    {step.icon}
                                </div>
                                <div>
                                    <span className="text-accent font-bold text-xs tracking-wider mb-1 block">Passo {step.id}</span>
                                    <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-background-light py-24 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black text-primary mb-8">
                            Pronto para fazer parte do futuro do mercado imobiliário?
                        </h2>
                        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
                            Fortaleça sua jornada com avaliações transparentes e construa uma reputação sólida no mercado imobiliário.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                            <button 
                                onClick={onAuthClick}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-opacity-90 transition-colors min-w-[200px]"
                            >
                                Sou Inquilino
                            </button>
                             {activeTab !== 'agency' && (
                                <button 
                                    onClick={onAuthClick}
                                    className="px-8 py-3 bg-white border border-gray-200 text-primary font-bold rounded-full hover:bg-gray-50 transition-colors min-w-[200px]"
                                >
                                    Sou Proprietário
                                </button>
                            )}
                        </div>
                         <div className="mt-8">
                             <button onClick={onAuthClick} className="text-gray-500 font-medium hover:text-primary flex items-center justify-center gap-1 mx-auto text-sm">
                                  <span className="text-lg">Cadastrar Imobiliária→</span>
                             </button>
                         </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;