import React, { useState } from "react";
import Header from "../Header/Header";

import Typing from "../Typing/Typing";
import axios from "axios";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import SharePage from "../SharePage/SharePage";
import style from "./App.module.css";
import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";
import { ToastContainer, toast } from 'react-toastify';

// Dark mode custom
import useDarkMode from 'use-dark-mode';

const App = () => {
  const history = useHistory();
  const [shareText, setShareText] = useState("");
  const [created, setCreated] = useState(false);

  const darkMode = useDarkMode(false);

  //   const [routeNav, setRouteNav] = useState(false);

  const handleInputChange = (inputValue) => {
    setShareText(inputValue);
  };

  const onSubmit = (inputValue) => {
    setCreated(true);
    console.log("pressed dude");
    // console.log(shareText);
    //http://localhost:4000
    console.log("Text:"+shareText);
    if(shareText === "<p><br></p>" || !shareText ) {
      console.log("Empty Text");
      toast.error("Error : Empty Text");
      
    } else {
      axios
        .post("https://justpasteitapi.herokuapp.com/add", { content: shareText })
        .then((response) => {
          let id = response.data["_id"];
          history.push("/" + id);

          console.log(id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div>
      <Header headTitle="Vip911 Union"/>
      <ToggleDarkMode darkMode={darkMode}/>
      <Switch>
        <Route exact path="/">
          <Typing handleInputChange={handleInputChange} onSubmit={onSubmit} />
          <ToastContainer 
          toastStyle={{
           
            paddingLeft:'5rem'
          }}
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        </Route>
        <Route exact path="/:id">
          <SharePage />
        </Route>
      </Switch>
      <div className={style.container}>
      </div>
    </div>
  );
};

export default withRouter(App);
