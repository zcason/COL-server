CREATE TABLE col_users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email Text NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL
);