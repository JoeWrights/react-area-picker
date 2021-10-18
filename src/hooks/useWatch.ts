import { useEffect, useRef } from 'react'

type Callback<T> = (old: T | undefined) => void
interface Config {
  immediate: boolean
}

/**
 * watch dep with hooks
 * @param dep 依赖值
 * @param callback 回调函数
 * @param config 配置
 */
export default function useWatch<T>(dep: T, callback: Callback<T>, config?: Config) {
  const { immediate = false } = config || {}
  const old = useRef<T>()
  const inited = useRef(false)
  console.log('tag', inited.current, 'inited.current')
  useEffect(() => {
    // callback(old.current);
    const exec = () => callback(old.current)
    if (!inited.current) {
      // if inited
      inited.current = true
      if (immediate) {
        exec()
      }
    } else {
      exec()
    }

    // dep下一次更新后的旧值等于当前的依赖值
    old.current = dep
  }, [dep, callback, immediate])
}
