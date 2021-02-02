import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Loading } from '../components/ui/Loading';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => {

        dispatch(startChecking())

    }, [dispatch])

    if (checking) {
        return <Loading />
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRouter
                        exact
                        path="/login"
                        component={LoginScreen}
                        isLogin={!!uid}
                    />

                    <PrivateRoutes
                        exact
                        path="/"
                        component={CalendarScreen}
                        isLogin={!!uid}
                    />

                    <Redirect to="/login" />

                </Switch>
            </div>
        </Router>

    )
}
