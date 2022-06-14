import React, { useContext } from 'react';

import { 
  Badge, 
  Calendar 
} from 'antd';

import { 
  EventContext, 
  EventContextType 
} from '../contexts/EventProvider';

import type { Moment } from 'moment';


interface Props{
  value?: Moment,
  onSelect: (value: Moment) => void;
  onPanelChange: (value: Moment) => void;
}

const Scheduler: React.FC<Props> = (props) => {

  const { state } = useContext(EventContext) as EventContextType;

  const getListData = (value: Moment) => {
    return state.events?.filter(item => item.date.isSame(value, "date"));
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
   
    return (
      <>
        {listData?.map((item, key) => (
          <div key={key}>
            <Badge status={item.type} text={`${item?.time?.format('h:mm a')} - ${item.title}`}/>
          </div>
        ))}
      </>
    );
  };

  return <>
    <Calendar 
      value={props.value} 
      onSelect={props.onSelect} 
      onPanelChange={props.onPanelChange} 
      dateCellRender={dateCellRender} 
    />
  </>
};

export default Scheduler;