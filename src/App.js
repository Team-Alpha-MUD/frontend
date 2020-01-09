import React from 'react';
import { Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Registration from "./components/Registration/Registration.js";

function App() {
  return (
      <>
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
      </>
  );
}

export default App;
