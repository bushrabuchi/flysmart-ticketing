import { useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import "../styles/DatePicker.scss";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseISODate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDisplay(date) {
  if (!date) return null;
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildMonthGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const startOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1)
    cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isSameDay(a, b) {
  return (
    Boolean(a) &&
    Boolean(b) &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function DatePicker({ label, value, onChange, minDate, testId }) {
  const [open, setOpen] = useState(false);
  const selectedDate = useMemo(() => parseISODate(value), [value]);
  const minDateObj = useMemo(
    () =>
      parseISODate(minDate)
        ? startOfDay(parseISODate(minDate))
        : startOfDay(new Date()),
    [minDate],
  );
  const [viewDate, setViewDate] = useState(selectedDate ?? minDateObj);
  const rootRef = useRef(null);

  useOutsideClick(rootRef, () => setOpen(false), open);

  const cells = useMemo(() => buildMonthGrid(viewDate), [viewDate]);

  function goMonth(delta) {
    setViewDate(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + delta, 1),
    );
  }

  function isDisabled(date) {
    if (!date) return true;
    return startOfDay(date) < minDateObj;
  }

  function pick(date) {
    if (isDisabled(date)) return;
    onChange(toISODate(date));
    setOpen(false);
  }

  function toggleOpen() {
    setOpen((current) => {
      const next = !current;
      if (next) setViewDate(selectedDate ?? minDateObj);
      return next;
    });
  }

  return (
    <div className="date-picker" ref={rootRef}>
      {label ? <span className="date-picker__label">{label}</span> : null}

      <button
        type="button"
        className="date-picker__trigger"
        data-testid={testId}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggleOpen}
      >
        <Calendar size={16} strokeWidth={2} />
        <span className={selectedDate ? "" : "is-placeholder"}>
          {selectedDate ? formatDisplay(selectedDate) : "Select date"}
        </span>
      </button>

      {open ? (
        <div className="date-picker__panel" role="dialog" aria-label={label}>
          <div className="date-picker__header">
            <button
              type="button"
              onClick={() => goMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <strong>
              {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
            </strong>
            <button
              type="button"
              onClick={() => goMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>

          <div className="date-picker__weekdays">
            {WEEKDAYS.map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>

          <div className="date-picker__grid">
            {cells.map((date, index) => (
              <button
                key={index}
                type="button"
                disabled={isDisabled(date)}
                className={`date-picker__day${
                  date && isSameDay(date, selectedDate) ? " is-selected" : ""
                }${date && isSameDay(date, new Date()) ? " is-today" : ""}`}
                onClick={() => date && pick(date)}
              >
                {date ? date.getDate() : ""}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
