import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import iconImg from '/src/assets/icon.jpg'

const Navbar = () => {
  const [term, setTerm] = useState('')
  const [type, setType] = useState('personajes')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const q = term.trim()
    if(q.length === 0){
      navigate(`/${type}`)
    } else {
      navigate(`/${type}?q=${encodeURIComponent(q)}`)
    }
  }

  return (
    <nav className="nav-vertical">
      <div className="brand">
        <img src={iconImg} alt="The Simpsons" />
        <div>
          <h2>Simpsons</h2>
          <small>API Explorer</small>
        </div>
      </div>
      <form className="search" onSubmit={onSubmit}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="search-type"
          aria-label="Tipo de búsqueda"
        >
          <option value="personajes">Personajes</option>
          <option value="episodios">Episodios</option>
          <option value="lugares">Lugares</option>
        </select>
        <input
          type="search"
          placeholder={`Buscar ${type}…`}
          value={term}
          onChange={(e)=>setTerm(e.target.value)}
          aria-label="Buscar"
        />
        <button type="submit">Buscar</button>
      </form>
      <ul className="menu">
        <li><NavLink to="/" end>Inicio</NavLink></li>
        <li><NavLink to="/personajes">Personajes</NavLink></li>
        <li><NavLink to="/episodios">Episodios</NavLink></li>
        <li><NavLink to="/lugares">Lugares</NavLink></li>
      </ul>
      <div className="creators">
        <h4>Creadores</h4>
        <p>Santiago Ramos Almario</p>
        <p>Oscar Medina</p>
      </div>
    </nav>
  )
}

export default Navbar
