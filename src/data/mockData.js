import React from 'react';
import { Sparkles, Scale, Wallet, Compass } from 'lucide-react';

export const BRAND_NAME = "BAELIT";
export const BRAND_SLOGAN = "Strategic Advisory & Holistic Clarity";

export const SERVICES = [
  {
    id: 'kundali',
    title: 'Kundali Advisory',
    subtitle: 'Cosmic alignment & Vedic birth chart analysis',
    icon: Sparkles,
    description: 'Empirical Vedic chart analysis, planetary transit mapping, and tailored remedies for timing key life transitions.',
    offerings: [
      'In-depth Natal Chart & Dasha Analysis',
      'Strategic Compatibility & Matchmaking',
      'Transit Timing for Business & Life Decisions',
      'Personalized Remedial Guidance'
    ]
  },
  {
    id: 'legal',
    title: 'Legal Advisory',
    subtitle: 'Precision contracts & risk mitigation',
    icon: Scale,
    description: 'Comprehensive legal structuring, contract negotiations, compliance reviews, and governance for individuals & enterprises.',
    offerings: [
      'Enterprise & Startup Contract Structuring',
      'Property & Intellectual Asset Advisory',
      'Regulatory Compliance & Risk Audits',
      'Personal & Corporate Dispute Resolution'
    ]
  },
  {
    id: 'finance',
    title: 'Strategic Finance',
    subtitle: 'Wealth management & capital optimization',
    icon: Wallet,
    description: 'Sophisticated wealth preservation, investment strategy, tax structuring, and sustainable financial growth planning.',
    offerings: [
      'Portfolio Analysis & Capital Allocation',
      'Tax Efficiency & Estate Structuring',
      'Business Cashflow Optimization',
      'Personalized Retirement & Wealth Protection'
    ]
  },
  {
    id: 'career',
    title: 'Executive Career Counsel',
    subtitle: 'Leadership roadmap & professional counsel',
    icon: Compass,
    description: 'Strategic career positioning, executive counseling, transition management, and high-impact skill roadmaps.',
    offerings: [
      'Executive Resume & Personal Branding',
      'C-Suite & Board Interview Coaching',
      'Strategic Career Pathing & Salary Negotiation',
      'Leadership & Resilience Mentorship'
    ]
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Eleanor Vance',
    role: 'Managing Partner & Legal Counsel',
    experience: '18+ yrs experience',
    bio: 'Former Senior Partner at international advisory firm specializing in enterprise governance.'
  },
  {
    name: 'Dr. Devansh Sharma',
    role: 'Principal Vedic & Astrological Analyst',
    experience: '15+ yrs experience',
    bio: 'Scholarly researcher blending traditional Jyotish wisdom with modern decision theory.'
  },
  {
    name: 'Marcus Sterling',
    role: 'Head of Strategic Finance',
    experience: '20+ yrs experience',
    bio: 'Ex-investment strategist focusing on high-net-worth portfolio preservation and growth.'
  },
  {
    name: 'Claire Moreau',
    role: 'Executive Career Advisor',
    experience: '14+ yrs experience',
    bio: 'Certified executive coach empowering global tech leaders and senior directors.'
  }
];

export const STATS = [
  { label: 'High-Net Clients Served', value: '1,200+' },
  { label: 'Years of Practice', value: '18+' },
  { label: 'Domain Specialists', value: '25+' },
  { label: 'Advisory Satisfaction', value: '99.4%' }
];
