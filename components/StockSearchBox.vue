<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { LOCAL_KEYS } from '~/storage/storageConstants'

const appStore = useAppStore()
const { userAssets } = storeToRefs(appStore)

const searchInput = ref('')
const debouncedSearchInput = ref(searchInput.value)

const { data } = await useBinanceFetch()
const filteredData = ref(data.value)
const assetValues = ref(data.value?.reduce<UserAssets>((dict, obj) => {
  dict[obj.symbol] = 0
  return dict
}, {}))

watch(searchInput, () => {
  const handler = setTimeout(() => {
    debouncedSearchInput.value = searchInput.value
  }, 600)

  return () => {
    clearTimeout(handler)
  }
})

watch(debouncedSearchInput, () => {
  if (!debouncedSearchInput.value.length)
    filteredData.value = data.value
  else if (data.value)
    filteredData.value = data.value.filter(asset => asset.symbol.includes(debouncedSearchInput.value.toUpperCase()))
})

function addAsset(asset: Asset) {
  if (assetValues.value && assetValues.value[asset.symbol] > 0) {
    const userAssetsString = localStorage.getItem(LOCAL_KEYS.USER_ASSETS)
    const addedAsset: UserAssets = {
      [asset.symbol]: assetValues.value[asset.symbol],
    }

    if (userAssetsString) {
      const userAssets = JSON.parse(userAssetsString) as UserAssets
      const newUserAssets = { ...userAssets, ...addedAsset }

      localStorage.setItem(LOCAL_KEYS.USER_ASSETS, JSON.stringify(newUserAssets))
      appStore.setUserAssets(newUserAssets)
    }
    else {
      const newUserAssets = { ...addedAsset }

      localStorage.setItem(LOCAL_KEYS.USER_ASSETS, JSON.stringify(newUserAssets))
      appStore.setUserAssets(newUserAssets)
    }
  }
}

function removeAsset(asset: Asset) {
  if (assetValues.value) {
    const userAssetsString = localStorage.getItem(LOCAL_KEYS.USER_ASSETS)

    if (userAssetsString) {
      const userAssets = JSON.parse(userAssetsString) as UserAssets
      delete userAssets[asset.symbol]

      localStorage.setItem(LOCAL_KEYS.USER_ASSETS, JSON.stringify(userAssets))
      appStore.setUserAssets(userAssets)
    }
  }
}
</script>

<template>
  <div m-24 border-2 border-gray-400 p-6>
    <input
      id="input"
      v-model="searchInput"
      placeholder="Search"
      type="text" autocomplete="off"
      p="x-4 y-2" m="t-5" bg="transparent" mb-8 w-full
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >

    <div v-if="data?.length" h-96 overflow-scroll>
      <ul>
        <li v-for="asset in filteredData" :key="asset.symbol" mb-6 flex items-center justify-between border-2 border-gray-600 p-4 text-left>
          <div>{{ asset.symbol }} - {{ asset.lastPrice }}</div>
          <div v-if="assetValues" flex items-center gap-2>
            <input
              id="input"
              v-model="assetValues[asset.symbol]"
              placeholder="Search"
              type="number" autocomplete="off"
              p="x-4 y-2" bg="transparent" w-48
              border="~ rounded gray-200 dark:gray-700"
              outline="none active:none"
            >

            <div v-if="!userAssets[asset.symbol]" w-48>
              <button
                w-full text-sm btn
                @click="addAsset(asset)"
              >
                Add
              </button>
            </div>
            <div v-else w-48 flex items-center gap-2 class="flex gap-2">
              <button
                w-full text-sm btn
                @click="addAsset(asset)"
              >
                Update
              </button>
              <button
                w-full text-sm btn
                @click="removeAsset(asset)"
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
