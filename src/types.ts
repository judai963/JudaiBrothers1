export type ActivePage = 'home' | 'rates' | 'emergency' | 'estimator' | 'service-areas' | 'commercial' | 'about';

export interface FlatRateItem {
  id: string;
  category: 'water-heaters' | 'drains' | 'faucets-sinks' | 'toilets' | 'filtration' | 'leaks-repipe' | 'commercial' | 'remodeling';
  categoryLabel: string;
  title: string;
  price: number;
  unit: string;
  timeEstimate: string;
  warranty: string;
  shortDesc: string;
  description: string;
  whatsIncluded: string[];
  recommendedFor: string;
  popular?: boolean;
  emergency?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  service: string;
  date: string;
  rating: number;
  text: string;
  verifiedSource: 'Housecall Pro' | 'Thumbtack' | 'Google' | 'BBB';
  technician?: string;
  featured?: boolean;
}

export interface ServiceArea {
  city: string;
  zipCodes: string[];
  region: 'North Valley' | 'West Valley' | 'East Valley' | 'Central Phoenix';
  avgResponseMins: number;
  waterHardnessGrains: string;
  plumbingNote: string;
}

export interface BookingFormData {
  serviceId: string;
  serviceTitle: string;
  estimatedPrice: number;
  serviceCategory: string;
  urgency: 'routine' | 'today' | 'emergency-now';
  date: string;
  timeSlot: string;
  address: string;
  city: string;
  zip: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
  specialInstructions?: string;
}

export interface CompetitorComparisonItem {
  feature: string;
  judaiBrothers: string;
  parkerAndSons: string;
  georgeBrazil: string;
  goettl: string;
  radiantPlumbing: string;
  serviceChampions: string;
  jbAdvantage: boolean;
  explanation: string;
}

export interface CriticRoundAudit {
  round: number;
  componentName: string;
  focusArea: string;
  competitorsCompared: string[];
  unlabeledCriticVerdict: {
    winner: string;
    reasoning: string;
    whichBuiltThisYear: string;
  };
  stopwatchMetrics: {
    saturdayWaterHeaterBookSec: number;
    drainCleanPriceLookupSec: number;
    emergencyCallClickSec: number;
    seniorReadabilityScore: number; // 0 - 100
  };
  openGapResolved: string;
  remainingGapToIterate: string;
  status: 'passed' | 'optimizing' | 'benchmark-beaten';
}
