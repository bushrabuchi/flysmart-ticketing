export function TicketSummary({ search, flight, traveller, bookingId, paymentMethod }) {
  if (!flight || !search) return null

  return (
    <section className="ticket" data-testid="ticket-summary">
      <h3>{bookingId ? `E-ticket ${bookingId}` : 'Trip summary'}</h3>
      <dl>
        <dt>Route</dt>
        <dd>
          {search.from} → {search.to}
        </dd>
        <dt>Date</dt>
        <dd>{search.departDate}</dd>
        <dt>Flight</dt>
        <dd>
          {flight.airline} · {flight.id}
        </dd>
        <dt>Times</dt>
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
            <dt>Payment</dt>
            <dd>{paymentMethod}</dd>
          </>
        ) : null}
        <dt>Total</dt>
        <dd>SAR {flight.priceSar * (search.adults || 1)}</dd>
      </dl>
    </section>
  )
}
