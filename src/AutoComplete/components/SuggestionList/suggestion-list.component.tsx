import { Fragment } from 'react'
import type { AnyObject, OptionList } from '../../types'
import { HighlightedText } from '../../components'
import { useKeyboardNavigation } from '@/AutoComplete/hooks/use-keyboard-navigation'

import './suggestion-list.styles.scss'


type SuggestionListProps<T extends AnyObject> = OptionList<T> & {
  inputValue: string,
}

export function SuggestionList<T extends AnyObject>(params: SuggestionListProps<T>) {
  const { dataSource, displayExpr, inputValue, onSelect } = params
  const { selectedIndex } = useKeyboardNavigation<T>({
    dataSource,
    onEnter: onSelect,
  })

  function renderSuggestions() {
    return dataSource?.map((option, index) => (
      <Fragment key={index}>{renderSuggestionItem(option, index)}</Fragment>
    ))
  }

  function handleSuggestionClick(event: React.MouseEvent<HTMLLIElement>) {
    const index = event.currentTarget.getAttribute('data-index')
    if (!index) return

    const item = dataSource[Number(index)]
    onSelect?.(item)
  }

  function renderSuggestionItem(option: T, index: number) {
    const isSelected = option === dataSource[selectedIndex]
    const className = isSelected ? 'suggestion-item selected' : 'suggestion-item'
    const value = `${option[displayExpr]}`

    return (
      <li className={className} role="button" data-index={index} onClick={handleSuggestionClick}>
        <HighlightedText text={value} highlight={inputValue} />
      </li>
    )
  }

  return renderSuggestions()
}
