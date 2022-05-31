import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ReactModal({ open, children }) {
  return (
    <div style={{ opacity: '0.1' }}>
      <Modal style={styles} isOpen={open}>
        {children}
      </Modal>
    </div>
  );
}

const styles = {
  content: {
    position: 'absolute',
    border: 'solid 1.5px #b0b0b0',
    width: '800px',
    // height: '600px',
    top: '50%',
    left: '55%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    maxWidth: '100%',
    backgroundColor: '#fdfcfa'
  }
};
