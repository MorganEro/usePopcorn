import { useEffect, useState } from 'react';
const apiKey = process.env.REACT_APP_API_KEY;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      // AbortController is a browser API (nothing to do with react but instead the browser itself) that allows you to cancel a fetch request
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
            { signal: controller.signal } // connects signal to Abort controller
          );

          if (!response.ok) throw new Error('Error fetching movies');

          const data = await response.json();

          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
          setError('');
        } catch (error) {
          // this conditional is a workaround to prevent the error message from being displayed when the fetch request is aborted due to the return function. The error message is only displayed when the fetch request is not aborted due to the Abort controller return function.
          if (error.name !== 'AbortError') {
            console.log(error.message);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }
      callback?.();
      fetchMovies();

      // this is the cleanup function that is used to cancel the fetch request that is made after each keystroke in the search bar. This line of code is necessary to prevent the fetch request from being made after each keystroke.
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
