---
nav:
  title: Components
  path: /components
---

## ActionSheet

Demo:

基础使用

```tsx
import React, { useState } from 'react'
import { ActionSheet } from 'react-area-picker'

export default () => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>click</button>
      <ActionSheet visible={visible} title='标题' style={{ height: '60%' }} onCancel={() => setVisible(false)}>
        内容
      </ActionSheet>
    </>
  )
}
```

```tsx
import React, { useState } from 'react'
import { ActionSheet } from 'react-area-picker'

export default () => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>click</button>
      <ActionSheet
        visible={visible}
        title='标题'
        toolbarMode='simple'
        style={{ height: '60%' }}
        onCancel={() => setVisible(false)}
      >
        内容
      </ActionSheet>
    </>
  )
}
```

```tsx
import React, { useState } from 'react'
import { ActionSheet } from 'react-area-picker'

export default () => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>click</button>
      <ActionSheet
        visible={visible}
        title='标题'
        toolbarMode='simple'
        style={{ height: '60%' }}
        needBottomButton={true}
        onCancel={() => setVisible(false)}
      >
        内容
      </ActionSheet>
    </>
  )
}
```

```tsx
import React, { useState } from 'react'
import { ActionSheet } from 'react-area-picker'

export default () => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>click</button>
      <ActionSheet
        visible={visible}
        title='标题'
        toolbarMode='simple'
        bottomButtonMode='single'
        style={{ height: '60%' }}
        needBottomButton={true}
        onCancel={() => setVisible(false)}
      >
        内容
      </ActionSheet>
    </>
  )
}
```

**ActionSheet 参数 API**

| 参数              | 描述                 | 类型                   | 默认值    |
| ----------------- | -------------------- | ---------------------- | --------- |
| visible           | ActionSheet 是否显示 | `boolean`              | false     |
| title             | 标题                 | `string`               | -         |
| toolbarMode       | 操作栏的风格         | `'simple' | 'confirm'` | `confirm` |
| renderToolbar     | 自定义操作栏         | `JSX.Element`          | -         |
| bottomButtonMode  | 底部按钮的风格       | `'single' | 'multi'`   | `multi`   |
| renderFooter      | 自定义 footer        | `JSX.Element`          | -         |
| needBottomButton  | 是否需要底部按钮     | `boolean`              | false     |
| cancelText        | 取消的文案           | `string`               | 取消      |
| confirmText       | 确认的文案           | `string`               | 确认      |
| style             | ActionSheet 内部样式 | `React.CSSProperties`  | -         |
| needToolbarBorder | 操作栏是否需要底边框 | `boolean`              | true      |
| disabledConfirm   | 确认按钮是否禁用     | `boolean`              | false     |
| overlayOpacity    | 遮罩的透明度         | `number`               | 0.6       |
| onConfirm         | 确认的回调           | `() => void`           | -         |
| onCancel          | 取消的回调           | `() => void`           | -         |
| onClickOverlay    | 取消遮罩层的回调     | `() => void`           | -         |
