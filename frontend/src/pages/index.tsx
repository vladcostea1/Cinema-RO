   import '../App.css'
import FilmeButton from '../Components/FilmeButton'
import SerialeButton from '../Components/SerialeButton'

function App() {
  return (
    <div className="App">
     <h1>CinemaRo</h1>
     <p>Welcome to CinemaRo, your ultimate destination for movies and TV shows! Explore our extensive collection of films and series, from timeless classics to the latest releases. Whether you're a cinephile or a casual viewer, CinemaRo has something for everyone. Dive into the world of entertainment and discover your next favorite movie or series today!</p>    
     
      <FilmeButton />
      <SerialeButton />
      <title> Decimal for copyright</title>
      <p>© 2026 CinemaRo. All rights reserved.</p>
    </div>
  )
}

export default App
