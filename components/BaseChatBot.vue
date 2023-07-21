<script>
export default {
  mounted() {
    // Load the Nylas Tidio Chat script when the component is mounted
    const script = document.createElement('script')
    script.src = '//code.tidio.co/hixfawtjrk9xr2h780n0qi6d48osafrr.js'
    script.async = true
    document.head.appendChild(script)
  },
}
</script>
