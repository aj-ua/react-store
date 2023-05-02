import React from 'react'

const Header = props => {
    return (
        <div className="navbar bg-dark text-white">
            <div className="container d-flex justify-content-between">
                <h1>Store</h1>
                <div className='fs-3 d-flex gap-4'>
                    <i className="bi bi-heart"></i>
                    <i className="bi bi-cart"></i>
                </div>
            </div>
        </div>
    )
}

export default Header
