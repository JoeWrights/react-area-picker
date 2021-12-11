import React from 'react'
import './card.less'

export default function DemoCard({ title, ...rest }: { title: string } & { children: JSX.Element }) {
  const { children } = rest

  return (
    <div className='card'>
      <h2 className='card-title'>{title}</h2>
      <div className='card-content'>{children}</div>
    </div>
  )
}
