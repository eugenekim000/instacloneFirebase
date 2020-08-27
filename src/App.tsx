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
  const [render, setRender] = useState(false);

  useEffect(() => {
    console.log(user);
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setRender(true);
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
            <UserContext.Provider value={user}>
              <Header
                setPosts={setPosts}
                setUser={setUser}
                user={user}
              ></Header>
            </UserContext.Provider>
            <UserContext.Provider value={user}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <FeedPage user={user} posts={posts} />}
                />
                <Route path="/explore" component={Explore} exact />
                <Route path="/:username" component={Profile} exact />
                <Route
                  path="/accounts/edit"
                  component={EditProfilePage}
                  exact
                />
                <Route path="/post/:postid" component={PostPage} exact />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </UserContext.Provider>
          </>
        )}
        {!user && render && (
          <Switch>
            <Route
              path="/login"
              render={() => <Login setUser={setUser} user={user} />}
            />
            <Route
              path="/signup"
              render={() => <SignUp setUser={setUser} user={user} />}
            />
            <Route
              exact
              path="*"
              render={() => <Login setUser={setUser} user={user} />}
            />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
