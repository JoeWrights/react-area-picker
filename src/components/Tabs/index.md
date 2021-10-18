---
nav:
  title: Components
  path: /components
---

## Tabs

Demo:

```tsx
import React, { useState } from 'react'
import { Tabs } from 'react-area-picker'

export default () => {
  const [value, setValue] = useState(1)
  const [opts] = useState([
    { label: '省', value: 1, key: 'province', content: '1' },
    { label: '市', value: 2, key: 'city', content: '2' },
    { label: '区', value: 3, key: 'area', content: '3' }
  ])

  return <Tabs options={opts} value={value} onChange={(val: any) => setValue(val)} />
}
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
