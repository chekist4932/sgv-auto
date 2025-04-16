import { Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
