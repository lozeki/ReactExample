// src/js/reducers/index.js

const initialState = {
    articles: [],
    remoteArticles: [],
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === "ADD_ARTICLE") {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload) // Update the articles: value for the state
          });
    }
        
    // if (action.type === "DATA_LOADED") {
    //     return Object.assign({}, state, {
    //       remoteArticles: state.remoteArticles.concat(action.payload)
    //     });
    // }

    if (action.type === "DATA_LOADED") {
      return {...state,
        remoteArticles: action.payload
        // make a copy of state, add the payload into the existing array remoteArticles
      };
    }
    
    if (action.type === "API_ERRORED") {
        console.log(action.payload);
    }
    return state; //the state in redux comes from reducers
  };
  
  export default rootReducer;