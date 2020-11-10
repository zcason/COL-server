BEGIN;

TRUNCATE 
col_users
col_events
RESTART IDENTITY CASCADE;

INSERT INTO col_users (email, full_name, password)
VALUES
('john.doe@gmail.com', 'John Doe', 'johnpassword1'),
('mary.doe@gmail.com', ' Doe', 'password2'),
('dunder.mifflin@gmail.com', 'Dunder Mifflin', 'password3');


INSERT INTO col_events (title, event_desc, event_date, user_id)
VALUES
("Mary's Concert", "At the Scope, bring roses.", 2021-1-5 10:00:00-05, 1),
("Martketing Pitch Meeting", "Look over pitch material.", 2020-12-18 9:00:00-08, 3),
("Pick Dry Cleaning", null, 2020-11-23 13:15:00-05, 1),
("15th Anniversary", "Pick up gift from the Store", 2020-11-28 8:30:00-05, 2),
("Lunch with Clients", null, 2020-12-15 12:30:00-08, 3),
("Boxing Match", "On PPV", 2020-12-8 19:00:00-05, 1);