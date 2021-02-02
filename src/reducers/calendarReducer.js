import { types } from "../types/types";

const initialState = {
    events: [],
    isActiveEvent: null

};

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.eventSetActive:
            return {
                ...state,
                isActiveEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                isActiveEvent: action.payload,
                events: []
            }
        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) ? action.payload : event
                )
            }
        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(
                    event => (event.id !== state.isActiveEvent.id)
                ),
                isActiveEvent: null
            }

        case types.eventLoadedDB:
            return {
                ...state,
                events: [...action.payload]
            }

        default:
            return state;
    }

} 