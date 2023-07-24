// appointment.ts

interface Participant {
  name: string
  email: string
  comment: string
  phone_number: string
  status: string
}

interface ConferencingDetails {
  meeting_code: string
  url: string
}

interface Conferencing {
  details: ConferencingDetails
  provider: string
}

interface Reminder {
  reminder_minutes: number
  reminder_method: string
}

export interface Appointment {
  id: string
  object: string
  account_id: string
  calendar_id: string
  ical_uid: string
  message_id: string
  title: string
  description: string
  owner: string
  participants: Participant[]
  read_only: boolean
  location: string
  when: {
    start_time: number
    end_time: number
    object: string
  }
  busy: boolean
  status: string
  original_start_time: string | null
  conferencing: Conferencing | null
  reminders: Reminder | null
  notifications: any[] // Update this type if needed
  organizer_email: string
  organizer_name: string
  hide_participants: boolean
  visibility: string
  customer_event_id: string
}

export default Appointment
