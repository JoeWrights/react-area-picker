import React from 'react'
import Tabs, { TabsProps } from './index'

export default function useTabs(options: Omit<TabsProps, 'activeTab'>) {
  const tabRender = <Tabs {...options} />
  return tabRender
}
