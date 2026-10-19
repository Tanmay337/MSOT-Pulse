# MSOT Pulse — Live Course Progression & Early-Warning Platform (Problem 3)

Built for the **MSOT Course Progression Challenge (Problem 3)**. Tracks syllabus delivery across **HI-Tech, RGIB, and JUJ** for both the **Mirai Track** and **University Track** with 2-decimal mathematical parity, automatic timetable hour derivation, calendar-walking date shifts, strict RBAC faculty isolation, and `<60s` mobile faculty session logging.



## 📋 Submission Checklist Included in This Repo
- [x] **One-Command Setup:** `docker-compose.yml` + `Dockerfile` + `schema.sql`
- [x] **Architecture & Design Doc:** See [`DESIGN_DOC.md`](./DESIGN_DOC.md)
- [x] **Mandatory Test Report & Load Test Results:** See [`TEST_REPORT.md`](./TEST_REPORT.md) & [`tests/loadtest.js`](./tests/loadtest.js)
- [x] **4-Campus Sample Semester Dataset:** See [`data/sample_semester_4_campuses.csv`](./data/sample_semester_4_campuses.csv)

## 🚀 One-Command Local Setup (Docker)
```bash
docker compose up --build
```
Then open **`http://localhost:5173`**.

## ⚡ Fast Local Development (Node / Vite)
```bash
npm install
npm run dev
```
Open the local URL printed by Vite in the terminal (usually `http://localhost:5173`).

To create a production build:
```bash
npm run build
```

## Goals

- Make it quick for faculty to record what was taught in a class in `<60s`.
- Compare syllabus coverage with the planned academic calendar in real time.
- Account for holidays, cancelled classes, and working-Saturday rules when estimating dates.
- Highlight subjects that are on track, tight on time, in danger, or complete.
- Give students a read-only view of covered topics and upcoming academic milestones.
- Keep course-progress calculations understandable and traceable to 2 decimal places.

## Planned / Represented Capabilities

- **Course progress dashboard:** view planned hours, covered hours, coverage percentage, remaining work, and pacing.
- **Session logging:** record session status, completion percentage, topics covered, leftover work, and notes with SLA stopwatch.
- **WhatsApp / Voice-note parsing:** AI-assisted pre-fill directly from unstructured faculty updates.
- **Calendar-aware planning:** derive teaching hours from timetable slots and adjust planned dates around holidays and non-working days.
- **Exam readiness:** review syllabus coverage and remaining hours for upcoming exams (Sessionals, Mid-Term, PUT, End-Term).
- **Campus and track views:** organize subjects by campus, batch, and academic track (Mirai Track vs University Track).
- **Visiting faculty honorarium:** calculate delivered hours, gross compensation, TDS deductions, and net payable.
- **Data import:** use sample semester data to demonstrate bulk-import workflows across campuses.
- **Roles and permissions:** separate Admin, Campus Manager, Faculty, and Student access with campus locking.
- **Missed-log reminders:** automated SLA alerts and escalation for sessions that remain unlogged.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Styling:** Custom glassmorphism, responsive design, dark mode theme
- **Database Schema:** PostgreSQL 16 schema (`schema.sql`)
- **Containerization:** Docker & Docker Compose (`Dockerfile`, `docker-compose.yml`)

## Repository Structure

```text
.
├── data/
│   └── sample_semester_4_campuses.csv
├── public/
│   └── preview.png
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tests/
│   └── loadtest.js
├── schema.sql
├── DESIGN_DOC.md
├── TEST_REPORT.md
├── Dockerfile
├── docker-compose.yml
├── preview.png
└── package.json
```

## Supporting Documents

- [`DESIGN_DOC.md`](./DESIGN_DOC.md) — architecture, worst-subject roll-up, and calculation formulas.
- [`TEST_REPORT.md`](./TEST_REPORT.md) — documented verification and load-test results.
- [`schema.sql`](./schema.sql) — proposed relational database schema with indices.
- [`tests/loadtest.js`](./tests/loadtest.js) — load-test script.
- [`data/sample_semester_4_campuses.csv`](./data/sample_semester_4_campuses.csv) — 4-campus sample semester dataset.


## 🌟 Key Features

### 1. Course Progress & Syllabus Delivery Tracker
- **Real-Time Pacing Engine:** Accurate 2-decimal tracking of Planned Hours, Delivered Hours, Remaining Hours, and Coverage Percentage.
- **Automated Buffer Ratio & Health Status:**
  - 🟢 **ON TRACK** (`Buffer Ratio ≥ 1.15`): Pacing ahead of calendar.
  - 🟡 **TIGHT** (`1.00 ≤ Buffer Ratio < 1.15`): Low margin for cancellations or holidays.
  - 🔴 **DANGER** (`Buffer Ratio < 1.00`): Projected to miss the exam syllabus cutoff.
  - 🔵 **COMPLETE** (`100% Coverage`): Curriculum delivery concluded.
- **Worst-Subject Roll-Up:** Executive summary surfacing the highest-risk subjects across campuses for immediate academic intervention.
- **Granular Filtering & Search:** Filter by Campus (HI-Tech, RGIB, JUJ, Ratnam), Track (Mirai Track vs. University Track), Semester, and Search by Subject or Faculty.
- **Interactive Formula & Audit Modal:** Transparent math breakdown showing exact buffer ratios, available teaching hours, and pace-vs-plan calculations.

---

