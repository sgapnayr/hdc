<template>
  <!-- Your component's template here -->
</template>

<script>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const allowedRoutes = ['/', '/pricing', '/faq', '/why-us']
    const route = useRoute()
    const isMounted = ref(false)

    const loadTidioScript = () => {
      // Load the Tidio Chat script when the component is mounted
      const script = document.createElement('script')
      script.src = '//code.tidio.co/hixfawtjrk9xr2h780n0qi6d48osafrr.js'
      script.async = true
      document.head.appendChild(script)
    }

    const remountComponent = () => {
      isMounted.value = false
      // Use a timeout to ensure the component is unmounted before re-mounting
      setTimeout(() => {
        isMounted.value = true
      }, 0)
    }

    onMounted(() => {
      loadTidioScript()
      isMounted.value = true
    })

    // Watch for route changes
    watch(
      () => route.path,
      (newPath, oldPath) => {
        if (allowedRoutes.includes(newPath) && !allowedRoutes.includes(oldPath)) {
          // Route changed to an allowed route, remount the component
          remountComponent()
        }
      }
    )

    return { isMounted }
  },
}
</script>
