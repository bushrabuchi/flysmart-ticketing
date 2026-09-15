import { createContext, useContext, useMemo, useState } from "react";
import {
  createBooking as createBookingApi,
  searchFlights,
} from "../api/client";
import { MOCK_FLIGHTS } from "../data/flights";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [search, setSearch] = useState(null);
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [traveller, setTraveller] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runSearch(query) {
    setError("");
    setLoading(true);
    setSearch(query);
    setSelectedFlight(null);
    setTraveller(null);
    setConfirmed(null);

    try {
      const data = await searchFlights(query.from, query.to);
      setFlights(data.flights || []);
    } catch {
      const fallback = MOCK_FLIGHTS.filter(
        (flight) => flight.from === query.from && flight.to === query.to,
      );
      setFlights(fallback);
      setError("Live API unavailable — showing demo flights.");
    } finally {
      setLoading(false);
    }
  }

  async function confirm(paymentMethod) {
    if (!search || !selectedFlight || !traveller) {
      throw new Error("Booking is incomplete");
    }

    setLoading(true);
    setError("");
    try {
      const booking = await createBookingApi({
        flightId: selectedFlight.id,
        search,
        traveller,
        paymentMethod,
      });
      setConfirmed(booking);
      return booking;
    } catch {
      const booking = {
        id: `AMS-${Math.floor(10000 + Math.random() * 90000)}`,
        search,
        flight: selectedFlight,
        traveller,
        paymentMethod,
        status: "confirmed",
      };
      setConfirmed(booking);
      setError("Live API unavailable — demo booking created locally.");
      return booking;
    } finally {
      setLoading(false);
    }
  }

  const value = useMemo(
    () => ({
      search,
      flights,
      selectedFlight,
      traveller,
      confirmed,
      loading,
      error,
      setSearch: runSearch,
      selectFlight: setSelectedFlight,
      setTraveller,
      confirm,
      setError,
    }),
    [search, flights, selectedFlight, traveller, confirmed, loading, error],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }
  return context;
}
