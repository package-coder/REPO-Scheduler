import React from "react";
import { useContext, useReducer } from "react";
import EventReducer, {  
    EventActionType, 
    EventStateType
} from "../../reducers/EventReducer";


export type EventContextType = { state: EventStateType, dispatch: React.Dispatch<EventActionType> }

export const EventContext = React.createContext<any>({});


const EventProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [state, dispatch] = useReducer(EventReducer, {} as EventStateType);

    return <EventContext.Provider value={{ state, dispatch }}>
        {props.children}
    </EventContext.Provider>
}

export default EventProvider;