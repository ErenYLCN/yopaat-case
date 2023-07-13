import { PROTECTED_ROUTES, ROUTES, SAFE_ROUTES } from '~/route/routes'
import { LOCAL_KEYS } from '~/storage/storageConstants'

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const session = localStorage.getItem(LOCAL_KEYS.SESSION)

    if (!session && PROTECTED_ROUTES.includes(to.fullPath))
      return navigateTo('/login')
    else if (session && SAFE_ROUTES.includes(to.fullPath))
      return navigateTo(ROUTES.PORTFOLIO.PATH)
  }
})
