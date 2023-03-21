import React from 'react'
import './UiButton.scss'

const defaultErrorMessage = 'This pair is disabled now'

const UiButton = ({
  children,
  onClick,
  disabled = false,
  errorMessage = defaultErrorMessage,
  ...meta
}) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        {...meta}
        className="uiButton"
      >
        {children}
      </button>
      {disabled && <p className="uiButton__error">{errorMessage}</p>}
      {/* FIXME: text align */}
    </>
  )
}

export default UiButton
