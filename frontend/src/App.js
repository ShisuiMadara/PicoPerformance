import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/home";
import NoPage from "./pages/nopage/nopage";
import Helmet from 'react-helmet';
import styles from './App.module.css';
import Dashboard from './pages/dashboard/dashboard';
import Fpassword from './pages/forgetpassword/forgetpassword';

class App extends Component {
  render(){
    return (
      <div className={styles.allContainer}>
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
          <Route path='reset-password' element={<Fpassword />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>

    );
  }

}

export default App;
