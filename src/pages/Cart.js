import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Product from '../components/Product'
import AddContacts from '../components/AddContacts'
import { handleCheckout, removeOrder } from '../actions'
import classnames from 'classnames'

const Cart = ({ products, cart, contacts, order, handleCheckout, removeOrder }) => {
    const productsCart = products.filter(product => cart.includes(product.id))
    const hasProducts = productsCart.length > 0
    const hasContacts = contacts.hasOwnProperty('name')

    let showOrder = false
    const hasOrder = order.hasOwnProperty('cart') && order.hasOwnProperty('contacts')
    const orderContacts = hasOrder ? order.contacts : null
    const productsOrder = hasOrder ? order.cart : null
    const productsOrderFull = hasOrder ? products.filter(product => productsOrder.includes(product.id)) : null

    const total = hasOrder ? productsOrderFull.reduce((sum, i) => (sum + i.price), 0).toFixed(2) : null;
    console.log('total', total);

    const doCheckout = (e) => {
        e.preventDefault()
        console.log('cart: ', cart, 'contacts: ', contacts);
        handleCheckout(cart, contacts)
    }

    const handleOrder = () => {
        removeOrder()
        showOrder = true
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
                <div className="my-5">
                    <div className="alert alert-info fs-5 my-3">Add products to cart!</div>
                </div>
            )
            }

            {hasOrder && <div className="card order text-start">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className='mb-0'>Order Details:</h3>
                    <button className="btn-close order-close" onClick={handleOrder}></button>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5 className='text-primary mb-3'>Contact Information:</h5>
                            <p>Name: <strong>{orderContacts.name}</strong></p>
                            <p>Email: <strong>{orderContacts.email}</strong></p>
                            <p>Phone: <strong>{orderContacts.phone}</strong></p>
                        </div>
                        <div className="col-lg-6">
                            <h5 className='text-primary mb-3'>Products:</h5>
                            {productsOrderFull.map(product => (
                                <p key={product.id}><img src={product.image} width='30' alt='' style={{ aspectRatio: "1 / 1", marginRight: 10 }} /><strong>{product.title}</strong> [#{product.id}] - ${product.price}</p>
                            ))}
                            <h5 className='text-primary text-end'>Total: <strong>${total}</strong></h5>
                        </div>
                    </div>
                </div>
            </div >}
        </>
    )
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    cart: PropTypes.array.isRequired,
    contacts: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    products: state.product.products,
    cart: state.product.cart,
    contacts: state.product.contacts,
    order: state.product.order,
})

export default connect(mapStateToProps, { handleCheckout, removeOrder })(Cart)
