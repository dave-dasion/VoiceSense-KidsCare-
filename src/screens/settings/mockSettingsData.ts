export interface GeneralSettings {
  language: string;
  autoUpdate: boolean;
  offlineDownloads: boolean;
}

export interface BrandingSettings {
  primaryColor: string;
  themeMode: 'Light' | 'Dark' | 'System';
  fontFamilyStyle: 'Default' | 'Serif' | 'Monospace';
}

export interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  streakReminders: boolean;
  complianceAlerts: boolean;
}

export interface LMSConfig {
  passingScore: number;
  autoRenewIntervalDays: number;
  maxQuizAttempts: number;
}

export interface AICoachConfig {
  coachingTone: 'Friendly' | 'Professional' | 'Rigorous';
  llmModelName: string;
  feedbackVerbosity: 'Short' | 'Detailed' | 'Comprehensive';
}

export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  language: 'English (US)',
  autoUpdate: true,
  offlineDownloads: false,
};

export const DEFAULT_BRANDING_SETTINGS: BrandingSettings = {
  primaryColor: '#1A365D', // Dark Blue
  themeMode: 'Light',
  fontFamilyStyle: 'Default',
};

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  pushEnabled: true,
  emailEnabled: true,
  streakReminders: true,
  complianceAlerts: true,
};

export const DEFAULT_LMS_CONFIG: LMSConfig = {
  passingScore: 80,
  autoRenewIntervalDays: 365,
  maxQuizAttempts: 3,
};

export const DEFAULT_AI_COACH_CONFIG: AICoachConfig = {
  coachingTone: 'Professional',
  llmModelName: 'gpt-4o-care',
  feedbackVerbosity: 'Detailed',
};
