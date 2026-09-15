import { Link, Navigate } from 'react-router-dom'
import { TicketSummary } from '../components/TicketSummary'
import { useBooking } from '../context/BookingContext'

export function ConfirmationPage() {
  const { confirmed } = useBooking()

  if (!confirmed) return <Navigate to="/" replace />

  return (
    <>
      <h1 className="page-title">Booking confirmed</h1>
      <p className="page-copy">This is a demo e-ticket. Status: {confirmed.status || 'confirmed'}.</p>
      <div className="card">
        <p>
          Booking ID:{' '}
          <strong data-testid="booking-id">{confirmed.id}</strong>
        </p>
        <TicketSummary
          bookingId={confirmed.id}
          search={confirmed.search}
          flight={confirmed.flight}
          traveller={confirmed.traveller}
          paymentMethod={confirmed.paymentMethod}
        />
        <div className="actions">
          <Link className="btn btn-primary" to="/">
            Book another trip
          </Link>
        </div>
      </div>
    </>
  )
}
