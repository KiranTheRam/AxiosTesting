import React from "react";
import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function Post() {
  const [post, setPost] = React.useState(null);

  //   When the page loads it will do a get for the first post
  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });
  }, []);

  const createPost = () => {
    axios
      .post(baseURL, {
        title: "This is my post!",
        body: "Excited to be posting",
      })
      .then((response) => {
        setPost(response.data);
      });
  };

  const getRandomPost = () => {
    let randNum = getRandomInt(1, 100);
    axios.get(`${baseURL}/${randNum}`).then((response) => {
      setPost(response.data);
    });
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updatePost() {
    axios
      .put(`${baseURL}/1`, {
        title: "Hello Plant Earth!",
        body: "This is an updated post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  //   Syntax is axios.put/post(URL, {item}).then( (response) => {use the response to update the page})
  //   Syntax is axios.get(URL}).then( (response) => {use the response to update the page})

  if (!post) return "No post!";

  return (
    <div>
      <h1>Post #{post.id}</h1>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div>
        <button onClick={createPost}>Create Post</button>
      </div>
      <div>
        <button onClick={updatePost}>Update Post</button>
      </div>
      <div>
        <button onClick={getRandomPost}>Random Post</button>
      </div>
    </div>
  );
}
