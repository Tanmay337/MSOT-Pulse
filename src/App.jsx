import React, { useState, useMemo, useEffect } from "react";

// ============================================================================
// 1. AUTHENTICATION ACCOUNTS (PASSWORD PROTECTED)
// ============================================================================
const ACCOUNTS = [
  {
    id: "USR-ADMIN",
    loginId: "admin@msot.org",
    password: "password123",
    name: "Dr. A. K. Singh",
    role: "Admin / Program Manager",
    campus: "ALL",
  },
  {
    id: "USR-CM-JUJ",
    loginId: "cm.juj@msot.org",
    password: "password123",
    name: "Rajeshwari Rathore",
    role: "Campus Manager",
    campus: "JUJ",
  },
  {
    id: "USR-FAC-1",
    loginId: "r.sharma@msot.org",
    password: "password123",
    name: "Prof. R. Sharma",
    role: "Faculty",
    campus: "JUJ",
  },
  {
    id: "USR-FAC-2",
    loginId: "v.aditya@msot.org",
    password: "password123",
    name: "Vikram Aditya (Visiting Fellow)",
    role: "Faculty",
    campus: "JUJ",
  },
  {
    id: "USR-FAC-3",
    loginId: "a.kulkarni@msot.org",
    password: "password123",
    name: "Prof. A. Kulkarni",
    role: "Faculty",
    campus: "HI-Tech",
  },
  {
    id: "USR-STU-1",
    loginId: "MSOT-2026-042",
    password: "2026",
    name: "Tanmay Gupta",
    role: "Student",
    campus: "JUJ",
    batch: "CSE-2026-A",
  },
];

const INITIAL_HOLIDAYS = [
  { date: "2026-10-20", name: "Dussehra Break" },
  { date: "2026-11-09", name: "Diwali Holiday" },
];

