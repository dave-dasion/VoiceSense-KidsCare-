export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  learningPoint: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionsCount: number;
  timeLimit: number; // in minutes
  passingScore: number; // in percentage, e.g. 80
  points: number; // XP reward
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  date: string;
  score: number; // percentage
  correctCount: number;
  totalCount: number;
  timeTaken: string; // MM:SS format
  passed: boolean;
  answers: { [questionId: string]: number }; // questionId -> selected option index
  flaggedQuestions: string[]; // array of questionIds that were flagged
}

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  rank?: number;
  isCurrentUser?: boolean;
}

// ----------------------------------------------------
// Mock Data Pools
// ----------------------------------------------------

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'q1',
    title: 'AI Product & Solution Pitching',
    description: 'Master the art of presenting AI solutions to enterprise healthcare and IT stakeholders. This assessment tests discovery mapping, technical handling, and closing models.',
    category: 'Product Presentation',
    difficulty: 'Advanced',
    questionsCount: 5,
    timeLimit: 10, // 10 minutes
    passingScore: 80,
    points: 300,
    questions: [
      {
        id: 'q1_1',
        question: 'When presenting an AI-driven clinical workflow solution to a hospital administrator, which metric should you emphasize first?',
        options: [
          'The exact parameter count of the underlying neural network model.',
          'Reduction in physician documentation overhead and patient check-in bottlenecks.',
          'The layout style of the developer-facing API dashboard.',
          'The raw size of the dataset used in the pre-training phase.'
        ],
        correctIndex: 1,
        explanation: 'Hospital administrators are business and operations-driven. Focus first on direct clinical utility, such as reduced paperwork fatigue and streamlined operations, rather than deep model mechanics.',
        learningPoint: 'Lead with client-centric outcomes rather than developer mechanics.'
      },
      {
        id: 'q1_2',
        question: 'What is the most effective technique to handle a client objection about AI privacy compliance?',
        options: [
          'Ignore the objection and continue showing slides about product features.',
          'Guarantee 100% security and promise that no breach can ever occur.',
          'Acknowledge the concern, and detail specific standard protocols (HIPAA/SOC2, encryption, local hosting policies).',
          'Tell the client that compliance is their responsibility alone.'
        ],
        correctIndex: 2,
        explanation: 'Handling regulatory concerns requires active verification. Detail standard certifications, on-prem/cloud containment strategies, and specific data compliance frameworks.',
        learningPoint: 'Build trust with transparent, specific compliance specifications.'
      },
      {
        id: 'q1_3',
        question: 'A prospective client complains that "AI models are black boxes that we cannot trust." How do you map this to your solution?',
        options: [
          'Explain the system\'s explanation features (explainable AI) showing how it flags source references.',
          'Agree with them and admit that the software is unreliable.',
          'Tell them they have to trust the system if they want to improve efficiency.',
          'Argue that they are wrong and that human doctors are more error-prone.'
        ],
        correctIndex: 0,
        explanation: 'Explainable AI features build transparency. Showing references, confidence scores, and diagnostic reasoning aids in bridging the trust gap.',
        learningPoint: 'Address the "black box" concern using visual, reference-backed explanations.'
      },
      {
        id: 'q1_4',
        question: 'During the Discovery Phase, a customer mentions that they have many siloed legacy databases. What is your best response?',
        options: [
          'State that your AI tool only works on modern databases and they must migrate first.',
          'Propose our product\'s pre-built legacy database connectors and custom ETL workflows.',
          'Suggest that they manually copy and paste their records into Excel.',
          'Skip discovery and proceed straight to the closing pitch.'
        ],
        correctIndex: 1,
        explanation: 'Highlighting interoperability and pre-built wrappers for legacy databases mitigates friction during early technical onboarding.',
        learningPoint: 'Position product integrations early to reduce customer migration anxiety.'
      },
      {
        id: 'q1_5',
        question: 'Which is the most persuasive "closing technique" for an enterprise software demonstration?',
        options: [
          'Offering a sudden 50% discount if they sign within the next 5 minutes.',
          'Asking if they would like to run a structured, 14-day proof-of-concept (PoC) with their own test data.',
          'Refusing to leave the room until they schedule a contract signing date.',
          'Sending them a massive 150-page user manual and waiting for their response.'
        ],
        correctIndex: 1,
        explanation: 'Offering a structured, low-risk proof-of-concept (PoC) aligns expectations, showcases direct value on custom workloads, and leads naturally to sales closure.',
        learningPoint: 'Close complex sales by suggesting structured, low-risk valuation trials.'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Sales Outreach & Cold Calling',
    description: 'Test your understanding of lead qualification, ICP profiling, active listening, and objection techniques.',
    category: 'Sales Outbound',
    difficulty: 'Intermediate',
    questionsCount: 4,
    timeLimit: 8,
    passingScore: 75,
    points: 200,
    questions: [
      {
        id: 'q2_1',
        question: 'What is an Ideal Customer Profile (ICP) designed to determine?',
        options: [
          'The salary brackets of our outbound marketing agents.',
          'The types of organizations that derive the maximum value from our product and represent high conversions.',
          'The social media aesthetic of our branding campaign.',
          'The dictionary definition of general retail consumers.'
        ],
        correctIndex: 1,
        explanation: 'ICPs group firmographic factors (industry size, tech stack, pain points) of prospects who benefit most and convert fastest.',
        learningPoint: 'An ICP refines outreach targeting to high-value prospects.'
      },
      {
        id: 'q2_2',
        question: 'If a cold prospect says, "We do not have budget for this right now," what is the best active listening pivot?',
        options: [
          'Apologize and hang up immediately.',
          'Ask, "If budget wasn\'t an issue, what specific challenges would you want our solution to solve?" to identify need.',
          'Tell them they are missing out and their competitors are buying it.',
          'Offer to call back in a year.'
        ],
        correctIndex: 1,
        explanation: 'A budget objection is often a value objection in disguise. Pivot to explore underlying needs to demonstrate potential ROI.',
        learningPoint: 'Acknowledge constraints and pivot to uncover business need first.'
      },
      {
        id: 'q2_3',
        question: 'Which outreach channel is most effective for a multi-touch B2B prospecting sequence?',
        options: [
          'Relying solely on a single bulk email blast once a month.',
          'A coordinated multi-channel flow combining LinkedIn touchpoints, personalized cold emails, and phone follow-ups.',
          'Calling the prospect 10 times in a row on the same day.',
          'Sending a paper letter in the post and hoping for a reply.'
        ],
        correctIndex: 1,
        explanation: 'Research shows multi-channel approaches have up to a 3x higher response rate than single-channel touchpoints.',
        learningPoint: 'Combine email, phone, and LinkedIn for optimal outreach touchpoints.'
      },
      {
        id: 'q2_4',
        question: 'What does the "BANT" framework stand for in lead qualification?',
        options: [
          'Budget, Authority, Need, Timeline',
          'Business, Action, Network, Tech',
          'Buying, Agreement, Negotiation, Trust',
          'Banner, Activity, Navigation, Title'
        ],
        correctIndex: 0,
        explanation: 'BANT is a classic sales framework analyzing Budget, decision-making Authority, business Need, and purchase Timeline.',
        learningPoint: 'Use BANT to systematically qualify prospects.'
      }
    ]
  },
  {
    id: 'q3',
    title: 'Productivity Office Tools: Excel & Word',
    description: 'Verify your proficiency in using Excel formulas, data analysis pivot tables, and document formatting basics.',
    category: 'Productivity Software',
    difficulty: 'Beginner',
    questionsCount: 3,
    timeLimit: 5,
    passingScore: 100,
    points: 150,
    questions: [
      {
        id: 'q3_1',
        question: 'Which Excel formula is used to look up values horizontally across columns instead of vertically down rows?',
        options: [
          '=VLOOKUP',
          '=HLOOKUP',
          '=INDEX(MATCH)',
          '=SUMIF'
        ],
        correctIndex: 1,
        explanation: 'HLOOKUP is horizontal lookup, matching key fields across rows, whereas VLOOKUP is vertical lookup.',
        learningPoint: 'Use VLOOKUP for vertical arrays, HLOOKUP for horizontal tables.'
      },
      {
        id: 'q3_2',
        question: 'What is the primary benefit of creating a Pivot Table in Excel?',
        options: [
          'It locks the spreadsheet to prevent editing.',
          'It dynamically summarizes, groups, and analyzes large datasets.',
          'It translates cell text into multiple languages.',
          'It automatically adds aesthetic animations to cell highlights.'
        ],
        correctIndex: 1,
        explanation: 'Pivot Tables allow dynamic aggregation and cross-tabulation of structured database columns instantly.',
        learningPoint: 'Use Pivot Tables to aggregate and dissect massive datasets.'
      },
      {
        id: 'q3_3',
        question: 'In Microsoft Word, what feature allows multiple users to suggest edits and review comments asynchronously?',
        options: [
          'Mail Merge',
          'Track Changes & Comments',
          'Page Breaks',
          'Auto-Correct'
        ],
        correctIndex: 1,
        explanation: 'Track Changes marks insertions/deletions inline, allowing team editors to approve or reject suggestions.',
        learningPoint: 'Leverage Track Changes for team editing workflows.'
      }
    ]
  }
];

