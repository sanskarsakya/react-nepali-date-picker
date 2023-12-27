import React from 'react'
import { useCalendarStore } from '.'
const context = React.createContext<any>({})
const useStore = (selector: any) => React.useContext(context)(selector)

function Store({ children }: any) {
  const [useStore] = React.useState(() => useCalendarStore)
  return (
    <context.Provider value={useStore}>
      {children}
    </context.Provider>
  )
}

export { Store, useStore }