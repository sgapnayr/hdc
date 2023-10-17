<template>
  <div>
    <!-- Create a button and give it an ID to reference later -->
    <button type="button" @click="openScheduleEditor" class="bg-honeydew-purple px-3 p-1 text-white rounded-[80px] cursor-pointer">Open Schedule Editor</button>
  </div>
</template>

<script>
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
      // Prompt the Schedule Editor when a user clicks on the button
      nylas.scheduler.show({
        auth: {
          // Account <ACCESS_TOKEN> with active calendar scope
          // accessToken: process.env.VUE_APP_NYLAS_ACCESS_TOKEN,
          accessToken: '6cP8Q2C1QS8NZPGzKGUoZNlBRvUpq7',
        },
        style: {
          // Style the Schedule Editor
          tintColor: '#32325d',
          backgroundColor: 'white',
        },
      })
    },
  },
}
</script>
