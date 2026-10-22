import { ArrowRight, Plane } from 'lucide-react'

export function FlightCard({ flight, onSelect }) {
  return (
    <article className="card flight-card" data-testid="flight-card">
      <div className="flight-card__airline">
        <span className="flight-card__mark" aria-hidden="true">
          {flight.airline.slice(0, 1)}
        </span>
        <div>
          <strong>{flight.airline}</strong>
          <small>{flight.id} · {flight.cabin}</small>
        </div>
      </div>

      <div className="flight-card__schedule" aria-label={`${flight.from} to ${flight.to}`}>
        <div>
          <strong>{flight.departTime}</strong>
          <small>{flight.from}</small>
        </div>
        <div className="flight-card__timeline">
          <small>{flight.duration}</small>
          <span><Plane size={13} aria-hidden="true" /></span>
          <small>{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</small>
        </div>
        <div>
          <strong>{flight.arriveTime}</strong>
          <small>{flight.to}</small>
        </div>
      </div>

      <div className="flight-card__offer">
        <span className="flight-card__price" data-testid="flight-price">
          SAR {flight.priceSar}
        </span>
        <span className="flight-card__per-person">per traveler</span>
        <button
          data-testid="select-flight"
          className="btn btn-primary"
          type="button"
          onClick={() => onSelect(flight)}
        >
          Choose flight <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
