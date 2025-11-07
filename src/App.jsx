import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import Characters from './Pages/Characters/Characters'
import CharacterDetail from './Pages/CharactersDetail/CharactersDetail'
import Locations from './Pages/Locations/Locations'
import Episodes from './Pages/Episodes/Episodes'
import Error404 from './Components/Error/Error404'
import './index.css'
import './layout.css'

function App() {
  return (
    <Router>
      <div className="app-layout">
        <aside className="sidebar">
          <Navbar />
        </aside>
        <main className="main-content">
          <Header />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/personajes" element={<Characters />} />
              <Route path="/personaje/:id" element={<CharacterDetail />} />
              <Route path="/lugares" element={<Locations />} />
              <Route path="/episodios" element={<Episodes />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
          <footer className="footer">
            <p>Creado por: <strong>Santiago Ramos Almario</strong> y <strong>Oscar Medina</strong> — ApiSimpsons_2025IIg1_Ramos_Santiago_Medina_Oscar</p>
          </footer>
        </main>
      </div>
    </Router>
  )
}

export default App
