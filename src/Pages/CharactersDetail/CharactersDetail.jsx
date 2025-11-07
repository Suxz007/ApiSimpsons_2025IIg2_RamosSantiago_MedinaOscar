import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '/src/Components/Loader/Loader'
import faceHomer from '/src/assets/FaceHomer.jpg'
import './CharactersDetail.css'

const CharacterDetail = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
      .then(res => {
        if(!res.ok) throw new Error('No se pudo obtener el personaje')
        return res.json()
      })
      .then(data => {
        const item = Array.isArray(data) ? data[0] : data
        setCharacter(item || null)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Error al cargar')
        setLoading(false)
      })
  }, [id])

  if (loading) return <Loader />
  if (error) return <div className="container py-4"><p>Error: {error}</p><Link to="/personajes">Volver</Link></div>
  if (!character) return <div className="container py-4"><p>No se encontró el personaje.</p><Link to="/personajes">Volver</Link></div>

  const name = character.name || `${character.name || ''} ${character.surname || ''}`.trim()
  const portrait = character.portrait || character.image || (character.portrait_path ? `https://cdn.thesimpsonsapi.com/500${character.portrait_path}` : faceHomer)

  return (
    <div className="container py-4">
      <Link to="/personajes" className="btn-back">← Regresar</Link>
      <div className="detail-container">
        <div className="detail-image">
          {portrait ? <img src={portrait} alt={name} /> : <div className="img-placeholder" />}
        </div>
        <div className="detail-info">
          <h1>{name}</h1>
          <div className="info-grid">
            <div className="info-item"><strong>ID:</strong> <span>{character.id}</span></div>
            {character.occupation && <div className="info-item"><strong>Ocupación:</strong> <span>{character.occupation}</span></div>}
            {character.status && <div className="info-item"><strong>Estado:</strong> <span>{character.status}</span></div>}
            {character.age && <div className="info-item"><strong>Edad:</strong> <span>{character.age}</span></div>}
            {character.birthdate && <div className="info-item"><strong>Nacimiento:</strong> <span>{character.birthdate}</span></div>}
            {character.hair_color && <div className="info-item"><strong>Cabello:</strong> <span>{character.hair_color}</span></div>}
            {character.eyes_color && <div className="info-item"><strong>Ojos:</strong> <span>{character.eyes_color}</span></div>}
          </div>

          {(character.phrases && character.phrases.length > 0) && (
            <div className="phrases-section">
              <h3>Frases célebres</h3>
              <ul>
                {character.phrases.map((p, i) => <li key={i}>"{p}"</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail
