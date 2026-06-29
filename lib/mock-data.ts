export type Member = {
  id: string;
  name: string;
  email: string;
  score: number;
  lessons: number;
  lastActive: string;
  status: "completed" | "in_progress" | "new";
};

export const members: Member[] = [
  { id: "1", name: "د. فاطمة الزهراني", email: "f.zahrani@kfsh.med.sa", score: 89, lessons: 24, lastActive: "قبل ساعتين", status: "completed" },
  { id: "2", name: "م. عبدالله القحطاني", email: "a.qahtani@nghs.med.sa", score: 76, lessons: 18, lastActive: "اليوم", status: "completed" },
  { id: "3", name: "د. نورة الشهري", email: "n.shahri@kfmc.med.sa", score: 64, lessons: 14, lastActive: "أمس", status: "in_progress" },
  { id: "4", name: "م. خالد العتيبي", email: "k.otaibi@kfsh.med.sa", score: 58, lessons: 11, lastActive: "قبل 3 أيام", status: "in_progress" },
  { id: "5", name: "أ. سارة الدوسري", email: "s.dosari@nghs.med.sa", score: 42, lessons: 6, lastActive: "قبل أسبوع", status: "in_progress" },
  { id: "6", name: "د. محمد الغامدي", email: "m.ghamdi@kfmc.med.sa", score: 0, lessons: 0, lastActive: "لم يبدأ", status: "new" },
];

export const domainPerformance = [
  { domain: "نظم المعلومات الصحية", score: 78 },
  { domain: "التشغيل والحوكمة", score: 65 },
  { domain: "التوافقية والمعايير", score: 54 },
  { domain: "التحليلات والذكاء", score: 42 },
  { domain: "القيادة والتحول الرقمي", score: 69 },
];

export const weeklyActivity = [
  { day: "السبت", lessons: 18 },
  { day: "الأحد", lessons: 24 },
  { day: "الإثنين", lessons: 31 },
  { day: "الثلاثاء", lessons: 22 },
  { day: "الأربعاء", lessons: 28 },
  { day: "الخميس", lessons: 19 },
  { day: "الجمعة", lessons: 6 },
];

export const seatsData = { used: 36, total: 50 };

export const organizations = [
  { id: "1", name: "مستشفى الملك فيصل التخصصي", country: "السعودية", seats: "50/50", start: "2025-01-15", end: "2026-06-15", status: "active" as const },
  { id: "2", name: "مدينة الملك فهد الطبية", country: "السعودية", seats: "120/150", start: "2025-03-01", end: "2026-09-01", status: "active" as const },
  { id: "3", name: "مستشفى الحرس الوطني", country: "السعودية", seats: "80/100", start: "2024-11-01", end: "2026-02-01", status: "expiring" as const },
  { id: "4", name: "هيئة الصحة بدبي", country: "الإمارات", seats: "15/25", start: "2026-04-01", end: "2026-07-01", status: "trial" as const },
  { id: "5", name: "وزارة الصحة العامة", country: "قطر", seats: "200/200", start: "2025-06-01", end: "2027-06-01", status: "active" as const },
];
