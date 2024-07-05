import { useEffect, useState } from 'react'

type UseDebounceParams<T> = {
  value: T
  delay?: number
}

export const useDebounce = <T>(params: UseDebounceParams<T>): T => {
  const { value, delay = 300 } = params
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
