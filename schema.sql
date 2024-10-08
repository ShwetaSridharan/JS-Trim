CREATE TABLE dependency_analysis (
    id SERIAL PRIMARY KEY,
    code_snippet TEXT NOT NULL,
    results JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);