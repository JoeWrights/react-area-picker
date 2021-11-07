import React, { useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import './index.less'

export interface ActionSheetProps {
  /**
   * ActionSheet是否显示
   */
  visible: boolean
  /**
   * 标题
   */
  title: string
  /**
   * 操作栏的风格
   */
  toolbarMode?: 'simple' | 'confirm'
  /**
   * 自定义操作栏
   */
  renderToolbar?: JSX.Element
  /**
   * 自定义footer
   */
  renderFooter?: JSX.Element
  /**
   * 底部按钮的风格
   */
  bottomButtonMode?: 'single' | 'multi'
  /**
   * 是否需要底部按钮
   */
  needBottomButton?: boolean
  /**
   * 取消的文案
   */
  cancelText?: string
  /**
   * 确认的文案
   */
  confirmText?: string
  /**
   * ActionSheet内部样式
   */
  style?: React.CSSProperties
  /**
   * 操作栏是否需要底边框
   */
  needToolbarBorder?: boolean
  /**
   * 确认按钮是否禁用
   */
  disabledConfirm?: boolean
  /**
   * 确认的回调
   */
  onConfirm: () => void
  /**
   * 取消的回调
   */
  onCancel: () => void
  /**
   * 点击遮罩的回调
   */
  onClickOverlay?: () => void
}

function SimpleToolbar({ title, onCancel }: { title: string; onCancel: () => void }) {
  return (
    <div className='simple'>
      <div className='title'>{title}</div>
      <div className='cancel-pla' onClick={onCancel}>
        X
      </div>
    </div>
  )
}

function ConfirmToolbar({
  title,
  confirmText,
  cancelText,
  disabledConfirm,
  onCancel,
  onConfirm
}: {
  title: string
  confirmText: string
  cancelText: string
  disabledConfirm: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className='confirm'>
      <div className='cancel-pla' onClick={onCancel}>
        {cancelText}
      </div>
      <div className='title'>{title}</div>
      <div
        className={classNames({
          'confirm-pla': true,
          disabled: disabledConfirm
        })}
        onClick={onConfirm}
      >
        {confirmText}
      </div>
    </div>
  )
}

export default function ActionSheet({
  visible = false,
  title = '',
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
  onConfirm = () => {},
  onCancel = () => {},
  onClickOverlay = () => {},
  ...rest
}: ActionSheetProps & { children: JSX.Element }) {
  const { children } = rest

  const handleConfirm = useCallback(() => {
    if (disabledConfirm) return
    onConfirm?.()
  }, [disabledConfirm, onConfirm])

  const handleClickMask = () => {
    onCancel?.()
    onClickOverlay?.()
  }

  return (
    <div className='action-sheet'>
      <CSSTransition classNames='slide-top' in={visible} timeout={400} unmountOnExit>
        <div className='sheet-wrapper' style={style}>
          <div
            className={classNames({
              toolbar: true,
              'border-b': needToolbarBorder
            })}
          >
            {renderToolbar ? (
              'toolbar'
            ) : (
              <div className='default-bar'>
                {toolbarMode === 'simple' ? (
                  <SimpleToolbar title={title} onCancel={onCancel} />
                ) : (
                  <ConfirmToolbar
                    title={title}
                    confirmText={confirmText}
                    cancelText={cancelText}
                    disabledConfirm={disabledConfirm}
                    onCancel={onCancel}
                    onConfirm={handleConfirm}
                  />
                )}
              </div>
            )}
          </div>
          <div className='content'>{children}</div>
          <div className='footer'>
            {renderFooter && 'renderFooter'}
            {!renderFooter && needBottomButton && (
              <div className='bottom-button'>
                {bottomButtonMode !== 'single' && (
                  <div className='cancel-btn' onClick={onCancel}>
                    {cancelText}
                  </div>
                )}
                <div
                  className={classNames({
                    'confirm-btn': true,
                    disabled: disabledConfirm
                  })}
                  onClick={handleConfirm}
                >
                  {confirmText}
                </div>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition classNames='fade' in={visible} timeout={400} unmountOnExit>
        <div className='mask' onClick={handleClickMask} />
      </CSSTransition>
    </div>
  )
}