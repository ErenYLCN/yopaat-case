import { LOCAL_KEYS } from '~/storage/storageConstants'

export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useBinanceFetch()

  const appStore = useAppStore()

  setValues()

  watch(data, () => {
    setValues()
  })

  function setValues() {
    if (process.client) {
      const userAssetsString = localStorage.getItem(LOCAL_KEYS.USER_ASSETS)

      if (userAssetsString) {
        const userAssets = JSON.parse(userAssetsString) as UserAssets

        appStore.setUserAssets(userAssets)

        const userAssetValues = Object.keys(userAssets).reduce<UserAssetValues>((dict, key) => {
          const associatedAsset = data.value?.filter(asset => asset.symbol === key)

          if (associatedAsset?.length)
            dict[key] = { lastPrice: associatedAsset[0].lastPrice, weightedAvgPrice: associatedAsset[0].weightedAvgPrice }
          return dict
        }, {})

        appStore.setUserAssetValues(userAssetValues)
      }
    }
  }
})
