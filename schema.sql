CREATE TABLE semesters (
  id SERIAL PRIMARY KEY,
  campus VARCHAR(32) NOT NULL,
  name VARCHAR(64) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  saturday_rule VARCHAR(16) DEFAULT '2nd & 4th'
);

CREATE TABLE calendar_holidays (
  id SERIAL PRIMARY KEY,
  semester_id INT REFERENCES semesters(id) ON DELETE CASCADE,
  holiday_date DATE NOT NULL,
  title VARCHAR(120) NOT NULL
);

CREATE TABLE subjects (
  id VARCHAR(32) PRIMARY KEY,
  semester_id INT REFERENCES semesters(id),
  code VARCHAR(20) NOT NULL,
  name VARCHAR(120) NOT NULL,
  track VARCHAR(32) NOT NULL,
  batch VARCHAR(32) NOT NULL,
  faculty_email VARCHAR(120) NOT NULL,
  is_visiting BOOLEAN DEFAULT FALSE,
  hourly_honorarium NUMERIC(10,2) DEFAULT 0,
  target_finish_date DATE NOT NULL
);

CREATE TABLE timetable_slots (
  id SERIAL PRIMARY KEY,
  subject_id VARCHAR(32) REFERENCES subjects(id) ON DELETE CASCADE,
  weekday INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  derived_hours NUMERIC(4,2) NOT NULL
);

CREATE TABLE lesson_plan_topics (
  id VARCHAR(32) PRIMARY KEY,
  subject_id VARCHAR(32) REFERENCES subjects(id) ON DELETE CASCADE,
  sequence_order INT NOT NULL,
  unit_name VARCHAR(32) NOT NULL,
  topic_title VARCHAR(200) NOT NULL,
  planned_hours NUMERIC(5,2) NOT NULL,
  exam_scope VARCHAR(32) NOT NULL,
  status VARCHAR(24) DEFAULT 'Pending',
  pct_complete NUMERIC(5,2) DEFAULT 0,
  planned_date DATE
);

CREATE TABLE session_logs (
  id BIGSERIAL PRIMARY KEY,
  topic_id VARCHAR(32) REFERENCES lesson_plan_topics(id),
  faculty_email VARCHAR(120) NOT NULL,
  logged_status VARCHAR(24) NOT NULL,
  pct_complete NUMERIC(5,2) NOT NULL,
  covered_notes TEXT,
  leftover_notes TEXT,
  carry_forward_topic VARCHAR(32),
  cw_status VARCHAR(24),
  hw_status VARCHAR(24),
  logging_duration_sec INT,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_topics_subject ON lesson_plan_topics(subject_id, sequence_order);
CREATE INDEX idx_logs_faculty_date ON session_logs(faculty_email, logged_at);
