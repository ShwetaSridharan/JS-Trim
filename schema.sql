CREATE TABLE dependency_analysis (
  id SERIAL PRIMARY KEY,
  project_path TEXT NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);