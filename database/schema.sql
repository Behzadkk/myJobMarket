CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    details TEXT,
    price NUMBER,
    deadline TEXT,
    project_length NUMBER,
    hirer_id NUMBER NOT NULL,
    created_date TEXT,
    updated_date TEXT,
    FOREIGN KEY
(hirer_id) REFERENCES users
(id)
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE applications (
    application_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY
(project_id) REFERENCES projects
(id),
    FOREIGN KEY
(user_id) REFERENCES users
(id)
);

-- INSERT INTO projects
--     (title, details, price)
-- VALUES
--     ("test", "check details", 10);