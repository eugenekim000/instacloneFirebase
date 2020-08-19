import React, { useState, useEffect } from "react";
import "./styling/App.css";
import { Post } from "./component/feed/Post";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ImageUpload from "./component/feed/ImageUpload";
import Profile from "./component/profile/Profile";
import Explore from "./component/explore/Explore";
import EditProfilePage from "./component/settings/EditProfilePage";
import NotFound from "./component/NotFound";
import Header from "./component/Header";
import FeedPage from "./component/feed/FeedPage";

interface Post {
  post: {
    image: string;
    username: string;
    caption: string;
  };
  id: string;
  key: number;
}
declare namespace JSX {
  interface IntrinsicAttributes {
    user: any;
    posts: any;
  }
}

type User = string;

function App() {
  const [posts, setPosts] = useState<Partial<any>>([]);
  const [user, setUser] = useState<any>(null);

  // const FeedPage = () => {
  //   return (
  //     <>
  //       {user?.displayName ? (
  //         <>
  //           <ImageUpload username={user?.displayName}></ImageUpload>
  //           {posts.map((post: Post) => (
  //             <Post
  //               {...post.post}
  //               key={post.id}
  //               postId={post.id}
  //               user={user}
  //             ></Post>
  //           ))}
  //         </>
  //       ) : (
  //         <h3 className="image-upload-login">Please Log in to upload!</h3>
  //       )}
  //     </>
  //   );
  // };

  return (
    <div className="App">
      <Router>
        <Header setPosts={setPosts} setUser={setUser} user={user}></Header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <FeedPage user={user} posts={posts} />}
          />
          <Route path="/explore" component={Explore} />
          <Route exact path="/:username" component={Profile} />
          <Route path="/accounts/edit" component={EditProfilePage} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
