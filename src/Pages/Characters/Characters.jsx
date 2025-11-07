import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import CharacterCard from '/src/Components/CharactersCard/CharactersCard'
import Loader from '/src/Components/Loader/Loader'
import Pagination from '/src/Components/Pagination/Pagination'

import './Characters.css'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const Characters = () => {
  const [allCharacters, setAllCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const query = useQuery()
  const q = (query.get('q') || '').toLowerCase().trim()

  useEffect(() => {
    let active = true
    const normalize = (data) => {
      if (Array.isArray(data)) return data
      if (Array.isArray(data?.results)) return data.results
      if (Array.isArray(data?.characters)) return data.characters
      if (Array.isArray(data?.items)) return data.items
      if (Array.isArray(data?.rows)) return data.rows
      return []
    }
    const fetchPage = async (page) => {
      const url = page ? `https://thesimpsonsapi.com/api/characters?page=${page}` : 'https://thesimpsonsapi.com/api/characters'
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
      const json = await res.json()
      return normalize(json)
    }
    const loadAll = async () => {
      try {
        setLoading(true)
        let combined = await fetchPage(null)
        const maxPages = 50
        for (let p = 2; p <= maxPages; p++) {
          try {
            const pageData = await fetchPage(p)
            if (!pageData || pageData.length === 0) break
            combined = combined.concat(pageData)
            if (pageData.length < 1) break
          } catch {
            break
          }
        }
        const seen = new Set()
        const dedup = []
        for (const ch of combined) {
          const key = String(ch?.id ?? ch?._id ?? ch?.name ?? JSON.stringify(ch))
          if (!seen.has(key)) {
            seen.add(key)
            dedup.push(ch)
          }
        }
        if (!dedup.length) {
          setAllCharacters(fallbackData)
        } else {
          setAllCharacters(dedup)
        }
      } catch (e) {
        setAllCharacters(fallbackData)
      } finally {
        if (active) setLoading(false)
      }
    }
    loadAll()
    return () => { active = false }
  }, [])

  useEffect(() => { setCurrentPage(1) }, [q])

  const characters = useMemo(() => {
    if (!q) return allCharacters
    return allCharacters.filter(ch => {
      const name = (ch?.name || '').toLowerCase()
      const surname = (ch?.surname || '').toLowerCase()
      const occupation = (ch?.occupation || '').toLowerCase()
      const quotes = (Array.isArray(ch?.quotes) ? ch.quotes.join(' ') : '').toLowerCase()
      return name.includes(q) || surname.includes(q) || occupation.includes(q) || quotes.includes(q)
    })
  }, [allCharacters, q])

  const paginatedCharacters = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return characters.slice(indexOfFirstItem, indexOfLastItem)
  }, [characters, currentPage, itemsPerPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) return <Loader />

  return (
    <div className="characters-page">
      <h1 className="page-title">Personajes</h1>
      <p className="characters-count">Mostrando <strong>{characters.length}</strong> personajes</p>
      {q && <p className="search-feedback">Filtrado por: <strong>{q}</strong></p>}
      <div className="characters-grid">
        {paginatedCharacters.map((character) => (
          <div key={character.id || character._id || character.name} className="character-card-wrapper">
            <CharacterCard data={character} />
          </div>
        ))}
      </div>
      {characters.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={characters.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Characters
