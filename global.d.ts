interface Asset {
  symbol: string
  lastPrice: string
  weightedAvgPrice: string
}

interface UserAssets { [key: string]: number }

interface UserAssetValues { [key: string]: {lastPrice: string, weightedAvgPrice: string} }