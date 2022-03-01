// src/js/actions/index.js

export function addArticle(payload) {
  return { 
    type: "ADD_ARTICLE", 
    payload }
};

export function getData() {
  return { type: "DATA_REQUESTED" };
}

// We need a dispath method on component to connect the action with the component data