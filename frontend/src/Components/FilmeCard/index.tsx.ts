import React from "react";
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

interface Props {
  filme: Film;
}

const FilmeCard: React.FC<Props> = ({ filme }) => {
  return React.createElement(
    'div',
    { className: 'filme-card' },
    React.createElement('img', {
      src: filme.imagine_url,
      alt: filme.titlu,
      className: 'filme-image',
    }),
    React.createElement(
      'div',
      { className: 'filme-info' },
      React.createElement('h3', null, filme.titlu),
      React.createElement('p', null, filme.descriere),
      React.createElement('p', null, React.createElement('strong', null, 'Gen:'), ' ', filme.gen),
      React.createElement('p', null, React.createElement('strong', null, 'An:'), ' ', String(filme.anul_aparitiei)),
      React.createElement('p', null, React.createElement('strong', null, 'Durată:'), ' ', String(filme.durata), ' min'),
      React.createElement('p', null, React.createElement('strong', null, 'Rating:'), '', String(filme.rating))
    )
  );
};

export default FilmeCard;