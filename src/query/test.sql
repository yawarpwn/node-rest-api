CREATE TABLE
  products (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    cost REAL NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    unit_size TEXT NOT NULL
  );

INSERT INTO
  products (
    id,
    description,
    code,
    cost,
    price,
    category,
    unit_size
  )
VALUES
  (
    "abcd-efgh-ease",
    "Señal para obras vinil laminado con soporte triplay 4 mm",
    'TR',
    25,
    25,
    'obras',
    '20x30cm'
  );
