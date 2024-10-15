import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages + Components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RawIngredientsPage from './pages/RawIngredientsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
            path="/" 
            element={<Home />} 
            />
            <Route
            path="/raw_ingredients"
            element={<RawIngredientsPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
