import { Link } from "react-router-dom";
import { HelpCircle, Globe, Heart, User, Plane } from "lucide-react";
import "../styles/_header.scss";
export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Logo */}
        <Link className="brand" to="/">
          <span className="brand__mark">
            <Plane size={16} strokeWidth={2.25} />
          </span>
          <span className="brand__wordmark">
            <span className="brand__name">Fly Smart</span>
            <span className="brand__tag">Ticketing</span>
          </span>
        </Link>

        {/* Ticket-stub divider */}
        <span className="site-header__stub" aria-hidden="true" />

        {/* Right navigation */}
        <nav className="header-actions" aria-label="Account">
          <button className="header-actions__link" type="button">
            <HelpCircle size={18} strokeWidth={2} />
            <span>Help</span>
          </button>

          <button
            className="header-actions__icon"
            type="button"
            aria-label="Language and region"
          >
            <Globe size={18} strokeWidth={2} />
          </button>

          <button
            className="header-actions__icon"
            type="button"
            aria-label="Saved trips"
          >
            <Heart size={18} strokeWidth={2} />
          </button>

          <button className="header-actions__link" type="button">
            <User size={18} strokeWidth={2} />
            <span>Log in</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
