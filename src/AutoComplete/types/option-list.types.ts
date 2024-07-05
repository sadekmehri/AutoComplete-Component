export type OptionList<T> = {
  dataSource: T[]
  displayExpr: keyof T
  keyExpr: keyof T
}
