import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [formValue, setFormValue] = useState(initialState)

    const handleOnChange = ({ target }) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    }

    const reset = () => {
        setFormValue(initialState)
    }

    return [
        formValue,
        handleOnChange,
        reset,
    ]

}

