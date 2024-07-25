import StarRating from './StarRating';
import Loader from './Loader';
import React, { useEffect, useRef, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { useKey } from './useKey';

const apiKey = process.env.REACT_APP_API_KEY;

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState('');
  const watchedMovie = watched.find(movie => movie.imdbID === selectedId);

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current += 1;
    },
    [userRating]
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey('Escape', onCloseMovie);

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          setError('');
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
          );
          if (response.ok) {
            const data = await response.json();
            setMovie(data);
          } else {
            throw new Error('Error fetching movie details');
          }
        } catch (error) {
          console.error(error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
      setUserRating('');
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return; // if title is not set, do nothing. prevents the initial render from setting the title to undefined
      document.title = `Movie |  ${title}`;

      //clean up function. if not added, when you go back to the movie list after a movie is selected, the title will remain as the movie title
      return function () {
        document.title = 'usePopcorn';
      };
    },
    [title]
  );

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <div className="details">
          <header>
            <button
              className="btn-back"
              onClick={onCloseMovie}>
              ←
            </button>
            <img
              src={poster}
              alt={`Poster of the ${title}`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={2}
                defaultRating={
                  watchedMovie ? watchedMovie.userRating : undefined
                }
                onSetRating={setUserRating}
                disabled={Boolean(watchedMovie)}
              />
              {(userRating > 0 || watchedMovie) && (
                <button
                  className="btn-add"
                  onClick={watchedMovie ? undefined : handleAdd}>
                  {watchedMovie ? 'Watched' : '+ Add to list'}
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </>
  );
}

export default MovieDetails;
