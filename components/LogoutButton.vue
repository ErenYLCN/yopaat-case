<script setup lang="ts">
import { ROUTES } from '~/route/routes'

const router = useRouter()

function logOut() {
  localStorage.removeItem('session')

  router.push(ROUTES.LOGIN.PATH)
}
</script>

<template>
  <button
    w-full bg-transparent text-sm underline btn
    @click="logOut"
  >
    Log Out
  </button>
</template>
