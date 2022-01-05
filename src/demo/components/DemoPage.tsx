import React from 'react'
import './demo-page.less'

export default function DemoPage({ title, ...rest }: { title: string } & { children: React.ReactNode }) {
  const { children } = rest

  return (
    <div className='demo-page'>
      <h1 className='demo-title'>{title}</h1>
      <div className='demo-content'>{children}</div>
    </div>
  )
}
