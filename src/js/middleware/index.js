// src/js/middleware/index.js

// when action type is ADD_ARTICLE check if action.payload.title contains a bad word. 
// If it does then dispatch an action of type FOUND_BAD_WORD, otherwise let the next middleware run.

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // do your stuff
      if (action.type === "ADD_ARTICLE") {
        
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );

        if (foundWord.length) {
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      return next(action);
    };
  };
}