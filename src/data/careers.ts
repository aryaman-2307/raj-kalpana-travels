import type { Career } from '@/types';

export const CAREERS: Career[] = [
  {
    id: 'career-01',
    title: 'Bus Driver',
    department: 'Operations',
    location: 'Delhi',
    type: 'full-time',
    description:
      'We are looking for experienced and responsible bus drivers to join our growing fleet. You will be responsible for safely transporting passengers across inter-city routes, maintaining schedules, and ensuring a comfortable travel experience. This is a critical role that directly impacts our passengers\' safety and satisfaction.',
    requirements: [
      'Valid Heavy Motor Vehicle (HMV) driving licence',
      'Minimum 3 years of experience driving commercial buses on inter-city routes',
      'Clean driving record with no major traffic violations',
      'Good knowledge of North Indian highway routes (Delhi, UP, MP)',
      'Ability to work night shifts and adhere to departure schedules',
      'Basic understanding of vehicle maintenance and safety checks',
      'Physically fit with valid medical fitness certificate',
    ],
  },
  {
    id: 'career-02',
    title: 'Customer Support Executive',
    department: 'Support',
    location: 'Delhi',
    type: 'full-time',
    description:
      'Join our 24/7 customer support team and be the first point of contact for our passengers. You will handle booking inquiries, cancellation requests, complaint resolution, and provide real-time travel assistance over phone, email, and chat. Strong communication skills and a passion for helping people are essential.',
    requirements: [
      'Graduate in any discipline',
      'Minimum 1 year of experience in customer service or call centre operations',
      'Fluency in Hindi and English (spoken and written)',
      'Excellent communication and problem-solving skills',
      'Ability to handle high call volumes and work in rotational shifts',
      'Basic computer proficiency (email, CRM tools, MS Office)',
      'Calm and patient demeanour when handling escalations',
    ],
  },
  {
    id: 'career-03',
    title: 'Digital Marketing Executive',
    department: 'Marketing',
    location: 'Delhi',
    type: 'full-time',
    description:
      'We are seeking a creative and data-driven Digital Marketing Executive to strengthen our online presence. You will plan and execute social media campaigns, manage paid advertising, create engaging content, and analyse performance metrics to drive bookings and brand awareness for Raj Kalpana Travels.',
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      'Minimum 2 years of experience in digital marketing',
      'Hands-on experience with Meta Ads, Google Ads, and SEO tools',
      'Strong content writing skills for social media and blog posts',
      'Proficiency in analytics tools (Google Analytics, Meta Business Suite)',
      'Experience with graphic design tools (Canva, Adobe Creative Suite) is a plus',
      'Knowledge of the travel or transportation industry is preferred',
    ],
  },
];
