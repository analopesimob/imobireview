import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import EffectBackground from './EffectBackground';
import { CircleAlert, MessageSquareWarning, ShieldCheck,CircleCheck, SquareArrowOutUpRight, UserCheck, House, ShieldUser, FileUser, Mail,  } from 'lucide-react';

interface PrivacyPolicyPageProps {
    onAuthClick: () => void;
    onHomeClick: () => void;
    onAboutClick: () => void;
	onContactClick: () => void;
	
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onAuthClick, onHomeClick, onAboutClick, onContactClick }) => {
    const [activeSection, setActiveSection] = useState('coleta');
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
        const handleScroll = () => {
            const sections = document.querySelectorAll('.policy-section');
            let current = 'coleta';
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id') || 'coleta';
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sections = [
        {
            id: 'coleta',
            title: '1. Coleta de Informações',
            icon: <UserCheck className="w-6 h-6" />,
            content: 'Coletamos informações que você nos fornece diretamente ao criar uma conta, como nome, e-mail, telefone e documentos de identificação ou contratos de locação para fins de verificação. Também coletamos dados automáticos como endereço IP e interações com a plataforma para melhorar sua experiência.'
        },
        {
            id: 'uso',
            title: '2. Uso das Informações',
            icon: <House className="w-6 h-6" />,
            content: 'Utilizamos seus dados para: verificar a autenticidade das avaliações, facilitar a comunicação entre as partes, melhorar nossos algoritmos de recomendação e garantir que a comunidade do ImobiReview permaneça segura e livre de fraudes.'
        },
        {
            id: 'compartilhamento',
            title: '3. Compartilhamento de Dados',
            icon: <SquareArrowOutUpRight className="w-6 h-6" />,
            content: 'O ImobiReview nunca vende seus dados pessoais. Informações de avaliações são públicas conforme sua escolha de anonimato. Podemos compartilhar dados com parceiros tecnológicos (como servidores de hospedagem e validadores de identidade) que cumprem rigorosamente a LGPD.'
        },
        {
            id: 'seguranca',
            title: '4. Segurança e Proteção',
            icon: <ShieldUser className="w-6 h-6" />,
            content: 'Seus dados são protegidos por criptografia de ponta a ponta (AES-256). Documentos sensíveis enviados para verificação são armazenados em buckets isolados e deletados após a validação bem-sucedida, nunca sendo expostos a outros usuários.'
        },
        {
            id: 'direitos',
            title: '5. Seus Direitos (LGPD)',
            icon: <FileUser className="w-6 h-6" />,
            content: 'Você é o dono dos seus dados. A qualquer momento, você pode solicitar o acesso, a correção ou a exclusão total de suas informações de nossa base de dados através do seu painel de configurações ou por e-mail direto.'
        },
        {
            id: 'contato',
            title: '6. Fale Conosco',
            icon: <Mail className="w-6 h-6" />,
            content: 'Dúvidas sobre como tratamos sua privacidade? Nosso Encarregado de Proteção de Dados (DPO) está disponível para ajudar. Envie um e-mail para suporte@imobireview.com e responderemos em até 48 horas úteis.'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] font-display selection:bg-accent selection:text-primary">
            <Header onAuthClick={onAuthClick} onHomeClick={onHomeClick} onAboutClick={onAboutClick} onContactClick={onContactClick} />

            <main className="flex-grow">
                    {/* Elementos Decorativos de Fundo */}
                    <div className="relative bg-primary pt-24 pb-40 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                    </div>
					

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-white/10">
                            <ShieldCheck className="w-4 h-4 animate-bounce" /> Segurança de Dados
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Privacidade <span className="text-accent">&</span> Transparência
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                            No ImobiReview, a proteção dos seus dados é o alicerce da confiança que construímos com o mercado imobiliário brasileiro.
                        </p>
                    </div>
                </div>

                {/* Seção TL;DR (Resumo Rápido) */}
                <div className="container mx-auto px-4 -mt-24 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50 flex flex-col items-center text-center group hover:bg-white transition-all duration-500">
                            <div className="w-14 h-14 bg-accent/20 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">Dados Protegidos</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Criptografia de última geração em cada bit de informação.</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50 flex flex-col items-center text-center group hover:bg-white transition-all duration-500">
                            <div className="w-14 h-14 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <CircleCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">Sem Venda de Dados</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Suas informações nunca serão vendidas para terceiros.</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50 flex flex-col items-center text-center group hover:bg-white transition-all duration-500">
                            <div className="w-14 h-14 bg-green-100 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <UserCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">Total Controle</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Você decide o que compartilha e pode apagar tudo quando quiser.</p>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Principal com Navegação Lateral */}
                <div className="container mx-auto px-4 py-20">
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Sidebar Minimalista */}
                        <aside className="hidden lg:block w-80 shrink-0">
                            <div className="sticky top-32 space-y-2">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 pl-4">Conteúdo</h4>
                                <nav>
                                    {sections.map(section => (
                                        <a 
                                            key={section.id} 
                                            href={`#${section.id}`}
                                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-300 group ${
                                                activeSection === section.id 
                                                ? 'bg-primary text-white shadow-xl translate-x-2' 
                                                : 'text-gray-500 hover:text-primary hover:bg-white'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                                activeSection === section.id ? 'bg-accent/20 text-accent' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10'
                                            }`}>
                                                {section.icon}
                                            </div>
                                            {section.title.split('. ')[1]}
                                        </a>
                                    ))}
                                </nav>
                                
                                <div className="mt-12 p-6 bg-accent/10 rounded-[2rem] border border-accent/20">
                                    <MessageSquareWarning className="w-8 h-8 text-primary mb-4" />
                                    <p className="text-xs text-primary/70 font-medium leading-relaxed">
                                        Esta política foi atualizada em <span className="font-bold text-primary">Outubro de 2024</span> para refletir os novos padrões de segurança internacional.
                                    </p>
                                </div>
                            </div>
                        </aside>

                        {/* Corpo do Texto */}
                        <div className="flex-grow space-y-16">
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-16">
                                <h2 className="text-3xl font-black text-primary mb-8 tracking-tight">Compromisso com a Lei Geral de Proteção de Dados</h2>
                                <p className="text-gray-600 leading-relaxed text-lg mb-12">
                                    O ImobiReview opera sob os princípios da <span className="font-bold text-primary italic">finalidade, adequação e necessidade</span>. Cada dado coletado tem o único propósito de tornar o aluguel de imóveis mais justo e seguro para inquilinos, proprietários e imobiliárias.
                                </p>

                                <div className="space-y-20">
                                    {sections.map(section => (
                                        <div key={section.id} id={section.id} className="policy-section scroll-mt-32 group">
                                            <div className="flex items-center gap-6 mb-6">
                                                <div className="w-14 h-14 bg-gray-50 text-primary rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                                                    {section.icon}
                                                </div>
                                                <h3 className="text-2xl font-black text-primary tracking-tight">
                                                    {section.title}
                                                </h3>
                                            </div>
                                            <div className="pl-0 md:pl-20">
                                                <div className="p-8 bg-gray-50 rounded-[2rem] border border-transparent group-hover:border-accent/30 group-hover:bg-white transition-all duration-500 hover:shadow-xl">
                                                    <p className="text-gray-600 leading-relaxed text-lg">
                                                        {section.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-24 p-12 bg-gradient-to-br from-[#0A2342] to-[#1a4b85] rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                                    <EffectBackground />
									<div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12">
                                        <CircleAlert className="w-64 h-64" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="text-2xl font-bold mb-4">Sua confiança é nosso maior ativo.</h4>
                                        <p className="text-blue-100 mb-8 max-w-xl">
                                            O ImobiReview não é apenas uma plataforma de avaliações, é um movimento em direção à transparência total. Proteger sua privacidade é o primeiro passo dessa jornada.
                                        </p>
                                        <button 
                                            onClick={onHomeClick}
                                            className="px-8 py-4 bg-accent text-primary font-black rounded-full hover:bg-white transition-all shadow-lg hover:shadow-accent/20"
                                        >
                                            ENTENDI E ACEITO
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer onAboutClick={onAboutClick} onHomeClick={onHomeClick} onContactClick={onContactClick} />
            <style>{`
                html { scroll-behavior: smooth; }
                .policy-section { position: relative; }
            `}</style>
        </div>
    );
};

export default PrivacyPolicyPage;
