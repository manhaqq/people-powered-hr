// Mock data shared across HR app modules
export type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "On Leave" | "Probation";
  joined: string;
  avatar: string;
};

export const employees: Employee[] = [
  { id: "E-001", name: "Amelia Chen", email: "amelia.chen@northwind.co", role: "Product Designer", department: "Design", status: "Active", joined: "2022-03-14", avatar: "AC" },
  { id: "E-002", name: "Marcus Patel", email: "marcus.patel@northwind.co", role: "Engineering Manager", department: "Engineering", status: "Active", joined: "2020-08-02", avatar: "MP" },
  { id: "E-003", name: "Sofia Alvarez", email: "sofia.alvarez@northwind.co", role: "People Partner", department: "People Ops", status: "Active", joined: "2021-11-19", avatar: "SA" },
  { id: "E-004", name: "Daniel Okafor", email: "daniel.okafor@northwind.co", role: "Backend Engineer", department: "Engineering", status: "On Leave", joined: "2023-01-09", avatar: "DO" },
  { id: "E-005", name: "Priya Sharma", email: "priya.sharma@northwind.co", role: "Talent Lead", department: "People Ops", status: "Active", joined: "2019-06-21", avatar: "PS" },
  { id: "E-006", name: "Jakob Lindqvist", email: "jakob.l@northwind.co", role: "Finance Analyst", department: "Finance", status: "Active", joined: "2024-02-05", avatar: "JL" },
  { id: "E-007", name: "Hana Tanaka", email: "hana.tanaka@northwind.co", role: "QA Engineer", department: "Engineering", status: "Probation", joined: "2026-04-12", avatar: "HT" },
  { id: "E-008", name: "Lucas Romano", email: "lucas.romano@northwind.co", role: "Marketing Manager", department: "Marketing", status: "Active", joined: "2022-09-30", avatar: "LR" },
  { id: "E-009", name: "Naomi Brooks", email: "naomi.brooks@northwind.co", role: "Customer Success", department: "Support", status: "Active", joined: "2023-07-17", avatar: "NB" },
  { id: "E-010", name: "Ravi Kapoor", email: "ravi.kapoor@northwind.co", role: "Data Engineer", department: "Engineering", status: "Active", joined: "2021-04-04", avatar: "RK" },
];

export const attendance = [
  { id: "E-001", name: "Amelia Chen", clockIn: "08:54", clockOut: "17:32", hours: 8.6, status: "Present" },
  { id: "E-002", name: "Marcus Patel", clockIn: "09:02", clockOut: "18:10", hours: 9.1, status: "Present" },
  { id: "E-003", name: "Sofia Alvarez", clockIn: "08:47", clockOut: "17:05", hours: 8.3, status: "Present" },
  { id: "E-004", name: "Daniel Okafor", clockIn: "—", clockOut: "—", hours: 0, status: "On Leave" },
  { id: "E-005", name: "Priya Sharma", clockIn: "09:21", clockOut: "17:48", hours: 8.4, status: "Late" },
  { id: "E-006", name: "Jakob Lindqvist", clockIn: "08:30", clockOut: "16:50", hours: 8.3, status: "Present" },
  { id: "E-007", name: "Hana Tanaka", clockIn: "09:00", clockOut: "17:30", hours: 8.5, status: "Present" },
  { id: "E-008", name: "Lucas Romano", clockIn: "10:12", clockOut: "18:40", hours: 8.5, status: "Late" },
];

export type LeaveRequest = {
  id: string;
  employee: string;
  type: "Annual" | "Sick" | "Parental" | "Unpaid";
  from: string;
  to: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected";
};

export const leaveRequests: LeaveRequest[] = [
  { id: "LR-1042", employee: "Amelia Chen", type: "Annual", from: "2026-07-08", to: "2026-07-15", days: 6, status: "Pending" },
  { id: "LR-1041", employee: "Marcus Patel", type: "Sick", from: "2026-06-25", to: "2026-06-26", days: 2, status: "Approved" },
  { id: "LR-1040", employee: "Hana Tanaka", type: "Annual", from: "2026-08-01", to: "2026-08-05", days: 5, status: "Pending" },
  { id: "LR-1039", employee: "Lucas Romano", type: "Parental", from: "2026-07-20", to: "2026-09-20", days: 45, status: "Pending" },
  { id: "LR-1038", employee: "Naomi Brooks", type: "Unpaid", from: "2026-06-30", to: "2026-07-02", days: 3, status: "Rejected" },
  { id: "LR-1037", employee: "Ravi Kapoor", type: "Annual", from: "2026-07-14", to: "2026-07-18", days: 5, status: "Approved" },
];

export const payroll = [
  { id: "E-001", name: "Amelia Chen", role: "Product Designer", gross: 7200, deductions: 1180, net: 6020 },
  { id: "E-002", name: "Marcus Patel", role: "Engineering Manager", gross: 11500, deductions: 2240, net: 9260 },
  { id: "E-003", name: "Sofia Alvarez", role: "People Partner", gross: 6400, deductions: 980, net: 5420 },
  { id: "E-005", name: "Priya Sharma", role: "Talent Lead", gross: 7800, deductions: 1320, net: 6480 },
  { id: "E-006", name: "Jakob Lindqvist", role: "Finance Analyst", gross: 5800, deductions: 870, net: 4930 },
  { id: "E-008", name: "Lucas Romano", role: "Marketing Manager", gross: 8400, deductions: 1490, net: 6910 },
  { id: "E-010", name: "Ravi Kapoor", role: "Data Engineer", gross: 9200, deductions: 1680, net: 7520 },
];

