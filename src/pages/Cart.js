import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Product from '../components/Product'
import AddContacts from '../components/AddContacts'
import { handleCheckout } from '../actions'
import classnames from 'classnames'

const Cart = ({ products, cart, contacts, handleCheckout }) => {
    const productsCart = products.filter(product => cart.includes(product.id))
    const hasProducts = productsCart.length > 0
    const hasContacts = contacts.hasOwnProperty('name')
    let order = null

    const doCheckout = (e) => {
        e.preventDefault()
        console.log('cart: ', cart, 'contacts: ', contacts);
        order = { cart: cart, contacts: contacts }
        handleCheckout(cart, contacts)
    }

    return (
        <>
            <h1>Cart</h1>
            {hasProducts ? (

                <>
                    <AddContacts />
                    <hr className="my-5" />
                    <div className='row'>
                        {productsCart.map(product => {
                            return <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
                                <Product product={product} />
                            </div>
                        })}
                    </div>

                    <hr className="my-4" />
                    {hasContacts ? '' : <div className="alert alert-info fs-5 my-3">Add your contacts before checkout!</div>}
                    <button type="button" className={classnames("btn btn-success btn-lg py-3 fs-4 w-100", { 'disabled': !hasContacts })} onClick={doCheckout}>Checkout</button>
                </>

            ) : (
                <div div className="my-5">
                    <div className="alert alert-info fs-5 my-3">Add products to cart!</div>
                </div >
            )
            }
        </>
    )
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    cart: PropTypes.array.isRequired,
    contacts: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    products: state.product.products,
    cart: state.product.cart,
    contacts: state.product.contacts
})

export default connect(mapStateToProps, { handleCheckout })(Cart)
