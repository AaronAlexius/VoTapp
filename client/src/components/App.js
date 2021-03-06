import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomeShowPage from "./pages/HomeShowPage";
import GenerateTopic from "./pages/GenerateTopic";
import UserRecordsShowPage from "./pages/UserRecordsShowPage";
import TopicShowPage from "./pages/TopicShowPage";
import BreadCrumbBar from "./elements/BreadCrumbBar";
import NominationShowPage from "./pages/NominationShowPage";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <BreadCrumbBar user={currentUser} />
      <Switch>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/">
          <HomeShowPage user={currentUser} />
        </Route>
        <Route exact path="/users/:id" component={UserRecordsShowPage} />
        <Route exact path="/topics/new">
          <GenerateTopic user={currentUser} />
        </Route>
        <Route exact path="/topics/:id" component={TopicShowPage} />
        <Route exact path="/nominations/:id" component={NominationShowPage} />
      </Switch>
    </Router>
  );
};

export default hot(App);