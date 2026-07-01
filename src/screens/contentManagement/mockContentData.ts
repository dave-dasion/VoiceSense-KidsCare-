export interface CMSCourse {
  id: string;
  title: string;
  category: string;
  status: 'Published' | 'Draft';
  lessonsCount: number;
}

export interface CMSMedia {
  id: string;
  filename: string;
  filetype: 'Image' | 'Video' | 'PDF';
  size: string;
  uploadedAt: string;
}

export interface CMSApprovalItem {
  id: string;
  title: string;
  type: 'Course' | 'Lesson' | 'Quiz';
  author: string;
  submittedAt: string;
}

export const MOCK_CMS_COURSES: CMSCourse[] = [
  {
    id: 'cms_c_1',
    title: 'Advanced Dementia Care Practices',
    category: 'Clinical Care',
    status: 'Published',
    lessonsCount: 12,
  },
  {
    id: 'cms_c_2',
    title: 'Safe Lift & Transfer Protocol',
    category: 'Patient Safety',
    status: 'Published',
    lessonsCount: 8,
  },
  {
    id: 'cms_c_3',
    title: 'Senior Nutrition & Meal Planning',
    category: 'Wellness',
    status: 'Draft',
    lessonsCount: 5,
  },
];

export const MOCK_CMS_MEDIA: CMSMedia[] = [
  {
    id: 'cms_m_1',
    filename: 'dementia_validation_flowchart.png',
    filetype: 'Image',
    size: '1.4 MB',
    uploadedAt: 'Yesterday',
  },
  {
    id: 'cms_m_2',
    filename: 'safe_bed_transfer_guide.mp4',
    filetype: 'Video',
    size: '45.2 MB',
    uploadedAt: '3 days ago',
  },
  {
    id: 'cms_m_3',
    filename: 'hygiene_standards_handbook.pdf',
    filetype: 'PDF',
    size: '3.8 MB',
    uploadedAt: '1 week ago',
  },
];

export const MOCK_APPROVAL_ITEMS: CMSApprovalItem[] = [
  {
    id: 'cms_a_1',
    title: 'Elderly Heart Rate Diagnostics Quiz',
    type: 'Quiz',
    author: 'Dr. Jane Foster',
    submittedAt: '2 hours ago',
  },
  {
    id: 'cms_a_2',
    title: 'Palliative Comfort Best Practices',
    type: 'Lesson',
    author: 'Nurse Mark Spencer',
    submittedAt: 'Yesterday',
  },
];
