<template>
  <div>
    <!-- Show the BaseLoader while loading is true -->
    <BaseLoader v-if="loading" class="animate-pulse" />

    <!-- Add the Stripe pricing table custom element when loading is false -->
    <stripe-pricing-table
      v-else
      pricing-table-id="prctbl_1NW2iOD4VaMQKLOonCMryL3b"
      publishable-key="pk_test_51MxOceD4VaMQKLOoZedG6UosvEh2rPfs1GKKY1tnkPwiAusK7XwGeLrFL16rC9p652SUg9rbPRTIEBKYla4AB0sq00A5BZfTot"
    >
    </stripe-pricing-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true, // Set loading to true initially
    }
  },
  mounted() {
    // Load the Stripe pricing table script when the component is mounted
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/pricing-table.js'
    script.async = true
    script.onload = () => {
      // Set loading to false once the script is loaded
      this.loading = false
    }
    document.head.appendChild(script)
  },
}
</script>
