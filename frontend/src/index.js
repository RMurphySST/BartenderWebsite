import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecipeContextProvider } from './context/RecipeContext';
import { RawIngredientsContextProvider } from './context/RawIngredientsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RawIngredientsContextProvider>
    <RecipeContextProvider>
      <App />
    </RecipeContextProvider>
    </RawIngredientsContextProvider>
  </React.StrictMode>
);
