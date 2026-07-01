export interface SalesChatMessage {
  id: string;
  sender: 'client' | 'agent';
  text: string;
  timestamp: string;
}

export interface ObjectionChallenge {
  id: string;
  objectionText: string;
  category: string;
  bestResponses: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  role: string;
  industry: string;
  temperament: 'Skeptical' | 'Friendly' | 'Detail-Oriented' | 'Aggressive';
  scenario: string;
  avatar: string;
}

export interface SalesFeedbackMetric {
  category: string;
  score: number;
  color: string;
  comment: string;
}

export interface CoachingTip {
  id: string;
  title: string;
  tipText: string;
  xpValue: number;
}

export const INITIAL_SALES_CHAT: SalesChatMessage[] = [
  {
    id: 's_1',
    sender: 'client',
    text: "Hi, I am looking for a reliable elderly home care partner for my parents, but our budget is quite tight right now.",
    timestamp: '11:00 AM',
  },
  {
    id: 's_2',
    sender: 'agent',
    text: "I completely understand. Budgeting is very important. Let me walk you through our tiered care plans to see if we can find a custom fit.",
    timestamp: '11:01 AM',
  },
  {
    id: 's_3',
    sender: 'client',
    text: "That sounds reasonable. How do you handle emergencies or nurse visits in the basic tier?",
    timestamp: '11:02 AM',
  },
];

export const OBJECTION_CHALLENGES: ObjectionChallenge[] = [
  {
    id: 'obj_1',
    objectionText: "Your monthly rate is 20% higher than the local home care provider we looked at yesterday.",
    category: 'Price Objection',
    bestResponses: [
      "We can discount our price by 25% if you sign a 1-year contract right now.",
      "I understand price is crucial. Our rate includes 24/7 on-call registered nurse coordination and background-verified caregivers, which ensures premium safety compared to basic providers.",
      "Our competitor has very low ratings, so you get what you pay for.",
    ],
    correctAnswerIndex: 1,
    explanation: "Emphasizing value metrics (RN coordination, safety audits) justifies the price premium rather than discounting prematurely or attacking competitors.",
  },
  {
    id: 'obj_2',
    objectionText: "I'm worried my mother won't feel comfortable with a stranger coming into her home daily.",
    category: 'Trust & Comfort',
    bestResponses: [
      "She will get used to it after a week or two, don't worry about it.",
      "We offer a complimentary 'Meet and Greet' session where you and your mother can chat with the caregiver beforehand to ensure a perfect personality match.",
      "You can choose to stay in the room with her at all times if you don't trust us.",
    ],
    correctAnswerIndex: 1,
    explanation: "De-escalating stranger anxiety by introducing a low-friction 'Meet & Greet' establishes safety, trust, and validation.",
  },
];

export const CLIENT_PROFILES: ClientProfile[] = [
  {
    id: 'cli_1',
    name: 'Robert Vance',
    role: 'Managing Director',
    industry: 'Elderly Residences Corp',
    temperament: 'Skeptical',
    scenario: 'Vetting home care agencies to partner with his retirement facility block.',
    avatar: 'business-outline',
  },
  {
    id: 'cli_2',
    name: 'Linda Martinez',
    role: 'Family Decision Maker',
    industry: 'Private Care client',
    temperament: 'Detail-Oriented',
    scenario: 'Looking for a caregiver specialized in advanced dementia validation for her husband.',
    avatar: 'person-outline',
  },
];

export const PERFORMANCE_FEEDBACK: SalesFeedbackMetric[] = [
  {
    category: 'Discovery Questions',
    score: 90,
    color: '#38A169',
    comment: 'Excellent open-ended questions targeting family schedules and budget thresholds.',
  },
  {
    category: 'Objection De-escalation',
    score: 75,
    color: '#DD6B20',
    comment: 'You tended to offer discounts too early. Emphasize safety guarantees before lowering rates.',
  },
  {
    category: 'Rapport & Empathy',
    score: 88,
    color: '#3182CE',
    comment: 'Warm and validating language used during client family descriptions.',
  },
  {
    category: 'Closing Call-to-Action',
    score: 82,
    color: '#6B46C1',
    comment: 'Clear next steps offered, but ensure you confirm the calendar date explicitly.',
  },
];

export const COACHING_TIPS: CoachingTip[] = [
  {
    id: 'tip_1',
    title: 'Use the LAER Method',
    tipText: 'Listen, Acknowledge, Explore, and Respond. Never skip directly to the response when a price objection arises.',
    xpValue: 150,
  },
  {
    id: 'tip_2',
    title: 'Safety Guarantee Pitch',
    tipText: "In corporate care deals, lead with our 100% background-checked compliance records to overcome corporate trust objections.",
    xpValue: 200,
  },
];
