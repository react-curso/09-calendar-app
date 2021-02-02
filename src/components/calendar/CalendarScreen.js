import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import moment from 'moment'

import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendar-messages-es'

import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'

import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'
import { useEffect } from 'react'


moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const dispatch = useDispatch();

    const { events, isActiveEvent } = useSelector(state => state.calendar || []);

    const { uid } = useSelector(state => state.auth || []);

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    };

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    };

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e);
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? '#E18056' : '#465660',
            borderRadius: '0px',
            opacity: 0.9,
            display: 'block',
            color: 'white'
        }
        return { style }
    };

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
        dispatch(uiOpenModal());
    };

    return (
        <div>
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages} // Traducciones
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                onSelectEvent={onSelectEvent}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            {
                isActiveEvent
                &&
                <DeleteEventFab />

            }
            <CalendarModal />
        </div>
    )
}
