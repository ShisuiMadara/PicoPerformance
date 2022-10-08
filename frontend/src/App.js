import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/home";
import NoPage from "./pages/nopage/nopage";
import Helmet from 'react-helmet';
import './App.css';
import Dashboard from './pages/dashboard/dashboard';

class App extends Component {
  render(){
    return (
      <>
      <Helmet>
        <title>PicoPerformance</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <BrowserRouter>
      <Routes>
        <Route path = '/'>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>

    );
  }

}

export default App;
