import { useEffect, useRef } from 'react';

export function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(event) {
        //fifth: added an escape to check to see if the search is focused and if it is, then the enter key press will not clear the search input field
        if (document.activeElement === inputEl.current) return;
        //third: the callback works for any keydown event, but we only want to focus on the input field when the enter key is pressed. This conditional is to prevent the input field from being focused when any key is pressed.
        if (event.code === 'Enter') {
          //first: used the useRef to focus on the input field on initialization. This is the same as using autoFocus
          inputEl.current.focus();

          //fourth: added a query reset to clear the input field when the enter key is pressed. This is to allow the user to start typing immediately after pressing enter from anywhere without having to delete the input field content first
          setQuery('');
        }
      }
      // second: added keydown event listener to listen for enter key and focus on the input field when pressed. This is to allow the user to start typing immediately after pressing enter from anywhere
      document.addEventListener('keydown', callback);
      return () => document.removeEventListener('keydown', callback);
    },
    [setQuery]
  );

  return (
    <input
      name="movieSearch"
      id="movieSearch"
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
