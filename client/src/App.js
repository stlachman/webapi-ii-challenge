import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: "",
      error: ""
    };
  }

  componentDidMount() {
    return axios
      .get("https://web-app-version.herokuapp.com/api/posts")
      .then(posts => this.setState({ posts: posts.data }))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div>
        <h1>List of Posts</h1>
        {this.state.posts &&
          this.state.posts.map(post => {
            return (
              <div key={post.id}>
                <p>Title: {post.title}</p>
                <p>Content: {post.contents}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

export default App;
