import { useEffect, useState } from "react";
import UniversalCard from "../../Components/UniversalCard/index.tsx.ts";
import BackButton from "../../Components/BackButton/index.tsx";

type Film = {
  id: number;
  titlu: string;
  descriere: string;
  gen: string;
  anul_aparitiei: number;
  durata: number;
  rating: number;
  imagine_url: string;
};

function Filme() {
  const [filmes, setFilmes] = useState<Film[]>([]);

 useEffect(() => {
  fetch("http://localhost:3000/api/filme")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setFilmes(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

  return (
    <div className="filme-page">
      <h2>Filmele</h2>
      <BackButton />
      <div className="filme-container">
        {filmes.map((filme) => (
          <UniversalCard key={filme.id} content={filme} />
        ))}
      </div>
    </div>
  );
}

export default Filme;