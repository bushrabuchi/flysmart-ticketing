/**
 * @typedef {'oneway' | 'roundtrip'} TripType
 * @typedef {'economy' | 'business'} Cabin
 *
 * @typedef {object} Flight
 * @property {string} id
 * @property {string} airline
 * @property {string} from
 * @property {string} to
 * @property {string} departTime
 * @property {string} arriveTime
 * @property {string} duration
 * @property {number} stops
 * @property {Cabin} cabin
 * @property {number} priceSar
 *
 * @typedef {object} SearchQuery
 * @property {string} from
 * @property {string} to
 * @property {string} departDate
 * @property {string} [returnDate]
 * @property {TripType} tripType
 * @property {number} adults
 *
 * @typedef {object} Traveller
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} passport
 * @property {string} email
 * @property {string} phone
 *
 * @typedef {object} Booking
 * @property {string} id
 * @property {SearchQuery} search
 * @property {Flight} flight
 * @property {Traveller} traveller
 * @property {string} [paymentMethod]
 * @property {string} [status]
 */

export const AIRPORTS = [
  { code: 'RUH', city: 'Riyadh' },
  { code: 'JED', city: 'Jeddah' },
  { code: 'DMM', city: 'Dammam' },
  { code: 'DXB', city: 'Dubai' },
  { code: 'AUH', city: 'Abu Dhabi' },
  { code: 'CAI', city: 'Cairo' },
  { code: 'LHR', city: 'London' },
]
