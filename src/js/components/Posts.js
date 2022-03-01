// src/js/components/Post.js

import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";

export class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // calling the action function getData()
    this.props.getData();
  }

  render() { // Render the data from the props
    return (
      <ul>
        {this.props.articles.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) { // state from the rootReducer
  return {
    articles: state.remoteArticles.slice(0, 10) // Make a copy of the first 10 items on the state.remoteArticles array, assign it to articles variable and and return it to props
  };
}

export default connect(  mapStateToProps,  { getData })(Post); // Connect the action function getData with mapStateToProps, so it can be use inside of the Post class