### 2. Ultra-Fast Session Logging (<60s SLA)
- **Fast Session Logging:** Designed for faculty to record completed lectures, attendance, and topics covered in under 60 seconds on mobile or desktop.
- **Topic Level Tracking:** Mark topics as Complete or In-Progress with percentage completion and leftover work notes.
- **Live SLA Stopwatch:** Real-time on-screen counter confirming logs are submitted within the 60-second target.
- **AI-Assisted Logging (WhatsApp / Audio Note Parser):** One-click parser that extracts subject, session date, topics covered, and attendance notes from unstructured text or voice transcripts.

---

### 3. Rolling Timetable & Faculty Scheduling
- **7-Day & 14-Day Rolling Views:** Interactive daily schedule displaying morning, afternoon, and evening slots with room allocations and topic plans.
- **1-Click Faculty Assignment & Slot Editing:** Campus Managers and Lead Faculty can edit slots, adjust timings, and assign/reassign faculty directly from an integrated selector.
- **Role-Gated Access:** Faculty can update their assigned session slots; Students receive an uncluttered, read-only schedule.

---

### 4. Self-Registration & Campus Manager Approval System
- **Login Screen Self-Registration:** Prospective Students, Regular Faculty, Visiting Faculty, and Program Managers can request an account.
- **Campus-Scoped Approval Queue:** Campus Managers review registration requests filtered strictly for their respective campus.
- **One-Click Authorization:** Campus Managers can review registrant details (Role, Campus, Batch, Email/ID) and grant permissions or reject requests with immediate activation.

---

### 5. Visiting Faculty Lecture & Honorarium Management
- **Planned vs. Delivered Tracking:** Separate accounting for Planned vs. Completed Lectures and Planned vs. Actual Teaching Hours.
- **Audit-Linked Session Delivery Logging:** Session logs capture exact dates, subjects, faculty names, durations, and completion statuses (replacing disconnected "+1" increment buttons).
- **Configurable Honorarium Rates:** Supports **Per-Hour** or **Per-Session** compensation models customizable per faculty or course.
- **Live Financial Computation:** Real-time calculations of Planned Budget vs. Approved Earned Honorarium with status tracking (**Pending Review**, **Approved**, **Disbursed**).
- **Exportable Payout Report (CSV):** Downloadable payout summary with full session breakdowns, rates, and approval stamps for finance and audit teams.

---

### 6. Academic Calendar & Holiday Management Engine
- **Timezone-Safe Date Engine:** Fully fixed date conversions preventing 1-day timezone backward shifts (e.g., in IST GMT+5:30).
- **Campus-Specific Holiday Scoping:** Schedule holidays across **All Campuses** or scope them to a specific campus (`JUJ`, `RATNAM`, `HITECH`).
- **Curriculum Pacing Impact Preview:** Live indicator displaying the exact number of class slots and subjects affected by upcoming holidays.
- **Interactive Holiday Manager:** Add and delete holidays with date conflict validation, reason logging, and automated schedule adjustments.
- **Decoupled Session Cancellations:** Cancelling an individual class session records an audit entry without injecting false institution-wide holidays.

---

### 7. Exam Readiness & Milestone Tracking
- **Milestone Timeline:** Maps curriculum pacing against **Sessionals**, **Mid-Term**, **Pre-University Tests (PUT)**, and **Final University Exams**.
- **Early-Warning Horizon:** Alerts leadership when a subject's current pace will fail to cover necessary exam modules by scheduled examination dates.

---

### 8. Role-Based Access Control (RBAC) & Multi-Campus Security
- **Strict Role Permissions:** Distinct views and capabilities for **Academic Leadership / Super Admin**, **Campus Manager**, **Faculty**, **Visiting Faculty**, and **Students**.
- **Multi-Campus Isolation:** Campus Managers and Faculty only access data, classes, and approval queues belonging to their campus.
- **Resilient Student Onboarding:** Dynamic batch mapping (`CAMPUS_BATCHES`) guarantees that newly registered student accounts immediately populate their timetable, syllabus, and course trackers with zero blank screens.

---

### 9. Missed-Log Reminders & 48-Hour Escalation Tracker
- **Automated Log Monitoring:** Flags classes that concluded more than 24 hours ago without a recorded session log.
- **48-Hour Escalation Tracker:** Automatically escalates unlogged sessions exceeding 48 hours to Campus Managers and Leadership for resolution.

---

### 10. Data Import & Audit Trail
- **CSV Bulk Import:** Import full semester schedules, course breakdowns, and topic syllabi across multiple campuses.
- **Tamper-Evident Audit History:** Comprehensive event log tracking every session confirmation, timetable edit, holiday addition, and honorarium approval.


## Core Progress Metrics

The platform defines progress using planned hours rather than a simple topic count:

- **Hours in scope:** planned hours for topics included in the subject scope, excluding skipped topics.
- **Covered hours:** completed topics count fully; in-progress topics count according to their completion percentage.
- **Coverage percentage:** covered hours divided by hours in scope.
- **Available hours:** teaching hours remaining before the target finish date, based on the timetable and working calendar.
- **Buffer ratio:** available hours divided by remaining hours. The starting thresholds are `ON TRACK` at `>= 1.15`, `TIGHT` from `1.00` to `< 1.15`, and `DANGER` below `< 1.00`.
- **Pace vs. plan:** covered hours minus the hours that should have been covered by the current date.

## Sample Data and Campus Scope

The sample data is configured for **JUJ, HI-Tech, and RGIB**.

## Challenge

Built for **MSOT Problem 3 — Course Progression Challenge**.
