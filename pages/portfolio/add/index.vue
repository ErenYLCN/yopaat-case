<script setup lang="ts">
definePageMeta({
  middleware: [
    'set-user-info',
  ],
})

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div mb-18>
    <div m-3 mb-1 ml-0 flex items-center justify-between>
      <div>
        <button
          mr-6 text-sm btn
          @click="goBack"
        >
          Go back
        </button>
      </div>

      <div>
        <UserProfile />
      </div>
    </div>

    <div style="height: 1px;" w-full bg-gray-400 />
  </div>

  <StockSearchBox />
</template>
