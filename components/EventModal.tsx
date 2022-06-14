import React, { 
  useContext, 
  useState, 
  useRef, 
  useEffect,
} from 'react';

import { 
  Modal,
  DatePicker,
  Form,
  Input,
  Select,
  FormInstance,
  TimePicker
} from 'antd';

import { 
  EventContext, 
  EventContextType 
} from '../contexts/EventProvider';



const useResetFormOnCloseModal = ({ form, visible }: {form: FormInstance<any>, visible: boolean | undefined}) => {
  const prevVisibleRef = useRef<boolean | undefined>();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  
  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [form, prevVisible, visible]);
};


type SizeType = Parameters<typeof Form>[0]['size'];

const EventModal: React.FC<any> = ({ visible, onCancel }: {visible: any, onCancel: () => void}) => {
  const { dispatch } = useContext(EventContext) as EventContextType;
  const [form] = Form.useForm();

  useResetFormOnCloseModal({ form, visible: visible, });

  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');


  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  function onSuccessSubmit(values: any){
    dispatch({ type: 'REGISTER', payload: {
      date: values.date,
      time: values.time, 
      title: values.name, 
      type: values.color
    }})

    onCancelHandler();
  }

  function onOkHandler(e: React.MouseEvent<HTMLElement, MouseEvent>){
    form.submit();
  }

  function onCancelHandler(e?: React.MouseEvent<HTMLElement, MouseEvent>){
    onCancel()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Create New Event"
        centered
      
        visible={visible}
        onCancel={onCancelHandler}
        onOk={onOkHandler}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange} 
          size={componentSize as SizeType}
          form={form}
          onFinish={onSuccessSubmit}
          name="EventForm"
        >
            <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label="Time" name="time" rules={[{ required: true }]}>
              <TimePicker use12Hours format="h:mm a" />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Color" name="color" rules={[{ required: true }]}>
                <Select>
                    <Select.Option value="success">Green</Select.Option>
                    <Select.Option value="error">Red</Select.Option>
                    <Select.Option value="warning">Yellow</Select.Option>
                </Select>
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventModal;