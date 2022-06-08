import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface Props{
  show: boolean,
  handleClose: () => void
}

const AppModal: React.FC<Props> = (props) => {
  return (
    <>
      <Modal 
        title="Basic Modal" 
        visible={props.show} 
        onCancel={props.handleClose}
        mask={false}
        maskClosable={false}
        zIndex={2000}
        footer={false}
        modalRender={
          (node) => {
            console.log(node)
            return null;
          }
        }
      >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default AppModal;