-- CREATE DATABASE sugar;

USE DATABASE sugar;

CREATE TABLE ads (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description VARCHAR(1000),
  voice_description VARCHAR(1000),
  price DECIMAL NOT NULL,
  images VARCHAR(1000)[] NOT NULL,
  category INTEGER NOT NULL,
  created_date TIMESTAMP NOT NULL,
  modified_date TIMESTAMP NOT NULL
);
