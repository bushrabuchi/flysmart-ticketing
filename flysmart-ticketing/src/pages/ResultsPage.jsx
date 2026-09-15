import { useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { FilterBar } from '../components/FilterBar'
import { FlightCard } from '../components/FlightCard'
import { Stepper } from '../components/Stepper'
import { useBooking } from '../context/BookingContext'

function durationMinutes(duration) {
  const match = duration.match(/(\d+)h\s*(\d+)m/)
  if (!match) return 0
  return Number(match[1]) * 60 + Number(match[2])
}

export function ResultsPage() {
  const navigate = useNavigate()
  const { search, flights, loading, error, selectFlight } = useBooking()
  const [stops, setStops] = useState('all')
  const [sort, setSort] = useState('cheapest')

  const visible = useMemo(() => {
    const filtered = flights.filter((flight) => {
      if (stops === 'all') return true
      return String(flight.stops) === stops
    })
    return [...filtered].sort((a, b) => {
      if (sort === 'fastest') {
        return durationMinutes(a.duration) - durationMinutes(b.duration)
      }
      return a.priceSar - b.priceSar
    })
  }, [flights, stops, sort])

  if (!search) return <Navigate to="/" replace />

  return (
    <>
      <Stepper current="/flights" />
      <h1 className="page-title">
        {search.from} → {search.to}
      </h1>
      <p className="page-copy">
        {search.departDate} · {search.adults} adult{search.adults > 1 ? 's' : ''}
      </p>
      {error ? <div className="info-banner">{error}</div> : null}
      {loading ? <div className="card">Loading flights…</div> : null}
      <div className="results-layout">
        <FilterBar
          stops={stops}
          sort={sort}
          onStopsChange={setStops}
          onSortChange={setSort}
        />
        <div>
          {visible.length === 0 && !loading ? (
            <div className="card empty" data-testid="empty-flights">
              No flights found — try another date or route.
            </div>
          ) : (
            visible.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={(selected) => {
                  selectFlight(selected)
                  navigate('/travellers')
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}
