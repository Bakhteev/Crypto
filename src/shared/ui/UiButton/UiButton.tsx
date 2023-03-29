import React, { type ButtonHTMLAttributes } from 'react'
import './UiButton.scss'
import cn from 'classnames'

const defaultErrorMessage = 'This pair is disabled now'
const defaultClassName = 'ui-button'
const UiButton: React.FC<UiButtonProps> = ({
  children,
  onClick,
  disabled = false,
  errorMessage,
  className,
  error,
  ...meta
}) => {
  const classNames = cn(defaultClassName, className)
  return (
    <div className={classNames}>
      <button
        disabled={disabled}
        onClick={onClick}
        {...meta}
        className='ui-button__btn'
      >
        {children}
      </button>
      {error && (
        <p className='ui-button__error'>
          {errorMessage ?? defaultErrorMessage}
        </p>
      )}
    </div>
  )
}

export type UiButtonProps = {
  children?: JSX.Element | string
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
  errorMessage?: string
  error?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export default UiButton
