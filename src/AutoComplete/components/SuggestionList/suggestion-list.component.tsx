import { Fragment } from 'react'
import type { AnyObject, OptionList } from '../../types'
import { HighlightedText } from '../../components'
import { useKeyboardNavigation } from '@/AutoComplete/hooks/use-keyboard-navigation'

import './suggestion-list.styles.scss'


type SuggestionListProps<T extends AnyObject> = OptionList<T> & {
  inputValue: string
}

export function SuggestionList<T extends AnyObject>(params: SuggestionListProps<T>) {
  const { dataSource, displayExpr, inputValue } = params
  const { selectedIndex } = useKeyboardNavigation<T>({
    dataSource,
    onEnter: () => {},
  })

  function renderSuggestions() {
    if (!dataSource) return null

    return dataSource.map((option, index) => (
      <Fragment key={index}>{renderSuggestionItem(option)}</Fragment>
    ))
  }

  function renderSuggestionItem(option: T) {
    const isSelected = option === dataSource[selectedIndex]
    const className = isSelected ? 'suggestion-item selected' : 'suggestion-item'
    const value = `${option[displayExpr]}`

    return (
      <li className={className}>
        <HighlightedText text={value} highlight={inputValue} />
      </li>
    )
  }

  return renderSuggestions()
}
