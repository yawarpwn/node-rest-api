DROP TABLE IF EXISTS quotations;

CREATE TABLE
  quotations (
    id TEXT PRIMARY KEY,
    quo_number INTEGER,
    company TEXT,
    ruc TEXT,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  );

INSERT INTO
  quotations (id, quo_number, company, ruc)
VALUES
  (
    'aaaa-bbbb-cccc',
    4000,
    "Proquinsa Productos Quimicos S.A.",
    '20999999999'
  );

SELECT
  *
FROM
  quotations;
