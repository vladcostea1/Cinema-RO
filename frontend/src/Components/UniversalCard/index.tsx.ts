import React from "react";
import "./index.css";

type Film = {
  id: number;
  titlu: string;
  descriere: string;
  gen: string;
  anul_aparitiei: number;
  durata?: number;
  rating: number;
  imagine_url: string;
};

interface Props {
  content: Film;
}

const UniversalCard: React.FC<Props> = ({ content }) => {
  return React.createElement(
    'div',
    { className: 'filme-card' },
    React.createElement('img', {
      src: content.imagine_url,
      alt: content.titlu,
      className: 'filme-image',
    }),
    React.createElement(
      'div',
      { className: 'filme-info' },
      React.createElement('h3', null, content.titlu),
      React.createElement('p', null, content.descriere),
      React.createElement('p', null, React.createElement('strong', null, 'Gen:'), ' ', content.gen),
      React.createElement('p', null, React.createElement('strong', null, 'An:'), ' ', String(content.anul_aparitiei)),
      React.createElement('p', null, React.createElement('strong', null, 'Durată:'), ' ', String(content.durata), ' min'),
      React.createElement('p', null, React.createElement('strong', null, 'Rating:'), '', String(content.rating))
    )
  );
};

export default UniversalCard;