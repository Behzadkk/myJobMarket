CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    details TEXT,
    price NUMBER,
    deadline TEXT,
    project_length NUMBER,
    hirer_id NUMBER,
    created_date TEXT,
    updated_date TEXT
);

INSERT INTO projects
    (title, details, price)
VALUES
    ("test", "check details", 10);