import { Toolbar } from '@mui/material';
import type { BadgeProps } from 'antd';
import { Badge, Calendar, Alert } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useState } from 'react';
import AppModal from './appModal';

interface EventItemProps{
  title: string,
  time?: Moment,
  description?: string,
  type: BadgeProps['status'],
  isAllDay?: boolean
}

interface EventProps{
  date: Moment,
  events: Array<EventItemProps>
}

const dates: Array<EventProps>  = [
  {
    date: moment().add(1, 'day'),
    events: [
      { type: 'success', title: "SampleEvent" },
      { type: 'error', title: "SampleEvent" },
      { type: 'warning', title: 'SampleEvent' },
    ]
  }
]

const getListData = (value: Moment) => {
  const date = dates.find(item => item.date.isSame(value, "date"));
  if(date) return [date.events];
  return [];
};

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const Scheduler: React.FC = () => {

  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const [modal, setModal] = useState(false);

  function getDate<Moment>(date: Moment) {
    return dates.find(i => i.date.isSame(date, 'date'))
  }

  const onClose = () => {
    setModal(false);
  }
  const onSelect = (newValue: Moment) => {
    setValue(newValue);
    setSelectedValue(newValue);
    setModal(true);
  };

  const onPanelChange = (newValue: Moment) => {
    setValue(newValue);
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
        {listData.map(item => (
            item.map(obj => (
              <div>
                <Badge status={obj.type} text={obj.title} />
              </div>
            ))
        ))}
      </>
    );
  };

  return <>
    <Calendar 
      value={value} 
      onSelect={onSelect} 
      onPanelChange={onPanelChange} 
      dateCellRender={dateCellRender} 
      monthCellRender={monthCellRender} 
    />
    
    <AppModal 
      show={modal} 
      handleClose={onClose}
      title={selectedValue.format('MMMM D, YYYY')}
    >
     {
        getDate(selectedValue)?.events.map(item => (
          <div>
            <Badge status={item.type} text={item.title} />
          </div>
        ))
      }  
    </AppModal>
  </>
};

export default Scheduler;