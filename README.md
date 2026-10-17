# MSOT Pulse v2.0 — Live Course Progression & Early-Warning Platform (Problem 3)

Built for the **MSOT Course Progression Challenge (Problem 3)**. Tracks syllabus delivery across **HI-Tech, RGIB, and JUJ** for both the **Mirai Track** and **University Track** with 2-decimal mathematical parity, automatic timetable hour derivation, calendar-walking date shifts, strict RBAC faculty isolation, and `<60s` mobile faculty session logging.

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

## 📋 Submission Checklist Included in This Repo
- [x] **One-Command Setup:** `docker-compose.yml` + `Dockerfile` + `schema.sql`
- [x] **Architecture & Design Doc:** See [`DESIGN_DOC.md`](./DESIGN_DOC.md)
- [x] **Mandatory Test Report & Load Test Results:** See [`TEST_REPORT.md`](./TEST_REPORT.md) & [`tests/loadtest.js`](./tests/loadtest.js)
- [x] **4-Campus Sample Semester Dataset:** See [`data/sample_semester_4_campuses.csv`](./data/sample_semester_4_campuses.csv)
