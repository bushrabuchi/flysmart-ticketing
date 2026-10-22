import { useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  CircleDollarSign,
  Compass,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { SearchForm } from '../components/SearchForm'
import { Stepper } from '../components/Stepper'
import { useBooking } from '../context/BookingContext'

export function SearchPage() {
  const navigate = useNavigate()
  const { setSearch, search } = useBooking()

  async function handleSubmit(query) {
    await setSearch(query)
    navigate('/flights')
  }

  return (
    <div className="search-page">
      <section className="search-landing">
        <div className="search-landing__inner">
          <Stepper current="/" />
          <div className="search-landing__intro">
            <span className="search-landing__eyebrow">
              <Sparkles size={15} aria-hidden="true" />
              A smarter way to explore
            </span>
            <h1>Go where your story takes you.</h1>
            <p>Compare flights, find your fare, and make your next trip happen.</p>
          </div>
          <SearchForm onSubmit={handleSubmit} defaultValues={search || undefined} />
          <div className="search-trust" aria-label="Booking highlights">
            <span><BadgeCheck size={16} /> Easy-to-compare options</span>
            <span><CircleDollarSign size={16} /> Clear, upfront fares</span>
            <span><ShieldCheck size={16} /> Secure demo checkout</span>
          </div>
        </div>
      </section>
      <section className="about-section" aria-labelledby="about-title">
        <div className="about-section__inner">
          <div className="about-section__intro">
            <span className="page-heading__eyebrow">About Fly Smart</span>
            <h2 id="about-title">A little less planning.<br />A lot more somewhere.</h2>
            <p>
              We make it easier to explore your flight options, compare fares,
              and take the next step toward a trip worth remembering.
            </p>
          </div>
          <div className="about-section__features">
            <article className="about-feature">
              <span className="about-feature__icon"><Compass size={20} /></span>
              <h3>Find your way</h3>
              <p>Search routes and explore available flight options in one place.</p>
            </article>
            <article className="about-feature">
              <span className="about-feature__icon"><CircleDollarSign size={20} /></span>
              <h3>Choose with clarity</h3>
              <p>Compare schedules, stops, and fares before choosing a flight.</p>
            </article>
            <article className="about-feature">
              <span className="about-feature__icon"><ShieldCheck size={20} /></span>
              <h3>Book a demo</h3>
              <p>Try the complete booking flow with a simulated, no-charge checkout.</p>
            </article>
          </div>
          <a
            className="about-section__credit"
            href="https://unsplash.com"
            target="_blank"
            rel="noreferrer"
          >
            Hero photo via Unsplash
          </a>
        </div>
      </section>
    </div>
  )
}
