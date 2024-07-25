# Ultimate React Course--usePopcorn

This is a sample react project showing some examples of state Toggle, customComponents, more mapping, conditional rendering, and more

## Table of contents

- [Ultimate React Course--usePopcorn](#ultimate-react-course--usepopcorn)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- search and see the selected movies list
- select a movie from the list, rate it, and add it to the watched list. (prevent duplicate adds to the watched list)
- see an updated page title based on the selected movie
- CRUD functionality for the watched movies list
- calculate the averages for the watched summary

### Screenshot

![](public/Screen%20Shot%202024-07-25%20at%2017.57.00.png)

### Links

- Solution URL: (https://github.com/MorganEro/usePopcorn)
- Live Site URL: (morganero.github.io/usePopcorn/)

### Built with

- CSS custom properties
- JavaScript
- React
- Flexbox
- CSS Grid

### What I learned

1. component composition using the children prop to avoid unnecessary prop drilling. This is also very useful for creating flexible components
2. Default value for props
3. type checking / using propTypes to prevent incorrect input values
4. Handling a hover event with onMouseIn and OnMouseOut. Used to create a star rating system
5. Using Array.from() to create a star rating system based on rating values.
6. useEffect, fetching data, error handling, isLoading, try/catch/finally and conditional rendering from error and loading states.
7. created a .env file. Make sure to restart the server after or it would be able to find the apiKey inside the file
8. cleanup function for a useEffect. Runs before the effect is executed again and after the component is unmounted. Needed if the side effect keeps happening after the component is unmounted or re-rendered.
9. learned to use the abort controller to minimize the amount of memory required to render the component when fetching data
10. attach event listener to entire document to listen for escape key.
11. used local storage to store the watched movies so that the list persists after resetting the browser. This showcased the use of an initialization function in the useState hook to set up the initial state based on some computation or fetching from storage. This is also called lazy evaluation
12. autoFocus using the useRef hook to select a dom element

### Continued development

I want to continue to grow my knowledge of React and its many capabilities.

## Author

- Website - [Morgan Ero] (https://github.com/MorganEro)
- Ultimate React Course- [Jonas Schmedtmann] UDEMY
