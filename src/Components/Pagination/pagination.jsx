import React from 'react'
import './Pagination.css'

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const pageNumbers = []
    const pageRange = 4 // Cuántos números mostrar alrededor de la página actual

    // Calcula el inicio y fin del rango a mostrar
    let startPage = Math.max(1, currentPage - pageRange)
    let endPage = Math.min(totalPages, currentPage + pageRange)

    // Ajuste para mostrar 9 páginas siempre que sea posible
    if (endPage - startPage < pageRange * 2) {
        if (currentPage <= pageRange) {
            endPage = Math.min(totalPages, startPage + pageRange * 2)
        } else if (currentPage + pageRange > totalPages) {
            startPage = Math.max(1, endPage - pageRange * 2)
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                <li>
                    <button
                        className="page-nav"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                    >
                        &lt;&lt;
                    </button>
                </li>
                <li>
                    <button
                        className="page-nav"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className="page-nav"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </li>
                <li>
                    <button
                        className="page-nav"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;&gt;
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
