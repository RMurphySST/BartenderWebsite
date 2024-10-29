import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Pages + Components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RawIngredientsPage from './pages/RawIngredientsPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c62828',
    },
    secondary: {
      main: '#ef6c00',
      dark: 'rgba(167,75,0,0)',
    },
    error: {
      main: '#9c9c9c',
    },
    warning: {
      main: '#e8df56',
    },
    background: {
      default: '#eeeeee',
      paper: '#e0e0e0',
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#dc004e',
          borderBottomWidth: 2
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          margin: "20px auto",
          padding: "10px",
          position: "relative",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.3)"}}
    }
  },
  typography: {
    fontFamily: 'Oswald',
  },
});



function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
