import React from 'react'

const Footer = props => {
    return (
        <div className="footer py-4 bg-dark text-white mt-5">
            <div className="container d-flex justify-content-center gap-4">
                <a className='text-white' href="https://gitlab.com/dan-it/groups/pe-14-online/-/tree/main/react/homework/homework2/" target="_blank" rel="noreferrer">Task description &nbsp;<i className="bi bi-box-arrow-up-right"></i></a>
                <a className='text-white' href="https://fakestoreapi.com/" target="_blank" rel="noreferrer">Fake Store API &nbsp;<i className="bi bi-box-arrow-up-right"></i></a>
            </div>
        </div>
    )
}

export default Footer
