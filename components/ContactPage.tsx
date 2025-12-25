import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import EffectBackground from './EffectBackground';
import {
	Facebook,
	Instagram,
	Linkedin,
	Mail,
	Phone,
	Send,
	CircleCheckBig,
	BadgeQuestionMark,
	ChevronDown,
} from "lucide-react";

interface ContactPageProps {
    onAuthClick: () => void;
    onHomeClick: () => void;
    onAboutClick: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onAuthClick, onHomeClick, onAboutClick }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const topics = [
        'Suporte à Conta', 
        'Reportar uma Avaliação', 
        'Feedback', 
        'Outro'
    ];

    const faqs = [
        {
            question: "Como posso verificar minha conta?",
            answer: "Para verificar sua conta, acesse as configurações do seu perfil e envie um documento oficial com foto. Para locadores e inquilinos, é necessário enviar o contrato de locação para vincular as avaliações."
        },
        {
            question: "Minha avaliação é realmente anônima?",
            answer: "Sim. Ao escolher a opção 'Publicar Anonimamente', seu nome não aparece para o público nem para a outra parte avaliada. No entanto, o ImobiReview confirma sua identidade internamente para garantir autenticidade."
        },
        {
            question: "Como posso remover uma avaliação falsa?",
            answer:  "Se você acredita que uma avaliação viola nossas políticas ou é fraudulenta, clique no ícone de 'Reportar' no card da avaliação. Nossa equipe de moderação analisa todas as denúncias em até 48 horas."
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.topic) {
            alert("Please select a topic.");
            return;
        }
        setStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', topic: '', message: '' });
        }, 1500);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light font-display">
            <Header onAuthClick={onAuthClick} onHomeClick={onHomeClick} onAboutClick={onAboutClick} />

            <main className="flex-grow">
                {/* Hero Background */}
                <div className="bg-[#0A2342] pt-20 pb-48 relative overflow-hidden">
                     {/* Decorative Elements */}
                    <EffectBackground/>

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            Vamos Conversar?
                        </h1>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                            Estamos aqui para tirar suas dúvidas e ajudar no que precisar.
                        </p>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="container mx-auto px-4 -mt-32 relative z-20 mb-20">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                        
                        {/* Left Side: Contact Info */}
                        <div className="w-full md:w-5/12 bg-[#051326] p-10 md:p-14 text-white relative flex flex-col justify-between overflow-hidden">
                            {/* Abstract Pattern */}
                            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="absolute right-[-50px] top-[-50px] w-64 h-64 border-2 border-accent rounded-full"></div>
                                <div className="absolute right-[-20px] top-[50px] w-32 h-32 border border-white rounded-full"></div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-8">Fale com a nossa equipe</h2>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-accent">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Email</p>
                                            <p className="font-medium text-lg">contato@imobireview.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-accent">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">WhatsApp</p>
                                            <p className="font-medium text-lg">+55 (11) 0000-0000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 mt-12">
                                <p className="text-sm font-medium mb-4">Redes Sociais</p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="https://www.instagram.com/imobireview?igsh=aHd6dzRiajZubGp3&utm_source=qr" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="w-full md:w-7/12 p-10 md:p-14 bg-white relative">
                            {status === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
                                        <CircleCheckBig className="w-12 h-12 text-accent" />
                                    </div>
                                    <h2 className="text-3xl font-black text-primary mb-4">Mensagem enviada!</h2>
                                    <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                        Obrigado por nos contatar. Sua mensagem foi enviada e nossa equipe entrará em contato em breve.
                                    </p>
                                    <button 
                                        onClick={() => setStatus('idle')}
                                        className="text-primary font-bold hover:underline"
                                    >
                                        Enviar outra mensagem
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="h-full flex flex-col animate-fadeIn">
                                    <h2 className="text-2xl font-bold text-primary mb-6">Envie uma Mensagem</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Nome</label>
                                            <input 
                                                required
                                                type="text" 
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Email</label>
                                            <input 
                                                required
                                                type="email" 
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="text-sm font-bold text-gray-700 mb-3 block">Assunto</label>
                                        <div className="flex flex-wrap gap-2">
                                            {topics.map(topic => (
                                                <button
                                                    key={topic}
                                                    type="button"
                                                    onClick={() => setFormData({...formData, topic})}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                                                        formData.topic === topic 
                                                        ? 'bg-primary text-white border-primary shadow-lg scale-105' 
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-accent hover:text-primary'
                                                    }`}
                                                >
                                                    {topic}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-8 flex-grow">
                                        <label className="text-sm font-bold text-gray-700 mb-2 block">Mensagem</label>
                                        <textarea 
                                            required
                                            rows={4}
                                            className="w-full h-full min-h-[120px] px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                                            placeholder="Como podemos ajudar? Fale um pouco mais…"
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button 
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="bg-accent text-primary font-bold px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
                                            {!status.includes('sending') && <Send className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto mt-20">
                         <div className="text-center mb-10">
                            <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <BadgeQuestionMark className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-primary">Perguntas frequentes</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <button 
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="font-bold text-gray-800">{faq.question}</span>
                                        <ChevronDown 
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-accent' : ''}`} 
                                        />
                                    </button>
                                    <div className={`px-6 text-gray-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default ContactPage;