import React from 'react';
import Header from './Header';
import Footer from './Footer';
import StarRating from './StarRating';
import { MOCK_AGENCY_PROFILE } from '../constants';
import { 
  VerifiedUserIcon, 
  MapPinIcon, 
  PhoneIcon, 
  GlobeIcon,
  CheckCircleIcon
} from './icons';
import { ProfileType } from '../types';

interface ProfilePageProps {
    onAuthClick: () => void;
    onStartValidation: (id: string) => void;
    onBack: () => void;
	onAboutClick?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onAuthClick, onStartValidation, onBack, onAboutClick }) => {
    const profile = MOCK_AGENCY_PROFILE;

    return (
        <div className="flex flex-col min-h-screen bg-background-light">
            <Header onAuthClick={onAuthClick} onHomeClick={onBack} onAboutClick={onAboutClick} />
            
            <main className="flex-grow pb-12">
                {/* Banner / Header */}
                <div className="bg-primary text-white pt-12 pb-24 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="w-24 h-24 bg-white rounded-xl p-1 shadow-lg shrink-0">
                                <img src={profile.logoUrl} alt={profile.name} className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-black tracking-tight">{profile.name}</h1>
                                    <span className="text-accent flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full text-xs font-bold">
                                        <VerifiedUserIcon className="text-sm" /> Verified
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-gray-300">
                                    <span className="flex items-center gap-1.5">
                                        <MapPinIcon className="w-4 h-4" /> São Paulo, SP
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <PhoneIcon className="w-4 h-4" /> (11) 3344-5566
                                    </span>
                                    <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                                        <GlobeIcon className="w-4 h-4" /> www.sonhoreal.com.br
                                    </a>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex gap-3">
                                <button 
                                    onClick={() => onStartValidation(profile.cnpj)}
                                    className="px-6 py-2.5 bg-accent text-primary font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
                                >
                                    Avaliar Imobiliária
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Overlapping Banner */}
                <div className="container mx-auto max-w-6xl px-4 -mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Stats & Reputation */}
                        <div className="space-y-6">
                             {/* Overall Score Card */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-lg font-bold text-primary mb-4">Reputação Geral</h3>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="text-5xl font-black text-primary tracking-tight">{profile.overallReputation}</div>
                                        <div className="text-sm text-gray-500 font-medium mt-1">de 5.0</div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <StarRating rating={profile.overallReputation} mode="display" size="lg" />
                                        <div className="text-xs text-gray-400 mt-2 font-medium">{profile.totalReviews} avaliações</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {profile.criteriaAverages.map((criterion) => (
                                        <div key={criterion.subject}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium text-gray-600">{criterion.subject}</span>
                                                <span className="text-sm font-bold text-primary">{criterion.score.toFixed(1)}</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-accent rounded-full transition-all duration-500" 
                                                    style={{ width: `${(criterion.score / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* External Reputation Card */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <span>⭐</span> Reputação Externa
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700 font-medium text-sm">Google Reviews</span>
                                        <div className="text-right flex items-center gap-2">
                                            <span className="text-primary font-bold">{profile.externalReputation.google.score}</span>
                                            <span className="text-xs text-gray-400">({profile.externalReputation.google.total})</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700 font-medium text-sm">Reclame Aqui</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded text-xs font-bold">
                                                {profile.externalReputation.reclameAqui.status}
                                            </span>
                                            <span className="text-primary font-bold">{profile.externalReputation.reclameAqui.score}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700 font-medium text-sm">Serasa</span>
                                        <span className="text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded text-xs font-bold">
                                            {profile.externalReputation.serasa.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Transparency Card */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <span>🏛️</span> Transparência Jurídica
                                </h3>
                                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-gray-700 text-sm font-medium">Processos ativos</span>
                                        <span className="text-primary font-bold bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">
                                            {profile.legalTransparency.activeProcesses}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-xs font-medium">Última consulta</span>
                                            <span className="text-gray-400 text-xs">{profile.legalTransparency.lastCheck}</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-start gap-2 text-xs text-gray-400">
                                    <CheckCircleIcon className="w-4 h-4 shrink-0 text-accent" />
                                    <p>Dados verificados em fontes públicas oficiais.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Reviews Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-primary">Avaliações Recentes</h2>
                                <div className="flex gap-2">
                                    <select className="bg-white border border-gray-200 text-sm text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                        <option>Mais recentes</option>
                                        <option>Maior nota</option>
                                        <option>Menor nota</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {profile.reviews.map((review) => (
                                    <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-primary text-lg">{review.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-sm font-medium text-gray-600">{review.author}</span>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                                                        review.authorProfile === ProfileType.Tenant ? 'bg-accent text-white' : 
                                                        review.authorProfile === ProfileType.Landlord ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                                                    }`}>
                                                        {review.authorProfile}
                                                    </span>
                                                    <span className="text-xs text-gray-400">• {review.date}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <StarRating rating={review.overallScore} mode="display" size="md" />
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            "{review.comment}"
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-50 pt-3">
                                            <span>Período: <span className="font-semibold text-gray-700">{review.contractPeriod}</span></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                             <button className="w-full py-4 bg-white border border-gray-200 text-gray-500 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                                Carregar mais avaliações
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProfilePage;
