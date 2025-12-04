drop table if exists face_analysis;
CREATE TABLE face_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip VARCHAR(128) NOT NULL,
    session_id VARCHAR(128) NOT NULL,
    user_email VARCHAR(128) DEFAULT NULL,
    user_image VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    analysis_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_face_analysis_ip ON face_analysis(ip);
CREATE INDEX idx_face_analysis_session_id ON face_analysis(session_id);
CREATE INDEX idx_face_analysis_user_email ON face_analysis(user_email);
