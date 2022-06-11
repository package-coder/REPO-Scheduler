import React, { useState } from 'react';
import { 
    Modal,
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    ModalProps
} from 'antd';
  
  
type SizeType = Parameters<typeof Form>[0]['size'];


interface CustomModalProps extends ModalProps{
  onOk?: (e: React.MouseEvent<HTMLElement>,) => void;
}

const EventModal: React.FC<ModalProps> = (props) => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };


  return (
    <>
      <Modal
        title="Create New Event/Reminder"
        centered
      
        {...props}
      >
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        
        >
            <Form.Item label="DatePicker">
                <DatePicker />
            </Form.Item>
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            <Form.Item label="Color">
                <Select>
                    <Select.Option value="success">Success</Select.Option>
                    <Select.Option value="error">Error</Select.Option>
                    <Select.Option value="warning">Warning</Select.Option>
                </Select>
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventModal;