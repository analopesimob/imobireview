import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import EffectBackground from './EffectBackground';
import { Handshake, CheckCircle, PencilLine, ShieldCheck, UserCheck, CircleAlert} from 'lucide-react'

interface TermsOfServicePageProps {
    onAuthClick: () => void;
    onHomeClick: () => void;
    onAboutClick: () => void;
	onTermsClick: () => void;
}

const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onAuthClick, onHomeClick, onAboutClick, onTermsClick }) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const highlights = [
        {
            title: "Honestidade",
            desc: "Suas avaliações devem ser baseadas em experiências reais e comprováveis.",
            icon: <PencilLine className="w-6 h-6" />
        },
        {
            title: "Verificação",
            desc: "Validamos contratos para garantir que apenas partes envolvidas opinem.",
            icon: <ShieldCheck className="w-6 h-6" />
        },
        {
            title: "Respeito",
            desc: "Conteúdos ofensivos ou ataques pessoais serão removidos imediatamente.",
            icon: <Handshake className="w-6 h-6" />
        },
        {
            title: "Propriedade",
            desc: "Você mantém os direitos sobre seu texto, mas nos autoriza a exibí-lo.",
            icon: <CheckCircle className="w-6 h-6" />
        }
    ];

    const sections = [
        {
            id: 'elegibilidade',
            title: '1. Elegibilidade e Cadastro',
            content: 'Para utilizar o ImobiReview, você deve ter pelo menos 18 anos e plena capacidade civil. Ao se cadastrar, você garante que as informações fornecidas (como CPF/CNPJ) são verídicas. O uso de perfis falsos ou a personificação de terceiros resultará no banimento imediato da conta.'
        },
        {
            id: 'avaliacoes',
            title: '2. Diretrizes de Avaliação',
            content: 'As avaliações são o coração da nossa plataforma. Elas devem ser: (a) baseadas em um contrato de locação válido; (b) livres de termos de baixo calão ou discurso de ódio; (c) focadas na experiência profissional e imobiliária. O ImobiReview reserva-se o direito de solicitar provas adicionais de relação contratual a qualquer momento.'
        },
        {
            id: 'moderacao',
            title: '3. Moderação e Remoção',
            content: 'Nós não alteramos o conteúdo das avaliações, mas realizamos moderação para garantir o cumprimento destes termos. Avaliações que forem comprovadamente falsas, compradas ou que visem apenas prejudicar a reputação de outrem sem base factual serão removidas. Oferecemos o direito de resposta para todas as partes citadas.'
        },
        {
            id: 'propriedade',
            title: '4. Propriedade Intelectual',
            content: 'Todo o design, marca e tecnologia do ImobiReview são de nossa propriedade exclusiva. Ao publicar um comentário, você concede ao ImobiReview uma licença mundial, gratuita e não exclusiva para exibir, distribuir e reproduzir esse conteúdo em nossa plataforma.'
        },
        {
            id: 'responsabilidade',
            title: '5. Limitação de Responsabilidade',
            content: 'O ImobiReview é uma plataforma de conexão e compartilhamento. Não nos responsabilizamos pelas opiniões individuais dos usuários ou por decisões de negócios tomadas com base nas avaliações exibidas. Recomendamos que os usuários sempre realizem suas próprias diligências adicionais antes de assinar contratos.'
        },
        {
            id: 'alteracoes',
            title: '6. Alterações nos Termos',
            content: 'Podemos atualizar estes termos periodicamente para refletir mudanças legais ou melhorias em nossos processos. Notificaremos os usuários sobre mudanças significativas via e-mail ou avisos destacados na plataforma.'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white font-display">
            {/* Barra de Progresso Superior */}
            <div 
                className="fixed top-0 left-0 h-1 bg-accent z-[60] transition-all duration-300" 
                style={{ width: `${scrollProgress}%` }}
            ></div>

            <Header onAuthClick={onAuthClick} onHomeClick={onHomeClick} onAboutClick={onAboutClick} />

            <main className="flex-grow selection:bg-accent/30">
                {/* Hero Section */}
                <div className="relative bg-primary pt-24 pb-40 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm animate-fadeIn">
                            <Handshake className="w-4 h-4" /> Acordo de Utilização
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                            Termos de <span className="text-accent underline decoration-white/20 underline-offset-8">Serviço</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                            Bem-vindo ao ImobiReview. Ao utilizar nossa plataforma, você concorda em construir um mercado imobiliário mais transparente e justo.
                        </p>
                    </div>
                </div>

                {/* Seção TL;DR (Resumo Visual) */}
                <div className="container mx-auto px-4 -mt-20 relative z-20 mb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {highlights.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col items-center text-center group hover:border-accent transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="w-12 h-12 bg-primary text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-black text-primary mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conteúdo Jurídico Estruturado */}
                <div className="max-w-4xl mx-auto px-4 pb-32">
                    <div className="bg-gray-50/50 rounded-[3rem] p-8 md:p-16 border border-gray-100 relative overflow-hidden">
                        {/* Marca d'água decorativa */}
                        <div className="absolute -right-20 -top-20 opacity-[0.02] pointer-events-none">
                            <CircleAlert className="w-96 h-96" />
                        </div>

                        <div className="prose prose-slate max-w-none relative z-10">
                            <div className="flex items-center gap-4 mb-12 border-b border-gray-200 pb-8">
                                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-primary">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Documento Oficial</p>
                                    <h2 className="text-2xl font-bold text-primary m-0">Regras da Comunidade</h2>
                                </div>
                            </div>

                            <div className="space-y-16">
                                {sections.map((section) => (
                                    <div key={section.id} className="group scroll-mt-24">
                                        <h3 className="text-xl font-black text-primary mb-6 flex items-center gap-3">
                                            <span className="text-accent">#</span> {section.title}
                                        </h3>
                                        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-xl group-hover:border-accent/30 transition-all duration-500">
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Call to Action Final */}
                            <div className="mt-24 bg-[#0A2342] rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
                                <EffectBackground />
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-bold mb-4">Dúvidas sobre os Termos?</h4>
                                    <p className="text-blue-200 mb-8 max-w-md mx-auto">
                                        Nossa equipe jurídica está à disposição para esclarecer qualquer ponto. Transparência é o nosso lema.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button 
                                            onClick={onAboutClick}
                                            className="px-8 py-4 bg-white text-primary font-black rounded-full hover:bg-accent transition-all shadow-lg"
                                        >
                                            SAIBA MAIS SOBRE NÓS
                                        </button>
                                        <button 
                                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-black rounded-full hover:bg-white/5 transition-all"
                                        >
                                            VOLTAR AO TOPO
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Fix: remove unsupported props onAboutClick and onHomeClick from Footer */}
            <Footer />
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    );
};

export default TermsOfServicePage;