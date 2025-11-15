
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

export interface AgencyProfile {
  name: string;
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
}