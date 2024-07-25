import ErrorMessage from './ErrorMessage';
import { Box } from './Box';
import Loader from './Loader';
import { Logo } from './Logo';
import { Main } from './Main';
import { Navbar } from './Navbar';
import { MovieList } from './MovieList';
import MovieDetails from './MovieDetails';
import { NumResults } from './NumResults';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { WatchedList } from './WatchedList';
import { WatchedSummary } from './WatchedSummary';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar
          query={query}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
      {/* <Main>

      this can also be written as an explicitly defined prop as is done in the revised version below. similar to what is done in the react router library 
      
        <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          }
        />
      </Main> */}
    </>
  );
}
