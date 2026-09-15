CREATE TABLE IF NOT EXISTS flights (
  id TEXT PRIMARY KEY,
  airline TEXT NOT NULL,
  from_code TEXT NOT NULL,
  to_code TEXT NOT NULL,
  depart_time TEXT NOT NULL,
  arrive_time TEXT NOT NULL,
  duration TEXT NOT NULL,
  stops INTEGER NOT NULL DEFAULT 0,
  cabin TEXT NOT NULL,
  price_sar INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  flight_id TEXT NOT NULL REFERENCES flights(id),
  search JSONB NOT NULL,
  traveller JSONB NOT NULL,
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
