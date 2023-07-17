<script setup lang="ts">
useHead({
  title: 'Yopaat - Login',
})
</script>

<template>
  <div>
    <div text-left>
      <div text-3xl>
        Welcome
      </div>
      <div mb-1>
        Please login in order to track your portfolio
      </div>
      <div style="height: 1px;" bg-gray-400 />
    </div>

    <LoginForm />
  </div>
</template>
