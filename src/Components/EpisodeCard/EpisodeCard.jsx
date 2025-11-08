import React from 'react'
import { Link } from 'react-router-dom'
import './EpisodeCard.css' // Usa el mismo CSS


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
    return " ";
}

const EpisodeCard = ({ data }) => {
    const name = data?.name || data?.title || "Episodio"
    const portrait = getImage(data)
    const id = data?.id ?? data?.episodeId ?? data?._id ?? name

    return (
        <div className="card character-card animate__animated animate__fadeInUp">
            <img src={portrait} alt={name} loading="lazy" />
            <div className="card-body only-name">
                <h3 className="card-title">{name}</h3>
                <div style={{ fontSize: "0.97em", color: "#444", marginBottom: "8px" }}>
                    <strong>Temporada:</strong> {data.season ?? "–"}<br />
                    <strong>Episodio #:</strong> {data.episode_number ?? "–"}<br />
                    <strong>Emisión:</strong> {data.airdate ?? "–"}
                    {data.synopsis && (
                        <p className="sinopsis">
                            <strong>Sinopsis:</strong> {data.synopsis}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EpisodeCard