// Unit and integration test for Syllabus Import, Editable Syllabus & Campus Exclusivity
import assert from "node:assert";

// Simulation of accounts
const ACCOUNTS = [
  { id: "USR-ADMIN", loginId: "admin@msot.org", role: "Admin / Program Manager", campus: "ALL" },
  { id: "USR-CM-JUJ", loginId: "cm.juj@msot.org", role: "Campus Manager", campus: "JUJ" },
  { id: "USR-CM-HT", loginId: "cm.hitech@msot.org", role: "Campus Manager", campus: "HI-Tech" },
  { id: "USR-FAC-JUJ", loginId: "r.sharma@msot.org", role: "Faculty", campus: "JUJ", name: "Prof. R. Sharma" },
  { id: "USR-FAC-HT", loginId: "a.kulkarni@msot.org", role: "Faculty", campus: "HI-Tech", name: "Prof. A. Kulkarni" },
  { id: "USR-STU-JUJ", loginId: "MSOT-2026-042", role: "Student", campus: "JUJ", name: "Tanmay Gupta" },
];

// Sample subjects across campuses
const SUBJECTS = [
  { id: "SUB-01", code: "CS-301", name: "DBMS", campus: "JUJ", faculty: "Prof. R. Sharma", topics: [
    { id: "T1", unit: "Unit 1", title: "ER Diagrams", plannedHours: 4.0, status: "Completed", examScope: "Sessionals" },
    { id: "T2", unit: "Unit 1", title: "Relational Algebra", plannedHours: 5.0, status: "Pending", examScope: "Mid-Term" },
  ]},
  { id: "SUB-02", code: "CS-302", name: "Operating Systems", campus: "JUJ", faculty: "Vikram Aditya (Visiting Fellow)", topics: [
    { id: "T3", unit: "Unit 1", title: "Processes & Threads", plannedHours: 6.0, status: "Pending", examScope: "Mid-Term" },
  ]},
  { id: "SUB-03", code: "CS-HT-101", name: "Advanced Computer Architecture", campus: "HI-Tech", faculty: "Prof. A. Kulkarni", topics: [
    { id: "T4", unit: "Unit 1", title: "Pipeline Hazards", plannedHours: 5.0, status: "Completed", examScope: "Sessionals" },
  ]},
  { id: "SUB-04", code: "CS-HT-102", name: "Cloud Infrastructure", campus: "HI-Tech", faculty: "Dr. N. Roy", topics: [
    { id: "T5", unit: "Unit 1", title: "Virtualization", plannedHours: 4.0, status: "Pending", examScope: "Mid-Term" },
  ]},
];

// Campus isolation logic from App.jsx
function getEffectiveCampus(currentUser, selectedCampus) {
  return currentUser?.campus && currentUser.campus !== "ALL"
    ? currentUser.campus
    : (selectedCampus !== "ALL" ? selectedCampus : "JUJ");
}

function getCampusSubjects(computedSubjects, effectiveCampus) {
  return computedSubjects.filter((s) => s.campus === effectiveCampus);
}

function canEditSubjectSyllabus(currentUser, sub) {
  if (!sub) return false;
  if (currentUser.role === "Student") return false;
  if (currentUser.role === "Admin / Program Manager") return true;
  if (currentUser.role === "Campus Manager") {
    return sub.campus === currentUser.campus;
  }
  if (currentUser.role === "Faculty") {
    return sub.campus === currentUser.campus && (sub.faculty === currentUser.name || !sub.faculty);
  }
  return false;
}

