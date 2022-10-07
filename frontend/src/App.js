import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/home";
import NoPage from "./pages/nopage/nopage";

import './App.css';

class App extends Component {
  render(){
    return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path = '/'>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Home />} />
          <Route path='dashboard' element={<Home />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>

    );
  }

}

export default App;
