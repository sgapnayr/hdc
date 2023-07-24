const Nylas = require('nylas')
Nylas.config({ clientId: process.env.NYLAS_CLIENT_ID, clientSecret: process.env.NYLAS_CLIENT_SECRET })
const nylas = Nylas.with(process.env.NYLAS_ACCESS_TOKEN)

// Return all events found for the user's account
nylas.events.list().then((events) => console.log(events))

// Return events that are filtered by specified arguments
nylas.events.list({ title: 'Birthday Party!' }).then((events) => console.log(events))
// Available filters: show_cancelled, event_id, calendar_id, description, title,
// location, starts_before, starts_after, ends_before, ends_after

// Use offset, and limit to paginate the results
nylas.events.list({ limit: 10, offset: 5 }).then((events) => console.log(events))

// Expand recurring events into multiple event objects.
nylas.events.list({ expand_recurring: true }).then((events) => console.log(events))

// Event metadata
nylas.events.list({ calendar_id: 'CALENDAR_ID', metadata_pair: { event_type: 'gathering' } }).then((events) => console.log(events))

// Return the first event
const event = await nylas.events.first()

// The following attributes are available for the event object
event.id
event.object
event.accountId
event.calendarId
event.messageId
event.title
event.description
event.owner
event.participants
event.readOnly
event.location
event.when
event.when.startTime
event.when.endTime
event.when.startDate
event.when.endDate
event.busy
event.status
event.iCalUID
event.metadata
event.conferencing
event.conferencing.provider
event.conferencing.details.url
event.conferencing.details.password
event.conferencing.details.meetingCode
event.conferencing.details.phone
event.conferencing.details.pin
