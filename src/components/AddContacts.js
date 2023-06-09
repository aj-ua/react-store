import React from 'react'
import { connect } from 'react-redux'
import { addContacts } from '../actions'
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

const AddContacts = ({ contacts, addContacts }) => {
    const hasContacts = contacts.hasOwnProperty('name')

    return (
        <Formik
            initialValues={{ name: "", email: "", phone: "" }}
            validationSchema={signInSchema}
            onSubmit={(values, actions) => {
                addContacts(values)
                // actions.resetForm()
                document.querySelector(".footer").scrollIntoView();
            }}
        >
            {({ errors, touched }) => {
                return (
                    <div className="card text-start">
                        <div className="card-header fs-4">{hasContacts ? 'Your' : 'Add'} Contact Info</div>
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
                                {hasContacts ? <div className="alert alert-success my-3">Contacts successfully saved</div> : ''}

                            </Form>
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
}

const mapStateToProps = (state) => ({
    contacts: state.product.contacts
})
export default connect(mapStateToProps, { addContacts })(AddContacts)
