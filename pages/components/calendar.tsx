import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import React, { useContext } from 'react';
import { EventContext, EventContextType } from '../context/EventProvider';

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

  const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  
  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
   
    return (
      <>
        {listData?.map(item => (
          <div>
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
      monthCellRender={monthCellRender} 
    />
    

  </>
};

export default Scheduler;