// In-memory logs of attempts
export let MOCK_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att_1',
    quizId: 'q2',
    date: '2026-06-05T14:30:00Z',
    score: 50,
    correctCount: 2,
    totalCount: 4,
    timeTaken: '05:12',
    passed: false,
    answers: {
      'q2_1': 1,
      'q2_2': 0, // incorrect choice
      'q2_3': 0, // incorrect choice
      'q2_4': 0
    },
    flaggedQuestions: ['q2_2']
  },
  {
    id: 'att_2',
    quizId: 'q2',
    date: '2026-06-06T10:15:00Z',
    score: 100,
    correctCount: 4,
    totalCount: 4,
    timeTaken: '04:05',
    passed: true,
    answers: {
      'q2_1': 1,
      'q2_2': 1,
      'q2_3': 1,
      'q2_4': 0
    },
    flaggedQuestions: []
  }
];

// Leaderboard lists
export const MOCK_LEADERBOARDS: {
  weekly: LeaderboardUser[];
  monthly: LeaderboardUser[];
  allTime: LeaderboardUser[];
} = {
  weekly: [
    { id: '1', name: 'Sophia Sterling', xp: 2450 },
    { id: '2', name: 'James Henderson', xp: 2100 },
    { id: '3', name: 'Emily Bennett', xp: 1950 },
    { id: 'u_curr', name: 'Trainee User', xp: 1550, isCurrentUser: true },
    { id: '4', name: 'Marcus Vance', xp: 1400 },
    { id: '5', name: 'Dr. Evelyn Carter', xp: 1250 },
    { id: '6', name: 'Alex Patel', xp: 1100 }
  ],
  monthly: [
    { id: '1', name: 'Sophia Sterling', xp: 8700 },
    { id: '2', name: 'Marcus Vance', xp: 8100 },
    { id: '3', name: 'James Henderson', xp: 7450 },
    { id: '4', name: 'Emily Bennett', xp: 6900 },
    { id: 'u_curr', name: 'Trainee User', xp: 6200, isCurrentUser: true },
    { id: '5', name: 'Alex Patel', xp: 5800 },
    { id: '6', name: 'Dr. Evelyn Carter', xp: 5400 },
    { id: '7', name: 'Liam Fitzgerald', xp: 4800 }
  ],
  allTime: [
    { id: '1', name: 'Marcus Vance', xp: 28400 },
    { id: '2', name: 'Sophia Sterling', xp: 26100 },
    { id: '3', name: 'Dr. Evelyn Carter', xp: 24900 },
    { id: '4', name: 'James Henderson', xp: 22800 },
    { id: '5', name: 'Emily Bennett', xp: 21500 },
    { id: '6', name: 'Liam Fitzgerald', xp: 19400 },
    { id: 'u_curr', name: 'Trainee User', xp: 18250, isCurrentUser: true },
    { id: '7', name: 'Sarah Jenkins', xp: 16800 },
    { id: '8', name: 'Alex Patel', xp: 15200 }
  ]
};