const INITIAL_SUBJECTS = [
  {
    id: "SUB-101",
    code: "CS-301",
    name: "Database Management Systems (DBMS)",
    campus: "JUJ",
    track: "Mirai Track",
    batch: "CSE-2026-A",
    faculty: "Prof. R. Sharma",
    isVisiting: false,
    hourlyRate: 0,
    plannedMonthlyLectures: { "2026-10": 14, "2026-11": 14 },
    takenMonthlyLectures: { "2026-10": 7, "2026-11": 0 },
    honorariumStatus: "N/A",
    targetFinishDate: "2026-11-25",
    timetableSlots: [
      { day: 1, dayName: "Mon", start: "09:00", end: "11:00", room: "Lab-201" },
      { day: 3, dayName: "Wed", start: "11:00", end: "12:30", room: "LH-104" },
      { day: 5, dayName: "Fri", start: "14:00", end: "16:00", room: "Lab-201" },
      { day: 6, dayName: "Sat", start: "10:00", end: "12:00", room: "Seminar-1" },
    ],
    weeklyScheduleHours: { 1: 2.0, 3: 1.5, 5: 2.0, 6: 2.0 },
    topics: [
      { id: "T1", unit: "Unit 1", title: "ER Modelling & Relational Algebra", plannedHours: 4.0, status: "Completed", pctComplete: 100, examScope: "Sessionals", coveredNotes: "ER diagrams & keys done", leftoverNotes: "None", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-05" },
      { id: "T2", unit: "Unit 1", title: "SQL Joins, Subqueries & Aggregations", plannedHours: 4.5, status: "Completed", pctComplete: 100, examScope: "Mid-Term", coveredNotes: "Live PostgreSQL lab", leftoverNotes: "None", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Reviewed", loggedAt: "2026-10-09" },
      { id: "T3", unit: "Unit 2", title: "Normalization (1NF, 2NF, 3NF, BCNF)", plannedHours: 5.0, status: "In Progress", pctComplete: 60, examScope: "Mid-Term", coveredNotes: "Up to 3NF covered", leftoverNotes: "BCNF decomposition proofs", carryForwardTo: "T4", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-14" },
      { id: "T4", unit: "Unit 2", title: "B+ Tree Indexing & File Organization", plannedHours: 6.0, status: "Pending", pctComplete: 0, examScope: "PUT", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
      { id: "T5", unit: "Unit 3", title: "ACID Transactions, Locks & Deadlocks", plannedHours: 6.5, status: "Pending", pctComplete: 0, examScope: "End-Term", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
      { id: "T6", unit: "Unit 3", title: "Legacy Hierarchical DBs (Outdated)", plannedHours: 2.0, status: "Skipped", pctComplete: 0, examScope: "End-Term", coveredNotes: "Skipped per syllabus board", leftoverNotes: "", carryForwardTo: "", cwStatus: "N/A", hwStatus: "N/A", loggedAt: "2026-10-12" },
    ],
  },
  {
    id: "SUB-102",
    code: "CS-304",
    name: "Full-Stack React & System Architecture",
    campus: "JUJ",
    track: "Mirai Track",
    batch: "CSE-2026-A",
    faculty: "Vikram Aditya (Visiting Fellow)",
    isVisiting: true,
    hourlyRate: 1500,
    plannedMonthlyLectures: { "2026-10": 12, "2026-11": 10 },
    takenMonthlyLectures: { "2026-10": 6, "2026-11": 0 },
    honorariumStatus: "Approved by CM",
    targetFinishDate: "2026-11-12",
    timetableSlots: [
      { day: 2, dayName: "Tue", start: "10:00", end: "12:00", room: "Mirai-Lab-1" },
      { day: 4, dayName: "Thu", start: "14:00", end: "16:00", room: "Mirai-Lab-1" },
      { day: 6, dayName: "Sat", start: "14:00", end: "16:00", room: "Mirai-Lab-1" },
    ],
    weeklyScheduleHours: { 2: 2.0, 4: 2.0, 6: 2.0 },
    topics: [
      { id: "T201", unit: "Unit 1", title: "React Reconciliation, Hooks & State", plannedHours: 5.0, status: "Completed", pctComplete: 100, examScope: "Sessionals", coveredNotes: "Built custom hooks", leftoverNotes: "None", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-06" },
      { id: "T202", unit: "Unit 2", title: "Server-Side Rendering & Edge Caching", plannedHours: 6.0, status: "In Progress", pctComplete: 40, examScope: "Mid-Term", coveredNotes: "Project setup took extra time", leftoverNotes: "Hydration & streaming SSR", carryForwardTo: "T203", cwStatus: "In Progress", hwStatus: "None", loggedAt: "2026-10-13" },
      { id: "T203", unit: "Unit 3", title: "WebSockets, Redis Pub/Sub & Scaling", plannedHours: 8.0, status: "Pending", pctComplete: 0, examScope: "PUT", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
      { id: "T204", unit: "Unit 4", title: "Docker, CI/CD & Production Telemetry", plannedHours: 7.5, status: "Pending", pctComplete: 0, examScope: "End-Term", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
    ],
  },
  {
    id: "SUB-103",
    code: "UNI-209",
    name: "Discrete Mathematics & Graph Theory",
    campus: "JUJ",
    track: "University Track",
    batch: "CSE-2026-A",
    faculty: "Dr. N. Verma",
    isVisiting: false,
    hourlyRate: 0,
    plannedMonthlyLectures: { "2026-10": 16, "2026-11": 16 },
    takenMonthlyLectures: { "2026-10": 9, "2026-11": 0 },
    honorariumStatus: "N/A",
    targetFinishDate: "2026-11-28",
    timetableSlots: [
      { day: 1, dayName: "Mon", start: "11:00", end: "12:30", room: "LH-102" },
      { day: 2, dayName: "Tue", start: "14:00", end: "15:30", room: "LH-102" },
      { day: 4, dayName: "Thu", start: "11:00", end: "12:30", room: "LH-102" },
      { day: 5, dayName: "Fri", start: "09:00", end: "10:30", room: "LH-102" },
    ],
    weeklyScheduleHours: { 1: 1.5, 2: 1.5, 4: 1.5, 5: 1.5 },
    topics: [
      { id: "T301", unit: "Unit 1", title: "Propositional Logic & Proof Techniques", plannedHours: 6.0, status: "Completed", pctComplete: 100, examScope: "Sessionals", coveredNotes: "Completed ahead of schedule", leftoverNotes: "None", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Reviewed", loggedAt: "2026-10-04" },
      { id: "T302", unit: "Unit 2", title: "Combinatorics & Recurrence Relations", plannedHours: 5.5, status: "Completed", pctComplete: 100, examScope: "Mid-Term", coveredNotes: "Master theorem solved", leftoverNotes: "None", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-11" },
      { id: "T303", unit: "Unit 3", title: "Trees, Connectivity & Hamiltonian Paths", plannedHours: 5.0, status: "In Progress", pctComplete: 50, examScope: "PUT", coveredNotes: "Euler paths covered", leftoverNotes: "Hamiltonian cycles", carryForwardTo: "T304", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-14" },
      { id: "T304", unit: "Unit 4", title: "Group Theory & Rings", plannedHours: 5.0, status: "Pending", pctComplete: 0, examScope: "End-Term", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
    ],
  },
  {
    id: "SUB-104",
    code: "CS-308",
    name: "Operating Systems & Kernel Internals",
    campus: "HI-Tech",
    track: "Mirai Track",
    batch: "CSE-2026-B",
    faculty: "Prof. A. Kulkarni",
    isVisiting: true,
    hourlyRate: 1200,
    plannedMonthlyLectures: { "2026-10": 12, "2026-11": 12 },
    takenMonthlyLectures: { "2026-10": 7, "2026-11": 0 },
    honorariumStatus: "Pending Verification",
    targetFinishDate: "2026-11-20",
    timetableSlots: [
      { day: 1, dayName: "Mon", start: "14:00", end: "16:00", room: "HT-Lab-3" },
      { day: 3, dayName: "Wed", start: "14:00", end: "16:00", room: "HT-Lab-3" },
      { day: 5, dayName: "Fri", start: "11:00", end: "13:00", room: "HT-LH-2" },
    ],
    weeklyScheduleHours: { 1: 2.0, 3: 2.0, 5: 2.0 },
    topics: [
      { id: "T401", unit: "Unit 1", title: "Process Scheduling & Context Switching", plannedHours: 5.0, status: "Completed", pctComplete: 100, examScope: "Sessionals", coveredNotes: "All algorithms covered", leftoverNotes: "None", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Reviewed", loggedAt: "2026-10-07" },
      { id: "T402", unit: "Unit 2", title: "Deadlocks, Semaphores & Mutexes", plannedHours: 6.0, status: "In Progress", pctComplete: 50, examScope: "Mid-Term", coveredNotes: "Mutexes covered", leftoverNotes: "Banker's safety algorithm", carryForwardTo: "T403", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-13" },
      { id: "T403", unit: "Unit 3", title: "Virtual Memory, Paging & Thrashing", plannedHours: 7.0, status: "Pending", pctComplete: 0, examScope: "End-Term", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
    ],
  },
  {
    id: "SUB-105",
    code: "CS-319",
    name: "Cloud Native DevOps & Kubernetes",
    campus: "JUJ",
    track: "Mirai Track",
    batch: "CSE-2026-J",
    faculty: "Rohan Menon (Visiting Architect)",
    isVisiting: true,
    hourlyRate: 1800,
    plannedMonthlyLectures: { "2026-10": 10, "2026-11": 10 },
    takenMonthlyLectures: { "2026-10": 5, "2026-11": 0 },
    honorariumStatus: "Approved by CM",
    targetFinishDate: "2026-11-22",
    timetableSlots: [
      { day: 2, dayName: "Tue", start: "11:00", end: "13:00", room: "RT-Lab-1" },
      { day: 5, dayName: "Fri", start: "15:00", end: "17:00", room: "RT-Lab-1" },
    ],
    weeklyScheduleHours: { 2: 2.0, 5: 2.0 },
    topics: [
      { id: "T501", unit: "Unit 1", title: "Container Internals, namespaces & cgroups", plannedHours: 6.0, status: "Completed", pctComplete: 100, examScope: "Sessionals", coveredNotes: "Built container from scratch", leftoverNotes: "None", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Reviewed", loggedAt: "2026-10-08" },
      { id: "T502", unit: "Unit 2", title: "Kubernetes Pods, Services & Ingress", plannedHours: 6.0, status: "In Progress", pctComplete: 50, examScope: "Mid-Term", coveredNotes: "Pods & Deployments done", leftoverNotes: "Ingress controller lab", carryForwardTo: "T503", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-14" },
      { id: "T503", unit: "Unit 3", title: "Helm, ArgoCD & GitOps Pipelines", plannedHours: 6.0, status: "Pending", pctComplete: 0, examScope: "End-Term", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
    ],
  },
];

const INITIAL_EXAMS = [
  { id: "EX-0", name: "Sessional Exam 1", date: "2026-10-19", scopeKey: "Sessionals" },
  { id: "EX-1", name: "Mid-Term Exam", date: "2026-10-28", scopeKey: "Mid-Term" },
  { id: "EX-2", name: "Pre-University Test (PUT)", date: "2026-11-16", scopeKey: "PUT" },
  { id: "EX-3", name: "End-Term Exam", date: "2026-11-30", scopeKey: "End-Term" },
];

const DAY_NAMES = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" };

function isWorkingSaturday(dateObj, saturdayRule) {
  if (dateObj.getDay() !== 6) return true;
  if (saturdayRule === "all") return true;
  if (saturdayRule === "none") return false;
  const weekOfMonth = Math.ceil(dateObj.getDate() / 7);
  return weekOfMonth !== 2 && weekOfMonth !== 4;
}

function toISODate(d) {
  return d.toISOString().split("T")[0];
}

function computeSlotHours(startStr, endStr) {
  const [sh, sm] = startStr.split(":").map(Number);
  const [eh, em] = endStr.split(":").map(Number);
  const diffMinutes = eh * 60 + em - (sh * 60 + sm);
  return Math.max(0, Number((diffMinutes / 60).toFixed(2)));
}

export default function App() {
  // ============================================================================
  // FIX 1 & 4: LOGIN PAGE SHOWN BY DEFAULT + PASSWORD-PROTECTED PROFILE SWITCHING
  // ============================================================================
  const [currentUser, setCurrentUser] = useState(null); // Starts at Login Screen!
  const [loginMode, setLoginMode] = useState("staff"); // staff | student
  const [loginInputId, setLoginInputId] = useState("admin@msot.org");
  const [loginInputPass, setLoginInputPass] = useState("");
  const [loginCampus, setLoginCampus] = useState("JUJ");
  const [loginError, setLoginError] = useState("");

  // Password-Protected Profile Switch Modal State
  const [switchModalOpen, setSwitchModalOpen] = useState(false);
  const [targetAccountLoginId, setTargetAccountLoginId] = useState("r.sharma@msot.org");
  const [switchPasswordInput, setSwitchPasswordInput] = useState("");
  const [switchError, setSwitchError] = useState("");

  // FIX 3: SLIM BURGER MENU STATE (w-56 compact drawer, closed by default)
  const [burgerOpen, setBurgerOpen] = useState(false);

  // Navigation & Filters
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | logger | honorarium | timetable | calendar | exams | alerts
  const [selectedCampus, setSelectedCampus] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [saturdayRule, setSaturdayRule] = useState("2nd & 4th");
  const [thresholds] = useState({ onTrack: 1.15, tight: 1.0 });
  const [semesterStart, setSemesterStart] = useState("2026-10-01");
  const [semesterEnd, setSemesterEnd] = useState("2026-12-15");
  const [todayDate, setTodayDate] = useState("2026-10-15");
  const [holidays, setHolidays] = useState(INITIAL_HOLIDAYS);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [examWindows] = useState(INITIAL_EXAMS);
  const [remedialBonusHours, setRemedialBonusHours] = useState(0);

  // Visiting Faculty Honorarium Month State (Fix 2)
  const [selectedHonorariumMonth, setSelectedHonorariumMonth] = useState("2026-10");
  const [tdsRate, setTdsRate] = useState(10);
  const [theme, setTheme] = useState(() => localStorage.getItem("msot-pulse-theme") || "dark");

  // Faculty 60s Logger State
  const [selectedSubjectId, setSelectedSubjectId] = useState("SUB-101");
  const [selectedTopicId, setSelectedTopicId] = useState("T3");
  const [logStatus, setLogStatus] = useState("In Progress");
  const [logPct, setLogPct] = useState(80);
  const [logCovered, setLogCovered] = useState("Completed BCNF examples & decomposition proofs");
  const [logLeftover, setLogLeftover] = useState("4NF & 5NF edge cases");
  const [logCarryForward, setLogCarryForward] = useState("T4");
  const [logCw, setLogCw] = useState("Completed");
  const [logHw, setLogHw] = useState("Assigned");
  const [whatsappInput, setWhatsappInput] = useState("");
  const [stopwatchSec, setStopwatchSec] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(true);

  // Timetable & Syllabus Builder State
  const [newHolidayDate, setNewHolidayDate] = useState("2026-10-23");
  const [newHolidayName, setNewHolidayName] = useState("Founder's Day Guest Lecture");
  const [ttSubjectId, setTtSubjectId] = useState("SUB-101");
  const [ttDay, setTtDay] = useState(2);
  const [ttStart, setTtStart] = useState("10:00");
  const [ttEnd, setTtEnd] = useState("11:50");
  const [ttRoom, setTtRoom] = useState("LH-202");
  const [newTopicUnit, setNewTopicUnit] = useState("Unit 4");
  const [newTopicTitle, setNewTopicTitle] = useState("Distributed Consensus & Raft");
  const [newTopicHours, setNewTopicHours] = useState(4.0);
  const [newTopicScope, setNewTopicScope] = useState("End-Term");

  // 7-Day / 14-Day Timetable View & Faculty Edit State
  const [timetableSpanDays, setTimetableSpanDays] = useState(14); // 7 or 14 days
  const [editingSlot, setEditingSlot] = useState(null); // { subId, idx, start, end, room }

  const [auditModalSubject, setAuditModalSubject] = useState(null);
  const [auditTrail, setAuditTrail] = useState([
    { id: 1, time: "2026-10-15 09:10", actor: "System Cron", action: "48h Escalation sent to Campus Manager for unlogged CS-309 session" },
    { id: 2, time: "2026-10-14 16:42", actor: "Prof. R. Sharma", action: "Logged CS-301 T3 (In Progress, 60% complete, BCNF carried forward to T4) in 19s" },
    { id: 3, time: "2026-10-13 17:05", actor: "Vikram Aditya (Visiting Fellow)", action: "Logged CS-304 T202 (In Progress, 40% complete) in 22s" },
  ]);

  const role = currentUser?.role || "Student";
  const activeFacultyUser = currentUser?.name || "";
  const canEditTimetable = role === "Faculty"; // Only Faculty can add/edit/delete slots

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("msot-pulse-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));
  useEffect(() => {
    if (!currentUser || activeTab !== "logger" || !stopwatchRunning) return;
    const timer = setInterval(() => {
      setStopwatchSec((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentUser, activeTab, stopwatchRunning]);

  // ============================================================================
  // LOGIN & PASSWORD-PROTECTED PROFILE SWITCH HANDLERS
  // ============================================================================
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    const matchedAccount = ACCOUNTS.find(
      (acc) =>
        acc.loginId.toLowerCase() === loginInputId.trim().toLowerCase() &&
        acc.password === loginInputPass
    );

    if (!matchedAccount) {
      setLoginError("Invalid Login ID or password.");
      return;
    }

    // Enforce that the user belongs to the selected campus (unless global Admin with "ALL")
    if (matchedAccount.campus !== "ALL" && matchedAccount.campus !== loginCampus) {
      setLoginError(
        `Access Denied: Your account is registered to ${matchedAccount.campus}, not ${loginCampus}.`
      );
      return;
    }

    // Lock the dashboard to the authenticated campus
    const targetCampus =
      matchedAccount.campus === "ALL" ? loginCampus : matchedAccount.campus;

    setCurrentUser(matchedAccount);
    setSelectedCampus(targetCampus);

    if (matchedAccount.role === "Student") setActiveTab("exams");
    else if (matchedAccount.role === "Faculty") {
      setActiveTab("logger");
      const ownSub = subjects.find((s) => s.faculty === matchedAccount.name);
      if (ownSub) {
        setSelectedSubjectId(ownSub.id);
        if (ownSub.topics[0]) setSelectedTopicId(ownSub.topics[0].id);
      }
      setStopwatchSec(0);
      setStopwatchRunning(true);
    } else {
      setActiveTab("dashboard");
    }
    setAuditTrail((prev) => [
      { id: Date.now(), time: "Just now", actor: matchedAccount.name, action: `Authenticated via Login Gate as ${matchedAccount.role} (${matchedAccount.loginId}) for campus ${targetCampus}` },
      ...prev,
    ]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginInputId("");
    setLoginInputPass("");
    setLoginError("");
    setBurgerOpen(false);
  };

  const handleVerifiedProfileSwitch = (e) => {
    e.preventDefault();
    const target = ACCOUNTS.find((a) => a.loginId === targetAccountLoginId);
    if (!target || target.password !== switchPasswordInput) {
      setSwitchError("Incorrect password for selected profile! Profile switch denied.");
      setAuditTrail((prev) => [
        { id: Date.now(), time: "Just now", actor: currentUser?.name || "Unknown", action: `FAILED password verification attempt to switch to ${targetAccountLoginId}` },
        ...prev,
      ]);
      return;
    }
    setSwitchError("");
    setSwitchPasswordInput("");
    setSwitchModalOpen(false);
    setBurgerOpen(false);
    setCurrentUser(target);
    setSelectedCampus(target.campus || "ALL");
    if (target.role === "Student") setActiveTab("exams");
    else if (target.role === "Faculty") {
      setActiveTab("logger");
      const ownSub = subjects.find((s) => s.faculty === target.name);
      if (ownSub) {
        setSelectedSubjectId(ownSub.id);
        if (ownSub.topics[0]) setSelectedTopicId(ownSub.topics[0].id);
      }
      setStopwatchSec(0);
      setStopwatchRunning(true);
    } else {
      setActiveTab("dashboard");
    }
    setAuditTrail((prev) => [
      { id: Date.now(), time: "Just now", actor: target.name, action: `Switched profile with verified password to ${target.role}` },
      ...prev,
    ]);
  };

  // ============================================================================
  // DETERMINISTIC CALENDAR-WALKING & 2-DECIMAL MATHEMATICAL ENGINE
  // ============================================================================
  const computedSubjects = useMemo(() => {
    const holidaySet = new Set(holidays.map((h) => h.date));

    return subjects.map((sub) => {
      const activeTopics = sub.topics.filter((t) => t.status !== "Skipped");
      const hoursInScope = activeTopics.reduce((acc, t) => acc + t.plannedHours, 0);

      const coveredHours = activeTopics.reduce((acc, t) => {
        if (t.status === "Completed" || t.status === "Merged") return acc + t.plannedHours;
        if (t.status === "In Progress") return acc + t.plannedHours * (t.pctComplete / 100);
        return acc;
      }, 0);

      const coveragePct = hoursInScope > 0 ? (coveredHours / hoursInScope) * 100 : 0;
      const remainingHours = Math.max(0, hoursInScope - coveredHours);

      let cursorDate = new Date(semesterStart + "T00:00:00");
      let shouldBeCoveredByToday = 0;
      const dailyCapacityList = [];
      const endWalkDate = new Date(semesterEnd + "T00:00:00");

      while (cursorDate <= endWalkDate) {
        const iso = toISODate(cursorDate);
        const dayOfWeek = cursorDate.getDay();
        const isHoliday = holidaySet.has(iso);
        const isSatValid = isWorkingSaturday(cursorDate, saturdayRule);
        const hrs = !isHoliday && isSatValid && dayOfWeek !== 0 ? (sub.weeklyScheduleHours[dayOfWeek] || 0) : 0;

        if (hrs > 0) {
          dailyCapacityList.push({ date: iso, hours: hrs });
          if (iso <= todayDate) {
            shouldBeCoveredByToday += hrs;
          }
        }
        cursorDate.setDate(cursorDate.getDate() + 1);
      }

      shouldBeCoveredByToday = Math.min(hoursInScope, shouldBeCoveredByToday);

      let cumulativeTopicHours = 0;
      const topicsWithDates = sub.topics.map((topic) => {
        if (topic.status === "Skipped") {
          return { ...topic, plannedDate: "Skipped", isOverdue: false };
        }
        cumulativeTopicHours += topic.plannedHours;
        let running = 0;
        let assignedDate = "Beyond Calendar";
        for (const daySlot of dailyCapacityList) {
          running += daySlot.hours;
          if (running >= cumulativeTopicHours) {
            assignedDate = daySlot.date;
            break;
          }
        }
        const isOverdue =
          assignedDate !== "Beyond Calendar" &&
          assignedDate < todayDate &&
          topic.status !== "Completed" &&
          topic.status !== "Merged";

        return { ...topic, plannedDate: assignedDate, isOverdue };
      });

      let availableHours = remedialBonusHours;
      let availCursor = new Date(todayDate + "T00:00:00");
      availCursor.setDate(availCursor.getDate() + 1);
      const finishDateObj = new Date(sub.targetFinishDate + "T00:00:00");

      while (availCursor <= finishDateObj) {
        const iso = toISODate(availCursor);
        const dayOfWeek = availCursor.getDay();
        const isHoliday = holidaySet.has(iso);
        const isSatValid = isWorkingSaturday(availCursor, saturdayRule);
        if (!isHoliday && isSatValid && dayOfWeek !== 0) {
          availableHours += sub.weeklyScheduleHours[dayOfWeek] || 0;
        }
        availCursor.setDate(availCursor.getDate() + 1);
      }

      const bufferRatio = remainingHours === 0 ? 9.99 : availableHours / remainingHours;
      let status = "ON TRACK";
      if (remainingHours === 0) status = "COMPLETE";
      else if (bufferRatio < thresholds.tight) status = "DANGER";
      else if (bufferRatio < thresholds.onTrack) status = "TIGHT";

      const paceVsPlan = coveredHours - shouldBeCoveredByToday;
      const overdueCount = topicsWithDates.filter((t) => t.isOverdue).length;

      return {
        ...sub,
        topics: topicsWithDates,
        hoursInScope,
        coveredHours,
        coveragePct,
        remainingHours,
        availableHours,
        bufferRatio,
        shouldBeCoveredByToday,
        paceVsPlan,
        status,
        overdueCount,
      };
    });
  }, [subjects, holidays, saturdayRule, semesterStart, semesterEnd, todayDate, remedialBonusHours, thresholds]);

  const visibleSubjects = useMemo(() => {
    return computedSubjects.filter((s) => {
      const matchesCampus = selectedCampus === "ALL" || s.campus === selectedCampus;
      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.faculty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCampus && matchesStatus && matchesSearch;
    });
  }, [computedSubjects, selectedCampus, statusFilter, searchQuery]);

  const getWorstTrackStatus = (trackName) => {
    const trackSubs = computedSubjects.filter(
      (s) => (selectedCampus === "ALL" || s.campus === selectedCampus) && s.track === trackName
    );
    if (trackSubs.length === 0) return { status: "N/A", worstSub: "None" };
    const priority = { DANGER: 4, TIGHT: 3, "ON TRACK": 2, COMPLETE: 1 };
    let worst = trackSubs[0];
    for (const s of trackSubs) {
      if (priority[s.status] > priority[worst.status]) {
        worst = s;
      }
    }
    return { status: worst.status, worstSub: `${worst.code} (${worst.bufferRatio.toFixed(2)})` };
  };

  // ============================================================================
  // ACTION HANDLERS (CSV, LOGGER, HONORARIUM EXPORT, TIMETABLE)
  // ============================================================================
  const handleLoadFullSemesterCSV = () => {
    const campuses = ["JUJ", "HI-Tech", "RGIB"];
    const generated = [...INITIAL_SUBJECTS];
    let counter = 200;
    campuses.forEach((campus) => {
      [
        { code: "CS-311", name: "Design & Analysis of Algorithms", track: "Mirai Track", fac: "Prof. K. Nair", pct: 85, vis: false, rate: 0 },
        { code: "CS-315", name: "Computer Networks & Distributed Systems", track: "Mirai Track", fac: "Prof. M. Baig (Visiting)", pct: 40, vis: true, rate: 1400 },
        { code: "UNI-212", name: "Probability & Statistical Inference", track: "University Track", fac: "Dr. S. Joshi", pct: 90, vis: false, rate: 0 },
        { code: "UNI-218", name: "Digital Logic & Microprocessors", track: "University Track", fac: "Dr. P. Rao", pct: 60, vis: false, rate: 0 },
        { code: "CS-320", name: "AI Agents & LLM Engineering", track: "Mirai Track", fac: "S. Deshmukh (Visiting)", pct: 55, vis: true, rate: 1600 },
        { code: "UNI-225", name: "Software Engineering & Testing", track: "University Track", fac: "Prof. T. Das", pct: 80, vis: false, rate: 0 },
      ].forEach((tpl) => {
        counter += 1;
        generated.push({
          id: `SUB-${counter}`,
          code: `${tpl.code}-${campus}`,
          name: tpl.name,
          campus,
          track: tpl.track,
          batch: `CSE-2026-${campus}`,
          faculty: tpl.fac,
          isVisiting: tpl.vis,
          hourlyRate: tpl.rate,
          plannedMonthlyLectures: { "2026-10": 12, "2026-11": 12 },
          takenMonthlyLectures: { "2026-10": 7, "2026-11": 0 },
          honorariumStatus: tpl.vis ? "Approved by CM" : "N/A",
          targetFinishDate: "2026-11-24",
          timetableSlots: [
            { day: 1, dayName: "Mon", start: "09:00", end: "11:00", room: `${campus}-101` },
            { day: 3, dayName: "Wed", start: "09:00", end: "11:00", room: `${campus}-101` },
            { day: 5, dayName: "Fri", start: "09:00", end: "11:00", room: `${campus}-101` },
          ],
          weeklyScheduleHours: { 1: 2.0, 3: 2.0, 5: 2.0 },
          topics: [
            { id: `T-${counter}-1`, unit: "Unit 1", title: `${tpl.name} Foundations`, plannedHours: 6.0, status: "Completed", pctComplete: 100, examScope: "Sessionals", coveredNotes: "Imported via CSV", leftoverNotes: "", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Reviewed", loggedAt: "2026-10-08" },
            { id: `T-${counter}-2`, unit: "Unit 2", title: `Core Architectures & Proofs`, plannedHours: 8.0, status: "In Progress", pctComplete: tpl.pct, examScope: "Mid-Term", coveredNotes: "Imported via CSV", leftoverNotes: "Case study", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-14" },
            { id: `T-${counter}-3`, unit: "Unit 3", title: `Advanced Scaling & Case Studies`, plannedHours: 8.0, status: "Pending", pctComplete: 0, examScope: "End-Term", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
          ],
        });
      });
    });
    setSubjects(generated);
    setBurgerOpen(false);
    setAuditTrail((prev) => [
      { id: Date.now(), time: "Just now", actor: currentUser.name, action: `Bulk imported ${generated.length} subjects across 4 campuses` },
      ...prev,
    ]);
  };

  const handleConfirmSessionLog = (e) => {
    e.preventDefault();
    const targetSub = subjects.find((s) => s.id === selectedSubjectId);

    if (role === "Faculty" && targetSub && targetSub.faculty !== activeFacultyUser) {
      setAuditTrail((prev) => [
        { id: Date.now(), time: "Just now", actor: activeFacultyUser, action: `BLOCKED (403 Forbidden): Attempted to log session for ${targetSub.code} owned by ${targetSub.faculty}` },
        ...prev,
      ]);
      alert(`403 Permission Guard: You are signed in as ${activeFacultyUser}. You cannot edit ${targetSub.faculty}'s subject (${targetSub.code})!`);
      return;
    }

    setStopwatchRunning(false);
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== selectedSubjectId) return sub;
        const monthKey = todayDate.slice(0, 7);
        const updatedTaken = { ...(sub.takenMonthlyLectures || {}) };
        if (logStatus === "Completed" || logStatus === "In Progress" || logStatus === "Merged") {
          updatedTaken[monthKey] = (updatedTaken[monthKey] || 0) + 1;
        }
        return {
          ...sub,
          takenMonthlyLectures: updatedTaken,
          topics: sub.topics.map((t) => {
            if (t.id !== selectedTopicId) return t;
            return {
              ...t,
              status: logStatus === "Cancelled" ? "In Progress" : logStatus,
              pctComplete: logStatus === "Completed" ? 100 : logStatus === "Skipped" ? 0 : Number(logPct),
              coveredNotes: logCovered,
              leftoverNotes: logLeftover,
              carryForwardTo: logCarryForward,
              cwStatus: logCw,
              hwStatus: logHw,
              loggedAt: todayDate,
            };
          }),
        };
      })
    );

    if (logStatus === "Cancelled") {
      setHolidays((prev) => [...prev, { date: todayDate, name: `Cancelled Class (${selectedSubjectId})` }]);
    }

    setAuditTrail((prev) => [
      { id: Date.now(), time: "Just now", actor: currentUser.name, action: `Logged ${selectedSubjectId} topic ${selectedTopicId} (${logStatus}, ${logPct}%) in ${stopwatchSec}s` },
      ...prev,
    ]);
    alert(`Session logged in ${stopwatchSec} seconds! Lecture count and dashboard figures updated.`);
  };

  // Dedicated Visiting Faculty Honorarium CSV Export (Fix 2)
  const exportHonorariumCSV = () => {
    const visitingList = computedSubjects.filter((s) => s.isVisiting);
    const headers = [
      "Month,Campus,SubjectCode,SubjectName,VisitingFaculty,PlannedLectures,TakenLectures,PlannedHours,DeliveredHours,HourlyRateINR,GrossHonorariumINR,TDS_Deducted_INR,NetPayableINR,ApprovalStatus",
    ];
    const rows = visitingList.map((vf) => {
      const plannedLec = vf.plannedMonthlyLectures?.[selectedHonorariumMonth] ?? 12;
      const takenLec = vf.takenMonthlyLectures?.[selectedHonorariumMonth] ?? 6;
      const gross = vf.coveredHours * vf.hourlyRate;
      const tds = gross * (tdsRate / 100);
      const net = gross - tds;
      return [
        selectedHonorariumMonth,
        vf.campus,
        vf.code,
        `"${vf.name}"`,
        `"${vf.faculty}"`,
        plannedLec,
        takenLec,
        vf.hoursInScope.toFixed(2),
        vf.coveredHours.toFixed(2),
        vf.hourlyRate,
        gross.toFixed(2),
        tds.toFixed(2),
        net.toFixed(2),
        vf.honorariumStatus || "Pending Verification",
      ].join(",");
    });
    const blob = new Blob([[...headers, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MSOT_Visiting_Faculty_Honorarium_${selectedHonorariumMonth}.csv`;
    a.click();
  };

  const exportToCSV = () => {
    const headers = [
      "Campus,Track,Code,Subject,Faculty,HoursInScope,CoveredHours,CoveragePct,RemainingHours,AvailableHours,BufferRatio,PaceVsPlan,Status",
    ];
    const rows = computedSubjects.map((s) =>
      [
        s.campus,
        s.track,
        s.code,
        `"${s.name}"`,
        `"${s.faculty}"`,
        s.hoursInScope.toFixed(2),
        s.coveredHours.toFixed(2),
        s.coveragePct.toFixed(2) + "%",
        s.remainingHours.toFixed(2),
        s.availableHours.toFixed(2),
        s.bufferRatio.toFixed(2),
        (s.paceVsPlan >= 0 ? "+" : "") + s.paceVsPlan.toFixed(2),
        s.status,
      ].join(",")
    );
    const blob = new Blob([[...headers, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MSOT_Course_Progression_${todayDate}.csv`;
    a.click();
  };

  const exportCalendarICS = () => {
    const events = examWindows
      .map((ex) => {
        const dt = ex.date.replace(/-/g, "");
        return [
          "BEGIN:VEVENT",
          `DTSTART;VALUE=DATE:${dt}`,
          `DTEND;VALUE=DATE:${dt}`,
          `SUMMARY:MSOT ${ex.name} (${ex.scopeKey} Scope)`,
          "DESCRIPTION:Synced from MSOT Pulse Course Progression Platform",
          "END:VEVENT",
        ].join("\r\n");
      })
      .join("\r\n");

    const icsContent = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//MSOT Pulse//EN", events, "END:VCALENDAR"].join("\r\n");
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MSOT_Academic_Exam_Schedule.ics";
    a.click();
  };

  const handleAddTimetableSlot = (e) => {
    e.preventDefault();
    const derivedHrs = computeSlotHours(ttStart, ttEnd);
    if (derivedHrs <= 0) {
      alert("End time must be after start time.");
      return;
    }
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== ttSubjectId) return sub;
        const updatedSlots = [
          ...(sub.timetableSlots || []),
          { day: Number(ttDay), dayName: DAY_NAMES[ttDay], start: ttStart, end: ttEnd, room: ttRoom },
        ];
        const updatedWeekly = { ...sub.weeklyScheduleHours };
        updatedWeekly[ttDay] = Number(((updatedWeekly[ttDay] || 0) + derivedHrs).toFixed(2));
        return { ...sub, timetableSlots: updatedSlots, weeklyScheduleHours: updatedWeekly };
      })
    );
  };

  const handleSaveSlotEdit = (subId, slotIdx) => {
    if (!canEditTimetable) return;
    const targetSub = subjects.find((s) => s.id === subId);
    if (targetSub && targetSub.faculty !== activeFacultyUser) {
      alert(`403 Permission Guard: You can only edit slots for your own subject (${targetSub.code}).`);
      return;
    }
    const newHrs = computeSlotHours(editingSlot.start, editingSlot.end);
    if (newHrs <= 0) {
      alert("End time must be after start time.");
      return;
    }

    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== subId) return sub;
        const updatedSlots = sub.timetableSlots.map((sl, i) =>
          i === slotIdx
            ? { ...sl, start: editingSlot.start, end: editingSlot.end, room: editingSlot.room }
            : sl
        );
        // Recompute weeklyScheduleHours from updated slots
        const updatedWeekly = {};
        updatedSlots.forEach((sl) => {
          const hrs = computeSlotHours(sl.start, sl.end);
          updatedWeekly[sl.day] = Number(((updatedWeekly[sl.day] || 0) + hrs).toFixed(2));
        });
        return { ...sub, timetableSlots: updatedSlots, weeklyScheduleHours: updatedWeekly };
      })
    );
    setEditingSlot(null);
  };

  const handleDeleteTimetableSlot = (subId, slotIdx) => {
    if (!canEditTimetable) return;
    const targetSub = subjects.find((s) => s.id === subId);
    if (targetSub && targetSub.faculty !== activeFacultyUser) {
      alert(`403 Permission Guard: You can only delete slots for your own subject (${targetSub.code}).`);
      return;
    }

    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== subId) return sub;
        const updatedSlots = sub.timetableSlots.filter((_, i) => i !== slotIdx);
        const updatedWeekly = {};
        updatedSlots.forEach((sl) => {
          const hrs = computeSlotHours(sl.start, sl.end);
          updatedWeekly[sl.day] = Number(((updatedWeekly[sl.day] || 0) + hrs).toFixed(2));
        });
        return { ...sub, timetableSlots: updatedSlots, weeklyScheduleHours: updatedWeekly };
      })
    );
  };

  // Generates the 7-day or 14-day timetable calendar starting from todayDate
  const upcomingTimetableDays = useMemo(() => {
    const holidayMap = new Map(holidays.map((h) => [h.date, h.name]));
    const days = [];
    const cursor = new Date(todayDate + "T00:00:00");

    for (let i = 0; i < timetableSpanDays; i++) {
      const iso = toISODate(cursor);
      const dayOfWeek = cursor.getDay(); // 0 = Sun, 1..6 = Mon..Sat
      const holidayName = holidayMap.get(iso) || null;
      const isSatWorking = isWorkingSaturday(cursor, saturdayRule);
      const isOffDay = dayOfWeek === 0 || Boolean(holidayName) || (dayOfWeek === 6 && !isSatWorking);

      const slotsForDay = [];
      if (!isOffDay) {
        visibleSubjects.forEach((sub) => {
          (sub.timetableSlots || []).forEach((slot, slotIdx) => {
            if (Number(slot.day) === dayOfWeek) {
              slotsForDay.push({
                ...slot,
                slotIdx,
                subId: sub.id,
                code: sub.code,
                subjectName: sub.name,
                faculty: sub.faculty,
                batch: sub.batch,
                campus: sub.campus,
                canModifyThisSlot: canEditTimetable && sub.faculty === activeFacultyUser,
              });
            }
          });
        });
        slotsForDay.sort((a, b) => a.start.localeCompare(b.start));
      }

      days.push({
        date: iso,
        dayOfWeek,
        dayLabel: cursor.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
        holidayName,
        isSunday: dayOfWeek === 0,
        isNonWorkingSat: dayOfWeek === 6 && !isSatWorking,
        slots: slotsForDay,
      });

      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  }, [todayDate, timetableSpanDays, holidays, saturdayRule, visibleSubjects, canEditTimetable, activeFacultyUser]);

  const handleAddLessonTopic = (e) => {
    e.preventDefault();
    const targetSub = subjects.find((s) => s.id === ttSubjectId);
    if (role === "Faculty" && targetSub && targetSub.faculty !== activeFacultyUser) {
      alert(`403 Permission Denied: Faculty (${activeFacultyUser}) cannot modify ${targetSub.faculty}'s lesson plan!`);
      return;
    }
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== ttSubjectId) return sub;
        const newTopic = {
          id: `T-${Date.now().toString().slice(-4)}`,
          unit: newTopicUnit,
          title: newTopicTitle,
          plannedHours: Number(newTopicHours),
          status: "Pending",
          pctComplete: 0,
          examScope: newTopicScope,
          coveredNotes: "",
          leftoverNotes: "",
          carryForwardTo: "",
          cwStatus: "Pending",
          hwStatus: "None",
          loggedAt: null,
        };
        return { ...sub, topics: [...sub.topics, newTopic] };
      })
    );
  };

  const handleWhatsappParse = () => {
    const text = whatsappInput.toLowerCase();
    let detectedPct = 100;
    const pctMatch = text.match(/(\d+)\s*%/);
    if (pctMatch) detectedPct = Math.min(100, Math.max(0, parseInt(pctMatch[1], 10)));

    let detectedStatus = "Completed";
    if (text.includes("cancel")) detectedStatus = "Cancelled";
    else if (text.includes("skip")) detectedStatus = "Skipped";
    else if (detectedPct < 100 || text.includes("in progress") || text.includes("left") || text.includes("carry")) {
      detectedStatus = "In Progress";
    }

    setLogStatus(detectedStatus);
    setLogPct(detectedStatus === "Completed" ? 100 : detectedPct);
    setLogCovered(whatsappInput || "Parsed from faculty WhatsApp voice/text note");
    setLogLeftover(text.includes("left") || text.includes("carry") ? "Remaining sub-topics carried forward" : "None");
    setLogHw(text.includes("hw") || text.includes("homework") ? "Assigned" : "None");
  };

  const statusBadge = (status) => {
    const styles = {
      "ON TRACK": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      TIGHT: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      DANGER: "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse",
      COMPLETE: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    };
    return `px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || "bg-slate-800 text-slate-300"}`;
  };

  // ============================================================================
  // VIEW 1: DEDICATED LOGIN PAGE (SHOWN WHEN !currentUser)
  // ============================================================================
  if (!currentUser) {
    return (
      <div data-theme={theme} className="min-h-screen bg-[#060a12] text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full rounded-3xl bg-slate-900/95 border border-slate-800 p-7 shadow-2xl space-y-6">
          {/* BRAND LOGO */}
          <div className="flex items-start justify-between gap-3.5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-indigo-500/20">
                MP
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-white">MSOT Pulse</h1>
                <p className="text-xs text-slate-400">
                  Course Progression & Syllabus Pacing Portal
                </p>
              </div>
            </div>
            <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white">
              {theme === "dark" ? "☀ Light" : "☾ Dark"}
            </button>
          </div>

          {/* STAFF VS STUDENT LOGIN MODE TABS */}
          <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setLoginMode("staff");
                setLoginInputId("admin@msot.org");
                setLoginInputPass("");
                setLoginError("");
              }}
              className={`py-2 rounded-lg transition ${loginMode === "staff" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
            >
              🏛️ Staff (@msot.org)
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode("student");
                setLoginInputId("MSOT-2026-042");
                setLoginInputPass("");
                setLoginError("");
              }}
              className={`py-2 rounded-lg transition ${loginMode === "student" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
            >
              🎓 Student ID Login
            </button>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Campus Selector on Login Page */}
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Your Campus
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["JUJ", "HI-Tech", "Ratnam", "RGIB"].map((campus) => (
                  <button
                    key={campus}
                    type="button"
                    onClick={() => {
                      setLoginCampus(campus);
                      setLoginError("");
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${loginCampus === campus
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                        : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                  >
                    {campus}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Login / Campus Mismatch Error */}
            {loginError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">
                {loginMode === "staff" ? "MSOT Workspace Email" : "Student Roll / Registration ID"}
              </label>
              <input
                type="text"
                required
                value={loginInputId}
                onChange={(e) => setLoginInputId(e.target.value)}
                placeholder={loginMode === "staff" ? "e.g. r.sharma@msot.org" : "e.g. MSOT-2026-042"}
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">
                {loginMode === "staff" ? "Account Password" : "Student PIN / OTP"}
              </label>
              <input
                type="password"
                required
                value={loginInputPass}
                onChange={(e) => setLoginInputPass(e.target.value)}
                placeholder={loginMode === "staff" ? "Enter password (password123)" : "Enter 4-digit PIN (2026)"}
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 font-bold text-white shadow-lg shadow-indigo-600/20 transition"
            >
              🔐 Sign In to MSOT Pulse
            </button>
          </form>

          {/* DEMO CREDENTIALS HELPER FOR EVALUATORS */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px]">
            <p className="font-bold text-slate-400 uppercase tracking-wider">
              Evaluator Accounts (Click to Fill ID — Password Required):
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {ACCOUNTS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    setLoginMode(acc.role === "Student" ? "student" : "staff");
                    setLoginInputId(acc.loginId);
                    setLoginInputPass(acc.password);
                    setLoginCampus(acc.campus === "ALL" ? "JUJ" : acc.campus);
                    setLoginError("");
                  }}
                  className="text-left px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 flex justify-between items-center transition"
                >
                  <span>
                    <strong className="text-cyan-300">{acc.role}:</strong> {acc.name}
                  </span>
                  <span className="font-mono text-slate-400">
                    {acc.loginId} / <strong className="text-emerald-300">{acc.password}</strong>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const miraiRollup = getWorstTrackStatus("Mirai Track");
  const uniRollup = getWorstTrackStatus("University Track");
  const activeLoggerSubject = computedSubjects.find((s) => s.id === selectedSubjectId) || computedSubjects[0];
  const isLoggerPermissionBlocked = role === "Faculty" && activeLoggerSubject.faculty !== activeFacultyUser;

  const visitingSubjects = computedSubjects.filter(
    (s) => s.isVisiting && (selectedCampus === "ALL" || s.campus === selectedCampus)
  );

  const navItems = [
    { id: "dashboard", label: "📊 Pacing Dashboard", roles: ["Admin / Program Manager", "Campus Manager", "Faculty"] },
    { id: "logger", label: "⚡ <60s Session Logger", badge: "SLA", roles: ["Admin / Program Manager", "Faculty"] },
    { id: "honorarium", label: "💼 Visiting Honorarium", badge: "₹", roles: ["Admin / Program Manager", "Campus Manager", "Faculty"] },
    { id: "timetable", label: "🕒 Timetable & Syllabus", roles: ["Admin / Program Manager", "Campus Manager", "Faculty", "Student"] },
    { id: "calendar", label: "📅 Calendar & Holidays", roles: ["Admin / Program Manager", "Campus Manager", "Faculty"] },
    { id: "exams", label: "🎯 Exam & Student View", roles: ["Admin / Program Manager", "Campus Manager", "Faculty", "Student"] },
    { id: "alerts", label: "🔔 Alerts & Audit Log", roles: ["Admin / Program Manager", "Campus Manager"] },
  ].filter((item) => item.roles.includes(role));

  return (
    <div data-theme={theme} className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {/* ==================== SLIM BURGER SLIDE-OVER DRAWER (w-56 / 224px) ==================== */}
      {burgerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setBurgerOpen(false)}
          />

          {/* Slim w-56 Drawer */}
          <aside className="relative z-10 w-56 bg-slate-900 border-r border-slate-800 p-3.5 flex flex-col justify-between h-full shadow-2xl">
            <div className="space-y-4">
              {/* Compact Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-black text-slate-950 text-xs">
                    MP
                  </div>
                  <span className="font-extrabold text-sm tracking-tight">MSOT Pulse</span>
                </div>
                <button
                  onClick={() => setBurgerOpen(false)}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Active Signed-In Profile Summary */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                <span className="text-cyan-400 font-bold uppercase block">{currentUser.role}</span>
                <p className="font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-slate-400 font-mono truncate">{currentUser.loginId}</p>
                <button
                  onClick={() => {
                    setSwitchError("");
                    setSwitchPasswordInput("");
                    setSwitchModalOpen(true);
                  }}
                  className="mt-1.5 w-full py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 font-semibold text-[11px] transition"
                >
                  🔐 Switch Profile (Pass)
                </button>
              </div>

              {/* Slim Navigation List */}
              <nav className="space-y-1 text-xs">
                {navItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setBurgerOpen(false);
                      if (tab.id === "logger") {
                        setStopwatchSec(0);
                        setStopwatchRunning(true);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl font-semibold transition ${activeTab === tab.id
                        ? "bg-indigo-600 text-white shadow"
                        : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                      }`}
                  >
                    <span className="truncate">{tab.label}</span>
                    {tab.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-cyan-300 font-bold">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Slim Drawer Footer */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-[11px]">
              {role !== "Student" && (
                <button
                  onClick={handleLoadFullSemesterCSV}
                  className="w-full py-2 px-2.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 font-bold transition truncate"
                >
                  📂 Import 4-Campus CSV
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full py-2 px-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-bold transition"
              >
                🚪 Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ==================== TOP HEADER WITH SLIM BURGER BUTTON ==================== */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* Compact 36x36px Burger Button */}
            <button
              onClick={() => setBurgerOpen(true)}
              title="Open Slim Navigation Menu"
              className="w-9 h-9 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-bold text-base shadow transition"
            >
              ☰
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base tracking-tight text-white">MSOT Pulse</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Signed in as <strong className="text-slate-200">{currentUser.name}</strong>
              </p>
            </div>
          </div>

          {/* Quick Horizontal Tab Pills (Desktop convenience) */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "logger") {
                    setStopwatchSec(0);
                    setStopwatchRunning(true);
                  }
                }}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${activeTab === tab.id ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Locked Campus Badge & Password-Protected Profile Switch */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 select-none"
              title="Campus is locked to your account. Log out to switch accounts."
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Campus: {selectedCampus}</span>
              <span className="text-slate-500 text-[10px] uppercase tracking-wider ml-1">
                (Locked)
              </span>
            </div>

            <button
              onClick={() => {
                setSwitchError("");
                setSwitchPasswordInput("");
                setSwitchModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-bold text-xs transition"
            >
              🔐 Switch Profile
            </button>

            <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs transition">
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ==================== MAIN WORKSPACE ==================== */}
      <main className="p-4 sm:p-6 space-y-6 max-w-7xl w-full mx-auto flex-1">
        {/* ==================== TAB 1: PACING DASHBOARD ==================== */}
        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Mirai Track Roll-Up</span>
                  <span className={statusBadge(miraiRollup.status)}>{miraiRollup.status}</span>
                </div>
                <h3 className="text-lg font-extrabold mt-2">Worst-Subject Rule</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Bottleneck: <strong className="text-white">{miraiRollup.worstSub}</strong>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold uppercase text-slate-400">University Track Roll-Up</span>
                  <span className={statusBadge(uniRollup.status)}>{uniRollup.status}</span>
                </div>
                <h3 className="text-lg font-extrabold mt-2">Core Curriculum</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Bottleneck: <strong className="text-white">{uniRollup.worstSub}</strong>
                </p>
              </div>

              {/* QUICK CARD FOR VISITING FACULTY HONORARIUM */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-emerald-400">
                    💼 Visiting Faculty Payouts
                  </span>
                  <h3 className="text-lg font-extrabold mt-1">
                    {visitingSubjects.length} Visiting Courses
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab("honorarium")}
                  className="mt-3 py-1.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold text-left"
                >
                  Open Honorarium & Lecture Sheet →
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/70 to-cyan-950/40 border border-cyan-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase text-cyan-300">✨ What-If Recovery</span>
                  <span className="text-xs font-extrabold text-emerald-300">+{remedialBonusHours}h</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">Simulate extra Saturday remedial hours:</p>
                <div className="mt-2.5 flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={remedialBonusHours}
                    onChange={(e) => setRemedialBonusHours(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                  <button
                    onClick={() => setRemedialBonusHours(0)}
                    className="px-2 py-1 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-700"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* 2-DECIMAL SUBJECT PACING MATRIX */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h3 className="font-bold text-lg">Live Subject Pacing & Buffer Matrix (2-Decimal Precision)</h3>
                  <p className="text-xs text-slate-400">
                    Click <strong className="text-cyan-300">Audit Math</strong> on any row to verify the spreadsheet formulas.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search code, subject, faculty..."
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs"
                  />
                  <button
                    onClick={exportToCSV}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold"
                  >
                    ⬇️ Export CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950/90 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                      <th className="py-3.5 px-4">Subject & Campus</th>
                      <th className="py-3.5 px-3 text-right">Scope Hrs</th>
                      <th className="py-3.5 px-3 text-right">Covered Hrs</th>
                      <th className="py-3.5 px-3 text-right">Coverage %</th>
                      <th className="py-3.5 px-3 text-right">Remaining</th>
                      <th className="py-3.5 px-3 text-right">Available</th>
                      <th className="py-3.5 px-3 text-right">Buffer Ratio</th>
                      <th className="py-3.5 px-3 text-right">Pace vs Plan</th>
                      <th className="py-3.5 px-3 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right">Verify</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {visibleSubjects.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>
                              {s.code}: {s.name}
                            </span>
                            {s.isVisiting && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                Visiting
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400">
                            {s.campus} • {s.track} • {s.faculty} • Deadline: {s.targetFinishDate}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono">{s.hoursInScope.toFixed(2)}h</td>
                        <td className="py-3.5 px-3 text-right font-mono text-cyan-300 font-semibold">
                          {s.coveredHours.toFixed(2)}h
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono font-bold">{s.coveragePct.toFixed(2)}%</td>
                        <td className="py-3.5 px-3 text-right font-mono">{s.remainingHours.toFixed(2)}h</td>
                        <td className="py-3.5 px-3 text-right font-mono text-emerald-300">
                          {s.availableHours.toFixed(2)}h
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono font-bold">{s.bufferRatio.toFixed(2)}</td>
                        <td
                          className={`py-3.5 px-3 text-right font-mono font-bold ${s.paceVsPlan < 0 ? "text-rose-400" : "text-emerald-400"
                            }`}
                        >
                          {s.paceVsPlan >= 0 ? "+" : ""}
                          {s.paceVsPlan.toFixed(2)}h
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className={statusBadge(s.status)}>{s.status}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setAuditModalSubject(s)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700"
                          >
                            🔍 Audit Math
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ==================== TAB 2: DEDICATED VISITING FACULTY LECTURE & HONORARIUM PAYOUTS ==================== */}
        {activeTab === "honorarium" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-400">
                  Problem 3 Stretch Goal Module
                </span>
                <h2 className="text-xl font-extrabold mt-0.5">
                  💼 Visiting Faculty Lecture & Honorarium Payouts
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tracks monthly Planned vs. Taken lecture counts, weighted teaching hours delivered, TDS deductions, and net honorarium payouts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                  <span className="text-slate-400">Payout Month:</span>
                  <select
                    value={selectedHonorariumMonth}
                    onChange={(e) => setSelectedHonorariumMonth(e.target.value)}
                    className="bg-transparent font-bold text-cyan-300 focus:outline-none"
                  >
                    <option value="2026-10">October 2026</option>
                    <option value="2026-11">November 2026</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                  <span className="text-slate-400">TDS %:</span>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={tdsRate}
                    onChange={(e) => setTdsRate(Number(e.target.value))}
                    className="w-12 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center font-bold text-white"
                  />
                </div>

                <button
                  onClick={exportHonorariumCSV}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 transition"
                >
                  ⬇️ Export Honorarium Sheet (CSV)
                </button>
              </div>
            </div>

            {/* VISITING FACULTY PAYOUT TABLE */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                      <th className="py-3.5 px-4">Visiting Faculty & Subject</th>
                      <th className="py-3.5 px-3 text-center">Month</th>
                      <th className="py-3.5 px-3 text-right">Planned Lectures</th>
                      <th className="py-3.5 px-3 text-right">Taken Lectures</th>
                      <th className="py-3.5 px-3 text-right">Delivered Hrs</th>
                      <th className="py-3.5 px-3 text-right">Rate / Hr</th>
                      <th className="py-3.5 px-3 text-right">Gross Payout</th>
                      <th className="py-3.5 px-3 text-right">TDS ({tdsRate}%)</th>
                      <th className="py-3.5 px-3 text-right">Net Payable</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {visitingSubjects.map((vf) => {
                      const plannedLec = vf.plannedMonthlyLectures?.[selectedHonorariumMonth] ?? 12;
                      const takenLec = vf.takenMonthlyLectures?.[selectedHonorariumMonth] ?? 6;
                      const gross = vf.coveredHours * vf.hourlyRate;
                      const tds = gross * (tdsRate / 100);
                      const net = gross - tds;

                      return (
                        <tr key={vf.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{vf.faculty}</div>
                            <div className="text-xs text-slate-400">
                              {vf.code}: {vf.name} ({vf.campus})
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-xs text-cyan-300">
                            {selectedHonorariumMonth}
                          </td>
                          <td className="py-3.5 px-3 text-right font-mono">{plannedLec}</td>
                          <td className="py-3.5 px-3 text-right font-mono font-bold text-indigo-300">
                            {takenLec} / {plannedLec}
                          </td>
                          <td className="py-3.5 px-3 text-right font-mono font-semibold text-emerald-300">
                            {vf.coveredHours.toFixed(2)}h / {vf.hoursInScope.toFixed(1)}h
                          </td>
                          <td className="py-3.5 px-3 text-right font-mono">₹{vf.hourlyRate}</td>
                          <td className="py-3.5 px-3 text-right font-mono">
                            ₹{gross.toLocaleString("en-IN")}
                          </td>
                          <td className="py-3.5 px-3 text-right font-mono text-rose-400">
                            -₹{tds.toLocaleString("en-IN")}
                          </td>
                          <td className="py-3.5 px-3 text-right font-mono font-extrabold text-emerald-400">
                            ₹{net.toLocaleString("en-IN")}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button
                              onClick={() => {
                                setSubjects((prev) =>
                                  prev.map((s) => {
                                    if (s.id !== vf.id) return s;
                                    const cur = s.takenMonthlyLectures?.[selectedHonorariumMonth] ?? 6;
                                    return {
                                      ...s,
                                      takenMonthlyLectures: {
                                        ...(s.takenMonthlyLectures || {}),
                                        [selectedHonorariumMonth]: cur + 1,
                                      },
                                    };
                                  })
                                );
                              }}
                              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700"
                            >
                              +1 Lecture
                            </button>
                            <button
                              onClick={() => {
                                setSubjects((prev) =>
                                  prev.map((s) =>
                                    s.id === vf.id
                                      ? {
                                        ...s,
                                        honorariumStatus:
                                          s.honorariumStatus === "Approved by CM"
                                            ? "Pending Verification"
                                            : "Approved by CM",
                                      }
                                      : s
                                  )
                                );
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${vf.honorariumStatus === "Approved by CM"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                  : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                }`}
                            >
                              {vf.honorariumStatus || "Pending"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: <60s MOBILE FACULTY LOGGER ==================== */}
        {activeTab === "logger" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="flex flex-wrap justify-between items-center gap-2 pb-4 mb-5 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-400">
                    Pre-Filled from Batch Timetable
                  </span>
                  <h2 className="text-xl font-bold">Mobile Session Logger (&lt;60s Target)</h2>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-xl font-mono font-bold text-sm border ${stopwatchSec < 60
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    }`}
                >
                  ⏱️ {stopwatchSec}s / 60s SLA
                </div>
              </div>

              {isLoggerPermissionBlocked && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200">
                  🔒 <strong>RBAC Permission Guard Active:</strong> Signed in as <strong>{activeFacultyUser}</strong>. This subject belongs to <strong>{activeLoggerSubject.faculty}</strong>. Submitting edits will be blocked (`403 Forbidden`).
                </div>
              )}

              <form onSubmit={handleConfirmSessionLog} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Scheduled Subject</label>
                    <select
                      value={selectedSubjectId}
                      onChange={(e) => {
                        setSelectedSubjectId(e.target.value);
                        const found = subjects.find((s) => s.id === e.target.value);
                        if (found && found.topics[0]) setSelectedTopicId(found.topics[0].id);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 font-semibold"
                    >
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.code} — {s.name} ({s.faculty})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Topic in Lesson Plan</label>
                    <select
                      value={selectedTopicId}
                      onChange={(e) => setSelectedTopicId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 font-semibold"
                    >
                      {activeLoggerSubject.topics.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.unit}: {t.title} ({t.plannedHours}h)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">1-Tap Session Status</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {["Completed", "In Progress", "Skipped", "Merged", "Cancelled"].map((st) => (
                      <button
                        type="button"
                        key={st}
                        onClick={() => {
                          setLogStatus(st);
                          if (st === "Completed" || st === "Merged") setLogPct(100);
                          if (st === "Skipped" || st === "Cancelled") setLogPct(0);
                        }}
                        className={`py-2 px-2 rounded-xl font-bold text-xs border transition ${logStatus === st
                            ? "bg-indigo-600 text-white border-indigo-400 shadow"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                          }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Topic Completion Percentage</span>
                    <span className="font-bold text-cyan-300">{logPct}% Complete</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={logPct}
                    onChange={(e) => setLogPct(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">What was covered</label>
                    <input
                      type="text"
                      value={logCovered}
                      onChange={(e) => setLogCovered(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">What was left over</label>
                    <input
                      type="text"
                      value={logLeftover}
                      onChange={(e) => setLogLeftover(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Carry-Forward To</label>
                    <input
                      type="text"
                      value={logCarryForward}
                      onChange={(e) => setLogCarryForward(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Classwork (CW) Status</label>
                    <select
                      value={logCw}
                      onChange={(e) => setLogCw(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs"
                    >
                      <option>Completed</option>
                      <option>In Progress</option>
                      <option>None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Homework (HW) Status</label>
                    <select
                      value={logHw}
                      onChange={(e) => setLogHw(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs"
                    >
                      <option>Assigned</option>
                      <option>Reviewed</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-95 font-bold text-sm shadow-lg"
                >
                  ✅ Confirm & Sync Session Log ({stopwatchSec}s)
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300">
                WhatsApp / Voice Note AI Parser
              </span>
              <h3 className="font-bold text-lg">💬 Log via WhatsApp or Voice Note</h3>
              <textarea
                rows={3}
                value={whatsappInput}
                onChange={(e) => setWhatsappInput(e.target.value)}
                placeholder="Example: In progress 70% completed on BCNF today, leftover carried to T4, homework assigned."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setWhatsappInput(
                      "In progress 70% completed on BCNF & 3NF today, leftover carried to T4, homework assigned."
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
                >
                  🎙️ Load Sample Note
                </button>
                <button
                  type="button"
                  onClick={handleWhatsappParse}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold"
                >
                  ✨ Parse into Form
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: TIMETABLE & SYLLABUS BUILDER ==================== */}
        {activeTab === "timetable" && (
          <div className="space-y-6">
            {/* TOP CONTROLS: 7-DAY VS 14-DAY TOGGLE & PERMISSION BADGE */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase text-cyan-400">
                    Campus Schedule ({selectedCampus})
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      canEditTimetable
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {canEditTimetable ? "✏️ Faculty Edit Mode" : "👁️ Read-Only View"}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold mt-1">
                  🗓️ {timetableSpanDays}-Day Rolling Class Timetable
                </h2>
                <p className="text-xs text-slate-400">
                  {canEditTimetable
                    ? "You can add new slots below or inline-edit/remove slots for your assigned subjects."
                    : "View-only schedule. Only assigned Faculty members can modify class slots."}
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTimetableSpanDays(7)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    timetableSpanDays === 7 ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  7 Days (1 Week)
                </button>
                <button
                  type="button"
                  onClick={() => setTimetableSpanDays(14)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    timetableSpanDays === 14 ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  14 Days (2 Weeks)
                </button>
              </div>
            </div>

            {/* 7-DAY / 14-DAY CALENDAR GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {upcomingTimetableDays.map((day) => (
                <div
                  key={day.date}
                  className={`rounded-2xl border p-3 flex flex-col justify-between min-h-[190px] ${
                    day.holidayName || day.isSunday || day.isNonWorkingSat
                      ? "bg-slate-950/60 border-slate-800/60"
                      : "bg-slate-900 border-slate-800"
                  }`}
                >
                  <div>
                    {/* Day Header */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                      <span className="text-xs font-extrabold text-white">{day.dayLabel}</span>
                      <span className="text-[10px] font-mono text-slate-400">{day.date.slice(5)}</span>
                    </div>

                    {/* Off-Day Badges or Class Slots */}
                    {day.holidayName ? (
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                        🎉 Holiday: {day.holidayName}
                      </div>
                    ) : day.isSunday ? (
                      <div className="p-2.5 rounded-xl bg-slate-950 text-slate-500 text-xs font-medium text-center">
                        Sunday Off
                      </div>
                    ) : day.isNonWorkingSat ? (
                      <div className="p-2.5 rounded-xl bg-slate-950 text-slate-500 text-xs font-medium text-center">
                        Non-Working Saturday ({saturdayRule})
                      </div>
                    ) : day.slots.length === 0 ? (
                      <div className="p-2.5 rounded-xl bg-slate-950/50 text-slate-500 text-xs text-center">
                        No classes scheduled
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {day.slots.map((slot) => {
                          const isEditingThis =
                            editingSlot &&
                            editingSlot.subId === slot.subId &&
                            editingSlot.idx === slot.slotIdx;

                          return (
                            <div
                              key={`${day.date}-${slot.subId}-${slot.slotIdx}`}
                              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-cyan-300">{slot.code}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 font-mono">
                                  {slot.room}
                                </span>
                              </div>
                              <p className="text-[11px] font-semibold text-white leading-snug">
                                {slot.subjectName}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">{slot.faculty}</p>

                              {isEditingThis ? (
                                <div className="pt-1.5 space-y-1.5 border-t border-slate-800">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="time"
                                      value={editingSlot.start}
                                      onChange={(e) =>
                                        setEditingSlot({ ...editingSlot, start: e.target.value })
                                      }
                                      className="w-full bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-[10px]"
                                    />
                                    <input
                                      type="time"
                                      value={editingSlot.end}
                                      onChange={(e) =>
                                        setEditingSlot({ ...editingSlot, end: e.target.value })
                                      }
                                      className="w-full bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-[10px]"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={editingSlot.room}
                                    onChange={(e) =>
                                      setEditingSlot({ ...editingSlot, room: e.target.value })
                                    }
                                    placeholder="Room"
                                    className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-[10px]"
                                  />
                                  <div className="flex gap-1">
                                    <button
                                      type="button"
                                      onClick={() => handleSaveSlotEdit(slot.subId, slot.slotIdx)}
                                      className="flex-1 py-1 rounded bg-emerald-600 text-white font-bold text-[10px]"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingSlot(null)}
                                      className="flex-1 py-1 rounded bg-slate-800 text-slate-300 text-[10px]"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                                  <span className="font-mono text-[11px] text-emerald-300 font-semibold">
                                    {slot.start} – {slot.end}
                                  </span>

                                  {/* Faculty-Only Inline Edit & Delete Buttons */}
                                  {slot.canModifyThisSlot && (
                                    <div className="flex items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setEditingSlot({
                                            subId: slot.subId,
                                            idx: slot.slotIdx,
                                            start: slot.start,
                                            end: slot.end,
                                            room: slot.room,
                                          })
                                        }
                                        className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-bold"
                                        title="Edit slot time or room"
                                      >
                                        ✎
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDeleteTimetableSlot(slot.subId, slot.slotIdx)
                                        }
                                        className="px-1.5 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 text-[10px] font-bold"
                                        title="Delete slot"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FACULTY-ONLY EDITING FORMS (HIDDEN FOR STUDENTS) */}
            {canEditTimetable && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <form onSubmit={handleAddTimetableSlot} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <span className="text-[11px] font-bold uppercase text-cyan-400">
                    Faculty Schedule Editor
                  </span>
                  <h3 className="font-bold text-base">🕒 Add Weekly Timetable Slot (50m to 2h)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <select
                      value={ttSubjectId}
                      onChange={(e) => setTtSubjectId(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 font-semibold col-span-2"
                    >
                      {visibleSubjects
                        .filter((s) => s.faculty === activeFacultyUser)
                        .map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.code} ({s.campus})
                          </option>
                        ))}
                    </select>
                    <select
                      value={ttDay}
                      onChange={(e) => setTtDay(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 font-semibold"
                    >
                      {Object.entries(DAY_NAMES).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={ttRoom}
                      onChange={(e) => setTtRoom(e.target.value)}
                      placeholder="Room"
                      className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={ttStart}
                      onChange={(e) => setTtStart(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={ttEnd}
                      onChange={(e) => setTtEnd(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2"
                    />
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold">
                      + Add Slot (+{computeSlotHours(ttStart, ttEnd)}h)
                    </button>
                  </div>
                </form>

                <form onSubmit={handleAddLessonTopic} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <span className="text-[11px] font-bold uppercase text-emerald-400">
                    Syllabus & Exam Scope Upload
                  </span>
                  <h3 className="font-bold text-base">📚 Upload Lesson Plan Topic</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={newTopicUnit}
                      onChange={(e) => setNewTopicUnit(e.target.value)}
                      placeholder="Unit"
                      className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2"
                    />
                    <input
                      type="text"
                      value={newTopicTitle}
                      onChange={(e) => setNewTopicTitle(e.target.value)}
                      placeholder="Topic Title"
                      className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 col-span-2"
                    />
                    <input
                      type="number"
                      step="0.5"
                      value={newTopicHours}
                      onChange={(e) => setNewTopicHours(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={newTopicScope}
                      onChange={(e) => setNewTopicScope(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-semibold"
                    >
                      <option value="Sessionals">Scope: Sessionals</option>
                      <option value="Mid-Term">Scope: Mid-Term</option>
                      <option value="PUT">Scope: PUT</option>
                      <option value="End-Term">Scope: End-Term</option>
                    </select>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold">
                      + Add Topic & Compute Planned Date
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 5: AUTO-SHIFTING CALENDAR ==================== */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
              <div className="space-y-3">
                <h3 className="font-bold text-base">⚙️ Working Saturdays Rule</h3>
                <div className="flex gap-1.5">
                  {[
                    { id: "all", label: "All Sat Working" },
                    { id: "2nd & 4th", label: "2nd & 4th Off" },
                    { id: "none", label: "No Sat" },
                  ].map((rule) => (
                    <button
                      key={rule.id}
                      onClick={() => setSaturdayRule(rule.id)}
                      className={`flex-1 py-2 px-2 rounded-xl font-bold border transition ${saturdayRule === rule.id
                          ? "bg-indigo-600 text-white border-indigo-400"
                          : "bg-slate-950 text-slate-400 border-slate-800"
                        }`}
                    >
                      {rule.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <h3 className="font-bold text-base">📅 Inject Holiday & Auto-Shift Topic Dates</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    type="date"
                    value={newHolidayDate}
                    onChange={(e) => setNewHolidayDate(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newHolidayName}
                    onChange={(e) => setNewHolidayName(e.target.value)}
                    placeholder="Holiday Name"
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 flex-1"
                  />
                  <button
                    onClick={() => {
                      if (!newHolidayDate) return;
                      setHolidays([...holidays, { date: newHolidayDate, name: newHolidayName || "Holiday" }]);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-white"
                  >
                    + Add Holiday & Shift Dates
                  </button>
                </div>
              </div>
            </div>

            {visibleSubjects.slice(0, 5).map((sub) => (
              <div key={sub.id} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
                  <h4 className="font-bold text-sm">
                    {sub.code}: {sub.name} ({sub.campus})
                  </h4>
                  <span className={statusBadge(sub.status)}>
                    Buffer: {sub.bufferRatio.toFixed(2)} ({sub.status})
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                        <th className="py-2.5 px-4">Unit & Topic</th>
                        <th className="py-2.5 px-3">Exam Scope</th>
                        <th className="py-2.5 px-3 text-right">Planned Hrs</th>
                        <th className="py-2.5 px-3">Auto-Planned Date</th>
                        <th className="py-2.5 px-3">Status & %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {sub.topics.map((t) => (
                        <tr key={t.id}>
                          <td className="py-2.5 px-4 font-semibold text-white">
                            {t.unit}: {t.title}
                          </td>
                          <td className="py-2.5 px-3">{t.examScope}</td>
                          <td className="py-2.5 px-3 text-right font-mono">{t.plannedHours.toFixed(2)}h</td>
                          <td className="py-2.5 px-3 font-mono">{t.plannedDate}</td>
                          <td className="py-2.5 px-3">
                            {t.status} ({t.pctComplete}%)
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== TAB 6: EXAM READINESS & STUDENT PORTAL ==================== */}
        {activeTab === "exams" && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <h2 className="text-lg font-bold">🎯 Exam Readiness & Read-Only Student Batch View</h2>
              <button
                onClick={exportCalendarICS}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold"
              >
                📅 Sync Exam Dates (.ics)
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {examWindows.map((exam) => {
                let scopeTotal = 0;
                let scopeCovered = 0;
                visibleSubjects.forEach((s) => {
                  s.topics.forEach((t) => {
                    if (t.examScope === exam.scopeKey && t.status !== "Skipped") {
                      scopeTotal += t.plannedHours;
                      if (t.status === "Completed" || t.status === "Merged") scopeCovered += t.plannedHours;
                      else if (t.status === "In Progress") scopeCovered += t.plannedHours * (t.pctComplete / 100);
                    }
                  });
                });
                const pct = scopeTotal > 0 ? (scopeCovered / scopeTotal) * 100 : 0;
                const hoursStillNeeded = Math.max(0, scopeTotal - scopeCovered);

                return (
                  <div key={exam.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] font-bold uppercase text-cyan-400">{exam.scopeKey}</span>
                    <h3 className="text-base font-bold mt-0.5">{exam.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">📅 {exam.date}</p>
                    <p className="text-sm font-bold text-emerald-300 mt-3">{pct.toFixed(2)}% Covered</p>
                    <p className="text-xs text-amber-300 mt-1">Still Needed: {hoursStillNeeded.toFixed(2)}h</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 7: ALERTS & IMMUTABLE AUDIT LOG ==================== */}
        {activeTab === "alerts" && (
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-base mb-3">🛡️ Security & Session Audit Trail</h3>
            <div className="space-y-2 text-xs">
              {auditTrail.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center gap-4"
                >
                  <div>
                    <span className="font-bold text-cyan-300 mr-2">[{entry.actor}]</span>
                    <span className="text-slate-200">{entry.action}</span>
                  </div>
                  <span className="font-mono text-slate-400 shrink-0">{entry.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ==================== PASSWORD-PROTECTED PROFILE SWITCH MODAL ==================== */}
      {switchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-white">Switch Profile</h2>
                <p className="text-xs text-slate-400 mt-1">Verify the password for the profile you want to open.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSwitchModalOpen(false);
                  setSwitchPasswordInput("");
                  setSwitchError("");
                }}
                aria-label="Close profile switch modal"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleVerifiedProfileSwitch} className="space-y-4 text-sm">
              <div>
                <label htmlFor="targetProfile" className="block text-xs text-slate-400 mb-1.5 font-semibold">
                  Select profile
                </label>
                <select
                  id="targetProfile"
                  value={targetAccountLoginId}
                  onChange={(e) => {
                    setTargetAccountLoginId(e.target.value);
                    setSwitchPasswordInput("");
                    setSwitchError("");
                  }}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                >
                  {ACCOUNTS.map((account) => (
                    <option key={account.id} value={account.loginId}>
                      {account.name} — {account.role} ({account.loginId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="switchPassword" className="block text-xs text-slate-400 mb-1.5 font-semibold">
                  Password for selected profile
                </label>
                <input
                  id="switchPassword"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={switchPasswordInput}
                  onChange={(e) => setSwitchPasswordInput(e.target.value)}
                  placeholder="Enter profile password"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                />
              </div>

              {switchError && (
                <p role="alert" className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                  {switchError}
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSwitchModalOpen(false);
                    setSwitchPasswordInput("");
                    setSwitchError("");
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Verify & Switch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
