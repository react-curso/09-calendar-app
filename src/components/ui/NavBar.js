import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { eventClearActiveEvent } from '../../actions/events'

export const NavBar = () => {

    const dispatch = useDispatch()

    const { name } = useSelector(state => state.auth)

    const handleClick = () => {
        dispatch(startLogout())
        dispatch(eventClearActiveEvent())

    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4" >
            <span className="navbar-brand" >
                {name ? name : ''}
            </span>

            <button
                onClick={handleClick}
                className="btn btn-outline-danger"
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Logout</span>
            </button>
        </div>
    )
}
