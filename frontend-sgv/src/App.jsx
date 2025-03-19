import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { ThemeProvider } from './lib/theme';

import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'

function App() {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
