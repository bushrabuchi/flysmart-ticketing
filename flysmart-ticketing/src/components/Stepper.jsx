const STEPS = [
  { path: '/', label: 'Search' },
  { path: '/flights', label: 'Flights' },
  { path: '/travellers', label: 'Travellers' },
  { path: '/payment', label: 'Pay' },
]

export function Stepper({ current }) {
  const currentIndex = STEPS.findIndex((step) => step.path === current)

  return (
    <nav className="stepper" aria-label="Booking steps">
      {STEPS.map((step, index) => {
        const state = index < currentIndex ? 'done' : index === currentIndex ? 'active' : ''
        return (
          <div
            key={step.path}
            className={`step ${state}`}
            data-step={index + 1}
            aria-current={index === currentIndex ? 'step' : undefined}
          >
            {step.label}
          </div>
        )
      })}
    </nav>
  )
}
