// The useKey hook is a custom hook that listens for a key press and calls a function when the key is pressed. It takes two arguments: the key to listen for and the function to call when the key is pressed. The hook uses the useEffect hook to add an event listener for the key press when the component is mounted, and removes the event listener when the component is unmounted. This ensures that the event listener is only active when the component is mounted, and prevents memory leaks from accumulating event listeners. The useKey hook can be used in any component to listen for key presses and trigger actions based on the key pressed.
import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(() => {
    function callback(event) {
      if (event.code && key && event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    if (typeof key === 'string' && typeof action === 'function') {
      document.addEventListener('keydown', callback);

      return () => {
        document.removeEventListener('keydown', callback);
      };
    } else {
      console.error('useKey requires a valid key string and action function');
    }
  }, [action, key]);
}
