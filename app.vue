<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          src: '//code.tidio.co/3vxi4rj20xvvbortj5b7alykul8wvkk7.js',
          async: true,
        },
      ],
    }
  },
}
</script>

<style>
h1 {
  color: #403e48;
}
</style>
