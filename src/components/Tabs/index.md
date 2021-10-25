---
nav:
  title: Components
  path: /components
---

## Tabs

Demo:

基础使用

```tsx
import React, { useState } from 'react'
import { Tabs, Device } from 'react-area-picker'

export default () => {
  const [value, setValue] = useState(1)
  const [opts] = useState([
    {
      label: '标签一',
      value: 1,
      key: 'province',
      content: <div style={{ fontSize: 14 }}>标签一</div>
    },
    {
      label: '标签二',
      value: 2,
      key: 'city',
      content: <div style={{ fontSize: 14 }}>标签二</div>
    },
    {
      label: '标签三',
      value: 3,
      key: 'area',
      content: <div style={{ fontSize: 14 }}>标签三</div>
    }
  ])

  return <Tabs options={opts} value={value} onChange={(val: any) => setValue(val)} />
}
```

**Tabs 数据类型**

```ts
interface ITabsOption {
  label: string
  value: number | string
  key: string
  content: number | string | JSX.Element
  active?: boolean
  disabled?: boolean
}
```

**Tabs 参数 API**

| 参数       | 描述                    | 类型                  | 默认值   |
| ---------- | ----------------------- | --------------------- | -------- |
| value      | 当前激活的 tab          | `number \| string`    | -        |
| options    | tabs 选项配置           | `ITabsOption[]`       | -        |
| lineColor  | 当前 tab 底部条的背景色 | `#2B6BFF`             |
| lineHeight | 当前 tab 底部条的宽度   | `number`              | 2        |
| lineWidth  | 当前 tab 底部条的宽度   | `number`              | 自动适应 |
| animated   | 是否使用动画切换 Tabs   | `boolean`             | true     |
| onChange   | tab 改变的回调          | `function(val: void)` | -        |
