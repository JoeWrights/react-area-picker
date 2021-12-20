---
nav:
  title: Components
  path: /components
---

## ActionSheet

Demo:

使用例子

```tsx
import React, { useState } from 'react'
import { ActionSheet } from 'react-area-picker'
import DemoPage from '../../demo/components/DemoPage'
import DemoCard from '../../demo/components/DemoCard'

const { useActionSheet } = ActionSheet

export default () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [visible2, setVisible2] = useState<boolean>(false)
  const [visible3, setVisible3] = useState<boolean>(false)

  const { actionSheetRender, showActionSheet } = useActionSheet({
    title: '标题',
    toolbarMode: 'simple',
    bottomButtonMode: 'single',
    style: { height: '60%' },
    needBottomButton: true,
    children: '内容'
  })

  return (
    <DemoPage title='ActionSheet'>
      <DemoCard title='基础使用'>
        <>
          <button onClick={() => setVisible(true)}>显示</button>
          <ActionSheet visible={visible} title='标题' style={{ height: '60%' }} onCancel={() => setVisible(false)}>
            内容
          </ActionSheet>
        </>
      </DemoCard>

      <DemoCard title='操作栏的风格'>
        <>
          <button onClick={() => setVisible2(true)}>显示</button>
          <ActionSheet
            visible={visible2}
            title='标题'
            toolbarMode='simple'
            style={{ height: '60%' }}
            onCancel={() => setVisible2(false)}
          >
            内容
          </ActionSheet>
        </>
      </DemoCard>

      <DemoCard title='底部操作按钮'>
        <>
          <button onClick={() => setVisible3(true)}>显示</button>
          <ActionSheet
            visible={visible3}
            title='标题'
            toolbarMode='simple'
            style={{ height: '60%' }}
            needBottomButton={true}
            onCancel={() => setVisible3(false)}
          >
            内容
          </ActionSheet>
        </>
      </DemoCard>

      <DemoCard title='hooks方式使用'>
        <>
          <button onClick={showActionSheet}>显示</button>
          <div>{actionSheetRender}</div>
        </>
      </DemoCard>
    </DemoPage>
  )
}
```

**ActionSheet 参数 API**

| 参数              | 描述                 | 类型                        | 默认值    |
| ----------------- | -------------------- | --------------------------- | --------- |
| visible           | ActionSheet 是否显示 | `boolean`                   | false     |
| title             | 标题                 | `string`                    | -         |
| toolbarMode       | 操作栏的风格         | `'simple' \| 'confirm'`     | `confirm` |
| renderToolbar     | 自定义操作栏         | `React.ReactNode`           | -         |
| bottomButtonMode  | 底部按钮的风格       | `'single' \| 'multi'`       | `multi`   |
| renderFooter      | 自定义 footer        | `React.ReactNode`           | -         |
| needBottomButton  | 是否需要底部按钮     | `boolean`                   | false     |
| cancelText        | 取消的文案           | `string`                    | 取消      |
| cancelIcon        | 取消的 icon          | `React.ReactNode \| string` | 取消      |
| confirmText       | 确认的文案           | `string`                    | 确认      |
| style             | ActionSheet 内部样式 | `React.CSSProperties`       | -         |
| needToolbarBorder | 操作栏是否需要底边框 | `boolean`                   | true      |
| disabledConfirm   | 确认按钮是否禁用     | `boolean`                   | false     |
| overlayOpacity    | 遮罩的透明度         | `number`                    | 0.6       |
| onConfirm         | 确认的回调           | `() => void`                | -         |
| onCancel          | 取消的回调           | `() => void`                | -         |
| onClickOverlay    | 取消遮罩层的回调     | `() => void`                | -         |
