import { SlidersHorizontal } from 'lucide-react'

export function FilterBar({ stops, sort, onStopsChange, onSortChange }) {
  return (
    <aside className="card filter-bar">
      <strong className="filter-bar__heading">
        <SlidersHorizontal size={17} aria-hidden="true" />
        Refine your search
      </strong>
      <label>
        Stops
        <select
          data-testid="filter-stops"
          value={stops}
          onChange={(event) => onStopsChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="0">Nonstop</option>
          <option value="1">1 stop</option>
        </select>
      </label>
      <label>
        Sort
        <select
          data-testid="filter-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="cheapest">Cheapest</option>
          <option value="fastest">Fastest</option>
        </select>
      </label>
    </aside>
  )
}
