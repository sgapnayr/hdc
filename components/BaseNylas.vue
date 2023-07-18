<template>
  <div>
    <button @click="authorize">Authorize Nylas</button>
    <div v-if="emails">
      <h2>Emails</h2>
      <ul>
        <li v-for="email in emails" :key="email.id">{{ email.subject }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import Nylas from 'nylas'

export default {
  setup() {
    const emails = ref([])

    const authorize = async () => {
      try {
        // Make a request to your backend to get the Nylas access token
        // Here, we assume the backend endpoint is /nylas/token
        const response = await fetch('/nylas/token')
        const data = await response.json()

        // Initialize the Nylas client with the obtained access token
        Nylas.config({
          clientId: 'YOUR_NYLAS_CLIENT_ID',
          accessToken: data.accessToken,
        })

        // Fetch emails using Nylas client
        const messages = await Nylas.messages.list({ limit: 10 })
        emails.value = messages
      } catch (error) {
        console.error('Error obtaining Nylas access token', error)
      }
    }

    return {
      emails,
      authorize,
    }
  },
}
</script>
