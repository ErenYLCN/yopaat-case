import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  // a function that returns a fresh state
  state: () => ({
    name: '',
    userAssets: {} as UserAssets,
    userAssetValues: {} as UserAssetValues,
    // binanceApi: { data: {}, refresh: () => undefined } as { data: globalThis.Ref<Asset[] | null>; refresh: VoidFunction },
  }),
  actions: {
    setName(name: string) {
      this.name = name
    },
    setUserAssets(userAssets: UserAssets) {
      this.userAssets = userAssets
    },
    setUserAssetValues(userAssetValues: UserAssetValues) {
      this.userAssetValues = userAssetValues
    },
    async setBinanceApi() {
      /* TODO: there seems to be a problem adding functions
               as a state variable, look into this
      */

      // const { data, refresh } = await useBinanceFetch()
      // this.binanceApi = { data: data.value, refresh }
    },
  },
})
