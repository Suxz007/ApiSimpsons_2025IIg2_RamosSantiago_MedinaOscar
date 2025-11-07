import React from 'react'
import { Link } from 'react-router-dom'
import './Error404.css'

const Error404 = () => {
    return (
        <div className="error-404">
            <div className="error-content">
                <h1>404</h1>
                <h2>¡O'oh! Página no encontrada</h2>
                <p>La página que buscas no existe en Springfield</p>
                <Link to="/" className="btn-home">
                    Volver al inicio
                </Link>
            </div>
        </div>
    )
}

export default Error404
