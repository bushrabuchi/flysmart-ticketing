import { Router } from "express";
import { AIRPORTS } from "./data/flights.js";
import { findFlightById, findFlights, getBooking, saveBooking } from "./db.js";

export const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "flysmart-ticketing-api" });
});

router.get("/airports", (_req, res) => {
  res.json({ airports: AIRPORTS });
});

router.get("/flights", async (req, res) => {
  const from = String(req.query.from || "").toUpperCase();
  const to = String(req.query.to || "").toUpperCase();
  if (!from || !to) {
    return res.status(400).json({ error: "from and to are required" });
  }
  const flights = await findFlights(from, to);
  res.json({ flights });
});

router.post("/bookings", async (req, res) => {
  const { flightId, search, traveller, paymentMethod } = req.body || {};
  if (!flightId || !search || !traveller) {
    return res
      .status(400)
      .json({ error: "flightId, search, and traveller are required" });
  }

  const flight = await findFlightById(flightId);
  if (!flight) {
    return res.status(404).json({ error: "Flight not found" });
  }

  const booking = await saveBooking({
    flight,
    search,
    traveller,
    paymentMethod: paymentMethod || "demo",
  });
  res.status(201).json(booking);
});

router.get("/bookings/:id", async (req, res) => {
  const booking = await getBooking(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.json(booking);
});
