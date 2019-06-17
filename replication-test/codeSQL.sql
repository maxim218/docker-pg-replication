DROP TABLE IF EXISTS people;

CREATE TABLE people 
(
    people_id SERIAL PRIMARY KEY,
    people_name TEXT
);

INSERT INTO people (people_name) VALUES ('maxim');
INSERT INTO people (people_name) VALUES ('ann');
INSERT INTO people (people_name) VALUES ('george');
INSERT INTO people (people_name) VALUES ('alex');
INSERT INTO people (people_name) VALUES ('piter');

