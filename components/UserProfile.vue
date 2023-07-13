<script setup lang="ts">
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { name } = storeToRefs(appStore)
</script>

<template>
  <div>
    <div mb-1>
      {{ name }}
    </div>
    <LogoutButton />
  </div>
</template>
