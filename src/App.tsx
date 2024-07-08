import type { FC } from 'react'
import { AutoComplete } from '@/AutoComplete'
import { Employee, employees } from './data/employees'

export const App: FC = () => {
  return (
    <AutoComplete<Employee>
      dataSource={employees}
      displayExpr='fullName'
      placeholder='Search employees by name...'
      onSelect={(employee) => console.log(employee)}
      label='Employee Name'
      keyExpr='id'
      clearButton
    />
  )
}
