import React from 'react'

interface TabPaneProps {
  title: string
  value: string | number
  disabled?: boolean
}

export default function TabPane(props: TabPaneProps) {
  const { children } = props as TabPaneProps & { children?: React.ReactNode }

  return <div>{children}</div>
}