// ----------------------------------------------------
// API / Business Logic Functions
// ----------------------------------------------------

export function getQuizzes(): Quiz[] {
  return MOCK_QUIZZES;
}

export function getQuiz(id: string): Quiz | undefined {
  return MOCK_QUIZZES.find((q) => q.id === id);
}

export function getAttempts(quizId?: string): QuizAttempt[] {
  if (quizId) {
    return MOCK_ATTEMPTS.filter((att) => att.quizId === quizId).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return MOCK_ATTEMPTS.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function submitQuizAttempt(
  quizId: string,
  answers: { [questionId: string]: number },
  timeTakenSeconds: number,
  flaggedQuestions: string[]
): QuizAttempt {
  const quiz = getQuiz(quizId);
  if (!quiz) throw new Error('Quiz not found');

  let correctCount = 0;
  quiz.questions.forEach((q) => {
    if (answers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  const totalCount = quiz.questions.length;
  const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const passed = score >= quiz.passingScore;

  // Format time taken (seconds to MM:SS)
  const mins = Math.floor(timeTakenSeconds / 60);
  const secs = timeTakenSeconds % 60;
  const timeTaken = `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;

  const newAttempt: QuizAttempt = {
    id: `att_${Date.now()}`,
    quizId,
    date: new Date().toISOString(),
    score,
    correctCount,
    totalCount,
    timeTaken,
    passed,
    answers,
    flaggedQuestions
  };

  MOCK_ATTEMPTS.push(newAttempt);

  // Update Current User XP in leaderboard if passed
  if (passed) {
    const xpReward = quiz.points;
    MOCK_LEADERBOARDS.weekly = MOCK_LEADERBOARDS.weekly.map((u) =>
      u.isCurrentUser ? { ...u, xp: u.xp + xpReward } : u
    );
    MOCK_LEADERBOARDS.monthly = MOCK_LEADERBOARDS.monthly.map((u) =>
      u.isCurrentUser ? { ...u, xp: u.xp + xpReward } : u
    );
    MOCK_LEADERBOARDS.allTime = MOCK_LEADERBOARDS.allTime.map((u) =>
      u.isCurrentUser ? { ...u, xp: u.xp + xpReward } : u
    );
  }

  return newAttempt;
}

export function getLeaderboard(timeframe: 'weekly' | 'monthly' | 'allTime'): LeaderboardUser[] {
  const list = [...MOCK_LEADERBOARDS[timeframe]];
  // Sort descending by XP
  list.sort((a, b) => b.xp - a.xp);
  // Add rank index
  return list.map((user, idx) => ({
    ...user,
    rank: idx + 1
  }));
}

export function getOverallStats() {
  const attempts = getAttempts();
  const passedAttempts = attempts.filter((a) => a.passed);
  
  // Calculate unique quizzes passed
  const passedQuizIds = new Set(passedAttempts.map((a) => a.quizId));
  const uniqueQuizzesCompleted = passedQuizIds.size;
  
  // High score per quiz
  const highScores: { [quizId: string]: number } = {};
  attempts.forEach((att) => {
    if (!highScores[att.quizId] || att.score > highScores[att.quizId]) {
      highScores[att.quizId] = att.score;
    }
  });

  const scoresList = Object.values(highScores);
  const avgScore =
    scoresList.length > 0
      ? Math.round(scoresList.reduce((a, b) => a + b, 0) / scoresList.length)
      : 0;

  // Find user's rank in All Time
  const rankedAllTime = getLeaderboard('allTime');
  const userRank = rankedAllTime.find((u) => u.isCurrentUser)?.rank || 7;
  const userXp = rankedAllTime.find((u) => u.isCurrentUser)?.xp || 18250;

  return {
    totalXp: userXp,
    completedCount: uniqueQuizzesCompleted,
    totalQuizzes: MOCK_QUIZZES.length,
    averageScore: avgScore,
    globalRank: userRank
  };
}
