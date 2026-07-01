export interface AppNotification {
  id: string;
  type: 'reminder' | 'certification' | 'announcement';
  title: string;
  body: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'not_1',
    type: 'certification',
    title: 'Certification Expiring Soon',
    body: 'Your Dementia Care Level 1 Certification expires in 14 days. Tap to launch the renewal assessment.',
    time: '2 hours ago',
    read: false,
    priority: 'high',
  },
  {
    id: 'not_2',
    type: 'reminder',
    title: 'Daily Micro-learning Due',
    body: 'Complete today\'s 5-minute quiz on Senior Patient Mobility to maintain your active daily streak!',
    time: '4 hours ago',
    read: false,
    priority: 'medium',
  },
  {
    id: 'not_3',
    type: 'announcement',
    title: 'New Care Guidelines Released',
    body: 'Avita AI Coach has been updated with the latest clinical nursing documentation safety protocols for 2026.',
    time: '1 day ago',
    read: true,
    priority: 'low',
  },
  {
    id: 'not_4',
    type: 'reminder',
    title: 'Incomplete Lesson: Client Discovery',
    body: 'You left the "Qualified Needs Vetting" sales simulation at 45% completion. Pick up where you left off!',
    time: '2 days ago',
    read: true,
    priority: 'medium',
  },
  {
    id: 'not_5',
    type: 'certification',
    title: 'Badge Unlocked: Empathy Master',
    body: 'Congratulations! Your rapport score exceeded 90% across three consecutive client simulations.',
    time: '3 days ago',
    read: true,
    priority: 'medium',
  },
  {
    id: 'not_6',
    type: 'announcement',
    title: 'Maintenance Advisory',
    body: 'The ElderlyCare training portal will undergo a scheduled maintenance on Saturday between 2 AM and 4 AM UTC.',
    time: '5 days ago',
    read: true,
    priority: 'low',
  },
];
