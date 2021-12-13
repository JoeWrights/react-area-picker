---
nav:
  title: Components
  path: /components
---

## Picker

Demo:

使用例子

```tsx
import React, { useState } from 'react'
import { Picker } from 'react-area-picker'
import DemoPage from '../../demo/components/DemoPage'
import DemoCard from '../../demo/components/DemoCard'

export default () => {
  const handleChangeColumn = (item: any) => {
    window.alert(JSON.stringify(item))
  }

  const onSelectFinished = (data: any) => {
    window.alert(JSON.stringify(data))
  }

  const onSelectFinished2 = (data: any) => {
    window.alert(JSON.stringify(data))
  }

  return (
    <DemoPage title='Picker'>
      <DemoCard title='基础使用'>
        <>
          <Picker style={{ height: 340 }} onFinish={onSelectFinished}></Picker>
        </>
      </DemoCard>

      <DemoCard title='绑定区code，默认选中省市区'>
        <>
          <Picker style={{ height: 340 }} lastCode={310109} onFinish={onSelectFinished2}></Picker>
        </>
      </DemoCard>

      <DemoCard title='选则省市区的回调'>
        <>
          <Picker style={{ height: 340 }} onChangeColumn={handleChangeColumn}></Picker>
        </>
      </DemoCard>
    </DemoPage>
  )
}
```

**Picker 数据结构**

```ts
interface IAreaItem {
  name: string
  code: number | string
}
```

**Picker 参数 API**

| 参数           | 描述             | 类型                         | 默认值 |
| -------------- | ---------------- | ---------------------------- | ------ |
| style          | picker 的样式    | `React.CSSProperties`        | -      |
| selectedIcon   | 选中的 icon      | `string \| JSX.Element`      | -      |
| onChangeColumn | 选中省市区的回调 | `(val: IAreaItem) => void`   | -      |
| onFinish       | 取消的回调       | `(val: IAreaItem[]) => void` | -      |
