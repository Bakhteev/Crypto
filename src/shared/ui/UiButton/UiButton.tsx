import React, { ButtonHTMLAttributes } from 'react';
import './UiButton.scss';

const defaultErrorMessage: string = 'This pair is disabled now';

const UiButton: React.FC<UiButtonProps> = ({
                                             children,
                                             onClick,
                                             disabled = false,
                                             errorMessage = defaultErrorMessage,
                                             ...meta
                                           }) => {
  return (
    //FIXME: remove inline styles
    <div style={{ position: 'relative', maxWidth: 'max-content' }}>
      <button
        disabled={disabled}
        onClick={onClick}
        {...meta}
        className='uiButton'
      >
        {children}
      </button>
      {disabled && (
        <p className='UiButton-error'>
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
