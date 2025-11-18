export enum ProfileType {
  Tenant = 'Inquilino',
  Landlord = 'Locador',
  Agency = 'Imobiliária',
}

export interface ReviewCriterion {
  label: string;
  score: number;
}

export interface Review {
  id: string;
  author: string;
  authorProfile: ProfileType;
  date: string;
  contractPeriod: string;
  overallScore: number;
  criteria: ReviewCriterion[];
  title: string;
  comment: string;
  isAnonymous: boolean;
  justification?: string;
  reply?: {
    author: string;
    date: string;
    comment: string;
  };
}

export interface ExternalReputation {
  google: { score: number; total: number };
  reclameAqui: { score: number; status: string };
  serasa: { status: string };
}

export interface LegalTransparency {
  activeProcesses: number;
  lastCheck: string;
}

export interface AgencyProfile {
  name: string;
  type: string;
  cnpj: string;
  logoUrl: string;
  overallReputation: number;
  totalReviews: number;
  reviews: Review[];
  criteriaAverages: {
    subject: string;
    score: number;
    fullMark: number;
  }[];
  externalReputation: ExternalReputation;
  legalTransparency: LegalTransparency;
}