import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import EpisodeCard from '/src/Components/EpisodeCard/EpisodeCard'
import Loader from '/src/Components/Loader/Loader'
import Pagination from '/src/Components/Pagination/Pagination'
import './Episodes.css'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const Episodes = () => {
  const [allEpisodes, setAllEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const query = useQuery()
  const seasonQuery = (query.get('season') || '').toLowerCase().trim()

  useEffect(() => {
    let active = true
    const normalize = (data) => {
      if (Array.isArray(data)) return data
      if (Array.isArray(data?.results)) return data.results
      if (Array.isArray(data?.episodes)) return data.episodes
      return []
    }
    const fetchPage = async (page) => {
      const url = page ? `https://thesimpsonsapi.com/api/episodes?page=${page}` : 'https://thesimpsonsapi.com/api/episodes'
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
        for (const ep of combined) {
          const key = String(ep?.id ?? ep?._id ?? ep?.name ?? ep?.title ?? JSON.stringify(ep))
          if (!seen.has(key)) {
            seen.add(key)
            dedup.push(ep)
          }
        }
        if (active) setAllEpisodes(dedup)
      } catch {
        if (active) setAllEpisodes([])
      } finally {
        if (active) setLoading(false)
      }
    }
    loadAll()
    return () => { active = false }
  }, [])

  useEffect(() => { setCurrentPage(1) }, [seasonQuery])

  const filteredEpisodes = useMemo(() => {
    if (!seasonQuery) return allEpisodes
    return allEpisodes.filter(ep => String(ep?.season).toLowerCase() === seasonQuery)
  }, [allEpisodes, seasonQuery])

  const paginatedEpisodes = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return filteredEpisodes.slice(indexOfFirstItem, indexOfLastItem)
  }, [filteredEpisodes, currentPage, itemsPerPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) return <Loader />

  return (
    <div className="episodes-page">
      <h1 className="page-title">Episodios</h1>
      <p className="episodes-count">Mostrando <strong>{filteredEpisodes.length}</strong> episodios</p>
      {seasonQuery && <p className="search-feedback">Filtrado por Temporada: <strong>{seasonQuery}</strong></p>}
      <div className="episodes-grid">
        {paginatedEpisodes.map(ep => (
          <div key={ep.id ?? ep.episodeId ?? ep.name ?? ep.title} className="character-card-wrapper">
            <EpisodeCard data={ep} />
          </div>
        ))}
      </div>
      {filteredEpisodes.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredEpisodes.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Episodes
