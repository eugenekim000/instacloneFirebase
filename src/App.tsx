import React, { useState, useEffect, createContext } from "react";
import "./styling/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { auth } from "firebase";

import Profile from "./component/profile/Profile";
import Explore from "./component/explore/Explore";
import EditProfilePage from "./component/settings/EditProfilePage";
import NotFound from "./component/NotFound";
import Header from "./component/header/Header";
import FeedPage from "./component/feed/FeedPage";
import PostPage from "./component/post/PostPage";
import Login from "./component/landing/Login";
import SignUp from "./component/landing/SignUp";

interface AppContext {
  user: any;
}

export const UserContext = createContext<any | null>(null);

function App() {
  const [posts, setPosts] = useState<Partial<any>>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log("render header, user username");
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="App">
      <Router>
        {user && (
          <>
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
          </>
        )}
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="*" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
