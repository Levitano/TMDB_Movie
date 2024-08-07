import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import Home from '../src/pages/Home.jsx'
import Movie from '../src/pages/Movie.jsx'
import Search from '../src/pages/Search.jsx'


import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <BrowserRouter>
      <Routes>

        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={<Movie />} />
          <Route path='search' element={<Search />} />

        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
