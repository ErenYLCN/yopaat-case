<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

definePageMeta({
  middleware: [
  'set-user-info',
  ],
})

const appStore = useAppStore()
const { userAssetValues, userAssets } = storeToRefs(appStore)

const router = useRouter()

const data = {
  labels: Object.keys(userAssets.value),
  datasets: [
  {
    backgroundColor: Object.keys(userAssets.value).map(_ => getRandomColor()),
    data: Object.values(userAssets.value),
  },
  ],
}

const options = {
  responsive: true,
}

const { refresh } = await useBinanceFetch()

function pushAddScreen() {
  router.push('/portfolio/add')
}

function getRandomColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};
</script>

<template>
  <div>
    <div class flex items-center justify-between m-3 ml-0 mb-1>
      <div>
        <button
        text-sm btn mr-6
        @click="pushAddScreen"
        >
        Add Stock
      </button>
      <button
      text-sm btn
      @click="() => refresh()"
      >
      Refresh
    </button>
  </div>
  
  <UserProfile />
</div>

<div style="height: 1px;" w-full bg-gray-400 />
</div>

<div flex justify-between pt-10>
  <div w-full text-left>
    <ul p-4>
      <li v-for="userAssetValue, assetSymbol in userAssetValues" border-2 border-gray-300 mb-3 rounded-2 p-3> 
        <div>{{assetSymbol}}</div>
        <div>Last Price: {{userAssetValue.lastPrice}}</div>
        <div>Weighted Avg Price: {{userAssetValue.weightedAvgPrice}}</div>
      </li>
    </ul>
  </div>
  <div w-full min-h-96 border-l-1 border-gray-400 flex flex-col justify-center align-center p-16>
    <Pie :data="data" :options="options" />
  </div>
</div>
</template>
