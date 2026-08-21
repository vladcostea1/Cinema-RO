  import '../App.css'
  import FilmeButton from '../Components/FilmeButton'
  import SerialeButton from '../Components/SerialeButton'
  import BlogButton from '../Components/BlogButton'
  import Search from '../Components/Search'

  function Home() {
  return (
    <div className="App">
        <h1>Descoperă următorul film.</h1>
        <p>Caută printre filmele și serialele din CinemaRO.</p>
        <Search />
      <FilmeButton />
      <SerialeButton />
      <BlogButton />
        <title>CinemaRo</title>
      <p>© 2026 CinemaRo. All rights reserved.</p>
    </div>
  )
}

  export default Home
