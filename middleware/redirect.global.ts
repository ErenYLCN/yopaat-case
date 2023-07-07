import { PROTECTED_ROUTES, ROUTES } from '~/route/routes'

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem('login')

    if (!token && PROTECTED_ROUTES.includes(to.fullPath))
      return navigateTo('/login')
    else if (token && to.fullPath === ROUTES.LOGIN.PATH)
      return navigateTo(ROUTES.PORTFOLIO.PATH)
  }
})
