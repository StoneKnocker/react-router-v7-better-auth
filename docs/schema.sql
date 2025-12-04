-- User Table
CREATE TABLE user (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    emailVerified INTEGER, -- Use INTEGER for boolean (0 or 1)
    image TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Session Table
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    userId TEXT,
    token TEXT,
    expiresAt DATETIME,
    ipAddress TEXT,
    userAgent TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    FOREIGN KEY (userId) REFERENCES user(id)
);

-- Account Table
CREATE TABLE account (
    id TEXT PRIMARY KEY,
    userId TEXT,
    accountId TEXT,
    providerId TEXT,
    accessToken TEXT,
    refreshToken TEXT,
    accessTokenExpiresAt DATETIME,
    refreshTokenExpiresAt DATETIME,
    scope TEXT,
    idToken TEXT,
    password TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE verification (
    id TEXT PRIMARY KEY,
    identifier TEXT,
    value TEXT,
    expiresAt DATETIME,
    createdAt DATETIME,
    updatedAt DATETIME
);