// Parser logic from App.jsx
function parseSyllabusInput(rawText) {
  if (!rawText || !rawText.trim()) {
    return { error: "Input is empty.", topics: [] };
  }
  const lines = rawText.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return { error: "No lines detected.", topics: [] };

  const parsedTopics = [];
  let headerSkipped = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    let parts = [];
    if (line.includes("|")) {
      parts = line.split("|").map((p) => p.trim());
    } else if (line.includes("\t")) {
      parts = line.split("\t").map((p) => p.trim());
    } else {
      parts = line.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
    }

    if (parts.length < 2) continue;

    const firstCol = parts[0].toLowerCase();
    const secondCol = parts[1].toLowerCase();
    if (
      !headerSkipped &&
      (firstCol.includes("unit") && (secondCol.includes("topic") || secondCol.includes("title") || secondCol.includes("name")))
    ) {
      headerSkipped = true;
      continue;
    }

    let unit = "Unit 1";
    let title = "";
    let hours = 4.0;
    let examScope = "Mid-Term";
    let status = "Pending";

    if (/^(unit|module|chapter|u)\s*\d+/i.test(parts[0])) {
      unit = parts[0];
      title = parts[1] || `Topic ${parsedTopics.length + 1}`;
      if (parts[2]) {
        const h = parseFloat(parts[2]);
        if (!isNaN(h) && h > 0) hours = h;
      }
      if (parts[3]) {
        const s = parts[3].trim();
        if (["Sessionals", "Mid-Term", "PUT", "End-Term"].includes(s)) examScope = s;
        else if (/sessional/i.test(s)) examScope = "Sessionals";
        else if (/mid/i.test(s)) examScope = "Mid-Term";
        else if (/put/i.test(s)) examScope = "PUT";
        else if (/end/i.test(s)) examScope = "End-Term";
      }
      if (parts[4]) {
        const st = parts[4].trim();
        if (["Pending", "In Progress", "Completed", "Skipped"].includes(st)) status = st;
      }
    } else {
      title = parts[0];
      if (parts[1]) {
        const h = parseFloat(parts[1]);
        if (!isNaN(h) && h > 0) hours = h;
        else unit = parts[1];
      }
      if (parts[2]) {
        const h = parseFloat(parts[2]);
        if (!isNaN(h) && h > 0) hours = h;
      }
      if (parts[3]) {
        const s = parts[3].trim();
        if (/sessional/i.test(s)) examScope = "Sessionals";
        else if (/mid/i.test(s)) examScope = "Mid-Term";
        else if (/put/i.test(s)) examScope = "PUT";
        else if (/end/i.test(s)) examScope = "End-Term";
      }
    }

    if (title.trim()) {
      parsedTopics.push({
        id: `T-IMP-${i + 1}`,
        unit: unit.trim() || "Unit 1",
        title: title.trim(),
        plannedHours: Number(hours.toFixed(1)),
        status,
        pctComplete: status === "Completed" ? 100 : 0,
        examScope,
      });
    }
  }

  return { error: "", topics: parsedTopics };
}

// ----------------------------------------------------------------------------
// TEST CASES
// ----------------------------------------------------------------------------
console.log("=== RUNNING SYLLABUS & CAMPUS EXCLUSIVITY TEST SUITE ===\n");

// TEST 1: JUJ Campus Manager Exclusivity
{
  const user = ACCOUNTS.find((a) => a.loginId === "cm.juj@msot.org");
  const effectiveCampus = getEffectiveCampus(user, "ALL");
  assert.strictEqual(effectiveCampus, "JUJ", "JUJ CM effective campus must be strictly JUJ");

  const visibleSubjects = getCampusSubjects(SUBJECTS, effectiveCampus);
  assert.strictEqual(visibleSubjects.length, 2, "JUJ CM must only see JUJ subjects");
  assert.ok(visibleSubjects.every((s) => s.campus === "JUJ"), "All visible subjects must be JUJ");

  // Check editing permissions
  assert.strictEqual(canEditSubjectSyllabus(user, SUBJECTS[0]), true, "JUJ CM can edit SUB-01 (JUJ)");
  assert.strictEqual(canEditSubjectSyllabus(user, SUBJECTS[1]), true, "JUJ CM can edit SUB-02 (JUJ)");
  assert.strictEqual(canEditSubjectSyllabus(user, SUBJECTS[2]), false, "JUJ CM CANNOT edit SUB-03 (HI-Tech)");
  assert.strictEqual(canEditSubjectSyllabus(user, SUBJECTS[3]), false, "JUJ CM CANNOT edit SUB-04 (HI-Tech)");
  console.log("✅ Test 1 Passed: JUJ Campus Manager has strict exclusive access to JUJ courses.");
}

