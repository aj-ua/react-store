import React from 'react'
import { handleContacts } from '../actions/productActions'
import classnames from 'classnames'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const signInSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(2, "Name is too short - should be 2 chars min"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string()
        .required("Phone is required")
        .min(4, "Phone is too short - should be 4 chars min")
})

const AddContacts = () => {
    return (
        <Formik
            initialValues={{ name: "", email: "", phone: "" }}
            validationSchema={signInSchema}
            onSubmit={(values, actions) => {
                console.log(values);
                handleContacts(values)
                actions.resetForm()
            }}
        >
            {(formik) => {
                const { errors, touched } = formik
                return (
                    <>
                        <div className="card text-start">
                            <div className="card-header fs-4">Add Contact Info</div>
                            <div className="card-body">
                                <Form>
                                    <div className="form-group mb-2">
                                        <label>Name</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            id="name"
                                            className={classnames("form-control form-control-lg", { 'is-invalid': errors.name && touched.name })}
                                        />
                                        <ErrorMessage name="name" component="span" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={classnames("form-control form-control-lg", { 'is-invalid': errors.email && touched.email })}
                                        />
                                        <ErrorMessage name="email" component="span" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Phone</label>
                                        <Field
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            className={classnames("form-control form-control-lg", { 'is-invalid': errors.phone && touched.phone })}
                                        />
                                        <ErrorMessage name="phone" component="span" className="invalid-feedback" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary w-100"
                                    >
                                        Add Contacts
                                    </button>
                                </Form>
                            </div>
                        </div>
                        <hr className='my-4' />
                    </>
                )
            }}
        </Formik>
    )
}

export default AddContacts
