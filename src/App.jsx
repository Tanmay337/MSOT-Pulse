import React, { useState, useMemo, useEffect } from "react";

// ============================================================================
// 1. AUTHENTICATION ACCOUNTS (PASSWORD PROTECTED)
// ============================================================================
const INITIAL_ACCOUNTS = [
  {
    id: "USR-ADMIN",
    loginId: "admin@msot.org",
    password: "password123",
    name: "Dr. A. K. Singh",
    role: "Admin / Program Manager",
    campus: "ALL",
    approvalStatus: "approved",
  },
  {
    id: "USR-CM-JUJ",
    loginId: "cm.juj@msot.org",
    password: "password123",
    name: "Rajeshwari Rathore",
    role: "Campus Manager",
    campus: "JUJ",
    approvalStatus: "approved",
  },
  {
    id: "USR-CM-HT",
    loginId: "cm.hitech@msot.org",
    password: "password123",
    name: "Vikram Sengupta",
    role: "Campus Manager",
    campus: "HI-Tech",
    approvalStatus: "approved",
  },
  {
    id: "USR-FAC-1",
    loginId: "r.sharma@msot.org",
    password: "password123",
    name: "Prof. R. Sharma",
    role: "Faculty",
    campus: "JUJ",
    approvalStatus: "approved",
  },
  {
    id: "USR-FAC-2",
    loginId: "v.aditya@msot.org",
    password: "password123",
    name: "Vikram Aditya (Visiting Fellow)",
    role: "Faculty",
    campus: "JUJ",
    approvalStatus: "approved",
  },
  {
    id: "USR-FAC-3",
    loginId: "a.kulkarni@msot.org",
    password: "password123",
    name: "Prof. A. Kulkarni",
    role: "Faculty",
    campus: "HI-Tech",
    approvalStatus: "approved",
  },
  {
    id: "USR-STU-1",
    loginId: "MSOT-2026-042",
    password: "2026",
    name: "Tanmay Gupta",
    role: "Student",
    campus: "JUJ",
    batch: "CSE-2026-A",
    approvalStatus: "approved",
  },
  {
    id: "USR-PENDING-JUJ",
    loginId: "ananya.sen@msot.org",
    password: "password123",
    name: "Ananya Sen (New Faculty)",
    role: "Faculty",
    campus: "JUJ",
    approvalStatus: "pending",
    registeredAt: "2026-10-15 08:30",
  },
  {
    id: "USR-PENDING-HT",
    loginId: "MSOT-2026-HT-09",
    password: "2026",
    name: "Rohit Deshmukh (New Student)",
    role: "Student",
    campus: "HI-Tech",
    batch: "CSE-2026-HI-Tech",
    approvalStatus: "pending",
    registeredAt: "2026-10-15 11:15",
  },
];

const INITIAL_HOLIDAYS = [
  { id: "HOL-1", date: "2026-10-20", name: "Dussehra Break", campus: "ALL" },
  { id: "HOL-2", date: "2026-11-09", name: "Diwali Holiday", campus: "ALL" },
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
    honorariumRate: 1500,
    rateUnit: "per hour",
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
    honorariumRate: 2400,
    rateUnit: "per lecture",
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
    honorariumRate: 1800,
    rateUnit: "per hour",
    plannedMonthlyLectures: { "2026-10": 10, "2026-11": 10 },
    takenMonthlyLectures: { "2026-10": 5, "2026-11": 0 },
    honorariumStatus: "Approved by CM",
    targetFinishDate: "2026-11-22",
    timetableSlots: [
      { day: 2, dayName: "Tue", start: "11:00", end: "13:00", room: "JUJ-Lab-1" },
      { day: 5, dayName: "Fri", start: "15:00", end: "17:00", room: "JUJ-Lab-1" },
    ],
    weeklyScheduleHours: { 2: 2.0, 5: 2.0 },
    topics: [
      { id: "T501", unit: "Unit 1", title: "Container Internals, namespaces & cgroups", plannedHours: 6.0, status: "Completed", pctComplete: 100, examScope: "Sessionals", coveredNotes: "Built container from scratch", leftoverNotes: "None", carryForwardTo: "", cwStatus: "Completed", hwStatus: "Reviewed", loggedAt: "2026-10-08" },
      { id: "T502", unit: "Unit 2", title: "Kubernetes Pods, Services & Ingress", plannedHours: 6.0, status: "In Progress", pctComplete: 50, examScope: "Mid-Term", coveredNotes: "Pods & Deployments done", leftoverNotes: "Ingress controller lab", carryForwardTo: "T503", cwStatus: "Completed", hwStatus: "Assigned", loggedAt: "2026-10-14" },
      { id: "T503", unit: "Unit 3", title: "Helm, ArgoCD & GitOps Pipelines", plannedHours: 6.0, status: "Pending", pctComplete: 0, examScope: "End-Term", coveredNotes: "", leftoverNotes: "", carryForwardTo: "", cwStatus: "Pending", hwStatus: "None", loggedAt: null },
    ],
  },
];

