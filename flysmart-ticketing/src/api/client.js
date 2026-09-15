const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Request failed (${response.status})`);
  }
  return payload;
}

export function searchFlights(from, to) {
  const params = new URLSearchParams({ from, to });
  console.log(
    `Searching flights from ${from} to ${to} with params:`,
    params.toString(),
  ); // Log the search parameters
  return request(`/flights?${params.toString()}`);
}

export function createBooking(body) {
  return request("/bookings", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function getBooking(id) {
  return request(`/bookings/${id}`);
}
