CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    details TEXT,
    price NUMBER,
    required_day TEXT,
    project_length NUMBER
    hirer_id NUMBER,
    created_date TEXT
)


