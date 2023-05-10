import React, { useEffect, useState } from 'react'
import { handleContacts } from '../actions/productActions'
import classnames from 'classnames'

const AddContacts = () => {
    const intialValues = { name: "", email: "", phone: "" }

    const [formValues, setFormValues] = useState(intialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {
        console.log(formValues)

        handleContacts(formValues)
    };

    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmitting(true)
    };

    //form validation handler
    const validate = (values) => {
        let errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!values.name) {
            errors.name = "Cannot be blank"
        } else if (values.name.length < 2) {
            errors.name = "Name must be at least 2 characters"
        }

        if (!values.email) {
            errors.email = "Cannot be blank"
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format"
        }

        if (!values.phone) {
            errors.phone = "Cannot be blank"
        } else if (values.phone.length < 4) {
            errors.phone = "Phone must be more than 4 characters"
        }

        return errors
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit()
        }
    }, [formErrors])

    return (
        <>
            <div className="card text-start">
                <div className="card-header fs-4">Add Contacts</div>
                <div className="card-body">
                    {Object.keys(formErrors).length === 0 && isSubmitting && (
                        <span className="success-msg">Form submitted successfully</span>
                    )}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group mb-2">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                className={classnames("form-control form-control-lg", { 'is-invalid': formErrors.name })}
                                value={formValues.name}
                                onChange={handleChange}
                            />
                            {formErrors.name && (
                                <span className="invalid-feedback">{formErrors.name}</span>
                            )}
                        </div>
                        <div className="form-group mb-2">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                className={classnames("form-control form-control-lg", { 'is-invalid': formErrors.name })}
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && (
                                <span className="invalid-feedback">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className={classnames("form-control form-control-lg", { 'is-invalid': formErrors.name })}
                                value={formValues.phone}
                                onChange={handleChange}
                            />
                            {formErrors.phone && (
                                <span className="invalid-feedback">{formErrors.phone}</span>
                            )}
                        </div>
                        <button className="btn btn-lg btn-primary w-100" type="submit">Add Contacts</button>
                    </form>
                </div>
            </div>
            <hr className='my-4' />
        </>
    )
}

export default AddContacts
