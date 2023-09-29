-- DROP TABLE IF EXISTS images;
-- DROP TABLE IF EXISTS signals;

-- Crea la tabla signals
CREATE TABLE signals (
  id CHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL,
  category VARCHAR(255) NOT NULL,
  image_src VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  image_width INT NOT NULL CHECK (image_width > 0),
  image_height INT NOT NULL CHECK (image_height > 0),
  image_format VARCHAR(5)
);



