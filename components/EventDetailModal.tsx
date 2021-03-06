import React, { 
  useRef, 
  useState 
} from 'react';

import {  Modal } from 'antd';

import type { 
  DraggableData, 
  DraggableEvent 
} from 'react-draggable';

import Draggable from 'react-draggable';



interface Props{
  show: boolean,
  handleClose: () => void,
  children?: React.ReactNode,
  title: string
}

const EventDetailModal: React.FC<Props> = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        key={'calendarModal'}
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {props.title}
          </div>
        }
        visible={props.show} 
        onCancel={props.handleClose}
        mask={false}
        maskClosable={false}
        zIndex={2000}
        footer={false}
        width={300}
        modalRender={modal => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
      {props.children}  
      </Modal>
    </>
  );
};

export default EventDetailModal;