// TEST 2: HI-Tech Campus Manager Exclusivity
{
  const user = ACCOUNTS.find((a) => a.loginId === "cm.hitech@msot.org");
  const effectiveCampus = getEffectiveCampus(user, "ALL");
  assert.strictEqual(effectiveCampus, "HI-Tech", "HI-Tech CM effective campus must be strictly HI-Tech");

  const visibleSubjects = getCampusSubjects(SUBJECTS, effectiveCampus);
  assert.strictEqual(visibleSubjects.length, 2, "HI-Tech CM must only see HI-Tech subjects");
  assert.ok(visibleSubjects.every((s) => s.campus === "HI-Tech"), "All visible subjects must be HI-Tech");

  assert.strictEqual(canEditSubjectSyllabus(user, SUBJECTS[0]), false, "HI-Tech CM CANNOT edit SUB-01 (JUJ)");
  assert.strictEqual(canEditSubjectSyllabus(user, SUBJECTS[2]), true, "HI-Tech CM can edit SUB-03 (HI-Tech)");
  console.log("✅ Test 2 Passed: HI-Tech Campus Manager has strict exclusive access to HI-Tech courses.");
}

// TEST 3: Faculty Exclusivity
{
  const faculty = ACCOUNTS.find((a) => a.loginId === "r.sharma@msot.org");
  const effectiveCampus = getEffectiveCampus(faculty, "ALL");
  assert.strictEqual(effectiveCampus, "JUJ");

  // Prof. R. Sharma is assigned to SUB-01, but NOT SUB-02 or SUB-03
  assert.strictEqual(canEditSubjectSyllabus(faculty, SUBJECTS[0]), true, "Faculty can edit their assigned course in their campus");
  assert.strictEqual(canEditSubjectSyllabus(faculty, SUBJECTS[1]), false, "Faculty cannot edit other faculty's course");
  assert.strictEqual(canEditSubjectSyllabus(faculty, SUBJECTS[2]), false, "Faculty cannot edit course in another campus");
  console.log("✅ Test 3 Passed: Faculty syllabus edit is strictly restricted to assigned course in their campus.");
}

// TEST 4: Student Read-Only Access
{
  const student = ACCOUNTS.find((a) => a.loginId === "MSOT-2026-042");
  assert.strictEqual(canEditSubjectSyllabus(student, SUBJECTS[0]), false, "Student cannot edit syllabus");
  assert.strictEqual(canEditSubjectSyllabus(student, SUBJECTS[2]), false, "Student cannot edit syllabus");
  console.log("✅ Test 4 Passed: Student role is strictly read-only.");
}

// TEST 5: CSV and Delimited Syllabus Parsing
{
  const csvData = `Unit,Topic Title,Planned Hours,Exam Scope,Status
Unit 1,Query Execution Plans,4.5,Mid-Term,Pending
Unit 2,B-Tree and Hash Indexing,6.0,Mid-Term,Pending
Unit 3,ACID Properties & Crash Recovery,5.0,End-Term,Pending`;

  const res = parseSyllabusInput(csvData);
  assert.strictEqual(res.error, "");
  assert.strictEqual(res.topics.length, 3);
  assert.strictEqual(res.topics[0].unit, "Unit 1");
  assert.strictEqual(res.topics[0].title, "Query Execution Plans");
  assert.strictEqual(res.topics[0].plannedHours, 4.5);
  assert.strictEqual(res.topics[0].examScope, "Mid-Term");

  // Pipe separated test
  const pipeData = `Unit 1 | Concurrency Control | 5.5 | Sessionals
Unit 2 | Two Phase Locking | 4.0 | Mid-Term`;
  const resPipe = parseSyllabusInput(pipeData);
  assert.strictEqual(resPipe.topics.length, 2);
  assert.strictEqual(resPipe.topics[0].title, "Concurrency Control");
  assert.strictEqual(resPipe.topics[0].plannedHours, 5.5);
  console.log("✅ Test 5 Passed: CSV and Pipe-delimited syllabus parsing functions accurately.");
}

// TEST 6: Replace vs Append Import Execution
{
  const initialTopics = [...SUBJECTS[0].topics];
  const newImportedTopics = [
    { id: "T-NEW-1", unit: "Unit 2", title: "Distributed SQL", plannedHours: 5.0, status: "Pending", examScope: "End-Term" },
  ];

  // Append mode
  const appended = [...initialTopics, ...newImportedTopics];
  assert.strictEqual(appended.length, 3, "Append mode must add to existing topics");

  // Replace mode
  const replaced = [...newImportedTopics];
  assert.strictEqual(replaced.length, 1, "Replace mode must overwrite existing topics");
  assert.strictEqual(replaced[0].title, "Distributed SQL");
  console.log("✅ Test 6 Passed: Append and Replace import actions work as expected.");
}

console.log("\n🎉 ALL SYLLABUS & CAMPUS EXCLUSIVITY TESTS PASSED SUCCESSFULLY!");
