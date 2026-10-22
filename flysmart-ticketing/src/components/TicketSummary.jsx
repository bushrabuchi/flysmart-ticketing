export function TicketSummary({ search, flight, traveller, bookingId, paymentMethod }) {
  if (!flight || !search) return null

  return (
    <section className="ticket" data-testid="ticket-summary">
      <h3>{bookingId ? `E-ticket · ${bookingId}` : 'Your trip at a glance'}</h3>
      <dl>
        <dt>Flight route</dt>
        <dd>
          {search.from} → {search.to}
        </dd>
        <dt>Departure</dt>
        <dd>{search.departDate}</dd>
        <dt>Airline & flight</dt>
        <dd>
          {flight.airline} · {flight.id}
        </dd>
        <dt>Schedule</dt>
        <dd>
          {flight.departTime} – {flight.arriveTime} ({flight.duration})
        </dd>
        <dt>Cabin</dt>
        <dd>{flight.cabin}</dd>
        {traveller ? (
          <>
            <dt>Passenger</dt>
            <dd>
              {traveller.firstName} {traveller.lastName}
            </dd>
          </>
        ) : null}
        {paymentMethod ? (
          <>
            <dt>Payment method</dt>
            <dd>{paymentMethod}</dd>
          </>
        ) : null}
        <dt>Total · {search.adults || 1} traveler{(search.adults || 1) > 1 ? 's' : ''}</dt>
        <dd>SAR {(flight.priceSar * (search.adults || 1)).toLocaleString()}</dd>
      </dl>
    </section>
  )
}
