import { PropsWithChildren } from 'react';

type ModalProps = PropsWithChildren;

function Modal({ children }: ModalProps) {
  return (
    <div
      className='modal'
      id='exampleModalLabel'
      tabIndex={-1}
      aria-labelledby='exampleModalLabel'
      aria-hidden={true}
      style={{ display: 'block', background: 'rgba(0, 0, 0, .5)' }}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
}

type ModalHeaderTitleProps = PropsWithChildren;

function ModalHeaderTitle({ children }: ModalHeaderTitleProps) {
  return (
    <h2 className='modal-title fs-5' id='exampleModalLabel'>
      {children}
    </h2>
  );
}

type ModalHeaderProps = PropsWithChildren;

function ModalHeader({ children }: ModalHeaderProps) {
  return <div className='modal-header'>{children}</div>;
}

type ModalBodyProps = PropsWithChildren;

function ModalBody({ children }: ModalBodyProps) {
  return <div className='modal-body'>{children}</div>;
}

type ModalFooterProps = PropsWithChildren;

function ModalFooter({ children }: ModalFooterProps) {
  return <div className='modal-footer'>{children}</div>;
}

ModalHeader.Title = ModalHeaderTitle;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
