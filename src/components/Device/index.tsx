import React from 'react'

import './index.less'

// react-area-picker/~demos/Tabs-demo

export default function Device(props: any) {
  const pathname = window.top?.location.pathname.split('/') ?? ''
  const componentName = pathname[pathname.length - 1]
    .split('')
    .map((item, i) => {
      // eslint-disable-next-line no-param-reassign
      if (i === 0) return `${item}`.toUpperCase()
      return item
    })
    .join('')
  const path = `${window.location.origin}/react-area-picker/~demos/${componentName}-demo`

  return <iframe className='device-frame' src={path} frameBorder='0' title='demo' />
}
