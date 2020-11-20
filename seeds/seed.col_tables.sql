INSERT INTO col_users (email, full_name, password)
VALUES
('john.doe@gmail.com', 'John Doe', '$2a$12$aj5JBrHgyGld9Uf5IzReZ.N4GYcu.9hb/RkkmoPN/rbVTBHWZTFKa'),
('mary.doe@gmail.com', ' Mary Doe', '$2a$12$Fyebq0VVPD5ZRfXxjC2qneHtJswLLGnBvZxkQvfVc/f1e.DOkR5fS'),
('dunder.mifflin@gmail.com', 'Dunder Mifflin', '$2a$12$GTDOcmnSw.uYiJKKZOGCEOD9VeEHZgJAMmWUn97.NJeCdLM.3Furu');


INSERT INTO col_events (title, event_desc, event_date, user_id)
VALUES
('Mary''s Concert', 'At the Scope, bring roses.', '2021-1-5 01:30:00', 1),
('Martketing Pitch Meeting', 'Look over pitch material.', '2020-12-18 18:00:00', 3),
('Pick Dry Cleaning', null, '2020-11-23 16:15:00', 1),
('15th Anniversary', 'Pick up gift from the Store', '2020-11-28 23:00:00', 2),
('Lunch with Clients', null, '2020-12-15 17:30:00', 3),
('Boxing Match', 'On PPV', '2020-12-8 00:00:00', 1);