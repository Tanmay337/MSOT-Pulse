# MSOT Pulse --- Course Progression Tracker

MSOT Pulse is a course progression tracking project built for **Problem
3: Course Progression Challenge**. It is designed to help faculty and
academic teams track syllabus delivery, compare planned progress with
actual classroom progress, and identify subjects that may fall behind
before exams.

The project focuses on a clear, mobile-friendly workflow for session
logging and a dashboard for reviewing course progress across the **Mirai
Track** and **University Track** at **JUJ, HI-Tech, and RGIB**.

> **Project status:** This repository contains the React/Vite frontend
> prototype, sample semester data, a database schema, design
> documentation, and a test-report document. Check the implementation
> and deployment configuration before treating every described workflow
> as production-ready.

## Goals

-   Make it quick for faculty to record what was taught in a class.
-   Compare syllabus coverage with the planned academic calendar.
-   Account for holidays, cancelled classes, and working-Saturday rules
    when estimating dates.
-   Highlight subjects that are on track, tight on time, in danger, or
    complete.
-   Give students a read-only view of covered topics and upcoming
    academic milestones.
-   Keep course-progress calculations understandable and traceable.

## Planned / represented capabilities

-   **Course progress dashboard:** view planned hours, covered hours,
    coverage percentage, remaining work, and pacing.
-   **Session logging:** record session status, completion percentage,
    topics covered, leftover work, and notes.
-   **Calendar-aware planning:** derive teaching hours from timetable
    slots and adjust planned dates around holidays and non-working days.
-   **Exam readiness:** review syllabus coverage and remaining hours for
    an upcoming exam.
-   **Campus and track views:** organize subjects by campus, batch, and
    academic track.
-   **Data import:** use sample semester data to demonstrate bulk-import
    workflows.
-   **Roles and permissions:** the design describes separate Admin,
    Campus Manager, Faculty, and Student access.
-   **Missed-log reminders:** the design describes end-of-day reminders
    and escalation for sessions that remain unlogged.

Some of these workflows may be represented as prototype UI or design
artifacts rather than a fully connected production backend.

## Tech stack

-   React
-   Vite
-   Tailwind CSS
-   SQL schema for a planned PostgreSQL data layer
-   Docker / Docker Compose configuration included in the repository

## Repository structure

``` text
.
├── data/
│   └── sample_semester_4_campuses.csv
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
└── package.json
```

## Run locally

### Requirements

-   Node.js and npm
-   Or Docker with Docker Compose

### Option 1: Run with Node.js

``` bash
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal (usually
`http://localhost:5173`).

To create a production build:

``` bash
npm run build
```

### Option 2: Run with Docker Compose

``` bash
docker compose up --build
```

Then open `http://localhost:5173` if that is the port exposed by the
Compose configuration.

## Supporting documents

-   [`DESIGN_DOC.md`](./DESIGN_DOC.md) --- architecture and calculation
    approach.
-   [`TEST_REPORT.md`](./TEST_REPORT.md) --- documented verification and
    load-test results.
-   [`schema.sql`](./schema.sql) --- proposed relational database
    schema.
-   [`tests/loadtest.js`](./tests/loadtest.js) --- load-test script.
-   [`data/sample_semester_4_campuses.csv`](./data/sample_semester_4_campuses.csv)
    --- sample semester data.

## Core progress metrics

The challenge defines progress using planned hours rather than the
number of topics:

-   **Hours in scope:** planned hours for topics included in the subject
    scope, excluding skipped topics.
-   **Covered hours:** completed topics count fully; in-progress topics
    count according to their completion percentage.
-   **Coverage percentage:** covered hours divided by hours in scope.
-   **Available hours:** teaching hours remaining before the target
    finish date, based on the timetable and working calendar.
-   **Buffer ratio:** available hours divided by remaining hours. The
    challenge's starting thresholds are `ON TRACK` at `1.15` or above,
    `TIGHT` from `1.00` to below `1.15`, and `DANGER` below `1.00`.
-   **Pace vs. plan:** covered hours minus the hours that should have
    been covered by the current date.

## Sample data and campus scope

The sample data is configured for **JUJ, HI-Tech, and RGIB**. It does
not include Ratnam campus.

## Current limitations

-   This is a project prototype, not a claim of a production-ready
    institutional system.
-   Connect and test authentication, database persistence, background
    alerts, and integrations before using real student or faculty data.
-   Do not commit passwords, API keys, or private student information to
    the repository.
-   Use only sample or consented data in demonstrations.

## Future improvements

-   Connect the interface to a working backend and PostgreSQL database.
-   Add and test role-based authentication and access controls.
-   Automate missed-session reminders and exam-readiness notifications.
-   Validate calculations against hand-checked semester data.
-   Run repeatable load tests and publish measured results.
-   Improve mobile usability for faculty session logging.

## Challenge

Built for **MSOT Problem 3 --- Course Progression Challenge**.
