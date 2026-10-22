import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'
import '../styles/_header.scss'

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/">
          <span className="brand__mark">
            <Plane size={18} strokeWidth={2.2} />
          </span>
          <span className="brand__wordmark">
            <span className="brand__name">Fly Smart</span>
            <span className="brand__tag">A better way to travel</span>
          </span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          <Link to="/">Find flights</Link>
          <span className="header-nav__status">Demo booking</span>
        </nav>
      </div>
    </header>
  )
}
