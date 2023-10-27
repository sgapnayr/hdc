<template>
  <div>
    <!-- Create a button and give it an ID to reference later -->
    <button type="button" @click="openScheduleEditor" class="bg-honeydew-purple px-3 p-1 text-white rounded-[80px] cursor-pointer">Open Schedule Editor</button>
  </div>
</template>

<script>
import Logo from '@/assets/icons/honeydew-icon.svg'

export default {
  mounted() {
    // Load the Nylas Schedule Editor script when the component is mounted
    const script = document.createElement('script')
    script.src = 'https://schedule.nylas.com/schedule-editor/v1.0/schedule-editor.js'
    script.async = true
    document.head.appendChild(script)
  },
  methods: {
    openScheduleEditor() {
      const patientIdFromRoute = this.$route.params.patientId
      nylas.scheduler.show({
        auth: {
          accessToken: '6cP8Q2C1QS8NZPGzKGUoZNlBRvUpq7',
        },
        style: {
          tintColor: '#32325d',
          backgroundColor: 'white',
        },
        behavior: {
          displayOnly: ['event-info', 'opening-hours', 'calendars'],
        },
        defaults: {
          event: {
            title: 'Meeting with Honeydew',
            duration: 30,
          },
          appearance: {
            company_name: 'Honeydew Care',
          },
          booking: {
            additional_fields: [
              {
                label: 'Patient ID: ' + patientIdFromRoute,
                name: '',
                required: false,
                type: 'text',
              },
            ],
          },
        },
      })
    },
  },
}
</script>
