export interface ChatMessage {
  id: string;
  sender: 'user' | 'avita';
  text: string;
  timestamp: string;
}

export interface AssistantTopic {
  id: string;
  title: string;
  category: string;
  content: string;
  steps: string[];
}

export interface RecommendationItem {
  id: string;
  title: string;
  reason: string;
  priority: 'High' | 'Medium' | 'Low';
  duration: string;
  icon: string;
  color: string;
  route: string;
}

export interface DailyTask {
  id: string;
  title: string;
  points: number;
  isCompleted: boolean;
  icon: string;
}

export interface FeedbackMetric {
  name: string;
  score: number; // 0-100
  color: string;
  comments: string;
}

export const INITIAL_CHAT_HISTORY: ChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'avita',
    text: "Hello, Emily! I'm Avita, your personalized AI coach. I've audited your latest clinical assessment. You did outstandingly in safe patient mobility transfers!",
    timestamp: '10:30 AM',
  },
  {
    id: 'msg_2',
    sender: 'user',
    text: "Thanks, Avita! What should I focus on next?",
    timestamp: '10:31 AM',
  },
  {
    id: 'msg_3',
    sender: 'avita',
    text: "You should focus on validation communication protocols for dementia caregivers. Would you like to review validation guidelines or start a practice simulation?",
    timestamp: '10:31 AM',
  },
];

export const SUGGESTED_PROMPTS = [
  'How to redirect dementia patients?',
  'Explain Safe Patient Transfers',
  'Practice Bedbathing Checklist',
  'How do I earn the Grandmaster XP badge?',
];

export const ASSISTANT_TOPICS: AssistantTopic[] = [
  {
    id: 'topic_dementia_validation',
    title: 'Validation Therapy Methods',
    category: 'Communication',
    content: 'Validation therapy is an empathetic way of communicating with people who have Alzheimer’s disease or other forms of dementia. Rather than correcting or arguing with them, you validate their feelings and reality.',
    steps: [
      'Listen actively without judgment or attempt to correct facts.',
      'Acknowledge and validate the feelings behind their statements (e.g., "It sounds like you miss your mother very much").',
      'Use a gentle, warm tone of voice and clear open eye contact.',
      'Ask clarifying questions to help redirect their anxiety into a safe topic.'
    ],
  },
  {
    id: 'topic_patient_transfers',
    title: 'Safe Patient Transfers',
    category: 'Safety',
    content: 'Moving a patient between a bed, wheelchair, or shower requires strict adherence to body mechanics to prevent injury to both the patient and the caregiver.',
    steps: [
      'Assess the patient’s mobility level and determine if additional help or hoist is required.',
      'Place the wheelchair close to the bed at a 45-degree angle, locking all wheels securely.',
      'Keep your feet flat, shoulder-width apart, and bend at your knees rather than your waist.',
      'Explain the transfer steps to the patient, grab their transfer belt, and assist them on a count of three.'
    ],
  },
  {
    id: 'topic_hygiene_bath',
    title: 'Bedbathing & Hygiene Basics',
    category: 'Clinical Care',
    content: 'Maintaining patient hygiene through bed baths helps prevent pressure sores and skin infections while ensuring patient comfort and dignity.',
    steps: [
      'Prepare warm water, washcloths, clean sheets, and body wash beforehand.',
      'Ensure the room is warm and keep the patient draped with a bath blanket for warmth and modesty.',
      'Wash the face first with water only, then wash the body from clean to dirty areas.',
      'Pat dry gently and apply moisturizer to prevent skin breakdown.'
    ],
  },
];

export const PERSONALIZED_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'rec_1',
    title: 'Dementia Scenario Roleplay',
    reason: 'Your validation communication metrics are pending check-off.',
    priority: 'High',
    duration: '10 mins',
    icon: 'chatbubbles-outline',
    color: '#805AD5', // Purple
    route: 'ContinueLearning',
  },
  {
    id: 'rec_2',
    title: 'Objection Handling Quiz',
    reason: 'Target score is >85% (current assessment is 78%).',
    priority: 'Medium',
    duration: '5 mins',
    icon: 'checkbox-outline',
    color: '#3182CE', // Blue
    route: 'QuizList',
  },
  {
    id: 'rec_3',
    title: 'Safe Transfers Refresher',
    reason: 'Keep your clinical care safety compliance up-to-date.',
    priority: 'Low',
    duration: '3 mins',
    icon: 'library-outline',
    color: '#319795', // Teal
    route: 'CourseCatalog',
  },
];

export const DAILY_TASKS: DailyTask[] = [
  {
    id: 'task_1',
    title: 'Chat with Avita AI Coach',
    points: 100,
    isCompleted: true,
    icon: 'chatbubble-ellipses-outline',
  },
  {
    id: 'task_2',
    title: 'Complete 1 Dementia Communication Lesson',
    points: 250,
    isCompleted: false,
    icon: 'book-outline',
  },
  {
    id: 'task_3',
    title: 'Take the Objection Handling Practice Quiz',
    points: 150,
    isCompleted: false,
    icon: 'create-outline',
  },
];

export const FEEDBACK_METRICS: FeedbackMetric[] = [
  {
    name: 'Safety & Compliance',
    score: 95,
    color: '#38A169', // Green
    comments: 'Excellent body mechanics, safety awareness, and fall prevention knowledge.',
  },
  {
    name: 'Empathy & Validation',
    score: 84,
    color: '#3182CE', // Blue
    comments: 'Good validate patterns, but sometimes try to correct dementia dates. Stick to validating emotion.',
  },
  {
    name: 'Speech Tone & Pace',
    score: 78,
    color: '#DD6B20', // Orange
    comments: 'Ensure you slow down when explaining instructions to elderly clients (target pace: 130 words/min).',
  },
  {
    name: 'Accuracy & Answers',
    score: 82,
    color: '#6B46C1', // Purple
    comments: 'Solid knowledge base. Review dementia agitation protocols to boost accuracy scores further.',
  },
];
