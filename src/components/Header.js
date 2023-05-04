import React from 'react'

const Header = ({ wishCount }) => {
    return (
        <div className="navbar bg-dark text-white">
            <div className="container d-flex justify-content-between">
                <h1>Store</h1>
                <div className='navbar__actions d-flex gap-4'>
                    {wishCount > 0 ? <i className="bi bi-heart-fill">{wishCount}</i> : <i className="bi bi-heart"></i>}
                    <i className="bi bi-cart"></i>
                </div>
            </div>
        </div>
    )
}

export default Header
