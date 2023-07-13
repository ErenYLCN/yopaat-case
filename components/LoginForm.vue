<script setup lang="ts">
import { LOCAL_KEYS } from '~/storage/storageConstants'

const username = ref('')
const password = ref('')

const router = useRouter()

function go() {
  if (username.value && password.value && process.client) {
    localStorage.setItem(LOCAL_KEYS.SESSION, JSON.stringify({ username: username.value, token: 'random_token' }))

    router.push('/portfolio')
  }
}
</script>

<template>
  <div gray-100 m-40 h-full flex flex-col items-center justify-center bg-gray-800 p-10>
    <input
      id="input"
      v-model="username"
      placeholder="Username"
      type="text" autocomplete="off"
      p="x-4 y-2" m="t-5" w="250px"
      text="center" bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >

    <input
      id="input"
      v-model="password"
      placeholder="Password"
      type="password" autocomplete="off"
      p="x-4 y-2" m="t-5" w="250px"
      text="center" bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        m-3 text-sm btn
        :disabled="!username || !password"
        @click="go"
      >
        Login
      </button>
    </div>
  </div>
</template>
