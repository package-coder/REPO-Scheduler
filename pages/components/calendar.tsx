import { Toolbar } from '@mui/material';
import type { BadgeProps } from 'antd';
import { Badge, Calendar, Alert } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useState } from 'react';
import AppModal from './appModal';

const dates = [
  moment().add(1, 'day'),
  moment().add(3, 'days'),
  moment().add(1, 'week')
]

const getListData = (value: Moment) => {
  let now = moment();
  now = now.add(1, 'd');
  console.log(now)


  const data = dates.filter(date => date.isSame(value, "date"))
  if(data != [])
    return [ { type: 'success', content: 'This is usual event.' }]

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


  const onClose = () => {
    setModal(false);
  }
  const onSelect = (newValue: Moment) => {
    setValue(newValue);
    setSelectedValue(newValue);
    setModal(true);
    console.log(newValue)
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
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
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
      <div>{selectedValue.toString()}</div>
    </AppModal>
  </>
};

export default Scheduler;