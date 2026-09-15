import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { PaymentPage } from './pages/PaymentPage'
import { ResultsPage } from './pages/ResultsPage'
import { SearchPage } from './pages/SearchPage'
import { TravellersPage } from './pages/TravellersPage'
import { Header } from './components/Header'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/flights" element={<ResultsPage />} />
            <Route path="/travellers" element={<TravellersPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BookingProvider>
  )
}
