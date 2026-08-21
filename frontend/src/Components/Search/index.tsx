import { useEffect, useState } from "react";
import "./index.css";

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

type Serial = {
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

type SearchResults = {
  filme: Film[];
  seriale: Serial[];
};

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    filme: [],
    seriale: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults({
        filme: [],
        seriale: [],
      });

      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);

      fetch(
        `${import.meta.env.VITE_API}/api/search?q=${encodeURIComponent(query)}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
          }

          return res.json();
        })
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          console.error("Eroare search:", error);

          setResults({
            filme: [],
            seriale: [],
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const hasResults =
    results.filme.length > 0 || results.seriale.length > 0;

  return (
    <div className="search-wrapper">

      <div className="search-box">

        <span className="search-icon"></span>

        <input
          type="text"
          placeholder="Caută filme, seriale..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <button
            className="search-clear"
            onClick={() => setQuery("")}
          >
            
          </button>
        )}

      </div>

      {query.trim() && (
        <div className="search-results">

          {loading && (
            <div className="search-message">
              Se caută...
            </div>
          )}

          {!loading && !hasResults && (
            <div className="search-message">
              Nu am găsit rezultate pentru „{query}”
            </div>
          )}

          {!loading && results.filme.length > 0 && (
            <div className="search-section">

              <h3> Filme</h3>

              {results.filme.map((film) => (
                <div
                  className="search-result"
                  key={`film-${film.id}`}
                >

                  <img
                    src={film.imagine_url}
                    alt={film.titlu}
                  />

                  <div className="search-result-info">

                    <h4>{film.titlu}</h4>

                    <p>
                      {film.anul_aparitiei} • {" "}
                      {Number(film.rating).toFixed(1)}
                    </p>

                    <span>{film.gen}</span>

                  </div>

                </div>
              ))}

            </div>
          )}

          {!loading && results.seriale.length > 0 && (
            <div className="search-section">

              <h3> Seriale</h3>

              {results.seriale.map((serial) => (
                <div
                  className="search-result"
                  key={`serial-${serial.id}`}
                >

                  <img
                    src={serial.imagine_url}
                    alt={serial.titlu}
                  />

                  <div className="search-result-info">

                    <h4>{serial.titlu}</h4>

                    <p>
                      {serial.anul_aparitiei} • ⭐{" "}
                      {Number(serial.rating).toFixed(1)}
                    </p>

                    <span>{serial.gen}</span>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Search;