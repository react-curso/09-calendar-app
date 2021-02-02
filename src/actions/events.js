import Swal from "sweetalert2"
import { fetchYesToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents"
import { types } from "../types/types"

export const eventStartAddNew = (event) => {

    return async (dispatch, getState) => {

        const { uid, name } = getState().auth

        try {

            const res = await fetchYesToken('events', event, 'POST')
            const newEvent = await res.json()

            if (newEvent.ok) {

                event.id = newEvent.eventDB.id
                event.user = {
                    _id: uid,
                    name
                }

                dispatch(eventAddNew(event))

            } else {
                Swal.fire({
                    icon: 'error',
                    title: newEvent.msg
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventAddNew = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    }
}


export const eventStartLoading = () => {

    return async (dispatch) => {

        const res = await fetchYesToken('events')
        const events = await res.json()

        const eventNew = prepareEvents(events.events)

        dispatch(eventLoaded(eventNew))

    }

}
const eventLoaded = (events) => {
    return {
        type: types.eventLoadedDB,
        payload: events
    }
}


export const startUpdateEvent = (event) => {

    return async (dispatch) => {

        const res = await fetchYesToken(`events/${event.id}`, event, 'PUT')
        const body = await res.json()

        if (body.ok) {
            dispatch(eventUpdateEvent(event))
        } else {
            Swal.fire({
                icon: 'error',
                title: body?.msg
            })
        }

    }

}

export const eventUpdateEvent = (event) => {
    return {
        type: types.eventUpdate,
        payload: event
    }
};


export const startDeleteEvent = () => {

    return async (dispatch, getState) => {

        const { isActiveEvent } = getState().calendar

        const event = await fetchYesToken(`events/${isActiveEvent.id}`, {}, 'DELETE')

        const body = await event.json()

        if (body.ok) {
            dispatch(eventDeletedEvent())
        } else {
            Swal.fire({
                icon: 'error',
                title: body?.msg
            })
        }
    }

}

const eventDeletedEvent = () => {
    return {
        type: types.eventDelete
    }
}

export const eventSetActive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}

export const eventClearActiveEvent = () => {
    return (dispatch) => {

        dispatch({
            type: types.eventClearActiveEvent,
            payload: null,
        })

    }
}



