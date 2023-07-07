export const ROUTES = {
  PORTFOLIO: {
    PATH: '/portfolio',
    ADD: {
      PATH: '/portfolio/add',
    },
  },
  LOGIN: {
    PATH: '/login',
  },
}

export const SAFE_ROUTES = [
  ROUTES.LOGIN.PATH,
]

export const PROTECTED_ROUTES = [
  ROUTES.PORTFOLIO.PATH,
  ROUTES.PORTFOLIO.ADD.PATH,
]
