import pg from "pg";
import { FLIGHTS } from "./data/flights.js";

const { Pool } = pg;

const memory = {
  flights: [...FLIGHTS],
  bookings: [],
};

let pool = null;
let postgresReady = false;

function mapFlight(row) {
  return {
    id: row.id,
    airline: row.airline,
    from: row.from_code,
    to: row.to_code,
    departTime: row.depart_time,
    arriveTime: row.arrive_time,
    duration: row.duration,
    stops: row.stops,
    cabin: row.cabin,
    priceSar: row.price_sar,
  };
}

export async function initDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("DATABASE_URL not set — using in-memory store");
    return { mode: "memory" };
  }

  pool = new Pool({ connectionString: url });
  try {
    await pool.query("SELECT 1");
    await pool.query(`
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
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        flight_id TEXT NOT NULL REFERENCES flights(id),
        search JSONB NOT NULL,
        traveller JSONB NOT NULL,
        payment_method TEXT,
        status TEXT NOT NULL DEFAULT 'confirmed',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const { rows } = await pool.query(
      "SELECT COUNT(*)::int AS count FROM flights",
    );
    if (rows[0].count === 0) {
      for (const flight of FLIGHTS) {
        await pool.query(
          `INSERT INTO flights
            (id, airline, from_code, to_code, depart_time, arrive_time, duration, stops, cabin, price_sar)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [
            flight.id,
            flight.airline,
            flight.from,
            flight.to,
            flight.departTime,
            flight.arriveTime,
            flight.duration,
            flight.stops,
            flight.cabin,
            flight.priceSar,
          ],
        );
      }
    }

    postgresReady = true;
    console.log("Connected to PostgreSQL");
    return { mode: "postgres" };
  } catch (error) {
    console.warn(
      "PostgreSQL unavailable, falling back to memory:",
      error.message,
    );
    postgresReady = false;
    return { mode: "memory" };
  }
}

export async function findFlights(from, to) {
  if (postgresReady) {
    const { rows } = await pool.query(
      "SELECT * FROM flights WHERE from_code = $1 AND to_code = $2 ORDER BY price_sar DESC",
      [from, to],
    );
    console.log(
      `Found ${rows.length} flights from ${from} to ${to} in PostgreSQL`,
    ); // Log the number of flights found
    return rows.map(mapFlight);
  }
  console.log(`Searching flights in memory from ${from} to ${to}`); // Log the search parameters
  return memory.flights.filter(
    (flight) => flight.from === from && flight.to === to,
  );
}

export async function findFlightById(id) {
  if (postgresReady) {
    const { rows } = await pool.query("SELECT * FROM flights WHERE id = $1", [
      id,
    ]);
    return rows[0] ? mapFlight(rows[0]) : null;
  }
  return memory.flights.find((flight) => flight.id === id) || null;
}

function bookingId() {
  return `AMS-${Math.floor(10000 + Math.random() * 90000)}`;
}

export async function saveBooking({
  flight,
  search,
  traveller,
  paymentMethod,
}) {
  const id = bookingId();
  const booking = {
    id,
    search,
    flight,
    traveller,
    paymentMethod,
    status: "confirmed",
  };

  if (postgresReady) {
    await pool.query(
      `INSERT INTO bookings (id, flight_id, search, traveller, payment_method, status)
       VALUES ($1,$2,$3,$4,$5,'confirmed')`,
      [id, flight.id, search, traveller, paymentMethod],
    );
  } else {
    console.log(`Saving booking ${id} to memory`); // Log the booking save
    memory.bookings.push(booking);
  }

  return booking;
}

export async function getBooking(id) {
  if (postgresReady) {
    const { rows } = await pool.query(
      `SELECT b.*, f.airline, f.from_code, f.to_code, f.depart_time, f.arrive_time,
              f.duration, f.stops, f.cabin, f.price_sar
       FROM bookings b
       JOIN flights f ON f.id = b.flight_id
       WHERE b.id = $1`,
      [id],
    );
    if (!rows[0]) return null;
    const row = rows[0];
    return {
      id: row.id,
      status: row.status,
      paymentMethod: row.payment_method,
      search: row.search,
      traveller: row.traveller,
      flight: mapFlight({
        id: row.flight_id,
        airline: row.airline,
        from_code: row.from_code,
        to_code: row.to_code,
        depart_time: row.depart_time,
        arrive_time: row.arrive_time,
        duration: row.duration,
        stops: row.stops,
        cabin: row.cabin,
        price_sar: row.price_sar,
      }),
    };
  }
  console.log(`Retrieving booking ${id} from memory`); // Log the booking retrieval
  return memory.bookings.find((booking) => booking.id === id) || null;
}
