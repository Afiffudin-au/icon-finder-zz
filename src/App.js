import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import IconCatagory from './components/IconCatagory/IconCatagory';
import Navbar from './components/Navbar/Navbar';
import IconStyle from './components/IconStyle/IconStyle';
import SearchIconResult from './components/SearchIconResult/SearchIconResult';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/icon-search">
            <SearchIconResult/>
          </Route>
          <Route path="/icon-style">
            <IconStyle/>
          </Route>
          <Route path="/icon-catagory">
            <IconCatagory/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
