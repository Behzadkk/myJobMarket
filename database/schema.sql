CREATE TABLE projects (
    projectId INTEGER PRIMARY KEY AUTOINCREMENT,
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
(userId)
);

CREATE TABLE users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE applications (
    appId INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY
(project_id) REFERENCES projects
(ProjectId),
    FOREIGN KEY
(user_id) REFERENCES users
(userId)
);

-- INSERT INTO projects
--     (title, details, price)
-- VALUES
--     ("test", "check details", 10);