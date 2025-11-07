import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="donut-overlay" role="status" aria-live="polite" aria-label="Cargando">
      <div className="donut">
        <div className="sprinkle s1"></div>
        <div className="sprinkle s2"></div>
        <div className="sprinkle s3"></div>
        <div className="sprinkle s4"></div>
        <div className="sprinkle s5"></div>
      </div>
      <p className="donut-text">Cargando…</p>
    </div>
  )
}

export default Loader
