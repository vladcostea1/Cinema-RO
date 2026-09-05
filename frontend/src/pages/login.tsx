
import './login.css'

export default function Login() {
  const handleGoogleLogin = () => {
    // Vom pune aici adresa backend-ului după ce verificăm proiectul
    window.location.href = '/auth/google/login'
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Autentificare</h1>

        <p>Autentifică-te pentru a continua pe CinemaRO.</p>

        <button
          type="button"
          className="google-button"
          onClick={handleGoogleLogin}
        >
          <span className="google-logo">G</span>
          <span>Continua cu Google</span>
        </button>
      </div>
    </div>
  )
}
