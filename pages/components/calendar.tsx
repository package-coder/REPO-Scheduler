import type { BadgeProps } from 'antd';
import { Badge, Calendar, Alert } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useState } from 'react';

const getListData = (value: Moment) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const Scheduler: React.FC = () => {

  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());

  const onSelect = (newValue: Moment) => {
    setValue(newValue);
    setSelectedValue(newValue);
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
      <ul className="events">
        {listData.map(item => (
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
        ))}
      </ul>
    );
  };

  return <>
    <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
  </>
};

export default Scheduler;