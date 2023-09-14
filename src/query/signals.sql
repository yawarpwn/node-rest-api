DROP TABLE IF EXISTS signals;

CREATE TABLE
  signals (
    id CHAR(36) NOT NULL,
    code VARCHAR(10) NOT NULL,
    title TEXT NOT NULL,
    image_src TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    PRIMARY KEY (id)
  );
