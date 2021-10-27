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
import { Tabs } from 'react-area-picker'

export default () => {
  const [value, setValue] = useState(1)
  const [opts] = useState([
    {
      title: '标签一',
      value: 1,
      key: 'province',
      content: <div style={{ fontSize: 14 }}>标签一</div>
    },
    {
      title: '标签二',
      value: 2,
      key: 'city',
      content: <div style={{ fontSize: 14 }}>标签二</div>
    },
    {
      title: '标签三',
      value: 3,
      key: 'area',
      content: <div style={{ fontSize: 14 }}>标签三</div>
    }
  ])

  return <Tabs options={opts} value={value} onChange={(val: any) => setValue(val)} />
}
```

通过`options`属性配置 tab 选项

```tsx
import React, { useState } from 'react'
import { Tabs } from 'react-area-picker'

const { TabPane } = Tabs

export default () => {
  const [value, setValue] = useState(1)

  return (
    <Tabs value={value} onChange={(val: any) => setValue(val)}>
      <TabPane title='标签1' value={1}>
        <div style={{ fontSize: 14 }}>标签一</div>
      </TabPane>
      <TabPane title='标签2' value={2}>
        <div style={{ fontSize: 14 }}>标签二</div>
      </TabPane>
      <TabPane title='标签3' value={3}>
        <div style={{ fontSize: 14 }}>标签三</div>
      </TabPane>
    </Tabs>
  )
}
```

**Tabs 数据类型**

```ts
interface ITabsOption {
  title: string
  value: number | string
  key: string
  content: number | string | JSX.Element
  active?: boolean
  disabled?: boolean
}
```

**Tabs 参数 API**

| 参数       | 描述                                         | 类型                  | 默认值   |
| ---------- | -------------------------------------------- | --------------------- | -------- |
| value      | 当前激活的 tab                               | `number \| string`    | -        |
| options    | tabs 选项配置，如果`options`配置了则优先使用 | `ITabsOption[]`       | -        |
| lineColor  | 当前 tab 底部条的背景色                      | `#2B6BFF`             |
| lineHeight | 当前 tab 底部条的宽度                        | `number`              | 2        |
| lineWidth  | 当前 tab 底部条的宽度                        | `number`              | 自动适应 |
| animated   | 是否使用动画切换 Tabs                        | `boolean`             | true     |
| onChange   | tab 改变的回调                               | `function(val: void)` | -        |

**TabPane 参数 API**

| 参数     | 描述           | 类型               | 默认值 |
| -------- | -------------- | ------------------ | ------ |
| value    | 当前激活的 tab | `number \| string` | -      |
| title    | tab 的标题     | `string`           | -      |
| disabled | 是否禁用       | `#2B6BFF`          |
