import React, { useState } from 'react'
import ActionSheet, { ActionSheetProps } from './index'

export default function useActionSheet({
  title = '',
  children,
  renderToolbar,
  renderFooter,
  toolbarMode = 'confirm',
  bottomButtonMode = 'multi',
  needBottomButton = false,
  cancelText = '取消',
  confirmText = '确认',
  style,
  needToolbarBorder = true,
  disabledConfirm = false,
  overlayOpacity = 0.6,
  onCancel = () => {},
  onClickOverlay = () => {},
  onConfirm = () => {}
}: Omit<ActionSheetProps, 'visible'> & { children: React.ReactNode }) {
  const [visible, setVisible] = useState<boolean>(false)

  const showActionSheet = () => {
    setVisible(true)
  }

  const hideActionSheet = () => {
    setVisible(false)
  }

  const actionSheetRender = (
    <ActionSheet
      visible={visible}
      title={title}
      renderToolbar={renderToolbar}
      renderFooter={renderFooter}
      toolbarMode={toolbarMode}
      bottomButtonMode={bottomButtonMode}
      needBottomButton={needBottomButton}
      cancelText={cancelText}
      confirmText={confirmText}
      style={style}
      needToolbarBorder={needToolbarBorder}
      disabledConfirm={disabledConfirm}
      overlayOpacity={overlayOpacity}
      onConfirm={() => {
        setVisible(false)
        onConfirm?.()
      }}
      onCancel={() => {
        setVisible(false)
        onCancel?.()
      }}
      onClickOverlay={() => {
        setVisible(false)
        onClickOverlay?.()
      }}
    >
      {children}
    </ActionSheet>
  )

  return {
    actionSheetRender,
    showActionSheet,
    hideActionSheet,
    onCancel,
    onClickOverlay,
    onConfirm
  }
}
