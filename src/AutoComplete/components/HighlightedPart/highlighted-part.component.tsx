import { Fragment, type FC } from 'react'
import { useHighlightText } from '@/AutoComplete/hooks'

import './highlighted-part.component.style.scss'

type HighlightedTextProps = {
  text: string
  highlight: string
}

export const HighlightedText: FC<HighlightedTextProps> = (props) => {
  const { text, highlight } = props
  const { getHighlightedPart } = useHighlightText()

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

  if(parts.length === 0) return null

  return (
    <span>
      {parts.map((part, index) => (
        <Fragment key={index}>{getHighlightedPart(part, highlight)}</Fragment>
      ))}
    </span>
  )
}

export default HighlightedText
