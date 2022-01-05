import React from 'react'
import './card.less'

export default function DemoCard({
  title,
  onClick = () => {},
  ...rest
}: { title: string; onClick?: () => void } & { children: React.ReactNode }) {
  const { children } = rest

  return (
    <div className='card' onClick={() => onClick?.()}>
      <h2 className='card-title'>{title}</h2>
      <div className='card-content'>{children}</div>
    </div>
  )
}
