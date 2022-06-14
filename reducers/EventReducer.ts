import { Reducer } from 'react'
import type { Moment } from 'moment';
import type { BadgeProps } from 'antd';


export interface EventType{
    date: Moment,
    title: string,
    time?: Moment,
    description?: string,
    type: BadgeProps['status'],
    isAllDay?: boolean
};

export type EventActionType = 
    |   { type: 'REGISTER', payload: EventType } 
    |   { type: 'EDIT', payload: { key: Moment, data: EventType } }
    |   { type: 'LOADING' };

export type EventStateType = { events: Array<EventType> }
  

const EventReducer: Reducer<EventStateType, EventActionType> = (state, action) => {

    switch(action.type){
        case 'REGISTER':
            return {  
                events: [...(state.events ? state.events : []), action.payload] 
            };
        case 'LOADING':
            return { ...state, loading: true }
            
    }
    return state;
}

export default EventReducer;