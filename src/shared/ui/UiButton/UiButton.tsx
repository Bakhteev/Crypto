import React, { ButtonHTMLAttributes } from 'react';
import './UiButton.scss';
import cn from 'classnames';

const defaultErrorMessage = 'This pair is disabled now';
const defaultClassName = 'ui-button';
const UiButton: React.FC<UiButtonProps> = ({
                                             children,
                                             onClick,
                                             disabled = false,
                                             errorMessage = defaultErrorMessage,
                                             className,
                                             ...meta
                                           }) => {
  const classNames = cn(defaultClassName, className);
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
      {disabled && (
        <p className='ui-button__error'>
          {errorMessage ? errorMessage : defaultErrorMessage}
        </p>
      )}
    </div>
  );
};

export type UiButtonProps = {
  children?: JSX.Element | string
  onClick?: (e: React.MouseEvent) => void,
  disabled?: boolean,
  errorMessage?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default UiButton;
