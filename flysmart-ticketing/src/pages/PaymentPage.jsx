import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Stepper } from '../components/Stepper'
import { TicketSummary } from '../components/TicketSummary'
import { useBooking } from '../context/BookingContext'

export function PaymentPage() {
  const navigate = useNavigate()
  const { search, selectedFlight, traveller, confirm, loading, error } = useBooking()
  const [method, setMethod] = useState('mada')
  const [agreed, setAgreed] = useState(false)
  const [formError, setFormError] = useState('')

  if (!search) return <Navigate to="/" replace />
  if (!selectedFlight) return <Navigate to="/flights" replace />
  if (!traveller) return <Navigate to="/travellers" replace />

  async function handlePay(event) {
    event.preventDefault()
    if (!agreed) {
      setFormError('Please accept the demo terms to continue.')
      return
    }
    await confirm(method)
    navigate('/confirmation')
  }

  return (
    <>
      <Stepper current="/payment" />
      <h1 className="page-title">Review and pay</h1>
      <p className="page-copy">Demo payment only — no card numbers are collected or charged.</p>
      <TicketSummary search={search} flight={selectedFlight} traveller={traveller} />
      <form className="card" style={{ marginTop: '1rem' }} onSubmit={handlePay}>
        {formError ? <div className="error-banner">{formError}</div> : null}
        {error ? <div className="info-banner">{error}</div> : null}
        <label>
          Payment method
          <select
            data-testid="payment-method"
            value={method}
            onChange={(event) => setMethod(event.target.value)}
          >
            <option value="mada">Mada</option>
            <option value="card">Credit / debit card</option>
            <option value="applepay">Apple Pay</option>
          </select>
        </label>
        <label style={{ marginTop: '1rem', flexDirection: 'row', alignItems: 'center' }}>
          <input
            data-testid="agree-terms"
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          />
          I agree this is a demo booking and not a real ticket.
        </label>
        <div className="actions">
          <button className="btn btn-ghost" type="button" onClick={() => navigate('/travellers')}>
            Back
          </button>
          <button data-testid="pay-now" className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Processing…' : 'Pay now'}
          </button>
        </div>
      </form>
    </>
  )
}
