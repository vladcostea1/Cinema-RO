import{ useEffect, useState } from "react";
import UniversalCard from "../../Components/UniversalCard/index.tsx.ts";
import BackButton from "../../Components/BackButton/index.tsx";
type Film = {
  id: number;
  titlu: string;
  descriere: string;
  gen: string;
  anul_aparitiei: number;
  sezoane: number;
  episoade: number;
  rating: number;
  imagine_url: string;
};

function Seriale() {
  const [seriales, setSeriales] = useState<Film[]>([]);

 useEffect(() => {
  fetch("http://localhost:3000/api/seriale")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setSeriales(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

  return (
    <div className="filme-page">
      <h2>Serialele</h2>
      <BackButton />
      <div className="filme-container">
        {seriales.map((seriale) => (
          <UniversalCard key={seriale.id} content={seriale} />
        ))}
      </div>
    </div>
  );
}

export default Seriale;