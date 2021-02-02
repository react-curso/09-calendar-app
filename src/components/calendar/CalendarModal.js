import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import Swal from 'sweetalert2'
import moment from 'moment'

import { uiCloseModal } from '../../actions/ui'
import { eventClearActiveEvent, eventStartAddNew,startUpdateEvent } from '../../actions/events';
import { useEffect } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');

const nowMoreOne = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowMoreOne.toDate()
};



export const CalendarModal = () => {


    const { modalOpen: isModalOpen } = useSelector(state => state.ui);
    const { isActiveEvent } = useSelector(state => state.calendar);
    const { uid, name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowMoreOne.toDate());
    const [showError, setShowError] = useState(false);

    const [formValues, setFormValues] = useState(initEvent)

    const { title, notes, start, end } = formValues;


    useEffect(() => {
        if (isActiveEvent) {
            setFormValues(isActiveEvent);
            return;
        }
        setFormValues(initEvent);
    }, [isActiveEvent])

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent())
        setFormValues(initEvent);
    };

    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    };

    const handleEndDateChange = (e) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    };

    const handleFormChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha fin debe ser mayor a la fecha inicial.'
            })
            return;
        }

        if (title.trim().length < 2) {
            setShowError(true);
            return;
        }

        if (isActiveEvent) {
            dispatch(startUpdateEvent(formValues))
        } else {
            dispatch(eventStartAddNew({
                ...formValues,
                user: {
                    uid,
                    name
                }
            }))
        }


        setShowError(false);
        closeModal();
    };

    return (
        <Modal
            isOpen={isModalOpen}            // Show Modal
            onRequestClose={closeModal}   // CLose modal on click out on screen
            closeTimeoutMS={200}            // Animation on closed modal
            style={customStyles}            // Styles Modal
            className="modal"
            overlayClassName="modal-fondo" // Background modal
        >
            <h2 className="text-center">{isActiveEvent ? 'Edit event' : 'New Event'}</h2>
            <hr />
            {
                showError
                &&
                <div className="alert alert-danger text-center">Ingrese un titulo.
                <button className="close-error" onClick={() => setShowError(false)} >x</button>
                </div>
            }
            <form
                className="container"
                onSubmit={handleSubmit}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio </label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="date-input"
                        amPmAriaLabel="Select AM/PM"
                        name="startDate"

                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin </label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        className="date-input"
                        amPmAriaLabel="Select AM/PM"
                        minDate={dateStart}
                        name="endDate"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        onChange={handleFormChange}
                        value={title}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="3"
                        name="notes"
                        onChange={handleFormChange}
                        value={notes}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
