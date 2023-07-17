<script setup lang="ts">
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { name } = storeToRefs(appStore)
</script>

<template>
  <div w-24>
    <div mb-1 w-full>
      {{ name }}
    </div>
    <LogoutButton />
  </div>
</template>
