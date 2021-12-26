import React, { useEffect, useState } from 'react';
import './App.css';

import config from './blogConfig';
import { getProvider } from './providers';

function App() {
  const [posts, setPosts] = useState([""]);
  useEffect(() => {
    try {
      const provider = getProvider(config.provider, window.location.hash.substr(1));
      provider.getLatestPostID()
        .then(latestPost => provider.getPosts(latestPost, 10))
        .then(setPosts)
        .catch(reason => setPosts([`<h1>Error while loading posts: ${reason}</h1>`]));
    } catch (error) {
      console.error(error);
      setPosts(["<h1>Error while connecting to provider</h1>"]);
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>ChainBlogs.eth</h1>
      </header>
      {posts.map((record, index) => (<div key={index} dangerouslySetInnerHTML={({ __html: record })}></div>))}
      <footer>
        Built by <a href="https://ChainBlogs.eth/#avalanche-testnet/0xf792527136F500D596A50a78950A7aDAB5d0a9B0">0x379ED372c94CAe8B77dceb9987D7D6A04A31685D</a>
      </footer>
    </div>
  );
}

export default App;
