import React from 'react'
import { Link } from 'react-router-dom'
import "./LocationCard.css";

const getImage = (d) => {
    const direct = d?.image || d?.img || d?.avatar || d?.portrait
    if (direct) return direct
    const p = d?.image_path || d?.portrait_path
    if (p) {
        if (typeof p === 'string' && p.startsWith('/')) {
            return `https://cdn.thesimpsonsapi.com/500${p}`
        }
        return p
    }
    return "" // Si no hay imagen, no se muestra nada
}

const LocationCard = ({ data }) => {
    const name = data?.name || "Lugar"
    const portrait = getImage(data)
    const id = data?.id ?? data?._id ?? name

    return (
        <div className="card character-card animate__animated animate__fadeInUp">
            {portrait ? <img src={portrait} alt={name} loading="lazy" /> : null}
            <div className="card-body only-name">
                <h3 className="card-title">{name}</h3>
                <div style={{ fontSize: "0.97em", color: "#444", marginBottom: "8px" }}>
                    <strong>Tipo/uso:</strong> {data.use || "–"}<br />
                    {data.town && (<><strong>Pueblo:</strong> {data.town}</>)}
                </div>
            </div>
        </div>
    )
}

export default LocationCard
