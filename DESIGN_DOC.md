# MSOT Pulse v2.0 — Architecture & System Design Document (Problem 3)

## 1. System Architecture Diagram
```
+-------------------------------------------------------------------------+
|                        CLIENT LAYER (Mobile PWA)                        |
|  - <60s 1-Tap Faculty Session Logger  - Admin/CM Multi-Campus Dashboard |
|  - WhatsApp/Voice-Note LLM Parser     - Student Read-Only Batch Portal  |
|  - Weekly Timetable Builder           - .ics Google/Outlook Calendar    |
+------------------------------------+------------------------------------+
                                     | HTTPS / REST & RBAC Middleware
                                     v
+-------------------------------------------------------------------------+
|                    APPLICATION & CALCULATION ENGINE                     |
|  - Calendar-Walking Date Shifter (2nd & 4th Sat / Holiday Reflow)       |
|  - 2-Decimal Weighted Hours Engine (Scope, Covered, Buffer, Pace)       |
|  - Worst-Subject Track Roll-Up Aggregator (Mirai Track / Uni Track)     |
|  - Automated SLA Alert Worker (EOD Faculty Reminder -> 48h CM Escalate) |
+------------------------------------+------------------------------------+
                                     | Connection Pool (PgBouncer)
                                     v
+-------------------------------------------------------------------------+
|                      DATA & PERSISTENCE LAYER                           |
|  - PostgreSQL 16 (Semesters, Timetable Slots, Topics, Session Logs)     |
|  - SheetJS / CSV Bulk Importer & Visiting Faculty Honorarium Exporter   |
+-------------------------------------------------------------------------+
```

## 2. Deterministic Calendar-Walking & Mathematical Engine
Every metric strictly follows MSOT's weighted-hour definitions to 2 decimal places:
1. **Timetable Hour Derivation:** Each timetable slot (start_time, end_time) automatically computes (end - start) / 60 hours for its weekday.
2. **Hours in Scope:** Sum of planned_hours for all topics where status != 'Skipped'.
3. **Covered Hours:** Sum of planned_hours for Completed/Merged topics + Sum of (planned_hours * % complete) for In Progress topics.
4. **Available Hours:** Sum of timetable teaching hours between today + 1 and target_finish_date, dynamically excluding holidays and non-working Saturdays (all, none, or 2nd & 4th rule).
5. **Buffer Ratio:** Available Hours / Remaining Hours. Thresholds: >= 1.15 ON TRACK, 1.00-1.14 TIGHT, < 1.00 DANGER.
6. **Worst-Subject Roll-Up:** Track status for Mirai Track and University Track always displays min(Buffer Ratio) across its constituent subjects, never an average.
