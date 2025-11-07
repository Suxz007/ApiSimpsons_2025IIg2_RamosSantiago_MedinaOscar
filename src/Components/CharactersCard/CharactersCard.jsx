import React from 'react'
import { Link } from 'react-router-dom'
import './CharactersCard.css'
import faceHomer from '../../assets/FaceHomer.jpg'

const getName = (d) => {
  const n = d?.name || ''
  const s = d?.surname || ''
  const full = `${n} ${s}`.trim()
  return full || d?.character || 'Personaje'
}

const getImage = (d) => {
  const direct = d?.image || d?.img || d?.avatar || d?.portrait
  if (direct) return direct
  const p = d?.portrait_path || d?.image_path || d?.portraitPath
  if (p) {
    if (typeof p === 'string' && p.startsWith('/')) {
      return `https://cdn.thesimpsonsapi.com/500${p}`
    }
    return p
  }
  return faceHomer
}

const CharacterCard = ({ data }) => {
  const name = getName(data)
  const portrait = getImage(data)
  const id = data?.id ?? data?.characterId ?? data?._id ?? name

  return (
    <div className="card character-card animate__animated animate__fadeInUp">
      <img src={portrait} alt={name} loading="lazy" />
      <div className="card-body only-name">
        <h3 className="card-title">{name}</h3>
        <Link to={`/personaje/${id}`} className="btn btn-details">Ver detalles</Link>
      </div>
    </div>
  )
}

export default CharacterCard
