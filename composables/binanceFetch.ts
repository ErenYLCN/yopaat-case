export async function useBinanceFetch() {
  const config = useRuntimeConfig()

  const { data, pending, error, refresh } = await useFetch<Array<Asset>>(`${config.public.apiBase}${'/api/v3/ticker/24hr'}`)

  return { data, pending, error, refresh }
}
