---
nav:
  title: 辅助函数
  path: /helpers
---

## Area

Demo:

```tsx
import React, { useState } from 'react'
import { Area } from 'react-area-picker'

export default () => {
  return (
    <button
      onClick={() => {
        console.log(Area.getCityListByProvince(110000))
      }}
    >
      click
    </button>
  )
}
```
