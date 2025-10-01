import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
}) => {
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Handle ESC key
    const handleEsc = (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalClasses = [
    'modal__content',
    `modal__content--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="modal__overlay" onClick={handleOverlayClick}>
      <div className={modalClasses} role="dialog" aria-modal="true">
        {/* Modal Header */}
        <div className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          {showCloseButton && (
            <button
              className="modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              &times;
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="modal__body">{children}</div>

        {/* Modal Footer */}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;