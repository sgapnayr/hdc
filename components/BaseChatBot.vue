<template>
  <!-- Your component's template here -->
</template>

<script>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const allowedRoutes = ['/', '/pricing', '/why-us']
    const route = useRoute()
    const isMounted = ref(false)
    const tidioScriptId = 'tidio-chat-script' // A unique identifier for the script element

    const loadTidioScript = () => {
      if (!allowedRoutes.includes(route.path)) return

      const existingScript = document.getElementById(tidioScriptId)
      if (existingScript) {
        existingScript.remove()
      }

      // Append the Tidio Chat script
      const script = document.createElement('script')
      script.id = tidioScriptId
      script.src = '//code.tidio.co/pqcnrrpt0un5fexfcdxzxhwylyczmezu.js'
      script.async = true
      document.head.appendChild(script)
    }

    onMounted(() => {
      loadTidioScript()
      isMounted.value = true
    })

    // Watch for route changes
    watch(
      () => route.path,
      () => {
        loadTidioScript()
      }
    )

    return { isMounted }
  },
}
</script>
