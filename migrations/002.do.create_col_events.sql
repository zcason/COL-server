-- creates the table for event specific data
CREATE TABLE col_events(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    event_desc TEXT,
    event_date TIMESTAMP NOT NULL
);

-- adds the event creator's user id to the table
ALTER TABLE col_events
    ADD COLUMN
    user_id INTEGER REFERENCES col_users(id) ON DELETE CASCADE NOT NULL;