export type Member = {
  id: string;
  name: string;
  email: string;
  score: number;
  lessons: number;
  lastActive: string;
  status: "completed" | "in_progress" | "new";
};

export type Organization = {
  id: string;
  name: string;
  country: string;
  seats: string;
  start: string;
  end: string;
  status: "active" | "expired" | "trial" | "expiring";
};

export const ORG = {
  name: "مستشفى الملك فهد التخصصي",
  adminName: "مصطفى العمري",
  adminEmail: "mostafa.omari@kfsh.sa",
  adminInitials: "م.ع",
  seats: { used: 36, total: 50 },
  contractEnd: "2026-06-30",
  contractEndLabel: "30 يونيو 2026",
};

export const members: Member[] = [
  { id: "1", name: "سارة الأحمدي",    email: "sara.ahmadi@kfsh.sa",    score: 87, lessons: 24, lastActive: "اليوم",         status: "completed"   },
  { id: "2", name: "محمد الزهراني",   email: "m.zahrani@kfsh.sa",      score: 72, lessons: 18, lastActive: "أمس",           status: "in_progress" },
  { id: "3", name: "نورة القحطاني",   email: "noura.q@kfsh.sa",        score: 65, lessons: 15, lastActive: "منذ 3 أيام",   status: "in_progress" },
  { id: "4", name: "خالد العتيبي",    email: "k.otaibi@kfsh.sa",       score: 91, lessons: 30, lastActive: "اليوم",         status: "completed"   },
  { id: "5", name: "ريم السلمي",      email: "reem.salmi@kfsh.sa",     score: 43, lessons: 6,  lastActive: "منذ أسبوع",    status: "in_progress" },
  { id: "6", name: "فيصل الدوسري",   email: "f.aldosari@kfsh.sa",     score: 0,  lessons: 0,  lastActive: "—",             status: "new"         },
];

export const domainPerformance = [
  { domain: "حوكمة المعلومات الصحية",              score: 78 },
  { domain: "التشغيل البيني والمعايير (FHIR)",     score: 62 },
  { domain: "الأمن والخصوصية (PDPL)",              score: 55 },
  { domain: "إدارة التغيير والمشاريع",              score: 70 },
  { domain: "تقنيات الرعاية الصحية الرقمية",        score: 48 },
];

export const weeklyActivity = [
  { day: "السبت",     sessions: 12 },
  { day: "الأحد",     sessions: 18 },
  { day: "الاثنين",   sessions: 25 },
  { day: "الثلاثاء",  sessions: 20 },
  { day: "الأربعاء",  sessions: 30 },
  { day: "الخميس",    sessions: 22 },
  { day: "الجمعة",    sessions: 8  },
];

export const seatsData = ORG.seats;

export const organizations: Organization[] = [
  { id: "1", name: "مستشفى الملك فهد التخصصي",      country: "KSA", seats: "36/50",  start: "2025-01-01", end: "2026-06-30", status: "active"   },
  { id: "2", name: "مجموعة السعودي الألماني",          country: "KSA", seats: "22/30",  start: "2025-03-15", end: "2026-03-14", status: "active"   },
  { id: "3", name: "مستشفى الحمادي",                   country: "KSA", seats: "20/20",  start: "2025-06-01", end: "2025-12-31", status: "expired"  },
  { id: "4", name: "وزارة الصحة — البحرين",            country: "BHR", seats: "60/75",  start: "2025-09-01", end: "2026-08-31", status: "active"   },
  { id: "5", name: "مستشفى الأمير محمد بن خالد",      country: "KSA", seats: "8/15",   start: "2026-01-01", end: "2026-12-31", status: "active"   },
];

export const kpiStats = {
  seatsUsed:        36,
  seatsTotal:       50,
  completedAssess:  24,
  totalMembers:     members.length,
  avgScore:         Math.round(members.filter(m => m.score > 0).reduce((a, m) => a + m.score, 0) / members.filter(m => m.score > 0).length),
  lessonsCompleted: 148,
};

export const gapAnalysis = [
  { domain: "تقنيات الرعاية الصحية الرقمية",       severity: "high",   affectedCount: 14 },
  { domain: "الأمن والخصوصية (PDPL)",              severity: "high",   affectedCount: 11 },
  { domain: "التشغيل البيني والمعايير (FHIR)",     severity: "medium", affectedCount: 9  },
  { domain: "إدارة التغيير والمشاريع",              severity: "low",    affectedCount: 4  },
];
