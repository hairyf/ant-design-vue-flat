import { useStorage, StorageLike } from '@vueuse/core'
import { computed } from 'vue-demi'
import { publish, subscribe } from 'pubsub-js'

/**
 * 引入具有跨层级响应式缓存 Ref
 * @param key 缓存对应 key 值
 * @param defaultValue 缓存默认值
 */
export const useWatchStore = <T = null>(key: string, defaultValue?: T) => {
  let compare = Symbol('_compare_')
  const source = useStorage(key, defaultValue as NonNullable<T>, useWatchStore.option)
  const target = computed({
    get: () => source.value,
    set: (value) => {
      compare = Symbol('_compare_')
      publish(`watch-store__${key}`, [compare, value])
      source.value = value
    }
  })
  subscribe(`watch-store__${key}`, (_: string, value: [symbol, NonNullable<T>]) => {
    if (value[0] === compare) return undefined
    compare = value[0]
    source.value = value[1]
  })
  return target
}
useWatchStore.option = undefined as StorageLike | undefined
