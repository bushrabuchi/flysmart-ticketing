import { useNavigate } from 'react-router-dom'
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
    <>
      <Stepper current="/" />
      <h1 className="page-title">Search flights</h1>
      <p className="page-copy">Demo ticketing website </p>
      <SearchForm onSubmit={handleSubmit} defaultValues={search || undefined} />
    </>
  )
}
