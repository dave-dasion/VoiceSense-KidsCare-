export interface Requirement {
  id: string;
  name: string;
  isDone: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  category: string;
  progress: number; // percentage, e.g. 100 for unlocked
  isUnlocked: boolean;
  unlockedDate?: string;
  credentialId?: string;
  instructorName?: string;
  skillsVerified: string[];
  requirements: Requirement[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  criteria: string;
  category: 'Progress' | 'Exams' | 'Specialty' | 'Roleplay' | 'Speed';
  icon: string; // Ionicons name
  color: string; // Theme color representation
  isUnlocked: boolean;
  unlockedDate?: string;
}

// In-memory mock certifications
const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert_elderly_foundations',
    title: 'Elderly Care & Hygiene Foundations',
    category: 'Clinical Care',
    progress: 100,
    isUnlocked: true,
    unlockedDate: '2026-05-15',
    credentialId: 'EC-FOUND-9842-26',
    instructorName: 'Sarah Jenkins, RN BSN',
    skillsVerified: [
      'Basic Patient Hygiene and Bedbathing',
      'Assisted Mobility and Patient Transfers',
      'Safety and Fall Prevention Protocols',
      'Infection Control Practices'
    ],
    requirements: [
      { id: 'req_1_1', name: 'Complete Course: Elderly Care Foundations', isDone: true },
      { id: 'req_1_2', name: 'Pass Quiz: Hygiene and Mobility basics', isDone: true },
      { id: 'req_1_3', name: 'Verify Bedbathing Practical Checklists', isDone: true }
    ]
  },
  {
    id: 'cert_dementia_care',
    title: 'Dementia & Cognitive Care Specialist',
    category: 'Specialty Care',
    progress: 66,
    isUnlocked: false,
    skillsVerified: [
      'De-escalating Cognitive Agitation',
      'Validation Therapy Methods',
      'Cognitive Stimulation Games',
      'Wandering Safety Mitigation'
    ],
    requirements: [
      { id: 'req_2_1', name: 'Complete Course: Dementia Core Communication', isDone: true },
      { id: 'req_2_2', name: 'Pass Quiz: Cognitive Care & Validation (Score > 85%)', isDone: true },
      { id: 'req_2_3', name: 'Complete Interactive Scenario: Safety Protocols', isDone: false }
    ]
  },
  {
    id: 'cert_sales_relations',
    title: 'Client Outreach & Relationship Master',
    category: 'Sales Outbound',
    progress: 25,
    isUnlocked: false,
    skillsVerified: [
      'B2B Outbound Lead Qualification',
      'Objection Handlings and Budgets Pivoting',
      'Structured Proof of Concept Pitching',
      'Strategic Pipeline Navigation'
    ],
    requirements: [
      { id: 'req_3_1', name: 'Complete Course: Cold Outreach Fundamentals', isDone: true },
      { id: 'req_3_2', name: 'Complete Mock Objection Negotiation Roleplay', isDone: false },
      { id: 'req_3_3', name: 'Pass Sales Process Assessment Quiz (Score > 80%)', isDone: false },
      { id: 'req_3_4', name: 'Conduct Mock Call Simulator Drill', isDone: false }
    ]
  }
];

// In-memory mock badges
const MOCK_BADGES: Badge[] = [
  {
    id: 'badge_first_lesson',
    name: 'First Milestone',
    description: 'Completed your very first course lesson on the platform.',
    criteria: 'Finish any lesson content chapter.',
    category: 'Progress',
    icon: 'book',
    color: '#3182CE', // Info / Blue
    isUnlocked: true,
    unlockedDate: '2026-05-01'
  },
  {
    id: 'badge_perfect_score',
    name: 'Perfect Score',
    description: 'Answered every single question correctly on a graded assessment.',
    criteria: 'Get 100% on any module quiz.',
    category: 'Exams',
    icon: 'checkbox',
    color: '#38A169', // Success / Green
    isUnlocked: true,
    unlockedDate: '2026-06-05'
  },
  {
    id: 'badge_fast_learner',
    name: 'Speedy Scholar',
    description: 'Completed three separate lessons in a single calendar day.',
    criteria: 'Finish 3 lessons within 24 hours.',
    category: 'Speed',
    icon: 'speedometer',
    color: '#E53E3E', // Danger / Red
    isUnlocked: true,
    unlockedDate: '2026-05-12'
  },
  {
    id: 'badge_dementia_champion',
    name: 'Validation Champion',
    description: 'Prove expert status in dementia patient validation methods.',
    criteria: 'Pass Dementia Care Specialist with 100% progress.',
    category: 'Specialty',
    icon: 'ribbon',
    color: '#D69E2E', // Amber / Gold
    isUnlocked: false
  },
  {
    id: 'badge_active_listener',
    name: 'Active Listener',
    description: 'Engaged and responded perfectly to mock caller objections.',
    criteria: 'Score above 90% in Objection Practice simulator.',
    category: 'Roleplay',
    icon: 'mic',
    color: '#805AD5', // Practice / Violet
    isUnlocked: false
  },
  {
    id: 'badge_super_trainee',
    name: 'Grandmaster XP',
    description: 'Amassed a huge pool of XP points through studies and quizzes.',
    criteria: 'Reach 5,000 overall trainee XP points.',
    category: 'Progress',
    icon: 'sparkles',
    color: '#319795', // Teal
    isUnlocked: false
  }
];

// Helper Business Logic
export function getCertificates(): Certificate[] {
  return MOCK_CERTIFICATES;
}

export function getCertificate(id: string): Certificate | undefined {
  return MOCK_CERTIFICATES.find((c) => c.id === id);
}

export function getBadges(): Badge[] {
  return MOCK_BADGES;
}

export function getBadgeStats() {
  const total = MOCK_BADGES.length;
  const unlocked = MOCK_BADGES.filter((b) => b.isUnlocked).length;
  return {
    total,
    unlocked,
    progressPercent: total > 0 ? Math.round((unlocked / total) * 100) : 0
  };
}
