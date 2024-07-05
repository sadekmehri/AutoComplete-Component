export const useHighlightText = () => {
  function isHighlightMatch(part: string, highlight: string) {
    return part.toLowerCase() === highlight.toLowerCase()
  }

  function getHighlightedPart(part: string, highlight: string) {
    return isHighlightMatch(part, highlight) ? <b className="highlighted-part">{part}</b> : part
  }

  return { getHighlightedPart }
}
