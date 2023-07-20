<template>
  <div>
    <!-- Add the Stripe pricing table custom element -->
    <stripe-pricing-table
      pricing-table-id="prctbl_1NW2KoD4VaMQKLOon23X9GgR"
      publishable-key="pk_test_51MxOceD4VaMQKLOoZedG6UosvEh2rPfs1GKKY1tnkPwiAusK7XwGeLrFL16rC9p652SUg9rbPRTIEBKYla4AB0sq00A5BZfTot"
    >
    </stripe-pricing-table>
  </div>
</template>

<script>
export default {
  mounted() {
    // Load the Nylas Schedule Editor script when the component is mounted
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/pricing-table.js'
    script.async = true
    document.head.appendChild(script)
  },
}
</script>
