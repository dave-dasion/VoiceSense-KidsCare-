export interface CourseProgress {
  id: string;
  title: string;
  category: string;
  percentComplete: number;
  lessonsCompleted: number;
  totalLessons: number;
  hoursSpent: number;
  averageScore: number;
  lastStudied: string;
  status: 'In Progress' | 'Completed' | 'Not Started';
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Clinical Care' | 'Communication' | 'Safety' | 'Professionalism';
  status: 'Mastered' | 'Practiced' | 'Not Started';
  verifiedBy?: string;
  dateVerified?: string;
  xpAwarded: number;
}

export interface WeeklyStudyHours {
  day: string;
  hours: number;
}

export interface MonthScore {
  month: string;
  score: number;
}

export interface PerformanceInsight {
  id: string;
  type: 'strength' | 'weakness' | 'recommendation';
  title: string;
  description: string;
  impactScore: number; // 0-100
  icon: string; // Ionicons name
  color: string;
}

export const OVERALL_STATS = {
  completionRate: 64, // overall progress percentage
  activeStreak: 7, // days
  totalHours: 27.5,
  completedCourses: 3,
  activeCourses: 2,
  totalXP: 3850,
};

export const COURSE_PROGRESS_DATA: CourseProgress[] = [
  {
    id: 'course_1',
    title: 'Elderly Care & Hygiene Foundations',
    category: 'Clinical Care',
    percentComplete: 100,
    lessonsCompleted: 8,
    totalLessons: 8,
    hoursSpent: 12.5,
    averageScore: 92,
    lastStudied: '2026-06-08',
    status: 'Completed',
  },
  {
    id: 'course_2',
    title: 'Dementia & Cognitive Care Specialist',
    category: 'Specialty Care',
    percentComplete: 66,
    lessonsCompleted: 6,
    totalLessons: 9,
    hoursSpent: 8.2,
    averageScore: 84,
    lastStudied: '2026-06-09',
    status: 'In Progress',
  },
  {
    id: 'course_3',
    title: 'Client Outreach & Relationship Master',
    category: 'Sales Outbound',
    percentComplete: 25,
    lessonsCompleted: 2,
    totalLessons: 8,
    hoursSpent: 4.8,
    averageScore: 78,
    lastStudied: '2026-06-05',
    status: 'In Progress',
  },
  {
    id: 'course_4',
    title: 'Workplace Organization & Ethics',
    category: 'Professionalism',
    percentComplete: 0,
    lessonsCompleted: 0,
    totalLessons: 5,
    hoursSpent: 0,
    averageScore: 0,
    lastStudied: 'Never',
    status: 'Not Started',
  },
  {
    id: 'course_5',
    title: 'Fall Prevention & Safety Protocols',
    category: 'Safety',
    percentComplete: 100,
    lessonsCompleted: 6,
    totalLessons: 6,
    hoursSpent: 2.0,
    averageScore: 100,
    lastStudied: '2026-05-28',
    status: 'Completed',
  },
];

export const SKILL_ITEMS: SkillItem[] = [
  {
    id: 'skill_bedbathing',
    name: 'Bedbathing and Patient Hygiene',
    category: 'Clinical Care',
    status: 'Mastered',
    verifiedBy: 'Sarah Jenkins, RN BSN',
    dateVerified: '2026-05-14',
    xpAwarded: 500,
  },
  {
    id: 'skill_mobility',
    name: 'Assisted Transfer Techniques',
    category: 'Clinical Care',
    status: 'Mastered',
    verifiedBy: 'Sarah Jenkins, RN BSN',
    dateVerified: '2026-05-15',
    xpAwarded: 500,
  },
  {
    id: 'skill_validation',
    name: 'Validation Therapy Methods',
    category: 'Communication',
    status: 'Practiced',
    xpAwarded: 250,
  },
  {
    id: 'skill_agitation',
    name: 'De-escalating Cognitive Agitation',
    category: 'Communication',
    status: 'Not Started',
    xpAwarded: 500,
  },
  {
    id: 'skill_fall_mitigation',
    name: 'Wandering Safety & Fall Prevention',
    category: 'Safety',
    status: 'Mastered',
    verifiedBy: 'Emily Watson, Head Instructor',
    dateVerified: '2026-05-28',
    xpAwarded: 400,
  },
  {
    id: 'skill_objection_handling',
    name: 'Objection Resolution Strategies',
    category: 'Communication',
    status: 'Practiced',
    xpAwarded: 200,
  },
  {
    id: 'skill_structured_pitch',
    name: 'Structured POC Pitching',
    category: 'Professionalism',
    status: 'Not Started',
    xpAwarded: 300,
  },
];

export const WEEKLY_STUDY_HOURS: WeeklyStudyHours[] = [
  { day: 'Mon', hours: 2.4 },
  { day: 'Tue', hours: 4.1 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 5.2 },
  { day: 'Fri', hours: 3.0 },
  { day: 'Sat', hours: 6.8 },
  { day: 'Sun', hours: 4.5 },
];

export const MONTHLY_SCORES: MonthScore[] = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 76 },
  { month: 'Mar', score: 81 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 92 },
];

export const PERFORMANCE_INSIGHTS: PerformanceInsight[] = [
  {
    id: 'ins_1',
    type: 'strength',
    title: 'Outstanding Safety Awareness',
    description: 'Scored 100% on safety procedures and fall prevention practical checks. Your physical care diligence is a key asset.',
    impactScore: 92,
    icon: 'shield-checkmark-outline',
    color: '#38A169', // Success green
  },
  {
    id: 'ins_2',
    type: 'strength',
    title: 'Strong Study Habit Consistency',
    description: 'Active learning streak of 7 days with consistent login blocks. Keep this momentum to boost memory retention.',
    impactScore: 85,
    icon: 'time-outline',
    color: '#2B6CB0', // Vivid Blue
  },
  {
    id: 'ins_3',
    type: 'weakness',
    title: 'Dementia Scenario Check-off Pending',
    description: 'Cognitive agitation scenario simulation remains incomplete. Interactive module 3 requires hands-on virtual drill.',
    impactScore: -33,
    icon: 'alert-circle-outline',
    color: '#DD6B20', // Warning Orange
  },
  {
    id: 'ins_4',
    type: 'recommendation',
    title: 'Complete Dementia Simulation',
    description: 'Finish the Dementia Cognitive Agitation scenario to unlock your Dementia Care Specialist credential.',
    impactScore: 95,
    icon: 'bulb-outline',
    color: '#6B46C1', // Accent Purple
  },
  {
    id: 'ins_5',
    type: 'recommendation',
    title: 'Review Objection Handling Pitches',
    description: 'Your outbound communication module quiz score is 78%. Practice interactive objection drills twice this week to target 85%.',
    impactScore: 72,
    icon: 'mic-outline',
    color: '#805AD5', // Practice Violet
  },
];
