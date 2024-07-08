import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import type { AnyObject, OptionList } from './types'
import { useDebounce } from './hooks'
import { BoyerMooreUtil } from './utils'
import { SuggestionList } from './components'

import './styles/auto-complete.scss'

export type AutoCompleteProps<T extends AnyObject> = OptionList<T> & {
  placeholder?: string
  clearButton?: boolean
  label?: string
  id?: string
}

export function AutoComplete<T extends AnyObject>(params: AutoCompleteProps<T>) {
  const {
    dataSource,
    keyExpr,
    displayExpr,
    placeholder,
    label,
    clearButton = false,
    id = 'auto-complete-container',
    onSelect,
  } = params

  const [searchText, setSearchText] = useState<string>('')
  const [suggestions, setSuggestions] = useState<T[]>([])
  const debouncedSearchText = useDebounce<string>({ value: searchText })

  useEffect(() => {
    if (!dataSource) return
    if (dataSource.length === 0) return
    if (searchText.length === 0) {
      return clearSuggestions()
    }

    const filteredOptions = filterOptions(dataSource, debouncedSearchText)
    setSuggestions(filteredOptions)
  }, [debouncedSearchText])

  function handleSearchTextChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)
  }

  const onClearInput = useCallback(() => {
    setSearchText('')
  }, [])

  function filterOptions(dataSource: Array<T>, textValue: string) {
    return dataSource?.filter((option) => {
      const haystack = `${option[displayExpr]}`.toLocaleLowerCase()
      const needle = textValue.toLocaleLowerCase()
      return BoyerMooreUtil.searchPattern(haystack, needle)
    })
  }

  const clearSuggestions = useCallback(() => {
    setSuggestions([])
  }, [])

  const handleSelect = useCallback((item: T) => {
    onSelect?.(item)
    onClearInput()
    clearSuggestions()
  }, [])

  return (
    <div className='auto-complete-container' id={id}>
      <div className='clearable-input'>
        {label && <label htmlFor='search'>{label}</label>}
        <input
          type='text'
          name='search'
          id='search'
          onChange={handleSearchTextChange}
          value={searchText}
          autoComplete='off'
          placeholder={placeholder}
        />
        {clearButton && searchText && (
          <button
            type='button'
            style={{
              top: label ? '50%' : '28%',
            }}
            className='data-clear-input'
            onClick={onClearInput}
          >
            &times;
          </button>
        )}
      </div>

      <SuggestionList
        dataSource={suggestions}
        inputValue={searchText}
        keyExpr={keyExpr}
        displayExpr={displayExpr}
        onSelect={handleSelect}
      />
    </div>
  )
}
