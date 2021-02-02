import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [loginValue, handleOnchangeLogin, resetLogin] = useForm({
        lEmail: '',
        lPassword: ''
    })
    const { lEmail, lPassword } = loginValue

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        dispatch(startLogin(lEmail, lPassword))
        resetLogin()
    }

    const [RegisterValue, handleOnchangeRegister, resetRegister] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rPassword2: '',
    })

    const { rName, rEmail, rPassword, rPassword2 } = RegisterValue

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        if( rPassword !== rPassword2 ){
           return Swal.fire({
                icon: 'error',
                title: 'Passwords not match'
            })
        }
        dispatch(startRegister(rName, rEmail , rPassword))
        resetRegister()
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form
                        onSubmit={handleLoginSubmit}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleOnchangeLogin}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleOnchangeLogin}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>
                {/* Register */}
                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form
                        onSubmit={handleRegisterSubmit}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="rName"
                                value={rName}
                                onChange={handleOnchangeRegister}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleOnchangeRegister}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="rPassword"
                                value={rPassword}
                                onChange={handleOnchangeRegister}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repit the Password"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleOnchangeRegister}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Create Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}