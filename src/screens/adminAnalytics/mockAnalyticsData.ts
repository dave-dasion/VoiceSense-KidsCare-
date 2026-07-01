export interface KPIStats {
  totalUsers: number;
  activeCourses: number;
  averageQuizScore: number;
  activeCertifications: number;
}

export interface UserPerformanceRecord {
  id: string;
  name: string;
  email: string;
  coursesCompleted: number;
  quizAverage: number;
  certStatus: 'Active' | 'Expiring' | 'None';
  lastActive: string;
}

export interface CoursePerformanceRecord {
  id: string;
  title: string;
  category: string;
  totalEnrolled: number;
  completionRate: number;
  averageRating: number;
}

export interface AssessmentPerformanceRecord {
  id: string;
  quizTitle: string;
  attempts: number;
  passRate: number;
  mostMissedQuestion: string;
}

export interface CertificationPerformanceRecord {
  id: string;
  certName: string;
  issuedCount: number;
  expiringCount: number;
  lapsedCount: number;
}

export const ADMIN_KPI_STATS: KPIStats = {
  totalUsers: 245,
  activeCourses: 14,
  averageQuizScore: 84.5,
  activeCertifications: 182,
};

export const MOCK_USER_PERFORMANCE: UserPerformanceRecord[] = [
  {
    id: 'u_1',
    name: 'Alice Johnson',
    email: 'alice.johnson@eldercare.com',
    coursesCompleted: 8,
    quizAverage: 92.4,
    certStatus: 'Active',
    lastActive: '10 mins ago',
  },
  {
    id: 'u_2',
    name: 'Michael Smith',
    email: 'michael.smith@eldercare.com',
    coursesCompleted: 5,
    quizAverage: 79.8,
    certStatus: 'Expiring',
    lastActive: '2 hours ago',
  },
  {
    id: 'u_3',
    name: 'Sarah Williams',
    email: 'sarah.williams@eldercare.com',
    coursesCompleted: 7,
    quizAverage: 86.2,
    certStatus: 'Active',
    lastActive: '1 day ago',
  },
  {
    id: 'u_4',
    name: 'James Davis',
    email: 'james.davis@eldercare.com',
    coursesCompleted: 3,
    quizAverage: 71.5,
    certStatus: 'None',
    lastActive: '3 days ago',
  },
];

export const MOCK_COURSE_PERFORMANCE: CoursePerformanceRecord[] = [
  {
    id: 'c_1',
    title: 'Dementia Validation Techniques',
    category: 'Clinical Care',
    totalEnrolled: 184,
    completionRate: 78,
    averageRating: 4.8,
  },
  {
    id: 'c_2',
    title: 'Elderly Mobility & Transfers',
    category: 'Patient Safety',
    totalEnrolled: 142,
    completionRate: 85,
    averageRating: 4.6,
  },
  {
    id: 'c_3',
    title: 'Rapport Vetting & Sales Vitals',
    category: 'Sales Outreach',
    totalEnrolled: 98,
    completionRate: 62,
    averageRating: 4.3,
  },
];

export const MOCK_ASSESSMENT_PERFORMANCE: AssessmentPerformanceRecord[] = [
  {
    id: 'q_1',
    quizTitle: 'Dementia Care Level 1 Assessment',
    attempts: 320,
    passRate: 88,
    mostMissedQuestion: 'How to de-escalate aggressive validation triggers?',
  },
  {
    id: 'q_2',
    quizTitle: 'Elderly Safety & Fall Audits',
    attempts: 210,
    passRate: 94,
    mostMissedQuestion: 'Correct angle configurations for bed transfers.',
  },
  {
    id: 'q_3',
    quizTitle: 'Sales Objection Price Practice',
    attempts: 145,
    passRate: 76,
    mostMissedQuestion: 'Early contract negotiation discount thresholds.',
  },
];

export const MOCK_CERTIFICATION_PERFORMANCE: CertificationPerformanceRecord[] = [
  {
    id: 'cert_1',
    certName: 'Dementia Care Specialist (Level 1)',
    issuedCount: 120,
    expiringCount: 14,
    lapsedCount: 3,
  },
  {
    id: 'cert_2',
    certName: 'Elderly Mobility & Safety Officer',
    issuedCount: 85,
    expiringCount: 8,
    lapsedCount: 0,
  },
  {
    id: 'cert_3',
    certName: 'Senior Sales Outreach Professional',
    issuedCount: 42,
    expiringCount: 2,
    lapsedCount: 4,
  },
];
