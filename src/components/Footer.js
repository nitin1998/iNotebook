import React from 'react'

const Footer = () => {

    return (
        <div className='fixed-bottom'>
            <footer className="bg-dark text-center text-sm-start">
                <div className="text-center text-light p-3">
                    © {new Date().getFullYear()} Copyright : iNotebook
                </div>
            </footer>
        </div>
    )
}

export default Footer
