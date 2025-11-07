import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import LocationCard from '/src/Components/LocationCard/LocationCard'
import Loader from '/src/Components/Loader/Loader'
import Pagination from '/src/Components/Pagination/Pagination'
import './Locations.css'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const Locations = () => {
  const [allLocations, setAllLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const query = useQuery()
  const typeQuery = (query.get('type') || '').toLowerCase().trim()

  useEffect(() => {
    let active = true
    const normalize = (data) => {
      if (Array.isArray(data)) return data
      if (Array.isArray(data?.results)) return data.results
      if (Array.isArray(data?.locations)) return data.locations
      return []
    }
    const fetchPage = async (page) => {
      const url = page ? `https://thesimpsonsapi.com/api/locations?page=${page}` : 'https://thesimpsonsapi.com/api/locations'
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
        for (const loc of combined) {
          const key = String(loc?.id ?? loc?._id ?? loc?.name ?? JSON.stringify(loc))
          if (!seen.has(key)) {
            seen.add(key)
            dedup.push(loc)
          }
        }
        if (active) setAllLocations(dedup)
      } catch {
        if (active) setAllLocations([])
      } finally {
        if (active) setLoading(false)
      }
    }
    loadAll()
    return () => { active = false }
  }, [])

  useEffect(() => { setCurrentPage(1) }, [typeQuery])

  const filteredLocations = useMemo(() => {
    if (!typeQuery) return allLocations
    return allLocations.filter(loc => String(loc?.type).toLowerCase() === typeQuery)
  }, [allLocations, typeQuery])

  const paginatedLocations = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return filteredLocations.slice(indexOfFirstItem, indexOfLastItem)
  }, [filteredLocations, currentPage, itemsPerPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  if (loading) return <Loader />

  return (
    <div className="locations-page">
      <h1 className="page-title">Lugares</h1>
      <p className="locations-count">Mostrando <strong>{filteredLocations.length}</strong> lugares</p>
      <div className="locations-grid">
        {paginatedLocations.map(loc => (
          <div key={loc.id ?? loc._id ?? loc.name} className="character-card-wrapper">
            <LocationCard data={loc} />
          </div>
        ))}
      </div>
      {filteredLocations.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredLocations.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Locations