import { useEffect } from 'react'

export default function useMount(cb: () => void) {
  useEffect(() => {
    cb?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