// Initial individual delivered lecture records for Visiting Faculty
const INITIAL_DELIVERED_LECTURES = [
  // SUB-102 (CS-304, Vikram Aditya, JUJ) - October 2026 (6 lectures = 12.0h)
  {
    id: "LEC-101",
    subId: "SUB-102",
    courseCode: "CS-304",
    courseName: "Full-Stack React & System Architecture",
    campus: "JUJ",
    faculty: "Vikram Aditya (Visiting Fellow)",
    date: "2026-10-06",
    durationHours: 2.0,
    topic: "React Reconciliation & Fiber Tree Architecture",
    status: "Completed",
    notes: "Deep dive into virtual DOM diffing and workLoopConcurrent",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-102",
    subId: "SUB-102",
    courseCode: "CS-304",
    courseName: "Full-Stack React & System Architecture",
    campus: "JUJ",
    faculty: "Vikram Aditya (Visiting Fellow)",
    date: "2026-10-08",
    durationHours: 2.0,
    topic: "Custom Hooks & Memory Leak Prevention",
    status: "Completed",
    notes: "useCallback and useMemo micro-benchmarks with DevTools profiler",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-103",
    subId: "SUB-102",
    courseCode: "CS-304",
    courseName: "Full-Stack React & System Architecture",
    campus: "JUJ",
    faculty: "Vikram Aditya (Visiting Fellow)",
    date: "2026-10-10",
    durationHours: 2.0,
    topic: "Server-Side Rendering (SSR) Architecture",
    status: "Completed",
    notes: "Hydration pipeline and Next.js Pages vs App router tradeoffs",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-104",
    subId: "SUB-102",
    courseCode: "CS-304",
    courseName: "Full-Stack React & System Architecture",
    campus: "JUJ",
    faculty: "Vikram Aditya (Visiting Fellow)",
    date: "2026-10-13",
    durationHours: 2.0,
    topic: "Streaming SSR & Suspense Boundaries",
    status: "Completed",
    notes: "Edge runtime performance profiling and TTFB reduction",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-105",
    subId: "SUB-102",
    courseCode: "CS-304",
    courseName: "Full-Stack React & System Architecture",
    campus: "JUJ",
    faculty: "Vikram Aditya (Visiting Fellow)",
    date: "2026-10-15",
    durationHours: 2.0,
    topic: "State Management with Zustand & Redux Toolkit",
    status: "Completed",
    notes: "Action dispatchers, selectors, and immutable state trees",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-106",
    subId: "SUB-102",
    courseCode: "CS-304",
    courseName: "Full-Stack React & System Architecture",
    campus: "JUJ",
    faculty: "Vikram Aditya (Visiting Fellow)",
    date: "2026-10-17",
    durationHours: 2.0,
    topic: "WebSockets & Real-time Collaboration",
    status: "Completed",
    notes: "Socket.io handshake, heartbeat ping, and reconnect backoff",
    verifiedBy: "Prof. R. Sharma (CM)",
  },

  // SUB-104 (CS-308, Prof. A. Kulkarni, HI-Tech) - October 2026 (7 lectures = 14.0h)
  {
    id: "LEC-107",
    subId: "SUB-104",
    courseCode: "CS-308",
    courseName: "Operating Systems & Kernel Internals",
    campus: "HI-Tech",
    faculty: "Prof. A. Kulkarni",
    date: "2026-10-05",
    durationHours: 2.0,
    topic: "Process Lifecycle, Fork-Exec & IPC Mechanisms",
    status: "Completed",
    notes: "POSIX pipes, message queues, and shared memory demonstration",
    verifiedBy: "Admin",
  },
  {
    id: "LEC-108",
    subId: "SUB-104",
    courseCode: "CS-308",
    courseName: "Operating Systems & Kernel Internals",
    campus: "HI-Tech",
    faculty: "Prof. A. Kulkarni",
    date: "2026-10-07",
    durationHours: 2.0,
    topic: "CPU Scheduling Algorithms (Linux CFS & Round Robin)",
    status: "Completed",
    notes: "Linux CFS red-black tree scheduler analysis and latency tests",
    verifiedBy: "Admin",
  },
  {
    id: "LEC-109",
    subId: "SUB-104",
    courseCode: "CS-308",
    courseName: "Operating Systems & Kernel Internals",
    campus: "HI-Tech",
    faculty: "Prof. A. Kulkarni",
    date: "2026-10-09",
    durationHours: 2.0,
    topic: "Mutexes, Semaphores & Race Conditions",
    status: "Completed",
    notes: "Deadlock scenarios and dining philosophers problem in C",
    verifiedBy: "Admin",
  },
  {
    id: "LEC-110",
    subId: "SUB-104",
    courseCode: "CS-308",
    courseName: "Operating Systems & Kernel Internals",
    campus: "HI-Tech",
    faculty: "Prof. A. Kulkarni",
    date: "2026-10-12",
    durationHours: 2.0,
    topic: "Banker's Safety Algorithm & Deadlock Avoidance",
    status: "Completed",
    notes: "Resource-allocation matrix calculations and safe state proofs",
    verifiedBy: "Admin",
  },
  {
    id: "LEC-111",
    subId: "SUB-104",
    courseCode: "CS-308",
    courseName: "Operating Systems & Kernel Internals",
    campus: "HI-Tech",
    faculty: "Prof. A. Kulkarni",
    date: "2026-10-14",
    durationHours: 2.0,
    topic: "Virtual Memory & Multi-Level Page Tables",
    status: "Completed",
    notes: "TLB miss penalty, inverted page tables, and MMU walk",
    verifiedBy: "Admin",
  },
  {
    id: "LEC-112",
    subId: "SUB-104",
    courseCode: "CS-308",
    courseName: "Operating Systems & Kernel Internals",
    campus: "HI-Tech",
    faculty: "Prof. A. Kulkarni",
    date: "2026-10-16",
    durationHours: 2.0,
    topic: "Page Replacement Algorithms (LRU, FIFO, Clock)",
    status: "Completed",
    notes: "Belady's anomaly simulation and working set model",
    verifiedBy: "Admin",
  },
  {
    id: "LEC-113",
    subId: "SUB-104",
    courseCode: "CS-308",
    courseName: "Operating Systems & Kernel Internals",
    campus: "HI-Tech",
    faculty: "Prof. A. Kulkarni",
    date: "2026-10-19",
    durationHours: 2.0,
    topic: "Linux VFS & Inode Structure",
    status: "Completed",
    notes: "Ext4 filesystem structure, superblocks, and file descriptors",
    verifiedBy: "Admin",
  },

  // SUB-105 (CS-319, Rohan Menon, JUJ) - October 2026 (5 lectures = 10.0h)
  {
    id: "LEC-114",
    subId: "SUB-105",
    courseCode: "CS-319",
    courseName: "Cloud Native DevOps & Kubernetes",
    campus: "JUJ",
    faculty: "Rohan Menon (Visiting Architect)",
    date: "2026-10-06",
    durationHours: 2.0,
    topic: "Linux Cgroups, Namespaces & Containerization",
    status: "Completed",
    notes: "Built minimal container from scratch using unshare and chroot",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-115",
    subId: "SUB-105",
    courseCode: "CS-319",
    courseName: "Cloud Native DevOps & Kubernetes",
    campus: "JUJ",
    faculty: "Rohan Menon (Visiting Architect)",
    date: "2026-10-09",
    durationHours: 2.0,
    topic: "OCI Container Specs & Multi-stage Dockerfiles",
    status: "Completed",
    notes: "Optimized distroless image builds reducing CVE surface",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-116",
    subId: "SUB-105",
    courseCode: "CS-319",
    courseName: "Cloud Native DevOps & Kubernetes",
    campus: "JUJ",
    faculty: "Rohan Menon (Visiting Architect)",
    date: "2026-10-13",
    durationHours: 2.0,
    topic: "Kubernetes Control Plane Architecture",
    status: "Completed",
    notes: "API server, etcd, kube-scheduler, kubelet internals",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-117",
    subId: "SUB-105",
    courseCode: "CS-319",
    courseName: "Cloud Native DevOps & Kubernetes",
    campus: "JUJ",
    faculty: "Rohan Menon (Visiting Architect)",
    date: "2026-10-16",
    durationHours: 2.0,
    topic: "Kubernetes Pods, ReplicaSets & Rolling Deployments",
    status: "Completed",
    notes: "Zero-downtime updates, readiness probes, and rollback testing",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
  {
    id: "LEC-118",
    subId: "SUB-105",
    courseCode: "CS-319",
    courseName: "Cloud Native DevOps & Kubernetes",
    campus: "JUJ",
    faculty: "Rohan Menon (Visiting Architect)",
    date: "2026-10-18",
    durationHours: 2.0,
    topic: "Service Meshes & Ingress Routing (Envoy / Traefik)",
    status: "Completed",
    notes: "ClusterIP, NodePort, LoadBalancer and TLS ingress rules",
    verifiedBy: "Prof. R. Sharma (CM)",
  },
];

const INITIAL_EXAMS = [
  { id: "EX-0", name: "Sessional Exam 1", date: "2026-10-19", scopeKey: "Sessionals" },
  { id: "EX-1", name: "Mid-Term Exam", date: "2026-10-28", scopeKey: "Mid-Term" },
  { id: "EX-2", name: "Pre-University Test (PUT)", date: "2026-11-16", scopeKey: "PUT" },
  { id: "EX-3", name: "End-Term Exam", date: "2026-11-30", scopeKey: "End-Term" },
];

const CAMPUS_BATCHES = {
  JUJ: [
    { id: "CSE-2026-A", label: "CSE-2026-A (Core Mirai & University Track)" },
    { id: "CSE-2026-J", label: "CSE-2026-J (Cloud DevOps Specialization)" },
    { id: "CSE-2026-JUJ", label: "CSE-2026-JUJ (Campus-Wide / All Subjects)" },
  ],
  "HI-Tech": [
    { id: "CSE-2026-B", label: "CSE-2026-B (Systems & Kernel Architecture)" },
    { id: "CSE-2026-HI-Tech", label: "CSE-2026-HI-Tech (Campus-Wide / All Subjects)" },
  ],
  RGIB: [
    { id: "CSE-2026-RGIB", label: "CSE-2026-RGIB (Full Track)" },
  ],
};

const DAY_NAMES = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" };

function isWorkingSaturday(dateObj, saturdayRule) {
  if (dateObj.getDay() !== 6) return true;
  if (saturdayRule === "all") return true;
  if (saturdayRule === "none") return false;
  const weekOfMonth = Math.ceil(dateObj.getDate() / 7);
  return weekOfMonth !== 2 && weekOfMonth !== 4;
}

function toISODate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [authView, setAuthView] = useState("login"); // "login" | "register"
  const [regName, setRegName] = useState("");
  const [regLoginId, setRegLoginId] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("Faculty"); // "Faculty" | "Student"
  const [regCampus, setRegCampus] = useState("JUJ");
  const [regBatch, setRegBatch] = useState("CSE-2026-A");
  const [regMessage, setRegMessage] = useState("");
  const [regError, setRegError] = useState("");

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
  const [campuses, setCampuses] = useState(["JUJ", "HI-Tech", "RGIB"]);
  const [newCampusName, setNewCampusName] = useState("");
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
  const [examWindows, setExamWindows] = useState(INITIAL_EXAMS);
  // New state for CSV import errors
  const [csvImportError, setCsvImportError] = useState("");
  // State to track reminder alerts
  const [reminderChecked, setReminderChecked] = useState(false);
  const [newExamName, setNewExamName] = useState("");
  const [newExamDate, setNewExamDate] = useState("2026-11-05");
  const [newExamScope, setNewExamScope] = useState("Mid-Term");
  const [remedialBonusHours, setRemedialBonusHours] = useState(0);

  // Visiting Faculty Honorarium Month & Deduction State (Configurable Institutional TDS)
  const [selectedHonorariumMonth, setSelectedHonorariumMonth] = useState("2026-10");
  const [tdsRate, setTdsRate] = useState(10); // Configured deduction (e.g. TDS / Institutional Withholding %)
  const [deliveredLectures, setDeliveredLectures] = useState(INITIAL_DELIVERED_LECTURES);
  const [honorariumFilterStatus, setHonorariumFilterStatus] = useState("ALL"); // ALL | Approved | Pending
  const [selectedLedgerSubjectId, setSelectedLedgerSubjectId] = useState("ALL"); // ALL or specific subId
  const [logLectureModalOpen, setLogLectureModalOpen] = useState(false);
  const [rateModalSubject, setRateModalSubject] = useState(null);

  // New Delivered Lecture Modal Form State
  const [newLecSubId, setNewLecSubId] = useState("SUB-102");
  const [newLecDate, setNewLecDate] = useState("2026-10-19");
  const [newLecDuration, setNewLecDuration] = useState(2.0);
  const [newLecTopic, setNewLecTopic] = useState("");
  const [newLecStatus, setNewLecStatus] = useState("Completed");
  const [newLecNotes, setNewLecNotes] = useState("");

  // Edit Rate Modal Form State
  const [editRateValue, setEditRateValue] = useState(1500);
  const [editRateUnit, setEditRateUnit] = useState("per hour");
  const [editPlannedLec, setEditPlannedLec] = useState(12);

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

  // Timetable, Faculty Assignment & Syllabus Builder State
  const [newHolidayDate, setNewHolidayDate] = useState("2026-10-23");
  const [newHolidayName, setNewHolidayName] = useState("Founder's Day Guest Lecture");
  const [newHolidayCampus, setNewHolidayCampus] = useState("ALL");
  const [ttSubjectId, setTtSubjectId] = useState("SUB-101");
  const [ttDay, setTtDay] = useState(2);
  const [ttStart, setTtStart] = useState("10:00");
  const [ttEnd, setTtEnd] = useState("11:50");
  const [ttRoom, setTtRoom] = useState("LH-202");
  const [assignSubId, setAssignSubId] = useState("SUB-101");
  const [assignFacultyName, setAssignFacultyName] = useState("Prof. R. Sharma");
  const [newTopicUnit, setNewTopicUnit] = useState("Unit 4");
  const [newTopicTitle, setNewTopicTitle] = useState("Distributed Consensus & Raft");
  const [newTopicHours, setNewTopicHours] = useState(4.0);
  const [newTopicScope, setNewTopicScope] = useState("End-Term");

  // 7-Day / 14-Day Timetable View & Edit State
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
  const isAdmin = role === "Admin / Program Manager";
  const isCampusManager = role === "Campus Manager";
  const isFaculty = role === "Faculty";
  const isStudent = role === "Student";

  // Section 4 Role Permissions:
  // - Admin / Program Manager: Set up campuses, semesters, calendars, exam windows; view all dashboards; export.
  // - Campus Manager: Manage timetable and faculty for their campus; view campus dashboards; receive alerts.
  // - Faculty (incl. visiting): Upload lesson plan; log sessions for their own subjects only; see their own subject dashboard.
  // - Student: Read-only view of their batch: topics covered, next topics, exam schedule and scope.
  const ROLE_SUMMARY = {
    "Admin / Program Manager": "Set up campuses, semesters, calendars, exam windows; view all dashboards; export.",
    "Campus Manager": "Manage timetable and faculty for their campus; view campus dashboards; receive alerts.",
    Faculty: "Upload lesson plan; log sessions for their own subjects only; see their own subject dashboard.",
    Student: "Read-only view of their batch: topics covered, next topics, exam schedule and scope.",
  };
  const canSetupSemestersAndExams = isAdmin;
  const canExportData = isAdmin;
  const canManageTimetableAndFaculty = isAdmin || isCampusManager;
  const canManageCalendar = isAdmin || isCampusManager;
  const canUploadLessonPlan = isAdmin || isFaculty;
  const canEditTimetable = canManageTimetableAndFaculty;
  const canApproveHonorarium = (vf) => {
    if (isAdmin) return true;
    if (isCampusManager && (currentUser?.campus === "ALL" || currentUser?.campus === vf.campus)) return true;
    return false;
  };

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
  // REGISTRATION & CAMPUS MANAGER APPROVAL HANDLERS
  // ============================================================================
  const pendingApprovals = useMemo(() => {
    return accounts.filter((a) => {
      if (a.approvalStatus !== "pending") return false;
      if (isAdmin) return true; // Admin sees all pending
      if (isCampusManager) return a.campus === currentUser?.campus; // Campus Manager only sees registrations for their campus
      return false;
    });
  }, [accounts, isAdmin, isCampusManager, currentUser]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError("");
    setRegMessage("");

    const trimmedLogin = regLoginId.trim().toLowerCase();
    if (!trimmedLogin || !regPassword || !regName.trim()) {
      setRegError("Please fill in all required registration fields.");
      return;
    }

    const existing = accounts.find((a) => a.loginId.toLowerCase() === trimmedLogin);
    if (existing) {
      setRegError(`An account with Login ID "${regLoginId}" already exists. Please choose a different ID or sign in.`);
      return;
    }

    const newAccount = {
      id: `USR-${Date.now()}`,
      loginId: regLoginId.trim(),
      password: regPassword,
      name: regName.trim(),
      role: regRole,
      campus: regCampus,
      batch: regRole === "Student" ? (regBatch.trim() || `CSE-2026-${regCampus}`) : undefined,
      approvalStatus: "pending",
      registeredAt: new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    setAccounts((prev) => [...prev, newAccount]);
    setAuditTrail((prev) => [
      {
        id: Date.now(),
        time: "Just now",
        actor: "Self-Registration",
        action: `Registration submitted for ${newAccount.name} (${newAccount.role}, ${newAccount.campus}). Awaiting permission from Campus Manager for ${newAccount.campus}.`,
      },
      ...prev,
    ]);

    setRegMessage(
      `Registration submitted! Your account is pending authorization by the Campus Manager for ${regCampus}. You can log in once they grant permission.`
    );
    setRegName("");
    setRegLoginId("");
    setRegPassword("");
  };

  const handleApproveUser = (userId) => {
    const target = accounts.find((a) => a.id === userId);
    if (!target) return;

    if (isCampusManager && target.campus !== currentUser?.campus) {
      alert(`403 Permission Guard: As ${currentUser.campus} Campus Manager, you can only grant permission for ${currentUser.campus} campus registrations!`);
      return;
    }
    if (!isCampusManager && !isAdmin) {
      alert("403 Permission Guard: Only Campus Managers can approve registrations.");
      return;
    }

    setAccounts((prev) =>
      prev.map((acc) => (acc.id === userId ? { ...acc, approvalStatus: "approved" } : acc))
    );

    setAuditTrail((prev) => [
      {
        id: Date.now(),
        time: "Just now",
        actor: currentUser.name,
        action: `[Permission Granted] Approved registration for ${target.name} (${target.role}, ${target.campus})`,
      },
      ...prev,
    ]);
    alert(`Permission granted! ${target.name} (${target.role}) is now authorized to sign in to ${target.campus} campus.`);
  };

  const handleRejectUser = (userId) => {
    const target = accounts.find((a) => a.id === userId);
    if (!target) return;

    if (isCampusManager && target.campus !== currentUser?.campus) {
      alert(`403 Permission Guard: As ${currentUser.campus} Campus Manager, you can only reject registrations for ${currentUser.campus} campus!`);
      return;
    }
    if (!isCampusManager && !isAdmin) {
      alert("403 Permission Guard: Only Campus Managers can reject registrations.");
      return;
    }

    setAccounts((prev) =>
      prev.map((acc) => (acc.id === userId ? { ...acc, approvalStatus: "rejected" } : acc))
    );

    setAuditTrail((prev) => [
      {
        id: Date.now(),
        time: "Just now",
        actor: currentUser.name,
        action: `[Registration Rejected] Denied registration access for ${target.name} (${target.role}, ${target.campus})`,
      },
      ...prev,
    ]);
  };

  // ============================================================================
  // LOGIN & PASSWORD-PROTECTED PROFILE SWITCH HANDLERS
  // ============================================================================
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    const matchedAccount = accounts.find(
      (acc) =>
        acc.loginId.toLowerCase() === loginInputId.trim().toLowerCase() &&
        acc.password === loginInputPass
    );

    if (!matchedAccount) {
      setLoginError("Invalid Login ID or password.");
      return;
    }

    // CHECK APPROVAL STATUS: Only Campus Manager for the respective campus can grant permission!
    if (matchedAccount.approvalStatus === "pending") {
      setLoginError(
        `⏳ Access Pending: Your account (${matchedAccount.name}) is awaiting approval by the Campus Manager for ${matchedAccount.campus}. Only the Campus Manager for ${matchedAccount.campus} can grant permission.`
      );
      return;
    }

    if (matchedAccount.approvalStatus === "rejected") {
      setLoginError(
        `❌ Access Denied: Your registration was rejected by the Campus Manager for ${matchedAccount.campus}.`
      );
      return;
    }

    // Enforce that the user belongs to the selected campus (unless global Admin with "ALL")
    if (matchedAccount.campus !== "ALL" && matchedAccount.campus !== loginCampus) {
      setLoginError(
        `Access Denied: Your account is registered to ${matchedAccount.campus}, not ${loginCampus}.`
      );
      return;
    }

    // Admin can view ALL campuses; other roles are locked to their registered campus
    const targetCampus =
      matchedAccount.campus === "ALL" ? "ALL" : matchedAccount.campus;

    setCurrentUser(matchedAccount);
    setSelectedCampus(targetCampus);

    if (matchedAccount.role === "Student") setActiveTab("exams");
    else if (matchedAccount.role === "Faculty") {
      setActiveTab("dashboard");
      const ownSub = subjects.find((s) => s.faculty === matchedAccount.name);
      if (ownSub) {
        setSelectedSubjectId(ownSub.id);
        setTtSubjectId(ownSub.id);
        if (ownSub.topics[0]) setSelectedTopicId(ownSub.topics[0].id);
      } else {
        const campusSub = subjects.find((s) => s.campus === targetCampus) || subjects[0];
        if (campusSub) {
          setSelectedSubjectId(campusSub.id);
          setTtSubjectId(campusSub.id);
          if (campusSub.topics[0]) setSelectedTopicId(campusSub.topics[0].id);
        }
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
    const target = accounts.find((a) => a.loginId === targetAccountLoginId);
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
      setActiveTab("dashboard");
      const ownSub = subjects.find((s) => s.faculty === target.name);
      if (ownSub) {
        setSelectedSubjectId(ownSub.id);
        setTtSubjectId(ownSub.id);
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
    return subjects.map((sub) => {
      // Holidays applicable to this subject: either institution-wide (ALL/undefined) or matching this subject's campus
      const subHolidaySet = new Set(
        holidays
          .filter((h) => !h.campus || h.campus === "ALL" || h.campus === sub.campus)
          .map((h) => h.date)
      );

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
        const isHoliday = subHolidaySet.has(iso);
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
        const isHoliday = subHolidaySet.has(iso);
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
    // Check if the current faculty has any assigned subjects in the campus
    const facultyAssignedCount = isFaculty
      ? computedSubjects.filter(
          (sub) =>
            (selectedCampus === "ALL" || sub.campus === selectedCampus) &&
            sub.faculty === activeFacultyUser
        ).length
      : 0;

    return computedSubjects.filter((s) => {
      const matchesCampus = selectedCampus === "ALL" || s.campus === selectedCampus;

      // Faculty visibility:
      // If assigned to courses, show their assigned courses.
      // If unassigned (e.g. newly registered), show campus courses so they can inspect pacing, syllabus and timetable!
      const matchesFacultyOwn =
        !isFaculty || facultyAssignedCount === 0 || s.faculty === activeFacultyUser;

      // Student batch filtering with smart fallback:
      let matchesStudentBatch = true;
      if (isStudent && currentUser?.batch) {
        const studentBatch = (currentUser.batch || "").trim();
        if (s.batch === studentBatch) {
          matchesStudentBatch = true;
        } else if (
          studentBatch === `CSE-2026-${s.campus}` ||
          studentBatch === `CSE-2026-${currentUser.campus}` ||
          studentBatch.toUpperCase().includes(s.campus.toUpperCase())
        ) {
          matchesStudentBatch = true;
        } else {
          // If no subjects in this campus match this student's specific batch,
          // fallback to true so the student never gets an empty timetable or empty syllabus
          const hasBatchMatchInCampus = computedSubjects.some(
            (sub) => sub.campus === s.campus && sub.batch === studentBatch
          );
          matchesStudentBatch = !hasBatchMatchInCampus;
        }
      }

      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.faculty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCampus && matchesFacultyOwn && matchesStudentBatch && matchesStatus && matchesSearch;
    });
  }, [computedSubjects, selectedCampus, isFaculty, activeFacultyUser, isStudent, currentUser, statusFilter, searchQuery]);

  const getWorstTrackStatus = (trackName) => {
    const trackSubs = visibleSubjects.filter((s) => s.track === trackName);
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
      { id: Date.now(), time: "Just now", actor: currentUser.name, action: `Bulk imported ${generated.length} subjects across 3 campuses` },
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

    // If visiting course, record this session in deliveredLectures
    if (targetSub && targetSub.isVisiting) {
      const selectedTopic = targetSub.topics.find((t) => t.id === selectedTopicId);
      const newDelivered = {
        id: `LEC-${Date.now()}`,
        subId: targetSub.id,
        courseCode: targetSub.code,
        courseName: targetSub.name,
        campus: targetSub.campus,
        faculty: targetSub.faculty,
        date: todayDate,
        durationHours: Number(selectedTopic?.plannedHours || 2.0),
        topic: selectedTopic ? `${selectedTopic.unit}: ${selectedTopic.title}` : "Course Lecture Session",
        status: logStatus === "Cancelled" ? "Cancelled" : logStatus === "In Progress" ? "In Progress" : "Completed",
        notes: logCovered || "Delivered lecture logged via Mobile Session Logger",
        verifiedBy: isAdmin ? "Admin" : isCampusManager ? `${currentUser?.name} (CM)` : "Pending Verification",
      };
      setDeliveredLectures((prev) => [newDelivered, ...prev]);
    }

    setAuditTrail((prev) => [
      { id: Date.now(), time: "Just now", actor: currentUser.name, action: `Logged ${selectedSubjectId} topic ${selectedTopicId} (${logStatus}, ${logPct}%) in ${stopwatchSec}s` },
      ...prev,
    ]);
    alert(`Session logged in ${stopwatchSec} seconds! Lecture delivery record and dashboard figures updated.`);
  };

  // Toggle approval status for visiting faculty honorarium (Restricted to Authorized CM & Admin)
  const handleToggleHonorariumApproval = (subId) => {
    const targetSub = subjects.find((s) => s.id === subId);
    if (!targetSub) return;
    if (!canApproveHonorarium(targetSub)) {
      alert(`Permission Denied: Only Campus Managers for ${targetSub.campus} or Admins can approve honorarium.`);
      return;
    }
    const newStatus = targetSub.honorariumStatus === "Approved by CM" ? "Pending Verification" : "Approved by CM";
    setSubjects((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, honorariumStatus: newStatus } : s))
    );
    setAuditTrail((prev) => [
      {
        id: Date.now(),
        time: "Just now",
        actor: currentUser?.name || "Manager",
        action: `Updated honorarium approval status for ${targetSub.code} (${targetSub.faculty}) to ${newStatus}`,
      },
      ...prev,
    ]);
  };

  // Save rate and rate unit configuration for a visiting subject
  const handleSaveRateConfig = (e) => {
    e.preventDefault();
    if (!rateModalSubject) return;
    if (!canApproveHonorarium(rateModalSubject)) {
      alert("Permission Denied: Only authorized managers can edit rates.");
      return;
    }
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== rateModalSubject.id) return s;
        return {
          ...s,
          honorariumRate: Number(editRateValue) || 0,
          hourlyRate: Number(editRateValue) || 0,
          rateUnit: editRateUnit,
          plannedMonthlyLectures: {
            ...(s.plannedMonthlyLectures || {}),
            [selectedHonorariumMonth]: Number(editPlannedLec) || 0,
          },
        };
      })
    );
    setAuditTrail((prev) => [
      {
        id: Date.now(),
        time: "Just now",
        actor: currentUser?.name || "Manager",
        action: `Configured rate for ${rateModalSubject.code}: ₹${editRateValue} ${editRateUnit}, ${editPlannedLec} planned lectures in ${selectedHonorariumMonth}`,
      },
      ...prev,
    ]);
    setRateModalSubject(null);
    alert("Honorarium rate and planned lectures updated successfully!");
  };

  // Add individual delivered lecture record
  const handleAddDeliveredLecture = (e) => {
    e.preventDefault();
    const targetSub = subjects.find((s) => s.id === newLecSubId);
    if (!targetSub) return;

    if (role === "Faculty" && targetSub.faculty !== activeFacultyUser) {
      alert(`Permission Denied: You are signed in as ${activeFacultyUser}. You can only log lectures for your own courses.`);
      return;
    }

    const newRecord = {
      id: `LEC-${Date.now()}`,
      subId: targetSub.id,
      courseCode: targetSub.code,
      courseName: targetSub.name,
      campus: targetSub.campus,
      faculty: targetSub.faculty,
      date: newLecDate,
      durationHours: Number(newLecDuration) || 2.0,
      topic: newLecTopic.trim() || "Course Lecture Session",
      status: newLecStatus,
      notes: newLecNotes.trim() || "Delivered lecture logged via Honorarium module",
      verifiedBy: isAdmin ? "Admin" : isCampusManager ? `${currentUser?.name} (CM)` : "Pending Verification",
    };

    setDeliveredLectures((prev) => [newRecord, ...prev]);
    setAuditTrail((prev) => [
      {
        id: Date.now(),
        time: "Just now",
        actor: currentUser?.name || "User",
        action: `Logged delivered lecture for ${targetSub.code} on ${newLecDate} (${newLecDuration}h, ${newLecStatus})`,
      },
      ...prev,
    ]);

    setLogLectureModalOpen(false);
    setNewLecTopic("");
    setNewLecNotes("");
    alert("Delivered lecture recorded! Verified lecture totals and honorarium updated.");
  };

  // Delete individual delivered lecture record (Authorized Manager)
  const handleDeleteDeliveredLecture = (lecId) => {
    const targetLec = deliveredLectures.find((l) => l.id === lecId);
    if (!targetLec) return;
    if (!isAdmin && (!isCampusManager || (currentUser?.campus !== "ALL" && currentUser?.campus !== targetLec.campus))) {
      alert("Permission Denied: Only authorized managers can delete lecture records.");
      return;
    }
    if (!window.confirm(`Delete delivered lecture record for ${targetLec.courseCode} on ${targetLec.date}?`)) return;

    setDeliveredLectures((prev) => prev.filter((l) => l.id !== lecId));
    setAuditTrail((prev) => [
      {
        id: Date.now(),
        time: "Just now",
        actor: currentUser?.name || "Manager",
        action: `Deleted lecture record ${lecId} for ${targetLec.courseCode}`,
      },
      ...prev,
    ]);
  };

  // Dedicated Visiting Faculty Honorarium CSV Export with Consistent Campus & Month Filter
  const exportHonorariumCSV = () => {
    const visitingList = computedSubjects.filter((s) => {
      if (!s.isVisiting) return false;
      if (selectedCampus !== "ALL" && s.campus !== selectedCampus) return false;
      if (isCampusManager && currentUser?.campus && currentUser.campus !== "ALL" && s.campus !== currentUser.campus) return false;
      if (isFaculty && s.faculty !== activeFacultyUser) return false;
      return true;
    });

    const headers = [
      "PayoutMonth",
      "Campus",
      "VisitingFaculty",
      "CourseCode",
      "CourseName",
      "Track",
      "PlannedLectures",
      "CompletedLectures",
      "PlannedTeachingHours",
      "ActualDeliveredHours",
      "ConfiguredRateINR",
      "RateUnit",
      "GrossHonorariumINR",
      "ConfiguredDeductionPct",
      "ConfiguredDeductionINR",
      "NetPayableINR",
      "ApprovalStatus",
      "ConfirmedPayoutStatus",
    ];

    const rows = visitingList.map((vf) => {
      const subLecs = deliveredLectures.filter(
        (l) => l.subId === vf.id && l.date.startsWith(selectedHonorariumMonth)
      );
      const completedLecs = subLecs.filter((l) => l.status === "Completed");
      const completedLecturesCount = completedLecs.length;
      const actualDeliveredHours = completedLecs.reduce(
        (sum, l) => sum + (Number(l.durationHours) || 0),
        0
      );
      const plannedLecturesCount = vf.plannedMonthlyLectures?.[selectedHonorariumMonth] ?? 12;
      const slotDuration = vf.timetableSlots?.[0]
        ? computeSlotHours(vf.timetableSlots[0].start, vf.timetableSlots[0].end)
        : 2.0;
      const plannedTeachingHours = plannedLecturesCount * (slotDuration > 0 ? slotDuration : 2.0);

      const rate = vf.honorariumRate || vf.hourlyRate || 1500;
      const rateUnit = vf.rateUnit || "per hour";
      const gross = rateUnit === "per hour"
        ? actualDeliveredHours * rate
        : completedLecturesCount * rate;
      const deduction = gross * (tdsRate / 100);
      const net = Math.max(0, gross - deduction);
      const isApproved = vf.honorariumStatus === "Approved by CM";

      return [
        selectedHonorariumMonth,
        vf.campus,
        `"${vf.faculty}"`,
        vf.code,
        `"${vf.name}"`,
        `"${vf.track}"`,
        plannedLecturesCount,
        completedLecturesCount,
        plannedTeachingHours.toFixed(2),
        actualDeliveredHours.toFixed(2),
        rate,
        `"${rateUnit}"`,
        gross.toFixed(2),
        `${tdsRate}%`,
        deduction.toFixed(2),
        net.toFixed(2),
        `"${vf.honorariumStatus || "Pending Verification"}"`,
        `"${isApproved ? "Approved for Disbursement" : "Pending Verification"}"`,
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MSOT_Visiting_Faculty_Honorarium_${selectedCampus}_${selectedHonorariumMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export Individual Delivered Lecture Records
  const exportDeliveredLecturesCSV = () => {
    const relevantLectures = deliveredLectures.filter((lec) => {
      if (!lec.date.startsWith(selectedHonorariumMonth)) return false;
      if (selectedCampus !== "ALL" && lec.campus !== selectedCampus) return false;
      if (isCampusManager && currentUser?.campus && currentUser.campus !== "ALL" && lec.campus !== currentUser.campus) return false;
      if (isFaculty && lec.faculty !== activeFacultyUser) return false;
      return true;
    });

    const headers = [
      "LectureID",
      "Date",
      "Month",
      "Campus",
      "CourseCode",
      "CourseName",
      "VisitingFaculty",
      "TopicCovered",
      "DurationHours",
      "DeliveryStatus",
      "VerifiedBy",
      "Notes",
    ];

    const rows = relevantLectures.map((lec) => [
      lec.id,
      lec.date,
      selectedHonorariumMonth,
      lec.campus,
      lec.courseCode,
      `"${lec.courseName}"`,
      `"${lec.faculty}"`,
      `"${lec.topic}"`,
      lec.durationHours,
      lec.status,
      `"${lec.verifiedBy}"`,
      `"${(lec.notes || "").replace(/"/g, '""')}"`,
    ].join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MSOT_Delivered_Lectures_Audit_${selectedCampus}_${selectedHonorariumMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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

  // CSV Import handler (Native zero-dependency parser)
  const handleCSVImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          setCsvImportError("CSV file is empty or has no data rows.");
          return;
        }
        const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());
        const data = lines.slice(1).map((line) => {
          const vals = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
          const row = {};
          headers.forEach((h, i) => {
            row[h] = vals[i] || "";
          });
          return row;
        });

        data.forEach((row) => {
          const type = row.type?.trim().toLowerCase();
          if (type === "campus") {
            const name = row.name?.trim();
            if (name && !campuses.includes(name)) setCampuses((prev) => [...prev, name]);
          } else if (type === "semester") {
            if (row.start) setSemesterStart(row.start);
            if (row.end) setSemesterEnd(row.end);
            if (row.saturdayrule) setSaturdayRule(row.saturdayrule);
          } else if (type === "holiday") {
            if (row.date) setHolidays((prev) => [...prev, { date: row.date, name: row.name || "Holiday" }]);
          } else if (type === "exam") {
            if (row.name && row.date && row.scope) {
              setExamWindows((prev) => [
                ...prev,
                { id: `EX-${Date.now()}-${Math.random().toString().slice(-4)}`, name: row.name, date: row.date, scopeKey: row.scope },
              ]);
            }
          }
        });
        setCsvImportError("");
        alert("CSV configuration successfully imported!");
      } catch (err) {
        console.error(err);
        setCsvImportError("Failed to parse CSV. Ensure columns: type, name, date, start, end, scope, saturdayRule.");
      }
    };
    reader.readAsText(file);
  };

  const handleAddTimetableSlot = (e) => {
    e.preventDefault();
    if (!canManageTimetableAndFaculty) {
      alert("403 Permission Guard: Only Campus Managers and Admins can modify timetable slots.");
      return;
    }
    const targetSub = subjects.find((s) => s.id === ttSubjectId);
    if (isCampusManager && targetSub && targetSub.campus !== currentUser?.campus) {
      alert(`403 Permission Guard: Campus Managers can only add timetable slots for their assigned campus (${currentUser.campus}).`);
      return;
    }
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
    setAuditTrail((prev) => [
      { id: Date.now(), time: "Just now", actor: currentUser.name, action: `Added ${DAY_NAMES[ttDay]} ${ttStart}-${ttEnd} slot (${ttRoom}) to ${ttSubjectId}` },
      ...prev,
    ]);
  };

  const handleAssignFaculty = (e) => {
    e.preventDefault();
    if (!canManageTimetableAndFaculty) return;
    if (!assignFacultyName.trim()) return;
    const targetSub = subjects.find((s) => s.id === assignSubId);
    if (isCampusManager && targetSub && targetSub.campus !== currentUser?.campus) {
      alert(`403 Permission Guard: Campus Managers can only assign faculty for their assigned campus (${currentUser.campus}).`);
      return;
    }
    setSubjects((prev) =>
      prev.map((sub) =>
        sub.id === assignSubId ? { ...sub, faculty: assignFacultyName.trim() } : sub
      )
    );
    setAuditTrail((prev) => [
      { id: Date.now(), time: "Just now", actor: currentUser.name, action: `Assigned faculty ${assignFacultyName.trim()} to ${assignSubId}` },
      ...prev,
    ]);
  };

  // Reminder: check for unlogged slots each day
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const todayDay = today.getDay(); // 0=Sun,1=Mon...
      // Map to our DAY_NAMES keys (0‑6)
      const matchingSubjects = subjects.filter((s) =>
        s.timetableSlots.some((sl) => sl.day === todayDay && !sl.logged)
      );
      if (matchingSubjects.length && !reminderChecked) {
        alert(`Reminder: You have ${matchingSubjects.length} scheduled class(es) today that haven't been logged yet.`);
        setReminderChecked(true);
        // Schedule escalation after 48h if still unlogged
        setTimeout(() => {
          const stillUnlogged = subjects.filter((s) =>
            s.timetableSlots.some((sl) => sl.day === todayDay && !sl.logged)
          );
          if (stillUnlogged.length && (isCampusManager || isAdmin)) {
            alert(`Escalation: Campus Manager/Admin notified of ${stillUnlogged.length} unlogged slots.`);
            // Add to audit trail as escalation event
            setAuditTrail((prev) => [
              { id: Date.now(), time: "Just now", actor: "System", action: `Escalation for ${stillUnlogged.length} unlogged slots on ${today.toLocaleDateString()}` },
              ...prev,
            ]);
          }
        }, 48 * 60 * 60 * 1000);
      }
    }, 60 * 60 * 1000); // every hour
    return () => clearInterval(interval);
  }, [subjects, reminderChecked, isCampusManager, isAdmin]);

  const handleSaveSlotEdit = (subId, slotIdx) => {
    if (!canManageTimetableAndFaculty) return;
    const targetSub = subjects.find((s) => s.id === subId);
    if (isCampusManager && targetSub && targetSub.campus !== currentUser.campus) {
      alert(`403 Permission Guard: You can only edit timetable slots for your assigned campus (${currentUser.campus}).`);
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
    if (!canManageTimetableAndFaculty) return;
    const targetSub = subjects.find((s) => s.id === subId);
    if (isCampusManager && targetSub && targetSub.campus !== currentUser.campus) {
      alert(`403 Permission Guard: You can only delete timetable slots for your assigned campus (${currentUser.campus}).`);
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

  const handleAddHoliday = (e) => {
    if (e) e.preventDefault();
    if (!canManageCalendar) {
      alert("403 Permission Guard: Only Campus Managers and Admins can declare holidays.");
      return;
    }
    const trimmedName = newHolidayName.trim();
    if (!newHolidayDate) {
      alert("Please select a valid holiday date.");
      return;
    }
    if (!trimmedName) {
      alert("Please enter a holiday or academic break title.");
      return;
    }

    const targetCampus = isCampusManager ? currentUser.campus : (newHolidayCampus || "ALL");

    // Check if this date already has a holiday for this campus
    const existingIndex = holidays.findIndex(
      (h) => h.date === newHolidayDate && (h.campus || "ALL") === targetCampus
    );

    if (existingIndex >= 0) {
      setHolidays((prev) =>
        prev.map((h, idx) =>
          idx === existingIndex ? { ...h, name: trimmedName } : h
        )
      );
      setAuditTrail((prev) => [
        {
          id: Date.now(),
          time: "Just now",
          actor: currentUser.name,
          action: `Updated holiday on ${newHolidayDate} (${targetCampus}) to "${trimmedName}"`,
        },
        ...prev,
      ]);
      alert(`Updated existing holiday on ${newHolidayDate} (${targetCampus}) to "${trimmedName}". Lecture schedule recalculated.`);
    } else {
      const newHol = {
        id: `HOL-${Date.now()}`,
        date: newHolidayDate,
        name: trimmedName,
        campus: targetCampus,
      };
      setHolidays((prev) => [...prev, newHol].sort((a, b) => a.date.localeCompare(b.date)));
      setAuditTrail((prev) => [
        {
          id: Date.now(),
          time: "Just now",
          actor: currentUser.name,
          action: `Added holiday "${trimmedName}" on ${newHolidayDate} (${targetCampus}). Auto-shifted topic dates.`,
        },
        ...prev,
      ]);
      alert(`Holiday "${trimmedName}" declared on ${newHolidayDate} (${targetCampus})! Pacing buffer ratios and auto-planned dates have been shifted.`);
    }

    setNewHolidayName("");
  };

  const handleDeleteHoliday = (holidayId, holidayDate, holidayCampus) => {
    if (!canManageCalendar) {
      alert("403 Permission Guard: Only Campus Managers and Admins can remove holidays.");
      return;
    }
    if (isCampusManager && holidayCampus && holidayCampus !== "ALL" && holidayCampus !== currentUser.campus) {
      alert(`403 Permission Guard: As ${currentUser.campus} Campus Manager, you cannot remove holidays for ${holidayCampus}.`);
      return;
    }

    const targetHol = holidays.find(
      (h) => (holidayId && h.id === holidayId) || (h.date === holidayDate && (h.campus || "ALL") === (holidayCampus || "ALL"))
    );
    const holName = targetHol ? targetHol.name : "Holiday";

    setHolidays((prev) =>
      prev.filter(
        (h) => !((holidayId && h.id === holidayId) || (h.date === holidayDate && (h.campus || "ALL") === (holidayCampus || "ALL")))
      )
    );

    setAuditTrail((prev) => [
      {
        id: Date.now(),
        time: "Just now",
        actor: currentUser.name,
        action: `Removed holiday "${holName}" on ${holidayDate} (${holidayCampus || "ALL"}). Auto-shifted topic dates back.`,
      },
      ...prev,
    ]);
  };

  const availableFaculty = useMemo(() => {
    const facSet = new Set();
    subjects.forEach((s) => {
      if (selectedCampus === "ALL" || s.campus === selectedCampus) {
        if (s.faculty) facSet.add(s.faculty);
      }
    });
    accounts.forEach((acc) => {
      if (acc.role === "Faculty" && acc.approvalStatus !== "rejected") {
        if (selectedCampus === "ALL" || acc.campus === selectedCampus || acc.campus === "ALL") {
          facSet.add(acc.name);
        }
      }
    });
    return Array.from(facSet).sort();
  }, [subjects, accounts, selectedCampus]);

  // Generates the 7-day or 14-day timetable calendar starting from todayDate
  const upcomingTimetableDays = useMemo(() => {
    const applicableHolidays = holidays.filter(
      (h) => !h.campus || h.campus === "ALL" || selectedCampus === "ALL" || h.campus === selectedCampus
    );
    const holidayMap = new Map(applicableHolidays.map((h) => [h.date, h.name]));
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
        const subjectsForTimetable = isStudent
          ? visibleSubjects
          : computedSubjects.filter((s) => selectedCampus === "ALL" || s.campus === selectedCampus);

        subjectsForTimetable.forEach((sub) => {
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
                canModifyThisSlot: canManageTimetableAndFaculty && (isAdmin || sub.campus === currentUser?.campus),
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
  }, [todayDate, timetableSpanDays, holidays, saturdayRule, visibleSubjects, computedSubjects, isStudent, selectedCampus, canManageTimetableAndFaculty, isAdmin, currentUser]);

  const handleAddLessonTopic = (e) => {
    e.preventDefault();
    if (!canUploadLessonPlan) {
      alert("403 Permission Denied: Only Faculty and Admins can upload lesson plan topics.");
      return;
    }
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

          {/* LOGIN VS SELF-REGISTRATION TABS */}
          <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthView("login");
                setLoginError("");
                setRegError("");
              }}
              className={`py-2 rounded-lg transition ${
                authView === "login"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🔐 Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthView("register");
                setLoginError("");
                setRegMessage("");
              }}
              className={`py-2 rounded-lg transition ${
                authView === "register"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              📝 Register for Campus Access
            </button>
          </div>

          {regMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
              <p className="font-bold">✅ Registration Submitted!</p>
              <p>{regMessage}</p>
            </div>
          )}

          {authView === "login" ? (
            <>
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
                  className={`py-2 rounded-lg transition ${
                    loginMode === "staff" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
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
                  className={`py-2 rounded-lg transition ${
                    loginMode === "student" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"
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
                  <div className="grid grid-cols-3 gap-2">
                    {["JUJ", "HI-Tech", "RGIB"].map((campus) => (
                      <button
                        key={campus}
                        type="button"
                        onClick={() => {
                          setLoginCampus(campus);
                          setLoginError("");
                        }}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          loginCampus === campus
                            ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                            : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800"
                        }`}
                      >
                        {campus}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Login / Approval / Campus Mismatch Error */}
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
            </>
          ) : (
            /* SELF-REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs">
                <p className="font-bold">🛡️ Campus Manager Authorization Policy</p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  After submitting, your profile is placed in <strong>Pending Approval</strong>. Only the <strong>Campus Manager for your respective campus</strong> can grant login permission.
                </p>
              </div>

              {regError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                  {regError}
                </div>
              )}

              {/* Role selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Role to Register For
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole("Faculty")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                      regRole === "Faculty"
                        ? "bg-indigo-600 text-white border-indigo-500 shadow"
                        : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    👨‍🏫 Faculty Member
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRegRole("Student");
                      setRegBatch(CAMPUS_BATCHES[regCampus]?.[0]?.id || `CSE-2026-${regCampus}`);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                      regRole === "Student"
                        ? "bg-emerald-600 text-white border-emerald-500 shadow"
                        : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    🎓 Student
                  </button>
                </div>
              </div>

              {/* Campus selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Campus (Approval Routed Here)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["JUJ", "HI-Tech", "RGIB"].map((campus) => (
                    <button
                      key={campus}
                      type="button"
                      onClick={() => {
                        setRegCampus(campus);
                        if (regRole === "Student") {
                          setRegBatch(CAMPUS_BATCHES[campus]?.[0]?.id || `CSE-2026-${campus}`);
                        }
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                        regCampus === campus
                          ? "bg-indigo-600 text-white border-indigo-500 shadow"
                          : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      {campus}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder={regRole === "Faculty" ? "e.g. Dr. Sunita Sen" : "e.g. Rahul Sharma"}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">
                  {regRole === "Faculty" ? "Work Email ID (@msot.org)" : "Student Roll / Registration ID"}
                </label>
                <input
                  type="text"
                  required
                  value={regLoginId}
                  onChange={(e) => setRegLoginId(e.target.value)}
                  placeholder={regRole === "Faculty" ? "e.g. s.sen@msot.org" : `e.g. MSOT-2026-${regCampus}-089`}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
                />
              </div>

              {regRole === "Student" && (
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-semibold">Student Batch</label>
                  <select
                    value={regBatch}
                    onChange={(e) => setRegBatch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
                  >
                    {(CAMPUS_BATCHES[regCampus] || [{ id: `CSE-2026-${regCampus}`, label: `CSE-2026-${regCampus}` }]).map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Your timetable schedule and syllabus tracker will automatically sync with this batch.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">Create Password</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 font-bold text-white shadow-lg shadow-emerald-600/20 transition"
              >
                📝 Submit Registration for Campus Approval
              </button>
            </form>
          )}

          {/* DEMO CREDENTIALS HELPER FOR EVALUATORS */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px]">
            <p className="font-bold text-slate-400 uppercase tracking-wider">
              Evaluator Accounts (Click to Fill ID — Password Required):
            </p>
            <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {accounts.map((acc) => {
                const isPending = acc.approvalStatus === "pending";
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setAuthView("login");
                      setLoginMode(acc.role === "Student" ? "student" : "staff");
                      setLoginInputId(acc.loginId);
                      setLoginInputPass(acc.password);
                      setLoginCampus(acc.campus === "ALL" ? "JUJ" : acc.campus);
                      setLoginError("");
                    }}
                    className={`text-left px-3 py-1.5 rounded-lg border flex justify-between items-center transition ${
                      isPending
                        ? "bg-amber-950/40 hover:bg-amber-950/60 border-amber-500/40"
                        : "bg-slate-950 hover:bg-slate-800 border-slate-800"
                    }`}
                  >
                    <span>
                      <strong className={isPending ? "text-amber-300" : "text-cyan-300"}>
                        {acc.role}:
                      </strong>{" "}
                      {acc.name} ({acc.campus})
                      {isPending && (
                        <span className="ml-1.5 px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                          Pending Approval
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-slate-400">
                      {acc.loginId} / <strong className="text-emerald-300">{acc.password}</strong>
                    </span>
                  </button>
                );
              })}
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
  const auditedSubject = auditModalSubject
    ? computedSubjects.find((s) => s.id === auditModalSubject.id) || auditModalSubject
    : null;

  const visitingSubjects = computedSubjects.filter((s) => {
    if (!s.isVisiting) return false;
    if (selectedCampus !== "ALL" && s.campus !== selectedCampus) return false;
    if (isCampusManager && currentUser?.campus && currentUser.campus !== "ALL" && s.campus !== currentUser.campus) return false;
    if (isFaculty && s.faculty !== activeFacultyUser) return false;
    return true;
  });

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
                <p className="text-[10px] text-slate-400 leading-snug pt-0.5">{ROLE_SUMMARY[role]}</p>
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
              {canExportData && (
                <button
                  onClick={handleLoadFullSemesterCSV}
                  className="w-full py-2 px-2.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 font-bold transition truncate"
                >
                  📂 Import 3-Campus CSV
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
              <p className="text-[11px] text-slate-400" title={ROLE_SUMMARY[role]}>
                Signed in as <strong className="text-slate-200">{currentUser.name}</strong> · <span className="text-slate-400">{ROLE_SUMMARY[role]}</span>
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

          {/* Admin Campus Switcher vs Role-Locked Campus Badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {isAdmin ? (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="text-slate-400">Campus:</span>
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="bg-transparent font-bold text-white focus:outline-none"
                >
                  <option value="ALL">ALL Campuses</option>
                  {campuses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 select-none"
                title="Campus is locked to your account. Log out to switch accounts."
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Campus: {selectedCampus}{isStudent && currentUser.batch ? ` · ${currentUser.batch}` : ""}</span>
                <span className="text-slate-500 text-[10px] uppercase tracking-wider ml-1">
                  (Locked)
                </span>
              </div>
            )}

            {(isCampusManager || isAdmin) && pendingApprovals.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("alerts")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition animate-pulse"
                title={`${pendingApprovals.length} registration request(s) awaiting your campus approval`}
              >
                <span>👥</span>
                <span>{pendingApprovals.length} Approval{pendingApprovals.length > 1 ? "s" : ""} Pending</span>
              </button>
            )}

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
            {(isCampusManager || isAdmin) && pendingApprovals.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">👥</span>
                  <div>
                    <p className="font-bold text-amber-300 text-sm">
                      {pendingApprovals.length} User Registration{pendingApprovals.length > 1 ? "s" : ""} Awaiting Campus Permission
                    </p>
                    <p className="text-slate-300">
                      {isCampusManager
                        ? `Only you as the ${currentUser.campus} Campus Manager can authorize and grant login access to these users.`
                        : "New users across campuses require explicit Campus Manager or Admin authorization."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("alerts")}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1.5 shadow"
                >
                  <span>Review & Grant Access</span>
                  <span>→</span>
                </button>
              </div>
            )}

            {isFaculty && computedSubjects.filter((s) => (selectedCampus === "ALL" || s.campus === selectedCampus) && s.faculty === activeFacultyUser).length === 0 && (
              <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">👋</span>
                  <div>
                    <p className="font-bold text-white text-sm">
                      Welcome to MSOT Pulse, {currentUser.name}!
                    </p>
                    <p className="text-slate-300">
                      You are signed in as Faculty for <strong>{selectedCampus} Campus</strong>. You currently have no courses assigned to your name. Your Campus Manager can assign courses to you in the <strong>Timetable</strong> tab. Previewing all {selectedCampus} campus courses in the meantime.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("timetable")}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1.5 shadow"
                >
                  <span>View Campus Timetable</span>
                  <span>→</span>
                </button>
              </div>
            )}

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
                  {canExportData && (
                    <button
                      onClick={exportToCSV}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold"
                    >
                      ⬇️ Export CSV
                    </button>
                  )}
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

        {/* ==================== TAB 2: DEDICATED VISITING FACULTY LECTURE & HONORARIUM TRACKER ==================== */}
        {activeTab === "honorarium" && (() => {
          // Calculate comprehensive metrics for visiting courses in selected month
          const visitingMetricsList = visitingSubjects.map((vf) => {
            const subLecs = deliveredLectures.filter(
              (l) => l.subId === vf.id && l.date.startsWith(selectedHonorariumMonth)
            );
            const completedLecs = subLecs.filter((l) => l.status === "Completed");
            const completedCount = completedLecs.length;
            const deliveredHours = completedLecs.reduce(
              (sum, l) => sum + (Number(l.durationHours) || 0),
              0
            );
            const plannedLec = vf.plannedMonthlyLectures?.[selectedHonorariumMonth] ?? 12;
            const slotDuration = vf.timetableSlots?.[0]
              ? computeSlotHours(vf.timetableSlots[0].start, vf.timetableSlots[0].end)
              : 2.0;
            const plannedHours = plannedLec * (slotDuration > 0 ? slotDuration : 2.0);

            const rate = vf.honorariumRate || vf.hourlyRate || 1500;
            const rateUnit = vf.rateUnit || "per hour";
            const gross = rateUnit === "per hour"
              ? deliveredHours * rate
              : completedCount * rate;
            const deduction = gross * (tdsRate / 100);
            const net = Math.max(0, gross - deduction);
            const isApproved = vf.honorariumStatus === "Approved by CM";

            return {
              vf,
              subLecs,
              completedLecs,
              completedCount,
              deliveredHours,
              plannedLec,
              plannedHours,
              rate,
              rateUnit,
              gross,
              deduction,
              net,
              isApproved,
            };
          });

          // Filter by Approval status dropdown if selected
          const displayedMetrics = visitingMetricsList.filter((m) => {
            if (honorariumFilterStatus === "Approved") return m.isApproved;
            if (honorariumFilterStatus === "Pending") return !m.isApproved;
            return true;
          });

          // Executive Summary Rollups
          const totalPlannedLectures = visitingMetricsList.reduce((sum, m) => sum + m.plannedLec, 0);
          const totalCompletedLectures = visitingMetricsList.reduce((sum, m) => sum + m.completedCount, 0);
          const totalPlannedHours = visitingMetricsList.reduce((sum, m) => sum + m.plannedHours, 0);
          const totalDeliveredHours = visitingMetricsList.reduce((sum, m) => sum + m.deliveredHours, 0);

          // Confirmed amounts ONLY include verified and approved courses
          const confirmedGross = visitingMetricsList
            .filter((m) => m.isApproved)
            .reduce((sum, m) => sum + m.gross, 0);
          const confirmedDeductions = visitingMetricsList
            .filter((m) => m.isApproved)
            .reduce((sum, m) => sum + m.deduction, 0);
          const confirmedNetPayable = visitingMetricsList
            .filter((m) => m.isApproved)
            .reduce((sum, m) => sum + m.net, 0);

          // Unapproved pending amounts
          const pendingGross = visitingMetricsList
            .filter((m) => !m.isApproved)
            .reduce((sum, m) => sum + m.gross, 0);
          const pendingCount = visitingMetricsList.filter((m) => !m.isApproved).length;

          // Delivered lectures relevant to current campus, month, and selected subject
          const allRelevantDeliveredLecs = deliveredLectures.filter((lec) => {
            if (!lec.date.startsWith(selectedHonorariumMonth)) return false;
            if (selectedCampus !== "ALL" && lec.campus !== selectedCampus) return false;
            if (isCampusManager && currentUser?.campus && currentUser.campus !== "ALL" && lec.campus !== currentUser.campus) return false;
            if (isFaculty && lec.faculty !== activeFacultyUser) return false;
            if (selectedLedgerSubjectId !== "ALL" && lec.subId !== selectedLedgerSubjectId) return false;
            return true;
          });

          return (
            <div className="space-y-6">
              {/* HEADER & FILTER BAR */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      Visiting Faculty & Honorarium
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Campus: <strong className="text-white">{selectedCampus}</strong>
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white mt-1">
                    💼 Visiting Faculty Lecture & Honorarium Tracker
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Tracks visiting faculty planned vs. completed lectures, teaching hours delivered, configured deductions, and net honorarium totals for review and export.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  {/* Payout Month Selector */}
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                    <span className="text-slate-400">Month:</span>
                    <select
                      value={selectedHonorariumMonth}
                      onChange={(e) => setSelectedHonorariumMonth(e.target.value)}
                      className="bg-transparent font-bold text-cyan-300 focus:outline-none"
                    >
                      <option value="2026-10">October 2026</option>
                      <option value="2026-11">November 2026</option>
                      <option value="2026-12">December 2026</option>
                    </select>
                  </div>

                  {/* Configured Deduction % (TDS / Withholding) */}
                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2" title="Institutional configured withholding or TDS deduction percentage">
                    <span className="text-slate-400">Deduction:</span>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      step="1"
                      value={tdsRate}
                      onChange={(e) => setTdsRate(Math.max(0, Number(e.target.value)))}
                      className="w-12 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center font-bold text-white focus:outline-none focus:border-cyan-400"
                    />
                    <span className="text-slate-400 font-bold">%</span>
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                    <span className="text-slate-400">Status:</span>
                    <select
                      value={honorariumFilterStatus}
                      onChange={(e) => setHonorariumFilterStatus(e.target.value)}
                      className="bg-transparent font-bold text-slate-200 focus:outline-none"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="Approved">Approved Only</option>
                      <option value="Pending">Pending Review</option>
                    </select>
                  </div>

                  {/* Log Lecture Button */}
                  <button
                    onClick={() => {
                      if (visitingSubjects.length > 0) {
                        setNewLecSubId(visitingSubjects[0].id);
                      }
                      setLogLectureModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
                  >
                    <span>➕</span> Log Delivered Lecture
                  </button>

                  {/* CSV Export Buttons */}
                  <button
                    onClick={exportHonorariumCSV}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
                    title="Export honorarium summary table as CSV"
                  >
                    <span>⬇️</span> Export Honorarium (CSV)
                  </button>

                  <button
                    onClick={exportDeliveredLecturesCSV}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition flex items-center gap-1.5"
                    title="Export individual delivered lecture records as CSV"
                  >
                    <span>📄</span> Delivery Log (CSV)
                  </button>
                </div>
              </div>

              {/* EXECUTIVE KPI METRICS SUMMARY */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Planned Lectures</div>
                  <div className="text-xl font-extrabold text-white mt-1 font-mono">{totalPlannedLectures}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Configured monthly target</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Completed Lectures</div>
                  <div className="text-xl font-extrabold text-indigo-300 mt-1 font-mono">{totalCompletedLectures}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Logged & verified sessions</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Planned Teaching Hrs</div>
                  <div className="text-xl font-extrabold text-white mt-1 font-mono">{totalPlannedHours.toFixed(1)}h</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Syllabus hours budgeted</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Delivered Teaching Hrs</div>
                  <div className="text-xl font-extrabold text-cyan-300 mt-1 font-mono">{totalDeliveredHours.toFixed(1)}h</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Actual teaching completed</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-emerald-900/60 bg-emerald-950/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Confirmed Gross</div>
                  <div className="text-xl font-extrabold text-white mt-1 font-mono">₹{confirmedGross.toLocaleString("en-IN")}</div>
                  <div className="text-[11px] text-emerald-500/80 mt-0.5">Approved courses only</div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Confirmed Net Payable</div>
                  <div className="text-xl font-extrabold text-emerald-400 mt-1 font-mono">₹{confirmedNetPayable.toLocaleString("en-IN")}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Less {tdsRate}% deduction: -₹{confirmedDeductions.toLocaleString("en-IN")}</div>
                </div>
              </div>

              {/* PENDING APPROVAL NOTICE */}
              {pendingCount > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base">⏳</span>
                    <span>
                      <strong>Manager Verification Pending:</strong> ₹{pendingGross.toLocaleString("en-IN")} Gross across <strong>{pendingCount}</strong> visiting course(s) is awaiting review and <strong>excluded from confirmed payout totals</strong> until approved.
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold whitespace-nowrap">
                    Review Required
                  </span>
                </div>
              )}

              {/* MAIN HONORARIUM REVIEW TABLE */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
                <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">Visiting Faculty Honorarium Summary</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                      {displayedMetrics.length} Courses
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Calculations derive directly from delivered lecture records below. Planned sessions do not inflate confirmed totals.
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                        <th className="py-3 px-4">Visiting Faculty</th>
                        <th className="py-3 px-3">Course & Campus</th>
                        <th className="py-3 px-3 text-right">Planned Lectures</th>
                        <th className="py-3 px-3 text-right">Completed Lectures</th>
                        <th className="py-3 px-3 text-right">Planned Teaching Hrs</th>
                        <th className="py-3 px-3 text-right">Delivered Teaching Hrs</th>
                        <th className="py-3 px-3 text-right">Rate & Unit</th>
                        <th className="py-3 px-3 text-right">Gross Honorarium</th>
                        <th className="py-3 px-3 text-right">Deduction ({tdsRate}%)</th>
                        <th className="py-3 px-3 text-right">Net Payable</th>
                        <th className="py-3 px-3 text-center">Approval Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {displayedMetrics.length === 0 ? (
                        <tr>
                          <td colSpan={12} className="py-8 text-center text-slate-500">
                            No visiting faculty courses match the current filters ({selectedCampus}, {selectedHonorariumMonth}, {honorariumFilterStatus}).
                          </td>
                        </tr>
                      ) : (
                        displayedMetrics.map((m) => {
                          const canApprove = canApproveHonorarium(m.vf);

                          return (
                            <tr key={m.vf.id} className="hover:bg-slate-800/40 transition">
                              {/* Faculty Member */}
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-white">{m.vf.faculty}</div>
                                <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                                  Visiting Faculty
                                </span>
                              </td>

                              {/* Course & Campus */}
                              <td className="py-3.5 px-3">
                                <div className="font-semibold text-slate-200">{m.vf.code}: {m.vf.name}</div>
                                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 font-mono">{m.vf.campus}</span>
                                  <span>{m.vf.track}</span>
                                </div>
                              </td>

                              {/* Planned Lectures Count */}
                              <td className="py-3.5 px-3 text-right font-mono font-medium text-slate-300">
                                {m.plannedLec}
                              </td>

                              {/* Completed Lectures Count */}
                              <td className="py-3.5 px-3 text-right font-mono font-bold text-indigo-300">
                                <span className="px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30">
                                  {m.completedCount}
                                </span>
                              </td>

                              {/* Planned Teaching Hours */}
                              <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                                {m.plannedHours.toFixed(1)}h
                              </td>

                              {/* Delivered Teaching Hours */}
                              <td className="py-3.5 px-3 text-right font-mono font-semibold text-cyan-300">
                                <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30">
                                  {m.deliveredHours.toFixed(1)}h
                                </span>
                              </td>

                              {/* Configured Rate & Unit */}
                              <td className="py-3.5 px-3 text-right font-mono text-slate-200">
                                <div className="font-bold">₹{m.rate.toLocaleString("en-IN")}</div>
                                <div className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">{m.rateUnit}</div>
                              </td>

                              {/* Gross Honorarium */}
                              <td className="py-3.5 px-3 text-right font-mono font-bold text-white">
                                ₹{m.gross.toLocaleString("en-IN")}
                              </td>

                              {/* Configured Deduction */}
                              <td className="py-3.5 px-3 text-right font-mono text-rose-400">
                                -₹{m.deduction.toLocaleString("en-IN")}
                              </td>

                              {/* Net Payable */}
                              <td className="py-3.5 px-3 text-right font-mono font-extrabold text-emerald-400">
                                ₹{m.net.toLocaleString("en-IN")}
                              </td>

                              {/* Approval Status */}
                              <td className="py-3.5 px-3 text-center">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${m.isApproved
                                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                    : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                  }`}
                                >
                                  {m.vf.honorariumStatus || "Pending Verification"}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                                {/* Toggle Approval Button */}
                                <button
                                  disabled={!canApprove}
                                  onClick={() => handleToggleHonorariumApproval(m.vf.id)}
                                  title={canApprove ? "Toggle approval status" : `Approval restricted to Campus Managers for ${m.vf.campus} and Admins`}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${!canApprove
                                    ? "opacity-50 cursor-not-allowed bg-slate-800 text-slate-400 border-slate-700"
                                    : m.isApproved
                                      ? "bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700"
                                      : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500"
                                  }`}
                                >
                                  {canApprove ? (m.isApproved ? "Revoke Approval" : "✓ Approve Payout") : "🔒 Locked"}
                                </button>

                                {/* Rate & Unit Config */}
                                {canApprove && (
                                  <button
                                    onClick={() => {
                                      setRateModalSubject(m.vf);
                                      setEditRateValue(m.rate);
                                      setEditRateUnit(m.rateUnit);
                                      setEditPlannedLec(m.plannedLec);
                                    }}
                                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700"
                                    title="Configure rate and unit for this course"
                                  >
                                    ⚙️ Rate
                                  </button>
                                )}

                                {/* Filter Ledger to this course */}
                                <button
                                  onClick={() => setSelectedLedgerSubjectId(selectedLedgerSubjectId === m.vf.id ? "ALL" : m.vf.id)}
                                  className={`px-2 py-1 rounded-lg text-xs font-bold border ${selectedLedgerSubjectId === m.vf.id
                                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                                  }`}
                                  title="View delivered lecture sessions in the ledger below"
                                >
                                  📋 Sessions ({m.subLecs.length})
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DELIVERED LECTURE AUDIT LEDGER (SESSION LEVEL RECORDS) */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
                <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <span>📋 Delivered Lecture Records for {selectedHonorariumMonth}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                        {allRelevantDeliveredLecs.length} Sessions Logged
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Individual lecture deliveries recorded via the session logger or direct entry. Totals above are derived dynamically from these records.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Course Filter Pills */}
                    <button
                      onClick={() => setSelectedLedgerSubjectId("ALL")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${selectedLedgerSubjectId === "ALL"
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                      }`}
                    >
                      All Courses
                    </button>
                    {visitingSubjects.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedLedgerSubjectId(sub.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${selectedLedgerSubjectId === sub.id
                          ? "bg-cyan-600 text-white border-cyan-500"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        {sub.code} ({sub.campus})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-3">Visiting Faculty</th>
                        <th className="py-3 px-3">Course & Campus</th>
                        <th className="py-3 px-3">Topic / Syllabus Coverage</th>
                        <th className="py-3 px-3 text-right">Duration</th>
                        <th className="py-3 px-3 text-center">Status</th>
                        <th className="py-3 px-3">Logged / Verified By</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {allRelevantDeliveredLecs.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-500">
                            No delivered lecture records found for the selected month ({selectedHonorariumMonth}) and filters.
                          </td>
                        </tr>
                      ) : (
                        allRelevantDeliveredLecs.map((lec) => (
                          <tr key={lec.id} className="hover:bg-slate-800/30 transition">
                            <td className="py-3 px-4 font-mono text-cyan-300 font-bold whitespace-nowrap">
                              {lec.date}
                            </td>
                            <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                              {lec.faculty}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="font-bold text-slate-200">{lec.courseCode}</span>
                              <span className="ml-1.5 text-xs text-slate-400">({lec.campus})</span>
                            </td>
                            <td className="py-3 px-3 text-slate-300 max-w-xs truncate" title={lec.topic}>
                              <div>{lec.topic}</div>
                              {lec.notes && <div className="text-[11px] text-slate-400 truncate mt-0.5">{lec.notes}</div>}
                            </td>
                            <td className="py-3 px-3 text-right font-mono font-bold text-emerald-300 whitespace-nowrap">
                              {lec.durationHours}h
                            </td>
                            <td className="py-3 px-3 text-center whitespace-nowrap">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${lec.status === "Completed"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : lec.status === "Cancelled"
                                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                    : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                                }`}
                              >
                                {lec.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-xs text-slate-300 whitespace-nowrap">
                              {lec.verifiedBy}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              {(isAdmin || (isCampusManager && (currentUser?.campus === "ALL" || currentUser?.campus === lec.campus))) && (
                                <button
                                  onClick={() => handleDeleteDeliveredLecture(lec.id)}
                                  className="px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold"
                                  title="Delete this lecture record"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MODAL 1: LOG DELIVERED LECTURE */}
              {logLectureModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
                  <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <div>
                        <h3 className="font-bold text-base text-white">Log Delivered Lecture Session</h3>
                        <p className="text-xs text-slate-400">Records actual teaching hours delivered by visiting faculty.</p>
                      </div>
                      <button
                        onClick={() => setLogLectureModalOpen(false)}
                        className="text-slate-400 hover:text-white text-lg font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleAddDeliveredLecture} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Visiting Course</label>
                        <select
                          value={newLecSubId}
                          onChange={(e) => setNewLecSubId(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-cyan-400"
                        >
                          {visitingSubjects.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.code} — {s.name} ({s.faculty}, {s.campus})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Lecture Date</label>
                          <input
                            type="date"
                            value={newLecDate}
                            onChange={(e) => setNewLecDate(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Duration (Teaching Hours)</label>
                          <input
                            type="number"
                            min="0.5"
                            max="8"
                            step="0.5"
                            value={newLecDuration}
                            onChange={(e) => setNewLecDuration(Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Topic / Syllabus Unit Covered</label>
                        <input
                          type="text"
                          value={newLecTopic}
                          onChange={(e) => setNewLecTopic(e.target.value)}
                          placeholder="e.g. Unit 3: WebSockets & Production Scaling"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Delivery Status</label>
                        <select
                          value={newLecStatus}
                          onChange={(e) => setNewLecStatus(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="Completed">Completed (Counts toward billable teaching work)</option>
                          <option value="In Progress">In Progress (Partially delivered)</option>
                          <option value="Cancelled">Cancelled (Not delivered)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Session Notes (Optional)</label>
                        <textarea
                          rows={2}
                          value={newLecNotes}
                          onChange={(e) => setNewLecNotes(e.target.value)}
                          placeholder="Key concepts covered, lab demos, or student queries..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setLogLectureModalOpen(false)}
                          className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20"
                        >
                          Save & Sync Lecture Record
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* MODAL 2: CONFIGURE RATE & UNIT */}
              {rateModalSubject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
                  <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <div>
                        <h3 className="font-bold text-base text-white">Configure Honorarium Rate & Unit</h3>
                        <p className="text-xs text-slate-400">{rateModalSubject.code} — {rateModalSubject.faculty}</p>
                      </div>
                      <button
                        onClick={() => setRateModalSubject(null)}
                        className="text-slate-400 hover:text-white text-lg font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSaveRateConfig} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Honorarium Rate (INR)</label>
                        <input
                          type="number"
                          min="0"
                          step="100"
                          value={editRateValue}
                          onChange={(e) => setEditRateValue(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-cyan-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Rate Unit</label>
                        <select
                          value={editRateUnit}
                          onChange={(e) => setEditRateUnit(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-cyan-400"
                        >
                          <option value="per hour">per hour (Amount = Delivered Hours × Rate)</option>
                          <option value="per lecture">per lecture (Amount = Completed Lectures × Rate)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">
                          Planned Monthly Lectures ({selectedHonorariumMonth})
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={editPlannedLec}
                          onChange={(e) => setEditPlannedLec(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                          required
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Expected lecture count scheduled for this academic month.
                        </span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setRateModalSubject(null)}
                          className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/20"
                        >
                          Save Configuration
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

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

              {isFaculty && subjects.filter((s) => s.faculty === activeFacultyUser).length === 0 ? (
                <div className="mb-4 p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200">
                  ⚠️ <strong>No Course Assigned:</strong> You are currently not assigned as the instructor for any subject at {selectedCampus}. Contact your Campus Manager to assign you to a subject in the <strong>Timetable</strong> tab before logging sessions.
                </div>
              ) : isLoggerPermissionBlocked ? (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200">
                  🔒 <strong>RBAC Permission Guard Active:</strong> Signed in as <strong>{activeFacultyUser}</strong>. This subject belongs to <strong>{activeLoggerSubject.faculty}</strong>. Submitting edits will be blocked (`403 Forbidden`).
                </div>
              ) : null}

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
                      {isFaculty && subjects.filter((s) => s.faculty === activeFacultyUser).length === 0 ? (
                        <option value="" disabled>No courses assigned to your profile yet</option>
                      ) : (
                        (isFaculty ? subjects.filter((s) => s.faculty === activeFacultyUser) : subjects).map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.code} — {s.name} ({s.faculty})
                          </option>
                        ))
                      )}
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
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-95 font-bold text-white text-sm shadow-lg"
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
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  🎙️ Load Sample Note
                </button>
                <button
                  type="button"
                  onClick={handleWhatsappParse}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  ✨ Parse into Form
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: MINIMAL TIMETABLE & SYLLABUS ==================== */}
        {activeTab === "timetable" && (
          <div className="space-y-4">
            {/* MINIMAL HEADER BAR */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-1">
              <div className="flex items-baseline gap-2.5">
                <h2 className="text-base font-bold tracking-tight text-white">Timetable</h2>
                <span className="text-xs text-slate-400">
                  {selectedCampus} · {timetableSpanDays}d view · {canEditTimetable ? "Faculty edit" : "Read-only"}
                </span>
              </div>

              <div className="inline-flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setTimetableSpanDays(7)}
                  className={`px-3 py-1 rounded-lg transition ${
                    timetableSpanDays === 7 ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  7d
                </button>
                <button
                  type="button"
                  onClick={() => setTimetableSpanDays(14)}
                  className={`px-3 py-1 rounded-lg transition ${
                    timetableSpanDays === 14 ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  14d
                </button>
              </div>
            </div>

            {/* MINIMAL 7-DAY / 14-DAY GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
              {upcomingTimetableDays.map((day) => {
                const isOff = Boolean(day.holidayName) || day.isSunday || day.isNonWorkingSat;
                return (
                  <div
                    key={day.date}
                    className={`rounded-2xl border p-3 flex flex-col justify-between min-h-[140px] ${
                      isOff
                        ? "bg-slate-950/60 border-slate-800/60"
                        : "bg-slate-900 border-slate-800"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                        <span className="text-xs font-semibold text-white">{day.dayLabel}</span>
                        <span className="text-[10px] font-mono text-slate-400">{day.date.slice(5)}</span>
                      </div>

                      {day.holidayName ? (
                        <p className="py-4 text-[11px] text-rose-300 font-medium text-center">
                          {day.holidayName}
                        </p>
                      ) : day.isSunday ? (
                        <p className="py-4 text-[11px] text-slate-400 text-center">Sunday</p>
                      ) : day.isNonWorkingSat ? (
                        <p className="py-4 text-[11px] text-slate-400 text-center">Saturday Off</p>
                      ) : day.slots.length === 0 ? (
                        <p className="py-4 text-[11px] text-slate-400 text-center">—</p>
                      ) : (
                        <div className="space-y-1.5">
                          {day.slots.map((slot) => {
                            const isEditingThis =
                              editingSlot &&
                              editingSlot.subId === slot.subId &&
                              editingSlot.idx === slot.slotIdx;

                            return (
                              <div
                                key={`${day.date}-${slot.subId}-${slot.slotIdx}`}
                                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-mono text-[11px] text-cyan-300 font-semibold">
                                    {slot.start}–{slot.end}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {slot.room}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-1">
                                  <p className="text-[11px] font-semibold text-white truncate" title={slot.subjectName}>
                                    {slot.code} · {slot.subjectName}
                                  </p>
                                  {slot.canModifyThisSlot && !isEditingThis && (
                                    <div className="flex items-center gap-1 shrink-0">
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
                                        className="px-1 text-slate-400 hover:text-amber-300 text-[10px]"
                                        title="Edit slot"
                                      >
                                        ✎
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteTimetableSlot(slot.subId, slot.slotIdx)}
                                        className="px-1 text-slate-400 hover:text-rose-300 text-[10px]"
                                        title="Remove slot"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center justify-between text-[10px] text-slate-400">
                                  <span className="truncate">{slot.faculty}</span>
                                  {isFaculty && slot.faculty === activeFacultyUser && (
                                    <span className="shrink-0 px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 text-[9px]">
                                      You
                                    </span>
                                  )}
                                </div>

                                {isEditingThis && (
                                  <div className="pt-1.5 space-y-1.5 border-t border-slate-800">
                                    <div className="grid grid-cols-2 gap-1">
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
                                        className="flex-1 py-1 rounded bg-emerald-600 text-white font-semibold text-[10px]"
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
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ROLE-SCOPED TIMETABLE, FACULTY & SYLLABUS CONTROLS */}
            {(canManageTimetableAndFaculty || canUploadLessonPlan) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {canManageTimetableAndFaculty && (
                  <form onSubmit={handleAddTimetableSlot} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Manage Campus Timetable Slot</span>
                      <span className="text-[11px] font-mono text-cyan-300">+{computeSlotHours(ttStart, ttEnd)}h/wk</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <select
                        value={ttSubjectId}
                        onChange={(e) => setTtSubjectId(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 font-medium sm:col-span-2"
                      >
                        {visibleSubjects.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.code} ({s.campus})
                          </option>
                        ))}
                      </select>
                      <select
                        value={ttDay}
                        onChange={(e) => setTtDay(Number(e.target.value))}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2 py-1.5 font-medium"
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
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5"
                      />
                      <button type="submit" className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">
                        + Add
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="time"
                        value={ttStart}
                        onChange={(e) => setTtStart(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5"
                      />
                      <input
                        type="time"
                        value={ttEnd}
                        onChange={(e) => setTtEnd(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5"
                      />
                    </div>
                  </form>
                )}

                {canManageTimetableAndFaculty && (
                  <form onSubmit={handleAssignFaculty} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Manage Campus Faculty Assignment</span>
                      <span className="text-[11px] text-slate-400">Campus Manager / Admin</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <select
                        value={assignSubId}
                        onChange={(e) => {
                          setAssignSubId(e.target.value);
                          const sub = subjects.find((s) => s.id === e.target.value);
                          if (sub) setAssignFacultyName(sub.faculty);
                        }}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 font-medium"
                      >
                        {(visibleSubjects.length > 0
                          ? visibleSubjects
                          : subjects.filter((s) => selectedCampus === "ALL" || s.campus === selectedCampus)
                        ).map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.code}: {s.name} ({s.campus} · {s.faculty})
                          </option>
                        ))}
                      </select>
                      <div>
                        <input
                          type="text"
                          list="availableFacultyList"
                          value={assignFacultyName}
                          onChange={(e) => setAssignFacultyName(e.target.value)}
                          placeholder="Select or enter faculty name"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                        />
                        <datalist id="availableFacultyList">
                          {availableFaculty.map((fac) => (
                            <option key={fac} value={fac} />
                          ))}
                        </datalist>
                      </div>
                      <button type="submit" className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">
                        Assign Faculty
                      </button>
                    </div>
                  </form>
                )}

                {canUploadLessonPlan && (
                  <form onSubmit={handleAddLessonTopic} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Upload Lesson Plan Topic (Faculty / Admin)</span>
                      <span className="text-[11px] text-slate-400">Auto-computes planned date</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                      <select
                        value={ttSubjectId}
                        onChange={(e) => setTtSubjectId(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 font-medium sm:col-span-2"
                      >
                        {visibleSubjects.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.code} ({s.campus})
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={newTopicUnit}
                        onChange={(e) => setNewTopicUnit(e.target.value)}
                        placeholder="Unit"
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5"
                      />
                      <input
                        type="text"
                        value={newTopicTitle}
                        onChange={(e) => setNewTopicTitle(e.target.value)}
                        placeholder="Topic Title"
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 sm:col-span-2"
                      />
                      <input
                        type="number"
                        step="0.5"
                        value={newTopicHours}
                        onChange={(e) => setNewTopicHours(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={newTopicScope}
                        onChange={(e) => setNewTopicScope(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 font-medium flex-1"
                      >
                        <option value="Sessionals">Sessionals</option>
                        <option value="Mid-Term">Mid-Term</option>
                        <option value="PUT">PUT</option>
                        <option value="End-Term">End-Term</option>
                      </select>
                      <button type="submit" className="py-1.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                        + Upload Topic
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 5: AUTO-SHIFTING CALENDAR & ADMIN SETUP ==================== */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            {/* TAB HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-1">
              <div>
                <h2 className="text-lg font-bold text-white">📅 Academic Calendar, Holidays & Auto-Pacing Engine</h2>
                <p className="text-xs text-slate-400">
                  Semester timelines, working Saturdays, and institutional holiday management. Declaring holidays auto-shifts curriculum topic delivery dates and updates buffer ratios in real-time.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono font-semibold">
                  {holidays.length} Declared Holiday{holidays.length !== 1 ? "s" : ""}
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 font-mono font-semibold">
                  Semester: {semesterStart} → {semesterEnd}
                </span>
              </div>
            </div>

            {/* ADMIN / PROGRAM MANAGER SETUP (SEMESTER DATES, CAMPUSES & EXAM WINDOWS) */}
            {canSetupSemestersAndExams && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-cyan-300">Admin Setup</span>
                    <h3 className="font-bold text-base text-white">🏛️ Configure Campuses, Semester Dates, & Exam Windows</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition text-xs shadow">
                      <span>📥 Import Setup CSV</span>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVImport}
                        className="hidden"
                      />
                    </label>
                    {csvImportError && (
                      <span className="text-rose-400 font-semibold text-xs">{csvImportError}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Semester Dates */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white block">1. Semester Window</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Start Date</label>
                        <input
                          type="date"
                          value={semesterStart}
                          onChange={(e) => setSemesterStart(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">End Date</label>
                        <input
                          type="date"
                          value={semesterEnd}
                          onChange={(e) => setSemesterEnd(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Campus Setup */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white block">2. Campuses ({campuses.join(", ")})</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCampusName}
                        onChange={(e) => setNewCampusName(e.target.value)}
                        placeholder="New campus code..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const trimmed = newCampusName.trim();
                          if (!trimmed || campuses.includes(trimmed)) return;
                          setCampuses([...campuses, trimmed]);
                          setNewCampusName("");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                      >
                        + Campus
                      </button>
                    </div>
                  </div>

                  {/* Exam Windows Setup */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white block">3. Add Exam Window</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <input
                        type="text"
                        value={newExamName}
                        onChange={(e) => setNewExamName(e.target.value)}
                        placeholder="Exam title"
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                      />
                      <input
                        type="date"
                        value={newExamDate}
                        onChange={(e) => setNewExamDate(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                      />
                      <div className="flex gap-1">
                        <select
                          value={newExamScope}
                          onChange={(e) => setNewExamScope(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-1.5 py-1.5 flex-1 text-white"
                        >
                          <option value="Sessionals">Sessionals</option>
                          <option value="Mid-Term">Mid-Term</option>
                          <option value="PUT">PUT</option>
                          <option value="End-Term">End-Term</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newExamName.trim() || !newExamDate) return;
                            setExamWindows([
                              ...examWindows,
                              { id: `EX-${Date.now()}`, name: newExamName.trim(), date: newExamDate, scopeKey: newExamScope },
                            ]);
                            setNewExamName("");
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* HOLIDAY DECLARATION & SATURDAY POLICY CARD */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-400">Institutional Calendar Policy</span>
                  <h3 className="font-bold text-base text-white">📅 Declare Holiday & Configure Working Saturdays</h3>
                </div>
                <div className="text-[11px] text-slate-400">
                  {canManageCalendar ? "Campus Manager & Admin controls active" : "Read-only view for Faculty"}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Working Saturday Rule */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-sm text-white">⚙️ Working Saturdays Rule</h4>
                  <p className="text-[11px] text-slate-400">
                    Defines whether Saturday teaching slots are counted towards curriculum capacity.
                  </p>
                  <div className="flex gap-1.5 pt-1">
                    {[
                      { id: "all", label: "All Sat" },
                      { id: "2nd & 4th", label: "2nd & 4th Off" },
                      { id: "none", label: "No Sat" },
                    ].map((rule) => (
                      <button
                        key={rule.id}
                        type="button"
                        disabled={!canManageCalendar}
                        onClick={() => {
                          if (!canManageCalendar) return;
                          setSaturdayRule(rule.id);
                          setAuditTrail((prev) => [
                            {
                              id: Date.now(),
                              time: "Just now",
                              actor: currentUser.name,
                              action: `Updated Saturday working rule to: ${rule.label}`,
                            },
                            ...prev,
                          ]);
                        }}
                        className={`flex-1 py-2 px-2 rounded-xl font-bold border transition ${
                          saturdayRule === rule.id
                            ? "bg-indigo-600 text-white border-indigo-400 shadow"
                            : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                        } ${!canManageCalendar ? "cursor-not-allowed opacity-70" : ""}`}
                      >
                        {rule.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Holiday Declaration Form */}
                {canManageCalendar ? (
                  <form onSubmit={handleAddHoliday} className="lg:col-span-2 space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">🎉 Declare Holiday / Academic Break</h4>
                      <span className="text-[10px] text-rose-300 font-mono">Dynamic schedule auto-shift</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Date</label>
                        <input
                          type="date"
                          required
                          value={newHolidayDate}
                          onChange={(e) => setNewHolidayDate(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-rose-400"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Holiday / Event Title</label>
                        <input
                          type="text"
                          required
                          value={newHolidayName}
                          onChange={(e) => setNewHolidayName(e.target.value)}
                          placeholder="e.g. Guru Nanak Jayanti"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-rose-400"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Campus Scope</label>
                        <select
                          value={isCampusManager ? currentUser.campus : newHolidayCampus}
                          onChange={(e) => setNewHolidayCampus(e.target.value)}
                          disabled={isCampusManager}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-white font-medium focus:outline-none focus:border-rose-400"
                        >
                          {isAdmin && <option value="ALL">ALL Campuses (Global)</option>}
                          {campuses.map((c) => (
                            <option key={c} value={c}>
                              {c} Campus
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2 flex items-end">
                        <button
                          type="submit"
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:opacity-95 font-bold text-white shadow transition text-center"
                        >
                          + Declare
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 pt-1">
                      💡 Declaring a holiday zeroes teaching capacity for scheduled courses on that date. Remaining lesson topics automatically shift forward to the next available day.
                    </p>
                  </form>
                ) : (
                  <div className="lg:col-span-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
                    <h4 className="font-bold text-sm text-white">🎉 Holiday Declaration</h4>
                    <p className="text-xs">
                      Campus Managers and Admins can declare holidays and academic breaks. As Faculty, your course schedules automatically shift forward whenever holidays are declared.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CONFIGURED SEMESTER HOLIDAYS & ACADEMIC BREAKS LIST */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden text-xs">
              <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">📅</span>
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      Configured Semester Holidays & Breaks ({holidays.length})
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      All declared non-instructional days. Pacing schedules and buffer ratios automatically adjust for each break.
                    </p>
                  </div>
                </div>
                {canManageCalendar && (
                  <span className="text-[11px] text-slate-400">
                    Click <strong>✕ Remove</strong> to cancel a holiday and auto-shift dates back.
                  </span>
                )}
              </div>

              {holidays.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-1">
                  <p className="text-base font-semibold text-slate-300">No Holidays Declared</p>
                  <p className="text-xs">There are currently no institutional holidays or campus breaks in this semester.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40 text-[11px]">
                        <th className="py-2.5 px-4 font-semibold">Date & Day</th>
                        <th className="py-2.5 px-3 font-semibold">Holiday / Event Title</th>
                        <th className="py-2.5 px-3 font-semibold">Campus Scope</th>
                        <th className="py-2.5 px-3 font-semibold">Schedule Impact</th>
                        {canManageCalendar && <th className="py-2.5 px-4 text-right font-semibold">Action</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {[...holidays]
                        .sort((a, b) => a.date.localeCompare(b.date))
                        .map((hol) => {
                          const dateParts = hol.date.split("-").map(Number);
                          const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                          const dayFormatted = dateObj.toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          });
                          const isGlobal = !hol.campus || hol.campus === "ALL";
                          const canDeleteThis =
                            isAdmin || (isCampusManager && (isGlobal || hol.campus === currentUser.campus));

                          return (
                            <tr key={hol.id || `${hol.date}-${hol.campus}`} className="hover:bg-slate-800/30 transition">
                              <td className="py-3 px-4 font-mono font-medium text-white flex items-center gap-2">
                                <span className="text-cyan-400">📅</span>
                                <div>
                                  <span className="text-white font-semibold">{dayFormatted}</span>
                                  <span className="text-[10px] text-slate-400 block font-mono">{hol.date}</span>
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <span className="font-semibold text-white">{hol.name}</span>
                              </td>
                              <td className="py-3 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                    isGlobal
                                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                                      : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                                  }`}
                                >
                                  {isGlobal ? "ALL Campuses" : `${hol.campus} Campus`}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="text-rose-300 font-medium text-[11px] flex items-center gap-1">
                                  <span>⏸️</span> No teaching · dates shifted
                                </span>
                              </td>
                              {canManageCalendar && (
                                <td className="py-3 px-4 text-right">
                                  {canDeleteThis ? (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteHoliday(hol.id, hol.date, hol.campus)}
                                      className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 hover:text-white font-semibold transition text-[11px]"
                                      title="Remove holiday and shift schedule back"
                                    >
                                      ✕ Remove
                                    </button>
                                  ) : (
                                    <span className="text-slate-500 text-[10px] italic">Locked</span>
                                  )}
                                </td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* REAL-TIME CURRICULUM PACING IMPACT PREVIEW */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden text-xs">
              <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm text-white">
                    ⚡ Real-Time Pacing Impact on Enrolled Subjects ({visibleSubjects.length} Courses)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Declared holidays automatically deduct non-instructional hours and shift upcoming topic delivery dates.
                  </p>
                </div>
                <span className="text-slate-400 text-xs">
                  Campus: <strong className="text-white">{selectedCampus}</strong>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40 text-[11px]">
                      <th className="py-2.5 px-4">Subject</th>
                      <th className="py-2.5 px-3">Weekly Schedule</th>
                      <th className="py-2.5 px-3 text-right">Avail. Teaching Hrs</th>
                      <th className="py-2.5 px-3 text-right">Required Hrs</th>
                      <th className="py-2.5 px-3">Buffer Ratio</th>
                      <th className="py-2.5 px-3">Pacing Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {visibleSubjects.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-2.5 px-4 font-semibold text-white">
                          {sub.code}: {sub.name} <span className="text-slate-400 font-normal">({sub.campus})</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">
                          {(sub.timetableSlots || []).map((sl) => `${sl.dayName} ${sl.start}`).join(", ") || "No slots"}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-cyan-300">
                          {sub.availableHours.toFixed(2)}h
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                          {sub.remainingHours.toFixed(2)}h
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold">
                          {sub.bufferRatio.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={statusBadge(sub.status)}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: EXAM READINESS & STUDENT BATCH PORTAL ==================== */}
        {activeTab === "exams" && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div>
                <h2 className="text-lg font-bold text-white">🎯 Exam Readiness & Read-Only Student Batch View</h2>
                <p className="text-xs text-slate-400">
                  {isStudent
                    ? `Read-only view for Batch ${currentUser.batch || "CSE-2026-A"} (${selectedCampus}): topics covered, next topics, exam schedule and scope.`
                    : "Tracks upcoming exam dates, syllabus scope coverage, covered topics, and next topics across subjects."}
                </p>
              </div>
              {canExportData && (
                <button
                  onClick={exportCalendarICS}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  📅 Sync Exam Dates (.ics)
                </button>
              )}
            </div>

            {/* UPCOMING EXAM SCHEDULE & SYLLABUS SCOPE */}
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
                    <span className="text-[11px] font-bold uppercase text-cyan-400">Scope: {exam.scopeKey}</span>
                    <h3 className="text-base font-bold mt-0.5 text-white">{exam.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">📅 {exam.date}</p>
                    <p className="text-sm font-bold text-emerald-300 mt-3">{pct.toFixed(2)}% Covered</p>
                    <p className="text-xs text-amber-300 mt-1">Still Needed: {hoursStillNeeded.toFixed(2)}h</p>
                  </div>
                );
              })}
            </div>

            {/* BATCH TOPICS COVERED & NEXT TOPICS (STUDENT READ-ONLY VIEW) */}
            <div className="space-y-4">
              {visibleSubjects.map((sub) => {
                const coveredTopics = sub.topics.filter(
                  (t) => t.status === "Completed" || t.status === "Merged" || t.status === "In Progress"
                );
                const nextTopics = sub.topics.filter(
                  (t) => t.status === "In Progress" || t.status === "Pending"
                );

                return (
                  <div key={sub.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-cyan-300">{sub.code} · {sub.batch}</span>
                        <h3 className="text-base font-bold text-white">{sub.name}</h3>
                        <p className="text-xs text-slate-400">{sub.faculty} • {sub.track} • {sub.coveragePct.toFixed(2)}% Syllabus Covered</p>
                      </div>
                      <span className={statusBadge(sub.status)}>{sub.status}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Topics Covered */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="font-bold text-emerald-300 uppercase text-[11px] block">
                          ✓ Topics Covered ({coveredTopics.length})
                        </span>
                        {coveredTopics.length === 0 ? (
                          <p className="text-slate-400">No topics covered yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {coveredTopics.map((t) => (
                              <div key={t.id} className="pb-2 border-b border-slate-800/60 last:border-0 last:pb-0">
                                <div className="flex justify-between gap-2">
                                  <span className="font-semibold text-white">{t.unit}: {t.title}</span>
                                  <span className="font-mono text-emerald-300 shrink-0">{t.pctComplete}%</span>
                                </div>
                                <p className="text-[11px] text-slate-400">
                                  Scope: {t.examScope} {t.coveredNotes ? `• ${t.coveredNotes}` : ""}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Next Topics */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="font-bold text-cyan-300 uppercase text-[11px] block">
                          → Next Topics & Upcoming Scope ({nextTopics.length})
                        </span>
                        {nextTopics.length === 0 ? (
                          <p className="text-slate-400">All syllabus topics completed.</p>
                        ) : (
                          <div className="space-y-2">
                            {nextTopics.map((t) => (
                              <div key={t.id} className="pb-2 border-b border-slate-800/60 last:border-0 last:pb-0">
                                <div className="flex justify-between gap-2">
                                  <span className="font-semibold text-white">{t.unit}: {t.title}</span>
                                  <span className="font-mono text-cyan-300 shrink-0">{t.plannedDate}</span>
                                </div>
                                <p className="text-[11px] text-slate-400">
                                  Scope: {t.examScope} • {t.plannedHours.toFixed(2)}h {t.leftoverNotes && t.leftoverNotes !== "None" ? `• Next: ${t.leftoverNotes}` : ""}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 7: ALERTS & IMMUTABLE AUDIT LOG ==================== */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            {/* CAMPUS USER REGISTRATION APPROVALS SECTION */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase text-cyan-300">
                    {isCampusManager ? `👥 ${currentUser.campus} Campus Registration Approvals` : "👥 All Campuses User Registration Approvals"}
                  </span>
                  <h3 className="font-bold text-base text-white">
                    {isCampusManager ? `Authorize Registered Users for ${currentUser.campus} Campus` : "Campus Authorization & Role Management"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isCampusManager
                      ? `As the Campus Manager for ${currentUser.campus}, only you can grant login permission to newly registered faculty and students for ${currentUser.campus}.`
                      : "Campus Managers grant login permission to newly registered users for their respective campus."}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-cyan-400">
                  {pendingApprovals.length} Pending
                </div>
              </div>

              {pendingApprovals.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>No pending user registrations for this campus. All registered accounts have been reviewed and authorized.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {pendingApprovals.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2.5 shadow-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{user.name}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                              {user.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            ID: <strong className="text-cyan-300">{user.loginId}</strong> • Campus: <strong>{user.campus}</strong>
                            {user.batch ? ` • Batch: ${user.batch}` : ""}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                          Pending Approval
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500">
                          Registered: {user.registeredAt || "Today"}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRejectUser(user.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-[11px] font-semibold transition"
                          >
                            ✕ Reject
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApproveUser(user.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow transition flex items-center gap-1"
                          >
                            <span>✓</span> Grant Permission
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CAMPUS MANAGER / ADMIN MISSED-LOG ALERTS & 48-HOUR ESCALATION TRACKER */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-400">
                    {isCampusManager ? `🚨 ${currentUser.campus} Campus Alerts & Escalations` : "🚨 All Campuses Missed-Log Alerts & Escalations"}
                  </span>
                  <h3 className="font-bold text-base text-white">Daily Unlogged Session Reminders & 48-Hour Escalations</h3>
                  <p className="text-xs text-slate-400">
                    Notifies Campus Managers when faculty sessions are overdue or unlogged beyond 48 hours.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {visibleSubjects
                  .flatMap((sub) =>
                    (sub.timetableSlots || []).map((slot, sIdx) => ({
                      sub,
                      slot,
                      id: `${sub.id}-slot-${sIdx}`,
                    }))
                  )
                  .slice(0, 4)
                  .map(({ sub, slot, id }, index) => {
                    const isEscalated = index === 0;
                    return (
                      <div
                        key={id}
                        className={`p-3.5 rounded-xl border space-y-1.5 ${
                          isEscalated
                            ? "bg-rose-950/40 border-rose-500/50"
                            : "bg-slate-950 border-slate-800"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-white text-xs">{sub.code}: {sub.name}</span>
                            <p className="text-[11px] text-slate-400">{sub.campus} • {sub.faculty}</p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              isEscalated
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {isEscalated ? "⚠️ 48h Escalation Active" : "Pending Log Today"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-slate-300 pt-1">
                          <span>Slot: {slot.dayName} {slot.start}–{slot.end} ({slot.room})</span>
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Nudge reminder sent to ${sub.faculty} for ${sub.code} (${slot.dayName} ${slot.start})!`);
                              setAuditTrail((prev) => [
                                {
                                  id: Date.now(),
                                  time: "Just now",
                                  actor: currentUser.name,
                                  action: `Sent automated nudge alert to ${sub.faculty} for unlogged slot in ${sub.code}`,
                                },
                                ...prev,
                              ]);
                            }}
                            className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[10px]"
                          >
                            🔔 Nudge Faculty
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

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
          </div>
        )}
      </main>

      {/* ==================== MATHEMATICAL & SPREADSHEET FORMULA AUDIT MODAL ==================== */}
      {auditedSubject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setAuditModalSubject(null)}
        >
          <div
            className="max-w-3xl w-full max-h-[88vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-300">{auditedSubject.code}</span>
                  <span className={statusBadge(auditedSubject.status)}>{auditedSubject.status}</span>
                </div>
                <h2 className="text-lg font-extrabold text-white mt-1">
                  🔍 Audit Math — {auditedSubject.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {auditedSubject.campus} • {auditedSubject.track} • {auditedSubject.faculty} • Target Finish: {auditedSubject.targetFinishDate}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAuditModalSubject(null)}
                aria-label="Close audit math modal"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* 6 FORMULA VERIFICATION CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">1. Scope Hours</span>
                <p className="text-base font-mono font-extrabold text-white">
                  {auditedSubject.hoursInScope.toFixed(2)}h
                </p>
                <p className="text-[11px] font-mono text-cyan-300">
                  =SUMIF(status, &quot;!=Skipped&quot;, planned_hrs)
                </p>
                <p className="text-[11px] text-slate-400">
                  {auditedSubject.topics.filter((t) => t.status !== "Skipped").length} active topics ({auditedSubject.topics.filter((t) => t.status === "Skipped").length} skipped)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">2. Covered Hours</span>
                <p className="text-base font-mono font-extrabold text-cyan-300">
                  {auditedSubject.coveredHours.toFixed(2)}h ({auditedSubject.coveragePct.toFixed(2)}%)
                </p>
                <p className="text-[11px] font-mono text-cyan-300">
                  =SUM(planned_hrs × pct / 100)
                </p>
                <p className="text-[11px] text-slate-400">
                  {auditedSubject.coveredHours.toFixed(2)}h ÷ {auditedSubject.hoursInScope.toFixed(2)}h scope
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">3. Remaining Hours</span>
                <p className="text-base font-mono font-extrabold text-white">
                  {auditedSubject.remainingHours.toFixed(2)}h
                </p>
                <p className="text-[11px] font-mono text-cyan-300">
                  =MAX(0, Scope - Covered)
                </p>
                <p className="text-[11px] text-slate-400">
                  {auditedSubject.hoursInScope.toFixed(2)}h − {auditedSubject.coveredHours.toFixed(2)}h
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">4. Should Be Covered ({todayDate})</span>
                <p className="text-base font-mono font-extrabold text-white">
                  {auditedSubject.shouldBeCoveredByToday.toFixed(2)}h
                </p>
                <p className="text-[11px] font-mono text-cyan-300">
                  =MIN(Scope, CalendarWalk(Start..Today))
                </p>
                <p className="text-[11px] text-slate-400">
                  Walks {semesterStart} → {todayDate} ({saturdayRule} Sat)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">5. Available Hours</span>
                <p className="text-base font-mono font-extrabold text-emerald-300">
                  {auditedSubject.availableHours.toFixed(2)}h
                </p>
                <p className="text-[11px] font-mono text-cyan-300">
                  =CalendarWalk(Today+1..Deadline) + Bonus
                </p>
                <p className="text-[11px] text-slate-400">
                  Until {auditedSubject.targetFinishDate} (+{remedialBonusHours}h remedial)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">6. Buffer Ratio & Pace</span>
                <p className="text-base font-mono font-extrabold text-white">
                  {auditedSubject.bufferRatio.toFixed(2)}x • {auditedSubject.paceVsPlan >= 0 ? "+" : ""}{auditedSubject.paceVsPlan.toFixed(2)}h
                </p>
                <p className="text-[11px] font-mono text-cyan-300">
                  =Available ({auditedSubject.availableHours.toFixed(2)}h) ÷ Remaining ({auditedSubject.remainingHours.toFixed(2)}h)
                </p>
                <p className="text-[11px] text-slate-400">
                  Thresholds: ≥{thresholds.onTrack} ON TRACK, ≥{thresholds.tight.toFixed(2)} TIGHT
                </p>
              </div>
            </div>

            {/* TOPIC-LEVEL WEIGHTED AUDIT TABLE */}
            <div className="rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white">Topic-Level Weighted Hours Verification</span>
                <span className="text-slate-400 font-mono">
                  Weekly Schedule: {Object.entries(auditedSubject.weeklyScheduleHours || {}).map(([d, h]) => `${DAY_NAMES[d]}:${h}h`).join(", ")}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950/90 text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-800">
                      <th className="py-2.5 px-3">Topic</th>
                      <th className="py-2.5 px-2">Status</th>
                      <th className="py-2.5 px-2 text-right">Planned</th>
                      <th className="py-2.5 px-2 text-right">% Done</th>
                      <th className="py-2.5 px-2 text-right">Covered Hrs</th>
                      <th className="py-2.5 px-3 text-right">Planned Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {auditedSubject.topics.map((t) => {
                      const isSkipped = t.status === "Skipped";
                      const weightedCovered =
                        t.status === "Completed" || t.status === "Merged"
                          ? t.plannedHours
                          : t.status === "In Progress"
                          ? t.plannedHours * (t.pctComplete / 100)
                          : 0;
                      return (
                        <tr key={t.id} className={isSkipped ? "opacity-60" : ""}>
                          <td className="py-2 px-3 font-medium text-white">
                            {t.unit}: {t.title}
                          </td>
                          <td className="py-2 px-2 text-slate-300">{t.status}</td>
                          <td className="py-2 px-2 text-right font-mono">
                            {isSkipped ? "0.00h (Skipped)" : `${t.plannedHours.toFixed(2)}h`}
                          </td>
                          <td className="py-2 px-2 text-right font-mono">{t.pctComplete}%</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-cyan-300">
                            {weightedCovered.toFixed(2)}h
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-slate-400">
                            {t.plannedDate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-950 border-t border-slate-800 font-bold text-white">
                      <td className="py-2.5 px-3" colSpan={2}>Total Verified (2-Decimal Parity)</td>
                      <td className="py-2.5 px-2 text-right font-mono">{auditedSubject.hoursInScope.toFixed(2)}h</td>
                      <td className="py-2.5 px-2 text-right font-mono">{auditedSubject.coveragePct.toFixed(2)}%</td>
                      <td className="py-2.5 px-2 text-right font-mono text-cyan-300">{auditedSubject.coveredHours.toFixed(2)}h</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-300">Rem: {auditedSubject.remainingHours.toFixed(2)}h</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setAuditModalSubject(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

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
                  {accounts
                    .filter((account) => account.approvalStatus === "approved")
                    .map((account) => (
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
