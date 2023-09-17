import React from 'react'
import { Outlet } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {Header} from './components/app/header';
import {Footer} from './components/app/footer';
import ScrollToTop from './components/app/scrollToTop';

function App() {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
