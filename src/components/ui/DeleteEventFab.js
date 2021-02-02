import React from 'react'
import { useDispatch } from 'react-redux';
import { startDeleteEvent } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( startDeleteEvent() );
    };

    return (
        <button
            className="btn btn-danger fab-delete"
            onClick={ handleClick }
        >
            <i className="fas fa-trash"></i>
            <span> Delete Event</span>
        </button>
    )
}
