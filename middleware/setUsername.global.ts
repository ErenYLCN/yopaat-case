import { LOCAL_KEYS } from '~/storage/storageConstants'

export default defineNuxtRouteMiddleware(() => {
  if (process.client && localStorage.getItem(LOCAL_KEYS.SESSION)) {
    const appStore = useAppStore()

    // extract specific store properties
    const sessionString = localStorage.getItem(LOCAL_KEYS.SESSION)

    if (sessionString) {
      const session = JSON.parse(sessionString)

      appStore.setName(session.username)
    }
  }
})
