import React, { useState, useEffect, createContext } from "react";
import "./styling/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./component/profile/Profile";
import Explore from "./component/explore/Explore";
import EditProfilePage from "./component/settings/EditProfilePage";
import NotFound from "./component/NotFound";
import Header from "./component/Header";
import FeedPage from "./component/feed/FeedPage";
import PostPage from "./component/post/PostPage";

interface AppContext {
  user: any;
}

export const UserContext = createContext<any | null>(null);

function App() {
  const [posts, setPosts] = useState<Partial<any>>([]);
  const [user, setUser] = useState<any>(null);

  return (
    <div className="App">
      <Router>
        <Header setPosts={setPosts} setUser={setUser} user={user}></Header>
        <UserContext.Provider value={user}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <FeedPage user={user} posts={posts} />}
            />
            <Route path="/explore" component={Explore} />
            <Route exact path="/:username" component={Profile} />
            <Route path="/accounts/edit" component={EditProfilePage} />
            <Route path="/post/:postid" component={PostPage} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
