import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import './index.less'

export default function Example() {
  const [showMessage, setShowMessage] = useState(false)
  return (
    <div>
      <button type='button' onClick={() => setShowMessage(!showMessage)}>
        Show Message
      </button>
      <CSSTransition in={showMessage} timeout={300} classNames='alert' unmountOnExit>
        <p>This alert message is being transitioned in and out of the DOM.</p>
      </CSSTransition>
    </div>
  )
}
