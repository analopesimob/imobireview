import { AgencyProfile, ProfileType, Review } from './types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Carlos Pereira',
    authorProfile: ProfileType.Tenant,
    date: '2 weeks ago',
    contractPeriod: 'Jan 2023 - Jan 2024',
    overallScore: 5.0,
    criteria: [],
    title: 'Processo transparente',
    comment: 'Processo de locação muito transparente e rápido. A comunicação com a imobiliária foi excelente, sempre dispostos a ajudar.',
    isAnonymous: false,
  },
  {
    id: '2',
    author: 'Ana Souza',
    authorProfile: ProfileType.Landlord,
    date: '1 month ago',
    contractPeriod: 'Fev 2022 - Fev 2024',
    overallScore: 5.0,
    criteria: [],
    title: 'Ótima experiência',
    comment: "Ótima experiência como proprietária. Encontraram um bom inquilino rapidamente e cuidam de toda a burocracia. Recomendo.",
    isAnonymous: false,
  },
  {
    id: '3',
    author: 'Roberto Lima',
    authorProfile: ProfileType.Tenant,
    date: '2 months ago',
    contractPeriod: 'Mar 2023 - Abr 2024',
    overallScore: 4.0,
    criteria: [],
    title: 'Bom atendimento',
    comment: "O atendimento é bom, mas o processo de vistoria de entrada foi um pouco demorado. No geral, recomendo.",
    isAnonymous: false,
  },
];

export const MOCK_AGENCY_PROFILE: AgencyProfile = {
  name: 'Imobiliária',
  type: 'Real Estate Agency',
  cnpj: '12.345.678/0001-90',
  logoUrl: 'https://picsum.photos/seed/agency/100/100',
  overallReputation: 4.8,
  totalReviews: 132,
  reviews: MOCK_REVIEWS,
  criteriaAverages: [
    { subject: 'Comunicação', score: 5.0, fullMark: 5 },
    { subject: 'Transparência', score: 4.9, fullMark: 5 },
    { subject: 'Profissionalismo', score: 4.7, fullMark: 5 },
    { subject: 'Resolução', score: 4.6, fullMark: 5 },
  ],
  externalReputation: {
      google: { score: 4.2, total: 132 },
      reclameAqui: { score: 8.3, status: 'Bom' },
      serasa: { status: 'Baixo risco de crédito' }
  },
  legalTransparency: {
      activeProcesses: 0,
      lastCheck: '30 dias atrás'
  }
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
