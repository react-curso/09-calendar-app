import Swal from "sweetalert2"
import { fetchNotToken, fetchYesToken } from "../helpers/fetch"
import { types } from '../types/types'


export const startLogin = (email, password) => {

    return async (dispatch) => {

        const res = await fetchNotToken('auth', { email, password }, 'POST')
        const body = await res.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login({
                uid: body.uid,
                name: body.name,
            }))
        } else {
            Swal.fire({
                icon: 'error',
                title: body.msg
            })
        }
    }
}

export const startRegister = (name, email, password) => {

    return async (dispatch) => {

        const res = await fetchNotToken('auth/new', { name, email, password }, 'POST')
        const body = await res.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login({
                uid: body.uid,
                name: body.name,
            }))
        } else {
            Swal.fire({
                icon: 'error',
                title: (body.msg) ? body.msg : 'Error in register'
            })
        }
    }

}

export const startChecking = () => {

    return async (dispatch) => {

        const res = await fetchYesToken('auth/renew')
        const body = await res.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login({
                uid: body.uid,
                name: body.name,
            }))
        } else {
            dispatch(checkingFinish())
        }
    }
}

export const startLogout = () => {

    return async (dispatch) => {
        
        localStorage.clear()
        dispatch(logout())
    }

}

const logout = () => {
    return {
        type: types.authLogout
    }
}

const checkingFinish = () => {
    return {
        type: types.authCheckingFinish
    }
}

const login = (user) => {

    return {
        type: types.authLogin,
        payload: user
    }

}
