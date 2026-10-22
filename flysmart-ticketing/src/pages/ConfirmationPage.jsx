import { Link, Navigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { TicketSummary } from '../components/TicketSummary'
import { useBooking } from '../context/BookingContext'

export function ConfirmationPage() {
  const { confirmed } = useBooking()

  if (!confirmed) return <Navigate to="/" replace />

  return (
    <>
      <section className="card confirmation-card">
        <span className="confirmation-mark" aria-hidden="true">
          <Check size={30} strokeWidth={2.4} />
        </span>
        <p className="page-heading__eyebrow">You’re all set</p>
        <h1 className="page-title">Booking confirmed</h1>
        <p className="page-copy">
          Your demo e-ticket is ready. Status: {confirmed.status || 'confirmed'}.
        </p>
        <p>
          Booking reference: <strong data-testid="booking-id">{confirmed.id}</strong>
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
      </section>
    </>
  )
}
