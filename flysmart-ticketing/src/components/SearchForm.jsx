import { useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { AIRPORTS } from '../types/flight'
import { DatePicker } from './DatePicker'

export function SearchForm({ onSubmit, defaultValues }) {
  const [form, setForm] = useState({
    tripType: defaultValues?.tripType || 'oneway',
    from: defaultValues?.from || 'RUH',
    to: defaultValues?.to || 'DXB',
    departDate: defaultValues?.departDate || '',
    returnDate: defaultValues?.returnDate || '',
    adults: defaultValues?.adults || 1,
  })
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (form.from === form.to) {
      setError('Origin and destination must be different.')
      return
    }
    if (!form.departDate) {
      setError('Choose a departure date.')
      return
    }
    if (form.tripType === 'roundtrip' && !form.returnDate) {
      setError('Choose a return date.')
      return
    }
    if (form.tripType === 'roundtrip' && form.returnDate < form.departDate) {
      setError('Return date must be after departure.')
      return
    }
    setError('')
    onSubmit({
      ...form,
      adults: Number(form.adults),
    })
  }

  return (
    <form className="card search-card" onSubmit={handleSubmit}>
      <div className="search-card__heading">
        <h2>Where would you like to go?</h2>
        <p>Choose your route and travel dates to compare available flights.</p>
      </div>
      {error ? <div className="error-banner">{error}</div> : null}
      <div className="form-grid">
        <label>
          Trip type
          <select
            data-testid="search-trip-type"
            value={form.tripType}
            onChange={(event) => update('tripType', event.target.value)}
          >
            <option value="oneway">One way</option>
            <option value="roundtrip">Round trip</option>
          </select>
        </label>
        <label>
          From
          <select
            data-testid="search-from"
            value={form.from}
            onChange={(event) => update('from', event.target.value)}
          >
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </label>
        <label>
          To
          <select
            data-testid="search-to"
            value={form.to}
            onChange={(event) => update('to', event.target.value)}
          >
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </label>
        <div className="form-field">
          <DatePicker
            label={<span className="field-label">Depart</span>}
            value={form.departDate}
            onChange={(date) => update('departDate', date)}
            testId="search-depart"
          />
        </div>
        {form.tripType === 'roundtrip' && (
        <div className="form-field">
          <DatePicker
            label={<span className="field-label">Return</span>}
            value={form.returnDate}
            onChange={(date) => update('returnDate', date)}
            minDate={form.departDate}
          />
        </div>
        )}
        <label>
          Adults
          <input
            data-testid="search-adults"
            type="number"
            min="1"
            max="9"
            value={form.adults}
            onChange={(event) => update('adults', event.target.value)}
          />
        </label>
      </div>
      <div className="actions">
        <button data-testid="search-submit" className="btn btn-primary" type="submit">
          <Search size={17} aria-hidden="true" />
          Search flights
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
