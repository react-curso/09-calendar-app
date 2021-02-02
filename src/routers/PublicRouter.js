import React from 'react'
import { Redirect, Route } from "react-router-dom"

export const PublicRouter = ({ isLogin, component: Component, ...rest }) => {
    return (
        <Route {...rest}
            component={(props) => (
                (!isLogin)
                    ? (<Component {...props} />)
                    : (<Redirect to="/" />)
            )}

        />
    )
}
