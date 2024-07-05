import { useState, useEffect } from 'react'

type UseKeyboardNavigationParams<T> = {
  dataSource: T[]
  onEnter: (item: T) => void
}

export function useKeyboardNavigation<T>(params: UseKeyboardNavigationParams<T>) {
  const { dataSource, onEnter } = params
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % dataSource.length)
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + dataSource.length) % dataSource.length)
    } else if (event.key === 'Enter') {
      onEnter(dataSource[selectedIndex])
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex, dataSource])

  return {
    selectedIndex,
  }
}
