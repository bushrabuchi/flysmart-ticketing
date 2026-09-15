export function FlightCard({ flight, onSelect }) {
  return (
    <article className="card flight-card" data-testid="flight-card">
      <div>
        <strong>{flight.airline}</strong>
        <div className="flight-meta">
          <span>
            {flight.from} {flight.departTime} → {flight.to} {flight.arriveTime}
          </span>
          <span>{flight.duration}</span>
          <span>{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</span>
          <span>{flight.cabin}</span>
        </div>
      </div>
      <div>
        <div className="price" data-testid="flight-price">
          SAR {flight.priceSar}
        </div>
        <button
          data-testid="select-flight"
          className="btn btn-primary"
          type="button"
          onClick={() => onSelect(flight)}
        >
          Select
        </button>
      </div>
    </article>
  )
}
