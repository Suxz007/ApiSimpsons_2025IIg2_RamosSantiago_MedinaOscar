import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero-section">
                <h1 className="hero-title">Bienvenido a la App de Los Simpsons</h1>
                <p className="hero-subtitle">
                    Explora personajes, episodios y lugares de la serie más icónica de la televisión
                </p>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">👨‍👩‍👧‍👦</div>
                    <h3>Personajes</h3>
                    <p>Descubre todos los habitantes de Springfield</p>
                    <Link to="/personajes" className="feature-button">
                        Explorar Personajes
                    </Link>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">📺</div>
                    <h3>Episodios</h3>
                    <p>Explora los episodios de la serie</p>
                    <Link to="/episodios" className="feature-button">
                        Ver Episodios
                    </Link>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🏠</div>
                    <h3>Lugares</h3>
                    <p>Descubre los lugares icónicos de Springfield</p>
                    <Link to="/lugares" className="feature-button">
                        Visitar Lugares
                    </Link>
                </div>
            </div>
            <section style={{marginTop:'24px', padding:'16px', border:'1px solid rgba(255,255,255,.1)', borderRadius:'12px'}}>
                <h2 style={{marginTop:0}}>Creadores</h2>
                <p><strong>Santiago Ramos Almario</strong> · <strong>Oscar Medina</strong></p>
            </section>
        </div>
    );
};

export default Home;