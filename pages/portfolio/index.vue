<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import { LOCAL_KEYS } from "~/storage/storageConstants";

useHead({ title: "Yopaat - Portfolio" });

ChartJS.register(ArcElement, Tooltip, Legend);

definePageMeta({
  middleware: ["set-user-info"],
});

const isEditMode = ref(false);

const appStore = useAppStore();
const { userAssetValues, userAssets } = storeToRefs(appStore);

const editValues = ref(
  Object.keys(userAssets.value).reduce<UserAssets>((dict, key) => {
    dict[key] = 0;
    return dict;
  }, {})
);

const router = useRouter();

const data = computed(() => {
  return {
    labels: Object.keys(userAssets.value),
    datasets: [
      {
        backgroundColor: Object.keys(userAssets.value).map((_) =>
          getRandomColor()
        ),
        data: Object.values(userAssets.value),
      },
    ],
  };
});

const options = {
  responsive: true,
};

const { refresh } = await useBinanceFetch();

function pushAddScreen() {
  router.push("/portfolio/add");
}

function triggerEdit() {
  isEditMode.value = !isEditMode.value;
}

function getRandomColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function updateAsset(assetSymbol: string | number) {
  const userAssetsString = localStorage.getItem(LOCAL_KEYS.USER_ASSETS);

  if (userAssetsString) {
    userAssets.value[assetSymbol] = editValues.value[assetSymbol];

    localStorage.setItem(
      LOCAL_KEYS.USER_ASSETS,
      JSON.stringify(userAssets.value)
    );
  }
}

function removeAsset(assetSymbol: string | number) {
  const userAssetsString = localStorage.getItem(LOCAL_KEYS.USER_ASSETS);

  if (userAssetsString) {
    delete userAssets.value[assetSymbol];

    delete userAssetValues.value[assetSymbol];

    localStorage.setItem(
      LOCAL_KEYS.USER_ASSETS,
      JSON.stringify(userAssets.value)
    );
  }
}
</script>

<template>
  <div>
    <div class flex items-center justify-between gap-4 m-3 ml-0 mb-1>
      <div flex flex-col sm:flex-row items-center gap-4 flex-wrap>
        <button text-sm btn w-28 @click="pushAddScreen">Add Stock</button>
        <button text-sm btn w-28 @click="() => refresh()">Refresh</button>

        <button text-sm btn w-28 @click="triggerEdit">
          {{ isEditMode ? "Cancel" : "Edit" }}
        </button>
      </div>

      <UserProfile />
    </div>

    <div style="height: 1px" w-full bg-gray-400 />
  </div>

  <div flex flex-col lg:flex-row justify-between pt-10>
    <div w-full text-left>
      <ul p-4>
        <li v-for="(userAssetValue, assetSymbol) in userAssetValues" border-2 border-gray-300 mb-3 rounded-2 p-3 flex
          flex-col sm:flex-row items-start sm:items-center justify-between>
          <div p-4>
            <div>{{ assetSymbol }}</div>
            <div>Last Price: {{ userAssetValue.lastPrice }}</div>
            <div>Weighted Avg Price: {{ userAssetValue.weightedAvgPrice }}</div>
          </div>

          <div v-if="isEditMode">
            <input id="input" v-model="editValues[assetSymbol]" placeholder="Enter" type="number" autocomplete="off"
              p="x-4 y-2" mb-2 bg="transparent" w-full border="~ rounded gray-200 dark:gray-700"
              outline="none active:none" />
            <div flex gap-2>
              <button w-full text-sm btn @click="updateAsset(assetSymbol)">
                Update
              </button>

              <button w-full text-sm btn @click="removeAsset(assetSymbol)">
                Remove
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div w-full min-h-96 border-l-0 lg:border-l-1 border-t-1 lg:border-t-0 border-gray-400 flex flex-col
      align-center p-4 md:p-16>
      <Pie :data="data" :options="options" />
    </div>
  </div>
</template>
