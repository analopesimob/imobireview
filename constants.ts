import { AgencyProfile, ProfileType, Review } from './types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Jane Doe',
    authorProfile: ProfileType.Tenant,
    date: '2 days ago',
    contractPeriod: 'Jan 2023 - Jan 2024',
    overallScore: 5.0,
    criteria: [], // Not shown in new card design
    title: 'Excellent Service!', // Not shown directly, but good to have
    comment: 'Working with Stellar Properties was an absolute pleasure. Their market knowledge and professionalism are second to none. They made the entire process seamless and stress-free.',
    isAnonymous: false,
    reply: undefined,
  },
  {
    id: '2',
    author: 'John Smith',
    authorProfile: ProfileType.Landlord,
    date: '1 week ago',
    contractPeriod: 'Fev 2022 - Fev 2024',
    overallScore: 4.0,
    criteria: [],
    title: 'Good, but could be better',
    comment: "Very good experience overall. The communication was excellent, though the negotiation phase could have been a bit stronger. Still, I would highly recommend them.",
    isAnonymous: false,
  },
  {
    id: '3',
    author: 'Emily White',
    authorProfile: ProfileType.Tenant,
    date: '3 weeks ago',
    contractPeriod: 'Mar 2023 - Abr 2024',
    overallScore: 5.0,
    criteria: [],
    title: 'Flawless execution',
    comment: "Flawless execution from start to finish. The team is incredibly transparent and professional. I felt supported and informed every step of the way. Truly a 5-star service!",
    isAnonymous: false,
  },
];

export const MOCK_AGENCY_PROFILE: AgencyProfile = {
  name: 'Stellar Properties',
  cnpj: '12.345.678/0001-90',
  logoUrl: 'https://picsum.photos/seed/agency/100/100',
  overallReputation: 4.8,
  totalReviews: 124,
  reviews: MOCK_REVIEWS,
  criteriaAverages: [
    { subject: 'Communication', score: 4.9, fullMark: 5 },
    { subject: 'Professionalism', score: 4.8, fullMark: 5 },
    { subject: 'Transparency', score: 5.0, fullMark: 5 },
    { subject: 'Market Knowledge', score: 4.7, fullMark: 5 },
    { subject: 'Negotiation Skills', score: 4.6, fullMark: 5 },
  ],
};

export const TENANT_REVIEWING_AGENCY_CRITERIA = [
    'Comunicação',
    'Agilidade na Manutenção',
    'Transparência',
    'Profissionalismo'
];

export const LANDLORD_REVIEWING_TENANT_CRITERIA = [
    'Pontualidade no Pagamento',
    'Cuidado com o Imóvel',
    'Comunicação',
    'Respeito a Regras Condominiais'
];

export const TENANT_REVIEWING_LANDLORD_CRITERIA = [
    'Comunicação',
    'Rapidez na Resolução de Problemas',
    'Manutenção do Imóvel',
    'Flexibilidade'
];

export const LANDLORD_REVIEWING_AGENCY_CRITERIA = [
    'Comunicação',
    'Transparência Financeira',
    'Qualidade dos Inquilinos',
    'Gestão de Manutenção'
];

export const AGENCY_REVIEWING_TENANT_CRITERIA = [
    'Pontualidade no Pagamento',
    'Cuidado com o Imóvel',
    'Comunicação',
    'Cumprimento do Contrato'
];

export const AGENCY_REVIEWING_LANDLORD_CRITERIA = [
    'Comunicação',
    'Agilidade nas Decisões',
    'Manutenção Preventiva',
    'Confiança'
];