export const candidates = [
  { id: "C-201", name: "Elena Rivera", role: "Senior Frontend Engineer", stage: "Interview", applied: "2026-06-12", source: "Referral" },
  { id: "C-202", name: "Thomas Becker", role: "Product Manager", stage: "Screening", applied: "2026-06-18", source: "LinkedIn" },
  { id: "C-203", name: "Yuki Sato", role: "UX Researcher", stage: "Offer", applied: "2026-05-30", source: "Careers Page" },
  { id: "C-204", name: "Adaeze Nwosu", role: "Senior Frontend Engineer", stage: "Interview", applied: "2026-06-15", source: "LinkedIn" },
  { id: "C-205", name: "Olivier Martin", role: "DevOps Engineer", stage: "Screening", applied: "2026-06-20", source: "Referral" },
  { id: "C-206", name: "Chen Wei", role: "Data Scientist", stage: "Applied", applied: "2026-06-24", source: "Careers Page" },
];

export const workforceTrend = [
  { month: "Jan", headcount: 118 },
  { month: "Feb", headcount: 122 },
  { month: "Mar", headcount: 127 },
  { month: "Apr", headcount: 131 },
  { month: "May", headcount: 136 },
  { month: "Jun", headcount: 142 },
];

export const departments = [
  { name: "Engineering", count: 48 },
  { name: "Design", count: 14 },
  { name: "People Ops", count: 9 },
  { name: "Finance", count: 11 },
  { name: "Marketing", count: 18 },
  { name: "Support", count: 22 },
  { name: "Sales", count: 20 },
];

export type NewsItem = {
  id: string;
  title: string;
  category: "Company" | "Policy" | "People" | "Events" | "Celebrations";
  date: string;
  author: string;
  content: string;
  pinned: boolean;
  likes: number;
  comments: number;
};

export const newsItems: NewsItem[] = [
  {
    id: "N-1001",
    title: "Quarterly town hall moved to July 8",
    category: "Company",
    date: "2026-06-26",
    author: "Sofia Alvarez",
    content: "The all-hands Q2 town hall will now take place on Wednesday, July 8 at 10:00 AM in the main auditorium. Leadership will share updates on performance, product roadmap, and upcoming hiring priorities. A recording will be shared for remote team members.",
    pinned: true,
    likes: 34,
    comments: 5,
  },
  {
    id: "N-1002",
    title: "New remote-work policy effective July 1",
    category: "Policy",
    date: "2026-06-25",
    author: "People Ops",
    content: "Starting next quarter, the hybrid schedule shifts to a minimum of two in-office days per week. Managers will confirm team anchor days by the end of the week. Please review the full policy in the handbook before your next 1:1.",
    pinned: true,
    likes: 28,
    comments: 12,
  },
  {
    id: "N-1003",
    title: "Welcome our summer interns",
    category: "People",
    date: "2026-06-24",
    author: "Priya Sharma",
    content: "Five talented interns join Engineering, Design, and Marketing this week. Make sure to say hello when you see them around the floor and help them get settled into their first project.",
    pinned: false,
    likes: 56,
    comments: 3,
  },
  {
    id: "N-1004",
    title: "Engineering offsite in Lisbon — save the date",
    category: "Events",
    date: "2026-06-22",
    author: "Marcus Patel",
    content: "The annual Engineering team offsite is confirmed for September 14–16 in Lisbon. Flights and accommodation will be arranged by the team leads. A detailed agenda will be shared in August.",
    pinned: false,
    likes: 42,
    comments: 8,
  },
  {
    id: "N-1005",
    title: "Congratulations to Daniel on 5 years",
    category: "Celebrations",
    date: "2026-06-20",
    author: "Sofia Alvarez",
    content: "Daniel Okafor celebrates five years with Northwind today. Thank you for your steady leadership, late-night deployments, and for always being the first to help a teammate debug. Cake is waiting in the kitchen at 4 PM.",
    pinned: false,
    likes: 89,
    comments: 14,
  },
  {
    id: "N-1006",
    title: "IT maintenance window this Saturday",
    category: "Company",
    date: "2026-06-19",
    author: "IT Support",
    content: "There will be a planned maintenance window on Saturday, June 28 from 6:00 AM to 8:00 AM UTC. Internal systems may be briefly unavailable. Please save any critical work before the window.",
    pinned: false,
    likes: 12,
    comments: 2,
  },
  {
    id: "N-1007",
    title: "Updated expense guidelines for travel",
    category: "Policy",
    date: "2026-06-18",
    author: "Finance Team",
    content: "The travel expense limits have been refreshed for the new fiscal year. Economy flights for trips under 6 hours, £120/day meals, and receipts required for all transactions over £25. The new form is in the finance portal.",
    pinned: false,
    likes: 19,
    comments: 4,
  },
  {
    id: "N-1008",
    title: "Design team wins industry award",
    category: "Celebrations",
    date: "2026-06-15",
    author: "Lucas Romano",
    content: "Our design team was recognized with a Product Design Award for the new customer onboarding experience. A huge thank you to Amelia, the UX researchers, and everyone who contributed feedback.",
    pinned: false,
    likes: 73,
    comments: 9,
  },
];
