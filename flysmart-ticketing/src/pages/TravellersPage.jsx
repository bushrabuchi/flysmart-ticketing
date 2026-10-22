import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Stepper } from "../components/Stepper";
import { TicketSummary } from "../components/TicketSummary";
import { useBooking } from "../context/BookingContext";

export function TravellersPage() {
  const navigate = useNavigate();
  const { search, selectedFlight, traveller, setTraveller } = useBooking();
  const [form, setForm] = useState({
    firstName: traveller?.firstName || "",
    lastName: traveller?.lastName || "",
    passport: traveller?.passport || "",
    email: traveller?.email || "",
    phone: traveller?.phone || "",
  });
  const [errors, setErrors] = useState({});

  if (!search) return <Navigate to="/" replace />;
  if (!selectedFlight) return <Navigate to="/flights" replace />;

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First name is required.";
    else if (!/^[A-Za-z ]+$/.test(form.firstName)) {
      newErrors.firstName = "First name can only contain letters and spaces.";
    }
    if (!form.lastName) newErrors.lastName = "Last name is required.";
    else if (!/^[A-Za-z ]+$/.test(form.lastName)) {
      newErrors.lastName = "Last name can only contain letters and spaces.";
    }
    if (!form.passport) newErrors.passport = "Passport is required.";
    else if (!/^[A-Za-z0-9]+$/.test(form.passport)) {
      newErrors.passport = "Enter a valid passport number.";
    }
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!form.phone) newErrors.phone = "Phone is required.";
    else if (!/^[0-9]{8,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setTraveller(form);
    navigate("/payment");
  }

  return (
    <>
      <Stepper current="/travellers" />
      <div className="page-heading">
        <div>
          <p className="page-heading__eyebrow">Almost there</p>
          <h1 className="page-title">Traveller information</h1>
          <p className="page-copy">
            Enter passenger details exactly as they appear on the passport.
          </p>
        </div>
      </div>
      <TicketSummary search={search} flight={selectedFlight} />
      <form
        className="card flow-form"
        style={{ marginTop: "1rem" }}
        onSubmit={handleSubmit}
      >
        {Object.keys(errors).length > 0 && (
          <div className="error-banner">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="form-grid">
          <label>
            First name
            <input
              data-testid="traveller-first-name"
              autoComplete="given-name"
              value={form.firstName}
              onChange={(event) => update("firstName", event.target.value)}
            />
          </label>
          <label>
            Last name
            <input
              data-testid="traveller-last-name"
              autoComplete="family-name"
              value={form.lastName}
              onChange={(event) => update("lastName", event.target.value)}
            />
          </label>
          <label>
            Passport
            <input
              data-testid="traveller-passport"
              autoComplete="off"
              value={form.passport}
              onChange={(event) => update("passport", event.target.value)}
            />
          </label>
          <label>
            Email
            <input
              data-testid="traveller-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </label>
          <label>
            Phone
            <input
              data-testid="traveller-phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
            />
          </label>
        </div>
        <div className="actions">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => navigate("/flights")}
          >
            Back
          </button>
          <button
            data-testid="continue-payment"
            className="btn btn-primary"
            type="submit"
          >
            Continue to payment
          </button>
        </div>
      </form>
    </>
  );
}
